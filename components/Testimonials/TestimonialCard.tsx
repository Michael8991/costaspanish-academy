import { Star } from 'lucide-react'
import styles from './TestimonialCard.module.css'

interface TestimonialCardProps {
    text: string;
    name: string;
}

export const TestimonialCard = ({ text, name }: TestimonialCardProps) => {
    return (
        <div className={`${styles.testimonialCard} mx-2`}>
            <div className='flex w-full items-start py-2'>
                <div className={`${styles.starWrapper} p-1 me-1`}><Star fill='white' strokeWidth={0} /></div>
                <div className={`${styles.starWrapper} p-1 me-1`}><Star fill='white' strokeWidth={0} /></div>
                <div className={`${styles.starWrapper} p-1 me-1`}><Star fill='white' strokeWidth={0} /></div>
                <div className={`${styles.starWrapper} p-1 me-1`}><Star fill='white' strokeWidth={0} /></div>
                <div className={`${styles.starWrapper} p-1 me-1`}><Star fill='white' strokeWidth={0} /></div>
                <div className='w-full text-gray-600 font-light text-sm text-end'>10.02.25</div>
            </div>
            <p className='font-light text-sm my-2'>{text}</p>
            <p className='font-medium text-sm my-2'>{name}</p>
        </div>
    )
}
