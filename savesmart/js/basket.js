/* ==========================================================================
   SaveSmart — shopping basket & store optimizer
   Totals are computed per store. A store missing any basket item is marked
   "incomplete" and is never ranked as cheapest — missing prices are never
   treated as zero.
   ========================================================================== */
(function () {
  "use strict";
  const { DATA, $, escapeHtml, money, round2, pct, storeById, productById, priceAt, productStats, storage, toast, emit, on } = SS;

  /** Example basket used by "Load example basket" and the hero statistic. */
  const SAMPLE_BASKET = [
    { id: 1, qty: 2 }, { id: 3, qty: 1 }, { id: 4, qty: 2 }, { id: 5, qty: 2 },
    { id: 7, qty: 1 }, { id: 11, qty: 1 }, { id: 17, qty: 1 }, { id: 20, qty: 1 }
  ];

  let items = sanitize(storage.get("basket", []));
  let chart = null;
  const els = {};

  function sanitize(list) {
    if (!Array.isArray(list)) return [];
    return list
      .filter((i) => i && productById[i.id] && Number.isInteger(i.qty) && i.qty > 0)
      .map((i) => ({ id: i.id, qty: Math.min(i.qty, 99) }));
  }

  const save = () => storage.set("basket", items);
  const count = () => items.reduce((n, i) => n + i.qty, 0);
  const has = (id) => items.some((i) => i.id === id);

  /* ---------- Calculation (pure) ---------- */
  function compute(list) {
    const lines = list.map((i) => ({ ...i, product: productById[i.id] }));
    const stores = DATA.stores.map((store) => {
      let total = 0;
      const missing = [];
      lines.forEach((l) => {
        const price = priceAt(l.product, store.id);
        if (price === null) missing.push(l.product);
        else total += price * l.qty;
      });
      return { store, total: round2(total), missing, complete: missing.length === 0, available: lines.length - missing.length };
    });

    const complete = stores.filter((s) => s.complete).sort((a, b) => a.total - b.total);
    const incomplete = stores.filter((s) => !s.complete).sort((a, b) => a.missing.length - b.missing.length || a.total - b.total);
    const cheapest = complete[0] || null;
    const priciest = complete[complete.length - 1] || null;

    // Smart split: buy every item at its own cheapest store.
    const split = {};
    let splitTotal = 0;
    lines.forEach((l) => {
      const st = productStats(l.product);
      const storeId = st.cheapestStores[0];
      splitTotal += st.min * l.qty;
      (split[storeId] = split[storeId] || []).push(l.product.name);
    });

    return {
      lines,
      ranked: [...complete, ...incomplete],
      complete,
      cheapest,
      priciest,
      savings: cheapest && priciest ? round2(priciest.total - cheapest.total) : 0,
      savingsPct: cheapest && priciest && priciest.total > 0 ? ((priciest.total - cheapest.total) / priciest.total) * 100 : 0,
      splitTotal: round2(splitTotal),
      split
    };
  }

  /* ---------- Mutations ---------- */
  function add(id, qty = 1) {
    const p = productById[id];
    if (!p) return;
    const existing = items.find((i) => i.id === id);
    if (existing) existing.qty = Math.min(existing.qty + qty, 99);
    else items.push({ id, qty });
    commit();
    bumpCounter();
    toast(`<b>${escapeHtml(p.name)}</b> added to basket`, {
      action: { label: "View", onClick: () => document.getElementById("basket").scrollIntoView({ behavior: "smooth" }) }
    });
  }

  function setQty(id, qty) {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (qty <= 0) return remove(id);
    item.qty = Math.min(qty, 99);
    commit();
    bumpCounter();
  }

  function remove(id) {
    const index = items.findIndex((i) => i.id === id);
    if (index < 0) return;
    const removed = items[index];
    const row = els.list.querySelector(`[data-id="${id}"]`);
    const finish = () => {
      items = items.filter((i) => i.id !== id);
      commit();
      bumpCounter();
      toast(`Removed <b>${escapeHtml(productById[id].name)}</b>`, {
        type: "info",
        action: { label: "Undo", onClick: () => { items.splice(Math.min(index, items.length), 0, removed); commit(); bumpCounter(); } }
      });
    };
    if (row) { row.classList.add("is-leaving"); setTimeout(finish, 240); }
    else finish();
  }

  function clear() {
    const previous = items;
    items = [];
    commit();
    bumpCounter();
    toast("Basket cleared", { type: "info", action: { label: "Undo", onClick: () => { items = previous; commit(); bumpCounter(); } } });
  }

  function loadSample() {
    items = SAMPLE_BASKET.map((i) => ({ ...i }));
    commit();
    bumpCounter();
    toast("Example basket loaded");
  }

  function commit() {
    save();
    render();
    emit("basket:change", items);
  }

  function bumpCounter() {
    const el = $("#basket-count");
    el.textContent = count();
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  }

  /* ---------- Rendering ---------- */
  function renderList(result) {
    els.list.innerHTML = result.lines.map((l) => {
      const s = productStats(l.product);
      const cheapestName = storeById[s.cheapestStores[0]].name;
      return `
        <li class="basket-item" data-id="${l.id}">
          <div class="basket-item__img">${SSArt.productArt(l.product)}</div>
          <div style="min-width:0">
            <div class="basket-item__name">${escapeHtml(l.product.name)}</div>
            <div class="basket-item__meta">${escapeHtml(l.product.quantity)} · lowest at ${escapeHtml(cheapestName)}</div>
          </div>
          <div class="basket-item__right">
            <div class="stepper" role="group" aria-label="Quantity for ${escapeHtml(l.product.name)}">
              <button type="button" data-step="-1" aria-label="Decrease quantity"><svg class="ico"><use href="#i-minus"/></svg></button>
              <span aria-live="polite">${l.qty}</span>
              <button type="button" data-step="1" aria-label="Increase quantity"><svg class="ico"><use href="#i-plus"/></svg></button>
            </div>
            <div class="basket-item__line">${money(s.min * l.qty)}<small>from</small></div>
            <button class="basket-remove" type="button" data-remove aria-label="Remove ${escapeHtml(l.product.name)}"><svg class="ico"><use href="#i-trash"/></svg></button>
          </div>
        </li>`;
    }).join("");
  }

  function renderOptimizer(r) {
    const n = count();
    if (!n) {
      els.optimizer.innerHTML = `<p class="muted">Add at least one product to compare basket totals across stores.</p>`;
      destroyChart();
      return;
    }

    const noComplete = !r.cheapest;
    const warning = noComplete
      ? `<div class="opt-warning"><svg class="ico"><use href="#i-info"/></svg><span>No single store lists every item in this basket. Totals for incomplete stores leave out the missing items, so they aren't ranked. The split option below covers everything.</span></div>`
      : (r.ranked.some((s) => !s.complete)
        ? `<div class="opt-warning"><svg class="ico"><use href="#i-info"/></svg><span>Some stores don't list every item. Those stores are shown separately and aren't ranked against complete totals.</span></div>`
        : "");

    const best = r.cheapest;
    const summary = `
      <div class="opt-summary">
        <div class="opt-stat opt-stat--hero">
          <div class="opt-stat__label">Cheapest store for the whole basket</div>
          <div class="opt-stat__value">${best ? money(best.total) : "—"}</div>
          <div class="opt-stat__sub">${best ? escapeHtml(best.store.name) : "No store has every item"}</div>
        </div>
        <div class="opt-stat opt-stat--save">
          <div class="opt-stat__label">Potential saving</div>
          <div class="opt-stat__value">${best ? money(r.savings) : "—"}</div>
          <div class="opt-stat__sub">${best && r.complete.length > 1 ? `vs. ${escapeHtml(r.priciest.store.name)} (${pct(r.savingsPct)})` : "Needs 2+ complete stores"}</div>
        </div>
        <div class="opt-stat">
          <div class="opt-stat__label">Most expensive</div>
          <div class="opt-stat__value">${r.priciest ? money(r.priciest.total) : "—"}</div>
          <div class="opt-stat__sub">${r.priciest ? escapeHtml(r.priciest.store.name) : "—"}</div>
        </div>
      </div>`;

    const rows = r.ranked.map((s, idx) => {
      const isBest = best && s === best;
      const diff = best && s.complete ? s.total - best.total : null;
      const rank = s.complete ? r.complete.indexOf(s) + 1 : null;
      return `
        <tr class="${isBest ? "is-best" : ""}${s.complete ? "" : " is-incomplete"}">
          <td>
            <div class="opt-store">
              <span class="store-badge${isBest ? " store-badge--best" : ""}">${s.store.initials}</span>
              <div>${escapeHtml(s.store.name)}
                <small>${s.complete ? `#${rank} · all ${r.lines.length} items` : `<span class="opt-missing">Missing ${s.missing.length}: ${escapeHtml(s.missing.map((m) => m.name).join(", "))}</span>`}</small>
              </div>
            </div>
          </td>
          <td>
            ${isBest ? `<span class="badge-cheapest">Cheapest</span>` : s.complete ? `<span class="opt-diff">+${money(diff)}</span>` : `<span class="opt-diff">Not comparable</span>`}
          </td>
          <td><span class="opt-total">${money(s.total)}</span>${s.complete ? "" : `<br><span class="opt-diff">for ${s.available} of ${r.lines.length} items</span>`}</td>
        </tr>`;
    }).join("");

    const splitStores = Object.keys(r.split);
    const splitSaving = best ? round2(best.total - r.splitTotal) : null;
    const splitHtml = `
      <div class="opt-split">
        <div>
          <strong>Smart split: ${money(r.splitTotal)}</strong>
          <div class="muted small">Buy each item where it's cheapest, across ${splitStores.length} ${splitStores.length === 1 ? "store" : "stores"}: ${splitStores.map((id) => escapeHtml(storeById[id].name)).join(", ")}</div>
        </div>
        ${splitSaving !== null ? `<span class="status-pill${splitSaving > 0 ? "" : " status-pill--neutral"}">${splitSaving > 0 ? `${money(splitSaving)} less than one store` : "Same as best store"}</span>` : ""}
      </div>`;

    els.optimizer.innerHTML = `
      ${warning}
      ${summary}
      <div class="table-scroll">
        <table class="opt-table">
          <thead><tr><th>Store</th><th>Difference</th><th>Basket total</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      ${splitHtml}
      <div class="opt-chart"><canvas id="basket-chart" aria-label="Basket total by store chart"></canvas></div>
      <div class="opt-actions">
        <button class="btn-secondary btn-sm" type="button" id="basket-log" ${best ? "" : "disabled"}>
          <svg class="ico"><use href="#i-chart"/></svg>Log ${best ? money(best.total) + " at " + escapeHtml(best.store.name) : "total"} as expense
        </button>
        <button class="btn-ghost btn-sm" type="button" id="basket-view-store" ${best ? "" : "disabled"}>Show ${best ? escapeHtml(best.store.name) : "store"} on map</button>
      </div>`;

    renderChart(r);

    const logBtn = $("#basket-log");
    if (logBtn && best) logBtn.addEventListener("click", () => {
      SS.Budget.addExpense({ amount: best.total, storeId: best.store.id, date: SS.today(), note: `Basket of ${n} items (planned)` });
      toast(`Logged ${money(best.total)} in your budget`);
    });
    const mapBtn = $("#basket-view-store");
    if (mapBtn && best) mapBtn.addEventListener("click", () => SS.StoreMap.focusStore(best.store.id, true));
  }

  function destroyChart() { if (chart) { chart.destroy(); chart = null; } }

  function renderChart(r) {
    destroyChart();
    const canvas = document.getElementById("basket-chart");
    if (!canvas) return;
    if (!SS.chartsAvailable()) {
      canvas.parentElement.innerHTML = `<div class="chart-fallback">Chart unavailable (chart library didn't load). The table above shows the same totals.</div>`;
      return;
    }
    const list = r.ranked;
    const best = r.cheapest;
    chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: list.map((s) => s.store.name + (s.complete ? "" : " *")),
        datasets: [{
          data: list.map((s) => s.total),
          backgroundColor: list.map((s) => (best && s === best ? "#174D35" : s.complete ? "#83A98B" : "#E6E8DF")),
          borderColor: list.map((s) => (s.complete ? "transparent" : "#C9CDBF")),
          borderWidth: list.map((s) => (s.complete ? 0 : 1)),
          borderRadius: 6,
          barThickness: 16
        }]
      },
      options: {
        indexAxis: "y",
        maintainAspectRatio: false,
        animation: { duration: 600 },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#202A23",
            padding: 10,
            callbacks: {
              label: (ctx) => {
                const s = list[ctx.dataIndex];
                return s.complete ? ` ${money(s.total)} — all items` : ` ${money(s.total)} — missing ${s.missing.length} item(s), not comparable`;
              }
            }
          }
        },
        scales: {
          x: { beginAtZero: true, grid: { color: "#EEF0E8" }, border: { display: false }, ticks: { color: "#788278", callback: (v) => "€" + v } },
          y: { grid: { display: false }, border: { display: false }, ticks: { color: "#202A23", font: { weight: 600 } } }
        }
      }
    });
  }

  function render() {
    const r = compute(items);
    const n = count();
    els.empty.hidden = n > 0;
    els.clearBtn.hidden = n === 0;
    els.summaryCount.textContent = n ? `· ${n} ${n === 1 ? "item" : "items"}` : "";
    renderList(r);
    renderOptimizer(r);
  }

  function init() {
    els.list = $("#basket-list");
    els.empty = $("#basket-empty");
    els.optimizer = $("#optimizer-body");
    els.clearBtn = $("#basket-clear");
    els.summaryCount = $("#basket-summary-count");

    $("#basket-count").textContent = count();
    els.list.addEventListener("click", (e) => {
      const row = e.target.closest(".basket-item");
      if (!row) return;
      const id = Number(row.dataset.id);
      const step = e.target.closest("[data-step]");
      if (step) {
        const item = items.find((i) => i.id === id);
        setQty(id, item.qty + Number(step.dataset.step));
      }
      if (e.target.closest("[data-remove]")) remove(id);
    });
    els.clearBtn.addEventListener("click", clear);
    $("#basket-sample").addEventListener("click", loadSample);
    on("data:reset", () => { items = []; save(); render(); $("#basket-count").textContent = 0; emit("basket:change", items); });
    render();
  }

  SS.Basket = { init, add, remove, setQty, has, count, compute, SAMPLE_BASKET, getItems: () => items.map((i) => ({ ...i })) };
})();
