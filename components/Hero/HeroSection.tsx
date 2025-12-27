'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import Beams from '../Beams';

export default function HeroSection() {
    const { t } = useLanguage();

    const scrollToIntro = () => {
        const element = document.querySelector('#introduction');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToContact = () => {
        const element = document.querySelector('#contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden">
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

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center max-w-5xl"
                >
                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
                        {t('hero.title')}
                    </h1>

                    {/* Sub-headline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light"
                    >
                        {t('hero.subtitle')}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        onClick={scrollToContact}
                        className="px-8 py-4 bg-white text-black font-semibold text-lg rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                    >
                        {t('hero.cta')}
                    </motion.button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    onClick={scrollToIntro}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-white"
                    >
                        <ChevronDown size={32} />
                    </motion.div>
                </motion.button>
            </div>
        </section>
    );
}
