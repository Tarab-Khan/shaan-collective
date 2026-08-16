import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import shaanLogo from "../assets/shaan-logo.png";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import AuthModal from "./AuthModal";
import { GoldFlower, GoldSparkle } from "./GoldDecorations";

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21c.7-4 3-6 7-6s6.3 2 7 6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
    >
      <path d="M20.8 8.8c0 5.5-8.8 10.4-8.8 10.4S3.2 14.3 3.2 8.8C3.2 6 5.2 4 7.8 4c1.8 0 3.3.9 4.2 2.3C12.9 4.9 14.4 4 16.2 4c2.6 0 4.6 2 4.6 4.8Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
    >
      <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 1.9-1.4L21 8H6" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className="h-6 w-6"
    >
      <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
    </svg>
  );
}

function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = location.pathname;

  const isHome = pathname === "/";
  const isWomen = pathname.startsWith("/ghararas") || pathname.startsWith("/women");
  const isMen = pathname.startsWith("/men");
  const isJewellery = pathname.startsWith("/jewellery");
  const isAccessories = pathname.startsWith("/accessories");

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  const navLinks = [
    { label: "HOME", path: "/", active: isHome },
    { label: "WOMEN", path: "/ghararas", active: isWomen },
    { label: "MEN", path: "/men", active: isMen },
    { label: "JEWELLERY", path: "/jewellery", active: isJewellery },
    { label: "ACCESSORIES", path: "/accessories", active: isAccessories },
  ];

  return (
    <>
      <nav
        className={`fixed left-0 top-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? "border-b border-[#dfba6a]/30 bg-[#070605]/92 text-[#dfba6a] shadow-[0_4px_30px_rgba(0,0,0,0.85)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent text-[#dfba6a] shadow-none backdrop-blur-none"
        }`}
      >
        <div className="mx-auto flex h-20 sm:h-24 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">

          {/* LEFT: MOBILE HAMBURGER BUTTON (Mobile / Tablet) */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="flex h-10 w-10 items-center justify-center text-[#fae39d] transition-colors hover:text-[#ffffff]"
            >
              <HamburgerIcon />
            </button>
          </div>

          {/* LOGO */}
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={shaanLogo}
              alt="The Shaan Collective"
              className="h-11 sm:h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(223,186,106,0.35)]"
            />
          </Link>

          {/* MAIN DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-8 xl:gap-10 lg:flex">
            {navLinks.map((link) => (
              <div key={link.label} className="relative py-2 flex flex-col items-center">
                <Link
                  to={link.path}
                  onClick={() => window.scrollTo(0, 0)}
                  className={`text-[10px] tracking-[0.28em] transition-colors ${
                    link.active ? "text-[#ffffff] font-bold" : "text-[#fae39d] hover:text-[#ffffff]"
                  }`}
                >
                  {link.label}
                </Link>
                {link.active && (
                  <span className="absolute bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#fae39d] to-transparent shadow-[0_0_8px_rgba(250,227,157,0.8)]" />
                )}
              </div>
            ))}
          </div>

          {/* ACTION ICONS */}
          <div className="flex items-center gap-3 sm:gap-5 text-[#dfba6a]">

            {/* ACCOUNT (Opens Login / Account Modal) */}
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              aria-label="Account"
              className="flex h-9 w-9 items-center justify-center transition-all duration-300 hover:scale-110 hover:text-[#fae39d]"
            >
              <UserIcon />
            </button>

            {/* WISHLIST */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative flex h-9 w-9 items-center justify-center transition-all duration-300 hover:scale-110 hover:text-[#fae39d]"
            >
              <HeartIcon />

              {wishlistCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#dfba6a] px-1 text-[8px] font-semibold text-[#070605] shadow-[0_0_10px_rgba(250,227,157,0.7)]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* CART */}
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative flex h-9 w-9 items-center justify-center transition-all duration-300 hover:scale-110 hover:text-[#fae39d]"
            >
              <CartIcon />

              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#dfba6a] px-1 text-[8px] font-semibold text-[#070605] shadow-[0_0_10px_rgba(250,227,157,0.7)]">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      </nav>

      {/* =========================================
          MOBILE & TABLET NAVIGATION DRAWER
      ========================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* BACKDROP */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* DRAWER PANEL */}
          <div className="relative z-10 flex h-full w-[85%] max-w-sm flex-col justify-between overflow-y-auto border-r border-[#dfba6a]/30 bg-[#0c0a08] p-6 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
            <div>
              {/* DRAWER HEADER */}
              <div className="flex items-center justify-between border-b border-[#dfba6a]/20 pb-5">
                <div className="flex items-center gap-3">
                  <GoldFlower size={14} />
                  <span className="text-[10px] tracking-[0.4em] text-[#fae39d]">
                    THE SHAAN COLLECTIVE
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-8 w-8 items-center justify-center text-lg text-[#dfba6a] hover:text-[#fae39d]"
                >
                  ✕
                </button>
              </div>

              {/* BRAND LOGO */}
              <div className="py-6 text-center border-b border-[#dfba6a]/15">
                <img
                  src={shaanLogo}
                  alt="The Shaan Collective"
                  className="mx-auto h-16 w-auto object-contain"
                />
                <p className="mt-3 font-serif text-xs italic tracking-widest text-[#c4b28f]">
                  Where Royalty Lives
                </p>
              </div>

              {/* NAVIGATION LINKS */}
              <div className="mt-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 text-xs tracking-[0.25em] transition-all ${
                      link.active
                        ? "border-l-2 border-[#fae39d] bg-[#dfba6a]/10 text-[#ffffff] font-bold"
                        : "text-[#fae39d] hover:bg-[#dfba6a]/5 hover:text-[#ffffff]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-[#dfba6a]/60">→</span>
                  </Link>
                ))}
              </div>

              {/* ADDITIONAL ESSENTIAL LINKS */}
              <div className="mt-8 border-t border-[#dfba6a]/15 pt-6 space-y-2.5">
                <p className="px-4 text-[9px] tracking-[0.35em] text-[#8e7a5c] uppercase">
                  Atelier & Care
                </p>
                <Link
                  to="/size-guide"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-xs tracking-[0.2em] text-[#c4b28f] hover:text-[#fae39d]"
                >
                  📏 SIZE GUIDE
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-xs tracking-[0.2em] text-[#c4b28f] hover:text-[#fae39d]"
                >
                  ✦ ABOUT US
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-xs tracking-[0.2em] text-[#c4b28f] hover:text-[#fae39d]"
                >
                  ✉ CONTACT & CONCIERGE
                </Link>
                <Link
                  to="/shipping"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-xs tracking-[0.2em] text-[#c4b28f] hover:text-[#fae39d]"
                >
                  ✈ SHIPPING & DELIVERY
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-xs tracking-[0.2em] text-[#dfba6a] hover:text-[#fae39d]"
                >
                  ⚙ ATELIER ADMIN VAULT
                </Link>
              </div>
            </div>

            {/* DRAWER FOOTER */}
            <div className="mt-8 border-t border-[#dfba6a]/20 pt-6">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthOpen(true);
                }}
                className="w-full border border-[#dfba6a] bg-[#dfba6a] py-3 text-center text-xs font-extrabold tracking-[0.25em] !text-[#070605] transition hover:bg-[#fae39d]"
              >
                ACCOUNT / LOGIN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LUXURY GOLDEN AUTH / LOGIN MODAL */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}

export default Navbar;