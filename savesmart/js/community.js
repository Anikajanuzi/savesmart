/* ==========================================================================
   SaveSmart — community price reports
   Reports are stored as UNVERIFIED and never overwrite catalog prices.
   In production they would be POSTed to an API and go through moderation
   (e.g. receipt photo, multiple matching reports, or staff check).
   ========================================================================== */
(function () {
  "use strict";
  const { DATA, $, escapeHtml, money, pct, shortDate, timeAgo, today, toISODate, storeById, productById, priceAt, storage, toast, on, setFieldError } = SS;

  const REVIEW_THRESHOLD = 0.15;   // 15% away from listed price -> needs review
  const UNUSUAL_THRESHOLD = 0.5;   // 50% away -> likely typo
  const MAX_AGE_DAYS = 60;

  let submissions = storage.get("submissions", null);
  if (!Array.isArray(submissions)) submissions = DATA.demoSubmissions.map((s) => ({ ...s }));

  const els = {};
  const save = () => storage.set("submissions", submissions);
  const norm = (s) => String(s || "").toLowerCase().replace(/\s+/g, " ").trim();
  const normQty = (s) => norm(s).replace(/\s/g, "").replace(",", ".");

  const findProduct = (name) => DATA.products.find((p) => norm(p.name) === norm(name)) || null;

  const STATUS = {
    pending: { label: "Pending verification", cls: "status-pill--neutral" },
    review: { label: "Needs review", cls: "status-pill--warning" },
    duplicate: { label: "Possible duplicate", cls: "status-pill--danger" }
  };
  const statusLabel = (s) => (STATUS[s] || STATUS.pending).label;
  const statusClass = (s) => (STATUS[s] || STATUS.pending).cls;

  /* ---------- Checks (pure) ---------- */
  function assess(report) {
    const flags = [];
    let status = "pending";
    const product = findProduct(report.productName);

    const duplicate = submissions.some((s) =>
      norm(s.productName) === norm(report.productName) && s.storeId === report.storeId &&
      Math.abs(s.price - report.price) < 0.005 && s.observedAt === report.observedAt);
    if (duplicate) { flags.push("Same price, store and date already reported"); status = "duplicate"; }

    const recent = submissions.some((s) =>
      !s.demo && norm(s.productName) === norm(report.productName) && s.storeId === report.storeId &&
      Date.now() - new Date(s.submittedAt).getTime() < 10 * 60 * 1000);
    if (!duplicate && recent) { flags.push("Repeat report for this product and store within 10 minutes"); status = "review"; }

    if (!product) {
      flags.push("Not in the catalog yet");
    } else {
      if (normQty(product.quantity) !== normQty(report.quantity)) flags.push(`Size differs from catalog (${product.quantity})`);
      const listed = priceAt(product, report.storeId);
      if (listed === null) {
        flags.push(`Not currently listed at ${storeById[report.storeId].name}`);
      } else {
        const diff = (report.price - listed) / listed;
        if (Math.abs(diff) >= REVIEW_THRESHOLD) {
          flags.push(`${pct(Math.abs(diff) * 100)} ${diff > 0 ? "above" : "below"} the current listed price`);
          if (status === "pending") status = "review";
        }
        if (Math.abs(diff) >= UNUSUAL_THRESHOLD) flags.push("Unusually large difference, possible typo");
      }
    }
    return { status, flags, productId: product ? product.id : null };
  }

  /* ---------- Rendering ---------- */
  function render(newId) {
    const list = [...submissions].sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));
    const review = list.filter((s) => s.status !== "pending").length;
    els.stats.innerHTML =
      `<span class="status-pill status-pill--neutral">${list.length} ${list.length === 1 ? "report" : "reports"}</span>` +
      (review ? `<span class="status-pill status-pill--warning">${review} flagged</span>` : "");
    els.feed.innerHTML = list.length ? list.map((s) => {
      const store = storeById[s.storeId];
      return `
        <li class="feed-item"${s.id === newId ? ' style="background:var(--green-light);border-radius:12px;padding-inline:10px"' : ""}>
          <span class="store-badge">${store ? store.initials : "?"}</span>
          <div style="min-width:0">
            <div class="feed-item__title">${escapeHtml(s.productName)}${s.demo ? '<span class="tag-demo">Example</span>' : ""}</div>
            <div class="feed-item__meta">${escapeHtml(s.quantity)} · ${store ? escapeHtml(store.name) : "Unknown store"} · seen ${shortDate(s.observedAt)} · reported ${timeAgo(s.submittedAt)}</div>
            ${s.flags.length ? `<div class="feed-item__flags">${s.flags.map((f) => `<span class="feed-item__flag"><svg class="ico"><use href="#i-flag"/></svg>${escapeHtml(f)}</span>`).join("")}</div>` : ""}
          </div>
          <div class="feed-item__price">
            <b>${money(s.price)}</b>
            <span class="status-pill ${statusClass(s.status)}">${statusLabel(s.status)}</span>
          </div>
        </li>`;
    }).join("") : `<li class="empty-state empty-state--compact"><h3>No reports yet</h3><p class="muted">Be the first to report a price.</p></li>`;
  }

  function updateHint() {
    const product = findProduct(els.product.value);
    const storeId = els.store.value;
    if (!product) {
      els.hint.textContent = els.product.value.trim()
        ? "This product isn't in the catalog yet. Your report will be reviewed before it's added."
        : "Pick a product from the list to compare against its current listed price.";
      return;
    }
    if (!storeId) { els.hint.textContent = `${product.name} (${product.quantity}) is listed at ${product.prices.length} stores. Choose a store to see its listed price.`; return; }
    const listed = priceAt(product, storeId);
    els.hint.innerHTML = listed === null
      ? `${escapeHtml(product.name)} isn't listed at ${escapeHtml(storeById[storeId].name)} yet.`
      : `Current listed price at ${escapeHtml(storeById[storeId].name)}: <b>${money(listed)}</b> (example data).`;
  }

  /* ---------- Submit ---------- */
  function onSubmit(e) {
    e.preventDefault();
    const name = els.product.value.trim();
    const qty = els.qty.value.trim();
    const priceRaw = els.price.value.trim();
    const price = Number(priceRaw);
    const date = els.date.value;
    let ok = true;

    if (name.length < 2) { setFieldError(els.product, "Enter the product name."); ok = false; } else setFieldError(els.product, "");
    if (!els.store.value) { setFieldError(els.store, "Choose the store."); ok = false; } else setFieldError(els.store, "");

    if (!priceRaw) { setFieldError(els.price, "Enter the price you saw."); ok = false; }
    else if (!Number.isFinite(price) || price <= 0) { setFieldError(els.price, "Price must be a positive number."); ok = false; }
    else if (price > 1000) { setFieldError(els.price, "Enter a price of €1,000 or less."); ok = false; }
    else if (Math.abs(price * 100 - Math.round(price * 100)) > 1e-6) { setFieldError(els.price, "Use at most 2 decimal places."); ok = false; }
    else setFieldError(els.price, "");

    if (!qty) { setFieldError(els.qty, "Enter the size, e.g. 1 L or 500 g."); ok = false; } else setFieldError(els.qty, "");

    const minDate = new Date(); minDate.setDate(minDate.getDate() - MAX_AGE_DAYS);
    if (!date) { setFieldError(els.date, "Choose when you saw this price."); ok = false; }
    else if (date > today()) { setFieldError(els.date, "The date can't be in the future."); ok = false; }
    else if (date < toISODate(minDate)) { setFieldError(els.date, `Prices older than ${MAX_AGE_DAYS} days aren't accepted.`); ok = false; }
    else setFieldError(els.date, "");

    if (!ok) { const first = els.form.querySelector('[aria-invalid="true"]'); if (first) first.focus(); return; }

    const report = { productName: findProduct(name) ? findProduct(name).name : name, storeId: els.store.value, price: Math.round(price * 100) / 100, quantity: qty, observedAt: date };
    const result = assess(report);
    const entry = { id: "r" + Date.now().toString(36), ...report, productId: result.productId, submittedAt: new Date().toISOString(), status: result.status, flags: result.flags };
    submissions.push(entry);
    save();
    render(entry.id);

    if (result.status === "duplicate") toast("Report saved but flagged as a possible duplicate", { type: "warning" });
    else if (result.status === "review") toast("Thanks! Your report was flagged for review", { type: "warning" });
    else toast("Thanks! Your report is pending verification");

    els.price.value = "";
    els.form.querySelectorAll(".field").forEach((f) => f.classList.remove("has-error"));
  }

  function prefill(productId) {
    const p = productById[productId];
    if (!p) return;
    els.product.value = p.name;
    els.qty.value = p.quantity;
    updateHint();
    document.getElementById("community").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => (els.store.value ? els.price : els.store).focus({ preventScroll: true }), 500);
  }

  const reportsForProduct = (productId) =>
    submissions.filter((s) => s.productId === productId).sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));

  function init() {
    els.form = $("#report-form");
    els.product = $("#rep-product");
    els.store = $("#rep-store");
    els.price = $("#rep-price");
    els.qty = $("#rep-qty");
    els.date = $("#rep-date");
    els.hint = $("#rep-hint");
    els.feed = $("#feed");
    els.stats = $("#feed-stats");

    $("#rep-product-list").innerHTML = DATA.products.map((p) => `<option value="${escapeHtml(p.name)}">${escapeHtml(p.brand)} · ${escapeHtml(p.quantity)}</option>`).join("");
    els.store.innerHTML = `<option value="">Choose a store</option>` + DATA.stores.map((s) => `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join("");
    els.date.value = today();
    els.date.max = today();

    els.product.addEventListener("input", () => {
      const p = findProduct(els.product.value);
      if (p && !els.qty.value) els.qty.value = p.quantity;
      setFieldError(els.product, "");
      updateHint();
    });
    els.store.addEventListener("change", () => { setFieldError(els.store, ""); updateHint(); });
    [els.price, els.qty, els.date].forEach((el) => el.addEventListener("input", () => setFieldError(el, "")));
    els.form.addEventListener("submit", onSubmit);

    on("data:reset", () => { submissions = DATA.demoSubmissions.map((s) => ({ ...s })); save(); render(); });
    render();
  }

  SS.Community = { init, prefill, reportsForProduct, statusLabel, statusClass, assess };
})();
