import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";

function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const paymentError = location.state?.paymentError;

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editingContact, setEditingContact] = useState(false);

  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    pin: "",
  });

  const [editingAddress, setEditingAddress] = useState(false);

  /* =========================================
     LOAD SAVED USER & ADDRESS INFORMATION
  ========================================= */

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");

    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile({
          name: parsed.name || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
        });

        // Try to fetch user's saved addresses from backend
        if (parsed.phone) {
          api.addresses.get(parsed.phone).then((res) => {
            if (res?.addresses && res.addresses.length > 0) {
              const defAddr = res.addresses[0];
              setAddress({
                address: defAddr.houseNo || defAddr.address || "",
                city: defAddr.city || "",
                state: defAddr.state || "",
                pin: defAddr.pincode || defAddr.pin || "",
              });
            }
          }).catch(() => {});
        }
      } catch {
        localStorage.removeItem("userProfile");
      }
    }

    const savedAddress = localStorage.getItem("shippingAddress");

    if (savedAddress) {
      try {
        const parsed = JSON.parse(savedAddress);
        setAddress((prev) => ({
          address: parsed.address || parsed.houseNo || prev.address,
          city: parsed.city || prev.city,
          state: parsed.state || prev.state,
          pin: parsed.pin || parsed.pincode || prev.pin,
        }));
      } catch {
        localStorage.removeItem("shippingAddress");
      }
    }
  }, []);

  /* =========================================
     HANDLE CONTACT SAVE
  ========================================= */

  const saveContact = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!profile.name || !profile.email || !profile.phone) {
      alert("Please fill in all contact details");
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(profile));
    api.auth.updateProfile(profile).catch(() => {});
    setEditingContact(false);
  };

  /* =========================================
     HANDLE ADDRESS SAVE
  ========================================= */

  const saveAddress = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pin
    ) {
      alert("Please fill in all address details");
      return;
    }

    localStorage.setItem("shippingAddress", JSON.stringify(address));

    // Save to backend database
    api.addresses.save({
      fullName: profile.name || "Royal Patron",
      phone: profile.phone || "9876543210",
      houseNo: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pin,
    }).catch(() => {});

    setEditingAddress(false);
  };

  /* =========================================
     PROCEED TO PAYMENT
  ========================================= */

  const proceedToPayment = () => {
    if (!profile.name || !profile.email || !profile.phone) {
      alert("Please complete your contact details");
      return;
    }

    if (
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pin
    ) {
      alert("Please complete your shipping address");
      return;
    }

    // Save latest profile & address
    localStorage.setItem("userProfile", JSON.stringify(profile));
    localStorage.setItem("shippingAddress", JSON.stringify(address));

    // Sync address to backend
    api.addresses.save({
      fullName: profile.name,
      phone: profile.phone,
      houseNo: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pin,
    }).catch(() => {});

    // Navigate to /payment with order data
    navigate("/payment", {
      state: {
        profile,
        address,
        subtotal,
        total,
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#070605] text-[#e8dbbf]">
      <Navbar />

      <section className="px-6 pb-28 pt-40 md:px-10 bg-[#070605]">
        <div className="relative z-10 mx-auto max-w-7xl">
          {/* =========================================
              HEADER
          ========================================= */}
          <div className="text-center">
            <p className="text-xs tracking-[0.5em] text-[#fae39d]">
              THE SHAAN COLLECTIVE
            </p>

            <h1 className="mt-5 font-serif text-5xl tracking-[0.08em] text-[#fae39d] md:text-7xl drop-shadow-[0_0_20px_rgba(250,227,157,0.25)]">
              CHECKOUT
            </h1>

            <div className="mx-auto mt-6 h-px w-20 bg-[#dfba6a]" />
          </div>

          {/* PAYMENT ERROR ALERT */}
          {paymentError && (
            <div className="mx-auto mt-10 max-w-3xl border border-red-500/70 bg-red-950/60 p-6 text-center shadow-[0_0_35px_rgba(239,68,68,0.3)] backdrop-blur-md">
              <span className="font-serif text-lg tracking-[0.2em] text-[#fae39d] uppercase">
                ⚠️ PAYMENT FAILED
              </span>
              <p className="mt-2 text-xs leading-6 text-red-200 tracking-wide">
                {paymentError}
              </p>
            </div>
          )}

          {/* =========================================
              EMPTY CART
          ========================================= */}
          {cart.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-serif text-3xl text-[#fae39d]">
                Your bag is empty
              </p>

              <Link
                to="/"
                onClick={() => window.scrollTo(0, 0)}
                className="mt-8 inline-block border-b border-[#dfba6a] pb-2 text-xs tracking-[0.3em] text-[#fae39d] transition hover:text-[#ffffff]"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          ) : (
            <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_420px]">
              {/* =========================================
                  CUSTOMER DETAILS
              ========================================= */}
              <div>
                {/* CONTACT INFORMATION */}
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-3xl text-[#fae39d]">
                    Contact Information
                  </h2>

                  <button
                    type="button"
                    onClick={() => setEditingContact(!editingContact)}
                    className="text-[10px] tracking-[0.25em] text-[#fae39d] transition hover:text-[#ffffff]"
                  >
                    {editingContact ? "CLOSE" : "EDIT"}
                  </button>
                </div>

                <div className="mt-8">
                  {editingContact ? (
                    <div className="space-y-6">
                      <input
                        type="text"
                        value={profile.name || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            name: e.target.value,
                          })
                        }
                        placeholder="FULL NAME"
                        className="w-full border-b border-[#dfba6a]/40 bg-transparent px-2 py-4 text-xs tracking-[0.2em] text-[#fae39d] outline-none placeholder:text-[#948060]"
                      />

                      <input
                        type="email"
                        value={profile.email || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            email: e.target.value,
                          })
                        }
                        placeholder="EMAIL ADDRESS"
                        className="w-full border-b border-[#dfba6a]/40 bg-transparent px-2 py-4 text-xs tracking-[0.2em] text-[#fae39d] outline-none placeholder:text-[#948060]"
                      />

                      <input
                        type="tel"
                        value={profile.phone || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            phone: e.target.value,
                          })
                        }
                        placeholder="PHONE NUMBER"
                        className="w-full border-b border-[#dfba6a]/40 bg-transparent px-2 py-4 text-xs tracking-[0.2em] text-[#fae39d] outline-none placeholder:text-[#948060]"
                      />

                      <button
                        type="button"
                        onClick={saveContact}
                        className="border-b border-[#dfba6a] pb-2 text-[10px] tracking-[0.25em] text-[#fae39d] transition hover:text-[#ffffff]"
                      >
                        SAVE CONTACT DETAILS
                      </button>
                    </div>
                  ) : (
                    <div className="border border-[#dfba6a]/20 bg-[#0e0c0a] p-6">
                      <p className="text-sm text-[#fae39d] font-serif">
                        {profile.name || "No name saved"}
                      </p>

                      <p className="mt-3 text-sm text-[#c4b28f]">
                        {profile.email || "No email saved"}
                      </p>

                      <p className="mt-3 text-sm text-[#c4b28f]">
                        {profile.phone || "No phone saved"}
                      </p>
                    </div>
                  )}
                </div>

                {/* =========================================
                    SHIPPING ADDRESS
                ========================================= */}
                <div className="mt-16 flex items-center justify-between">
                  <h2 className="font-serif text-3xl text-[#fae39d]">
                    Shipping Address
                  </h2>

                  <button
                    type="button"
                    onClick={() => setEditingAddress(!editingAddress)}
                    className="text-[10px] tracking-[0.25em] text-[#fae39d] transition hover:text-[#ffffff]"
                  >
                    {editingAddress ? "CLOSE" : "EDIT"}
                  </button>
                </div>

                <div className="mt-8">
                  {editingAddress ? (
                    <div className="space-y-6">
                      <input
                        type="text"
                        value={address.address || ""}
                        onChange={(e) =>
                          setAddress({
                            ...address,
                            address: e.target.value,
                          })
                        }
                        placeholder="ADDRESS"
                        className="w-full border-b border-[#dfba6a]/40 bg-transparent px-2 py-4 text-xs tracking-[0.2em] text-[#fae39d] outline-none placeholder:text-[#948060]"
                      />

                      <div className="grid gap-6 md:grid-cols-2">
                        <input
                          type="text"
                          value={address.city || ""}
                          onChange={(e) =>
                            setAddress({
                              ...address,
                              city: e.target.value,
                            })
                          }
                          placeholder="CITY"
                          className="border-b border-[#dfba6a]/40 bg-transparent px-2 py-4 text-xs tracking-[0.2em] text-[#fae39d] outline-none placeholder:text-[#948060]"
                        />

                        <input
                          type="text"
                          value={address.state || ""}
                          onChange={(e) =>
                            setAddress({
                              ...address,
                              state: e.target.value,
                            })
                          }
                          placeholder="STATE"
                          className="border-b border-[#dfba6a]/40 bg-transparent px-2 py-4 text-xs tracking-[0.2em] text-[#fae39d] outline-none placeholder:text-[#948060]"
                        />
                      </div>

                      <input
                        type="text"
                        value={address.pin || ""}
                        onChange={(e) =>
                          setAddress({
                            ...address,
                            pin: e.target.value,
                          })
                        }
                        placeholder="PIN CODE"
                        className="w-full border-b border-[#dfba6a]/40 bg-transparent px-2 py-4 text-xs tracking-[0.2em] text-[#fae39d] outline-none placeholder:text-[#948060]"
                      />

                      <button
                        type="button"
                        onClick={saveAddress}
                        className="border-b border-[#dfba6a] pb-2 text-[10px] tracking-[0.25em] text-[#fae39d] transition hover:text-[#ffffff]"
                      >
                        SAVE SHIPPING ADDRESS
                      </button>
                    </div>
                  ) : (
                    <div className="border border-[#dfba6a]/20 bg-[#0e0c0a] p-6">
                      <p className="text-sm text-[#fae39d] font-serif">
                        {address.address || "No address saved"}
                      </p>

                      <p className="mt-3 text-sm text-[#c4b28f]">
                        {address.city || "No city saved"}
                      </p>

                      <p className="mt-3 text-sm text-[#c4b28f]">
                        {address.state || "No state saved"}
                      </p>

                      <p className="mt-3 text-sm text-[#c4b28f]">
                        {address.pin || "No PIN code saved"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* =========================================
                  ORDER SUMMARY
              ========================================= */}
              <div className="h-fit border border-[#dfba6a]/30 bg-[#0e0c0a] p-8">
                <h2 className="font-serif text-2xl text-[#fae39d]">
                  Order Summary
                </h2>

                <div className="my-6 h-px w-full bg-[#dfba6a]/20" />

                {/* ITEMS LIST */}
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}`}
                      className="flex gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-16 border border-[#dfba6a]/30 object-cover"
                      />

                      <div className="flex-1">
                        <p className="font-serif text-sm text-[#fae39d]">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-[#c4b28f]">
                          SIZE: {item.selectedSize}
                        </p>

                        <p className="mt-1 text-xs text-[#c4b28f]">
                          QTY: {item.quantity}
                        </p>

                        <p className="mt-2 text-xs tracking-wider text-[#eed9a4]">
                          ₹{" "}
                          {new Intl.NumberFormat("en-IN").format(
                            item.price * item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="my-6 h-px w-full bg-[#dfba6a]/20" />

                {/* TOTALS */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#c4b28f]">SUBTOTAL</span>
                    <span className="text-[#e8dbbf]">
                      ₹ {new Intl.NumberFormat("en-IN").format(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#c4b28f]">SHIPPING</span>
                    <span className="text-[#fae39d]">FREE</span>
                  </div>

                  <div className="flex justify-between border-t border-[#dfba6a]/20 pt-5 font-serif text-xl">
                    <span className="text-[#fae39d]">TOTAL</span>
                    <span className="text-[#eed9a4] font-bold">
                      ₹ {new Intl.NumberFormat("en-IN").format(total)}
                    </span>
                  </div>
                </div>

                {/* PROCEED TO PAYMENT */}
                <button
                  type="button"
                  onClick={proceedToPayment}
                  className="mt-8 w-full border border-[#dfba6a] bg-[#dfba6a] py-5 text-xs tracking-[0.3em] !text-[#070605] font-extrabold transition hover:bg-[#fae39d] hover:!text-[#000000]"
                >
                  PROCEED TO PAYMENT
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Checkout;