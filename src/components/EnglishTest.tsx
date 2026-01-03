'use client';
import { useState, useEffect } from 'react';
import { nexusApi } from '@/api/nexusApi';

export default function EnglishTest({ talentoId }: { talentoId: string }) {
    const [question, setQuestion] = useState<any>(null);
    const [currentLevel, setCurrentLevel] = useState('A1');
    const [stats, setStats] = useState({ correct: 0, total: 0 });
    const [finished, setFinished] = useState(false);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        loadQuestion('A1');
    }, []);

    const loadQuestion = async (level: string) => {
        const data = await nexusApi.getNextQuestion(level);
        setQuestion(data);
    };

    const handleAnswer = async (option: string) => {
        const { isCorrect } = await nexusApi.checkAnswer(question._id, option);
        const newCorrect = isCorrect ? stats.correct + 1 : stats.correct;
        const newTotal = stats.total + 1;
        setStats({ correct: newCorrect, total: newTotal });

        if (newTotal >= 5) {
            const finalData = await nexusApi.finishTest(talentoId, newCorrect, newTotal);
            setResult(finalData);
            setFinished(true);
        } else {
            const nextLevel = isCorrect ? getNextLevel(currentLevel) : currentLevel;
            setCurrentLevel(nextLevel);
            loadQuestion(nextLevel);
        }
    };

    const getNextLevel = (lvl: string) => {
        const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
        return levels[levels.indexOf(lvl) + 1] || 'C1';
    };

    // --- PANTALLA DE RESULTADOS ESTILO NEXUS (FONDO OSCURO) ---
    if (finished && result) {
        return (
            <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl max-w-2xl w-full animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Evaluación Finalizada</h2>

                    {/* El Nivel con efecto neón central */}
                    <div className="mt-6 inline-block bg-blue-600/20 border border-blue-500/50 text-blue-400 text-6xl font-black px-10 py-6 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                        {result.level}
                    </div>
                    <p className="mt-4 text-blue-200/70 font-medium italic">{result.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Fortalezas */}
                    <div className="bg-emerald-500/5 p-5 rounded-2xl border border-emerald-500/20">
                        <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">💪 Fortalezas</h4>
                        <ul className="text-emerald-100/60 text-sm space-y-1">
                            {result.strengths?.map((s: string) => (
                                <li key={s}>• {s}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Mejoras */}
                    <div className="bg-amber-500/5 p-5 rounded-2xl border border-amber-500/20">
                        <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2">⚠️ Áreas de Mejora</h4>
                        <ul className="text-amber-100/60 text-sm space-y-1">
                            {result.weaknesses?.map((w: string) => (
                                <li key={w}>• {w}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Módulos Nexus */}
                <div className="mt-8 border-t border-white/5 pt-6 text-center">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">Sistemas Sugeridos</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                        {result.recommended_modules?.map((m: string) => (
                            <span key={m} className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                                {m}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!question) return <div className="p-10 text-center font-mono text-blue-400 animate-pulse">Iniciando Protocolo...</div>;

    // --- PANTALLA DE PREGUNTAS CON BOTONES NEÓN ---
    return (
        <div className="bg-transparent w-full">
            <div className="flex justify-between items-center mb-6 px-2">
                <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                    NIVEL: {currentLevel}
                </span>
                <span className="text-xs font-mono text-white/40">
                    PROGRESO: {stats.total + 1} / 5
                </span>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-8 leading-tight">{question.text}</h3>

            <div className="space-y-4">
                {question.options?.map((opt: string) => (
                    <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        /* MODIFICACIÓN: Aplicación de la clase neón y estilos oscuros */
                        className="btn-nexus-neon w-full text-left p-5 rounded-2xl bg-slate-900/40 text-white/80 hover:text-white font-medium shadow-sm transition-all"
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}