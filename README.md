# CRUD de Empresas - Frontend

Este proyecto es una aplicación web para la gestión de empresas, desarrollada con React + Vite.

## 📋 Requisitos Previos

- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior)
- Conexión a Internet
- El backend del proyecto debe estar en ejecución

## 🚀 Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/MoisesRoblesScott/frontend_empresa.git
cd frontend-empresas
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
   - Crear un archivo `.env` en la raíz del proyecto
   - Agregar la siguiente variable:
```bash
VITE_API_BASE_URL=http://localhost:8000
```

## 🛠️ Ejecución

### Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en: `http://localhost:5173`

### Producción
```bash
npm run build
npm run preview
```

## 📦 Estructura del Proyecto

```
frontend-empresas/
├── src/
│   ├── components/
│   │   ├── TablaEmpresas.jsx
│   │   └── ModalCrearActualizar.jsx
│   ├── config/
│   │   └── base_url.js
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json
```

## 🔧 Funcionalidades

- ✅ Listado de empresas
- ✅ Creación de nuevas empresas
- ✅ Actualización de datos
- ✅ Eliminación de registros
- ✅ Validación de formularios
- ✅ Mensajes de confirmación

## 🔌 Endpoints Utilizados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | /api/empresas | Obtiene todas las empresas |
| POST   | /api/empresas | Crea una nueva empresa |
| PUT    | /api/empresas/{nit} | Actualiza una empresa |
| DELETE | /api/empresas/{nit} | Elimina una empresa |

## 🛠️ Tecnologías Utilizadas

- React 18
- Vite
- Bootstrap 5
- SweetAlert2
- React Bootstrap Icons