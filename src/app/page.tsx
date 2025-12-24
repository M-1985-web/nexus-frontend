'use client';
import { useState } from 'react';
import nexusApi from '../api/nexusApi';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Llamada al backend de NestJS
            const response = await nexusApi.post('/auth/register', { email, password });
            setMessage(`¡Éxito! Talento registrado en Nexus. ID: ${response.data._id}`);
        } catch (error: any) {
            // Capturamos el error (ej: si el email ya existe o es inválido)
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