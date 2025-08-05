# CineVerse - Aplicación de Películas

Una aplicación web moderna para explorar películas y series de televisión, construida con React, Vite y Tailwind CSS.

## Características

- 🎬 Landing page moderna con diseño oscuro
- 🔍 Barra de búsqueda funcional
- 📱 Diseño responsive
- 🎭 Categorías de películas (Acción, Comedia, Drama)
- 🖼️ Imágenes de alta calidad
- ⚡ Interfaz rápida y fluida

## Configuración

### 1. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 2. Configurar la API de TMDB

Para usar datos reales de películas, necesitas obtener una API key de TMDB:

1. Ve a [TMDB](https://www.themoviedb.org/) y crea una cuenta
2. Ve a Configuración > API
3. Solicita una API key
4. Copia tu API key

Luego, actualiza el archivo `src/services/tmdbApi.js`:

```javascript
const API_KEY = "TU_API_KEY_AQUI";
```

### 3. Ejecutar el proyecto

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
src/
├── Components/
│   ├── Header.jsx          # Header con navegación
│   ├── SearchBar.jsx       # Barra de búsqueda
│   ├── FeaturedSection.jsx # Películas destacadas
│   └── PopularMovies.jsx   # Sección de películas populares
├── services/
│   └── tmdbApi.js          # Servicio para la API de TMDB
├── App.jsx                 # Componente principal
└── App.css                 # Estilos globales
```

## Tecnologías Utilizadas

- **React 19** - Biblioteca de UI
- **Vite** - Herramienta de construcción
- **Tailwind CSS** - Framework de CSS
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos
- **TMDB API** - Base de datos de películas

## Próximas Mejoras

- [ ] Integración completa con la API de TMDB
- [ ] Páginas de detalle de películas
- [ ] Sistema de favoritos
- [ ] Filtros avanzados
- [ ] Modo oscuro/claro
- [ ] Búsqueda en tiempo real

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
