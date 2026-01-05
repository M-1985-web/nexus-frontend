'use client';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import EnglishTest from '@/components/EnglishTest';

export default function EvaluacionPage() {
    const [talentoId, setTalentoId] = useState<string | null>(null);

    useEffect(() => {
        const storedId = localStorage.getItem('nexus_talento_id');
        setTalentoId(storedId);
    }, []);

    if (!talentoId) return null;

    return (
        <div className="flex min-h-screen bg-transparent selection:bg-blue-500/30">
            <Sidebar talentoId={talentoId} />

            <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl">
                    <h1 className="text-blue-400 text-xs font-mono mb-10 opacity-70 uppercase tracking-[0.4em] text-center animate-pulse">
                        Protocolo de Verificación de Idioma v1.0
                    </h1>
                    <div className="relative">
                        {/* El TEST ahora usa el ID REAL para guardar resultados */}
                        <EnglishTest talentoId={talentoId} />
                    </div>
                </div>
            </main>
        </div>
    );
}