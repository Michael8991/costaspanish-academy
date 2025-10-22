# 🌎 CostaSpanish Academy — MERN Landing Page & LSM

Bienvenido al repositorio del proyecto **CostaSpanish Academy**, una plataforma educativa creada con el stack **MERN (MongoDB, Express, React, Node.js)** y **Next.js** para la academia de español **CostaSpanishClass**.  
El proyecto incluye una **landing page multilingüe**, un **blog dinámico**, y una **plataforma privada (LSM)** para la gestión de cursos, estudiantes y profesores.

---

## 🚀 Descripción general

Este proyecto tiene como objetivo ofrecer una experiencia completa tanto para los visitantes como para los estudiantes y administradores de la academia.

La **landing page** permite:
- Mostrar los cursos disponibles.
- Realizar **preinscripciones** con validación y envío de datos seguro.
- Navegar entre varios idiomas mediante un sistema de **internacionalización (i18n)**.
- Gestionar el SEO dinámico por idioma y página.
- Disfrutar de una experiencia fluida, moderna y optimizada en rendimiento.

La parte **LSM (Learning & Student Management)** —en desarrollo— servirá como área privada donde profesores y estudiantes podrán gestionar clases, materiales y progreso académico.

---
## 🧠 Tecnologías utilizadas

| Categoría | Tecnologías |
|------------|--------------|
| **Frontend** | Next.js 14, React 18, TypeScript, TailwindCSS, Framer Motion, Shadcn/UI |
| **Internacionalización** | `next-intl` para gestión de idiomas y traducciones dinámicas |
| **Backend / API** | Node.js, Express, MongoDB (Atlas), Mongoose |
| **Formularios** | React Hook Form + Zod (validaciones tipadas) |
| **Animaciones y UI** | Framer Motion, Lucide Icons |
| **SEO y Accesibilidad** | Next Metadata API, etiquetas dinámicas por idioma |
| **Despliegue** | Vercel (Frontend) + MongoDB Atlas (Base de datos) |
| **Control de versiones** | Git + GitHub (con ramas feature / main) |

---

## 🌐 Internacionalización

El sitio soporta múltiples idiomas (`es`, `en`, y próximamente `it` y `de`).  
Toda la arquitectura sigue el patrón de **[locale]/slug**, lo que permite:
- URLs limpias y coherentes (`/en/courses/` o `/es/cursos/`)
- Textos gestionados desde archivos JSON centralizados.
- Traducción dinámica de todos los componentes reutilizables.

---

## 💾 Gestión de datos y seguridad

Los formularios de preinscripción recopilan información no sensible (nombre, email, idioma nativo, curso, nivel, disponibilidad, etc.).  
Los datos se envían mediante **HTTPS seguro** al correo oficial de la academia configurado en Zoho Mail.  
Se aplican medidas de cumplimiento con la **RGPD (Reglamento General de Protección de Datos)**.

---

## 📂 Estructura del proyecto
```
├── app/ # Sistema principal de rutas (App Router - Next.js)
│ ├── api/ # Endpoints API (Next.js Route Handlers)
│ │ ├── contact/route.ts # Envío de formulario de contacto
│ │ ├── courses/route.ts # Obtención de cursos desde MongoDB
│ │ └── preinscription/route.ts# Envío del formulario de preinscripción
│ ├── [locale]/ # Internacionalización por idioma (es, en, etc.)
│ │ ├── (courses)/ # Rutas relacionadas con cursos
│ │ │ ├── (languages)/ # Secciones de cursos por idioma (español, inglés)
│ │ │ │ ├── english/ # Cursos en inglés
│ │ │ │ └── spanish/ # Cursos en español
│ │ │ └── [slug]/ # Página dinámica de cada curso
│ │ │   └── preinscription/# Formulario de preinscripción individual
│ │ ├── contactUs/ # Página de contacto
│ │ └── sections/ # Secciones del landing (Hero, About, Courses, Testimonials)
│ ├── layout.tsx # Layout general del sitio
│ ├── page.tsx # Página principal
│ └── globals.css # Estilos globales
│
├── components/ # Componentes reutilizables
│ ├── CourseMainSection/ # Sección principal de información del curso
│ ├── CourseModules/ # Módulos individuales del curso
│ ├── Courses/ # Tarjetas y estilos de los cursos
│ ├── CoursesCatalog/ # Catálogo general de cursos
│ ├── Faq/ # Acordeón de preguntas frecuentes
│ ├── filterBarCourses/ # Barra de filtros en catálogo
│ ├── Footer/ # Pie de página
│ ├── Header/ # Cabecera + selector de idioma
│ ├── HeroSection/ # Destacados visuales de la academia
│ ├── PreinscriptionPage/ # Formulario y panel de preinscripción
│ ├── Testimonials/ # Tarjetas individuales de testimonios
│ ├── TestimonialsCarousel/ # Carrusel de testimonios (Embla)
│ ├── TopBar/ # Barra superior de contacto/redes
│ └── UI/ # Componentes genéricos (botones, dropdowns, etc.)
│
├── assets/icons/ # Íconos personalizados SVG y JSX
│
├── lib/ # Lógica compartida, mocks, tipos y conexión DB
│ ├── i18n/ # Peticiones y hooks de internacionalización
│ ├── mockcourses/ # Datos mock de cursos y FAQ
│ ├── mongo.ts # Conexión con MongoDB Atlas
│ └── types/ # Tipos globales de TypeScript
│
├── messages/ # Archivos de traducción (JSON por idioma)
│ ├── en/ # Textos en inglés
│ └── es/ # Textos en español
│
├── models/ # Modelos de base de datos (Mongoose)
│ └── Course.ts
│
├── public/ # Recursos estáticos (imágenes, logos, iconos)
│
├── types/ # Tipos locales y estructuras para props o datos
│
├── next.config.ts # Configuración de Next.js
├── tsconfig.json # Configuración de TypeScript
├── postcss.config.mjs # Configuración de PostCSS
├── eslint.config.mjs # Configuración de ESLint
├── package.json # Dependencias y scripts NPM
└── README.md # Documentación principal del proyecto
```
---

## 📦 Scripts principales

```bash
# Instalación
npm install

# Desarrollo local
npm run dev

# Compilación para producción
npm run build

# Linter y formato
npm run lint
```

---

## 🧱 Arquitectura técnica

El proyecto sigue una arquitectura modular y escalable:

Atomic Design adaptado: atoms, molecules, organisms, templates.

Tipado completo con TypeScript.

Context API + React Hooks personalizados para control global de idioma, tema y estado de usuario.

Preparado para integrar autenticación (NextAuth) y CMS externo (p. ej. Sanity o Strapi).

---

## 🎯 Objetivos futuros

 Integrar panel LSM (área de profesores y estudiantes).

 Añadir autenticación con roles.

 Implementar CRUD completo para cursos y posts multilingües.

 Optimizar Lighthouse 95+ y accesibilidad total.

 Añadir soporte de alemán e italiano.

 Integrar Google Analytics y formularios serverless.

 ---
 
## 👨‍💻 Autor

Michael Rodríguez Iranzo
Desarrollador Full Stack | Estudiante de Ingeniería informática

---

## 🧾 Licencia

Este proyecto está bajo la licencia MIT.
Puedes usarlo libremente con atribución.