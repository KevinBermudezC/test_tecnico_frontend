import React from 'react';
import Link from 'next/link'
import { Construction } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-w-screen flex flex-col items-center justify-center p-4 text-white bg-[#1A0B26] ">
      <Construction className="w-16 h-16 text-purple-400 mb-4" />
      <h2 className="text-2xl font-bold mb-4">Página en Construcción</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Esta sección está actualmente en desarrollo. Pronto tendremos nuevas funcionalidades disponibles.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Volver al Inicio
      </Link>
    </div>
  )
} 