import styles from './academyHighlights.module.css'
import IconCheck from '../../../assets/CheckIcon.png'
import IconWeCare from '../../../assets/WeCareIcon.png'
import IconBook from '../../../assets/BooksIcon.png'
import { motion } from 'framer-motion'
export const AcademyHighlights = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className={`${styles.highLightsContainer} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 align-middle z-2 px-5`}>
            <div className={`flex flex-col justify-center`}>
                <p className='font-extrabold text-4xl'>Why choose us?</p>
                <p
                    className='italic font-light m-0'
                >
                    The difference is in the details, and how much we care.</p>
            </div>
            <div className={`flex flex-col items-center justify-center`}>
                <h5 className={`flex text-center items-center font-normal`}>
                    <img src={IconCheck} alt="qualified icon" style={{ height: '50px', marginRight: '5px' }} />
                    Native & Qualified
                </h5>
                <p className={`text-center font-normal text-base`}>
                    Learn with experienced native speakers who make learning fun and real.
                </p>
            </div>
            <div className={`flex flex-col items-center justify-center`}>
                <h5 className={`flex text-center items-center font-normal`} >
                    <img src={IconBook} alt="qualified icon" style={{ height: '50px', marginRight: '5px' }} />
                    Proven Methodology
                </h5>
                <p className={`text-center font-normal text-base`} >
                    A mix of immersion, repetition, and real conversation.
                </p>
            </div>
            <div className={`flex flex-col items-center justify-center`}>
                <h5 className={`flex text-center items-center font-normal`} >
                    <img src={IconWeCare} alt="qualified icon" style={{ height: '50px', marginRight: '5px' }} />
                    We Care
                </h5>
                <p className={`text-center font-normal text-base`} >
                    You are not just another student. We guide and support you personally.
                </p>
            </div>
        </motion.div>
    )
}
