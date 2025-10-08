import React, { useState } from 'react'

import { IFaqData } from '@/lib/mockcourses/CourseMock';
import { ChevronDown, ChevronUp, CircleQuestionMark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type FaqAccordionProps = {
    faqs: IFaqData[];
};


export default function FaqAccordion({ faqs }: FaqAccordionProps) {

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='max-w-6xl m-auto my-14 shadow-md rounded-md p-10 bg-white'>
            <div className='w-full flex flex-col justify-start bg-white p-5 rounded-t-md'>
                <span className='py-1 px-2 rounded-md shadow-md w-fit flex items-center bg-rose-400 text-white text-xs mb-4'>
                    FAQ
                </span>
                <h3 className='text-xl font-semibold mb-2'>
                    Everything You Need to Know
                </h3>
                <p className='text-md'>
                    Find answers to the most common questions about our courses. If you need more help, feel free to contact us directly.
                </p>
            </div>
            <div className='bg-white rounded-b-md grid grid-cols-2'>
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <motion.div
                            key={index}
                            layout
                            className="overflow-hidden"
                        >
                            <motion.button
                                layout
                                onClick={() => toggle(index)}
                                className="flex items-center justify-between w-full p-5 font-semibold text-md cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        animate={{ color: isOpen ? "#ff637e" : "#000" }} // rojo o azul
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <CircleQuestionMark size={18} />
                                    </motion.div>
                                    {faq.question}
                                </div>
                                <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <ChevronDown />
                                </motion.div>
                            </motion.button>

                            <motion.div
                                layout
                                initial={{ opacity: 0, marginTop: 0, marginBottom: 0 }}
                                animate={{
                                    opacity: isOpen ? 1 : 0,
                                    marginTop: isOpen ? 10 : 0,
                                    marginBottom: isOpen ? 10 : 0,
                                }}
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                className="px-5 text-gray-700 text-md"
                            >
                                {isOpen && <p>{faq.answer}</p>}
                            </motion.div>
                        </motion.div>
                    );
                })}
                <div className='col-span-2 flex flex-col items-center mt-4'>
                    <p className='text-center'>Can’t find what you’re looking for? Reach out to our team and we’ll be happy to assist you.</p>
                    <Link className='py-2 px-3 rounded-md bg-rose-400 text-white shadow-md mt-2 hover:scale-101 hover:cursor-pointer' href="">Contact us</Link>
                </div>
            </div>
        </div>
    );
}
