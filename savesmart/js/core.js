/* ==========================================================================
   SaveSmart — core
   Shared helpers: formatting, persistence (localStorage), price maths,
   a tiny event bus, toasts and modals. Every feature module uses `SS`.
   ========================================================================== */
(function () {
  "use strict";

  const DATA = window.SS_DATA;
  const STORAGE_PREFIX = "savesmart.v1.";

  /* ---------- DOM & formatting ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const escapeHtml = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /** Round to cents to avoid floating-point drift in totals. */
  const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

  const money = (n) => "€" + round2(n).toFixed(2);
  const signedMoney = (n) => (n > 0 ? "+" : n < 0 ? "−" : "") + money(Math.abs(n));
  const pct = (n, digits = 0) => (Number.isFinite(n) ? n.toFixed(digits) : "0") + "%";

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  /** "2026-11-06" -> Date in local time (avoids UTC shift). */
  const parseISODate = (iso) => {
    const [y, m, d] = String(iso).slice(0, 10).split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  const toISODate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  const shortDate = (iso) => {
    const d = parseISODate(iso);
    return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  };
  const longDate = (iso) => {
    const d = parseISODate(iso);
    return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  };
  const timeAgo = (isoDateTime) => {
    const diff = (Date.now() - new Date(isoDateTime).getTime()) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return Math.floor(diff / 60) + " min ago";
    if (diff < 86400) return Math.floor(diff / 3600) + " h ago";
    const days = Math.floor(diff / 86400);
    if (days < 7) return days + (days === 1 ? " day ago" : " days ago");
    return shortDate(isoDateTime);
  };
  const today = () => toISODate(new Date());

  const debounce = (fn, ms = 150) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  };

  /* ---------- Persistence ---------- */
  const storage = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(STORAGE_PREFIX + key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      } catch (e) {
        /* storage unavailable (private mode, quota) — app keeps working in memory */
      }
    },
    clearAll() {
      try {
        Object.keys(localStorage)
          .filter((k) => k.startsWith(STORAGE_PREFIX))
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        /* ignore */
      }
    }
  };

  /* ---------- Event bus ---------- */
  const listeners = {};
  const on = (evt, fn) => (listeners[evt] = listeners[evt] || []).push(fn);
  const emit = (evt, payload) => (listeners[evt] || []).forEach((fn) => fn(payload));

  /* ---------- Data access & price maths ---------- */
  const storeById = Object.fromEntries(DATA.stores.map((s) => [s.id, s]));
  const productById = Object.fromEntries(DATA.products.map((p) => [p.id, p]));
  const categoryLabel = Object.fromEntries(DATA.categories.map((c) => [c.id, c.label]));

  /** Price of a product at a store, or null if the store doesn't list it. */
  const priceAt = (product, storeId) => {
    const entry = product.prices.find((p) => p.storeId === storeId);
    return entry ? entry.price : null;
  };

  /** Summary stats for one product across stores (cached). */
  const statsCache = new Map();
  const productStats = (product) => {
    if (statsCache.has(product.id)) return statsCache.get(product.id);
    const sorted = [...product.prices].sort((a, b) => a.price - b.price);
    const min = sorted[0].price;
    const max = sorted[sorted.length - 1].price;
    const stats = {
      min,
      max,
      spread: round2(max - min),
      spreadPct: max > 0 ? ((max - min) / max) * 100 : 0,
      cheapestStores: sorted.filter((p) => p.price === min).map((p) => p.storeId),
      sorted,
      storeCount: sorted.length,
      latestUpdate: product.prices.map((p) => p.updatedAt).sort().pop()
    };
    statsCache.set(product.id, stats);
    return stats;
  };

  /** Price per unit, e.g. "€1.04 / L". Returns null if unit size unknown. */
  const unitPrice = (product, price) => {
    const u = product.unitSize;
    if (!u || !u.amount) return null;
    const value = price / u.amount;
    const unitLabel = { pc: "piece", bag: "bag", roll: "roll" }[u.unit] || u.unit;
    return `${money(value)} / ${unitLabel}`;
  };

  /* ---------- Toasts ---------- */
  const toast = (message, opts = {}) => {
    const root = $("#toasts");
    if (!root) return;
    const el = document.createElement("div");
    const type = opts.type || "success";
    el.className = `toast toast--${type}`;
    el.setAttribute("role", "status");
    const icon = type === "success" ? "i-check" : type === "danger" ? "i-x" : "i-info";
    el.innerHTML =
      `<span class="toast__icon"><svg class="ico"><use href="#${icon}"/></svg></span>` +
      `<span>${message}</span>` +
      (opts.action ? `<button type="button">${escapeHtml(opts.action.label)}</button>` : "");
    if (opts.action) {
      el.querySelector("button").addEventListener("click", () => {
        opts.action.onClick();
        dismiss();
      });
    }
    root.appendChild(el);
    const dismiss = () => {
      if (!el.isConnected) return;
      el.classList.add("is-leaving");
      setTimeout(() => el.remove(), 260);
    };
    setTimeout(dismiss, opts.duration || 3200);
    while (root.children.length > 3) root.firstElementChild.remove();
  };

  /* ---------- Modals ---------- */
  let lastFocus = null;
  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    modal.classList.remove("is-closing");
    document.body.style.overflow = "hidden";
    const focusable = modal.querySelector(".modal__dialog button:not([data-close]), .modal__dialog [href], .modal__dialog input") ||
      modal.querySelector("[data-close]");
    requestAnimationFrame(() => focusable && focusable.focus({ preventScroll: true }));
  };
  const closeModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal || modal.hidden) return;
    modal.classList.add("is-closing");
    setTimeout(() => {
      modal.hidden = true;
      modal.classList.remove("is-closing");
      if (!$$(".modal").some((m) => !m.hidden)) document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }, 170);
  };
  document.addEventListener("click", (e) => {
    const closer = e.target.closest("[data-close]");
    if (closer) closeModal(closer.closest(".modal").id);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const open = $$(".modal").filter((m) => !m.hidden).pop();
    if (open) closeModal(open.id);
  });
  /* Keep keyboard focus inside an open modal. */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const open = $$(".modal").filter((m) => !m.hidden).pop();
    if (!open) return;
    const items = $$("button, [href], input, select, textarea", open.querySelector(".modal__dialog")).filter((el) => !el.disabled && el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- Animated number ---------- */
  const animateNumber = (el, to, format = (n) => n.toFixed(0), duration = 1100) => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = 0;
    if (reduce) { el.textContent = format(to); return; }
    const start = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = format(from + (to - from) * eased);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /** Small inline form validation helper. */
  const setFieldError = (input, message) => {
    const field = input.closest(".field") || input.parentElement;
    const err = field && field.querySelector(".field-error");
    if (field) field.classList.toggle("has-error", !!message);
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (err) {
      err.textContent = message || "";
      err.hidden = !message;
      if (message) {
        err.id = err.id || input.id + "-error";
        input.setAttribute("aria-describedby", err.id);
      }
    }
  };

  const chartsAvailable = () => typeof window.Chart === "function";

  window.SS = {
    DATA,
    $, $$, escapeHtml, round2, money, signedMoney, pct,
    MONTHS, MONTHS_LONG, parseISODate, toISODate, shortDate, longDate, timeAgo, today, debounce,
    storage, on, emit,
    storeById, productById, categoryLabel, priceAt, productStats, unitPrice,
    toast, openModal, closeModal, animateNumber, setFieldError, chartsAvailable
  };
})();
