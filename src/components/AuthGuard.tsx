'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const storedId = localStorage.getItem('nexus_talento_id');

        if (!storedId) {
            // Si no hay ID, lo mandamos al login inmediatamente
            router.push('/');
        } else {
            setAuthorized(true);
        }
    }, [router]);

    // Mientras verifica, no mostramos nada para evitar el "flash" del contenido protegido
    if (!authorized) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-cyan-500 text-[10px] tracking-[0.5em]">
                VERIFICANDO CREDENCIALES...
            </div>
        );
    }

    return <>{children}</>;
}
