'use client';
import { useState } from 'react';
import { nexusApi } from '@/api/nexusApi';
import TestResults from './TestResults';

// Definimos 10 preguntas para una evaluación más precisa
const questions = [
    { question: "Choose the correct form: 'He _______ to the gym every day.'", options: ["go", "goes", "going", "gone"], correct: 1 },
    { question: "Select the professional greeting:", options: ["What's up?", "Hey you!", "Dear hiring manager,", "Hiya!"], correct: 2 },
    { question: "Which one is a technology skill?", options: ["Cooking", "React.js", "Driving", "Singing"], correct: 1 },
    { question: "Past tense of 'Speak':", options: ["Speaked", "Spoken", "Spoke", "Speaking"], correct: 2 },
    { question: "Complete: 'I am looking forward to _______ from you.'", options: ["hear", "hearing", "heard", "hears"], correct: 1 },
    { question: "Which sentence is correct?", options: ["I has a car", "She have a car", "They has a car", "He has a car"], correct: 3 },
    { question: "Identify the software tool:", options: ["Hammer", "Visual Studio Code", "Screwdriver", "Wrench"], correct: 1 },
    { question: "Synonym of 'Efficient':", options: ["Slow", "Productive", "Lazy", "Weak"], correct: 1 },
    { question: "Opposite of 'Remote work':", options: ["Online work", "Home office", "On-site work", "Freelancing"], correct: 2 },
    { question: "Finalize: 'Could you please _______ the document?'", options: ["send", "sending", "sent", "sends"], correct: 0 }
];

export default function EnglishTest({ talentoId }: { talentoId: string }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [finalLevel, setFinalLevel] = useState('...');
    const [loading, setLoading] = useState(false);

    const handleAnswer = async (selectedIndex: number) => {
        const isCorrect = selectedIndex === questions[currentQuestion].correct;
        const nextScore = isCorrect ? score + 1 : score;

        if (isCorrect) setScore(prev => prev + 1);

        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setLoading(true);

            // --- LÓGICA DE NIVEL NEXUS (Escala de 10 preguntas) ---
            let level = 'A1';
            if (nextScore >= 9) level = 'C1';      // 9-10 puntos
            else if (nextScore >= 7) level = 'B2'; // 7-8 puntos
            else if (nextScore >= 5) level = 'B1'; // 5-6 puntos
            else if (nextScore >= 3) level = 'A2'; // 3-4 puntos
            else level = 'A1';                     // 0-2 puntos

            try {
                // Sincronización usando el nuevo método saveLevel
                await nexusApi.saveLevel(talentoId, nextScore, level);
            } catch (error) {
                console.error("Error al sincronizar con la matriz:", error);
            } finally {
                setFinalLevel(level);
                setIsFinished(true);
                setLoading(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
                <p className="text-cyan-500 font-mono text-[10px] uppercase tracking-widest">Sincronizando con Atlas...</p>
            </div>
        );
    }

    if (isFinished) {
        return <TestResults level={finalLevel} talentoId={talentoId} />;
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <p className="text-cyan-500 font-mono text-[9px] uppercase tracking-widest mb-1">Pregunta</p>
                    <p className="text-2xl font-black text-white italic">0{currentQuestion + 1} <span className="text-slate-600">/ {questions.length}</span></p>
                </div>
                <div className="text-right">
                    <p className="text-slate-500 font-mono text-[9px] uppercase tracking-widest mb-1">Precisión Actual</p>
                    <p className="text-sm font-bold text-white">{Math.round((score / (currentQuestion || 1)) * 100)}%</p>
                </div>
            </div>

            <div className="mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {questions[currentQuestion].question}
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="group flex items-center justify-between p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-left"
                    >
                        <span className="text-slate-400 group-hover:text-white transition-colors">{option}</span>
                        <div className="h-2 w-2 rounded-full bg-slate-800 group-hover:bg-cyan-500 transition-colors"></div>
                    </button>
                ))}
            </div>

            <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center opacity-30 grayscale">
                <span className="text-[8px] font-mono text-white uppercase tracking-[0.3em]">Protocol Encrypted</span>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="h-1 w-1 bg-white rounded-full"></div>)}
                </div>
            </div>
        </div>
    );
}