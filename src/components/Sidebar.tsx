'use client';
import { useEffect } from 'react';
import { nexusApi } from '@/api/nexusApi';
import { useTalento } from '@/context/TalentoContext';
import { HiCheckBadge } from "react-icons/hi2";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function Sidebar({ talentoId }: { talentoId: string }) {
    const { englishLevel, setEnglishLevel } = useTalento();
    const pathname = usePathname();
    const router = useRouter(); // Instanciamos el router para la redirección

    useEffect(() => {
        const fetchLevel = async () => {
            if (!talentoId) return;
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

    // Función de Cierre de Sesión
    const handleLogout = () => {
        // 1. Eliminamos el ID del almacenamiento local
        localStorage.removeItem('nexus_talento_id');

        // 2. Reiniciamos el estado del nivel en el contexto
        setEnglishLevel('...');

        // 3. Redirigimos a la pantalla de Login
        router.push('/');
    };

    const linkStyle = (path: string) => `
        w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm flex items-center gap-3
        ${pathname === path
            ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
    `;

    return (
        <aside className="w-64 h-screen bg-slate-900 text-white p-6 flex flex-col shadow-2xl border-r border-white/5">
            {/* Logo de la plataforma */}
            <div className="mb-10 px-2">
                <h2 className="text-xl font-black tracking-tight text-blue-500 uppercase">
                    Nexus <span className="text-white">Talento</span>
                </h2>
                <div className="h-0.5 w-8 bg-blue-500 mt-1 rounded-full"></div>
            </div>

            {/* MEDALLA DE NIVEL VERIFICADO */}
            <div className="mb-8 p-4 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm relative overflow-hidden group">
                <div className={`absolute -right-2 -top-2 w-16 h-16 rounded-full blur-2xl transition-all duration-700 ${englishLevel !== '...' ? 'bg-blue-500/30 animate-pulse' : 'bg-blue-600/10'}`}></div>

                <div className="flex items-center gap-2 mb-2">
                    <HiCheckBadge className={`text-xl transition-colors ${englishLevel !== '...' ? 'text-blue-400' : 'text-slate-500'}`} />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">English Status</p>
                </div>

                <div className="flex items-end justify-between">
                    <div>
                        <p className={`text-4xl font-black leading-none transition-all ${englishLevel !== '...' ? 'text-white' : 'text-slate-600'}`}>
                            {englishLevel}
                        </p>
                        <p className="text-[9px] text-blue-400 font-bold mt-2 tracking-tighter uppercase">Certificado Nexus</p>
                    </div>
                    <div className={`h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center border border-blue-400/30 transition-all duration-500 ${englishLevel !== '...' ? 'shadow-[0_0_20px_rgba(37,99,235,0.6)] animate-[bounce_3s_infinite]' : 'grayscale opacity-50'}`}>
                        <span className="text-[10px] font-black italic">EN</span>
                    </div>
                </div>
            </div>

            {/* Navegación */}
            <nav className="space-y-2 flex-1">
                <div className="text-[10px] font-mono font-semibold text-slate-500 uppercase px-4 mb-4 tracking-[0.2em]">Menú de Sistema</div>

                <Link href="/dashboard" className={linkStyle('/dashboard')}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    Dashboard
                </Link>

                <Link href="/evaluacion" className={linkStyle('/evaluacion')}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    Mis Evaluaciones
                </Link>
            </nav>

            {/* Botón de Salida funcional */}
            <div className="mt-auto pt-6 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="w-full text-xs text-slate-500 hover:text-red-400 hover:bg-red-400/5 transition-all flex items-center gap-2 px-4 py-3 rounded-xl font-mono uppercase tracking-wider"
                >
                    <span className="text-lg">✕</span> Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}