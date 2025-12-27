'use client';

import { useLanguage } from '@/lib/contexts/LanguageContext';
import { motion } from 'motion/react';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'id' : 'en');
    };

    return (
        <motion.button
            onClick={toggleLanguage}
            className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle language"
        >
            <Globe size={20} />
            <span className="font-semibold text-sm uppercase">{language}</span>
        </motion.button>
    );
}
