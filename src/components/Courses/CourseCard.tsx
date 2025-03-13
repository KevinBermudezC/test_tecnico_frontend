import React, { memo, useMemo } from 'react'
import { Course } from '@/types/course'
import Image from 'next/image'
import { truncateLines, extractText } from '@/utils/format-text'

interface CourseCardProps {
  course: Course
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Memoizar el procesamiento del texto para evitar cálculos innecesarios
  const shortDesc = useMemo(() => {
    const plainText = extractText(course.description);
    return truncateLines(plainText, 2);
  }, [course.description]);

  return (
    <div className="bg-[#2C1A3A] rounded-xl shadow-lg overflow-hidden hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={course.image_thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={true}
          loading="eager"
          fetchPriority="high"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyQzFBM0EiLz48L3N2Zz4="
        />
        {course.is_freemium && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Gratuito
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-purple-300 bg-purple-900/50 px-3 py-1 rounded-full">
            {course.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white line-clamp-2 h-[3.5rem]">
          {course.title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-2 h-[2.8rem]">
          {shortDesc}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Profesor: {course.teacher}
          </span>
          <a 
            href={`/cursos/${course.slug}`}
            className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center gap-1 group"
          >
            Ver más 
            <span className="transform transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// Usar React.memo para evitar renderizados innecesarios
export default memo(CourseCard)