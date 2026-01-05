'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import nexusApi from '../api/nexusApi';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Intento de conexión al backend
            const response = await nexusApi.post('/auth/login', { email, password });

            // Si el backend responde 200/201, guardamos el ID
            const talentoId = response.data.talentoId || response.data._id;

            if (talentoId) {
                localStorage.setItem('nexus_talento_id', talentoId);
                setMessage('ACCESO CONCEDIDO. SINCRONIZANDO...');
                setTimeout(() => router.push('/dashboard'), 1500);
            }
        } catch (error: any) {
            setLoading(false);
            // Manejo específico del error 401 que ves en consola
            if (error.response?.status === 401) {
                setMessage('CREDENCIALES NO VÁLIDAS EN NEXUS');
            } else {
                setMessage('FALLO DE CONEXIÓN CON LA MATRIZ');
            }
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-[440px] border border-cyan-500/20 p-8 md:p-12 rounded-[2rem] shadow-[0_0_60px_rgba(6,182,212,0.1)] bg-slate-900/40 backdrop-blur-2xl relative">

                <div className="text-center mb-12">
                    <h1 className="text-3xl font-black mb-3 tracking-tighter uppercase italic">
                        NEXUS <span className="text-cyan-400 not-italic text-4xl">PROTOCOL</span>
                    </h1>
                    <p className="text-cyan-400/40 text-[9px] font-mono uppercase tracking-[0.5em] animate-pulse">
                        Authentication Required
                    </p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-[0.2em] ml-1">Identificador (Email)</label>
                        <input
                            type="email"
                            required
                            placeholder="user@nexus.network"
                            className="w-full bg-slate-950/80 border border-slate-800 p-4 rounded-2xl focus:border-cyan-500 outline-none transition-all text-cyan-100 text-sm placeholder:text-slate-700"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-[0.2em] ml-1">Clave de Acceso</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-slate-950/80 border border-slate-800 p-4 rounded-2xl focus:border-cyan-500 outline-none transition-all text-cyan-100 text-sm placeholder:text-slate-700"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 bg-cyan-500/10 border border-cyan-500/40 hover:bg-cyan-500 hover:text-white text-cyan-400 font-black py-4 rounded-2xl uppercase text-[11px] tracking-[0.3em] transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Validando...' : 'Autenticar Talento'}
                    </button>
                </form>

                {message && (
                    <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                        <p className="text-[10px] text-red-400 font-mono uppercase text-center tracking-widest leading-relaxed">
                            {message}
                        </p>
                    </div>
                )}
            </div>

            <button
                onClick={() => router.push('/register')}
                className="mt-10 text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em] hover:text-cyan-400 transition-colors"
            >
                ¿Nuevo en la red? <span className="underline decoration-cyan-500/30 underline-offset-4">Registrar perfil</span>
            </button>
        </main>
    );
}