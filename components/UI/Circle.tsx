import styles from './ui.module.css'

import { motion } from 'framer-motion'


export const Circle = () => {
    return (
        <div className={`${styles.circleWrapper} flex justify-center w-full max-h-full h-fit items-end`} style={{}}>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
                className={`${styles.pinkCircle} rounded-t-full absolute z-1`} style={{}}></motion.div>
            <motion.img
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 1.6 }}
                src={'/assets/MariaThinking.png'} alt="" className={`${styles.imgMaria} relative z-2 w-80`} />
        </div>
    )
}
