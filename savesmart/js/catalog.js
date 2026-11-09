/* ==========================================================================
   SaveSmart — product catalog & price comparison
   ========================================================================== */
(function () {
  "use strict";
  const { DATA, $, escapeHtml, money, pct, shortDate, longDate, storeById, categoryLabel, priceAt, productStats, unitPrice, storage, debounce, openModal } = SS;

  const DEFAULTS = { search: "", category: "all", store: "all", sort: "featured" };
  const state = Object.assign({}, DEFAULTS, storage.get("catalogPrefs", {}));

  const els = {};

  /* ---------- Filtering ---------- */
  const normalize = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  function matchesSearch(p, q) {
    if (!q) return true;
    const hay = normalize(`${p.name} ${p.brand} ${categoryLabel[p.category]} ${p.quantity}`);
    return normalize(q).split(/\s+/).filter(Boolean).every((term) => hay.includes(term));
  }

  function filtered({ ignoreCategory = false } = {}) {
    return DATA.products.filter((p) =>
      matchesSearch(p, state.search) &&
      (ignoreCategory || state.category === "all" || p.category === state.category) &&
      (state.store === "all" || priceAt(p, state.store) !== null)
    );
  }

  function sorted(list) {
    const out = [...list];
    switch (state.sort) {
      case "price-asc": out.sort((a, b) => productStats(a).min - productStats(b).min); break;
      case "price-desc": out.sort((a, b) => productStats(b).min - productStats(a).min); break;
      case "name": out.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "savings": out.sort((a, b) => productStats(b).spread - productStats(a).spread || productStats(b).spreadPct - productStats(a).spreadPct); break;
      default: break;
    }
    return out;
  }

  /* ---------- Rendering ---------- */
  function renderCategories() {
    const base = filtered({ ignoreCategory: true });
    els.categories.innerHTML = DATA.categories.map((c) => {
      const count = c.id === "all" ? base.length : base.filter((p) => p.category === c.id).length;
      const active = state.category === c.id;
      return `<button type="button" class="chip${active ? " is-active" : ""}" role="tab" aria-selected="${active}" data-category="${c.id}">
        ${escapeHtml(c.label)} <span class="chip__count">${count}</span></button>`;
    }).join("");
  }

  function cheapestLabel(stats) {
    const names = stats.cheapestStores.map((id) => storeById[id].name);
    if (names.length === stats.storeCount && stats.storeCount > 1) return "Same price everywhere";
    if (names.length > 2) return `${names[0]} +${names.length - 1} more`;
    return names.join(" & ");
  }

  function cardHtml(p, i) {
    const s = productStats(p);
    const inBasket = SS.Basket && SS.Basket.has(p.id);
    const saveChip = s.spread > 0
      ? `<span class="product-card__save">Save up to ${money(s.spread)}</span>`
      : `<span class="product-card__save">Same price</span>`;
    let storeLine = "";
    if (state.store !== "all") {
      const price = priceAt(p, state.store);
      const isBest = price === s.min;
      storeLine = `<div class="product-card__instore">At ${escapeHtml(storeById[state.store].name)}: <b>${money(price)}</b>${isBest ? " · lowest" : ` · ${money(price - s.min)} more`}</div>`;
    }
    return `
      <article class="card product-card" style="--i:${Math.min(i, 16)}" data-id="${p.id}">
        <button class="product-card__media" type="button" data-action="compare" aria-label="Compare prices for ${escapeHtml(p.name)}">
          ${SSArt.productImage(p)}
          ${saveChip}
          <span class="product-card__cat">${escapeHtml(categoryLabel[p.category])}</span>
        </button>
        <div class="product-card__body">
          <h3 class="product-card__name">${escapeHtml(p.name)}</h3>
          <p class="product-card__meta">${escapeHtml(p.brand)} · ${escapeHtml(p.quantity)}</p>
          <div class="product-card__price-row">
            <div>
              <div class="product-card__from">Lowest price</div>
              <div class="price">${money(s.min)}</div>
              <div class="product-card__store"><span class="dot"></span>${escapeHtml(cheapestLabel(s))}</div>
            </div>
            <div class="product-card__range">${s.storeCount} stores<br>up to ${money(s.max)}</div>
          </div>
          ${storeLine}
          <p class="product-card__updated">Example price · updated ${shortDate(s.latestUpdate)}</p>
        </div>
        <div class="product-card__actions">
          <button class="btn-secondary btn-sm" type="button" data-action="compare">Compare prices</button>
          <button class="btn-primary btn-sm${inBasket ? " is-added" : ""}" type="button" data-action="add">
            <svg class="ico"><use href="#${inBasket ? "i-check" : "i-plus"}"/></svg>${inBasket ? "In basket" : "Add to basket"}
          </button>
        </div>
      </article>`;
  }

  function render() {
    renderCategories();
    const list = sorted(filtered());
    els.grid.innerHTML = list.map(cardHtml).join("");
    els.empty.hidden = list.length > 0;
    const storeTxt = state.store !== "all" ? ` at ${storeById[state.store].name}` : "";
    const searchTxt = state.search ? ` for “${escapeHtml(state.search)}”` : "";
    els.count.innerHTML = `${list.length} ${list.length === 1 ? "product" : "products"}${searchTxt}${storeTxt}`;
    els.clear.disabled = isDefault();
    els.clear.style.opacity = isDefault() ? 0.55 : 1;
    storage.set("catalogPrefs", { category: state.category, store: state.store, sort: state.sort });
  }

  const isDefault = () => Object.keys(DEFAULTS).every((k) => state[k] === DEFAULTS[k]);

  function syncControls() {
    els.search.value = state.search;
    els.store.value = state.store;
    els.sort.value = state.sort;
  }

  /* ---------- Compare modal ---------- */
  function openCompare(productId) {
    const p = SS.productById[productId];
    if (!p) return;
    const s = productStats(p);
    const maxStore = s.sorted[s.sorted.length - 1];
    const missing = DATA.stores.filter((st) => priceAt(p, st.id) === null);

    const rows = s.sorted.map((entry) => {
      const store = storeById[entry.storeId];
      const isBest = entry.price === s.min;
      const diff = entry.price - s.min;
      const width = s.max > 0 ? Math.max(8, (entry.price / s.max) * 100) : 100;
      const up = unitPrice(p, entry.price);
      return `
        <li class="cmp-row${isBest ? " is-best" : ""}">
          <span class="store-badge${isBest ? " store-badge--best" : ""}">${store.initials}</span>
          <div class="cmp-row__store">${escapeHtml(store.name)}
            ${isBest ? `<span class="badge-cheapest"><svg class="ico" style="width:12px;height:12px"><use href="#i-check"/></svg>Best Price</span>` : ""}
            <span class="cmp-row__updated">Updated ${shortDate(entry.updatedAt)}</span>
          </div>
          <div class="cmp-row__bar" aria-hidden="true"><span style="width:${width}%"></span></div>
          <div class="cmp-row__price">
            <b>${money(entry.price)}</b>
            <small>${up ? escapeHtml(up) : ""}${diff > 0 ? ` · <span class="cmp-row__diff">+${money(diff)}</span>` : ""}</small>
          </div>
        </li>`;
    }).join("") + missing.map((st) => `
        <li class="cmp-row is-missing">
          <span class="store-badge">${st.initials}</span>
          <div class="cmp-row__store">${escapeHtml(st.name)}<span class="cmp-row__updated">Not listed at this store</span></div>
          <div></div>
          <div class="cmp-row__price"><b>—</b></div>
        </li>`).join("");

    const reports = SS.Community ? SS.Community.reportsForProduct(p.id) : [];
    const reportsHtml = reports.length
      ? `<p class="cmp-section-title">Community reports · unverified</p>
         <ul class="cmp-reports">${reports.slice(0, 4).map((r) => `
           <li><span>${escapeHtml(storeById[r.storeId] ? storeById[r.storeId].name : r.storeId)} · <b>${money(r.price)}</b> on ${shortDate(r.observedAt)}</span>
           <span class="status-pill ${SS.Community.statusClass(r.status)}">${SS.Community.statusLabel(r.status)}</span></li>`).join("")}
         </ul>`
      : "";

    $("#compare-body").innerHTML = `
      <div class="cmp-head">
        <div class="cmp-head__img">${SSArt.productArt(p)}</div>
        <div>
          <p class="eyebrow" style="margin-bottom:4px">${escapeHtml(categoryLabel[p.category])}</p>
          <h2 id="cmp-title">${escapeHtml(p.name)}</h2>
          <p>${escapeHtml(p.brand)} · ${escapeHtml(p.quantity)} · Example prices, last updated ${longDate(s.latestUpdate)}</p>
        </div>
      </div>
      <div class="cmp-stats">
        <div class="cmp-stat cmp-stat--best">
          <div class="cmp-stat__label">Best price</div>
          <div class="cmp-stat__value">${money(s.min)}</div>
          <div class="cmp-stat__sub">${escapeHtml(cheapestLabel(s))}</div>
        </div>
        <div class="cmp-stat">
          <div class="cmp-stat__label">Highest price</div>
          <div class="cmp-stat__value">${money(s.max)}</div>
          <div class="cmp-stat__sub">${s.spread > 0 ? escapeHtml(storeById[maxStore.storeId].name) : "All stores equal"}</div>
        </div>
        <div class="cmp-stat">
          <div class="cmp-stat__label">Difference</div>
          <div class="cmp-stat__value">${money(s.spread)}</div>
          <div class="cmp-stat__sub">${s.spread > 0 ? pct(s.spreadPct) + " less at the cheapest store" : "No saving available"}</div>
        </div>
      </div>
      <ul class="cmp-list">${rows}</ul>
      ${reportsHtml}
      <div class="cmp-foot">
        <p class="muted">Example prices for demonstration only. Check in store before you buy.</p>
        <div class="row-gap">
          <button class="btn-ghost btn-sm" type="button" data-report="${p.id}">Report a price</button>
          <button class="btn-primary btn-sm" type="button" data-add="${p.id}"><svg class="ico"><use href="#i-plus"/></svg>Add to basket</button>
        </div>
      </div>`;
    openModal("compare-modal");
  }

  /* ---------- Public API ---------- */
  function setSearch(q) { state.search = q.trim(); syncControls(); render(); }
  function setStore(id) { state.store = id; syncControls(); render(); }
  function clearFilters() { Object.assign(state, DEFAULTS); syncControls(); render(); }
  function refreshButtons() {
    els.grid.querySelectorAll(".product-card").forEach((card) => {
      const btn = card.querySelector('[data-action="add"]');
      const inBasket = SS.Basket.has(Number(card.dataset.id));
      btn.classList.toggle("is-added", inBasket);
      btn.innerHTML = `<svg class="ico"><use href="#${inBasket ? "i-check" : "i-plus"}"/></svg>${inBasket ? "In basket" : "Add to basket"}`;
    });
  }

  function init() {
    els.grid = $("#product-grid");
    els.empty = $("#catalog-empty");
    els.count = $("#catalog-count");
    els.search = $("#catalog-search");
    els.store = $("#catalog-store");
    els.sort = $("#catalog-sort");
    els.clear = $("#catalog-clear");
    els.categories = $("#catalog-categories");

    els.store.innerHTML = `<option value="all">All stores</option>` +
      DATA.stores.map((s) => `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join("");
    if (!storeById[state.store]) state.store = "all";
    if (!DATA.categories.some((c) => c.id === state.category)) state.category = "all";
    syncControls();

    els.search.addEventListener("input", debounce(() => { state.search = els.search.value.trim(); render(); }, 120));
    els.store.addEventListener("change", () => { state.store = els.store.value; render(); });
    els.sort.addEventListener("change", () => { state.sort = els.sort.value; render(); });
    els.clear.addEventListener("click", clearFilters);
    document.addEventListener("click", (e) => {
      if (e.target.closest('[data-action="clear-filters"]')) clearFilters();
    });
    els.categories.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-category]");
      if (!chip) return;
      state.category = chip.dataset.category;
      render();
    });

    els.grid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const id = Number(btn.closest(".product-card").dataset.id);
      if (btn.dataset.action === "compare") openCompare(id);
      if (btn.dataset.action === "add") SS.Basket.add(id);
    });

    $("#compare-body").addEventListener("click", (e) => {
      const add = e.target.closest("[data-add]");
      if (add) { SS.Basket.add(Number(add.dataset.add)); SS.closeModal("compare-modal"); }
      const rep = e.target.closest("[data-report]");
      if (rep) { SS.closeModal("compare-modal"); SS.Community.prefill(Number(rep.dataset.report)); }
    });

    SS.on("basket:change", refreshButtons);
    render();
  }

  SS.Catalog = { init, setSearch, setStore, clearFilters, openCompare, render };
})();
