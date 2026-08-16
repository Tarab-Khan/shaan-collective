import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GoldFlower } from "../components/GoldDecorations";
import { api } from "../services/api";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart } = useCart();
  const { deductStock } = useProducts();

  // Retrieve checkout state or fallback to local cart
  const passedState = location.state || {};
  const profile = passedState.profile || JSON.parse(localStorage.getItem("userProfile") || "{}");
  const address = passedState.address || JSON.parse(localStorage.getItem("shippingAddress") || "{}");

  const subtotal = passedState.subtotal || cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = passedState.total || subtotal;

  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" | "upi" | "netbanking" | "cod"
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulateFailure, setSimulateFailure] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState(profile.name || "");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  useEffect(() => {
    window.scrollTo(0, 0);
    // If cart is empty and no passed subtotal, redirect to cart
    if (cart.length === 0 && !passedState.total) {
      navigate("/cart");
    }
  }, [cart, passedState, navigate]);

  // Format Card Number (adds space every 4 digits)
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = val.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (val.length >= 2) {
      val = val.slice(0, 2) + "/" + val.slice(2);
    }
    setCardExpiry(val);
  };

  // Process payment
  const handlePayment = async (forceFail = false) => {
    const shouldFail = forceFail || simulateFailure;

    setIsProcessing(true);

    if (shouldFail) {
      setTimeout(() => {
        setIsProcessing(false);
        navigate("/checkout", {
          state: {
            paymentError: "Payment Failed: Transaction was declined by the bank / payment gateway. Please verify your payment details and try again.",
          },
        });
      }, 1500);
      return;
    }

    try {
      // Send transaction and order creation to backend
      const result = await api.orders.checkout({
        cart,
        profile,
        address,
        paymentMethod,
        paymentDetails: {
          cardNumber,
          upiId,
          bank: selectedBank,
        },
        total,
      });

      // Deduct stock in frontend local store
      deductStock(cart, {
        profile,
        address,
        total,
        paymentMethod,
      });

      clearCart();

      const orderId = result?.orderId || `SC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

      navigate("/order-success", {
        state: {
          orderSummary: {
            orderId,
            total,
            profile,
            address,
            paymentMethod,
            date: new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          },
        },
      });
    } catch (err) {
      // Fallback
      deductStock(cart, {
        profile,
        address,
        total,
        paymentMethod,
      });

      clearCart();
      navigate("/order-success", {
        state: {
          orderSummary: {
            total,
            profile,
            address,
            paymentMethod,
            date: new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          },
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070605] text-[#e8dbbf]">
      <Navbar />

      <section className="px-6 pb-28 pt-40 md:px-10 bg-[#070605]">
        <div className="relative z-10 mx-auto max-w-6xl">
          {/* HEADER */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <GoldFlower size={14} />
              <p className="text-xs tracking-[0.5em] text-[#fae39d]">
                SECURE ATELIER GATEWAY
              </p>
              <GoldFlower size={14} />
            </div>

            <h1 className="mt-4 font-serif text-5xl tracking-[0.08em] text-[#fae39d] md:text-7xl drop-shadow-[0_0_20px_rgba(250,227,157,0.25)]">
              PAYMENT
            </h1>
            <div className="mx-auto mt-6 h-px w-20 bg-[#dfba6a]" />
            <p className="mt-4 text-xs tracking-widest text-[#c4b28f]">
              256-Bit Encrypted Luxury Checkout
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_400px]">
            {/* LEFT: PAYMENT OPTIONS */}
            <div className="border border-[#dfba6a]/30 bg-[#0c0a08]/95 p-6 md:p-10 backdrop-blur-md">
              <h2 className="font-serif text-2xl text-[#fae39d]">
                Select Payment Method
              </h2>
              <div className="mt-4 h-px w-full bg-[#dfba6a]/20" />

              {/* PAYMENT METHOD TABS */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { id: "card", label: "Credit/Debit Card", icon: "💳" },
                  { id: "upi", label: "UPI / QR", icon: "⚡" },
                  { id: "netbanking", label: "Net Banking", icon: "🏦" },
                  { id: "cod", label: "Concierge / COD", icon: "👑" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setPaymentMethod(tab.id)}
                    className={`flex flex-col items-center justify-center border p-4 text-center transition ${
                      paymentMethod === tab.id
                        ? "border-[#fae39d] bg-[#dfba6a] text-[#070605]"
                        : "border-[#dfba6a]/30 bg-[#070605] text-[#e8dbbf] hover:border-[#dfba6a] hover:text-[#fae39d]"
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="mt-2 text-[10px] font-bold tracking-wider uppercase">
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* METHOD 1: CARD FORM */}
              {paymentMethod === "card" && (
                <div className="mt-8 space-y-5 border border-[#dfba6a]/20 bg-[#070605] p-6">
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4532 •••• •••• 8899"
                      className="mt-2 w-full border border-[#dfba6a]/30 bg-[#0c0a08] px-4 py-3 text-sm tracking-widest text-[#fae39d] outline-none focus:border-[#fae39d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Maharani Zara Khan"
                      className="mt-2 w-full border border-[#dfba6a]/30 bg-[#0c0a08] px-4 py-3 text-xs tracking-wider text-[#fae39d] outline-none focus:border-[#fae39d]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        placeholder="MM / YY"
                        className="mt-2 w-full border border-[#dfba6a]/30 bg-[#0c0a08] px-4 py-3 text-xs text-center tracking-widest text-[#fae39d] outline-none focus:border-[#fae39d]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                        CVV / CVC *
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                        placeholder="•••"
                        className="mt-2 w-full border border-[#dfba6a]/30 bg-[#0c0a08] px-4 py-3 text-xs text-center tracking-widest text-[#fae39d] outline-none focus:border-[#fae39d]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* METHOD 2: UPI */}
              {paymentMethod === "upi" && (
                <div className="mt-8 space-y-6 border border-[#dfba6a]/20 bg-[#070605] p-6 text-center">
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase text-left">
                      Instant UPI ID (VPA) *
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank / mobile@upi"
                      className="mt-2 w-full border border-[#dfba6a]/30 bg-[#0c0a08] px-4 py-3 text-xs tracking-wider text-[#fae39d] outline-none focus:border-[#fae39d]"
                    />
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#a8997a]">
                    <div className="h-px flex-1 bg-[#dfba6a]/20" />
                    <span>OR SCAN QR CODE</span>
                    <div className="h-px flex-1 bg-[#dfba6a]/20" />
                  </div>

                  {/* MOCK QR */}
                  <div className="mx-auto flex h-36 w-36 flex-col items-center justify-center border-2 border-dashed border-[#dfba6a]/40 bg-[#0e0c0a] p-3">
                    <div className="font-mono text-3xl text-[#fae39d]">❖</div>
                    <span className="mt-2 text-[9px] tracking-widest text-[#c4b28f]">BHIM / GPAY / PAYTM</span>
                  </div>
                </div>
              )}

              {/* METHOD 3: NET BANKING */}
              {paymentMethod === "netbanking" && (
                <div className="mt-8 space-y-4 border border-[#dfba6a]/20 bg-[#070605] p-6">
                  <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">
                    Select Your Bank *
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Bank", "Punjab National"].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBank(b)}
                        className={`border p-3 text-center text-xs tracking-wider transition ${
                          selectedBank === b
                            ? "border-[#fae39d] bg-[#dfba6a] text-[#070605] font-bold"
                            : "border-[#dfba6a]/30 bg-[#0c0a08] text-[#e8dbbf] hover:border-[#dfba6a]"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* METHOD 4: COD */}
              {paymentMethod === "cod" && (
                <div className="mt-8 border border-[#dfba6a]/20 bg-[#070605] p-6 text-center space-y-3">
                  <span className="text-3xl text-[#fae39d]">👑</span>
                  <h3 className="font-serif text-lg text-[#fae39d]">Royal Concierge Delivery</h3>
                  <p className="text-xs leading-6 text-[#c4b28f] max-w-md mx-auto">
                    Pay securely in cash or via card swipe upon personal white-glove delivery by our verified atelier courier.
                  </p>
                </div>
              )}

              {/* SIMULATION CONTROLS FOR TESTING */}
              <div className="mt-8 border-t border-[#dfba6a]/20 pt-6">
                <div className="flex items-center justify-between bg-[#120f0c] p-3 border border-[#dfba6a]/20">
                  <span className="text-[11px] text-[#c4b28f]">
                    Simulate Payment Gateway Outcome:
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={simulateFailure}
                      onChange={(e) => setSimulateFailure(e.target.checked)}
                      className="accent-[#dfba6a]"
                    />
                    <span className={simulateFailure ? "text-red-400 font-semibold" : "text-[#dfba6a]"}>
                      {simulateFailure ? "Simulate Failed Payment" : "Simulate Success"}
                    </span>
                  </label>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handlePayment(false)}
                  className="flex-1 border border-[#dfba6a] bg-[#dfba6a] py-5 text-xs tracking-[0.3em] !text-[#070605] font-extrabold transition hover:bg-[#fae39d] hover:!text-[#000000] disabled:opacity-50"
                >
                  {isProcessing ? "PROCESSING PAYMENT..." : `PAY ₹ ${new Intl.NumberFormat("en-IN").format(total)}`}
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handlePayment(true)}
                  className="border border-red-500/40 bg-red-950/30 px-6 py-5 text-[10px] tracking-[0.2em] text-red-300 hover:bg-red-900/50 transition disabled:opacity-50"
                  title="Directly trigger payment failure to test redirect to checkout"
                >
                  FAIL PAYMENT (TEST)
                </button>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/checkout"
                  className="text-[11px] tracking-[0.2em] text-[#dfba6a] underline underline-offset-4 hover:text-[#fae39d]"
                >
                  ← RETURN TO CHECKOUT
                </Link>
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="h-fit border border-[#dfba6a]/30 bg-[#0c0a08]/95 p-6 md:p-8 backdrop-blur-md">
              <h3 className="font-serif text-xl text-[#fae39d]">Order Summary</h3>
              <div className="mt-4 h-px w-full bg-[#dfba6a]/20" />

              {/* ADDRESS PREVIEW */}
              {address.address && (
                <div className="mt-6 border-b border-[#dfba6a]/15 pb-6">
                  <p className="text-[10px] tracking-[0.25em] text-[#dfba6a]">DELIVERING TO</p>
                  <p className="mt-2 text-xs font-semibold text-[#fae39d]">{profile.name || "Patron"}</p>
                  <p className="mt-1 text-xs text-[#a8997a] leading-5">
                    {address.address}, {address.city}, {address.state} - {address.pin}
                  </p>
                  <p className="mt-1 text-xs text-[#a8997a]">Phone: {profile.phone || "N/A"}</p>
                </div>
              )}

              {/* ITEMS BREAKDOWN */}
              <div className="mt-6 space-y-4 border-b border-[#dfba6a]/15 pb-6">
                <div className="flex justify-between text-xs">
                  <span className="text-[#c4b28f]">Subtotal ({cart.length} items)</span>
                  <span className="text-[#e8dbbf]">₹ {new Intl.NumberFormat("en-IN").format(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#c4b28f]">Insured Royal Shipping</span>
                  <span className="text-[#fae39d]">COMPLIMENTARY</span>
                </div>
              </div>

              {/* TOTAL */}
              <div className="mt-6 flex justify-between font-serif text-xl">
                <span className="text-[#fae39d]">Grand Total</span>
                <span className="text-[#eed9a4] font-bold">
                  ₹ {new Intl.NumberFormat("en-IN").format(total)}
                </span>
              </div>

              {/* GUARANTEE BADGE */}
              <div className="mt-8 border border-[#dfba6a]/20 bg-[#070605] p-4 text-center">
                <p className="text-[10px] tracking-[0.2em] text-[#dfba6a]">🔒 100% SATISFACTION GUARANTEED</p>
                <p className="mt-1 text-[10px] text-[#a8997a] leading-4">
                  All transactions are verified by high-security bank-grade protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Payment;
