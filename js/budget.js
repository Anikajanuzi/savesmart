/* ==========================================================================
   SaveSmart — monthly budget tracker
   Shows the current calendar month. Projection = average daily spend so far
   × days in the month.
   ========================================================================== */
(function () {
  "use strict";
  const { DATA, $, escapeHtml, money, round2, pct, storeById, storage, toast, on, setFieldError, MONTHS, MONTHS_LONG, parseISODate, toISODate, today } = SS;

  const DEFAULT_BUDGET = 250;
  const els = {};
  let charts = { cumulative: null, stores: null };

  let budget = Number(storage.get("budget", DEFAULT_BUDGET)) || DEFAULT_BUDGET;
  let expenses = storage.get("expenses", null);
  if (!Array.isArray(expenses)) {
    expenses = demoExpenses();
    storage.set("expenses", expenses);
  }

  /** Example expenses placed in the current month, up to today. */
  function demoExpenses() {
    const now = new Date();
    const seed = [
      { day: 1, amount: 38.4, storeId: "bamex", note: "Weekly shop" },
      { day: 3, amount: 6.85, storeId: "meridian-express", note: "Bread and milk" },
      { day: 5, amount: 14.2, storeId: "interex", note: "Cleaning supplies" },
      { day: 8, amount: 21.65, storeId: "premium-store", note: "Fruit, coffee, snacks" },
      { day: 12, amount: 33.1, storeId: "bamex", note: "Weekly shop" },
      { day: 16, amount: 9.4, storeId: "durmart", note: "Drinks" },
      { day: 20, amount: 29.75, storeId: "emona-center", note: "Weekly shop" }
    ];
    return seed
      .filter((s) => s.day <= now.getDate())
      .map((s, i) => ({
        id: "demo-" + i,
        date: toISODate(new Date(now.getFullYear(), now.getMonth(), s.day)),
        amount: s.amount,
        storeId: s.storeId,
        note: s.note,
        demo: true
      }));
  }

  const save = () => { storage.set("budget", budget); storage.set("expenses", expenses); };

  /* ---------- Calculation (pure) ---------- */
  function monthInfo(date = new Date()) {
    const y = date.getFullYear(), m = date.getMonth();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    return { y, m, daysInMonth, day: date.getDate(), key: `${y}-${String(m + 1).padStart(2, "0")}` };
  }

  function compute() {
    const mi = monthInfo();
    const monthExpenses = expenses
      .filter((e) => e.date.slice(0, 7) === mi.key)
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    const spent = round2(monthExpenses.reduce((s, e) => s + e.amount, 0));
    const remaining = round2(budget - spent);
    const usedPct = budget > 0 ? (spent / budget) * 100 : 0;
    const dailyAvg = mi.day > 0 ? spent / mi.day : 0;
    const projected = round2(dailyAvg * mi.daysInMonth);
    const pacePct = (mi.day / mi.daysInMonth) * 100;
    const paceAmount = round2((budget * mi.day) / mi.daysInMonth);

    let status = "ok";
    if (usedPct >= 100) status = "over";
    else if (usedPct >= 75 || projected > budget) status = "watch";

    // Daily cumulative series
    const perDay = new Array(mi.daysInMonth).fill(0);
    monthExpenses.forEach((e) => { perDay[parseISODate(e.date).getDate() - 1] += e.amount; });
    const cumulative = [];
    let run = 0;
    for (let d = 0; d < mi.daysInMonth; d++) {
      run += perDay[d];
      cumulative.push(d < mi.day ? round2(run) : null);
    }

    const byStore = {};
    monthExpenses.forEach((e) => { byStore[e.storeId] = round2((byStore[e.storeId] || 0) + e.amount); });

    return { mi, monthExpenses, spent, remaining, usedPct, dailyAvg, projected, pacePct, paceAmount, status, cumulative, byStore };
  }

  /* ---------- Mutations ---------- */
  function addExpense({ amount, storeId, date, note }) {
    const entry = { id: "e" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), date, amount: round2(Number(amount)), storeId, note: (note || "").trim() };
    expenses.push(entry);
    save();
    render(entry.id);
    return entry;
  }

  function deleteExpense(id) {
    const idx = expenses.findIndex((e) => e.id === id);
    if (idx < 0) return;
    const removed = expenses[idx];
    const row = els.list.querySelector(`[data-id="${id}"]`);
    const finish = () => {
      expenses.splice(expenses.indexOf(removed), 1);
      save();
      render();
      toast(`Deleted ${money(removed.amount)} expense`, {
        type: "info",
        action: { label: "Undo", onClick: () => { expenses.push(removed); save(); render(); } }
      });
    };
    if (row) { row.classList.add("is-leaving"); setTimeout(finish, 230); } else finish();
  }

  /* ---------- Rendering ---------- */
  const storeName = (id) => (storeById[id] ? storeById[id].name : id === "other" ? "Other store" : id);

  function renderKpis(c) {
    const remainingClass = c.remaining < 0 ? "kpi--danger" : c.status === "watch" ? "kpi--warning" : "kpi--positive";
    const projClass = c.projected > budget ? "kpi--warning" : "kpi--positive";
    els.kpis.innerHTML = `
      <div class="kpi">
        <div class="kpi__label">Monthly budget</div>
        <div class="kpi__value">${money(budget)}</div>
        <div class="kpi__sub">${MONTHS_LONG[c.mi.m]} ${c.mi.y}</div>
      </div>
      <div class="kpi">
        <div class="kpi__label">Spent so far</div>
        <div class="kpi__value">${money(c.spent)}</div>
        <div class="kpi__sub">${c.monthExpenses.length} ${c.monthExpenses.length === 1 ? "expense" : "expenses"} · ${money(c.dailyAvg)}/day</div>
      </div>
      <div class="kpi ${remainingClass}">
        <div class="kpi__label">${c.remaining < 0 ? "Over budget by" : "Remaining"}</div>
        <div class="kpi__value">${money(Math.abs(c.remaining))}</div>
        <div class="kpi__sub">${c.mi.daysInMonth - c.mi.day} days left${c.remaining > 0 ? ` · ${money(c.remaining / Math.max(1, c.mi.daysInMonth - c.mi.day))}/day` : ""}</div>
      </div>
      <div class="kpi ${projClass}">
        <div class="kpi__label">Projected month-end</div>
        <div class="kpi__value">${money(c.projected)}</div>
        <div class="kpi__sub">${c.projected > budget ? `${money(c.projected - budget)} over budget at this pace` : `${money(budget - c.projected)} under budget at this pace`}</div>
      </div>`;
  }

  function renderProgress(c) {
    const pctUsed = Math.min(c.usedPct, 100);
    els.pct.textContent = pct(c.usedPct);
    els.bar.setAttribute("aria-valuenow", Math.round(c.usedPct));
    els.bar.classList.toggle("progress--warning", c.status === "watch");
    els.bar.classList.toggle("progress--danger", c.status === "over");
    requestAnimationFrame(() => { els.fill.style.width = pctUsed + "%"; });
    els.pace.style.left = `calc(${c.pacePct}% - 1px)`;
    const label = { ok: "On track", watch: "Watch spending", over: "Over budget" }[c.status];
    els.status.textContent = label;
    els.status.className = "status-pill" + (c.status === "watch" ? " status-pill--warning" : c.status === "over" ? " status-pill--danger" : "");
    const diff = c.spent - c.paceAmount;
    els.paceText.textContent =
      `Day ${c.mi.day} of ${c.mi.daysInMonth}. The line marks an even pace: ${money(c.paceAmount)} by today. ` +
      (Math.abs(diff) < 0.005 ? "You're exactly on pace." : diff > 0 ? `You're ${money(diff)} ahead of it.` : `You're ${money(-diff)} below it.`);
  }

  function renderList(c, highlightId) {
    els.count.textContent = c.monthExpenses.length ? `${c.monthExpenses.length} this month` : "";
    els.empty.hidden = c.monthExpenses.length > 0;
    els.list.innerHTML = c.monthExpenses.map((e) => {
      const d = parseISODate(e.date);
      return `
        <li class="expense" data-id="${e.id}"${e.id === highlightId ? ' style="background:var(--green-light);border-radius:12px"' : ""}>
          <div class="expense__date"><b>${d.getDate()}</b><span>${MONTHS[d.getMonth()]}</span></div>
          <div style="min-width:0">
            <div class="expense__title">${escapeHtml(storeName(e.storeId))}${e.demo ? '<span class="tag-demo">Example</span>' : ""}</div>
            <div class="expense__note">${escapeHtml(e.note || "Groceries")}</div>
          </div>
          <div class="expense__amount">${money(e.amount)}</div>
          <button class="basket-remove" type="button" data-delete aria-label="Delete expense of ${money(e.amount)}"><svg class="ico"><use href="#i-trash"/></svg></button>
        </li>`;
    }).join("");
    if (highlightId) setTimeout(() => {
      const row = els.list.querySelector(`[data-id="${highlightId}"]`);
      if (row) { row.style.transition = "background 1.2s ease"; row.style.background = "transparent"; }
    }, 900);
  }

  function renderCharts(c) {
    if (!SS.chartsAvailable()) {
      ["chart-cumulative", "chart-stores"].forEach((id) => {
        const cv = document.getElementById(id);
        if (cv) cv.parentElement.innerHTML = `<div class="chart-fallback">Chart unavailable (chart library didn't load). Figures above are still accurate.</div>`;
      });
      return;
    }
    const labels = Array.from({ length: c.mi.daysInMonth }, (_, i) => String(i + 1));
    const projection = labels.map((_, i) => (i === c.mi.day - 1 ? c.cumulative[i] : i >= c.mi.day ? round2(c.dailyAvg * (i + 1)) : null));
    const budgetLine = labels.map(() => budget);
    const warn = c.projected > budget;

    const cumData = {
      labels,
      datasets: [
        { label: "Spent", data: c.cumulative, borderColor: "#174D35", backgroundColor: "rgba(131,169,139,0.22)", fill: true, tension: 0.25, pointRadius: 0, pointHoverRadius: 5, borderWidth: 2.5, spanGaps: false },
        { label: "Projected", data: projection, borderColor: warn ? "#C28A36" : "#83A98B", borderDash: [6, 5], pointRadius: 0, pointHoverRadius: 4, borderWidth: 2, fill: false, tension: 0 },
        { label: "Budget", data: budgetLine, borderColor: "#B84C4C", borderWidth: 1.5, borderDash: [2, 4], pointRadius: 0, pointHoverRadius: 0, fill: false }
      ]
    };
    const cumOptions = {
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      animation: { duration: 700 },
      plugins: {
        legend: { position: "bottom", labels: { usePointStyle: true, pointStyle: "line", boxWidth: 24, color: "#788278", font: { size: 12 } } },
        tooltip: {
          backgroundColor: "#202A23", padding: 10,
          filter: (item) => item.raw !== null && !(item.datasetIndex === 1 && item.dataIndex === c.mi.day - 1),
          callbacks: { title: (items) => `${MONTHS[c.mi.m]} ${items[0].label}`, label: (ctx) => ` ${ctx.dataset.label}: ${money(ctx.raw)}` }
        }
      },
      scales: {
        x: { grid: { display: false }, border: { color: "#E6E8DF" }, ticks: { color: "#788278", maxRotation: 0, autoSkip: true, maxTicksLimit: 10 } },
        y: { beginAtZero: true, suggestedMax: Math.max(budget, c.projected) * 1.08, grid: { color: "#EEF0E8" }, border: { display: false }, ticks: { color: "#788278", callback: (v) => "€" + v } }
      }
    };

    const storeIds = Object.keys(c.byStore).sort((a, b) => c.byStore[b] - c.byStore[a]);
    const storeData = {
      labels: storeIds.map(storeName),
      datasets: [{ data: storeIds.map((id) => c.byStore[id]), backgroundColor: storeIds.map((_, i) => (i === 0 ? "#174D35" : "#83A98B")), borderRadius: 6, barThickness: 14 }]
    };
    const storeOptions = {
      indexAxis: "y",
      maintainAspectRatio: false,
      animation: { duration: 700 },
      plugins: { legend: { display: false }, tooltip: { backgroundColor: "#202A23", padding: 10, callbacks: { label: (ctx) => ` ${money(ctx.raw)} (${pct((ctx.raw / (c.spent || 1)) * 100)})` } } },
      scales: {
        x: { beginAtZero: true, grid: { color: "#EEF0E8" }, border: { display: false }, ticks: { color: "#788278", callback: (v) => "€" + v } },
        y: { grid: { display: false }, border: { display: false }, ticks: { color: "#202A23", font: { weight: 600 } } }
      }
    };

    if (charts.cumulative) { charts.cumulative.data = cumData; charts.cumulative.options = cumOptions; charts.cumulative.update(); }
    else charts.cumulative = new Chart(document.getElementById("chart-cumulative"), { type: "line", data: cumData, options: cumOptions });

    const storeCanvas = document.getElementById("chart-stores");
    if (!storeIds.length) {
      if (charts.stores) { charts.stores.destroy(); charts.stores = null; }
      storeCanvas.hidden = true;
      let ph = storeCanvas.parentElement.querySelector(".chart-fallback");
      if (!ph) { ph = document.createElement("div"); ph.className = "chart-fallback"; storeCanvas.parentElement.appendChild(ph); }
      ph.textContent = "No spending yet this month.";
      return;
    }
    storeCanvas.hidden = false;
    const ph = storeCanvas.parentElement.querySelector(".chart-fallback");
    if (ph) ph.remove();
    if (charts.stores) { charts.stores.data = storeData; charts.stores.options = storeOptions; charts.stores.update(); }
    else charts.stores = new Chart(storeCanvas, { type: "bar", data: storeData, options: storeOptions });
  }

  function render(highlightId) {
    const c = compute();
    els.month.textContent = `${MONTHS_LONG[c.mi.m]} ${c.mi.y}`;
    if (document.activeElement !== els.budgetInput) els.budgetInput.value = budget;
    renderKpis(c);
    renderProgress(c);
    renderList(c, highlightId);
    renderCharts(c);
  }

  /* ---------- Forms ---------- */
  function onExpenseSubmit(e) {
    e.preventDefault();
    const amountEl = $("#exp-amount"), dateEl = $("#exp-date"), storeEl = $("#exp-store"), noteEl = $("#exp-note");
    const amount = Number(amountEl.value);
    let ok = true;

    if (amountEl.value.trim() === "") { setFieldError(amountEl, "Enter the amount you spent."); ok = false; }
    else if (!Number.isFinite(amount) || amount <= 0) { setFieldError(amountEl, "Amount must be a positive number."); ok = false; }
    else if (amount > 5000) { setFieldError(amountEl, "That looks too high for one grocery trip. Enter €5,000 or less."); ok = false; }
    else if (Math.abs(amount * 100 - Math.round(amount * 100)) > 1e-6) { setFieldError(amountEl, "Use at most 2 decimal places."); ok = false; }
    else setFieldError(amountEl, "");

    if (!dateEl.value) { setFieldError(dateEl, "Choose the date of the purchase."); ok = false; }
    else if (dateEl.value > today()) { setFieldError(dateEl, "The date can't be in the future."); ok = false; }
    else setFieldError(dateEl, "");

    if (!storeEl.value) { setFieldError(storeEl, "Choose where you shopped."); ok = false; }
    else setFieldError(storeEl, "");

    if (!ok) { const first = e.target.querySelector('[aria-invalid="true"]'); if (first) first.focus(); return; }

    addExpense({ amount, storeId: storeEl.value, date: dateEl.value, note: noteEl.value });
    const inMonth = dateEl.value.slice(0, 7) === monthInfo().key;
    toast(inMonth ? `Added ${money(amount)} at ${escapeHtml(storeName(storeEl.value))}` : `Saved to ${MONTHS_LONG[parseISODate(dateEl.value).getMonth()]}. This view shows the current month.`, { type: inMonth ? "success" : "info" });
    amountEl.value = "";
    noteEl.value = "";
    amountEl.focus();
  }

  function onBudgetSubmit(e) {
    e.preventDefault();
    const val = Number(els.budgetInput.value);
    const err = $("#budget-error");
    let msg = "";
    if (els.budgetInput.value.trim() === "" || !Number.isFinite(val)) msg = "Enter a budget amount.";
    else if (val <= 0) msg = "Budget must be more than €0.";
    else if (val > 100000) msg = "Enter a budget of €100,000 or less.";
    err.textContent = msg;
    err.hidden = !msg;
    els.budgetInput.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg) return;
    budget = round2(val);
    save();
    render();
    toast(`Monthly budget set to ${money(budget)}`);
  }

  function init() {
    els.kpis = $("#budget-kpis");
    els.month = $("#budget-month");
    els.pct = $("#budget-pct");
    els.status = $("#budget-status");
    els.bar = $("#budget-bar");
    els.fill = $("#budget-fill");
    els.pace = $("#budget-pace");
    els.paceText = $("#budget-pace-text");
    els.list = $("#expense-list");
    els.empty = $("#expense-empty");
    els.count = $("#expense-count");
    els.budgetInput = $("#budget-input");

    $("#exp-store").innerHTML = `<option value="">Choose a store</option>` +
      DATA.stores.map((s) => `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join("") +
      `<option value="other">Other store</option>`;
    $("#exp-date").value = today();
    $("#exp-date").max = today();

    $("#expense-form").addEventListener("submit", onExpenseSubmit);
    $("#budget-form").addEventListener("submit", onBudgetSubmit);
    ["exp-amount", "exp-date", "exp-store"].forEach((id) => $("#" + id).addEventListener("input", (ev) => setFieldError(ev.target, "")));
    els.list.addEventListener("click", (e) => {
      const del = e.target.closest("[data-delete]");
      if (del) deleteExpense(del.closest(".expense").dataset.id);
    });

    on("data:reset", () => {
      budget = DEFAULT_BUDGET;
      expenses = demoExpenses();
      save();
      render();
    });
    render();
  }

  SS.Budget = { init, addExpense, deleteExpense, compute };
})();
