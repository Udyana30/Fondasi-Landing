import en from './en.json';
import id from './id.json';

export const translations = {
    en,
    id
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = typeof en;
