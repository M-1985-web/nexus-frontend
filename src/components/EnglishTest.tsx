'use client';
import { useState, useEffect } from 'react';
import { nexusApi } from '@/api/nexusApi'; // Ya puedes usar @/ gracias al cambio en tsconfig.json

export default function EnglishTest({ talentoId }: { talentoId: string }) {
    const [question, setQuestion] = useState<any>(null);
    const [currentLevel, setCurrentLevel] = useState('A1');
    const [stats, setStats] = useState({ correct: 0, total: 0 });
    const [finished, setFinished] = useState(false);
    // --- NUEVO: Estado para guardar el resultado detallado del backend ---
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
            // --- MODIFICADO: Guardamos la respuesta del backend (level, strengths, etc.) ---
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

    // --- NUEVA PANTALLA DE RESULTADOS DETALLADA ---
    if (finished && result) {
        return (
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-2xl w-full border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">¡Evaluación Completada!</h2>
                    {/* Muestra el nivel (B2, C1, etc.) devuelto por el backend */}
                    <div className="mt-4 inline-block bg-blue-600 text-white text-5xl font-black px-8 py-4 rounded-2xl shadow-lg">
                        {result.level}
                    </div>
                    <p className="mt-2 text-xl text-blue-800 font-semibold">{result.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sección de Fortalezas */}
                    <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
                        <h4 className="font-bold text-green-700 mb-2 flex items-center">💪 Fortalezas</h4>
                        <ul className="text-green-900 text-sm space-y-1">
                            {result.strengths?.map((s: string) => (
                                <li key={s}>• {s}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Sección de Áreas de Mejora */}
                    <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
                        <h4 className="font-bold text-amber-700 mb-2 flex items-center">⚠️ Áreas de Mejora</h4>
                        <ul className="text-amber-900 text-sm space-y-1">
                            {result.weaknesses?.map((w: string) => (
                                <li key={w}>• {w}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Módulos recomendados integrados con el perfil de Nexus */}
                <div className="mt-8 border-t pt-6 text-center">
                    <h4 className="font-bold text-gray-700 mb-3">Módulos Nexus Sugeridos</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                        {result.recommended_modules?.map((m: string) => (
                            <span key={m} className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase">
                                {m}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!question) return <div className="p-10 text-center">Cargando evaluación...</div>;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full border border-gray-100">
            <div className="flex justify-between mb-4 text-sm font-semibold text-blue-600">
                <span>Nivel Actual: {currentLevel}</span>
                <span>Pregunta: {stats.total + 1} / 5</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">{question.text}</h3>
            <div className="space-y-3">
                {question.options?.map((opt: string) => (
                    <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="w-full text-left p-4 rounded-xl border-2 border-gray-50 hover:border-blue-500 hover:bg-blue-50 transition-all font-medium"
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}