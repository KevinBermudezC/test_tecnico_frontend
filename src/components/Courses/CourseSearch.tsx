import React, { useState, useCallback, memo } from 'react'
import { Search, X } from 'lucide-react'

interface CourseSearchProps {
  onSearch: (searchTerm: string) => void
}

function CourseSearch({ onSearch }: CourseSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }, [onSearch, searchTerm])

  const handleReset = useCallback(() => {
    setSearchTerm('')
    onSearch('')
  }, [onSearch])

  return (
    <div className="w-full mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Buscar cursos..."
          value={searchTerm}
          onChange={handleChange}
          className="w-full bg-[#2C1A3A] text-white border border-purple-800 rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">
          <Search className="w-5 h-5" />
        </div>
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

export { CourseSearch }
export default memo(CourseSearch) 