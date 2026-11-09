# SaveSmart

Price comparison for everyday essentials, starting in Mitrovica, Kosovo.
Static front-end: HTML, CSS and plain JavaScript, with no build step.

> **All prices are demo data.** They are example values, not verified or live
> store prices. There is no connection to any store system.

## Run it

Open `index.html` through any static web server, for example:

```bash
cd savesmart
python3 -m http.server 8000
# then visit http://localhost:8000
```

Opening the file directly (`file://`) also works in most browsers. Map tiles
and the Inter font load from the internet; everything else is local.

## Project structure

```
index.html          Page markup: nav, hero, catalog, basket, budget, map, community, modals
css/styles.css      Design system (tokens from the brief) + all component styles
js/data.js          DEMO DATA: cities, categories, stores, products, prices, example reports
js/core.js          Shared helpers (SS): formatting, localStorage, price maths, toasts, modals, event bus
js/art.js           Draws product illustrations (SVG) so there are never broken images
js/catalog.js       Search, category/store filters, sorting, product cards, Compare Prices modal
js/basket.js        Basket, quantities, per-store totals, smart split, comparison chart
js/budget.js        Monthly budget, expenses, KPIs, progress bar, projection, charts
js/map.js           Leaflet + OpenStreetMap store map and store list
js/community.js     Price report form, validation, flags, activity feed
js/app.js           Navigation, hero, reset demo data, module start-up
vendor/             Chart.js 4 and Leaflet 1.9 (bundled locally, no CDN needed)
```

Each feature module exposes a small API on `window.SS` (e.g. `SS.Basket.add(id)`,
`SS.Catalog.setStore(id)`), and modules talk through `SS.on / SS.emit`.

## What's saved in the browser (localStorage)

Keys are prefixed `savesmart.v1.`: `basket`, `budget`, `expenses`,
`submissions` (community reports), `catalogPrefs` (category, store, sort) and `city`.
**Reset demo data** (top bar or footer) clears them and restores the examples.

## How the key calculations work

- **Product comparison:** lowest, highest, difference and % saving per product,
  price per unit from `unitSize` (e.g. €/L, €/kg, €/roll).
- **Basket per store:** sum of `price × quantity` for each store. A store that
  doesn't list an item is marked **incomplete**, shows which items are missing,
  and is never ranked as cheapest. Missing prices are never counted as €0.
- **Potential saving:** most expensive complete store minus cheapest complete store.
- **Smart split:** total if every item is bought at its own cheapest store.
- **Budget projection:** (spent this month ÷ days elapsed) × days in month.
  The status turns to "Watch spending" at 75% used or when the projection exceeds
  the budget, and "Over budget" at 100%.
- **Community flags:** exact duplicate (same product, store, price and date);
  repeat report within 10 minutes; ≥15% away from the listed price → needs review;
  ≥50% away → possible typo; size differs from the catalog; product not in catalog.
  Reports **never** change catalog prices.

## Adding real data

`js/data.js` is shaped like the responses of a future API, so the UI shouldn't need changes:

```js
{
  id: 1, name: "Fresh Milk 3.2%", brand: "Local Dairy", category: "food",
  quantity: "1 L", unitSize: { amount: 1, unit: "L" },
  image: null,                 // set a photo URL; the illustration is the fallback
  art: { shape: "carton", color: "#5E7FA3", label: "MILK" },
  prices: [
    { storeId: "interex", price: 1.09, updatedAt: "2026-11-06", source: "demo" }
  ]
}
```

- **New product:** add an object to `products`. Leave a store out of `prices` if it doesn't sell it.
- **New store:** add it to `stores`, then add its prices.
- **Verified store location:** set `location: { lat, lng, verified: true }` and
  `address`. The marker moves from the placeholder ring to the real position and
  the "not verified" labels disappear.
- **New city:** add it to `cities` with `active: true` and give its stores that `cityId`.

## Store locations

No store coordinates or addresses were verified, so none are shown as real.
Every marker sits on a dashed placeholder ring around Mitrovica centre and is
labelled "Placeholder location". Send verified addresses or coordinates and they
can be dropped into `data.js`.

## What production would need

| Feature | Now (demo) | Needed for production |
|---|---|---|
| Prices | Static file `js/data.js` | Database + API (e.g. `GET /api/products?city=`), an admin tool or store feeds, price history |
| Community reports | Saved in this browser only | `POST /api/price-reports`, user accounts, moderation queue, rate limiting, optional receipt photo |
| Verification | Status labels only | Staff review or rule-based approval (e.g. several matching reports) before a price is published |
| Basket / budget | localStorage (one device) | Optional accounts to sync across devices |
| Map | Placeholder positions | Verified coordinates and addresses for each store |
| Product images | SVG illustrations | Licensed product photos (set `image`) |
| Languages | English | Albanian and Serbian translations |
