# Krypo

Gestor de contraseñas moderno construido con **Next.js**, **shadcn/ui**, **Prisma** y **Supabase**.

Krypo te permite **guardar, editar y analizar tus contraseñas** desde una interfaz cuidada, con perfiles de usuario y analíticas que te ayudan a detectar patrones inseguros (por ejemplo, contraseñas repetidas).

---

## ✨ Características principales

- **Gestión de contraseñas**
  - Añadir nuevas contraseñas.
  - Editar la información de una contraseña existente.
  - Gestión por usuario autenticado (cada usuario ve solo sus datos).

- **Perfil de usuario**
  - Vista de perfil personal.
  - Edición de datos básicos del usuario.

- **Analíticas de contraseñas**
  - Detección de contraseñas repetidas.
  - Métricas agregadas sobre el uso de contraseñas.
  - Visualización mediante componentes gráficos (charts) y tablas.

- **Experiencia de usuario**
  - Interfaz en Next.js App Router.
  - Componentes de interfaz basados en **shadcn/ui**.
  - Diseño responsive y moderno.

---

## 🧱 Stack tecnológico

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI**: [shadcn/ui](https://ui.shadcn.com/), Tailwind CSS
- **ORM**: [Prisma](https://www.prisma.io/)
- **Base de datos**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Autenticación**: NextAuth (autenticación basada en sesión)
- **Gráficos y tablas**: Recharts, TanStack React Table

Consulta el archivo `package.json` para ver todas las dependencias utilizadas.

---

## 🚀 Puesta en marcha en local

### 1. Requisitos previos

- Node.js (versión recomendada LTS)
- Cuenta y proyecto en **Supabase** con una base de datos PostgreSQL.
- Variables de entorno configuradas para:
  - Conexión a la base de datos (Supabase / PostgreSQL).
  - NextAuth (URLs, secrets, etc.).

### 2. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/krypo.git
cd krypo
```

> Sustituye `tu-usuario` por tu usuario real de GitHub.

### 3. Instalar dependencias

```bash
npm install
```

O con el gestor de paquetes que prefieras (`yarn`, `pnpm`, etc.).

### 4. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto y añade las variables necesarias para:

- Conexión a la base de datos (cadena de conexión de Supabase).
- Configuración de NextAuth (secret, URL, proveedor, etc.).

> Revisa la configuración de `Prisma` y de `NextAuth` en el código para ver los nombres exactos de las variables de entorno que necesitas.

### 5. Ejecutar migraciones de Prisma

```bash
npx prisma migrate dev
```

Esto aplicará el esquema de la base de datos definido en `prisma/schema.prisma` sobre tu instancia de Supabase.

### 6. Levantar el servidor de desarrollo

```bash
npm run dev
```

Abre `http://localhost:3000` en tu navegador para ver la aplicación.

---

## 📂 Estructura básica del proyecto

Algunas carpetas relevantes:

- `app/` — Rutas y vistas de la aplicación usando el App Router de Next.js.
  - `app/(home)/` — Página principal autenticada con dashboard, tabla de contraseñas y analíticas.
  - `app/api/` — Rutas de API (ej. perfil, subida de ficheros, etc.).
- `components/` — Componentes reutilizables de UI.
  - `components/Shared/Sidebar/` — Sidebar y navegación principal.
  - `components/Shared/FormUserEdit/` — Formularios para edición de perfil.
- `prisma/` — Esquema y migraciones de Prisma.

---

## 🧪 Scripts disponibles

En el archivo `package.json` tienes los siguientes scripts:

```bash
npm run dev     # Entorno de desarrollo
npm run build   # Build de producción
npm run start   # Arrancar servidor en modo producción
npm run lint    # Ejecutar ESLint
```

---

## 📌 Próximas mejoras (ideas)

- Gestión avanzada de categorías/etiquetas para contraseñas.
- Comprobación de fortaleza de contraseña.
- Exportación/importe de contraseñas.
- Más visualizaciones en el módulo de analíticas.

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Puedes:

1. Hacer un fork del repositorio.
2. Crear una rama con tu feature o fix (`feat/mi-feature`, `fix/mi-fix`, etc.).
3. Abrir un Pull Request explicando el cambio.

