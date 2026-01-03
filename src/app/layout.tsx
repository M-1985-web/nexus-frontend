import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Importación del contexto para manejar el nivel de inglés en tiempo real
import { TalentoProvider } from '@/context/TalentoContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus - Plataforma de Talento",
  description: "Evaluación adaptativa de inglés para profesionales",
};

// Se eliminó la duplicación: ahora solo existe un RootLayout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Envolvemos toda la aplicación con el Provider para que el Sidebar 
            y el Header detecten los cambios de nivel al instante */}
        <TalentoProvider>
          {children}
        </TalentoProvider>
      </body>
    </html>
  );
}