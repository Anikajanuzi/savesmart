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
  dataLastUpdated: "2026-11-06",

  cities: [
    { id: "mitrovica", name: "Mitrovica", country: "Kosovo", center: [42.8914, 20.866], active: true },
    { id: "prishtina", name: "Prishtina", country: "Kosovo", center: [42.6629, 21.1655], active: false },
    { id: "peja", name: "Peja", country: "Kosovo", center: [42.6593, 20.2883], active: false }
  ],

  categories: [
    { id: "all", label: "All products" },
    { id: "food", label: "Food" },
    { id: "drinks", label: "Drinks" },
    { id: "household", label: "Household" },
    { id: "personal-care", label: "Personal care" },
    { id: "snacks", label: "Snacks" }
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
    { id: "interex",          name: "Interex",          initials: "IX", cityId: "mitrovica", address: null, location: { lat: null, lng: null, verified: false } },
    { id: "meridian-express", name: "Meridian Express", initials: "ME", cityId: "mitrovica", address: null, location: { lat: null, lng: null, verified: false } },
    { id: "premium-store",    name: "Premium Store",    initials: "PS", cityId: "mitrovica", address: null, location: { lat: null, lng: null, verified: false } },
    { id: "emona-center",     name: "Emona Center",     initials: "EC", cityId: "mitrovica", address: null, location: { lat: null, lng: null, verified: false } },
    { id: "bamex",            name: "Bamex",            initials: "BX", cityId: "mitrovica", address: null, location: { lat: null, lng: null, verified: false } },
    { id: "florenti",         name: "Florenti",         initials: "FL", cityId: "mitrovica", address: null, location: { lat: null, lng: null, verified: false } },
    { id: "durmart",          name: "Durmart",          initials: "DM", cityId: "mitrovica", address: null, location: { lat: null, lng: null, verified: false } }
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
      "category": "food",
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
      "category": "food",
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
      "category": "food",
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
      "category": "food",
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
      "category": "food",
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
      "category": "food",
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
      "category": "food",
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
      "category": "food",
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
      "category": "food",
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
      "category": "food",
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
    }
  ],

  /* Example community reports shown in the activity feed on first visit. */
  demoSubmissions: [
    { id: "demo-1", productName: "Fresh Milk 3.2%", productId: 1, storeId: "bamex", price: 1.05, quantity: "1 L", observedAt: "2026-11-07", submittedAt: "2026-11-07T09:42:00", status: "pending", flags: [], demo: true },
    { id: "demo-2", productName: "Laundry Powder", productId: 16, storeId: "emona-center", price: 9.49, quantity: "3 kg", observedAt: "2026-11-06", submittedAt: "2026-11-06T17:15:00", status: "review", flags: ["22% below the current listed price"], demo: true },
    { id: "demo-3", productName: "Coca-Cola Original", productId: 11, storeId: "durmart", price: 1.69, quantity: "2 L", observedAt: "2026-11-05", submittedAt: "2026-11-05T12:03:00", status: "pending", flags: [], demo: true }
  ]
};
