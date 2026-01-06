// src/components/Practice/PracticeInterface.tsx
'use client';

import { useState, useEffect } from 'react'; // 👈 Añade useEffect aquí
import { nexusApi } from '@/api/nexusApi';


// 1. COMPONENTE PRINCIPAL
export default function CommunicationPractice({ talentoId, cefrLevel }: { talentoId: string, cefrLevel: string }) {
    // Definición de estados (Esto soluciona los errores de variables no encontradas)
    const [step, setStep] = useState<'prompt' | 'feedback'>('prompt');
    const [userText, setUserText] = useState('');
    const [evaluation, setEvaluation] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const currentPrompt = "Describe a difficult situation you faced at work and how you solved it.";

    const handleReset = () => {
        setStep('prompt');
        setUserText('');
        setEvaluation(null);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            // Usamos el método corregido de nexusApi
            const response = await nexusApi.processPractice({
                talentoId,
                type: 'SOFT_SKILLS',
                prompt: currentPrompt,
                userResponse: userText,
                cefrLevelAtTime: cefrLevel
            });
            setEvaluation(response.evaluation);
            setStep('feedback');
        } catch (error) {
            console.error("Error en la práctica:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-4">
            {/* Cabecera Estilo Nexus */}
            <div className="border-l-4 border-cyan-500 pl-4 py-2">
                <h2 className="text-white font-black uppercase tracking-tighter text-2xl italic">
                    Entrenamiento <span className="text-cyan-500">Comunicacional</span>
                </h2>
                <p className="text-slate-500 font-mono text-[10px] uppercase">Protocolo de Práctica v1.0</p>
            </div>

            {step === 'prompt' ? (
                <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                    <p className="text-cyan-500 font-mono text-xs mb-4 uppercase tracking-widest italic">Desafío IA:</p>
                    <h3 className="text-xl text-white font-medium mb-8 leading-relaxed italic">"{currentPrompt}"</h3>

                    <textarea
                        value={userText}
                        onChange={(e) => setUserText(e.target.value)}
                        placeholder="Escribe tu respuesta en inglés..."
                        className="w-full h-40 bg-slate-950/50 border border-white/10 rounded-2xl p-6 text-white focus:border-cyan-500/50 outline-none transition-all mb-4"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || userText.length < 5}
                        className="w-full py-4 bg-cyan-500 text-slate-950 font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Analizando...' : 'Enviar para Evaluación'}
                    </button>
                </div>
            ) : (
                <FeedbackDisplay evaluation={evaluation} onReset={handleReset} />
            )}
        </div>
    );
}

// 2. COMPONENTE DE FEEDBACK NEÓN
function FeedbackDisplay({ evaluation, onReset }: { evaluation: any, onReset: () => void }) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <ScoreCard label="Fluency" score={evaluation?.fluency || 0} color="cyan" />
                <ScoreCard label="Grammar" score={evaluation?.grammar || 0} color="purple" />
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <p className="text-cyan-500 font-mono text-[10px] uppercase mb-2">Versión Optimizada (Sugerida):</p>
                <p className="text-white italic text-lg leading-relaxed">
                    "{evaluation?.optimizedVersion}"
                </p>
            </div>

            <div className="bg-slate-905/80 rounded-2xl p-6 border border-white/5">
                <p className="text-slate-400 text-sm leading-relaxed">
                    <span className="text-cyan-500 font-bold uppercase text-[10px] mr-2">Tip:</span>
                    {evaluation?.feedback}
                </p>
            </div>

            <button
                onClick={onReset}
                className="w-full py-3 border border-white/10 text-white/40 hover:text-white font-mono text-xs uppercase tracking-[0.2em] rounded-xl transition-all"
            >
                Reiniciar Protocolo _
            </button>
        </div>
    );
}

// 3. COMPONENTE DE PUNTUACIÓN
function ScoreCard({ label, score, color }: { label: string, score: number, color: string }) {
    const colorMap: any = {
        cyan: "text-cyan-500 border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]",
        purple: "text-purple-500 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]"
    };

    return (
        <div className={`p-6 rounded-2xl bg-slate-950/50 border ${colorMap[color]} flex flex-col items-center`}>
            <span className="text-[10px] uppercase text-slate-500 font-mono mb-2 tracking-widest">{label}</span>
            <span className={`text-3xl font-black italic ${colorMap[color].split(' ')[0]}`}>{score}/10</span>
        </div>
    );
}

function Typewriter({ text, speed = 30 }: { text: string; speed?: number }) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        setDisplayedText(''); // Reiniciamos al empezar
        const timer = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(i));
            i++;
            if (i >= text.length) clearInterval(timer);
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return <span>{displayedText}</span>;
}