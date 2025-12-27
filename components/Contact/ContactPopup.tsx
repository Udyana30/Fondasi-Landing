'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface ContactPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Client-side validation
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Validate name (no numbers)
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name)) {
            newErrors.name = 'Name should only contain letters';
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Validate phone
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[0-9\s\-\+\(\)]+$/.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number format';
        }

        // Validate service
        if (!formData.service) {
            newErrors.service = 'Please select a service';
        }

        // Validate message
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message should be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({});
        setSubmitError(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setIsSubmitting(false);
            setSubmitSuccess(true);

            setTimeout(() => {
                setFormData({ name: '', email: '', phone: '', service: '', message: '' });
                setSubmitSuccess(false);
                onClose();
            }, 2500);
        } catch (error) {
            setIsSubmitting(false);
            setSubmitError(error instanceof Error ? error.message : 'Failed to send message');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Mobile: full screen, Desktop: centered modal */}
                    <div className="fixed inset-0 md:flex md:items-center md:justify-center md:p-6 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            className="bg-white h-full md:h-auto md:rounded-2xl shadow-2xl w-full md:max-w-3xl md:max-h-[90vh] overflow-y-auto relative"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                                aria-label="Close"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-6 md:p-10">
                                <div className="mb-6 md:mb-8">
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-2 pr-8">
                                        {t('contact.form.title')}
                                    </h2>
                                    <p className="text-gray-600 text-base">
                                        {t('contact.form.subtitle')}
                                    </p>
                                </div>

                                {submitSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-12 md:py-16"
                                    >
                                        <div className="text-6xl mb-4">✓</div>
                                        <h3 className="text-2xl font-bold text-black mb-2">{t('contact.form.success')}</h3>
                                        <p className="text-gray-600">{t('contact.form.successMessage')}</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {submitError && (
                                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                                <p className="text-red-600 text-sm">{submitError}</p>
                                            </div>
                                        )}

                                        {/* Desktop: 2-column grid, Mobile: single column */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
                                                    {t('contact.form.name')}
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3.5 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base`}
                                                    placeholder={t('contact.form.namePlaceholder')}
                                                />
                                                {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                                                    {t('contact.form.email')}
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base`}
                                                    placeholder={t('contact.form.emailPlaceholder')}
                                                />
                                                {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-semibold text-black mb-2">
                                                    {t('contact.form.phone')}
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3.5 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base`}
                                                    placeholder={t('contact.form.phonePlaceholder')}
                                                />
                                                {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="service" className="block text-sm font-semibold text-black mb-2">
                                                    {t('contact.form.service')}
                                                </label>
                                                <select
                                                    id="service"
                                                    name="service"
                                                    value={formData.service}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3.5 border ${errors.service ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all text-base bg-white`}
                                                >
                                                    <option value="">{t('contact.form.servicePlaceholder')}</option>
                                                    <option value="website">{t('contact.form.serviceOptions.website')}</option>
                                                    <option value="mobile">{t('contact.form.serviceOptions.mobile')}</option>
                                                    <option value="media">{t('contact.form.serviceOptions.media')}</option>
                                                    <option value="design">{t('contact.form.serviceOptions.design')}</option>
                                                    <option value="social">{t('contact.form.serviceOptions.social')}</option>
                                                    <option value="other">{t('contact.form.serviceOptions.other')}</option>
                                                </select>
                                                {errors.service && <p className="mt-1.5 text-sm text-red-600">{errors.service}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-semibold text-black mb-2">
                                                {t('contact.form.message')}
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={5}
                                                className={`w-full px-4 py-3.5 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none text-base`}
                                                placeholder={t('contact.form.messagePlaceholder')}
                                            />
                                            {errors.message && <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                                        >
                                            {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
