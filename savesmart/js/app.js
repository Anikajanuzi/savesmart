/* ==========================================================================
   SaveSmart — app bootstrap: navigation, hero, reset
   ========================================================================== */
(function () {
  "use strict";
  const { DATA, $, $$, escapeHtml, money, longDate, productById, storeById, productStats, animateNumber, openModal, closeModal, storage, emit, toast } = SS;

  /* ---------- Navigation ---------- */
  function initNav() {
    const nav = $("#nav");
    const links = $$(".nav__link");
    const indicator = $(".nav__indicator");
    const menuBtn = $("#menu-btn");

    const moveIndicator = (link) => {
      if (!link || window.innerWidth <= 920) return;
      indicator.style.left = link.offsetLeft + "px";
      indicator.style.width = link.offsetWidth + "px";
      indicator.style.opacity = 1;
    };
    const setActive = (id) => {
      links.forEach((l) => {
        const active = l.dataset.section === id;
        l.classList.toggle("is-active", active);
        if (active) { l.setAttribute("aria-current", "true"); moveIndicator(l); }
        else l.removeAttribute("aria-current");
      });
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      }, { rootMargin: "-40% 0px -55% 0px" });
      $$("[data-observe]").forEach((s) => io.observe(s));
    }
    setActive("home");
    window.addEventListener("resize", () => moveIndicator($(".nav__link.is-active")));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveIndicator($(".nav__link.is-active")));

    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const setMenu = (open) => {
      nav.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      // Swap the icon in place; replacing the button's markup would detach the
      // clicked node and make the outside-click handler close the menu again.
      menuBtn.querySelector("use").setAttribute("href", open ? "#i-x" : "#i-menu");
    };
    menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
    links.forEach((l) => l.addEventListener("click", () => setMenu(false)));
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("is-open") && e.target.isConnected && !nav.contains(e.target)) setMenu(false);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  }

  /* ---------- Hero ---------- */
  function initHero() {
    $("#hero-products").textContent = DATA.products.length;
    $("#hero-stores").textContent = DATA.stores.length;

    const sample = SS.Basket.compute(SS.Basket.SAMPLE_BASKET);
    animateNumber($("#hero-saving"), sample.savings, (n) => money(n), 1400);

    // Comparison preview card built from real (demo) data
    const product = productById[16];
    const s = productStats(product);
    const rows = [...s.sorted.slice(0, 3), s.sorted[s.sorted.length - 1]];
    $("#hero-preview").innerHTML = `
      <div class="cp__head">
        <div class="cp__img">${SSArt.productArt(product)}</div>
        <div>
          <div class="cp__name">${escapeHtml(product.name)}</div>
          <div class="cp__meta">${escapeHtml(product.brand)} · ${escapeHtml(product.quantity)} · ${s.storeCount} stores compared</div>
        </div>
      </div>
      ${rows.map((r, i) => {
        const best = r.price === s.min;
        return `
        <div class="cp__row${best ? " is-best" : ""}">
          <span class="store-badge${best ? " store-badge--best" : ""}">${storeById[r.storeId].initials}</span>
          <div class="cp__store">${escapeHtml(storeById[r.storeId].name)}
            <div class="cp__bar"><span style="width:${(r.price / s.max) * 100}%;animation-delay:${0.5 + i * 0.12}s"></span></div>
          </div>
          <div class="cp__price">${money(r.price)}</div>
        </div>`;
      }).join("")}
      <div class="cp__foot"><span>Example prices · ${longDate(s.latestUpdate)}</span><span>Difference <strong>${money(s.spread)}</strong></span></div>`;
    $("#hero-chip-title").textContent = "Best price found";
    $("#hero-chip-sub").textContent = `${storeById[s.cheapestStores[0]].name} · ${money(s.min)}`;

    const quick = ["Milk", "Coffee", "Laundry", "Chocolate"];
    $("#hero-quick").innerHTML = `<span>Popular:</span>` + quick.map((q) => `<button type="button" data-q="${q}">${q}</button>`).join("");
    $("#hero-quick").addEventListener("click", (e) => {
      const b = e.target.closest("[data-q]");
      if (b) goSearch(b.dataset.q);
    });

    $("#hero-search").addEventListener("submit", (e) => {
      e.preventDefault();
      goSearch($("#hero-search-input").value);
    });
  }

  function goSearch(q) {
    SS.Catalog.setSearch(q || "");
    document.getElementById("compare").scrollIntoView({ behavior: "smooth" });
  }

  /* ---------- Reset demo data ---------- */
  function initReset() {
    document.addEventListener("click", (e) => {
      if (e.target.closest('[data-action="reset-demo"]')) openModal("confirm-modal");
    });
    $("#confirm-ok").addEventListener("click", () => {
      storage.clearAll();
      emit("data:reset");
      SS.Catalog.clearFilters();
      closeModal("confirm-modal");
      toast("Demo data restored");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    $("#data-updated").textContent = longDate(DATA.dataLastUpdated);
    $("#data-updated").setAttribute("datetime", DATA.dataLastUpdated);

    // Order matters: Basket before Catalog (catalog reads basket state).
    const modules = [SS.Basket, SS.Catalog, SS.Budget, SS.StoreMap, SS.Community];
    modules.forEach((m) => {
      try { m.init(); } catch (err) { console.error("SaveSmart module failed to start:", err); }
    });
    initNav();
    initHero();
    initReset();
  });
})();
