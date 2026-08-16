import { createContext, useContext, useState, useEffect } from "react";
import { ghararaProducts as defaultGhararas } from "../data/products";
import { menProducts as defaultMen } from "../data/menProducts";
import { accessoryProducts as defaultAccessories } from "../data/accessoryProducts";
import { jewelleryProducts as defaultJewellery } from "../data/jewelleryProducts";
import defaultHero from "../assets/hero.png";
import { api } from "../services/api";

const ProductContext = createContext();

const STORAGE_KEY = "shaan_catalog_data_v1";
const BANNERS_KEY = "shaan_hero_banners_v1";
const LOGS_KEY = "shaan_inventory_logs_v1";

// Helper to enrich initial products with default stock and description if missing
const enrichWithDefaults = (items, type) => {
  return items.map((item) => ({
    ...item,
    type,
    stock: item.stock !== undefined ? item.stock : 10,
    description:
      item.description ||
      `An exquisite royal piece handcrafted by master artisans at The Shaan Collective, featuring bespoke intricate detailing and heritage zardozi embellishments.`,
    sizes:
      item.sizes && Array.isArray(item.sizes)
        ? item.sizes.map((s) => (s === "CUSTOM" ? "XXL" : s))
        : (type === "women" || type === "men"
            ? ["XS", "S", "M", "L", "XL", "XXL"]
            : ["One Size"]),
  }));
};

