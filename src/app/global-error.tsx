'use client'

import { useEffect } from 'react'
import { Construction } from 'lucide-react'
import React from 'react'

export default function GlobalError({
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
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white bg-[#1A0B26]">
          <Construction className="w-16 h-16 text-purple-400 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
          <p className="text-gray-400 mb-8 text-center max-w-md">
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  )
} 