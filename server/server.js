import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, "db.json");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Initial Seed Database
const defaultSeedData = {
  users: [
    {
      id: "usr_royal_001",
      name: "Maharani Aishwarya Singh",
      firstName: "Aishwarya",
      lastName: "Singh",
      phone: "9876543210",
      email: "aishwarya.singh@royalatelier.in",
      newsletter: true,
      role: "VIP Patron",
      createdAt: new Date().toISOString(),
    },
    {
      id: "usr_royal_002",
      name: "Raja Vikramaditya Dev",
      firstName: "Vikramaditya",
      lastName: "Dev",
      phone: "9123456780",
      email: "vikramaditya@heritage.in",
      newsletter: true,
      role: "Atelier Member",
      createdAt: new Date().toISOString(),
    },
  ],
  addresses: [
    {
      id: "addr_001",
      userId: "usr_royal_001",
      phone: "9876543210",
      fullName: "Maharani Aishwarya Singh",
      houseNo: "The Royal Palace, Suite 108",
      area: "Civil Lines, Palace Road",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302006",
      isDefault: true,
    },
  ],
  heroBanners: {
    home: "",
    women: "",
    men: "",
    jewellery: "",
    accessories: "",
  },
  products: {
    women: [],
    men: [],
    accessories: [],
    jewellery: [],
  },
  orders: [],
  paymentLogs: [],
};

// Load or Initialize Database
function loadDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultSeedData, null, 2), "utf8");
      return defaultSeedData;
    }
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database, using in-memory state:", err);
    return defaultSeedData;
  }
}

function saveDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing database file:", err);
  }
}

// HEALTH CHECK
app.get("/api/health", (req, res) => {
  const db = loadDb();
  res.json({
    status: "ok",
    message: "The Shaan Collective Royal Testing Backend is Active & Running",
    port: PORT,
    timestamp: new Date().toISOString(),
    stats: {
      usersCount: db.users?.length || 0,
      ordersCount: db.orders?.length || 0,
      addressesCount: db.addresses?.length || 0,
      paymentsLogged: db.paymentLogs?.length || 0,
      customProductsCount:
        (db.products?.women?.length || 0) +
        (db.products?.men?.length || 0) +
        (db.products?.accessories?.length || 0) +
        (db.products?.jewellery?.length || 0),
    },
  });
});

// ==========================================
// 1. AUTHENTICATION & PROFILE ENDPOINTS
// ==========================================

// Request OTP Simulation
app.post("/api/auth/otp/send", (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length !== 10) {
    return res.status(400).json({ success: false, message: "Invalid 10-digit mobile number." });
  }

  // Pre-configured testing OTP is always 1234 or generated
  const testOtp = "1234";
  console.log(`[AUTH] Sent Test OTP ${testOtp} to +91-${phone}`);

  return res.json({
    success: true,
    message: `OTP sent successfully to +91-${phone}`,
    testOtpHint: "Use testing OTP: 1234",
  });
});

// Verify OTP & Get or Create User Session
app.post("/api/auth/otp/verify", (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: "Phone and OTP are required." });
  }

  // Allow standard "1234" or any 4 digit OTP for test flexibility
  if (otp !== "1234" && otp.length !== 4) {
    return res.status(400).json({ success: false, message: "Invalid OTP code. Use 1234." });
  }

  const db = loadDb();
  const cleanPhone = phone.replace(/\D/g, "").slice(-10);
  const existingUser = db.users.find((u) => u.phone?.replace(/\D/g, "").slice(-10) === cleanPhone);

  if (existingUser) {
    return res.json({
      success: true,
      isNewUser: false,
      user: existingUser,
      token: `shaan_jwt_test_${existingUser.id}`,
      message: `Welcome back, ${existingUser.name || "Royal Patron"}!`,
    });
  }

  return res.json({
    success: true,
    isNewUser: true,
    phone: cleanPhone,
    message: "OTP verified. Please complete your royal patron profile.",
  });
});

