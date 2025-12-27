'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import ServiceCard from './ServiceCard';

const services = [
    {
        key: 'website',
        imageSrc: '/service/webiste-dev.jpg'
    },
    {
        key: 'mobile',
        imageSrc: '/service/mobile-dev.jpg'
    },
    {
        key: 'media',
        imageSrc: '/service/media-prod.jpg'
    },
    {
        key: 'design',
        imageSrc: '/service/design-prod.jpg'
    },
    {
        key: 'social',
        imageSrc: '/service/social-media.jpg'
    }
];

export default function ServicesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { t } = useLanguage();

    return (
        <section
            id="services"
            ref={ref}
            className="min-h-screen bg-gray-50 py-20 px-6 md:px-12"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black mb-6">
                        {t('services.title')}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        {t('services.subtitle')}
                    </p>
                </motion.div>

                {/* Services Grid - 2 columns with consistent sizing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
                    {services.map((service, index) => {
                        const isLastOdd = services.length % 2 !== 0 && index === services.length - 1;

                        return (
                            <motion.div
                                key={service.key}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={isLastOdd ? 'md:col-span-2 md:max-w-md md:mx-auto md:w-full' : ''}
                            >
                                <ServiceCard
                                    title={t(`services.items.${service.key}.title`)}
                                    description={t(`services.items.${service.key}.description`)}
                                    imageSrc={service.imageSrc}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
