import React, { useState, useCallback, memo } from 'react'
import { Search, X } from 'lucide-react'

// Interfaz que define las propiedades que recibe el componente
// onSearch: función que se ejecuta cuando el usuario realiza una búsqueda
interface CourseSearchProps {
  onSearch: (searchTerm: string) => void
}

// Componente para buscar cursos con un campo de entrada y botones de búsqueda/limpieza
function CourseSearch({ onSearch }: CourseSearchProps) {
  // Estado para almacenar el término de búsqueda actual
  const [searchTerm, setSearchTerm] = useState('')

  // Maneja los cambios en el campo de búsqueda
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  // Maneja el envío del formulario de búsqueda
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }, [onSearch, searchTerm])

  // Limpia el campo de búsqueda y reinicia los resultados
  const handleReset = useCallback(() => {
    setSearchTerm('')
    onSearch('')
  }, [onSearch])

  return (
    <div className="w-full mb-8">
      {/* Formulario de búsqueda */}
      <form onSubmit={handleSubmit} className="relative">
        {/* Campo de entrada para la búsqueda */}
        <input
          type="text"
          placeholder="Buscar cursos..."
          value={searchTerm}
          onChange={handleChange}
          className="w-full bg-[#2C1A3A] text-white border border-purple-800 rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        {/* Icono de búsqueda (lupa) */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">
          <Search className="w-5 h-5" />
        </div>
        {/* Botón para limpiar la búsqueda (solo visible cuando hay texto) */}
        {searchTerm && (
          <button 
            type="button"
            onClick={handleReset}
            className="absolute right-[100px] top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-purple-800/50 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {/* Botón para enviar la búsqueda */}
        <button 
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-md transition-colors"
        >
          Buscar
        </button>
      </form>
    </div>
  )
}

// Exportación nombrada del componente
export { CourseSearch }
// Exportación por defecto con memo para evitar renderizados innecesarios
export default memo(CourseSearch)