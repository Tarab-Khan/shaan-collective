import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton";

function ProductCard({ product, link, wishlistId, showNewTag = false }) {
  const price = new Intl.NumberFormat("en-IN").format(product.price);

  return (
    <article className="group">
      <div className="overflow-hidden">

        {/* PRODUCT IMAGE */}
        <div className="relative aspect-3/4 overflow-hidden border border-[#dfba6a]/30 bg-[#0e0c0a]">

          <Link to={link || `/ghararas/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {/* NEW ARRIVAL TAG */}
          {showNewTag && product?.isNewArrival && (
            <span className="absolute left-4 top-4 z-10 border border-[#dfba6a]/60 bg-[#070605]/90 px-2.5 py-1 text-[9px] font-bold tracking-[0.25em] text-[#fae39d] shadow-[0_0_12px_rgba(223,186,106,0.35)] backdrop-blur-sm">
              NEW
            </span>
          )}

          {/* WISHLIST */}
          <WishlistButton
            product={product}
            wishlistId={wishlistId}
          />

          {/* VIEW PRODUCT */}
          <Link
            to={link || `/ghararas/${product.id}`}
            className="absolute bottom-0 left-0 right-0 z-10 translate-y-full border-t border-[#dfba6a]/60 bg-[#070605]/95 py-4 text-center text-[10px] tracking-[0.3em] text-[#fae39d] transition-transform duration-500 group-hover:translate-y-0"
          >
            VIEW PRODUCT
          </Link>

        </div>

        {/* PRODUCT INFORMATION */}
        <Link to={link || `/ghararas/${product.id}`}>
          <div className="border-x border-b border-[#dfba6a]/20 bg-[#0e0c0a] px-4 pb-5 pt-4">

            <p className="text-[9px] tracking-[0.3em] text-[#fae39d]">
              {product.category.toUpperCase()}
            </p>

            <h3 className="mt-2 font-serif text-xl text-[#fae39d] transition-colors group-hover:text-[#ffffff]">
              {product.name}
            </h3>

            <p className="mt-2 text-sm tracking-widest text-[#eed9a4]">
              ₹ {price}
            </p>

          </div>
        </Link>

      </div>
    </article>
  );
}

export default ProductCard;