(() => {
  /* ==========================================
     SW+ — KONTO → DEINE BÜCHER
     Botón de cuenta en la cabecera del sitio.
     Su estilo está en css/sitio.css.
     ========================================== */

  const oldLabels = new Set([
    "KONTO",
    "ACCOUNT"
  ]);

  const normalize = (text = "") =>
    String(text ?? "").replace(/\s+/g, " ").trim().toLocaleUpperCase("de-DE");

  let updateScheduled = false;

  function replaceAccountButton() {
    const headers = document.querySelectorAll("header, #header");

    headers.forEach((header) => {
      const walker = document.createTreeWalker(
        header,
        NodeFilter.SHOW_TEXT
      );

      const textNodes = [];
      let node;

      while ((node = walker.nextNode())) {
        textNodes.push(node);
      }

      textNodes.forEach((textNode) => {
        if (!oldLabels.has(normalize(textNode.nodeValue))) return;

        const originalText = textNode.nodeValue;
        const leadingSpace = originalText.match(/^\s*/)?.[0] || "";
        const trailingSpace = originalText.match(/\s*$/)?.[0] || "";

        textNode.nodeValue =
          leadingSpace + "DEINE BÜCHER" + trailingSpace;

        const button = textNode.parentElement?.closest("a, button");

        if (button) {
          button.classList.add("sw-deine-buecher-button");
          button.setAttribute("aria-label", "Deine Bücher");

          if (normalize(button.getAttribute("title")) === "KONTO") {
            button.setAttribute("title", "Deine Bücher");
          }
        }
      });
    });
  }

  function scheduleUpdate() {
    if (updateScheduled) return;

    updateScheduled = true;

    requestAnimationFrame(() => {
      updateScheduled = false;
      replaceAccountButton();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleUpdate);
  } else {
    scheduleUpdate();
  }

  new MutationObserver(scheduleUpdate).observe(
    document.documentElement,
    {
      childList: true,
      subtree: true,
      characterData: true
    }
  );
})();