export function ProductProvider({ children }) {
  // 1. PRODUCTS STATE
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.women && parsed.men && parsed.accessories && parsed.jewellery) {
          return parsed;
        }
      } catch (err) {
        console.error("Error loading products from storage", err);
      }
    }
    return {
      women: enrichWithDefaults(defaultGhararas, "women"),
      men: enrichWithDefaults(defaultMen, "men"),
      accessories: enrichWithDefaults(defaultAccessories, "accessories"),
      jewellery: enrichWithDefaults(defaultJewellery, "jewellery"),
    };
  });

  // 2. HERO BANNERS STATE
  const [heroBanners, setHeroBanners] = useState(() => {
    const saved = localStorage.getItem(BANNERS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Error loading hero banners", err);
      }
    }
    return {
      home: defaultHero,
      women: defaultHero,
      men: defaultHero,
      jewellery: defaultHero,
      accessories: defaultHero,
    };
  });

  // 3. INVENTORY LOGS STATE
  const [inventoryLogs, setInventoryLogs] = useState(() => {
    const saved = localStorage.getItem(LOGS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Error loading inventory logs", err);
      }
    }
    return [];
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.warn("Storage quota exceeded or error writing products", e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(BANNERS_KEY, JSON.stringify(heroBanners));
    } catch (e) {
      console.warn("Error writing hero banners", e);
    }
  }, [heroBanners]);

  useEffect(() => {
    try {
      localStorage.setItem(LOGS_KEY, JSON.stringify(inventoryLogs));
    } catch (e) {
      console.warn("Error writing inventory logs", e);
    }
  }, [inventoryLogs]);

  // ==========================================
  // ACTIONS & METHODS
  // ==========================================

  // Add new product
  const addProduct = (type, newProductData) => {
    const categoryKey = type === "gharara" || type === "lehenga" ? "women" : type;

    const newId = Date.now();
    const productToAdd = {
      ...newProductData,
      id: newId,
      type: categoryKey,
      price: Number(newProductData.price) || 10000,
      stock: Number(newProductData.stock) || 10,
      isNewArrival: true,
      occasion: Array.isArray(newProductData.occasion)
        ? newProductData.occasion
        : [newProductData.occasion || "Wedding"],
      sizes: Array.isArray(newProductData.sizes) && newProductData.sizes.length > 0
        ? newProductData.sizes.map((s) => (s === "CUSTOM" ? "XXL" : s))
        : ["XS", "S", "M", "L", "XL", "XXL"],
      image: newProductData.image || defaultHero,
    };

    setProducts((prev) => ({
      ...prev,
      [categoryKey]: [productToAdd, ...(prev[categoryKey] || [])],
    }));

    // Async sync with backend
    api.products.add(categoryKey, productToAdd).catch(() => {});

    return productToAdd;
  };

  // Update existing product
  const updateProduct = (type, id, updatedFields) => {
    const categoryKey = type === "gharara" || type === "lehenga" ? "women" : type;
    setProducts((prev) => {
      const list = prev[categoryKey] || [];
      const updatedList = list.map((item) => {
        if (String(item.id) === String(id)) {
          return {
            ...item,
            ...updatedFields,
            price: updatedFields.price !== undefined ? Number(updatedFields.price) : item.price,
            stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : item.stock,
          };
        }
        return item;
      });
      return {
        ...prev,
        [categoryKey]: updatedList,
      };
    });

    // Async sync with backend
    api.products.update(categoryKey, id, updatedFields).catch(() => {});
  };

  // Delete product
  const deleteProduct = (type, id) => {
    const categoryKey = type === "gharara" || type === "lehenga" ? "women" : type;
    setProducts((prev) => ({
      ...prev,
      [categoryKey]: (prev[categoryKey] || []).filter(
        (item) => String(item.id) !== String(id)
      ),
    }));

    // Async sync with backend
    api.products.delete(categoryKey, id).catch(() => {});
  };

  // Deduct stock upon successful order placement
  const deductStock = (orderItems = [], orderDetails = {}) => {
    if (!orderItems || orderItems.length === 0) return;

    setProducts((prev) => {
      const updated = { ...prev };

      orderItems.forEach((orderItem) => {
        // Find which list the product belongs to
        Object.keys(updated).forEach((catKey) => {
          updated[catKey] = updated[catKey].map((prod) => {
            if (String(prod.id) === String(orderItem.id) || prod.name === orderItem.name) {
              const currentStock = prod.stock !== undefined ? prod.stock : 10;
              const deductQty = orderItem.quantity || 1;
              const newStock = Math.max(0, currentStock - deductQty);
              return {
                ...prod,
                stock: newStock,
              };
            }
            return prod;
          });
        });
      });

      return updated;
    });

    // Log the transaction
    const newLog = {
      id: `ORD-LOG-${Date.now()}`,
      orderId: `SC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
      customerName: orderDetails.profile?.name || "Royal Patron",
      customerPhone: orderDetails.profile?.phone || "N/A",
      totalAmount: orderDetails.total || 0,
      paymentMethod: orderDetails.paymentMethod || "Credit Card",
      items: orderItems.map((item) => ({
        name: item.name,
        quantity: item.quantity || 1,
        size: item.size || "M",
        price: item.price,
      })),
    };

    setInventoryLogs((prev) => [newLog, ...prev]);
  };

  // Update Hero Banner
  const updateHeroBanner = (pageKey, imageSrc) => {
    setHeroBanners((prev) => ({
      ...prev,
      [pageKey]: imageSrc,
    }));
  };

  // Reset to default placeholder data
  const resetToDefaultData = () => {
    const defaultData = {
      women: enrichWithDefaults(defaultGhararas, "women"),
      men: enrichWithDefaults(defaultMen, "men"),
      accessories: enrichWithDefaults(defaultAccessories, "accessories"),
      jewellery: enrichWithDefaults(defaultJewellery, "jewellery"),
    };
    const defaultBanners = {
      home: defaultHero,
      women: defaultHero,
      men: defaultHero,
      jewellery: defaultHero,
      accessories: defaultHero,
    };

    setProducts(defaultData);
    setHeroBanners(defaultBanners);
    setInventoryLogs([]);

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(BANNERS_KEY);
    localStorage.removeItem(LOGS_KEY);

    api.products.reset().catch(() => {});
  };

  // Fetch product by ID and type
  const getProduct = (type, id) => {
    const list = products[type] || [];
    return list.find((p) => String(p.id) === String(id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        womenProducts: products.women || [],
        menProducts: products.men || [],
        accessoryProducts: products.accessories || [],
        jewelleryProducts: products.jewellery || [],
        heroBanners,
        inventoryLogs,
        addProduct,
        updateProduct,
        deleteProduct,
        deductStock,
        updateHeroBanner,
        resetToDefaultData,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
