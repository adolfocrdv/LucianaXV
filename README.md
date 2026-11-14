# LucianaXV

Invitación digital de los quince años de Luciana, diseñada para celulares y computadoras con tonos marfil y dorado.

## Evento

- Fecha: 28 de noviembre de 2026.
- Hora: 7:00 p. m. (Bolivia, UTC−4).
- Lugar: Los Lotes, Villa Mercedes Sur, calle Naranjal N.º 33.
- Ubicación: https://maps.app.goo.gl/XpLqU68bp79m8Jq4A

## Funciones

- Sobre con apertura animada.
- Cuenta regresiva.
- Descarga de un evento `.ics` al tocar la fecha o la hora. El invitado debe confirmar que lo desea agregar en su aplicación de calendario.
- Enlace a Google Maps y botón para compartir.
- Ilustración SVG de una quinceañera con vestido, tiara y banda.
- Adaptación a pantallas pequeñas y a la preferencia de movimiento reducido.

## Archivos

```text
dist/
  index.html                 Contenido e ilustración SVG
  styles.css                 Estilos y animaciones
  script.js                  Cuenta regresiva, calendario y compartir
  assets/
    botanical.svg            Decoración floral vectorial
    invitacion-referencia.png Imagen original de referencia
.openai/hosting.json          Configuración del alojamiento existente en Sites
```

El sitio usa HTML, CSS y JavaScript sin compilación ni dependencias de Node. Las fuentes Alex Brush y Cormorant Garamond se cargan desde Google Fonts, con fuentes alternativas disponibles.

## Vista previa local

Abrir `dist/index.html` en el navegador, o servir la carpeta `dist` con un servidor estático. Por ejemplo, si tenés Python instalado:

```sh
python -m http.server 4173 --directory dist
```

Luego abrir http://localhost:4173. Algunas funciones del navegador, como compartir, dependen de HTTPS o localhost y del soporte del dispositivo.

## Editar

La fecha y hora visibles están en `dist/index.html`. El inicio del evento y el archivo de calendario están en el objeto `EVENT` de `dist/script.js`; mantenerlos sincronizados. `20261128T230000Z` corresponde a las 7:00 p. m. de Bolivia.

El enlace de ubicación se encuentra en `index.html` y en la descripción del evento en `script.js`.

## Publicación

La carpeta `dist` puede alojarse en cualquier servicio de sitios estáticos. La publicación actual está en:

https://luciana-mis-quince.adolfocordova2505.chatgpt.site

Subir cambios a este repositorio no actualiza automáticamente el sitio en Sites. El repositorio y la publicación mantienen sus permisos por separado.
