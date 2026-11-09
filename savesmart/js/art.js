/* ==========================================================================
   SaveSmart — product illustrations
   Draws a clean packshot-style SVG for each product from its `art` spec, so
   the catalog never shows a broken image. When real product photos exist,
   set `product.image` to a URL and this becomes the fallback.
   ========================================================================== */
(function () {
  "use strict";

  const CREAM = "#FFFDF7";
  const INK = "#202A23";

  function shade(hex, amount) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const t = amount < 0 ? 0 : 255;
    const p = Math.abs(amount);
    r = Math.round((t - r) * p + r);
    g = Math.round((t - g) * p + g);
    b = Math.round((t - b) * p + b);
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  function label(x, y, w, h, text, size) {
    // Fit bold uppercase text inside the label (≈0.74em per glyph + tracking).
    const n = Math.max(text.length, 3);
    const fs = size || Math.min(11, (w - 6) / (n * 0.74 + (n - 1) * 0.05));
    return (
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${CREAM}"/>` +
      `<text x="${x + w / 2}" y="${y + h / 2 + fs * 0.36}" text-anchor="middle" ` +
      `font-family="Inter, Segoe UI, sans-serif" font-weight="800" font-size="${fs.toFixed(1)}" ` +
      `letter-spacing="${(fs * 0.05).toFixed(2)}" fill="${INK}">${text}</text>`
    );
  }

  const shapes = {
    carton(c, t) {
      return `
        <path d="M38 34 L48 20 H72 L82 34 Z" fill="${shade(c, 0.25)}"/>
        <rect x="46" y="14" width="28" height="7" rx="2" fill="${shade(c, -0.2)}"/>
        <rect x="38" y="34" width="44" height="66" rx="3" fill="${c}"/>
        <rect x="38" y="34" width="10" height="66" fill="${shade(c, -0.12)}"/>
        ${label(44, 58, 34, 18, t)}`;
    },
    tub(c, t) {
      return `
        <ellipse cx="60" cy="42" rx="30" ry="8" fill="${shade(c, -0.2)}"/>
        <path d="M30 42 L36 94 Q60 102 84 94 L90 42 Z" fill="${c}"/>
        <path d="M30 42 L36 94 Q42 96 48 97 L44 42 Z" fill="${shade(c, -0.1)}"/>
        <ellipse cx="60" cy="40" rx="30" ry="7" fill="${shade(c, 0.35)}"/>
        ${label(40, 60, 40, 17, t)}`;
    },
    eggs(c, t) {
      let eggs = "";
      [36, 52, 68, 84].forEach((x) => {
        eggs += `<ellipse cx="${x}" cy="54" rx="7" ry="9" fill="#F3E6D0"/>`;
      });
      return `
        ${eggs}
        <path d="M22 58 H98 L92 92 H28 Z" fill="${c}"/>
        <path d="M22 58 H98 L97 64 H23 Z" fill="${shade(c, -0.15)}"/>
        ${label(38, 70, 44, 15, t)}`;
    },
    loaf(c, t) {
      return `
        <path d="M24 70 Q24 40 60 40 Q96 40 96 70 L94 92 H26 Z" fill="${c}"/>
        <path d="M24 70 Q24 40 60 40 Q96 40 96 70 Z" fill="${shade(c, 0.12)}"/>
        <path d="M44 50 l6 10 M58 47 l6 10 M72 50 l6 10" stroke="${shade(c, -0.25)}" stroke-width="3" stroke-linecap="round"/>
        <rect x="24" y="70" width="72" height="22" fill="${shade(c, 0.45)}" opacity="0.55"/>
        ${label(40, 73, 40, 15, t)}`;
    },
    box(c, t) {
      return `
        <path d="M34 26 L44 18 H92 L82 26 Z" fill="${shade(c, 0.25)}"/>
        <path d="M82 26 L92 18 V92 L82 100 Z" fill="${shade(c, -0.22)}"/>
        <rect x="28" y="26" width="54" height="74" rx="2" fill="${c}"/>
        ${label(34, 52, 42, 18, t)}
        <rect x="34" y="78" width="30" height="4" rx="2" fill="${shade(c, 0.35)}"/>`;
    },
    bag(c, t) {
      return `
        <path d="M36 22 H84 L88 30 Q92 66 86 100 H34 Q28 66 32 30 Z" fill="${c}"/>
        <path d="M36 22 H84 L86 28 H34 Z" fill="${shade(c, -0.2)}"/>
        <path d="M34 30 Q28 66 34 100 H42 Q37 66 41 30 Z" fill="${shade(c, -0.1)}"/>
        ${label(40, 56, 42, 18, t)}`;
    },
    bottle(c, t) {
      return `
        <rect x="52" y="10" width="16" height="10" rx="2" fill="${shade(c, -0.3)}"/>
        <path d="M53 20 H67 V30 Q80 38 80 52 V100 Q80 106 74 106 H46 Q40 106 40 100 V52 Q40 38 53 30 Z" fill="${c}"/>
        <path d="M40 52 Q40 38 53 30 V106 H46 Q40 106 40 100 Z" fill="${shade(c, -0.1)}"/>
        <rect x="45" y="44" width="5" height="40" rx="2.5" fill="${CREAM}" opacity="0.28"/>
        ${label(42, 62, 36, 18, t)}`;
    },
    jar(c, t) {
      return `
        <rect x="38" y="22" width="44" height="14" rx="3" fill="${shade(c, -0.25)}"/>
        <rect x="34" y="36" width="52" height="64" rx="8" fill="${c}"/>
        <rect x="34" y="36" width="12" height="64" rx="6" fill="${shade(c, -0.12)}"/>
        ${label(38, 58, 44, 18, t)}`;
    },
    rolls(c, t) {
      return `
        <rect x="24" y="36" width="72" height="60" rx="8" fill="${shade(c, 0.55)}"/>
        <circle cx="42" cy="50" r="10" fill="#F6F3EA" stroke="${shade(c, 0.2)}" stroke-width="2"/>
        <circle cx="60" cy="50" r="10" fill="#F6F3EA" stroke="${shade(c, 0.2)}" stroke-width="2"/>
        <circle cx="78" cy="50" r="10" fill="#F6F3EA" stroke="${shade(c, 0.2)}" stroke-width="2"/>
        <circle cx="42" cy="50" r="3" fill="${shade(c, 0.1)}"/><circle cx="60" cy="50" r="3" fill="${shade(c, 0.1)}"/><circle cx="78" cy="50" r="3" fill="${shade(c, 0.1)}"/>
        <rect x="24" y="66" width="72" height="30" rx="4" fill="${c}"/>
        ${label(40, 72, 40, 16, t)}`;
    },
    tube(c, t) {
      return `
        <rect x="52" y="92" width="16" height="12" rx="2" fill="${shade(c, -0.3)}"/>
        <path d="M30 18 H90 L84 26 L70 92 H50 L36 26 Z" fill="${c}"/>
        <path d="M30 18 H90 V24 H30 Z" fill="${shade(c, -0.2)}"/>
        ${label(44, 44, 32, 16, t)}`;
    },
    bar(c, t) {
      return `
        <g transform="rotate(-10 60 60)">
          <rect x="18" y="40" width="84" height="40" rx="3" fill="${c}"/>
          <rect x="18" y="40" width="14" height="40" fill="${shade(c, -0.15)}"/>
          <rect x="88" y="40" width="14" height="40" fill="${shade(c, -0.15)}"/>
          ${label(38, 51, 44, 18, t)}
        </g>`;
    },
    can(c, t) {
      return `
        <ellipse cx="60" cy="20" rx="20" ry="5" fill="${shade(c, -0.3)}"/>
        <rect x="40" y="20" width="40" height="82" fill="${c}"/>
        <rect x="40" y="20" width="9" height="82" fill="${shade(c, -0.12)}"/>
        <ellipse cx="60" cy="102" rx="20" ry="5" fill="${shade(c, -0.2)}"/>
        ${label(43, 54, 34, 18, t)}`;
    }
  };

  /** Returns an SVG string for a product. */
  function productArt(product) {
    const art = product.art || { shape: "box", color: "#83A98B", label: "ITEM" };
    const draw = shapes[art.shape] || shapes.box;
    return (
      `<svg viewBox="0 0 120 120" role="img" aria-label="${product.name}" xmlns="http://www.w3.org/2000/svg">` +
      `<ellipse cx="60" cy="108" rx="34" ry="5" fill="#174D35" opacity="0.08"/>` +
      draw(art.color, art.label) +
      `</svg>`
    );
  }

  /** Product image markup: real photo when available, illustration otherwise. */
  function productImage(product) {
    const art = productArt(product);
    if (product.image) {
      return (
        `<img src="${product.image}" alt="${product.name}" loading="lazy" ` +
        `onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'art',innerHTML:this.dataset.art}))" ` +
        `data-art='${art.replace(/'/g, "&#39;")}'>`
      );
    }
    return `<span class="art">${art}</span>`;
  }

  window.SSArt = { productArt, productImage };
})();
