import { Facebook, Instagram, Linkedin } from 'lucide-react'
import styles from './Footer.module.css'
import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => {
    return (
        <div className="py-5" style={{ backgroundColor: '#FFCCDD' }}>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1">
                    <div className="grid-rows-3">
                        <div>
                            <Image
                                src={'/assets/LogoCostaSpanishRojoCoralFuerte.png'}
                                alt="Spanish Academy Logo"
                                width={0}
                                height={0}
                                style={{ width: 'auto', height: 150 }}
                                priority
                            />
                        </div>
                        <div className='my-2'>
                            <p className='text-sm font-light'>
                                Copyright © 2025 Costa Spanish Class.
                                <br /> All rights reserved.
                            </p>
                        </div>
                        <div className='flex'>
                            <Instagram aria-label='instagram costaSpanish' className={`${styles.socialMediaIcon} mx-1 w-8 h-8`} strokeWidth={1} />
                            <Linkedin aria-label='Linkedin costaSpanish' className={`${styles.socialMediaIcon} mx-1 w-8 h-8`} strokeWidth={1} />
                            <Facebook aria-label='facebook costaSpanish' className={`${styles.socialMediaIcon} mx-1 w-8 h-8`} strokeWidth={1} />
                        </div>
                    </div>
                    <div className="grid-rows-3">
                        <div className={`flex align-middle items-center justify-center row-span-2`}>
                            <ul className={`${styles.navContainer} flex align-middle items-center`}>
                                <li className='mx-2 whitespace-nowrap'>
                                    <Link className={`${styles.navLinks}`} href="">About us</Link>
                                </li>
                                <li className='mx-2 whitespace-nowrap'>
                                    <Link className={`${styles.navLinks}`} href="">Our courses</Link>
                                </li>
                                <li className='mx-2 whitespace-nowrap'>
                                    <Link className={`${styles.navLinks}`} href="">Home</Link>
                                </li>
                                <li className='mx-2 whitespace-nowrap'>
                                    <Link className={`${styles.navLinks}`} href="#testimonials">Testimonials</Link>
                                </li>
                                <li className='mx-2 whitespace-nowrap'>
                                    <Link className={`${styles.navLinks}`} href="">Contact us</Link>
                                </li>
                                <li className='mx-2 whitespace-nowrap'>
                                    <Link className={`${styles.navLinks}`} href="">Blog</Link>
                                </li>
                            </ul>
                        </div>
                        <div className=' lg:flex lg:justify-end lg:mr-5'>
                            <a href="" className={`${styles.designLink} font-light`}>Design by Michael Rodriguez</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
