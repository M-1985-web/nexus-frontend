'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import nexusApi from '../../api/nexusApi';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Conexión real con tu API de MongoDB Atlas
            const response = await nexusApi.post('/auth/register', { email, password });
            setMessage(`¡Éxito! Perfil registrado. ID: ${response.data._id}`);

            // Redirigimos al login después de 2 segundos para que el usuario pueda entrar
            setTimeout(() => {
                router.push('/');
            }, 2000);

        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Fallo en la sincronización con la red');
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md border border-blue-500/30 p-10 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.15)] bg-slate-900/40 backdrop-blur-xl relative overflow-hidden">

                {/* Línea neón decorativa */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black mb-2 text-white tracking-tighter uppercase">
                        NUEVO <span className="text-blue-500">TALENTO</span>
                    </h1>
                    <p className="text-blue-400/50 text-[10px] font-mono uppercase tracking-[0.4em]">
                        Alta de perfil en la red Nexus
                    </p>
                </div>

                <form onSubmit={handleRegister} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-mono text-blue-300/60 uppercase ml-1 tracking-widest">Correo Electrónico</label>
                        <input
                            type="email"
                            required
                            placeholder="recluta@nexus.com"
                            className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all text-blue-50 text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-mono text-blue-300/60 uppercase ml-1 tracking-widest">Clave de Seguridad</label>
                        <input
                            type="password"
                            required
                            placeholder="Mínimo 6 caracteres"
                            className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl focus:border-blue-500 outline-none transition-all text-blue-50 text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 bg-blue-600/20 border border-blue-500/50 hover:bg-blue-600 hover:text-white text-blue-400 font-bold py-4 rounded-2xl uppercase text-xs tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] disabled:opacity-50"
                    >
                        {loading ? 'Procesando...' : 'Crear Perfil Nexus'}
                    </button>
                </form>

                {message && (
                    <div className={`mt-8 p-4 border-l-4 rounded-r-xl ${message.includes('Éxito') ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-red-500/10 border-red-500 text-red-400'}`}>
                        <p className="text-[10px] font-mono uppercase leading-relaxed">{message}</p>
                    </div>
                )}
            </div>

            <p className="mt-8 text-white/30 text-[10px] font-mono uppercase tracking-widest">
                ¿Ya tienes acceso? <span
                    onClick={() => router.push('/')}
                    className="text-blue-400 cursor-pointer hover:underline"
                >Volver al portal</span>
            </p>
        </main>
    );
}