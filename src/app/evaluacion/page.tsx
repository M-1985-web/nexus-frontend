'use client';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import EnglishTest from '@/components/EnglishTest';
// IMPORTANTE: Importamos el protector de rutas
import AuthGuard from '@/components/AuthGuard';

export default function EvaluacionPage() {
    const [talentoId, setTalentoId] = useState<string | null>(null);

    useEffect(() => {
        // Recuperamos el ID del talento desde el almacenamiento local
        const storedId = localStorage.getItem('nexus_talento_id');
        setTalentoId(storedId);
    }, []);

    return (
        <AuthGuard>
            <div className="flex min-h-screen bg-transparent selection:bg-blue-500/30">

                {/* Renderizado condicional del Sidebar: 
                   Solo se muestra si talentoId ya fue leído del localStorage 
                */}
                {talentoId && <Sidebar talentoId={talentoId} />}

                <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden">

                        {/* Decoración Neón de fondo */}
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

                        <h1 className="text-blue-400 text-[10px] font-mono mb-10 opacity-70 uppercase tracking-[0.5em] text-center animate-pulse">
                            Protocolo de Verificación de Idioma v1.0
                        </h1>

                        <div className="relative z-10">
                            {/* Pasamos el talentoId real al componente del test 
                               para que los resultados se guarden en el perfil correcto 
                            */}
                            {talentoId && <EnglishTest talentoId={talentoId} />}
                        </div>

                        {/* Indicadores visuales de sistema Nexus */}
                        <div className="mt-12 flex justify-center items-center gap-4 opacity-30">
                            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500"></div>
                            <div className="flex gap-1">
                                <div className="h-1 w-1 bg-blue-500 rounded-full"></div>
                                <div className="h-1 w-3 bg-blue-500 rounded-full"></div>
                                <div className="h-1 w-1 bg-blue-500 rounded-full"></div>
                            </div>
                            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500"></div>
                        </div>
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}