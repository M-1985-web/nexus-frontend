'use client';
import { useState } from 'react';
import { nexusApi } from '@/api/nexusApi';

export default function CommunicationPractice({ talentoId, cefrLevel }: { talentoId: string, cefrLevel: string }) {
    const [step, setStep] = useState('prompt');
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

            // Accedemos a la evaluación dentro de la respuesta
            setEvaluation(response.evaluation);
            setStep('feedback');
        } catch (error) {
            console.error("Error en la práctica:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Cabecera visual estilo Nexus */}
            <div className="border-l-4 border-cyan-500 pl-4 py-2 mb-8">
                <h2 className="text-white font-black uppercase tracking-tighter text-2xl italic">
                    Módulo 03: <span className="text-cyan-500">Práctica Comunicacional</span>
                </h2>
                <p className="text-slate-500 font-mono text-[10px] uppercase">Nexus Protocol v1.0</p>
            </div>

            {step === 'feedback' ? (
                <FeedbackDisplay evaluation={evaluation} onReset={handleReset} />
            ) : (
                <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm space-y-6">
                    <div>
                        <p className="text-cyan-500 font-mono text-xs mb-2 uppercase tracking-widest">IA Coach Prompt:</p>
                        <h3 className="text-xl text-white font-medium italic leading-relaxed">
                            "{currentPrompt}"
                        </h3>
                    </div>

                    <textarea
                        value={userText}
                        onChange={(e) => setUserText(e.target.value)}
                        placeholder="Escribe tu respuesta aquí..."
                        className="w-full h-40 bg-slate-950/50 border border-white/10 rounded-2xl p-6 text-white focus:border-cyan-500/50 outline-none transition-all"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || userText.length < 5}
                        className="w-full py-4 bg-cyan-500 text-slate-950 font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Analizando con Nexus IA...' : 'Enviar Respuesta'}
                    </button>
                </div>
            )}
        </div>
    );
}

// Sub-componentes unificados para evitar errores de referencia
function FeedbackDisplay({ evaluation, onReset }: { evaluation: any, onReset: () => void }) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <ScoreCard label="Fluidez" score={evaluation?.fluency || 0} color="cyan" />
                <ScoreCard label="Gramática" score={evaluation?.grammar || 0} color="purple" />
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6">
                <p className="text-cyan-500 font-mono text-[10px] uppercase mb-2">Versión Optimizada:</p>
                <p className="text-white italic text-lg leading-relaxed">
                    "{evaluation?.optimizedVersion || "Procesando..."}"
                </p>
            </div>

            <button
                onClick={onReset}
                className="text-xs font-mono text-cyan-500 hover:text-white uppercase tracking-widest"
            >
                Reiniciar Práctica _
            </button>
        </div>
    );
}

function ScoreCard({ label, score, color }: { label: string, score: number, color: string }) {
    const colorClasses: any = {
        cyan: "text-cyan-500 border-cyan-500/20",
        purple: "text-purple-500 border-purple-500/20"
    };

    return (
        <div className={`p-4 rounded-2xl bg-slate-950 border ${colorClasses[color]} flex flex-col items-center`}>
            <span className="text-[10px] uppercase text-slate-500 font-mono mb-1">{label}</span>
            <span className="text-2xl font-black italic">{score}/10</span>
        </div>
    );
}