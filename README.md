# 🎄 Calendario de Adviento Digital 🎄

Este es un proyecto web personal creado con mucho cariño: un calendario de adviento digital interactivo diseñado como un regalo especial. Cada día, desde el 1 hasta el 24 de diciembre, se desvela una nueva sorpresa en forma de "cupón", mensaje personalizado o poema dedicado.

## 🚧 Estado del Proyecto (80% completado)

El proyecto tiene la funcionalidad base implementada y es completamente funcional, pero aún requiere personalización y mejoras adicionales para estar completamente terminado.

### ✅ Completado:
- ✅ Estructura base del calendario de 24 días
- ✅ Sistema de desbloqueo por fechas
- ✅ Efectos visuales y animaciones
- ✅ Música de fondo y efectos de sonido
- ✅ Diseño responsive
- ✅ Optimización de performance

### 🔄 Pendiente:
- [ ] **Personalización de contenido**: Definir y personalizar los mensajes/cupones específicos para cada día
- [ ] **Mejoras de frontend**: Pulir detalles visuales y UX
- [ ] **Cupones personalizados**: Crear cupones físicos/digitales específicos para el destinatario
- [ ] **Configuración final**: Ajustes de fechas y contenido según el uso real
- [ ] **Testing completo**: Pruebas en diferentes dispositivos y navegadores

## ✨ Características Implementadas

- **Calendario Interactivo**: 24 días clicables con GIFs animados únicos y efectos 3D al pasar el mouse.
- **Contenido Personalizado**: Cada día incluye poemas originales, cupones especiales o imágenes dedicadas.
- **Lógica de Adviento**: Los días se desbloquean automáticamente según la fecha (configurado para septiembre como demo).
- **Modo Preview**: Botón 🔓/🔒 para previsualizar todos los días sin restricciones.
- **Efectos Visuales Avanzados**:
  - ✨ Chispas que siguen el cursor del mouse
  - 🎆 Explosiones de confeti al hacer clic
  - ❄️ Ventisca de nieve en días especiales
  - ⭐ Estrellas animadas de fondo con parallax
  - 🎄 Guirnalda con luces parpadeantes
- **Audio Inmersivo**: Música de fondo navideña con efectos de sonido interactivos.
- **Diseño Responsive**: Perfectamente adaptado para móviles, tablets y desktop.
- **Optimización de Performance**:
  - Lazy loading de imágenes y videos
  - Service Worker para caché
  - Optimización de GIFs con videos WebM
  - Prefetch inteligente del contenido
- **Accesibilidad**: Soporte para usuarios con preferencias de movimiento reducido.

## 🚀 Tecnologías Utilizadas

Este proyecto fue construido desde cero utilizando únicamente las tecnologías fundamentales de la web:

- **HTML5**: Para la estructura del contenido.
- **CSS3**: Para el diseño, las animaciones y la responsividad.
- **JavaScript (ES6+)**: Para toda la interactividad, la lógica del calendario y la manipulación del DOM.

No se utilizó ningún framework o librería externa para mantenerlo ligero y sencillo.

## 🌐 Demo en Vivo

👉 **[Ver Calendario de Adviento](https://michellpolicarpio.github.io/CalendarioDeAdviento/)**

> **Nota:** La demo actual muestra la funcionalidad base con contenido de ejemplo. El proyecto final requerirá personalización del contenido según el destinatario específico.

---

## ☁️ Despliegue

El proyecto puede desplegarse fácilmente en cualquier servicio de hosting estático:

- **GitHub Pages**: Ideal para proyectos open source (configuración automática desde el repositorio).
- **Netlify/Vercel**: Para despliegues rápidos con CI/CD integrado.
- **Servidor web tradicional**: Compatible con cualquier servidor que sirva archivos estáticos.

El proyecto incluye un Service Worker para optimizar la carga y un `CNAME` file para dominios personalizados.

## 🚀 Instalación y Uso

### Ejecutar Localmente

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/MichellPolicarpio/CalendarioDeAdviento.git
   cd CalendarioDeAdviento
   ```

2. **Abre el proyecto:**
   - Simplemente abre `index.html` en tu navegador favorito
   - O usa un servidor local (recomendado):
     ```bash
     # Con Python
     python -m http.server 8000
     
     # Con Node.js
     npx serve .
     
     # Con PHP
     php -S localhost:8000
     ```

3. **¡Listo!** El calendario estará funcionando en `http://localhost:8000`

### Personalización

El proyecto actualmente incluye contenido de ejemplo. Para personalizarlo completamente:

#### ⚠️ Tareas Pendientes de Personalización:

1. **Mensajes/Cupones personalizados:**
   - Editar el array `messages` en `script.js` (línea ~261)
   - Crear contenido específico para el destinatario
   - Definir cupones/regalos reales

2. **Imágenes personalizadas:**
   - Reemplazar archivos en `Iconos_gif_dias/` con GIFs temáticos
   - Crear cupones digitales en `Regalo_Cupones/`
   - Personalizar imágenes de fondo

3. **Configuración temporal:**
   - Ajustar fechas en `script.js` (línea ~665) para diciembre real
   - Configurar lógica de desbloqueo según necesidades

4. **Mejoras visuales pendientes:**
   - Pulir transiciones y animaciones
   - Optimizar tipografías y colores
   - Mejorar responsive design en dispositivos específicos

## 🎯 Características del Código

- **Código Vanilla**: Sin dependencias externas, fácil de mantener
- **ES6+ Features**: Uso de características modernas de JavaScript
- **CSS Grid & Flexbox**: Layout moderno y responsive
- **Web APIs**: Intersection Observer, Web Audio API, Service Workers
- **Optimización**: Lazy loading, prefetch, compresión de assets

## 📁 Estructura del Proyecto

```
CalendarioDeAdviento/
├── index.html              # Página principal
├── style.css               # Estilos principales
├── script.js               # Lógica de la aplicación
├── sw.js                   # Service Worker
├── Iconos_gif_dias/        # GIFs animados para cada día
├── Regalo_Cupones/         # Imágenes de cupones especiales
├── MusicaFondo/            # Música de fondo
├── ColorFondo.png          # Imagen de fondo principal
├── manchasfondo.png        # Overlay de textura
├── TituloCalendarioAdviento.gif # Logo animado
└── galleta.gif             # Imagen para modal de bloqueo
```

## 🎨 Créditos

- **Desarrollo**: Michell Policarpio
- **Diseño**: Conceptualización y desarrollo original
- **Música**: "Christmas Night Piano" (libre de derechos)
- **Iconos**: GIFs animados personalizados

## 📄 Licencia

Este proyecto está disponible para uso personal y educativo. Si deseas usar el código para tus propios proyectos, se agradece la atribución.

---

⭐ **¡Dale una estrella al repositorio si te gustó el proyecto!** ⭐
