(() => {
  /* ==========================================
     SW+ — INTERFAZ DEL PANEL DE CUENTA
     Textos renombrados y opciones ocultas.
     ========================================== */

  const normalize = (value = "") =>
    String(value ?? "").replace(/\s+/g, " ").trim().toLocaleUpperCase("de-DE");

  const observedDocuments = new WeakSet();
  const registeredFrames = new WeakSet();

  function getLeafElements(doc, selector, acceptedTexts) {
    return Array.from(doc.querySelectorAll(selector)).filter((element) => {
      const text = normalize(element.textContent);

      if (!acceptedTexts.has(text)) return false;

      return !Array.from(element.children).some(
        (child) => normalize(child.textContent) === text
      );
    });
  }

  function isAccountOverview(doc) {
    const bodyText = normalize(doc.body?.textContent);

    return (
      bodyText.includes("PROFIL") &&
      (
        bodyText.includes("BESTELLUNGEN") ||
        bodyText.includes("ADRESSE") ||
        bodyText.includes("ORDERS") ||
        bodyText.includes("ADDRESS")
      )
    );
  }

  /* Dejar solamente Profil en la pantalla de ajustes */
  function hideAccountOverviewItems(doc) {
    // Solo enlaces de opciones. Nunca buscar títulos ni inferir filas por tamaño.
    const root = doc.getElementById("user-profile-page-root");
    if (!root) return;
    const header = root.querySelector(".NLnVucTRrmMxOLf3");
    const title = header?.querySelector(".eK3Og0www4Ps09sj");
    // Reparar únicamente el display aplicado por la búsqueda anterior.
    for (const element of [header, title]) {
      if (element?.style.getPropertyValue("display") === "none") {
        element.style.removeProperty("display");
      }
    }
    const hiddenPaths = new Set([
      "/account/digital-products", "/account/orders", "/account/addresses"
    ]);
    const rows = root.querySelectorAll("a.SEFWAQy660zN4xRD[href]");
    rows.forEach((row) => {
      if (header?.contains(row)) return;
      let path;
      try { path = new URL(row.getAttribute("href"), doc.baseURI).pathname.replace(/\/$/, ""); }
      catch (_) { return; }
      if (!hiddenPaths.has(path)) return;
      row.style.setProperty("display", "none", "important");
      if (row.nextElementSibling?.tagName === "HR") {
        row.nextElementSibling.style.setProperty("display", "none", "important");
      }
    });
  }

  /* Digitale Artikel → Buchpakete */
  function renameDigitalProductsHeading(doc) {
    if (isAccountOverview(doc)) return;

    const oldHeadings = new Set([
      "DIGITALE ARTIKEL",
      "DIGITAL PRODUCTS"
    ]);

    getLeafElements(
      doc,
      "h1, h2, h3, h4, h5, h6, p, span, div",
      oldHeadings
    ).forEach((heading) => {
      heading.textContent = "Buchpakete";
    });
  }

  /* Ansehen → Start */
  function renamePackageButtons(doc) {
    if (isAccountOverview(doc)) return;

    const oldButtonTexts = new Set([
      "ANSEHEN",
      "VIEW"
    ]);

    getLeafElements(
      doc,
      "a, button, a *, button *",
      oldButtonTexts
    ).forEach((buttonText) => {
      buttonText.textContent = "Start";
    });
  }

  /* Modificar el aviso conservando el correo y el enlace */
  function renameVerificationMessage(doc) {
    /* ==========================================
       Mensaje de sesión caducada
       ========================================== */

    const oldExpiredMessage = normalize(
      "Bitte melde dich erneut an, um auf deine Kontoinformationen zuzugreifen. Deine Sitzung ist abgelaufen."
    );

    const newExpiredMessage =
      "Deine Sitzung ist abgelaufen. Bitte melde dich erneut an, um deine Buchpakete zu öffnen.";

    Array.from(
      doc.querySelectorAll("p, span, div")
    )
      .filter((element) => {
        if (normalize(element.textContent) !== oldExpiredMessage) {
          return false;
        }

        /* Seleccionar el elemento más pequeño que contiene el mensaje */
        return !Array.from(element.children).some(
          (child) =>
            normalize(child.textContent) === oldExpiredMessage
        );
      })
      .forEach((element) => {
        element.textContent = newExpiredMessage;
      });


    /* ==========================================
       Mensaje de correo electrónico sin confirmar
       ========================================== */

    const walker = doc.createTreeWalker(
      doc.body,
      doc.defaultView.NodeFilter.SHOW_TEXT
    );

    const textNodes = [];
    let node;

    while ((node = walker.nextNode())) {
      const parent = node.parentElement;

      if (!parent || parent.matches("script, style, noscript")) {
        continue;
      }

      textNodes.push(node);
    }

    textNodes.forEach((textNode) => {
      const currentText = textNode.nodeValue;

      const updatedText = currentText
        .replace(
          /Dein Konto ist noch nicht verifiziert\./gi,
          "Deine E-Mail-Adresse ist noch nicht bestätigt."
        )
        .replace(
          /Your account is not yet verified\./gi,
          "Deine E-Mail-Adresse ist noch nicht bestätigt."
        );

      if (updatedText !== currentText) {
        textNode.nodeValue = updatedText;
      }
    });
  }

  /* Konto-Einstellungen → Einstellungen */
  function renameSettingsButton(doc) {
    const oldButtonTexts = new Set([
      "KONTO-EINSTELLUNGEN",
      "KONTOEINSTELLUNGEN",
      "ACCOUNT SETTINGS"
    ]);

    getLeafElements(
      doc,
      "a, button, a *, button *",
      oldButtonTexts
    ).forEach((buttonText) => {
      buttonText.textContent = "Einstellungen";
    });
  }

  /* Konto → Einstellungen, solo en la pantalla del perfil */
  function renameAccountHeading(doc) {
    if (!isAccountOverview(doc)) return;

    const oldHeadings = new Set([
      "KONTO",
      "ACCOUNT"
    ]);

    getLeafElements(
      doc,
      "h1, h2, h3, h4, h5, h6, p, span, div",
      oldHeadings
    ).forEach((heading) => {
      heading.textContent = "Einstellungen";
    });
  }

  function updateAccountInterface(doc) {
    hideAccountOverviewItems(doc);
    renameDigitalProductsHeading(doc);
    renamePackageButtons(doc);
    renameVerificationMessage(doc);
    renameSettingsButton(doc);
    renameAccountHeading(doc);
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
          updateAccountInterface(doc);
        });
      };

      scheduleUpdate();

      new MutationObserver(scheduleUpdate).observe(doc.body, {
        childList: true,
        subtree: true,
        characterData: true
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

    if (frame) registerAccountFrame(frame);
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
