'use client';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import Link from 'next/link';

export default function DashboardPage() {
    const [talentoId, setTalentoId] = useState<string | null>(null);

    useEffect(() => {
        // Obtenemos el ID real del usuario logueado
        const storedId = localStorage.getItem('nexus_talento_id');
        setTalentoId(storedId);
    }, []);

    // Mientras carga el ID, mostramos un loader elegante
    if (!talentoId) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-cyan-500 text-xs tracking-[0.5em] animate-pulse">
            Sincronizando Credenciales...
        </div>
    );

    return (
        <div className="flex min-h-screen bg-transparent">
            {/* El Sidebar ahora recibe el ID REAL */}
            <Sidebar talentoId={talentoId} />

            <main className="flex-1 p-8 md:p-12 animate-in fade-in duration-700">
                {/* ... (El resto de tu código del Dashboard se mantiene igual) ... */}
                <header className="mb-12">
                    <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Panel de <span className="text-cyan-400">Control</span></h1>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl border-l-cyan-500/50">
                        <h3 className="text-cyan-400 text-[10px] font-mono uppercase mb-6 tracking-widest">Misión Pendiente</h3>
                        <p className="text-xl text-white font-bold leading-tight mb-6">Test de Inglés Adaptativo</p>
                        <Link href="/evaluacion" className="text-cyan-400 hover:text-white transition-all uppercase font-black tracking-widest text-[10px]">Iniciar Protocolo →</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}