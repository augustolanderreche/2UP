# Informe Técnico - Landing Page 2up Software Factory

## Resumen del Proyecto

Se entrega una landing page corporativa moderna, responsiva y optimizada, desarrollada para 2up Software Factory. El objetivo es comunicar servicios, experiencia y propuesta de valor, facilitando el contacto y la conversión de potenciales clientes.

---

## Estructura del Proyecto

- **index.html**: Página principal, estructura semántica y accesible.
- **input.css**: Fuente de estilos con Tailwind CSS y utilidades personalizadas.
- **dist/output.css**: CSS compilado y minificado listo para producción.
- **assets/**: Carpeta de recursos (imágenes, íconos, JS, CSS componentes).
  - **assets/js/main.js**: Lógica de interactividad (menú móvil, scroll-top, carrusel de clientes, layout responsivo).
  - **assets/css/components.css**: Estilos personalizados para componentes clave.
  - **assets/cropped-logo.png**: Logo institucional y placeholder de clientes.
  - **assets/icon-2up.png**: Favicon del sitio.
- **package.json**: Configuración de dependencias y scripts de build.

---

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica, SEO y accesibilidad.
- **Tailwind CSS v4**: Utilidades y tema personalizado para identidad visual.
- **CSS personalizado**: Componentes y animaciones específicas.
- **JavaScript Vanilla**: Interactividad sin frameworks pesados.
- **Responsive Design**: Adaptación total a desktop, tablet y mobile.

---

## Funcionalidades Principales

- Navegación con anclas y menú móvil accesible.
- Hero con cards "Resultado" y "Enfoque" animados.
- Sección de servicios y proceso con diseño modular.
- Carrusel infinito de logos de clientes.
- Sección "¿Por qué elegirnos?" con logo destacado.
- Formulario de contacto (interfaz, listo para conectar a backend).
- Botón scroll-top visible solo al hacer scroll.
- Footer con links a redes sociales (URLs placeholder).
- SEO básico y metadatos para redes sociales (OpenGraph/Twitter).

---


## Info principal 

- El sitio funciona como landing estática: solo requiere hosting estático (Netlify, Vercel, GitHub Pages, etc.).
- El formulario de contacto es solo interfaz: requiere conexión a backend/API para enviar datos.
- Los links de redes sociales y logos de clientes pueden ser reemplazados fácilmente en el HTML.
- Para modificar estilos, se recomienda recompilar Tailwind (`npm install` y `npm run build:css`).
- Los metadatos OG/Twitter deben actualizarse con la URL final del dominio.

---

## Instrucciones para publicar o modificar

1. **Instalar dependencias** (solo si va a editar estilos):
   ```bash
   npm install
   ```
2. **Compilar CSS** (si edita input.css):
   ```bash
   npm run build:css
   ```
3. **Publicar**: Subir todos los archivos a un hosting estático. El sitio funcionará sin backend.
4. **Conectar formulario**: Integrar el formulario con un endpoint real según la plataforma elegida.

---

## Contacto y soporte

Cualquier duda sobre la estructura, edición o despliegue, el equipo de desarrollo puede asistir en la integración o ajustes posteriores.

---
