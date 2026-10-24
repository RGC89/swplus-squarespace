(() => {
  /* ==========================================
     SW+ — THUMBNAILS DEL PANEL DE CUENTA
     ========================================== */

  const SW_PACKAGE_THUMBNAILS = {

    "5 HUNDE IM GEPÄCK":
      "https://images.squarespace-cdn.com/content/67050e90a06c7f0fe71c6f1d/1a9451da-a299-4059-abd7-f5e100c1f050/5-hunde-cover-account-thumbnail-squarespace.webp?format=300w"

    ,"DAS WUNDER DER WILDEN INSEL":
      "https://images.squarespace-cdn.com/content/67050e90a06c7f0fe71c6f1d/1359079d-f311-4729-93dd-9b9701262ab5/5-hunde-cover-account-thumbnail-white-bkg-squarespace.webp?format=300w"
    /* Próximos paquetes:
    ,"NOMBRE DEL PAQUETE":
      "URL-DE-LA-IMAGEN"

    ,"OTRO PAQUETE":
      "URL-DE-LA-IMAGEN"
    */
  };

  const normalize = (value = "") =>
    String(value ?? "").replace(/\s+/g, " ").trim().toLocaleUpperCase("de-DE");

  const observedDocuments = new WeakSet();
  const registeredFrames = new WeakSet();

  function applyPackageThumbnails(doc) {
    const possibleTitles = doc.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span, div"
    );

    possibleTitles.forEach((titleElement) => {
      const title = normalize(titleElement.textContent);
      const imageUrl = SW_PACKAGE_THUMBNAILS[title];

      if (!imageUrl) return;

      const childRepeatsTitle = Array.from(titleElement.children).some(
        (child) => normalize(child.textContent) === title
      );

      if (childRepeatsTitle) return;

      /* Buscar la tarjeta completa del producto */
      let card = titleElement;

      while (card.parentElement && card.parentElement !== doc.body) {
        card = card.parentElement;
        const bounds = card.getBoundingClientRect();

        if (
          card.querySelector("svg") &&
          bounds.height >= 48 &&
          bounds.height <= 200
        ) {
          break;
        }
      }

      const icon = card.querySelector("svg");
      if (!icon) return;

      /* Localizar el cuadro verde que contiene el icono */
      let thumbnail = icon.parentElement;

      while (thumbnail.parentElement && thumbnail.parentElement !== card) {
        const bounds = thumbnail.getBoundingClientRect();

        if (
          bounds.width >= 48 &&
          bounds.width <= 140 &&
          bounds.height >= 48 &&
          bounds.height <= 140
        ) {
          break;
        }

        thumbnail = thumbnail.parentElement;
      }

      /* Aplicar la imagen */
      thumbnail.style.setProperty(
        "background-image",
        `url("${imageUrl}")`,
        "important"
      );

      thumbnail.style.setProperty(
        "background-size",
        "contain",
        "important"
      );

      thumbnail.style.setProperty(
        "background-position",
        "center",
        "important"
      );

      thumbnail.style.setProperty(
        "background-repeat",
        "no-repeat",
        "important"
      );

      thumbnail.style.setProperty(
        "background-color",
        (window.SW_PANEL_AJUSTES?.tarjeta || "#FFD280"),
        "important"
      );

      /* Ocultar el icono original de Squarespace */
      thumbnail.querySelectorAll("svg").forEach((svg) => {
        svg.style.setProperty("display", "none", "important");
      });
    });
  }

  function observeAccountDocument(frame) {
    try {
      const doc = frame.contentDocument;

      if (!doc?.body || observedDocuments.has(doc)) return;

      observedDocuments.add(doc);

      let scheduled = false;

      const scheduleUpdate = () => {
        if (scheduled) return;
        scheduled = true;

        frame.contentWindow.requestAnimationFrame(() => {
          scheduled = false;
          applyPackageThumbnails(doc);
        });
      };

      scheduleUpdate();

      new MutationObserver(scheduleUpdate).observe(doc.body, {
        childList: true,
        subtree: true
      });

    } catch (error) {
      console.warn(
        "SW+: no se pudo personalizar el panel de cuenta.",
        error
      );
    }
  }

  function registerAccountFrame(frame) {
    if (!registeredFrames.has(frame)) {
      registeredFrames.add(frame);

      frame.addEventListener("load", () => {
        observeAccountDocument(frame);
      });
    }

    observeAccountDocument(frame);
  }

  function findAccountFrame() {
    const frame = document.querySelector("#accountFrame");

    if (frame) {
      registerAccountFrame(frame);
    }
  }

  findAccountFrame();

  new MutationObserver(findAccountFrame).observe(
    document.documentElement,
    {
      childList: true,
      subtree: true
    }
  );
})();
