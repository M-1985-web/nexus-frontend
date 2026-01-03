'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface TalentoContextType {
    englishLevel: string;
    setEnglishLevel: (level: string) => void;
}

const TalentoContext = createContext<TalentoContextType | undefined>(undefined);

export function TalentoProvider({ children }: { children: ReactNode }) {
    const [englishLevel, setEnglishLevel] = useState('...'); // Estado global

    return (
        <TalentoContext.Provider value={{ englishLevel, setEnglishLevel }}>
            {children}
        </TalentoContext.Provider>
    );
}

export const useTalento = () => {
    const context = useContext(TalentoContext);
    if (!context) throw new Error('useTalento debe usarse dentro de TalentoProvider');
    return context;
};