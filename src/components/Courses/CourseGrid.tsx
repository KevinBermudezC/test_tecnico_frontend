'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useCourses } from '@/hooks/use-courses'
import dynamic from 'next/dynamic'
import { CourseCardSkeleton } from './CourseCardSkeleton'
import { CourseSearch } from './CourseSearch'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Importar CourseCard de forma dinámica para mejorar el rendimiento
const CourseCard = dynamic(() => import('./CourseCard'), {
  loading: () => <CourseCardSkeleton />,
  ssr: true
})

const ITEMS_PER_PAGE = 6

export function CourseGrid() {
  const { filteredCourses, isLoading, error, searchCourses } = useCourses()
  const [currentPage, setCurrentPage] = useState(1)

  // Resetear la página cuando cambian los resultados de búsqueda
  useEffect(() => {
    setCurrentPage(1)
  }, [filteredCourses.length])

  // Calcular el total de páginas
  const totalPages = useMemo(() => 
    Math.ceil((filteredCourses?.length || 0) / ITEMS_PER_PAGE), 
    [filteredCourses?.length]
  )

  // Obtener los cursos de la página actual
  const getCurrentPageCourses = useCallback(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredCourses.slice(startIndex, endIndex)
  }, [currentPage, filteredCourses])

  // Generar array de números de página para la paginación
  const getPageNumbers = useCallback(() => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i)
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push('...')
      }
    }
    return pages
  }, [currentPage, totalPages])

  const handleSearch = useCallback((searchTerm: string) => {
    searchCourses(searchTerm)
  }, [searchCourses])

  const currentPageCourses = useMemo(() => getCurrentPageCourses(), [getCurrentPageCourses])
  const pageNumbers = useMemo(() => getPageNumbers(), [getPageNumbers])

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-center text-red-500">
          <p>Error al cargar los cursos. Por favor, intenta de nuevo más tarde.</p>
        </div>
      )
    }

    if (filteredCourses.length === 0) {
      return (
        <div className="text-center text-gray-400 py-12">
          <p>No se encontraron cursos que coincidan con tu búsqueda.</p>
        </div>
      )
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {currentPageCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {pageNumbers.map((pageNumber, index) => (
                <PaginationItem key={index}>
                  {pageNumber === '...' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(Number(pageNumber))
                      }}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </>
    )
  }

  return (
    <main className="flex-1 bg-[#1A0B26]">
      <div className="p-8 h-full overflow-y-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Cursos Disponibles</h1>
        <CourseSearch onSearch={handleSearch} />
        {renderContent()}
      </div>
    </main>
  )
} 