'use client';
import { useState, useEffect } from 'react';
import { nexusApi } from '@/api/nexusApi';

export default function EnglishTest({ talentoId }: { talentoId: string }) {
    const [question, setQuestion] = useState<any>(null);
    const [currentLevel, setCurrentLevel] = useState('A1');
    const [stats, setStats] = useState({ correct: 0, total: 0 });
    const [finished, setFinished] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadQuestion('A1');
    }, []);

    const loadQuestion = async (level: string) => {
        setLoading(true);
        try {
            const data = await nexusApi.getNextQuestion(level.trim().toUpperCase());
            if (data && data.text) {
                setQuestion(data);
            } else {
                console.warn(`Protocolo: Reintentando nivel base para evitar bloqueo en ${level}`);
                const fallbackData = await nexusApi.getNextQuestion('A1');
                setQuestion(fallbackData);
            }
        } catch (error) {
            console.error("Error en Protocolo de Carga:", error);
        } finally {
            // Un pequeño delay para que la transición neón sea visible
            setTimeout(() => setLoading(false), 300);
        }
    };

    const handleAnswer = async (option: string) => {
        if (loading || !question) return;
        setLoading(true); // Bloqueamos interacción inmediata

        try {
            const { isCorrect } = await nexusApi.checkAnswer(question._id, option);

            // Calculamos los nuevos valores localmente para evitar desfases de estado
            const newCorrect = isCorrect ? stats.correct + 1 : stats.correct;
            const newTotal = stats.total + 1;

            // Actualizamos el estado para la UI
            setStats({ correct: newCorrect, total: newTotal });

            // AJUSTE CRÍTICO: Si llegamos al final (Fase 5 respondida)
            if (newTotal >= 5) {
                const finalData = await nexusApi.finishTest(talentoId, newCorrect, newTotal);
                setResult(finalData);
                setFinished(true);
            } else {
                // Si aún no termina, calculamos nivel y cargamos siguiente
                const nextLevel = isCorrect ? getNextLevel(currentLevel) : currentLevel;
                setCurrentLevel(nextLevel);
                await loadQuestion(nextLevel);
            }
        } catch (error) {
            console.error("Fallo en la verificación de respuesta:", error);
            setLoading(false);
        }
    };

    const getNextLevel = (lvl: string) => {
        const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
        const currentIndex = levels.indexOf(lvl);
        // Si no hay más niveles, se queda en el máximo
        return levels[currentIndex + 1] || 'C1';
    };

    // --- PANTALLA DE RESULTADOS (Impacto Visual) ---
    if (finished && result) {
        return (
            <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl max-w-2xl w-full animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Evaluación Finalizada</h2>
                    <div className="mt-6 inline-block bg-blue-600/20 border border-blue-500/50 text-blue-400 text-6xl font-black px-10 py-6 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                        {result.level || 'A1'}
                    </div>
                    <p className="mt-4 text-blue-200/70 font-medium italic">
                        {result.description || "Protocolo de análisis completado con éxito."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/20">
                        <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">💪 Fortalezas</h4>
                        <ul className="text-emerald-100/60 text-sm space-y-1">
                            {result.strengths?.map((s: string) => <li key={s}>• {s}</li>)}
                        </ul>
                    </div>
                    <div className="bg-amber-500/5 p-5 rounded-2xl border border-amber-500/20">
                        <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2">⚠️ Mejoras</h4>
                        <ul className="text-amber-100/60 text-sm space-y-1">
                            {result.weaknesses?.map((w: string) => <li key={w}>• {w}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    // --- ESTADO DE CARGA ---
    if (!question || loading) {
        return (
            <div className="p-10 text-center flex flex-col items-center justify-center min-h-[350px]">
                <div className="w-14 h-14 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]"></div>
                <div className="font-mono text-blue-400 animate-pulse tracking-[0.2em] uppercase text-[10px]">
                    Sincronizando Nivel {currentLevel}...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-transparent w-full animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="flex justify-between items-center mb-10 px-2">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-blue-400/60 uppercase tracking-widest">Protocolo Actual</span>
                    <span className="text-sm font-bold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-lg border border-blue-400/20">
                        {currentLevel}
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-mono text-white/20 uppercase block mb-1">Fase del Sistema</span>
                    <span className="text-sm font-mono text-white/60 font-bold">{stats.total + 1} / 5</span>
                </div>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-10 leading-tight tracking-tight">
                {question.text}
            </h3>

            <div className="grid grid-cols-1 gap-4">
                {question.options?.map((opt: string) => (
                    <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="btn-nexus-neon w-full text-left p-6 rounded-2xl bg-slate-900/40 text-white/70 hover:text-white font-medium border border-white/5 transition-all duration-300"
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}