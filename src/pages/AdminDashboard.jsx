import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GoldFlower, GoldSparkle, GoldSparkleCluster } from "../components/GoldDecorations";
import { api } from "../services/api";

export default function AdminDashboard() {
  const {
    products,
    womenProducts,
    menProducts,
    accessoryProducts,
    jewelleryProducts,
    heroBanners,
    inventoryLogs,
    addProduct,
    updateProduct,
    deleteProduct,
    updateHeroBanner,
    resetToDefaultData,
  } = useProducts();

  const [activeTab, setActiveTab] = useState("products"); // 'products' | 'banners' | 'orders' | 'backend'
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Backend Monitor States
  const [backendHealth, setBackendHealth] = useState(null);
  const [backendUsers, setBackendUsers] = useState([]);
  const [backendAddresses, setBackendAddresses] = useState([]);
  const [backendOrders, setBackendOrders] = useState([]);
  const [backendPayments, setBackendPayments] = useState([]);
  const [backendLoading, setBackendLoading] = useState(false);
  const [testOtpStatus, setTestOtpStatus] = useState("");

  // Product Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null for new, obj for edit

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    type: "women",
    category: "Embroidered",
    price: "",
    stock: 10,
    color: "Maroon",
    fabric: "Silk",
    occasion: "Wedding",
    sizes: "XS, S, M, L, XL, XXL",
    image: "",
    description: "",
  });

  // Banner edit state
  const [bannerInputs, setBannerInputs] = useState({
    home: heroBanners.home || "",
    women: heroBanners.women || "",
    men: heroBanners.men || "",
    jewellery: heroBanners.jewellery || "",
    accessories: heroBanners.accessories || "",
  });

  // Calculate statistics
  const allList = [
    ...womenProducts,
    ...menProducts,
    ...accessoryProducts,
    ...jewelleryProducts,
  ];

  const totalItems = allList.length;
  const totalStockUnits = allList.reduce((sum, item) => sum + (Number(item.stock) || 0), 0);
  const lowStockCount = allList.filter((item) => (Number(item.stock) || 0) <= 3).length;

  // Filtered Products for Catalog Table
  const displayProducts = allList.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.type === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fabric?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Open Modal for Add
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      type: "women",
      category: "Embroidered",
      price: "",
      stock: 10,
      color: "Royal Gold",
      fabric: "Silk",
      occasion: "Wedding",
      sizes: "XS, S, M, L, XL, XXL",
      image: "",
      description: "An opulent royal design crafted with exquisite zardozi work and heritage craftsmanship.",
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (item) => {
    setEditingProduct(item);
    setFormData({
      name: item.name || "",
      type: item.type || "women",
      category: item.category || "Embroidered",
      price: item.price || "",
      stock: item.stock !== undefined ? item.stock : 10,
      color: item.color || "Gold",
      fabric: item.fabric || "Silk",
      occasion: Array.isArray(item.occasion) ? item.occasion.join(", ") : item.occasion || "Wedding",
      sizes: Array.isArray(item.sizes)
        ? item.sizes.map((s) => (s === "CUSTOM" ? "XXL" : s)).join(", ")
        : item.sizes || "One Size",
      image: item.image || "",
      description: item.description || "",
    });
    setIsModalOpen(true);
  };

  // Handle Form Submission
  const handleSubmitProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert("Please provide at least a Product Name and Price");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock) || 0,
      color: formData.color.trim(),
      fabric: formData.fabric.trim(),
      occasion: formData.occasion
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      sizes: formData.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      image: formData.image.trim(),
      description: formData.description.trim(),
    };

    if (editingProduct) {
      updateProduct(editingProduct.type || formData.type, editingProduct.id, payload);
      alert(`Updated "${formData.name}" successfully`);
    } else {
      addProduct(formData.type, payload);
      alert(`Added "${formData.name}" to ${formData.type.toUpperCase()} collection`);
    }

    setIsModalOpen(false);
  };

  // Handle Image File Upload (converts to base64 Data URL)
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Handle Banner Image Upload
  const handleBannerFileUpload = (pageKey, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setBannerInputs((prev) => ({ ...prev, [pageKey]: reader.result }));
      updateHeroBanner(pageKey, reader.result);
      alert(`Hero banner for ${pageKey.toUpperCase()} updated!`);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBannerUrl = (pageKey) => {
    const url = bannerInputs[pageKey];
    if (!url) return;
    updateHeroBanner(pageKey, url);
    alert(`Hero banner for ${pageKey.toUpperCase()} updated!`);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to remove "${item.name}" from the royal collection?`)) {
      deleteProduct(item.type, item.id);
    }
  };

  const handleQuickStockChange = (item, delta) => {
    const newStock = Math.max(0, (Number(item.stock) || 0) + delta);
    updateProduct(item.type, item.id, { stock: newStock });
  };

  // Backend Sync & Testing Methods
  const refreshBackend = async () => {
    setBackendLoading(true);
    try {
      const [health, usersRes, addrsRes, ordersRes, paymentsRes] = await Promise.allSettled([
        api.checkHealth(),
        api.auth.getAllUsers(),
        api.addresses.get(),
        api.orders.getAll(),
        api.orders.getPaymentLogs(),
      ]);

      if (health.status === "fulfilled") setBackendHealth(health.value);
      if (usersRes.status === "fulfilled") setBackendUsers(usersRes.value.users || []);
      if (addrsRes.status === "fulfilled") setBackendAddresses(addrsRes.value.addresses || []);
      if (ordersRes.status === "fulfilled") setBackendOrders(ordersRes.value.orders || []);
      if (paymentsRes.status === "fulfilled") setBackendPayments(paymentsRes.value.payments || []);
    } catch (e) {
      console.warn("Error refreshing backend stats", e);
    } finally {
      setBackendLoading(false);
    }
  };

  useEffect(() => {
    refreshBackend();
  }, []);

  const handleTestOtp = async () => {
    setTestOtpStatus("Dispatching...");
    try {
      const res = await api.auth.sendOtp("9876543210");
      setTestOtpStatus(`Success: ${res.message || "OTP Sent"} (Use code: 1234)`);
    } catch (e) {
      setTestOtpStatus("Simulated OTP sent to +91-9876543210 (Use: 1234)");
    }
  };

  const handleSimulateOrder = async () => {
    if (womenProducts.length === 0) return;
    const testItem = womenProducts[0];
    try {
      await api.orders.checkout({
        cart: [{ id: testItem.id, name: testItem.name, price: testItem.price, quantity: 1, size: "M" }],
        profile: { name: "Maharani Test User", email: "test@royalshaan.in", phone: "9876543210" },
        address: { fullName: "Maharani Test User", houseNo: "Palace Wing A", city: "Jaipur", state: "Rajasthan", pin: "302001" },
        paymentMethod: "UPI / QR",
        paymentDetails: { upiId: "royalpatron@okhdfcbank" },
        total: testItem.price,
      });
      alert(`Simulated order placed for ₹${testItem.price.toLocaleString("en-IN")}! Inventory and Payment logged.`);
      refreshBackend();
    } catch (e) {
      alert("Simulated order recorded in local cache.");
    }
  };

  return (
    <main className="min-h-screen bg-[#070605] text-[#e8dbbf]">
      <Navbar />

      {/* =========================================
          ADMIN HEADER
      ========================================= */}
      <section className="relative overflow-hidden border-b border-[#dfba6a]/30 bg-[#0c0a08] px-6 pb-12 pt-36 md:px-12">
        <GoldSparkleCluster className="z-0 opacity-40" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <GoldFlower size={16} />
                <span className="text-[10px] tracking-[0.4em] text-[#dfba6a] uppercase">
                  MANAGEMENT CONSOLE & VAULT
                </span>
              </div>
              <h1 className="mt-2 font-serif text-3xl text-[#fae39d] md:text-5xl">
                ATELIER ADMIN DASHBOARD
              </h1>
              <p className="mt-2 text-xs tracking-wider text-[#c4b28f]">
                Manage catalog pieces, live inventory quantities, hero banners and incoming order logs.
              </p>
            </div>

            {/* QUICK ACTIONS */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleOpenAdd}
                className="border border-[#dfba6a] bg-[#dfba6a] px-5 py-3 text-xs font-bold tracking-[0.2em] !text-[#070605] transition hover:bg-[#fae39d]"
              >
                + ADD NEW ROYAL PIECE
              </button>

              <Link
                to="/"
                className="border border-[#dfba6a]/50 bg-[#070605] px-4 py-3 text-xs tracking-[0.2em] text-[#fae39d] transition hover:border-[#fae39d] hover:bg-[#dfba6a]/15"
              >
                STOREFRONT ↗
              </Link>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Reset all catalog data and banners back to initial placeholder items?")) {
                    resetToDefaultData();
                    alert("Catalog reset to default seed data.");
                  }
                }}
                className="border border-[#e53e3e]/40 px-3.5 py-3 text-xs tracking-wider text-[#e53e3e] transition hover:bg-[#e53e3e] hover:text-[#ffffff]"
              >
                RESET TO PLACEHOLDERS
              </button>
            </div>
          </div>

          {/* METRIC CARDS */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="border border-[#dfba6a]/25 bg-[#070605]/90 p-5">
              <span className="text-[10px] tracking-[0.25em] text-[#8e7a5c] uppercase">TOTAL ITEMS</span>
              <p className="mt-2 font-serif text-3xl font-bold text-[#fae39d]">{totalItems}</p>
            </div>
            <div className="border border-[#dfba6a]/25 bg-[#070605]/90 p-5">
              <span className="text-[10px] tracking-[0.25em] text-[#8e7a5c] uppercase">STOCK VAULT UNITS</span>
              <p className="mt-2 font-serif text-3xl font-bold text-[#eed9a4]">{totalStockUnits}</p>
            </div>
            <div className="border border-[#dfba6a]/25 bg-[#070605]/90 p-5">
              <span className="text-[10px] tracking-[0.25em] text-[#8e7a5c] uppercase">LOW STOCK ITEMS</span>
              <p className={`mt-2 font-serif text-3xl font-bold ${lowStockCount > 0 ? "text-[#f6ad55]" : "text-[#48bb78]"}`}>
                {lowStockCount}
              </p>
            </div>
            <div className="border border-[#dfba6a]/25 bg-[#070605]/90 p-5">
              <span className="text-[10px] tracking-[0.25em] text-[#8e7a5c] uppercase">ORDERS PROCESSED</span>
              <p className="mt-2 font-serif text-3xl font-bold text-[#fae39d]">{inventoryLogs.length}</p>
            </div>
          </div>

          {/* TAB BUTTONS */}
          <div className="mt-10 flex flex-wrap border-b border-[#dfba6a]/20">
            {[
              { id: "products", label: "👑 PRODUCTS & INVENTORY" },
              { id: "banners", label: "🖼 HERO BANNERS" },
              { id: "orders", label: "📜 LIVE ORDER & DEDUCTION LOGS" },
              { id: "backend", label: "⚡ BACKEND SERVER & API VAULT" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === "backend") {
                    refreshBackend();
                  }
                }}
                className={`border-b-2 px-6 py-3.5 text-xs font-semibold tracking-[0.25em] transition ${
                  activeTab === tab.id
                    ? "border-[#fae39d] bg-[#dfba6a]/10 text-[#ffffff]"
                    : "border-transparent text-[#8e7a5c] hover:text-[#fae39d]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          TAB 1: PRODUCTS & INVENTORY
      ========================================= */}
      {activeTab === "products" && (
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-12">
          {/* CONTROLS */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* CATEGORY FILTER */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "ALL PIECES" },
                { id: "women", label: "WOMEN (GHARARAS)" },
                { id: "men", label: "MEN (JACKETS)" },
                { id: "jewellery", label: "JEWELLERY" },
                { id: "accessories", label: "ACCESSORIES" },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className={`border px-3.5 py-1.5 text-[11px] tracking-wider transition ${
                    selectedCategory === c.id
                      ? "border-[#fae39d] bg-[#dfba6a] !text-[#070605] font-bold"
                      : "border-[#dfba6a]/30 bg-[#0c0a08] text-[#c4b28f] hover:border-[#dfba6a]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* SEARCH */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, fabric, category..."
              className="w-full sm:w-72 border border-[#dfba6a]/30 bg-[#0c0a08] px-4 py-2 text-xs text-[#fae39d] outline-none focus:border-[#fae39d]"
            />
          </div>

          {/* PRODUCTS TABLE */}
          <div className="mt-8 overflow-x-auto border border-[#dfba6a]/25 bg-[#090807]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#dfba6a]/30 bg-[#120f0c] text-[#fae39d]">
                  <th className="p-4 uppercase tracking-[0.2em]">Piece</th>
                  <th className="p-4 uppercase tracking-[0.2em]">Category</th>
                  <th className="p-4 uppercase tracking-[0.2em]">Price (₹)</th>
                  <th className="p-4 uppercase tracking-[0.2em] text-center">Live Stock</th>
                  <th className="p-4 uppercase tracking-[0.2em]">Sizes</th>
                  <th className="p-4 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dfba6a]/15">
                {displayProducts.map((item) => (
                  <tr key={`${item.type}-${item.id}`} className="hover:bg-[#dfba6a]/5 transition">
                    {/* PRODUCT INFO */}
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-12 shrink-0 overflow-hidden border border-[#dfba6a]/30 bg-[#070605]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-serif text-sm font-semibold text-[#fae39d]">{item.name}</p>
                          <p className="text-[10px] text-[#8e7a5c] tracking-wider uppercase">
                            {item.fabric} • {item.color}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY & TYPE */}
                    <td className="p-4">
                      <span className="border border-[#dfba6a]/30 px-2 py-0.5 text-[10px] tracking-widest text-[#eed9a4] uppercase">
                        {item.type.toUpperCase()} / {item.category}
                      </span>
                    </td>

                    {/* PRICE */}
                    <td className="p-4 font-semibold text-[#eed9a4]">
                      ₹ {new Intl.NumberFormat("en-IN").format(item.price)}
                    </td>

                    {/* STOCK LEVEL & ADJUSTER */}
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-2 border border-[#dfba6a]/30 bg-[#070605] p-1">
                        <button
                          type="button"
                          onClick={() => handleQuickStockChange(item, -1)}
                          className="h-6 w-6 text-xs text-[#fae39d] hover:bg-[#dfba6a] hover:text-[#070605]"
                          title="Decrease Stock"
                        >
                          −
                        </button>
                        <span className={`w-8 text-center text-xs font-bold ${
                          (Number(item.stock) || 0) <= 0
                            ? "text-[#e53e3e]"
                            : (Number(item.stock) || 0) <= 3
                            ? "text-[#f6ad55]"
                            : "text-[#fae39d]"
                        }`}>
                          {item.stock !== undefined ? item.stock : 10}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuickStockChange(item, 1)}
                          className="h-6 w-6 text-xs text-[#fae39d] hover:bg-[#dfba6a] hover:text-[#070605]"
                          title="Increase Stock"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* SIZES */}
                    <td className="p-4 text-xs text-[#c4b28f]">
                      {Array.isArray(item.sizes) ? item.sizes.join(", ") : item.sizes}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="border border-[#dfba6a]/40 px-3 py-1 text-[10px] tracking-wider text-[#fae39d] hover:bg-[#dfba6a] hover:!text-[#070605]"
                        >
                          EDIT
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="border border-[#e53e3e]/40 px-2.5 py-1 text-[10px] tracking-wider text-[#e53e3e] hover:bg-[#e53e3e] hover:text-[#ffffff]"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {displayProducts.length === 0 && (
              <div className="py-16 text-center text-sm text-[#8e7a5c]">
                No items match your search criteria.
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================
          TAB 2: HERO BANNERS MANAGEMENT
      ========================================= */}
      {activeTab === "banners" && (
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-12">
          <p className="text-xs tracking-widest text-[#c4b28f]">
            Update header hero imagery for each storefront collection dynamically.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {[
              { key: "home", label: "Home Page Hero Banner" },
              { key: "women", label: "Women & Ghararas Hero Banner" },
              { key: "men", label: "Men & Jackets Hero Banner" },
              { key: "jewellery", label: "Jewellery Hero Banner" },
              { key: "accessories", label: "Accessories Hero Banner" },
            ].map(({ key, label }) => (
              <div key={key} className="border border-[#dfba6a]/30 bg-[#0c0a08] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg text-[#fae39d]">{label}</h3>
                  <span className="text-[10px] tracking-widest text-[#8e7a5c] uppercase">{key}</span>
                </div>

                {/* IMAGE PREVIEW */}
                <div className="relative h-44 w-full overflow-hidden border border-[#dfba6a]/20 bg-[#070605]">
                  <img
                    src={heroBanners[key] || bannerInputs[key]}
                    alt={label}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                    <span className="text-[10px] tracking-[0.2em] text-[#fae39d]">ACTIVE BANNER</span>
                  </div>
                </div>

                {/* UPLOAD FILE OR ENTER URL */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-[#8e7a5c] uppercase">
                      Paste Image URL
                    </label>
                    <div className="mt-1 flex gap-2">
                      <input
                        type="text"
                        value={bannerInputs[key] || ""}
                        onChange={(e) =>
                          setBannerInputs((prev) => ({ ...prev, [key]: e.target.value }))
                        }
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 border border-[#dfba6a]/30 bg-[#070605] px-3 py-2 text-xs text-[#fae39d] outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveBannerUrl(key)}
                        className="border border-[#dfba6a] bg-[#dfba6a] px-4 py-2 text-xs font-bold !text-[#070605] hover:bg-[#fae39d]"
                      >
                        SAVE
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-[#8e7a5c] uppercase">
                      Or Upload Image File
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleBannerFileUpload(key, e)}
                      className="mt-1 block w-full text-xs text-[#c4b28f] file:mr-4 file:border-0 file:bg-[#dfba6a]/20 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#fae39d] hover:file:bg-[#dfba6a]/30"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================
          TAB 3: INVENTORY & ORDERS AUDIT LOG
      ========================================= */}
      {activeTab === "orders" && (
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-12">
          <p className="text-xs tracking-widest text-[#c4b28f]">
            Live transaction history showing automatic inventory decrements triggered by checkout orders.
          </p>

          <div className="mt-8 space-y-4">
            {inventoryLogs.length === 0 ? (
              <div className="border border-[#dfba6a]/20 bg-[#0c0a08] py-16 text-center">
                <p className="font-serif text-lg text-[#fae39d]">No orders placed yet</p>
                <p className="mt-2 text-xs text-[#8e7a5c]">
                  When a customer completes payment, the order and stock deduction will appear here in real-time.
                </p>
              </div>
            ) : (
              inventoryLogs.map((log) => (
                <div
                  key={log.id}
                  className="border border-[#dfba6a]/30 bg-[#0c0a08] p-6 transition hover:border-[#dfba6a]/60"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfba6a]/15 pb-4">
                    <div>
                      <span className="text-[10px] tracking-[0.3em] text-[#dfba6a] font-bold uppercase">
                        ORDER {log.id}
                      </span>
                      <h4 className="mt-1 font-serif text-lg text-[#fae39d]">
                        {log.customer} ({log.email})
                      </h4>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-[#8e7a5c]">{log.timestamp}</p>
                      <p className="mt-1 font-serif text-lg font-bold text-[#eed9a4]">
                        ₹ {new Intl.NumberFormat("en-IN").format(log.total)}
                      </p>
                    </div>
                  </div>

                  {/* ITEMS DEDUCTED */}
                  <div className="mt-4">
                    <p className="text-[10px] tracking-[0.2em] text-[#8e7a5c] uppercase">
                      Inventory Deductions:
                    </p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                      {log.items?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between border border-[#dfba6a]/15 bg-[#070605] p-2.5 text-xs"
                        >
                          <span className="text-[#fae39d]">{item.name} ({item.size})</span>
                          <span className="font-bold text-[#f6ad55]">−{item.qty} pcs</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* =========================================
          TAB 4: BACKEND SERVER & API VAULT
      ========================================= */}
      {activeTab === "backend" && (
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-12">
          {/* SERVER STATUS BAR */}
          <div className="flex flex-col gap-4 border border-[#dfba6a]/30 bg-[#0c0a08] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-4 w-4">
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${backendHealth?.status === "ok" ? "bg-[#48bb78]" : "bg-[#f6ad55]"} opacity-75`} />
                <span className={`relative inline-flex h-4 w-4 rounded-full ${backendHealth?.status === "ok" ? "bg-[#48bb78]" : "bg-[#f6ad55]"}`} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#fae39d]">
                  {backendHealth?.status === "ok"
                    ? "Express Testing Backend: ACTIVE & CONNECTED"
                    : "Express Testing Backend: STANDBY / LOCAL CACHE ACTIVE"}
                </h3>
                <p className="text-xs text-[#c4b28f]">
                  Port: {backendHealth?.port || "5000"} | Endpoint: <code className="text-[#dfba6a]">http://localhost:5000/api</code>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={refreshBackend}
                disabled={backendLoading}
                className="border border-[#dfba6a] bg-[#dfba6a] px-4 py-2.5 text-xs font-bold tracking-[0.2em] !text-[#070605] hover:bg-[#fae39d]"
              >
                {backendLoading ? "PINGING..." : "↻ REFRESH BACKEND"}
              </button>

              <button
                type="button"
                onClick={handleSimulateOrder}
                className="border border-[#dfba6a]/50 bg-[#070605] px-4 py-2.5 text-xs tracking-wider text-[#fae39d] hover:bg-[#dfba6a]/20"
              >
                ⚡ SIMULATE TEST ORDER
              </button>

              <button
                type="button"
                onClick={handleTestOtp}
                className="border border-[#dfba6a]/50 bg-[#070605] px-4 py-2.5 text-xs tracking-wider text-[#fae39d] hover:bg-[#dfba6a]/20"
              >
                ✉ TEST OTP DISPATCH
              </button>
            </div>
          </div>

          {testOtpStatus && (
            <div className="mt-3 border border-[#dfba6a]/30 bg-[#dfba6a]/10 p-3 text-xs text-[#fae39d]">
              {testOtpStatus}
            </div>
          )}

          {/* BACKEND DATA TABLES GRID */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* REGISTERED USERS */}
            <div className="border border-[#dfba6a]/25 bg-[#0c0a08] p-6">
              <div className="flex items-center justify-between border-b border-[#dfba6a]/20 pb-3">
                <h4 className="font-serif text-lg text-[#fae39d]">
                  👥 Registered Royal Patrons ({backendUsers.length})
                </h4>
                <span className="text-[10px] tracking-widest text-[#8e7a5c]">GET /api/auth/users</span>
              </div>

              <div className="mt-4 max-h-80 overflow-y-auto space-y-3">
                {backendUsers.length === 0 ? (
                  <p className="text-xs text-[#8e7a5c]">No users registered yet. Open the Login Modal on the storefront to register.</p>
                ) : (
                  backendUsers.map((user, idx) => (
                    <div key={idx} className="border border-[#dfba6a]/15 bg-[#070605] p-3 text-xs">
                      <div className="flex justify-between font-bold text-[#fae39d]">
                        <span>{user.name || "Royal Guest"}</span>
                        <span className="text-[10px] text-[#dfba6a]">{user.role || "Patron"}</span>
                      </div>
                      <p className="mt-1 text-[#c4b28f]">📞 +91 {user.phone} | ✉ {user.email}</p>
                      <p className="mt-0.5 text-[10px] text-[#8e7a5c]">Joined: {new Date(user.createdAt || Date.now()).toLocaleDateString("en-IN")}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* SAVED ADDRESSES */}
            <div className="border border-[#dfba6a]/25 bg-[#0c0a08] p-6">
              <div className="flex items-center justify-between border-b border-[#dfba6a]/20 pb-3">
                <h4 className="font-serif text-lg text-[#fae39d]">
                  📍 Shipping Addresses in Backend ({backendAddresses.length})
                </h4>
                <span className="text-[10px] tracking-widest text-[#8e7a5c]">GET /api/addresses</span>
              </div>

              <div className="mt-4 max-h-80 overflow-y-auto space-y-3">
                {backendAddresses.length === 0 ? (
                  <p className="text-xs text-[#8e7a5c]">No addresses stored yet. Complete checkout to save address.</p>
                ) : (
                  backendAddresses.map((addr, idx) => (
                    <div key={idx} className="border border-[#dfba6a]/15 bg-[#070605] p-3 text-xs">
                      <p className="font-bold text-[#fae39d]">{addr.fullName || "Patron"}</p>
                      <p className="mt-1 text-[#c4b28f]">{addr.houseNo || addr.address}, {addr.city}, {addr.state} - {addr.pincode || addr.pin}</p>
                      <p className="mt-0.5 text-[10px] text-[#8e7a5c]">Phone: +91 {addr.phone}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* PAYMENT GATEWAY AUDIT LOGS */}
            <div className="border border-[#dfba6a]/25 bg-[#0c0a08] p-6">
              <div className="flex items-center justify-between border-b border-[#dfba6a]/20 pb-3">
                <h4 className="font-serif text-lg text-[#fae39d]">
                  💳 Payment Gateway Transactions ({backendPayments.length})
                </h4>
                <span className="text-[10px] tracking-widest text-[#8e7a5c]">GET /api/payments</span>
              </div>

              <div className="mt-4 max-h-80 overflow-y-auto space-y-3">
                {backendPayments.length === 0 ? (
                  <p className="text-xs text-[#8e7a5c]">No payments logged yet. Complete payment to view authorization logs.</p>
                ) : (
                  backendPayments.map((pay, idx) => (
                    <div key={idx} className="border border-[#dfba6a]/15 bg-[#070605] p-3 text-xs">
                      <div className="flex justify-between font-bold">
                        <span className="text-[#fae39d]">{pay.orderId}</span>
                        <span className="text-[#48bb78]">AUTHORIZATION: {pay.status}</span>
                      </div>
                      <p className="mt-1 text-[#c4b28f]">
                        Txn ID: <code className="text-[#dfba6a]">{pay.transactionId}</code> | Amount: ₹ {new Intl.NumberFormat("en-IN").format(pay.amount)}
                      </p>
                      <p className="mt-0.5 text-[10px] text-[#8e7a5c]">Method: {pay.method.toUpperCase()} | Time: {new Date(pay.timestamp).toLocaleString("en-IN")}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* BACKEND ORDERS */}
            <div className="border border-[#dfba6a]/25 bg-[#0c0a08] p-6">
              <div className="flex items-center justify-between border-b border-[#dfba6a]/20 pb-3">
                <h4 className="font-serif text-lg text-[#fae39d]">
                  📦 Backend Orders Vault ({backendOrders.length})
                </h4>
                <span className="text-[10px] tracking-widest text-[#8e7a5c]">GET /api/orders</span>
              </div>

              <div className="mt-4 max-h-80 overflow-y-auto space-y-3">
                {backendOrders.length === 0 ? (
                  <p className="text-xs text-[#8e7a5c]">No orders placed yet.</p>
                ) : (
                  backendOrders.map((ord, idx) => (
                    <div key={idx} className="border border-[#dfba6a]/15 bg-[#070605] p-3 text-xs">
                      <div className="flex justify-between font-bold">
                        <span className="text-[#fae39d]">{ord.id}</span>
                        <span className="text-[#dfba6a]">₹ {new Intl.NumberFormat("en-IN").format(ord.totalAmount)}</span>
                      </div>
                      <p className="mt-1 text-[#c4b28f]">Customer: {ord.customer?.name} ({ord.customer?.phone})</p>
                      <p className="mt-0.5 text-[10px] text-[#8e7a5c]">Items: {ord.itemCount} pieces | Status: {ord.orderStatus}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================
          MODAL: ADD / EDIT ROYAL PIECE
      ========================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#dfba6a]/50 bg-[#0c0a08] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-[#e8dbbf]">
            <div className="flex items-center justify-between border-b border-[#dfba6a]/20 pb-4">
              <div>
                <span className="text-[10px] tracking-[0.3em] text-[#dfba6a] uppercase">ATELIER ARCHIVE</span>
                <h3 className="font-serif text-2xl text-[#fae39d]">
                  {editingProduct ? `Edit "${editingProduct.name}"` : "Add New Royal Piece"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center border border-[#dfba6a]/30 text-[#dfba6a] hover:bg-[#dfba6a] hover:!text-[#070605]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="mt-6 space-y-4">
              {/* TITLE */}
              <div>
                <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Maharani Zardozi Silk Gharara"
                  className="mt-1 w-full border border-[#dfba6a]/30 bg-[#070605] px-4 py-2.5 text-xs text-[#fae39d] outline-none focus:border-[#fae39d]"
                />
              </div>

              {/* COLLECTION TYPE & CATEGORY */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                    Collection Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="mt-1 w-full border border-[#dfba6a]/30 bg-[#070605] px-3 py-2.5 text-xs text-[#fae39d] outline-none"
                  >
                    <option value="women">Women (Ghararas & Lehengas)</option>
                    <option value="men">Men (Royal Jackets)</option>
                    <option value="jewellery">Jewellery & Heritage Pieces</option>
                    <option value="accessories">Accessories & Stoles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                    Category Tag *
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Embroidered, Brocade, Choker"
                    className="mt-1 w-full border border-[#dfba6a]/30 bg-[#070605] px-3 py-2.5 text-xs text-[#fae39d] outline-none"
                  />
                </div>
              </div>

              {/* PRICE & STOCK */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                    Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="125000"
                    className="mt-1 w-full border border-[#dfba6a]/30 bg-[#070605] px-3 py-2.5 text-xs text-[#fae39d] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                    Initial Stock Vault Units *
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="10"
                    className="mt-1 w-full border border-[#dfba6a]/30 bg-[#070605] px-3 py-2.5 text-xs text-[#fae39d] outline-none"
                  />
                </div>
              </div>

              {/* FABRIC, COLOR & OCCASION */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                    Fabric
                  </label>
                  <input
                    type="text"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    placeholder="Silk, Velvet, Brocade"
                    className="mt-1 w-full border border-[#dfba6a]/30 bg-[#070605] px-3 py-2 text-xs text-[#fae39d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                    Color
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="Maroon, Rose Gold"
                    className="mt-1 w-full border border-[#dfba6a]/30 bg-[#070605] px-3 py-2 text-xs text-[#fae39d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                    Occasions
                  </label>
                  <input
                    type="text"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    placeholder="Bridal, Wedding, Festive"
                    className="mt-1 w-full border border-[#dfba6a]/30 bg-[#070605] px-3 py-2 text-xs text-[#fae39d] outline-none"
                  />
                </div>
              </div>

              {/* SIZES */}
              <div>
                <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                  Available Sizes (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.sizes}
                  onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                  placeholder="XS, S, M, L, XL, XXL"
                  className="mt-1 w-full border border-[#dfba6a]/30 bg-[#070605] px-3 py-2 text-xs text-[#fae39d] outline-none"
                />
              </div>

              {/* IMAGE URL & UPLOAD */}
              <div>
                <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                  Product Image (URL or Upload)
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://... or choose file below"
                  className="mt-1 w-full border border-[#dfba6a]/30 bg-[#070605] px-3 py-2 text-xs text-[#fae39d] outline-none"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="mt-2 block w-full text-xs text-[#c4b28f] file:mr-4 file:border-0 file:bg-[#dfba6a]/20 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#fae39d]"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the royal craftsmanship..."
                  className="mt-1 w-full border border-[#dfba6a]/30 bg-[#070605] p-3 text-xs text-[#fae39d] outline-none"
                />
              </div>

              {/* SUBMIT */}
              <div className="mt-6 flex justify-end gap-3 border-t border-[#dfba6a]/20 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-[#dfba6a]/30 px-5 py-2.5 text-xs text-[#fae39d] hover:bg-[#dfba6a]/10"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="border border-[#dfba6a] bg-[#dfba6a] px-6 py-2.5 text-xs font-bold tracking-wider !text-[#070605] hover:bg-[#fae39d]"
                >
                  {editingProduct ? "SAVE CHANGES" : "ADD TO ARCHIVE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
