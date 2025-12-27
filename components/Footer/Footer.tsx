'use client';

import { Instagram, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();

    return (
        <footer className="bg-black text-white py-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Logo & Tagline */}
                    <div>
                        <h3 className="text-3xl font-serif font-bold mb-3">FONDASI</h3>
                        <p className="text-gray-400 text-sm">
                            {t('footer.tagline')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>
                                <a href="#hero" className="hover:text-white transition-colors">
                                    {t('nav.home')}
                                </a>
                            </li>
                            <li>
                                <a href="#introduction" className="hover:text-white transition-colors">
                                    {t('nav.about')}
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-white transition-colors">
                                    {t('nav.services')}
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:text-white transition-colors">
                                    {t('nav.contact')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.followUs')}</h4>
                        <div className="flex gap-4">
                            <a
                                href="https://instagram.com/fondasi.creative"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://linkedin.com/company/fondasi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="mailto:hello@fondasi.id"
                                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                                aria-label="Email"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>© {currentYear} {t('footer.copyright')}</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors">
                                {t('footer.privacy')}
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                {t('footer.terms')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
