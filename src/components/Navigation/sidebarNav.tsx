'use client'
import React, { useState } from "react"
import { Home, Trophy, School, Medal, BookMarked, LogIn, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Desafios",
    url: "/desafios",
    icon: Trophy,
  },
  {
    title: "Colegios",
    url: "/colegios",
    icon: School,
  },
  {
    title: "Ranking",
    url: "/ranking",
    icon: Medal,
  },
  {
    title: "Cursos",
    url: "/cursos",
    icon: BookMarked,
  },
]

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Boton para el menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-full bg-purple-900/80 text-white hover:bg-purple-800 shadow-lg backdrop-blur-sm transition-all duration-200"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Overlay para movil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-[#1E1225] transform transition-transform duration-300 ease-in-out lg:transform-none shadow-xl",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo */}
          <div className="p-6">
            <Link href='/'>
              <h1 className="text-2xl font-bold text-white">TRC Akademy</h1>
            </Link>
          </div>

          {/* Navegacion */}
          <nav className="flex-1 px-4">
            <ul className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <li key={item.title}>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-white transition-colors duration-200",
                        isActive
                          ? "bg-[#2C1A3A]"
                          : "hover:bg-[#2C1A3A] hover:bg-opacity-50"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Boton de inicio */}
          <div className="p-4 mt-auto">
            <Link
              href="/login"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#6F249F] text-white hover:bg-[#9E54D8] transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="w-5 h-5" />
              <span>Iniciar Sesión</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
