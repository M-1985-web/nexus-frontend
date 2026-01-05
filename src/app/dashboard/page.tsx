'use client';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import Link from 'next/link';
// IMPORTANTE: Importamos el protector que creamos en el paso anterior
import AuthGuard from '@/components/AuthGuard';

export default function DashboardPage() {
    const [talentoId, setTalentoId] = useState<string | null>(null);

    useEffect(() => {
        // Obtenemos el ID real del usuario logueado
        const storedId = localStorage.getItem('nexus_talento_id');
        setTalentoId(storedId);
    }, []);

    return (
        <AuthGuard>
            <div className="flex min-h-screen bg-transparent">
                {/* Solo renderizamos el contenido si talentoId existe. 
                  AuthGuard se encarga de rebotar al usuario si esto falla.
                */}
                {talentoId && <Sidebar talentoId={talentoId} />}

                <main className="flex-1 p-8 md:p-12 animate-in fade-in duration-700">
                    {/* Header de la Consola */}
                    <header className="mb-12">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-1 w-12 bg-cyan-500 rounded-full"></div>
                            <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.5em]">
                                Sistema Nexus v1.0
                            </span>
                        </div>
                        <h1 className="text-5xl font-black text-white uppercase tracking-tighter">
                            Panel de <span className="text-cyan-400">Control</span>
                        </h1>
                        <p className="text-slate-400 font-mono text-xs mt-3 uppercase tracking-widest opacity-60">
                            Bienvenido, Agente de Talento. Protocolo de sincronización activo.
                        </p>
                    </header>

                    {/* Rejilla de Información */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* TARJETA 2: ACCESO A EVALUACIÓN (Interactiva) */}
                        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl border-l-cyan-500/50 relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>

                            <h3 className="text-cyan-400 text-[10px] font-mono uppercase mb-6 tracking-widest">
                                Misión Pendiente
                            </h3>
                            <p className="text-xl text-white font-bold leading-tight mb-6">
                                Test de Inglés Adaptativo
                            </p>

                            <Link
                                href="/evaluacion"
                                className="inline-flex items-center gap-2 text-[10px] text-cyan-400 hover:text-white transition-all uppercase font-black tracking-widest group-hover:gap-4"
                            >
                                Iniciar Protocolo <span>→</span>
                            </Link>
                        </div>

                        {/* TARJETA 3: LOGS DE ACTIVIDAD */}
                        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl">
                            <h3 className="text-slate-500 text-[10px] font-mono uppercase mb-6 tracking-widest">
                                Logs de Red
                            </h3>
                            <div className="space-y-3 font-mono text-[9px]">
                                <div className="flex gap-3 text-emerald-500/60">
                                    <span>[OK]</span>
                                    <span>SESIÓN ACTIVA: {talentoId?.slice(-6).toUpperCase()}</span>
                                </div>
                                <div className="flex gap-3 text-cyan-500/60">
                                    <span>[IN]</span>
                                    <span>BASE DE DATOS ATLAS CONECTADA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}