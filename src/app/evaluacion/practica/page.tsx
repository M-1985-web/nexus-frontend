// src/app/evaluacion/practica/page.tsx
'use client';

import { useEffect, useState } from 'react';
import CommunicationPractice from '@/components/PracticeInterface';

export default function PracticePage() {
    const [userData, setUserData] = useState<{ id: string; level: string } | null>(null);

    useEffect(() => {
        // Recuperamos los datos del Agente Nexus del localStorage
        const id = localStorage.getItem('nexus_talento_id');
        const level = localStorage.getItem('nexus_talento_level') || 'A1';

        if (id) {
            setUserData({ id, level });
        }
    }, []);

    if (!userData) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950">
                <p className="text-cyan-500 font-mono animate-pulse uppercase tracking-widest">
                    Cargando Protocolo de Práctica...
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 py-12 px-6">
            <CommunicationPractice
                talentoId={userData.id}
                cefrLevel={userData.level}
            />
        </main>
    );
}