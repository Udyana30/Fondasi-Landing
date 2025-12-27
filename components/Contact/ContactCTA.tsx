'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import Beams from '../Beams';
import ContactPopup from './ContactPopup';

export default function ContactCTA() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { t } = useLanguage();

    return (
        <>
            <section
                id="contact"
                ref={ref}
                className="relative min-h-[80vh] flex items-center justify-center py-20 px-6 md:px-12 overflow-hidden"
            >
                {/* Beams Background */}
                <div className="absolute inset-0 z-0">
                    <Beams
                        beamWidth={2}
                        beamHeight={15}
                        beamNumber={12}
                        lightColor="#ffffff"
                        speed={2}
                        noiseIntensity={1.75}
                        scale={0.2}
                        rotation={0}
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 leading-tight">
                            {t('contact.title')}
                        </h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-12 max-w-2xl mx-auto font-light"
                        >
                            {t('contact.subtitle')}
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            onClick={() => setIsPopupOpen(true)}
                            className="px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl"
                        >
                            {t('contact.cta')}
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Contact Popup */}
            <ContactPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </>
    );
}
