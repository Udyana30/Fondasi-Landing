'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import Image from 'next/image';

export default function IntroSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { t } = useLanguage();

    // Function to render HTML content safely
    const renderHTML = (html: string) => {
        return { __html: html };
    };

    return (
        <section
            id="introduction"
            ref={ref}
            className="min-h-screen flex items-center justify-center bg-white py-20 px-6 md:px-12"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Content - Order 2 on mobile, Order 1 on desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black mb-8 leading-tight">
                            {t('intro.title')}
                        </h2>

                        <div className="space-y-6 text-gray-700 text-lg md:text-xl leading-relaxed">
                            <p dangerouslySetInnerHTML={renderHTML(t('intro.paragraph1'))} />
                            <p>{t('intro.paragraph2')}</p>
                            <p className="text-black font-semibold">
                                {t('intro.paragraph3')}
                            </p>
                        </div>
                    </motion.div>

                    {/* Image - Order 1 on mobile, Order 2 on desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl">
                            <Image
                                src="/fondasi.jpg"
                                alt="Fondasi Creative Agency"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
