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

const CACHE_KEY = 'courses_cache'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos en milisegundos

interface CacheData {
  data: Course[]
  timestamp: number
}

export function useCourses(): UseCourses {
  const [courses, setCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const getCachedData = useCallback((): CacheData | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (!cached) return null
      return JSON.parse(cached)
    } catch (error) {
      console.error('Error al leer el caché:', error)
      return null
    }
  }, [])

  const setCachedData = useCallback((data: Course[]) => {
    try {
      const cacheData: CacheData = {
        data,
        timestamp: Date.now()
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.error('Error al guardar en caché:', error)
    }
  }, [])

  const fetchCourses = useCallback(async (forceRefresh = false) => {
    try {
      // Evitamos iniciar otra petición si ya estamos cargando
      if (isLoading && !isInitialLoad && !forceRefresh) return;
      
      setIsLoading(true)
      setError(null)

      // Verificar si hay datos en caché y si son válidos
      if (!forceRefresh) {
        const cached = getCachedData()
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          console.log('Usando datos en caché')
          setCourses(cached.data)
          setIsLoading(false)
          setIsInitialLoad(false)
          return
        }
      }

      console.log('Iniciando petición de cursos...');
      // Si no hay caché o expiró, hacer la petición
      const data = await getCourses()
      console.log('Datos recibidos:', data);
      
      // Actualizar caché
      setCachedData(data)
      
      setCourses(data)
    } catch (err) {
      console.error('Error en fetchCourses:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los cursos';
      setError(new Error(errorMessage))
    } finally {
      setIsLoading(false)
      setIsInitialLoad(false)
    }
  }, [isInitialLoad, getCachedData, setCachedData])

  // Filtrar cursos basados en el término de búsqueda
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) {
      return courses
    }
    
    const term = searchTerm.toLowerCase()
    return courses.filter(course => 
      course.title.toLowerCase().includes(term)
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
    refetch: () => fetchCourses(true),
    searchCourses
  }
}
