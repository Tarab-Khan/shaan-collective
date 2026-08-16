import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SizeGuideModal from "../components/SizeGuideModal";

function AccessoryDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { accessoryProducts } = useProducts();
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(() => {
    return sessionStorage.getItem(`accessory_size_${id}`) || "";
  });
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedSize) {
      sessionStorage.setItem(`accessory_size_${id}`, selectedSize);
    }
  }, [selectedSize, id]);

  const product = (accessoryProducts || []).find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-[#070605] text-[#e8dbbf]">
        <Navbar />

        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">

          <p className="text-xs tracking-[0.4em] text-[#fae39d]">
            THE SHAAN COLLECTIVE
          </p>

          <h1 className="mt-6 font-serif text-5xl text-[#fae39d]">
            Product Not Found
          </h1>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-8 text-[10px] tracking-[0.3em] text-[#fae39d] transition hover:text-[#ffffff]"
          >
            {location.state?.fromMain
              ? "← BACK"
              : "← BACK TO ACCESSORIES"}
          </button>

        </div>
      </main>
    );
  }

  const wishlistId = `accessory-${product.id}`;
  const liked = isInWishlist(wishlistId);

  const price = new Intl.NumberFormat("en-IN").format(
    product.price
  );

  const handleWishlist = () => {
    if (liked) {
      removeFromWishlist(wishlistId);
    } else {
      addToWishlist({
        ...product,
        id: wishlistId,
      });
    }
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart(product, selectedSize);

    alert(
      `${product.name} - Size ${selectedSize} added to bag`
    );
  };

  return (
    <main className="min-h-screen bg-[#070605] text-[#e8dbbf]">

      <Navbar />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-36 md:grid-cols-2 md:px-10">

        {/* IMAGE */}

        <div className="relative aspect-[3/4] overflow-hidden border border-[#dfba6a]/30 bg-[#0e0c0a]">

          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />

          {/* WISHLIST */}

          <button
            type="button"
            onClick={handleWishlist}
            aria-label={
              liked
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            className={`absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
              liked
                ? "border-[#dfba6a] bg-[#dfba6a] text-[#070605]"
                : "border-[#dfba6a]/70 bg-[#070605]/80 text-[#fae39d] backdrop-blur-sm hover:bg-[#dfba6a] hover:text-[#070605]"
            }`}
          >
            <span className="text-xl">
              {liked ? "♥" : "♡"}
            </span>
          </button>

        </div>

        {/* INFORMATION */}

        <div className="flex flex-col justify-center">

          {/* BACK */}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-fit text-left text-[10px] tracking-[0.3em] text-[#fae39d] transition hover:text-[#ffffff]"
          >
            {location.state?.fromMain
              ? "← BACK"
              : "← BACK TO ACCESSORIES"}
          </button>

          {/* CATEGORY */}

          <p className="mt-10 text-[10px] tracking-[0.4em] text-[#fae39d]">
            {product.category.toUpperCase()}
          </p>

          {/* NAME */}

          <h1 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#fae39d]">
            {product.name}
          </h1>

          {/* PRICE & STOCK BADGE */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-lg tracking-widest text-[#eed9a4]">
              ₹ {price}
            </p>

            {/* LIVE STOCK BADGE */}
            {product.stock !== undefined && (
              <span
                className={`border px-3 py-1 text-[10px] tracking-wider uppercase font-semibold ${
                  product.stock <= 0
                    ? "border-[#e53e3e] bg-[#e53e3e]/20 text-[#e53e3e]"
                    : product.stock <= 3
                    ? "border-[#f6ad55] bg-[#f6ad55]/20 text-[#f6ad55]"
                    : "border-[#dfba6a]/40 bg-[#dfba6a]/10 text-[#fae39d]"
                }`}
              >
                {product.stock <= 0
                  ? "SOLD OUT"
                  : product.stock <= 3
                  ? `⚡ ONLY ${product.stock} LEFT IN VAULT`
                  : `✦ IN STOCK (${product.stock} AVAILABLE)`}
              </span>
            )}
          </div>

          <div className="my-10 h-px w-full bg-[#dfba6a]/20" />

          {/* SIZE */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs tracking-[0.25em] text-[#fae39d]">
                SELECT SIZE
              </p>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-1.5 text-[11px] tracking-[0.2em] text-[#dfba6a] transition hover:text-[#fae39d]"
              >
                <span>📏</span>
                <span className="underline underline-offset-4">SIZE GUIDE</span>
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {(product.sizes || ["XS", "S", "M", "L", "XL", "Free Size"]).map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-12 ${size === "Free Size" || size === "One Size" ? "min-w-28 px-4" : "min-w-14 px-3"} border text-xs font-semibold transition ${
                    selectedSize === size
                      ? "border-[#fae39d] bg-[#dfba6a] text-[#070605]"
                      : "border-[#dfba6a]/40 bg-[#070605] text-[#e8dbbf] hover:border-[#fae39d] hover:bg-[#dfba6a] hover:text-[#070605]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO BAG */}
          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={handleAddToBag}
            className={`mt-10 w-full border py-5 text-xs tracking-[0.35em] font-extrabold transition ${
              product.stock <= 0
                ? "border-neutral-700 bg-neutral-900 text-neutral-500 cursor-not-allowed"
                : "border-[#dfba6a] bg-[#dfba6a] !text-[#070605] hover:bg-[#fae39d] hover:!text-[#000000]"
            }`}
          >
            {product.stock <= 0 ? "SOLD OUT" : "ADD TO BAG"}
          </button>

          {/* DETAILS */}

          <div className="mt-12 space-y-8 border-t border-[#dfba6a]/20 pt-8">

            <div>

              <p className="text-xs tracking-[0.25em] text-[#fae39d]">
                DESCRIPTION
              </p>

              <p className="mt-4 text-sm leading-7 text-[#c4b28f]">
                {product.description || "Carefully crafted accessory designed to complement your celebration wardrobe."}
              </p>

            </div>

            <div>

              <p className="text-xs tracking-[0.25em] text-[#fae39d]">
                DELIVERY
              </p>

              <p className="mt-4 text-sm leading-7 text-[#c4b28f]">
                Made with care and prepared for delivery
                after your order is confirmed.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* SIZE GUIDE MODAL */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        initialCategory="accessories"
      />

      <Footer />

    </main>
  );
}

export default AccessoryDetails;