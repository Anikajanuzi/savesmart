/* ==========================================================================
   SaveSmart — demo data
   --------------------------------------------------------------------------
   EVERYTHING IN THIS FILE IS DEMO DATA. Prices are example values created to
   demonstrate the product; they are NOT verified store prices.

   The shapes below mirror what a future API / database would return, so the
   UI does not need to change when real data arrives:

     GET /api/cities                 -> SS_DATA.cities
     GET /api/stores?city=mitrovica  -> SS_DATA.stores
     GET /api/products?city=...      -> SS_DATA.products
     POST /api/price-reports         <- community submissions

   Product price entries: { storeId, price, updatedAt (ISO date), source }
   source: "demo" | "store-feed" | "staff-verified" | "community-verified"
   ========================================================================== */

window.SS_DATA = {
  /** Marks the whole dataset as demonstration data. Shown in the UI. */
  isDemo: true,
  currency: "EUR",
  dataLastUpdated: "2026-11-18",

  cities: [
    { id: "mitrovica", name: "Mitrovica", country: "Kosovo", center: [42.8914, 20.866], active: true }
  ],

  categories: [
    { id: "all", label: "All products" },
    { id: "fresh", label: "Fresh food" },
    { id: "pantry", label: "Pantry" },
    { id: "drinks", label: "Drinks" },
    { id: "snacks", label: "Snacks" },
    { id: "household", label: "Household" },
    { id: "personal-care", label: "Personal care" },
    { id: "stationery", label: "Stationery" }
  ],

  /*
   * Store locations are NOT verified. `location.verified` is false and
   * `address` is null for every store, so the map shows each marker as a
   * clearly labelled placeholder arranged around the city centre.
   * Replace with verified coordinates + addresses when available, e.g.
   *   location: { lat: 42.8901, lng: 20.8665, verified: true },
   *   address: "Rr. ..., Mitrovicë"
   */
  stores: [
    { id: "interex", name: "Interex", initials: "IX", cityId: "mitrovica", address: "Rr. Agim Ramadani, Mitrovicë", hours: "Daily 08:00–23:00", phone: "+383 48 160 311", placeId: "ChIJX58HIb9FUxMR6YBTh2cJYao", location: { lat: 42.893139, lng: 20.8734544, verified: true } },
    { id: "meridian-express", name: "Meridian Express", initials: "ME", cityId: "mitrovica", address: "Rr. Shemsi Ahmeti, Mitrovicë", hours: "Daily 07:00–23:00", phone: "+383 49 770 356", placeId: "ChIJFezmQxNFUxMRLmCpRoztMNw", location: { lat: 42.8883891, lng: 20.871526, verified: true } },
    { id: "premium-store", name: "Premium Market", initials: "PM", cityId: "mitrovica", address: "Rr. Afrim Zhitia 23, Mitrovicë", hours: null, phone: null, placeId: "ChIJ4crhEwBFUxMRVF3c6BdJMgM", location: { lat: 42.8888977, lng: 20.8676095, verified: true } },
    { id: "emona-center", name: "Emona Center", initials: "EC", cityId: "mitrovica", address: "Rr. Agim Hajrizi, Mitrovicë", hours: "Daily 08:00–23:00", phone: null, placeId: "ChIJNbXBzRJFUxMRztsR191Fc3M", location: { lat: 42.8895898, lng: 20.8693489, verified: true } },
    { id: "bamex", name: "Hipermarket Bamex", initials: "BX", cityId: "mitrovica", address: "Mitrovicë", hours: "Daily 08:00–23:00", phone: null, placeId: "ChIJ-wh1iEdFUxMRsi97Idy4lsE", location: { lat: 42.8804352, lng: 20.8532715, verified: true } },
    { id: "florenti", name: "Mega Market Florenti", initials: "FL", cityId: "mitrovica", address: "Qendra, Mitrovicë", hours: "Open 24 hours", phone: null, placeId: "ChIJ0-O68A9FUxMRh8mEbZN0oXs", location: { lat: 42.8914161, lng: 20.8659433, verified: true } },
    { id: "durmart", name: "Durmart", initials: "DM", cityId: "mitrovica", address: "Rr. Dëshmorët e Kombit, Mitrovicë", hours: "Daily 08:00–22:00", phone: "+383 49 273 045", placeId: "ChIJuxO7ellEUxMR_U_jo62WovI", location: { lat: 42.8636523, lng: 20.8493057, verified: true } },
    { id: "etc", name: "ETC Elkos Trading Center", initials: "ET", cityId: "mitrovica", address: "Rr. Bislim Bajgora, Mitrovicë", hours: "Daily 08:00–22:30", phone: "+383 800 30300", placeId: "ChIJVeZDSWlFUxMRFAhA0qrWcRk", location: { lat: 42.8946075, lng: 20.8736138, verified: true } },
    { id: "viva-fresh", name: "Viva Fresh Store", initials: "VF", cityId: "mitrovica", address: "Rr. Bislim Bajgora, Mitrovicë", hours: null, phone: null, placeId: "ChIJq15sAABFUxMRRZEfBlR2kYI", location: { lat: 42.8924992, lng: 20.8723682, verified: true } },
    { id: "brvnara", name: "Brvnara Market", initials: "BR", cityId: "mitrovica", address: "Rr. Mbreti Petri I, Mitrovicë (North)", hours: "Daily 07:30–23:00", phone: null, placeId: "ChIJxyxCmXFFUxMRAwQB4qv6aE8", location: { lat: 42.8962991, lng: 20.864687, verified: true } }
  ],

  /*
   * unitSize lets the UI compute price per unit (per L, per kg, per piece…).
   * image: optional URL. When null (or it fails to load) the UI draws a
   * product illustration from `art`, so there are never broken images.
   */
  products: [
    {
      "id": 1,
      "name": "Fresh Milk 3.2%",
      "brand": "Local Dairy",
      "category": "fresh",
      "quantity": "1 L",
      "unitSize": {
        "amount": 1,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "carton",
        "color": "#5E7FA3",
        "label": "MILK"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 1.09,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.19,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 1.19,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.09,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.14,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.04,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.09,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.09,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.19,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.19,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 2,
      "name": "Natural Yogurt",
      "brand": "Local Dairy",
      "category": "fresh",
      "quantity": "1 kg",
      "unitSize": {
        "amount": 1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "tub",
        "color": "#7A93B0",
        "label": "YOGURT"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 1.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 1.59,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.34,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.59,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.29,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.44,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.39,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.34,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 3,
      "name": "Eggs, Free-range",
      "brand": "Farm Fresh",
      "category": "fresh",
      "quantity": "10 pcs",
      "unitSize": {
        "amount": 10,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "eggs",
        "color": "#C9A66B",
        "label": "EGGS"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 2.09,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 2.29,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 2.39,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.99,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 2.39,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 2.04,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 2.14,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.99,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 2.29,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.94,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 4,
      "name": "White Bread",
      "brand": "Local Bakery",
      "category": "fresh",
      "quantity": "500 g",
      "unitSize": {
        "amount": 0.5,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "loaf",
        "color": "#B98A55",
        "label": "BREAD"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 0.47,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 0.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 0.53,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 0.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.54,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.44,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.49,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.49,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.44,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 5,
      "name": "Spaghetti No.5",
      "brand": "Barilla",
      "category": "pantry",
      "quantity": "500 g",
      "unitSize": {
        "amount": 0.5,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#2F5D8C",
        "label": "PASTA"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 1.29,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 1.59,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.24,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.59,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.34,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.49,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.34,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.39,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.44,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 6,
      "name": "Long Grain Rice",
      "brand": "Golden Grain",
      "category": "pantry",
      "quantity": "1 kg",
      "unitSize": {
        "amount": 1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#C2A25A",
        "label": "RICE"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 1.69,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.79,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 1.89,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.59,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.84,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.69,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.79,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.64,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.74,
          "updatedAt": "2026-10-31",
          "source": "demo"
        }
      ]
    },
    {
      "id": 7,
      "name": "Sunflower Oil",
      "brand": "Sunny Fields",
      "category": "pantry",
      "quantity": "1 L",
      "unitSize": {
        "amount": 1,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#D1A93E",
        "label": "OIL"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 1.79,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.89,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 1.89,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.94,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.94,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.74,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.94,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.64,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.89,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.79,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 8,
      "name": "Granulated Sugar",
      "brand": "Sweet Valley",
      "category": "pantry",
      "quantity": "1 kg",
      "unitSize": {
        "amount": 1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#8FA2B4",
        "label": "SUGAR"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 0.94,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.09,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 1.09,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 0.94,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.14,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.94,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.04,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.89,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.99,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.04,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 9,
      "name": "Wheat Flour T-500",
      "brand": "Mill & Co",
      "category": "pantry",
      "quantity": "1 kg",
      "unitSize": {
        "amount": 1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#A8875E",
        "label": "FLOUR"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 0.75,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 0.79,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 0.87,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 0.79,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.89,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.69,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.84,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.69,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.79,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.84,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 10,
      "name": "White Cheese",
      "brand": "Local Dairy",
      "category": "fresh",
      "quantity": "400 g",
      "unitSize": {
        "amount": 0.4,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "tub",
        "color": "#5F8A72",
        "label": "CHEESE"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 2.79,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 2.99,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 2.99,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 2.84,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 2.74,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 3.04,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 2.79,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 3.04,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 2.69,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 11,
      "name": "Coca-Cola Original",
      "brand": "Coca-Cola",
      "category": "drinks",
      "quantity": "2 L",
      "unitSize": {
        "amount": 2,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#A8423B",
        "label": "COLA"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 1.69,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.69,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 1.89,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.54,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.84,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.59,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.69,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.69,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.84,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.64,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 12,
      "name": "Still Spring Water",
      "brand": "Mountain Spring",
      "category": "drinks",
      "quantity": "1.5 L",
      "unitSize": {
        "amount": 1.5,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#6A9BB5",
        "label": "WATER"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 0.33,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 0.35,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 0.36,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 0.34,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.39,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.34,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.34,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.29,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.34,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.34,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 13,
      "name": "Orange Juice 100%",
      "brand": "Sunland",
      "category": "drinks",
      "quantity": "1 L",
      "unitSize": {
        "amount": 1,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "carton",
        "color": "#D38B3C",
        "label": "JUICE"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 1.59,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.69,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 1.69,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.44,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.74,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.54,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.59,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.49,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.64,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 14,
      "name": "Instant Coffee Classic",
      "brand": "Nescafé",
      "category": "drinks",
      "quantity": "200 g",
      "unitSize": {
        "amount": 0.2,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "jar",
        "color": "#6B4A3A",
        "label": "COFFEE"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 6.29,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 6.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 6.99,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 6.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 6.79,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 5.84,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 6.44,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 6.29,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 7.04,
          "updatedAt": "2026-10-31",
          "source": "demo"
        }
      ]
    },
    {
      "id": 15,
      "name": "Black Tea",
      "brand": "Lipton",
      "category": "drinks",
      "quantity": "25 bags",
      "unitSize": {
        "amount": 25,
        "unit": "bag"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#C9A23E",
        "label": "TEA"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 1.29,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.39,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 1.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.24,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.34,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.24,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.49,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.24,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.44,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.39,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 16,
      "name": "Laundry Powder",
      "brand": "Ariel",
      "category": "household",
      "quantity": "3 kg",
      "unitSize": {
        "amount": 3,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#3E6E9E",
        "label": "WASH"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 11.19,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 11.79,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 12.89,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 10.59,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 13.29,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 11.44,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 12.24,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 10.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 12.19,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 10.89,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 17,
      "name": "Dishwashing Liquid",
      "brand": "Fairy",
      "category": "household",
      "quantity": "900 ml",
      "unitSize": {
        "amount": 0.9,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#6E9A5A",
        "label": "DISH"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 2.29,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 2.39,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 2.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 2.24,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 2.54,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 2.39,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 2.54,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 2.09,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 2.39,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 2.19,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 18,
      "name": "Toilet Paper 3-ply",
      "brand": "Softy",
      "category": "household",
      "quantity": "10 rolls",
      "unitSize": {
        "amount": 10,
        "unit": "roll"
      },
      "image": null,
      "art": {
        "shape": "rolls",
        "color": "#8EA7BE",
        "label": "SOFT"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 3.99,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 4.39,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 4.59,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 4.24,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 4.74,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 3.74,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 4.29,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 3.84,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 3.89,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 4.19,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 19,
      "name": "All-purpose Cleaner",
      "brand": "CleanHome",
      "category": "household",
      "quantity": "1 L",
      "unitSize": {
        "amount": 1,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#4F8C8C",
        "label": "CLEAN"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 1.59,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.69,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 1.89,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.59,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.84,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.54,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.54,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.44,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.49,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 20,
      "name": "Toothpaste Cavity Protection",
      "brand": "Colgate",
      "category": "personal-care",
      "quantity": "100 ml",
      "unitSize": {
        "amount": 0.1,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "tube",
        "color": "#B04A45",
        "label": "PASTE"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 1.69,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.99,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 2.09,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.89,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 2.14,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.84,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.84,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.59,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.94,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.94,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 21,
      "name": "Anti-dandruff Shampoo",
      "brand": "Head & Shoulders",
      "category": "personal-care",
      "quantity": "400 ml",
      "unitSize": {
        "amount": 0.4,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#3F6A93",
        "label": "SHAMPOO"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 4.29,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 4.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 4.89,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 4.19,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 4.99,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 4.04,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 4.94,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 4.44,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 4.39,
          "updatedAt": "2026-10-31",
          "source": "demo"
        }
      ]
    },
    {
      "id": 22,
      "name": "Shower Gel",
      "brand": "Dove",
      "category": "personal-care",
      "quantity": "250 ml",
      "unitSize": {
        "amount": 0.25,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#8798B5",
        "label": "GEL"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 2.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 2.59,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 2.69,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 2.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 2.79,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 2.29,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 2.79,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 2.34,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 2.44,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 2.54,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 23,
      "name": "Liquid Hand Soap",
      "brand": "Fresh & Clean",
      "category": "personal-care",
      "quantity": "500 ml",
      "unitSize": {
        "amount": 0.5,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#9A7FA6",
        "label": "SOAP"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 1.19,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.19,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 1.29,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.24,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.24,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.09,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.19,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.24,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.19,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 24,
      "name": "Alpine Milk Chocolate",
      "brand": "Milka",
      "category": "snacks",
      "quantity": "100 g",
      "unitSize": {
        "amount": 0.1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bar",
        "color": "#8A76A8",
        "label": "CHOCO"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 1.19,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.19,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 1.29,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.19,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.24,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.09,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.24,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.14,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.19,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.14,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 25,
      "name": "Potato Crisps Original",
      "brand": "Pringles",
      "category": "snacks",
      "quantity": "165 g",
      "unitSize": {
        "amount": 0.165,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#B5523F",
        "label": "CRISPS"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 2.39,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 2.69,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 2.79,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 2.29,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 2.84,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 2.29,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 2.79,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 2.49,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 2.39,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 2.39,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 26,
      "name": "Butter Biscuits",
      "brand": "Biscotti Co",
      "category": "snacks",
      "quantity": "200 g",
      "unitSize": {
        "amount": 0.2,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#C08A4A",
        "label": "BISCUIT"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 0.84,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 0.88,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 0.96,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 0.89,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.94,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.79,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.99,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.84,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.89,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.94,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 27,
      "name": "Salted Peanuts",
      "brand": "Nutty",
      "category": "snacks",
      "quantity": "150 g",
      "unitSize": {
        "amount": 0.15,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "jar",
        "color": "#A9783E",
        "label": "PEANUT"
      },
      "prices": [
        {
          "storeId": "etc",
          "price": 1.09,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "viva-fresh",
          "price": 1.09,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "brvnara",
          "price": 1.19,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "interex",
          "price": 1.14,
          "updatedAt": "2026-11-06",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.14,
          "updatedAt": "2026-11-04",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.99,
          "updatedAt": "2026-11-05",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.14,
          "updatedAt": "2026-11-02",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.09,
          "updatedAt": "2026-10-31",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.09,
          "updatedAt": "2026-11-03",
          "source": "demo"
        }
      ]
    },
    {
      "id": 28,
      "sku": "F001",
      "name": "Toast Sandwich Ham & Cheese",
      "brand": "Generic",
      "category": "fresh",
      "quantity": "1 pc",
      "unitSize": {
        "amount": 1,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "loaf",
        "color": "#C9A26B",
        "label": "TOAST"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.49,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.99,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 2.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.39,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 29,
      "sku": "F002",
      "name": "Burek with Cheese",
      "brand": "Generic",
      "category": "fresh",
      "quantity": "250 g",
      "unitSize": {
        "amount": 0.25,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "loaf",
        "color": "#D4A55A",
        "label": "BUREK"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 30,
      "sku": "F003",
      "name": "Croissant Cocoa",
      "brand": "7 Days",
      "category": "fresh",
      "quantity": "80 g",
      "unitSize": {
        "amount": 0.08,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#8B5A3C",
        "label": "7DAYS"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.49,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 31,
      "sku": "F004",
      "name": "Jogurt 1%",
      "brand": "Vita",
      "category": "fresh",
      "quantity": "0.5 L",
      "unitSize": {
        "amount": 0.5,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "carton",
        "color": "#6F9BC4",
        "label": "JOGURT"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.59,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 32,
      "sku": "F005",
      "name": "White Bread Loaf",
      "brand": "Generic",
      "category": "fresh",
      "quantity": "500 g",
      "unitSize": {
        "amount": 0.5,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "loaf",
        "color": "#D9B37A",
        "label": "BREAD"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 33,
      "sku": "F006",
      "name": "Butter",
      "brand": "President",
      "category": "fresh",
      "quantity": "200 g",
      "unitSize": {
        "amount": 0.2,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bar",
        "color": "#E3C35A",
        "label": "BUTTER"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 2.29,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 2.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 2.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 2.19,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 2.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 2.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 2.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 34,
      "sku": "F007",
      "name": "Cheese Slices",
      "brand": "Sharri",
      "category": "fresh",
      "quantity": "200 g",
      "unitSize": {
        "amount": 0.2,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#E6B84A",
        "label": "CHEESE"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 2.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 2.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 2.05,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 2.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 35,
      "sku": "F008",
      "name": "Eggs Grade A",
      "brand": "Generic",
      "category": "fresh",
      "quantity": "10 pcs",
      "unitSize": {
        "amount": 10,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "eggs",
        "color": "#B98A5C",
        "label": "EGGS"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.69,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 2.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 2.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.59,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 36,
      "sku": "F009",
      "name": "Fresh Milk 3.2%",
      "brand": "Vita",
      "category": "fresh",
      "quantity": "1 L",
      "unitSize": {
        "amount": 1,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "carton",
        "color": "#4F7FB3",
        "label": "MILK"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.99,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.05,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 37,
      "sku": "F010",
      "name": "Sour Cream (Smetana)",
      "brand": "Dukat",
      "category": "fresh",
      "quantity": "180 g",
      "unitSize": {
        "amount": 0.18,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "tub",
        "color": "#5C8FC0",
        "label": "SMETAN"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 38,
      "sku": "F011",
      "name": "Chicken Breast Sliced",
      "brand": "Generic",
      "category": "fresh",
      "quantity": "500 g",
      "unitSize": {
        "amount": 0.5,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#D98C7A",
        "label": "CHICKN"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 3.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 3.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 4.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 3.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 3.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 3.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 3.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 39,
      "sku": "F012",
      "name": "Beef Salami Sliced",
      "brand": "Generic",
      "category": "fresh",
      "quantity": "100 g",
      "unitSize": {
        "amount": 0.1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#B5454A",
        "label": "SALAMI"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.89,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 40,
      "sku": "F013",
      "name": "Cottage Cheese (Gjizë)",
      "brand": "Local Dairy",
      "category": "fresh",
      "quantity": "400 g",
      "unitSize": {
        "amount": 0.4,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "tub",
        "color": "#8FB0C9",
        "label": "GJIZE"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.09,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 41,
      "sku": "F014",
      "name": "Apple Pie Slice",
      "brand": "Generic",
      "category": "fresh",
      "quantity": "1 pc",
      "unitSize": {
        "amount": 1,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#C98B4E",
        "label": "PIE"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 42,
      "sku": "F015",
      "name": "Fruit Yogurt Strawberry",
      "brand": "Generic",
      "category": "fresh",
      "quantity": "150 g",
      "unitSize": {
        "amount": 0.15,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "tub",
        "color": "#D9667A",
        "label": "YOGURT"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 43,
      "sku": "P001",
      "name": "Instant Noodles Chicken",
      "brand": "Indomie",
      "category": "pantry",
      "quantity": "70 g",
      "unitSize": {
        "amount": 0.07,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#D9A23A",
        "label": "NOODLE"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.29,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 44,
      "sku": "P002",
      "name": "Tuna in Olive Oil",
      "brand": "Rio Mare",
      "category": "pantry",
      "quantity": "160 g",
      "unitSize": {
        "amount": 0.16,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#C0392B",
        "label": "TUNA"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 2.39,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 2.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 3.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 2.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 2.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 2.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 2.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 45,
      "sku": "P003",
      "name": "Spaghetti No. 5",
      "brand": "Barilla",
      "category": "pantry",
      "quantity": "500 g",
      "unitSize": {
        "amount": 0.5,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#2E5FA8",
        "label": "PASTA"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.09,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 46,
      "sku": "P004",
      "name": "Hazelnut Spread",
      "brand": "Nutella",
      "category": "pantry",
      "quantity": "400 g",
      "unitSize": {
        "amount": 0.4,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "jar",
        "color": "#7A4A2E",
        "label": "NUTELA"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 3.49,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 4.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 4.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 3.39,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 3.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 3.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 3.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 47,
      "sku": "P005",
      "name": "Sunflower Oil",
      "brand": "Flores",
      "category": "pantry",
      "quantity": "1 L",
      "unitSize": {
        "amount": 1,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#E1B53B",
        "label": "OIL"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.29,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 48,
      "sku": "P006",
      "name": "White Rice Long Grain",
      "brand": "Generic",
      "category": "pantry",
      "quantity": "1 kg",
      "unitSize": {
        "amount": 1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#C9B79A",
        "label": "RICE"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 49,
      "sku": "P007",
      "name": "Granulated Sugar",
      "brand": "Generic",
      "category": "pantry",
      "quantity": "1 kg",
      "unitSize": {
        "amount": 1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#B9C3CC",
        "label": "SUGAR"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.79,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.89,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 50,
      "sku": "P008",
      "name": "Iodized Table Salt",
      "brand": "Generic",
      "category": "pantry",
      "quantity": "1 kg",
      "unitSize": {
        "amount": 1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#7FA3C4",
        "label": "SALT"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 51,
      "sku": "P009",
      "name": "Tomato Paste Tube",
      "brand": "Podravka",
      "category": "pantry",
      "quantity": "100 g",
      "unitSize": {
        "amount": 0.1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "tube",
        "color": "#C2412D",
        "label": "TOMATO"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 52,
      "sku": "P010",
      "name": "Tomato Ketchup",
      "brand": "Heinz",
      "category": "pantry",
      "quantity": "400 g",
      "unitSize": {
        "amount": 0.4,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#B3261E",
        "label": "KETCHP"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 2.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 2.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 2.05,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 2.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 53,
      "sku": "P011",
      "name": "Mayonnaise Tube",
      "brand": "Thomy",
      "category": "pantry",
      "quantity": "165 g",
      "unitSize": {
        "amount": 0.165,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "tube",
        "color": "#E3C878",
        "label": "MAYO"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.05,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 54,
      "sku": "P012",
      "name": "Sweet Corn",
      "brand": "Bonduelle",
      "category": "pantry",
      "quantity": "340 g",
      "unitSize": {
        "amount": 0.34,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#3E8E4F",
        "label": "CORN"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.89,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 55,
      "sku": "P013",
      "name": "Red Kidney Beans",
      "brand": "Generic",
      "category": "pantry",
      "quantity": "400 g",
      "unitSize": {
        "amount": 0.4,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#9B3B3B",
        "label": "BEANS"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 56,
      "sku": "P014",
      "name": "Rolled Oats",
      "brand": "Quaker",
      "category": "pantry",
      "quantity": "500 g",
      "unitSize": {
        "amount": 0.5,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#B0453A",
        "label": "OATS"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.39,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 57,
      "sku": "P015",
      "name": "Yellow Label Tea",
      "brand": "Lipton",
      "category": "pantry",
      "quantity": "20 bags",
      "unitSize": {
        "amount": 20,
        "unit": "bag"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#E5B92E",
        "label": "TEA"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.19,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 58,
      "sku": "S001",
      "name": "Alpine Milk Chocolate",
      "brand": "Milka",
      "category": "snacks",
      "quantity": "100 g",
      "unitSize": {
        "amount": 0.1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bar",
        "color": "#8E7CC3",
        "label": "MILKA"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.99,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.89,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.05,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 59,
      "sku": "S002",
      "name": "Classic Potato Chips",
      "brand": "Lay's",
      "category": "snacks",
      "quantity": "130 g",
      "unitSize": {
        "amount": 0.13,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#E8B923",
        "label": "LAYS"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.19,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 60,
      "sku": "S003",
      "name": "Bake Rolls Garlic",
      "brand": "Bake Rolls",
      "category": "snacks",
      "quantity": "80 g",
      "unitSize": {
        "amount": 0.08,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#5E8F4A",
        "label": "BAKE"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 61,
      "sku": "S004",
      "name": "Chocolate Bar",
      "brand": "Snickers",
      "category": "snacks",
      "quantity": "50 g",
      "unitSize": {
        "amount": 0.05,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bar",
        "color": "#6B3E26",
        "label": "SNCKRS"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 62,
      "sku": "S005",
      "name": "Salted Pretzel Chips",
      "brand": "Elephant",
      "category": "snacks",
      "quantity": "80 g",
      "unitSize": {
        "amount": 0.08,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#C4532E",
        "label": "PRETZL"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.49,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 63,
      "sku": "S006",
      "name": "Caramel Biscuit Bar",
      "brand": "Twix",
      "category": "snacks",
      "quantity": "50 g",
      "unitSize": {
        "amount": 0.05,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bar",
        "color": "#B8862E",
        "label": "TWIX"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 64,
      "sku": "S007",
      "name": "4-Finger Milk Chocolate",
      "brand": "KitKat",
      "category": "snacks",
      "quantity": "41.5 g",
      "unitSize": {
        "amount": 0.0415,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bar",
        "color": "#C8102E",
        "label": "KITKAT"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.49,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 65,
      "sku": "S008",
      "name": "Nacho Cheese Chips",
      "brand": "Doritos",
      "category": "snacks",
      "quantity": "100 g",
      "unitSize": {
        "amount": 0.1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#D9502A",
        "label": "DORITO"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.05,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 66,
      "sku": "S009",
      "name": "Original Potato Crisps",
      "brand": "Pringles",
      "category": "snacks",
      "quantity": "165 g",
      "unitSize": {
        "amount": 0.165,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#C0392B",
        "label": "PRNGLS"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 2.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 2.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 2.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 2.05,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 2.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 2.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 2.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 67,
      "sku": "S010",
      "name": "Original Biscuits",
      "brand": "Oreo",
      "category": "snacks",
      "quantity": "154 g",
      "unitSize": {
        "amount": 0.154,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#2B4A8B",
        "label": "OREO"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.89,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 68,
      "sku": "S011",
      "name": "Goldbears Gummy Candy",
      "brand": "Haribo",
      "category": "snacks",
      "quantity": "100 g",
      "unitSize": {
        "amount": 0.1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#E2B230",
        "label": "HARIBO"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 69,
      "sku": "S012",
      "name": "Peanut Chocolate",
      "brand": "M&M's",
      "category": "snacks",
      "quantity": "45 g",
      "unitSize": {
        "amount": 0.045,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#D9A31E",
        "label": "M-MS"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 70,
      "sku": "S013",
      "name": "Salted Roasted Peanuts",
      "brand": "Generic",
      "category": "snacks",
      "quantity": "100 g",
      "unitSize": {
        "amount": 0.1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#A9783E",
        "label": "PEANUT"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 71,
      "sku": "S014",
      "name": "Salted Sunflower Seeds",
      "brand": "Generic",
      "category": "snacks",
      "quantity": "100 g",
      "unitSize": {
        "amount": 0.1,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bag",
        "color": "#4F6B3A",
        "label": "SEEDS"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 72,
      "sku": "S015",
      "name": "Chocolate Bars",
      "brand": "Kinder Bueno",
      "category": "snacks",
      "quantity": "43 g",
      "unitSize": {
        "amount": 0.043,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "bar",
        "color": "#C8102E",
        "label": "BUENO"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 73,
      "sku": "D001",
      "name": "Still Water",
      "brand": "Ujë i Thëllënzë",
      "category": "drinks",
      "quantity": "0.5 L",
      "unitSize": {
        "amount": 0.5,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#5BA4CF",
        "label": "WATER"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.28,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 74,
      "sku": "D002",
      "name": "Energy Drink",
      "brand": "Red Bull",
      "category": "drinks",
      "quantity": "250 ml",
      "unitSize": {
        "amount": 0.25,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#2A4B8D",
        "label": "REDBUL"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.19,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 75,
      "sku": "D003",
      "name": "Energy Drink",
      "brand": "Golden Eagle",
      "category": "drinks",
      "quantity": "250 ml",
      "unitSize": {
        "amount": 0.25,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#C9A227",
        "label": "EAGLE"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.39,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 76,
      "sku": "D004",
      "name": "Coca-Cola Original Can",
      "brand": "Coca-Cola",
      "category": "drinks",
      "quantity": "330 ml",
      "unitSize": {
        "amount": 0.33,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#C8102E",
        "label": "COLA"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.59,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 77,
      "sku": "D005",
      "name": "Energy Drink Green",
      "brand": "Monster",
      "category": "drinks",
      "quantity": "500 ml",
      "unitSize": {
        "amount": 0.5,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#3F7D3A",
        "label": "MONSTR"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 78,
      "sku": "D006",
      "name": "Orange Can",
      "brand": "Fanta",
      "category": "drinks",
      "quantity": "330 ml",
      "unitSize": {
        "amount": 0.33,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#E87722",
        "label": "FANTA"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 79,
      "sku": "D007",
      "name": "Lemon-Lime Can",
      "brand": "Sprite",
      "category": "drinks",
      "quantity": "330 ml",
      "unitSize": {
        "amount": 0.33,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#2E8B57",
        "label": "SPRITE"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 80,
      "sku": "D008",
      "name": "Peach Ice Tea",
      "brand": "Rauch",
      "category": "drinks",
      "quantity": "0.5 L",
      "unitSize": {
        "amount": 0.5,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#E39A5C",
        "label": "ICETEA"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 81,
      "sku": "D009",
      "name": "Frappe Iced Coffee Can",
      "brand": "Nescafé",
      "category": "drinks",
      "quantity": "250 ml",
      "unitSize": {
        "amount": 0.25,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#6B4A35",
        "label": "FRAPPE"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.05,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 82,
      "sku": "D010",
      "name": "Apple Juice",
      "brand": "Bravo",
      "category": "drinks",
      "quantity": "1 L",
      "unitSize": {
        "amount": 1,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "carton",
        "color": "#7FAF3F",
        "label": "APPLE"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.89,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 83,
      "sku": "D011",
      "name": "Sparkling Water",
      "brand": "Rugove",
      "category": "drinks",
      "quantity": "1.5 L",
      "unitSize": {
        "amount": 1.5,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#4A90C2",
        "label": "RUGOVE"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 84,
      "sku": "D012",
      "name": "Energy Drink Classic",
      "brand": "Hell",
      "category": "drinks",
      "quantity": "250 ml",
      "unitSize": {
        "amount": 0.25,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#B22222",
        "label": "HELL"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 85,
      "sku": "D013",
      "name": "Bitter Lemon Can",
      "brand": "Schweppes",
      "category": "drinks",
      "quantity": "330 ml",
      "unitSize": {
        "amount": 0.33,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "can",
        "color": "#D4C445",
        "label": "LEMON"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 86,
      "sku": "D014",
      "name": "Orange Juice",
      "brand": "Cappy",
      "category": "drinks",
      "quantity": "0.33 L",
      "unitSize": {
        "amount": 0.33,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#E8902A",
        "label": "CAPPY"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 87,
      "sku": "D015",
      "name": "Lemonade",
      "brand": "Aria",
      "category": "drinks",
      "quantity": "0.5 L",
      "unitSize": {
        "amount": 0.5,
        "unit": "L"
      },
      "image": null,
      "art": {
        "shape": "bottle",
        "color": "#E3D25A",
        "label": "LEMNDE"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 88,
      "sku": "ST001",
      "name": "A4 Grid Notebook, 100 Sheets (Hardcover)",
      "brand": "Generic",
      "category": "stationery",
      "quantity": "1 pc",
      "unitSize": {
        "amount": 1,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#3D6FA8",
        "label": "A4"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.49,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 2.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.39,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 89,
      "sku": "ST002",
      "name": "Gel Pen Blue",
      "brand": "Schneider",
      "category": "stationery",
      "quantity": "1 pc",
      "unitSize": {
        "amount": 1,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "tube",
        "color": "#2F5DA8",
        "label": "PEN"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.39,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 90,
      "sku": "ST003",
      "name": "Boss Highlighter Yellow",
      "brand": "Stabilo",
      "category": "stationery",
      "quantity": "1 pc",
      "unitSize": {
        "amount": 1,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "tube",
        "color": "#E8D23A",
        "label": "STABLO"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.05,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 91,
      "sku": "ST004",
      "name": "A5 Lined Spiral Notebook, 80 Sheets",
      "brand": "Generic",
      "category": "stationery",
      "quantity": "1 pc",
      "unitSize": {
        "amount": 1,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#5E8F7A",
        "label": "A5"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 92,
      "sku": "ST005",
      "name": "HB Graphite Pencils",
      "brand": "Faber-Castell",
      "category": "stationery",
      "quantity": "3 pcs",
      "unitSize": {
        "amount": 3,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#2F6B45",
        "label": "PENCIL"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 93,
      "sku": "ST006",
      "name": "Ballpoint Pens Black",
      "brand": "Bic",
      "category": "stationery",
      "quantity": "4 pcs",
      "unitSize": {
        "amount": 4,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#2B2B2B",
        "label": "BIC"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.99,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 94,
      "sku": "ST007",
      "name": "Sticky Notes Yellow, 100 Sheets",
      "brand": "Generic",
      "category": "stationery",
      "quantity": "1 pad",
      "unitSize": {
        "amount": 1,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#E8D23A",
        "label": "NOTES"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.05,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 95,
      "sku": "ST008",
      "name": "Correction Tape Mouse 8 m",
      "brand": "Tipp-Ex",
      "category": "stationery",
      "quantity": "1 pc",
      "unitSize": {
        "amount": 1,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#C8102E",
        "label": "TIPPEX"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.89,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 96,
      "sku": "ST009",
      "name": "Transparent Ruler 30 cm",
      "brand": "Generic",
      "category": "stationery",
      "quantity": "1 pc",
      "unitSize": {
        "amount": 1,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "bar",
        "color": "#8FB8CF",
        "label": "RULER"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 97,
      "sku": "ST010",
      "name": "Metal Pencil Sharpener",
      "brand": "Generic",
      "category": "stationery",
      "quantity": "1 pc",
      "unitSize": {
        "amount": 1,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#8A929B",
        "label": "SHARP"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 98,
      "sku": "ST011",
      "name": "White Eraser",
      "brand": "Maped",
      "category": "stationery",
      "quantity": "2 pcs",
      "unitSize": {
        "amount": 2,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#3B6FB6",
        "label": "ERASER"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 0.7,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 0.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 0.55,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 0.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 99,
      "sku": "ST012",
      "name": "Glue Stick",
      "brand": "Pritt",
      "category": "stationery",
      "quantity": "20 g",
      "unitSize": {
        "amount": 0.02,
        "unit": "kg"
      },
      "image": null,
      "art": {
        "shape": "tube",
        "color": "#D9302A",
        "label": "PRITT"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.8,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.0,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 100,
      "sku": "ST013",
      "name": "Stainless Steel Scissors 17 cm",
      "brand": "Generic",
      "category": "stationery",
      "quantity": "1 pc",
      "unitSize": {
        "amount": 1,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#7A8794",
        "label": "SCISSR"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.2,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.65,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.75,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.1,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.45,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 101,
      "sku": "ST014",
      "name": "A4 Clear Document Folders",
      "brand": "Generic",
      "category": "stationery",
      "quantity": "10 pcs",
      "unitSize": {
        "amount": 10,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#7FA8C9",
        "label": "FOLDER"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 0.9,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.3,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 0.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 0.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.05,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.15,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    },
    {
      "id": 102,
      "sku": "ST015",
      "name": "Mini Desk Stapler with Staples",
      "brand": "Generic",
      "category": "stationery",
      "quantity": "1 set",
      "unitSize": {
        "amount": 1,
        "unit": "pc"
      },
      "image": null,
      "art": {
        "shape": "box",
        "color": "#3A3F47",
        "label": "STAPLR"
      },
      "prices": [
        {
          "storeId": "interex",
          "price": 1.35,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "meridian-express",
          "price": 1.85,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "premium-store",
          "price": 1.95,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "emona-center",
          "price": 1.25,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "bamex",
          "price": 1.4,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "florenti",
          "price": 1.5,
          "updatedAt": "2026-11-18",
          "source": "demo"
        },
        {
          "storeId": "durmart",
          "price": 1.6,
          "updatedAt": "2026-11-18",
          "source": "demo"
        }
      ]
    }
  ],

  /* Example community reports shown in the activity feed on first visit. */
  demoSubmissions: [
    { id: "demo-1", productName: "Fresh Milk 3.2%", productId: 1, storeId: "bamex", price: 1.05, quantity: "1 L", observedAt: "2026-11-07", submittedAt: "2026-11-07T09:42:00", status: "pending", flags: [], demo: true },
    { id: "demo-2", productName: "Laundry Powder", productId: 16, storeId: "emona-center", price: 9.49, quantity: "3 kg", observedAt: "2026-11-06", submittedAt: "2026-11-06T17:15:00", status: "review", flags: ["22% below the current listed price"], demo: true },
    { id: "demo-3", productName: "Coca-Cola Original", productId: 11, storeId: "durmart", price: 1.69, quantity: "2 L", observedAt: "2026-11-05", submittedAt: "2026-11-05T12:03:00", status: "pending", flags: [], demo: true }
  ]
};
