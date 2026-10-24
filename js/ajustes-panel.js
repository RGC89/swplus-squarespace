/* ==========================================================
   SW+ — AJUSTES EDITABLES DEL PANEL DE CUENTAS DE USUARIOS
   Cambia solo los valores entre comillas. Conserva comas y nombres.
   px = píxeles. var(--sw-...) vincula un ajuste con otro.
   Guarda una copia antes de editar. No cambia las fuentes del sitio.
   Debe cargarse ANTES de konto-thumbnails.js y konto-aspecto.js.
   ========================================================== */
window.SW_PANEL_AJUSTES = {
  fondo: "#FFFAE2", // Fondo del panel
  texto: "#18191A", // Texto y contornos negros
  tarjeta: "#FFD280", // Fondo de tarjetas; también miniaturas y colores vinculados de Start
  profil_hover: "var(--sw-tarjeta)", // Fondo de Profil al pasar el cursor
  borde_campo: "rgba(24,25,26,.5)", // Borde del campo en reposo
  texto_placeholder: "rgba(24,25,26,.60)", // Texto de ayuda en los campos
  foco: "#F15B37", // Foco de los controles que mantienen contorno
  tarjeta_radio: "24px", // Redondeado de las tarjetas
  profil_radio: "var(--sw-tarjeta_radio)", // Redondeado de Profil
  tarjeta_padding_vertical: "4px", // Relleno vertical EXTERIOR de cada tarjeta
  tarjeta_padding_interior: "4px", // Relleno vertical INTERIOR: se suma al exterior
  tarjeta_padding_horizontal: "16px", // Relleno lateral de tarjetas
  tarjeta_separacion: "8px", // Distancia entre tarjetas
  busqueda_separacion: "12px", // Distancia debajo de Suche
  campo_padding_vertical: "5px", // Relleno arriba y abajo de los seis campos
  campo_padding_horizontal: "16px", // Relleno lateral de los campos
  campo_altura_minima: "38px", // Altura mínima: puede impedir que el campo se reduzca más
  campo_altura_texto: "24px", // Altura de la línea y del input interior
  campo_texto_tamano: "16px", // Tamaño del texto editable
  campo_radio: "999px", // Redondeado de campos; 999px crea extremos de píldora
  campo_borde: "1px", // Grosor del borde en reposo
  campo_foco_extra: "1px", // Grosor adicional hacia dentro al activar el campo
  campo_separacion: "12px", // Distancia debajo de cada fila editable
  titulo_tamano: "24px", // Títulos principales del panel
  titulo_peso: "800", // Peso de Winky Sans
  titulo_interlineado: "1.2", // Interlineado de títulos
  titulo_espaciado: "-.02em", // Espacio entre letras de títulos
  boton_radio: "999px", // Redondeado de Start y Einstellungen
  boton_borde: "2px", // Grosor de sus bordes
  boton_peso: "700", // Peso de Asap
  boton_transicion: ".2s", // Duración de la inversión de colores
  boton_opacidad_desactivado: ".45", // Opacidad de botones desactivados: entre 0 y 1
  start_fondo: "var(--sw-texto)", // Start: fondo normal
  start_texto: "var(--sw-tarjeta)", // Start: texto normal
  start_borde: "var(--sw-texto)", // Start: borde normal
  start_hover_fondo: "var(--sw-tarjeta)", // Start: fondo hover/foco
  start_hover_texto: "var(--sw-texto)", // Start: texto hover/foco
  start_hover_borde: "var(--sw-texto)", // Start: borde hover/foco
  ajustes_fondo: "var(--sw-fondo)", // Einstellungen: fondo normal
  ajustes_texto: "var(--sw-texto)", // Einstellungen: texto normal
  ajustes_borde: "var(--sw-texto)", // Einstellungen: borde normal
  ajustes_hover_fondo: "var(--sw-texto)", // Einstellungen: fondo hover/foco
  ajustes_hover_texto: "var(--sw-fondo)", // Einstellungen: texto hover/foco
  ajustes_hover_borde: "var(--sw-texto)", // Einstellungen: borde hover/foco
};
/* FIN DE AJUSTES EDITABLES. */
