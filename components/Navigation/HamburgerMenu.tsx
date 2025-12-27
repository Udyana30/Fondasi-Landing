'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

const menuItems = [
    { labelKey: 'nav.home', href: '#hero' },
    { labelKey: 'nav.about', href: '#introduction' },
    { labelKey: 'nav.services', href: '#services' },
    { labelKey: 'nav.contact', href: '#contact' }
];

export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            {/* Hamburger Button - Fixed Position */}
            <motion.button
                onClick={toggleMenu}
                className="fixed top-8 right-8 z-50 p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>

            {/* Full-Screen Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md"
                    >
                        <div className="flex items-center justify-center h-full">
                            <nav>
                                <ul className="space-y-8 text-center">
                                    {menuItems.map((item, index) => (
                                        <motion.li
                                            key={item.href}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 + 0.2 }}
                                        >
                                            <button
                                                onClick={() => handleNavClick(item.href)}
                                                className="text-5xl md:text-6xl font-serif font-bold text-black hover:text-gray-600 transition-colors"
                                            >
                                                {t(item.labelKey)}
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Decorative Element */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="absolute bottom-0 left-0 right-0 h-1 bg-black origin-left"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
