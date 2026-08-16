import ProductCard from "./ProductCard";
import { ghararaProducts } from "../data/products";

function ProductGrid({ category = "All" }) {
  const products =
    category === "All"
      ? ghararaProducts
      : ghararaProducts.filter(
          (product) => product.category === category
        );

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          wishlistId={`gharara-${product.id}`}
        />

      ))}

    </div>
  );
}

export default ProductGrid;