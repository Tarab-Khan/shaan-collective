import { useWishlist } from "../context/WishlistContext";

function WishlistButton({ product, wishlistId }) {
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const id =
    wishlistId ??
    (
      product.gender === "Men"
        ? `men-${product.id}`
        : product.category === "Jewellery"
        ? `jewellery-${product.id}`
        : product.category === "Accessories"
        ? `accessory-${product.id}`
        : `gharara-${product.id}`
    );

  const liked = isInWishlist(id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const wishlistProduct = {
      ...product,
      id,
    };

    if (liked) {
      removeFromWishlist(id);
    } else {
      addToWishlist(wishlistProduct);
    }
  };

  return (
    <button
      type="button"
      onClick={handleWishlist}
      aria-label={
        liked
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
      className={`absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border text-xl transition-all duration-300 ${
        liked
          ? "border-[#dfba6a] bg-[#dfba6a] text-[#070605] shadow-[0_0_15px_rgba(250,227,157,0.6)]"
          : "border-[#dfba6a]/70 bg-[#070605]/80 text-[#fae39d] hover:bg-[#dfba6a] hover:text-[#070605]"
      }`}
    >
      {liked ? "♥" : "♡"}
    </button>
  );
}

export default WishlistButton;