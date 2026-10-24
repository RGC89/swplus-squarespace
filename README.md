# SW+ — Código personalizado de Squarespace

Código CSS y JavaScript del sitio **saltowortaleplus.com**. Squarespace lo carga desde
GitHub a través de [jsDelivr](https://www.jsdelivr.com/). En *Code Injection* solo quedan
las líneas de [`squarespace/code-injection.html`](squarespace/code-injection.html).

## Qué hace cada archivo

| Archivo | Qué hace |
|---|---|
| `css/sitio.css` | Estilos generales. Hoy: evita que «DEINE BÜCHER» se parta en dos líneas. |
| `js/gsap-inicio.js` | Activa el plugin ScrollTrigger de GSAP. |
| `js/ajustes-panel.js` | **Colores, tamaños y bordes del panel de cuenta.** Es el archivo que más se edita. |
| `js/kapitel-etiquetas.js` | Cambia «Lektionen» por «Lesung(en)» y «Clip(s)» en la lista del curso. |
| `js/konto-thumbnails.js` | Pone la portada de cada paquete en el panel de cuenta. **Aquí se agregan paquetes nuevos.** |
| `js/konto-textos.js` | Renombra textos del panel (Buchpakete, Start, Einstellungen…) y oculta opciones. |
| `js/header-deine-buecher.js` | Cambia el botón «Konto» de la cabecera por «Deine Bücher». |
| `js/konto-aspecto.js` | Aplica el diseño del panel de cuenta usando los valores de `ajustes-panel.js`. |

`ajustes-panel.js` debe cargarse **antes** que `konto-thumbnails.js` y `konto-aspecto.js`.

## Cómo publicar un cambio

1. Edita el archivo y guarda.
2. Sube el cambio a GitHub (commit + push).
3. Crea una versión nueva (tag), por ejemplo `1.0.1`.
4. En Squarespace → *Code Injection*, cambia `@1.0.0` por `@1.0.1` en todas las líneas.

Para probar sin crear versión, se puede usar `@main` en lugar del número. jsDelivr guarda
copia hasta 12 horas; para forzar la actualización de un archivo, abre:

```
https://purge.jsdelivr.net/gh/RGC89/swplus-squarespace@main/js/NOMBRE-DEL-ARCHIVO.js
```

## Importante

- El repositorio es público: **nunca pongas aquí contraseñas ni claves**.
- `konto-aspecto.js` y `konto-textos.js` dependen de clases internas de Squarespace
  (comprobadas el 18-10-2026). Si Squarespace las cambia, el panel puede perder su diseño.
