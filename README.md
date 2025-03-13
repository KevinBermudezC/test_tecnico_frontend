# TRC Akademy - Frontend Test

Plataforma educativa que muestra cursos disponibles con funcionalidades de búsqueda y filtrado. Desarrollada con Next.js, TypeScript y Tailwind CSS.

## 🚀 Características

- ✨ Interfaz moderna y responsive
- 🔍 Búsqueda en tiempo real de cursos
- 📱 Diseño adaptable a dispositivos móviles
- 🎨 Temas personalizados con Tailwind CSS
- 🔄 Caché de datos para mejor rendimiento
- 📊 Paginación de resultados
- 🎯 Optimización de rendimiento (LCP)

## 📋 Requisitos Previos

- Node.js (versión 18.0 o superior)
- npm o yarn
- Git

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd test_tecnico_frontend
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```


## 🚀 Ejecución

### Desarrollo

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
# o
yarn dev
```

El servidor de desarrollo se iniciará en `http://localhost:3000`

### Producción

Para crear una build de producción:

```bash
npm run build
# o
yarn build
```

Para ejecutar la versión de producción:

```bash
npm run start
# o
yarn start
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/                 # Configuración y layouts de Next.js
├── components/          # Componentes reutilizables
│   ├── Courses/        # Componentes relacionados con cursos
│   ├── Navigation/     # Componentes de navegación
│   └── ui/             # Componentes de UI base
├── hooks/              # Custom hooks
├── services/           # Servicios y llamadas a API
├── types/              # Definiciones de TypeScript
└── utils/              # Utilidades y funciones auxiliares
```

## 🛠️ Tecnologías Utilizadas

- [Next.js](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [Axios](https://axios-http.com/) - Cliente HTTP
- [Lucide React](https://lucide.dev/) - Iconos

## ⚙️ Scripts Disponibles

- `dev`: Inicia el servidor de desarrollo
- `build`: Crea una build de producción
- `start`: Ejecuta la build de producción
- `lint`: Ejecuta el linter para verificar el código

## 🔍 Características de Rendimiento

- Lazy loading de imágenes
- Caché de datos de API
- Memoización de componentes
- Optimización de fuentes
- Dynamic imports
- Paginación eficiente

