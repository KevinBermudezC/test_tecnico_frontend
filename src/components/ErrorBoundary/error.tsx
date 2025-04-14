'use client'

import React,{ useEffect } from 'react'
import Link from 'next/link'
import { Construction } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-white">
      <Construction className="w-16 h-16 text-purple-400 mb-4" />
      <h2 className="text-2xl font-bold mb-4">Página en Construcción</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Esta sección está actualmente en desarrollo. Pronto tendremos nuevas funcionalidades disponibles.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Volver al Inicio
        </Link>
        <button
          onClick={reset}
          className="px-6 py-3 bg-purple-900/50 text-white rounded-lg hover:bg-purple-800/50 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
} 