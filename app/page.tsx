'use client';
import { useState } from 'react';
//import nexusApi from '@/api/nexusApi';
import nexusApi from '../src/api/nexusApi';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await nexusApi.post('/auth/register', { email, password });
      setMessage(`EXITO: Talento encriptado. ID: ${response.data._id}`);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Fallo en la conexión');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="border border-cyan-500 p-8 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] bg-zinc-950 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-cyan-400 tracking-widest text-center">NEXUS PROTOCOL</h1>
        <p className="text-gray-500 mb-8 text-center text-xs uppercase tracking-tighter">Terminal de registro de talento v1.0</p>

        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="EMAIL_TALENTO"
            required
            className="bg-black border border-zinc-800 p-3 rounded focus:border-cyan-400 outline-none text-cyan-50 font-mono"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="ACCESS_KEY"
            required
            className="bg-black border border-zinc-800 p-3 rounded focus:border-cyan-400 outline-none text-cyan-50 font-mono"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 text-black font-black py-3 rounded uppercase transition-all shadow-lg"
          >
            Ejecutar Autenticación
          </button>
        </form>

        {message && (
          <div className="mt-6 p-3 bg-zinc-900 border border-cyan-900 text-cyan-300 text-xs font-mono break-all">
            {`> ${message}`}
          </div>
        )}
      </div>
    </main>
  );
}