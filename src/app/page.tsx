'use client';
import { Sidebar } from '@/components/Sidebar';
import EnglishTest from '@/components/EnglishTest';
import { useState } from 'react';
import nexusApi from '../api/nexusApi';

export default function Home() {
    // ID de talento para la prueba
    const TEST_TALENTO_ID = "6776e6a88b5066601b50030d";

    return (
        /* MODIFICACIÓN: Se cambió bg-slate-950 por una clase que permite ver el gradiente del globals.css */
        <div className="flex min-h-screen bg-transparent selection:bg-blue-500/30">

            {/* Sidebar con la medalla reactiva */}
            <Sidebar talentoId={TEST_TALENTO_ID} />

            {/* Área principal del test adaptativo */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">

                {/* MODIFICACIÓN: Contenedor con efecto de cristal (glassmorphism) para mayor impacto visual */}
                <div className="w-full max-w-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl">

                    {/* MODIFICACIÓN: Título con estilo tipográfico de terminal de alta tecnología */}
                    <h1 className="text-blue-400 text-xs font-mono mb-10 opacity-70 uppercase tracking-[0.4em] text-center animate-pulse">
                        Protocolo de Verificación de Idioma v1.0
                    </h1>

                    {/* MODIFICACIÓN: Contenedor para el componente EnglishTest para asegurar que herede los estilos neón */}
                    <div className="relative">
                        <EnglishTest talentoId={TEST_TALENTO_ID} />
                    </div>

                    {/* DECORACIÓN VISUAL: Una pequeña línea sutil al final para cerrar el diseño */}
                    <div className="mt-8 flex justify-center gap-2 opacity-20">
                        <div className="h-1 w-1 bg-blue-500 rounded-full"></div>
                        <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
                        <div className="h-1 w-1 bg-blue-500 rounded-full"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// ==========================================
// NEXUS PROTOCOL - LOGIN (CÓDIGO COMENTADO)
// ==========================================
/*
export function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await nexusApi.post('/auth/register', { email, password });
            setMessage(`¡Éxito! Talento registrado en Nexus. ID: ${response.data._id}`);
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Fallo en la conexión con la matriz');
        }
    };

    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="border border-cyan-500 p-8 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] bg-gray-900/50">
                <h1 className="text-3xl font-bold mb-6 text-cyan-400 tracking-widest text-center">
                    NEXUS PROTOCOL
                </h1>
                <p className="text-gray-400 mb-8 text-center text-sm italic">
                    Ingresando datos al sistema de emparejamiento...
                </p>

                <form onSubmit={handleRegister} className="flex flex-col gap-5 w-80">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-cyan-300 ml-1">IDENTIFICADOR (EMAIL)</label>
                        <input
                            type="email"
                            required
                            className="bg-black border border-gray-700 p-3 rounded focus:border-cyan-400 outline-none transition-all text-cyan-50"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-cyan-300 ml-1">CLAVE DE ACCESO</label>
                        <input
                            type="password"
                            required
                            className="bg-black border border-gray-700 p-3 rounded focus:border-cyan-400 outline-none transition-all text-cyan-50"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-transparent border border-cyan-500 hover:bg-cyan-500/20 text-cyan-400 font-bold py-3 rounded uppercase tracking-tighter transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                    >
                        Autenticar Talento
                    </button>
                </form>

                {message && (
                    <div className="mt-6 p-3 bg-gray-800 border-l-4 border-yellow-500">
                        <p className="text-xs text-yellow-400 font-mono uppercase">{message}</p>
                    </div>
                )}
            </div>
        </main>
    );
}
*/