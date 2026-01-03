'use client';
import { useEffect } from 'react';
import { nexusApi } from '@/api/nexusApi';
// Importamos el hook del contexto global
import { useTalento } from '@/context/TalentoContext';
// Icono para la medalla
import { HiCheckBadge } from "react-icons/hi2";

export function Sidebar({ talentoId }: { talentoId: string }) {
    // Usamos el estado global para actualización inmediata en toda la app
    const { englishLevel, setEnglishLevel } = useTalento();

    useEffect(() => {
        // Carga inicial del nivel desde MongoDB Atlas
        const fetchLevel = async () => {
            try {
                const result = await nexusApi.getResult(talentoId);
                if (result && result.level) {
                    setEnglishLevel(result.level);
                }
            } catch (error) {
                console.error("Error cargando nivel inicial:", error);
            }
        };
        fetchLevel();
    }, [talentoId, setEnglishLevel]);

    return (
        <aside className="w-64 h-screen bg-slate-900 text-white p-6 flex flex-col shadow-2xl">
            {/* Logo de la plataforma */}
            <div className="mb-10">
                <h2 className="text-xl font-black tracking-tight text-blue-500">
                    NEXUS <span className="text-white">TALENTO</span>
                </h2>
            </div>

            {/* --- MEDALLA DE NIVEL VERIFICADO CON ANIMACIONES --- */}
            <div className="mb-8 p-4 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm relative overflow-hidden group">

                {/* 1. EFECTO DE BRILLO: Se intensifica cuando ya hay un nivel cargado */}
                <div className={`absolute -right-2 -top-2 w-16 h-16 rounded-full blur-2xl transition-all duration-700 ${englishLevel !== '...' ? 'bg-blue-500/30 animate-pulse' : 'bg-blue-600/10'
                    }`}></div>

                <div className="flex items-center gap-2 mb-2">
                    {/* 2. ICONO REACTIVO: Cambia de color si está verificado */}
                    <HiCheckBadge className={`text-xl transition-colors ${englishLevel !== '...' ? 'text-blue-400' : 'text-slate-500'
                        }`} />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        English Status
                    </p>
                </div>

                <div className="flex items-end justify-between">
                    <div>
                        {/* 3. TEXTO DINÁMICO: Animación pulse suave al detectar nivel */}
                        <p className={`text-4xl font-black leading-none transition-all ${englishLevel !== '...' ? 'text-white animate-pulse' : 'text-slate-600'
                            }`}>
                            {englishLevel}
                        </p>
                        <p className="text-[9px] text-blue-400 font-bold mt-2 tracking-tighter">
                            CERTIFICADO POR NEXUS AI
                        </p>
                    </div>

                    {/* 4. BADGE CIRCULAR: Añadimos 'animate-bounce' suave y sombra intensa (glow) */}
                    <div className={`h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center border border-blue-400/30 transition-all duration-500 ${englishLevel !== '...'
                            ? 'shadow-[0_0_20px_rgba(37,99,235,0.6)] animate-[bounce_3s_infinite]'
                            : 'grayscale opacity-50'
                        }`}>
                        <span className="text-[10px] font-black italic">EN</span>
                    </div>
                </div>
            </div>

            {/* Navegación */}
            <nav className="space-y-4">
                <div className="text-xs font-semibold text-slate-500 uppercase px-2">Menú</div>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm">
                    Dashboard
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm text-blue-400 font-bold">
                    Mis Evaluaciones
                </button>
            </nav>
        </aside>
    );
}