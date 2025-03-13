import { useState, useEffect, useCallback, useMemo } from 'react'
import { Course } from '../types/course'
import { getCourses } from '../services/courses'

interface UseCourses {
  courses: Course[]
  filteredCourses: Course[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
  searchCourses: (searchTerm: string) => void
}

// Caché simple para almacenar los cursos
let coursesCache: Course[] | null = null
let lastFetchTime: number | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos en milisegundos

export function useCourses(): UseCourses {
  const [courses, setCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const fetchCourses = useCallback(async () => {
    try {
      // Evitamos iniciar otra petición si ya estamos cargando
      if (isLoading && !isInitialLoad) return;
      
      setIsLoading(true)
      setError(null)

      // Verificar si hay datos en caché y si son válidos
      const now = Date.now()
      if (coursesCache && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
        setCourses(coursesCache)
        setIsLoading(false)
        setIsInitialLoad(false)
        return
      }

      // Si no hay caché o expiró, hacer la petición
      const data = await getCourses()
      
      // Actualizar caché
      coursesCache = data
      lastFetchTime = now
      
      setCourses(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al cargar los cursos'))
    } finally {
      setIsLoading(false)
      setIsInitialLoad(false)
    }
  }, []) // Eliminamos isLoading de las dependencias

  // Filtrar cursos basados en el término de búsqueda
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) {
      return courses
    }
    
    const term = searchTerm.toLowerCase()
    return courses.filter(course => 
      course.title.toLowerCase().includes(term) || 
      course.description.toLowerCase().includes(term) ||
      course.category.toLowerCase().includes(term) ||
      course.teacher.toLowerCase().includes(term)
    )
  }, [courses, searchTerm])

  // Función para actualizar el término de búsqueda
  const searchCourses = useCallback((term: string) => {
    setSearchTerm(term)
  }, [])

  // Cargar cursos al montar el componente
  useEffect(() => {
    if (isInitialLoad) {
      fetchCourses()
    }
  }, [fetchCourses, isInitialLoad])

  return {
    courses,
    filteredCourses,
    isLoading,
    error,
    refetch: fetchCourses,
    searchCourses
  }
}
