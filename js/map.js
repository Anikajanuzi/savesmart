/* ==========================================================================
   SaveSmart — store map (Google Maps)
   Uses a Google Maps embed (no API key needed). The map starts on an
   overview of supermarkets in Mitrovica; choosing a store zooms the map to
   that store and shows its details with links to open it in Google Maps.
   Each store's `placeId` in data.js links to its real Google Maps listing.
   ========================================================================== */
(function () {
  "use strict";
  const { DATA, $, escapeHtml, pct, shortDate, productStats, priceAt } = SS;

  const els = {};
  let activeId = null;
  const city = DATA.cities.find((c) => c.active) || DATA.cities[0];

  /* ---------- Per-store price stats ---------- */
  function storeStats(storeId) {
    let listed = 0, cheapest = 0, premiumSum = 0, latest = "";
    DATA.products.forEach((p) => {
      const price = priceAt(p, storeId);
      if (price === null) return;
      const s = productStats(p);
      listed++;
      if (s.cheapestStores.includes(storeId)) cheapest++;
      premiumSum += s.min > 0 ? (price / s.min - 1) * 100 : 0;
      const entry = p.prices.find((e) => e.storeId === storeId);
      if (entry.updatedAt > latest) latest = entry.updatedAt;
    });
    return { listed, cheapest, avgPremium: listed ? premiumSum / listed : 0, latest };
  }

  /* ---------- Google Maps links ---------- */
  function hasLocation(store) {
    return store.location && store.location.lat != null && store.location.lng != null;
  }

  /** Opens the store's real listing in Google Maps (app on phones). */
  function googleMapsUrl(store) {
    const query = encodeURIComponent(`${store.name}, ${store.address || city.name}`);
    const place = store.placeId ? `&query_place_id=${encodeURIComponent(store.placeId)}` : "";
    return `https://www.google.com/maps/search/?api=1&query=${query}${place}`;
  }

  /** Turn-by-turn directions from the visitor's current location. */
  function directionsUrl(store) {
    const dest = hasLocation(store) ? `${store.location.lat},${store.location.lng}` : encodeURIComponent(`${store.name}, ${city.name}`);
    const place = store.placeId ? `&destination_place_id=${encodeURIComponent(store.placeId)}` : "";
    return `https://www.google.com/maps/dir/?api=1&destination=${dest}${place}`;
  }

  function embedUrl(store) {
    if (!store) {
      const [lat, lng] = city.center;
      return `https://maps.google.com/maps?q=${encodeURIComponent("supermarkets in " + city.name + ", Kosovo")}&ll=${lat},${lng}&z=14&hl=en&output=embed`;
    }
    const q = hasLocation(store) ? `${store.location.lat},${store.location.lng}` : encodeURIComponent(`${store.name}, ${city.name}`);
    return `https://maps.google.com/maps?q=${q}&z=17&hl=en&output=embed`;
  }

  /* ---------- Selected store details ---------- */
  function renderDetails(store) {
    if (!store) {
      els.details.innerHTML = `
        <div class="map-details__empty">
          <svg class="ico"><use href="#i-pin"/></svg>
          <p>Choose a store from the list to see it on the map, get its address and open directions in Google Maps.</p>
        </div>`;
      return;
    }
    const stats = storeStats(store.id);
    els.details.innerHTML = `
      <div class="map-details__head">
        <span class="store-badge">${store.initials}</span>
        <div style="min-width:0">
          <h3 class="map-details__name">${escapeHtml(store.name)}</h3>
          <p class="map-details__meta">${escapeHtml(store.address || city.name)}${store.hours ? " · " + escapeHtml(store.hours) : ""}${store.phone ? ` · <a href="tel:${store.phone.replace(/\s/g, "")}">${escapeHtml(store.phone)}</a>` : ""}</p>
        </div>
        <button class="map-details__close" type="button" data-map-overview aria-label="Show all stores">All stores</button>
      </div>
      <p class="map-details__stats"><b>${stats.listed}</b> of ${DATA.products.length} products listed · cheapest on <b>${stats.cheapest}</b> · ${stats.avgPremium < 0.5 ? "at the lowest price on average" : `on average <b>${pct(stats.avgPremium, 1)}</b> above the lowest price`} <span class="muted">(example prices, ${shortDate(stats.latest)})</span></p>
      <div class="map-details__actions">
        <a class="btn-primary" href="${directionsUrl(store)}" target="_blank" rel="noopener">Get directions</a>
        <a class="btn-secondary" href="${googleMapsUrl(store)}" target="_blank" rel="noopener">Open in Google Maps</a>
        <button class="btn-secondary" type="button" data-view-store="${store.id}">View products</button>
      </div>`;
  }

  /* ---------- Store list ---------- */
  function renderList() {
    const stores = DATA.stores.filter((s) => s.cityId === city.id);
    const statsList = stores.map((s) => ({ store: s, stats: storeStats(s.id) }));
    const minPremium = Math.min(...statsList.map((x) => x.stats.avgPremium));
    els.list.innerHTML = statsList.map(({ store, stats }) => `
      <li class="store-item${store.id === activeId ? " is-active" : ""}" data-store="${store.id}" tabindex="0" role="button" aria-label="Show ${escapeHtml(store.name)} on the map">
        <span class="store-badge">${store.initials}</span>
        <div style="min-width:0">
          <div class="store-item__name">${escapeHtml(store.name)}</div>
          <div class="store-item__meta">${escapeHtml(store.address || city.name)}${store.hours ? " · " + escapeHtml(store.hours) : ""}</div>
          <a class="store-item__link" href="${googleMapsUrl(store)}" target="_blank" rel="noopener">Open in Google Maps ↗</a>
        </div>
        <div class="store-item__index${stats.avgPremium === minPremium ? " is-low" : ""}">
          <b>${stats.avgPremium < 0.5 ? "Lowest" : "+" + pct(stats.avgPremium, 1)}</b>
          <span class="muted">vs. lowest</span>
        </div>
      </li>`).join("");
  }

  /* ---------- Map ---------- */
  function showOnMap(store) {
    els.frame.src = embedUrl(store);
    els.frame.title = store ? `Google Map showing ${store.name}` : `Google Map of supermarkets in ${city.name}`;
    renderDetails(store);
  }

  function setActive(id) {
    activeId = id;
    els.list.querySelectorAll(".store-item").forEach((li) => li.classList.toggle("is-active", li.dataset.store === id));
  }

  function focusStore(id, scroll) {
    if (scroll) document.getElementById("stores").scrollIntoView({ behavior: "smooth" });
    const store = DATA.stores.find((s) => s.id === id);
    if (!store) return;
    setActive(id);
    showOnMap(store);
  }

  function showOverview() {
    setActive(null);
    showOnMap(null);
  }

  function viewStoreProducts(id) {
    SS.Catalog.setStore(id);
    document.getElementById("compare").scrollIntoView({ behavior: "smooth" });
  }

  function init() {
    els.frame = $("#map-frame");
    els.details = $("#map-details");
    els.list = $("#store-list");
    renderList();
    showOverview();

    els.list.addEventListener("click", (e) => {
      if (e.target.closest("a")) return; // let "Open in Google Maps" links work normally
      const li = e.target.closest(".store-item");
      if (li) focusStore(li.dataset.store, window.innerWidth <= 1024);
    });
    els.list.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target.matches(".store-item")) { e.preventDefault(); focusStore(e.target.dataset.store, false); }
    });
    els.details.addEventListener("click", (e) => {
      if (e.target.closest("[data-map-overview]")) showOverview();
    });
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-view-store]");
      if (btn) viewStoreProducts(btn.dataset.viewStore);
    });
  }

  SS.StoreMap = { init, focusStore, storeStats };
})();
