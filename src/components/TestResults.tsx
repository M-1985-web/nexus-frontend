'use client';
import { useRouter } from 'next/navigation';
import { HiCheckBadge } from "react-icons/hi2";

interface ResultsProps {
    level: string;
    talentoId: string;
}

export default function TestResults({ level, talentoId }: ResultsProps) {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center py-10 animate-in zoom-in duration-500">
            {/* Animación de Medalla Brillante */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative h-32 w-32 bg-gradient-to-br from-slate-800 to-slate-950 rounded-full border-2 border-cyan-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                    <span className="text-6xl font-black text-white tracking-tighter italic">
                        {level}
                    </span>
                    <HiCheckBadge className="absolute -bottom-2 -right-2 text-4xl text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                </div>
            </div>

            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
                Nivel <span className="text-cyan-400">Sincronizado</span>
            </h2>
            <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-10 text-center max-w-xs leading-relaxed">
                Tu perfil de talento ha sido actualizado en la matriz nexus con éxito.
            </p>

            {/* Barra de progreso decorativa */}
            <div className="w-full max-w-xs h-1 bg-slate-800 rounded-full mb-10 overflow-hidden">
                <div className="h-full bg-cyan-500 animate-[progress_2s_ease-in-out]"></div>
            </div>

            <button
                onClick={() => router.push('/dashboard')}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 px-10 rounded-2xl uppercase text-[11px] tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
            >
                Volver al Panel de Control
            </button>
        </div>
    );
}
