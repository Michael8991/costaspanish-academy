import { Dot } from 'lucide-react'
import { TestimonialCard } from '../../components'
import styles from './testimonialsSection.module.css'

export const TestimonialsSection = () => {
    return (
        <div id='testimonials' style={{ backgroundColor: '#FFCCDD' }} className=''>
            <div className='container py-5'>
                <p className="text-4xl font-extrabold">Testimonials</p>
                <div className='grid grid-cols-1 lg:grid-cols-3'>
                    <div className='flex justify-center my-2'>
                        <TestimonialCard />
                    </div>
                    <div className='flex justify-center my-2'>
                        <TestimonialCard />
                    </div>
                    <div className='flex justify-center my-2'>
                        <TestimonialCard />
                    </div>
                </div>
                <div className='flex justify-center my-2'>
                    <Dot className='w-8 h-8' />
                    <Dot className='w-8 h-8' />
                    <Dot className='w-8 h-8' />
                </div>
            </div>
        </div>
    )
}
