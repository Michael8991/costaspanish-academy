'use client'
import { useEffect, useState } from 'react';
import styles from './topBar.module.css';
import { CalendarCheck, Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const TopBar = () => {

    const [copied, setCopied] = useState(false);
    const copyToClipBoard = () => {
        navigator.clipboard.writeText('+34 665 33 49 19');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, []);


    return (
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className={`${styles.topBarWrapper} z-3 sm:hidden md:cols-grid-1 md:grid  lg:grid-cols-2 py-0.5 
            ${scrolled ? 'fixed' : ''}`}
        >
            <div className={`${styles.topBarColumn} flex px-4`}>
                <div className='flex items-center'>
                    <button
                        onClick={copyToClipBoard}
                        className='flex items-center align-middle'>
                        <Phone className='w-4 h-4' strokeWidth={1} />
                        <span className='whitespace-nowrap mx-2'>+34 604 80 92 08</span>
                    </button>
                </div>
                <div className='flex items-center'>
                    <button
                        // onClick={openEmail}
                        className='flex items-center'>
                        <Mail className='w-4 h-4' strokeWidth={1} />
                        <span className='mx-2 whitespace-nowrap'>info@costaSpanishClass.com</span>
                    </button>
                </div>
                <div className='flex items-center'>
                    <CalendarCheck className='w-4 h-4' strokeWidth={1} />
                    <span className='mx-2 whitespace-nowrap'>MON - FRI: 9:00 - 20:00</span>
                </div>
            </div>
            <div className={`${styles.topBarSecondColumn} ${styles.topBarColumn} flex px-4`}>
                <span>Follow us:</span>
                <ul className='m-0 px-2 flex'>
                    <li className='mx-1'>
                        <a href=""><Facebook className='w-4 h-4' strokeWidth={1} color='black' /></a>
                    </li>
                    <li className='mx-1'>
                        <a href=""><Instagram className='w-4 h-4' strokeWidth={1} color='black' /></a>
                    </li>
                    <li className='mx-1'>
                        <a href="">
                            <Linkedin className='w-4 h-4' strokeWidth={1} color='black' />
                        </a>
                    </li>
                </ul>
            </div>
        </motion.div>
    )
}
