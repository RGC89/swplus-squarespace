# SW+ — Código personalizado de Squarespace

Código CSS y JavaScript del sitio **saltowortaleplus.com**. Squarespace lo carga desde
GitHub a través de [jsDelivr](https://www.jsdelivr.com/). En *Code Injection* solo quedan
las líneas de [`squarespace/code-injection.html`](squarespace/code-injection.html).

## Qué hace cada archivo

| Archivo | Qué hace |
|---|---|
| `css/general.css` | Paywall (ZUM FRAGEBOGEN), scroll suave, icono de enlace externo y barra de desplazamiento. |
| `css/cabecera.css` | Botón de login, menús desplegables y hover de la navegación. |
| `css/curso.css` | Página de lecciones: «← Zurück zu», «Nächster Clip» y panel lateral. |
| `css/botones.css` | Botones primario, secundario y terciario de todo el sitio. |
| `css/paquetes.css` | Páginas de paquetes: libro de 5 Hunde, categorías, botones superiores y Materialbox. |
| `css/sitio.css` | Evita que «DEINE BÜCHER» se parta en dos líneas. |
| `js/gsap-inicio.js` | Activa el plugin ScrollTrigger de GSAP. |
| `js/ajustes-panel.js` | **Colores, tamaños y bordes del panel de cuenta.** Es el archivo que más se edita. |
| `js/kapitel-etiquetas.js` | Cambia «Lektionen» por «Lesung(en)» y «Clip(s)» en la lista del curso. |
| `js/konto-thumbnails.js` | Pone la portada de cada paquete en el panel de cuenta. **Aquí se agregan paquetes nuevos.** |
| `js/konto-textos.js` | Renombra textos del panel (Buchpakete, Start, Einstellungen…) y oculta opciones. |
| `js/header-deine-buecher.js` | Cambia el botón «Konto» de la cabecera por «Deine Bücher». |
| `js/konto-aspecto.js` | Aplica el diseño del panel de cuenta usando los valores de `ajustes-panel.js`. |

`ajustes-panel.js` debe cargarse **antes** que `konto-thumbnails.js` y `konto-aspecto.js`.

Los CSS se cargan en el orden de la tabla. La caja *Diseño → Custom CSS* de Squarespace
queda vacía y sirve solo para pruebas rápidas: lo que funcione se pasa a estos archivos.
Ojo: allí se acepta la sintaxis LESS (comentarios con `//`), pero estos archivos son CSS
normal y solo admiten comentarios `/* … */`.

## Cómo publicar un cambio

1. Edita el archivo y guarda.
2. Sube el cambio a GitHub (commit + push).
3. Crea una versión nueva (tag), por ejemplo `1.1.1`.
4. En Squarespace → *Code Injection*, cambia `@1.1.0` por `@1.1.1` en todas las líneas.

Para probar sin crear versión, se puede usar `@main` en lugar del número. jsDelivr guarda
copia hasta 12 horas; para forzar la actualización de un archivo, abre:

```
https://purge.jsdelivr.net/gh/RGC89/swplus-squarespace@main/js/NOMBRE-DEL-ARCHIVO.js
```

## Importante

- El repositorio es público: **nunca pongas aquí contraseñas ni claves**.
- `konto-aspecto.js` y `konto-textos.js` dependen de clases internas de Squarespace
  (comprobadas el 18-10-2026). Si Squarespace las cambia, el panel puede perder su diseño.
