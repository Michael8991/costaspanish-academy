"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { TestimonialCard } from '../Testimonials/TestimonialCard'
import "@/components/TestimonialsCarousel/embla.css";
import { Pause, Play } from 'lucide-react'

type TestimonialType = {
    id: number
    name: string
    text: string
}

type PropType = {
    slides: TestimonialType[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        AutoScroll({ playOnInit: true, speed: 1.3, stopOnFocusIn: true })
    ])
    const [isPlaying, setIsPlaying] = useState(true)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const onButtonAutoplayClick = useCallback(
        (callback: () => void) => {
            const autoScroll = emblaApi?.plugins()?.autoScroll
            if (!autoScroll) return

            const resetOrStop =
                autoScroll.options.stopOnInteraction === false
                    ? autoScroll.reset
                    : autoScroll.stop

            resetOrStop()
            callback()
        },
        [emblaApi]
    )

    const toggleAutoplay = useCallback(() => {
        const autoScroll = emblaApi?.plugins()?.autoScroll
        if (!autoScroll) return

        const playOrStop = autoScroll.isPlaying()
            ? autoScroll.stop
            : autoScroll.play
        playOrStop()
    }, [emblaApi])

    useEffect(() => {
        const autoScroll = emblaApi?.plugins()?.autoScroll
        if (!autoScroll) return

        setIsPlaying(autoScroll.isPlaying())
        emblaApi
            .on('autoScroll:play', () => setIsPlaying(true))
            .on('autoScroll:stop', () => setIsPlaying(false))
            .on('reInit', () => setIsPlaying(autoScroll.isPlaying()))
    }, [emblaApi])

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((testimonial, index) => (
                        <div className="embla__slide" key={testimonial.id ?? index}>
                            <TestimonialCard {...testimonial} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex w-full items-center mt-10 gap-4 justify-center">
                <div className="embla__buttons">
                    <PrevButton
                        onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={() => onButtonAutoplayClick(onNextButtonClick)}
                        disabled={nextBtnDisabled}
                    />
                </div>

                <button
                    className="cursor-pointer w-fit flex items-center justify-center px-6 py-2 rounded-full bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 hover:text-gray-900 transition duration-200 shadow-md font-semibold"
                    onClick={toggleAutoplay}
                    type="button"
                >
                    {isPlaying ? <Pause size={22} /> : <Play size={22} />}
                </button>
            </div>
        </div>
    )
}

export default EmblaCarousel
