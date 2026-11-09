/* ==========================================================================
   SaveSmart — store map (Leaflet + OpenStreetMap)
   Store coordinates are not verified yet, so every store without a verified
   location is drawn at a clearly labelled placeholder position arranged in
   a ring around the city centre. Set `location.verified = true` with real
   lat/lng in data.js and the marker moves to the real spot automatically.
   ========================================================================== */
(function () {
  "use strict";
  const { DATA, $, escapeHtml, pct, shortDate, productStats, priceAt, storage } = SS;

  const els = {};
  let map = null;
  const markers = {};
  let activeId = null;
  let city = DATA.cities.find((c) => c.id === storage.get("city", "mitrovica") && c.active) || DATA.cities[0];

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

  /** Real coordinates when verified, otherwise an evenly spaced placeholder ring. */
  function positionFor(store, index, total) {
    if (store.location && store.location.verified && store.location.lat != null) {
      return { lat: store.location.lat, lng: store.location.lng, placeholder: false };
    }
    const [clat, clng] = city.center;
    const r = 0.0068; // ~750 m
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    return {
      lat: clat + r * Math.sin(angle),
      lng: clng + (r * Math.cos(angle)) / Math.cos((clat * Math.PI) / 180),
      placeholder: true
    };
  }

  function popupHtml(store, stats, placeholder) {
    return `
      <div class="popup">
        <h4>${escapeHtml(store.name)}</h4>
        ${placeholder ? `<span class="status-pill status-pill--warning">Placeholder location</span>` : `<span class="status-pill">Verified location</span>`}
        <p><b>Address:</b> ${store.address ? escapeHtml(store.address) : "Not verified yet"}</p>
        <p><b>${stats.listed}</b> of ${DATA.products.length} products listed · cheapest on <b>${stats.cheapest}</b></p>
        <p>On average ${stats.avgPremium < 0.5 ? "at the lowest price" : `<b>${pct(stats.avgPremium, 1)}</b> above the lowest price`}</p>
        <p class="muted" style="font-size:0.78rem">Example prices · updated ${shortDate(stats.latest)}</p>
        <button class="btn-primary" type="button" data-view-store="${store.id}">View products from this store</button>
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
          <div class="store-item__meta">${store.location.verified ? escapeHtml(store.address || "Address pending") : "Location not verified"} · cheapest on ${stats.cheapest}</div>
        </div>
        <div class="store-item__index${stats.avgPremium === minPremium ? " is-low" : ""}">
          <b>${stats.avgPremium < 0.5 ? "Lowest" : "+" + pct(stats.avgPremium, 1)}</b>
          <span class="muted">vs. lowest</span>
        </div>
      </li>`).join("");
  }

  /* ---------- Map ---------- */
  function buildMap() {
    if (typeof window.L === "undefined") {
      els.map.innerHTML = "";
      els.map.style.minHeight = "200px";
      els.fallback.hidden = false;
      els.fallback.textContent = "The map library couldn't load. Use the store list to browse stores.";
      return;
    }
    map = L.map(els.map, { scrollWheelZoom: false, zoomControl: true, attributionControl: true }).setView(city.center, 14);
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');

    let loaded = 0, failed = 0;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    })
      .on("tileload", () => { loaded++; els.fallback.hidden = true; })
      .on("tileerror", () => {
        failed++;
        if (!loaded && failed >= 4) {
          els.fallback.hidden = false;
          els.fallback.textContent = "Map tiles couldn't load here (offline or blocked). Store markers are still shown at their placeholder positions.";
        }
      })
      .addTo(map);

    // Placeholder ring + centre label so the layout reads as schematic.
    L.circle(city.center, { radius: 750, color: "#83A98B", weight: 1.5, dashArray: "6 6", fill: true, fillColor: "#DCE9DC", fillOpacity: 0.18, interactive: false }).addTo(map);
    L.marker(city.center, {
      interactive: false,
      icon: L.divIcon({ className: "", html: `<span class="map-center-label" style="display:inline-block;transform:translate(-50%,-50%)">${escapeHtml(city.name)} centre</span>`, iconSize: null })
    }).addTo(map);

    const stores = DATA.stores.filter((s) => s.cityId === city.id);
    stores.forEach((store, i) => {
      const pos = positionFor(store, i, stores.length);
      const stats = storeStats(store.id);
      const marker = L.marker([pos.lat, pos.lng], {
        title: store.name + (pos.placeholder ? " (placeholder location)" : ""),
        icon: L.divIcon({
          className: "store-marker",
          html: `<div class="store-marker__pin"><span>${store.initials}</span></div>`,
          iconSize: [38, 38],
          iconAnchor: [19, 46],
          popupAnchor: [0, -42]
        })
      }).addTo(map);
      marker.bindPopup(popupHtml(store, stats, pos.placeholder), { maxWidth: 260, minWidth: 220 });
      marker.on("popupopen", () => setActive(store.id));
      markers[store.id] = marker;
    });

    // Fix sizing if the map container changes (e.g. resize, layout shift).
    if ("ResizeObserver" in window) new ResizeObserver(() => map.invalidateSize()).observe(els.map);
  }

  function setActive(id) {
    activeId = id;
    Object.entries(markers).forEach(([sid, m]) => {
      const el = m.getElement();
      if (el) el.classList.toggle("is-active", sid === id);
    });
    els.list.querySelectorAll(".store-item").forEach((li) => li.classList.toggle("is-active", li.dataset.store === id));
  }

  function focusStore(id, scroll) {
    if (scroll) document.getElementById("stores").scrollIntoView({ behavior: "smooth" });
    setActive(id);
    const m = markers[id];
    if (m && map) {
      setTimeout(() => { map.flyTo(m.getLatLng(), 15, { duration: 0.6 }); m.openPopup(); }, scroll ? 450 : 0);
    }
  }

  function viewStoreProducts(id) {
    SS.Catalog.setStore(id);
    document.getElementById("compare").scrollIntoView({ behavior: "smooth" });
  }

  function init() {
    els.map = $("#map");
    els.list = $("#store-list");
    els.fallback = $("#map-fallback");
    const citySelect = $("#city-select");
    citySelect.innerHTML = DATA.cities.map((c) =>
      `<option value="${c.id}" ${c.active ? "" : "disabled"} ${c.id === city.id ? "selected" : ""}>${escapeHtml(c.name)}${c.active ? "" : " (coming soon)"}</option>`).join("");
    citySelect.addEventListener("change", () => {
      const next = DATA.cities.find((c) => c.id === citySelect.value);
      if (next && next.active) { city = next; storage.set("city", city.id); }
    });

    renderList();
    buildMap();

    els.list.addEventListener("click", (e) => {
      const li = e.target.closest(".store-item");
      if (li) focusStore(li.dataset.store, window.innerWidth <= 1024);
    });
    els.list.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target.matches(".store-item")) { e.preventDefault(); focusStore(e.target.dataset.store, false); }
    });
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-view-store]");
      if (btn) viewStoreProducts(btn.dataset.viewStore);
    });
  }

  SS.StoreMap = { init, focusStore, storeStats };
})();
