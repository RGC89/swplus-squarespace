/* ==========================================
   SW+ — ASPECTO DEL PANEL DE CUENTA
   Colores, campos, tarjetas y botones del panel.
   Los valores se editan en js/ajustes-panel.js, que debe cargarse antes.
   ========================================== */
(() => {
  'use strict';
  const KEY = '__swAccountAppearanceV1';
  if (window[KEY]) return;
  const STYLE_ID = 'sw-account-appearance-v1';
  const ATTR = 'data-sw-account-appearance';
  const scope = '#user-profile-page-root[data-sw-account-appearance="v1"]';
  // Clases internas comprobadas el 18-10-2026. Squarespace puede cambiarlas.
  const parts = {
    // Solo el cajón visible; QdcHQQbzHx8J65q7 cubre toda la ventana.
    surface: '.OsfCMlEhvIIeYs50, .bb0Z3hZreooEvrCF, .N7X9VeOBr4wDbW1Y',
    title: '.eK3Og0www4Ps09sj',
    header: '.ILnkiq8s9dQimQHU',
    notice: '.nuSS5l0GyoYxRfDE',
    row: '.INF6ruSJOiguvtZU, .SEFWAQy660zN4xRD',
    productTitle: 'h2.style-injection-ouh7s6',
    start: 'button.style-injection-nvitc9',
    settings: 'a[href="/account"], a[href="/account/"]',
    settingsInner: '.style-injection-16p1uws',
    resend: 'button.ly3Jg5elvPgcRJtn, button.ZcLoP5ICWvY19peV',
    logout: 'button[data-test="sign-out"]'
  };
  const rule = (selectors, body) => selectors.split(',').map(s => `${scope} ${s.trim()}`).join(',') + `{${body}}`;
  const primary = `${parts.start}, ${parts.settings}`;
  // Los campos de perfil incluyen su etiqueta en el contenedor nativo.
  const profileField = '.iBQyzWk_89chUL75:has(input:not(:disabled):not([type="hidden"]))';
  const searchField = '.style-injection-1rxyiww:has(input.style-injection-1x2texr)';
  const fields = `${profileField}, ${searchField}`;
  const fieldContents = `${profileField} input, ${searchField} input`;
  const packageCard = '.INF6ruSJOiguvtZU:has(h2.style-injection-ouh7s6)';
  const fieldRow = '.INF6ruSJOiguvtZU:has(input:not(:disabled):not([type="hidden"]))';
  const primaryContent = `${parts.start} *, a[href="/account"] *, a[href="/account/"] *`;
  const primaryEffects = [parts.start, 'a[href="/account"]', 'a[href="/account/"]']
    .flatMap(s => [`${s}::before`, `${s}::after`, `${s} *::before`, `${s} *::after`]).join(',');
  const ajustes = window.SW_PANEL_AJUSTES;
  const variables = Object.entries(ajustes).map(([key,value]) => '--sw-' + key + ':' + value).join(';');
  const css = [
    `${scope}{${variables}}`,
    `${scope}{--sw-ink:var(--sw-texto);--sw-cream:var(--sw-fondo);--sw-line:rgba(24,25,26,.15);color:var(--sw-ink);font-family:Inter,Arial,sans-serif;font-weight:400;}`,
    rule(parts.surface, 'background-color:var(--sw-cream)!important;color:var(--sw-ink)!important;'),
    rule('input, button, a, label, legend', 'font-family:Inter,Arial,sans-serif;'),
    rule('input', 'color:var(--sw-ink)!important;background-color:transparent!important;'),
    rule('input::placeholder', 'color:var(--sw-texto_placeholder);opacity:1;'),
    rule(parts.title, 'font-family:"Winky Sans",Inter,sans-serif!important;font-weight:var(--sw-titulo_peso)!important;font-size:var(--sw-titulo_tamano)!important;line-height:var(--sw-titulo_interlineado)!important;letter-spacing:var(--sw-titulo_espaciado)!important;color:var(--sw-ink)!important;'),
    rule(parts.productTitle, 'font-family:Inter,Arial,sans-serif!important;font-weight:700!important;color:var(--sw-ink)!important;'),
    rule(`${parts.header}, ${parts.notice}, ${parts.row}, [role="separator"], hr`, 'border-color:var(--sw-line)!important;'),
    rule('[role="separator"] > div', 'background-color:var(--sw-line)!important;'),
    // Retirar divisores decorativos, conservando los bordes propios de campos y botones.
    rule(`${parts.header}, ${parts.notice}`, 'border-bottom:0!important;'),
    rule('hr, [role="separator"]', 'display:none!important;'),
    rule(parts.notice, 'background-color:var(--sw-cream)!important;color:var(--sw-ink)!important;'),
    rule(primary, 'box-sizing:border-box!important;font-family:Asap,Inter,sans-serif!important;font-weight:var(--sw-boton_peso)!important;text-transform:uppercase;border:var(--sw-boton_borde) solid var(--sw-ink)!important;border-radius:var(--sw-boton_radio)!important;background:var(--sw-ink)!important;color:var(--sw-cream)!important;text-decoration:none!important;transition:background-color var(--sw-boton_transicion) ease,color var(--sw-boton_transicion) ease,border-color var(--sw-boton_transicion) ease!important;'),
    rule(parts.settings, 'display:block;'),
    // El aspecto se dibuja solo en el control exterior. Suprimir capas decorativas nativas.
    rule(primaryEffects, 'content:none!important;display:none!important;box-shadow:none!important;background-image:none!important;'),
    rule(primary, 'box-shadow:none!important;background-image:none!important;filter:none!important;animation:none!important;'),
    rule(primaryContent, 'background:transparent!important;box-shadow:none!important;filter:none!important;opacity:1!important;animation:none!important;transition:none!important;'),
    rule('.N7X9VeOBr4wDbW1Y', 'opacity:1!important;filter:none!important;'),
    rule(`${parts.start}:not(:disabled):not([aria-disabled="true"]), a[href="/account"]:not([aria-disabled="true"]), a[href="/account/"]:not([aria-disabled="true"])`, 'opacity:1!important;'),
    rule(parts.settingsInner, 'background:transparent!important;border:0!important;border-radius:inherit!important;color:inherit!important;font-family:inherit!important;font-weight:inherit!important;'),
    rule(`${parts.start} > span, a[href="/account"] span, a[href="/account/"] span`, 'color:inherit!important;font-family:inherit!important;font-weight:inherit!important;'),
    rule(`${parts.start}:not(:disabled):not([aria-disabled="true"]):hover, ${parts.start}:not(:disabled):not([aria-disabled="true"]):focus-visible, ${parts.settings}:not([aria-disabled="true"]):hover, ${parts.settings}:not([aria-disabled="true"]):focus-visible`, 'background:var(--sw-cream)!important;color:var(--sw-ink)!important;border-color:var(--sw-ink)!important;'),
    rule(`${parts.start}:disabled, ${parts.start}[aria-disabled="true"], ${parts.settings}[aria-disabled="true"]`, 'opacity:var(--sw-boton_opacidad_desactivado)!important;'),
    // Start usa el amarillo de su tarjeta; Einstellungen sigue el botón secundario.
    rule(parts.settings, 'background:var(--sw-cream)!important;color:var(--sw-ink)!important;border-color:var(--sw-ink)!important;'),
    rule('a[href="/account"]:not([aria-disabled="true"]):hover, a[href="/account"]:not([aria-disabled="true"]):focus-visible, a[href="/account/"]:not([aria-disabled="true"]):hover, a[href="/account/"]:not([aria-disabled="true"]):focus-visible', 'background:var(--sw-ink)!important;color:var(--sw-cream)!important;border-color:var(--sw-ink)!important;'),
    rule(parts.start, 'color:var(--sw-tarjeta)!important;'),
    rule(`${parts.start}:not(:disabled):not([aria-disabled="true"]):hover, ${parts.start}:not(:disabled):not([aria-disabled="true"]):focus-visible`, 'background:var(--sw-tarjeta)!important;color:var(--sw-ink)!important;border-color:var(--sw-ink)!important;'),
    rule(`${parts.resend}, ${parts.logout}, a[href="/account/profile/password/change"]`, 'color:var(--sw-ink)!important;text-decoration:underline!important;text-underline-offset:3px;'),
    rule('button.ly3Jg5elvPgcRJtn span, button.ZcLoP5ICWvY19peV span', 'color:inherit!important;'),
    rule('a[href="/account/profile"]:hover, a[href="/account/profile"]:focus-visible, a[href="/account/profile"]:hover > div, a[href="/account/profile"]:focus-visible > div', 'background-color:var(--sw-profil_hover)!important;'),
    rule('a[href="/account/profile"]', 'border-radius:var(--sw-profil_radio)!important;'),
    rule('a[href="/account/profile"] > div', 'border-radius:inherit!important;'),
    rule('a[href="/account/profile"]:hover, a[href="/account/profile"]:focus-visible, a[href="/account/profile"]:hover > div, a[href="/account/profile"]:focus-visible > div', 'border-color:transparent!important;box-shadow:none!important;'),
    rule('a[href="/account/profile"]:hover::before, a[href="/account/profile"]:hover::after, a[href="/account/profile"]:focus-visible::before, a[href="/account/profile"]:focus-visible::after', 'background:transparent!important;border-color:transparent!important;box-shadow:none!important;'),
    rule('a:focus-visible, button:focus-visible, input:focus-visible', 'outline:2px solid var(--sw-foco)!important;outline-offset:4px!important;'),
    // Controles de cabecera: foco discreto sobre el texto, sin marco rectangular.
    rule(`${parts.header} button:focus, ${parts.header} button:focus-visible`, 'outline:none!important;box-shadow:none!important;'),
    rule(`${parts.header} button:focus-visible .fs-unmask`, 'text-decoration:underline!important;text-underline-offset:4px;'),
    // Un único borde para cada campo, incluida la lupa o la etiqueta.
    rule(fields, 'box-sizing:border-box!important;border:var(--sw-campo_borde) solid var(--sw-borde_campo)!important;border-radius:var(--sw-campo_radio)!important;background:var(--sw-cream)!important;outline:none!important;box-shadow:none!important;height:auto!important;min-height:var(--sw-campo_altura_minima)!important;padding:var(--sw-campo_padding_vertical) var(--sw-campo_padding_horizontal)!important;'),
    rule(`${profileField}:focus-within, ${searchField}:focus-within`, 'border-color:var(--sw-ink)!important;box-shadow:inset 0 0 0 var(--sw-campo_foco_extra) var(--sw-ink)!important;background:var(--sw-cream)!important;outline:none!important;'),
    rule(fieldContents, 'box-sizing:border-box!important;min-width:0!important;max-width:100%!important;border:0!important;border-radius:0!important;outline:none!important;box-shadow:none!important;background:transparent!important;height:var(--sw-campo_altura_texto)!important;min-height:0!important;padding-top:0!important;padding-bottom:0!important;margin-top:0!important;margin-bottom:0!important;line-height:var(--sw-campo_altura_texto)!important;font-size:var(--sw-campo_texto_tamano)!important;'),
    rule(`${profileField} input:focus, ${profileField} input:focus-visible, ${searchField} input:focus, ${searchField} input:focus-visible`, 'outline:none!important;box-shadow:none!important;background:transparent!important;'),
    // Quitar la altura y el relleno vertical nativos que se sumaban al borde exterior.
    rule(`${profileField} .eRQiva7GpIogr0dK, ${profileField} .JbOMHCl92k4P7XRp, ${profileField} .O3k61v6U7H8cjf4E, ${searchField} .style-injection-2dh45j, ${searchField} .style-injection-ipzxph`, 'min-width:0!important;background:transparent!important;height:auto!important;min-height:0!important;padding-top:0!important;padding-bottom:0!important;margin-top:0!important;margin-bottom:0!important;'),
    rule(`${profileField} label`, 'padding-top:0!important;padding-bottom:0!important;margin-top:0!important;margin-bottom:0!important;line-height:var(--sw-campo_altura_texto)!important;'),
    rule(fieldRow, 'border:0!important;margin-bottom:var(--sw-campo_separacion);outline:none!important;box-shadow:none!important;background:transparent!important;'),
    rule(`${fieldRow}:focus-within`, 'outline:none!important;box-shadow:none!important;background:transparent!important;'),
    rule(`${fieldRow}::before, ${fieldRow}::after, ${profileField}::before, ${profileField}::after`, 'content:none!important;display:none!important;'),
    rule('.style-injection-xa58np:has(input.style-injection-1x2texr) > [role="separator"]', 'display:none!important;'),
    // Tarjetas separadas: el amarillo permanece en reposo y al pasar el cursor.
    rule(searchField, 'margin-bottom:var(--sw-busqueda_separacion)!important;'),
    rule(packageCard, 'box-sizing:border-box!important;background:var(--sw-tarjeta)!important;border:0!important;border-radius:var(--sw-tarjeta_radio)!important;padding:var(--sw-tarjeta_padding_vertical) var(--sw-tarjeta_padding_horizontal)!important;margin:0 0 var(--sw-tarjeta_separacion)!important;'),
    rule(`${packageCard} .iBQyzWk_89chUL75, ${packageCard} .eRQiva7GpIogr0dK, ${packageCard} .style-injection-bh5vs5`, 'background:transparent!important;border:0!important;box-shadow:none!important;min-width:0!important;'),
    // Evitar que el relleno nativo se sume al relleno exterior de la tarjeta.
    rule(`${packageCard} .iBQyzWk_89chUL75`, 'padding-top:var(--sw-tarjeta_padding_interior)!important;padding-bottom:var(--sw-tarjeta_padding_interior)!important;min-height:0!important;'),
    rule(`${packageCard} .eRQiva7GpIogr0dK, ${packageCard} .style-injection-bh5vs5`, 'padding-top:0!important;padding-bottom:0!important;margin-top:0!important;margin-bottom:0!important;min-height:0!important;'),
    rule(`${packageCard} .style-injection-1xi4blx`, 'min-width:0!important;'),
    rule(`${packageCard} h2`, 'overflow-wrap:anywhere;'),

    rule(parts.start, 'background:var(--sw-start_fondo)!important;color:var(--sw-start_texto)!important;border-color:var(--sw-start_borde)!important;'),
    rule(`${parts.start}:not(:disabled):not([aria-disabled="true"]):hover, ${parts.start}:not(:disabled):not([aria-disabled="true"]):focus-visible`, 'background:var(--sw-start_hover_fondo)!important;color:var(--sw-start_hover_texto)!important;border-color:var(--sw-start_hover_borde)!important;'),
    rule(parts.settings, 'background:var(--sw-ajustes_fondo)!important;color:var(--sw-ajustes_texto)!important;border-color:var(--sw-ajustes_borde)!important;'),
    rule('a[href="/account"]:not([aria-disabled="true"]):hover, a[href="/account"]:not([aria-disabled="true"]):focus-visible, a[href="/account/"]:not([aria-disabled="true"]):hover, a[href="/account/"]:not([aria-disabled="true"]):focus-visible', 'background:var(--sw-ajustes_hover_fondo)!important;color:var(--sw-ajustes_hover_texto)!important;border-color:var(--sw-ajustes_hover_borde)!important;'),
    `@media(prefers-reduced-motion:reduce){${rule(primary, 'transition:none!important;')}}`
  ].join('\n');
  const documents = new Map();
  const frames = new Map();
  let stopped = false;
  let pending = false;
  const allowed = () => /^\/account\/(?:digital-products\/?|profile(?:\/(?:email|password)\/change)?\/?)$/.test(location.pathname) || /^\/account\/?$/.test(location.pathname);
  function fontRules() {
    // Reutiliza solo las declaraciones existentes; no añade proveedores externos.
    return Array.from(document.querySelectorAll('style[data-sqsp-font-ids]'))
      .flatMap(el => el.textContent.match(/@font-face\s*\{[^}]+\}/g) || [])
      .filter(face => /font-style:\s*normal\s*;/.test(face) && (
        /font-family:\s*['"]Winky Sans['"]/.test(face) && /font-weight:\s*800\s*;/.test(face) ||
        /font-family:\s*['"]Inter['"]/.test(face) && /font-weight:\s*(400|700)\s*;/.test(face) ||
        /font-family:\s*['"]Asap['"]/.test(face) && /font-weight:\s*700\s*;/.test(face)
      )).join('\n');
  }
  function update(doc) {
    if (stopped || !doc.head) return;
    const root = doc.getElementById('user-profile-page-root');
    if (!root) return;
    if (allowed()) {
      if (root.getAttribute(ATTR) !== 'v1') root.setAttribute(ATTR, 'v1');
    } else root.removeAttribute(ATTR);
    const content = fontRules() + '\n' + css;
    let sheet = doc.getElementById(STYLE_ID);
    if (!sheet) {
      sheet = doc.createElement('style');
      sheet.id = STYLE_ID;
      doc.head.appendChild(sheet);
    }
    if (sheet.textContent !== content) sheet.textContent = content;
  }
  function register(frame) {
    if (!frames.has(frame)) {
      const onLoad = () => schedule();
      frame.addEventListener('load', onLoad);
      frames.set(frame, onLoad);
    }
    try {
      const doc = frame.contentDocument;
      if (!doc || !doc.documentElement) return;
      if (!documents.has(doc)) {
        const observer = new MutationObserver(schedule);
        observer.observe(doc.documentElement, {childList:true,subtree:true});
        documents.set(doc, observer);
      }
      update(doc);
    } catch (_) { /* Si el marco deja de ser accesible, no modificarlo. */ }
  }
  function run() {
    pending = false;
    if (stopped) return;
    for (const [frame, listener] of frames) {
      if (!frame.isConnected) { frame.removeEventListener('load', listener); frames.delete(frame); }
    }
    const frame = document.querySelector('#accountFrame');
    let current = null;
    try { current = frame && frame.contentDocument; } catch (_) { /* Marco inaccesible. */ }
    for (const [doc, observer] of documents) {
      if (doc !== current) { observer.disconnect(); documents.delete(doc); }
    }
    if (frame) register(frame);
  }
  function schedule() {
    if (pending || stopped) return;
    pending = true;
    requestAnimationFrame(run);
  }
  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {childList:true,subtree:true});
  window.addEventListener('popstate', schedule);
  window[KEY] = {
    uninstall() {
      stopped = true;
      observer.disconnect();
      window.removeEventListener('popstate', schedule);
      for (const [frame, listener] of frames) frame.removeEventListener('load', listener);
      for (const [doc, innerObserver] of documents) {
        innerObserver.disconnect();
        doc.getElementById(STYLE_ID)?.remove();
        doc.getElementById('user-profile-page-root')?.removeAttribute(ATTR);
      }
      frames.clear(); documents.clear(); delete window[KEY];
    }
  };
  schedule();
})();
