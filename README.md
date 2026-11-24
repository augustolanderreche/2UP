# 2UP Software Factory

Plantilla estática de la página institucional de 2UP. La navegación, el carrusel de clientes y el botón para volver arriba funcionan con JavaScript nativo.

## Abrir y publicar

Abrí `index.html` para revisar la plantilla. Para publicarla, copiá `index.html`, `dist/output.css`, `assets/js/main.js` y las imágenes de `assets/` al hosting, conservando la estructura de carpetas. El CSS compilado está incluido.

El formulario de contacto requiere que el responsable de la publicación configure el destino y pruebe la recepción. Los enlaces a redes sociales también requieren las direcciones de los perfiles oficiales.

## Editar los estilos

Usá Node.js 20 o superior y npm. Instalá las dependencias con `npm ci`. Editá `input.css` para cambiar el tema o los estilos generales y `assets/css/components.css` para el carrusel, los iconos y el botón para volver arriba.

Después de cambiar el HTML o los estilos, ejecutá `npm run build:css` y guardá también el nuevo `dist/output.css`. Durante el desarrollo, `npm run watch:css` recompila al guardar.