// Register New User
app.post("/api/auth/register", (req, res) => {
  const { firstName, lastName, email, phone, newsletter } = req.body;
  if (!firstName || !email || !phone) {
    return res.status(400).json({ success: false, message: "Name, email, and phone are required." });
  }

  const db = loadDb();
  const cleanPhone = phone.replace(/\D/g, "").slice(-10);
  const fullName = `${firstName} ${lastName || ""}`.trim();

  let user = db.users.find((u) => u.phone?.replace(/\D/g, "").slice(-10) === cleanPhone);

  if (user) {
    user.name = fullName;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.newsletter = Boolean(newsletter);
    user.updatedAt = new Date().toISOString();
  } else {
    user = {
      id: `usr_${Date.now()}`,
      name: fullName,
      firstName,
      lastName,
      email,
      phone: cleanPhone,
      newsletter: Boolean(newsletter),
      role: "Patron",
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
  }

  saveDb(db);
  console.log(`[AUTH] Registered/Updated User: ${user.name} (${user.phone})`);

  return res.json({
    success: true,
    user,
    token: `shaan_jwt_test_${user.id}`,
    message: "Profile registered successfully in The Shaan Collective Atelier.",
  });
});

// Update Profile
app.put("/api/auth/profile", (req, res) => {
  const { id, phone, name, email, newsletter } = req.body;
  const db = loadDb();

  const user = db.users.find(
    (u) => u.id === id || (phone && u.phone?.replace(/\D/g, "").slice(-10) === phone.replace(/\D/g, "").slice(-10))
  );

  if (!user) {
    return res.status(404).json({ success: false, message: "User profile not found." });
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (newsletter !== undefined) user.newsletter = newsletter;
  user.updatedAt = new Date().toISOString();

  saveDb(db);
  return res.json({ success: true, user, message: "Profile updated successfully." });
});

// List all registered users (for testing & admin dashboard)
app.get("/api/auth/users", (req, res) => {
  const db = loadDb();
  res.json({ success: true, count: db.users.length, users: db.users });
});

// ==========================================
// 2. ADDRESS MANAGEMENT ENDPOINTS
// ==========================================

// Get addresses
app.get("/api/addresses", (req, res) => {
  const { phone } = req.query;
  const db = loadDb();

  if (phone) {
    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    const userAddresses = db.addresses.filter(
      (a) => a.phone?.replace(/\D/g, "").slice(-10) === cleanPhone
    );
    return res.json({ success: true, addresses: userAddresses });
  }

  return res.json({ success: true, addresses: db.addresses });
});

// Save or Update Address
app.post("/api/addresses", (req, res) => {
  const { fullName, phone, houseNo, area, city, state, pincode, isDefault } = req.body;

  if (!fullName || !phone || !houseNo || !city || !state || !pincode) {
    return res.status(400).json({ success: false, message: "Incomplete address details." });
  }

  const db = loadDb();
  const cleanPhone = phone.replace(/\D/g, "").slice(-10);

  const newAddress = {
    id: `addr_${Date.now()}`,
    fullName,
    phone: cleanPhone,
    houseNo,
    area: area || "",
    city,
    state,
    pincode,
    isDefault: Boolean(isDefault),
    createdAt: new Date().toISOString(),
  };

  db.addresses.unshift(newAddress);
  saveDb(db);

  console.log(`[ADDRESS] Saved address for ${fullName} (${city}, ${state})`);
  return res.json({ success: true, address: newAddress, message: "Address saved securely to backend." });
});

// ==========================================
// 3. PRODUCTS & CATALOG CRUD ENDPOINTS
// ==========================================

// Get All Products
app.get("/api/products", (req, res) => {
  const db = loadDb();
  res.json({
    success: true,
    products: db.products,
    heroBanners: db.heroBanners,
  });
});

// Sync / Update Full Catalog from frontend store
app.post("/api/products/sync", (req, res) => {
  const { products, heroBanners } = req.body;
  const db = loadDb();

  if (products) db.products = products;
  if (heroBanners) db.heroBanners = heroBanners;

  saveDb(db);
  res.json({ success: true, message: "Catalog synchronized with backend vault." });
});

// Add Single Product
app.post("/api/products", (req, res) => {
  const { categoryType, product } = req.body;
  if (!categoryType || !product) {
    return res.status(400).json({ success: false, message: "Category type and product data required." });
  }

  const db = loadDb();
  if (!db.products[categoryType]) {
    db.products[categoryType] = [];
  }

  const newProduct = {
    ...product,
    id: product.id || Date.now(),
    stock: Number(product.stock) || 10,
    createdAt: new Date().toISOString(),
  };

  db.products[categoryType].unshift(newProduct);
  saveDb(db);

  console.log(`[PRODUCT] Added new piece "${newProduct.name}" in category ${categoryType}`);
  res.json({ success: true, product: newProduct, message: "New piece added to royal inventory." });
});

// Update Product / Stock
app.put("/api/products/:categoryType/:id", (req, res) => {
  const { categoryType, id } = req.params;
  const updates = req.body;
  const db = loadDb();

  const list = db.products[categoryType];
  if (!list) {
    return res.status(404).json({ success: false, message: "Category not found." });
  }

  const index = list.findIndex((item) => String(item.id) === String(id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Product not found." });
  }

  list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };
  saveDb(db);

  res.json({ success: true, product: list[index], message: "Product updated." });
});

// Delete Product
app.delete("/api/products/:categoryType/:id", (req, res) => {
  const { categoryType, id } = req.params;
  const db = loadDb();

  if (!db.products[categoryType]) {
    return res.status(404).json({ success: false, message: "Category not found." });
  }

  db.products[categoryType] = db.products[categoryType].filter(
    (item) => String(item.id) !== String(id)
  );
  saveDb(db);

  res.json({ success: true, message: "Product removed from inventory." });
});

// Reset Products
app.post("/api/products/reset", (req, res) => {
  const db = loadDb();
  db.products = { women: [], men: [], accessories: [], jewellery: [] };
  db.heroBanners = { home: "", women: "", men: "", jewellery: "", accessories: "" };
  saveDb(db);
  res.json({ success: true, message: "Backend catalog reset to initial default placeholders." });
});

// ==========================================
// 4. ORDERS & PAYMENT SIMULATION GATEWAY
// ==========================================

// Process Payment & Create Order
app.post("/api/orders/checkout", (req, res) => {
  const { cart, profile, address, paymentMethod, paymentDetails, total } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ success: false, message: "Bag is empty. Cannot process checkout." });
  }

  const db = loadDb();
  const orderId = `SC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  // Log Payment Transaction
  const paymentRecord = {
    transactionId,
    orderId,
    amount: total,
    method: paymentMethod || "card",
    cardLast4: paymentDetails?.cardNumber ? paymentDetails.cardNumber.slice(-4) : "8899",
    upiId: paymentDetails?.upiId || null,
    bank: paymentDetails?.bank || null,
    status: "SUCCESS",
    timestamp: new Date().toISOString(),
  };

  db.paymentLogs.unshift(paymentRecord);

  // Decrement Stock in Backend Catalog if exists
  const purchasedItems = cart.map((item) => {
    const qty = item.quantity || 1;

    // Attempt to decrement in any category
    ["women", "men", "accessories", "jewellery"].forEach((cat) => {
      const match = (db.products[cat] || []).find((p) => String(p.id) === String(item.id));
      if (match) {
        match.stock = Math.max(0, (match.stock ?? 10) - qty);
      }
    });

    return {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: qty,
      size: item.size || "M",
      image: item.image,
    };
  });

  // Create Order Object
  const order = {
    id: orderId,
    transactionId,
    customer: {
      name: profile?.name || address?.fullName || "Valued Royal Patron",
      email: profile?.email || "concierge@shaan.in",
      phone: profile?.phone || address?.phone || "9876543210",
    },
    shippingAddress: address || {},
    items: purchasedItems,
    itemCount: purchasedItems.reduce((acc, it) => acc + it.quantity, 0),
    totalAmount: total,
    paymentMethod: paymentMethod || "Credit Card",
    paymentStatus: "CONFIRMED_PAID",
    orderStatus: "ATELIER_PROCESSING",
    estimatedDelivery: "4-7 Business Days (Royal Insured Express)",
    createdAt: new Date().toISOString(),
  };

  db.orders.unshift(order);
  saveDb(db);

  console.log(`[ORDER] Order ${orderId} placed for ₹${total} by ${order.customer.name}`);

  return res.json({
    success: true,
    orderId,
    transactionId,
    order,
    message: "Order placed and payment authorized by Royal Gateway.",
  });
});

// List All Orders (Admin & Audit)
app.get("/api/orders", (req, res) => {
  const db = loadDb();
  res.json({
    success: true,
    count: db.orders.length,
    orders: db.orders,
  });
});

// Get Single Order
app.get("/api/orders/:id", (req, res) => {
  const db = loadDb();
  const order = db.orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found." });
  }
  res.json({ success: true, order });
});

// List Payment Logs
app.get("/api/payments", (req, res) => {
  const db = loadDb();
  res.json({
    success: true,
    count: db.paymentLogs.length,
    payments: db.paymentLogs,
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`👑 THE SHAAN COLLECTIVE - ROYAL TESTING BACKEND ACTIVE`);
  console.log(`⚡ Listening on: http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});
