
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { translations, Language } from '@/lib/translations'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
    dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en')
    const [isLoaded, setIsLoaded] = useState(false)

    // Load language from localStorage
    useEffect(() => {
        const savedLang = localStorage.getItem('mamilo-lang') as Language
        if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
            setLanguageState(savedLang)
        }
        setIsLoaded(true)
    }, [])

    // Update document direction and persist
    useEffect(() => {
        if (!isLoaded) return;

        const dir = language === 'ar' ? 'rtl' : 'ltr'
        document.documentElement.dir = dir
        document.documentElement.lang = language
        localStorage.setItem('mamilo-lang', language)
    }, [language, isLoaded])

    const t = (path: string) => {
        const keys = path.split('.')
        let current: any = translations[language]

        for (const key of keys) {
            if (current[key] === undefined) {
                // Fallback to English if translation missing
                console.warn(`Missing translation for ${path} in ${language}`)
                return path
            }
            current = current[key]
        }

        return current as string
    }

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
    }

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage,
            t,
            dir: language === 'ar' ? 'rtl' : 'ltr'
        }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
