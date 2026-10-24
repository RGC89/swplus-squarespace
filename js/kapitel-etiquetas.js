(() => {
  /* ==========================================
     SW+ — LESUNG y CLIPS en vez de LEKTIONEN
     ========================================== */
  const chapterLabels = [
    ["670c3409eb8db75705f053ec", "Lesung", "Lesungen"],
    ["670c3409eb8db75705f053ef", "Clip", "Clips"]
  ];

  function updateLabels(section) {
    for (const [id, singular, plural] of chapterLabels) {
      const label = section.querySelector(
        `[data-chapter-id="${id}"] ` +
        ".course-list__grid-chapter-item-chapter-meta > span:first-child"
      );

      if (!label) continue;

      const match = label.textContent.match(/^\s*(\d+)\b/);
      if (!match) continue;

      const count = Number(match[1]);
      const text = `${count} ${count === 1 ? singular : plural}`;

      if (label.textContent !== text) {
        label.textContent = text;
      }
    }
  }

  function init() {
    const section = document.querySelector(
      'section[data-section-id="670c3409eb8db75705f0547d"]'
    );

    if (!section || section.dataset.swLabelsReady) return;
    section.dataset.swLabelsReady = "true";

    updateLabels(section);

    new MutationObserver(() => updateLabels(section)).observe(section, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
