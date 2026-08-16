import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  return (
    <main className="min-h-screen bg-[#070605] text-[#e8dbbf]">

      <Navbar />

      {/* =========================================
          HEADER
      ========================================= */}

      <section className="bg-[#070605] px-6 pb-16 pt-36 text-center border-b border-[#dfba6a]/20">

        <div className="mx-auto max-w-7xl">

          <p className="text-xs tracking-[0.5em] text-[#fae39d]">
            YOUR SAVED COLLECTION
          </p>

          <h1 className="mt-4 font-serif text-5xl tracking-[0.08em] text-[#fae39d] md:text-7xl">
            WISHLIST
          </h1>

          <div className="mx-auto mt-6 h-px w-20 bg-[#dfba6a]" />

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 tracking-widest text-[#c4b28f]">
            Pieces you've saved for your next special moment.
          </p>

        </div>

      </section>

      {/* =========================================
          CONTENT
      ========================================= */}

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">

        {wishlist.length === 0 ? (

          /* EMPTY WISHLIST */

          <div className="flex min-h-[500px] flex-col items-center justify-center text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#dfba6a]/40 text-4xl text-[#fae39d]">
              ♡
            </div>

            <h2 className="mt-8 font-serif text-4xl text-[#fae39d]">
              Your wishlist is empty
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#c4b28f]">
              Save the pieces you love and return to them
              whenever you are ready.
            </p>

            <Link
              to="/ghararas"
              className="mt-8 border border-[#dfba6a] bg-[#dfba6a] px-10 py-4 text-xs tracking-[0.3em] !text-[#070605] font-extrabold transition hover:bg-[#fae39d] hover:!text-[#000000]"
            >
              EXPLORE GHARARAS
            </Link>

          </div>

        ) : (

          <div>

            {/* COUNT */}

            <div className="mb-10 border-b border-[#dfba6a]/20 pb-5">

              <p className="text-xs tracking-[0.3em] text-[#fae39d]">
                {wishlist.length}{" "}
                {wishlist.length === 1
                  ? "SAVED PIECE"
                  : "SAVED PIECES"}
              </p>

            </div>

            {/* WISHLIST GRID */}

            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">

              {wishlist.map((product) => (

                <article
                  key={product.id}
                  className="group"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[3/4] overflow-hidden border border-[#dfba6a]/20 bg-[#0e0c0a]">

                    <Link
                      to={`/ghararas/${product.id}`}
                    >

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                    </Link>

                    {/* REMOVE */}

                    <button
                      type="button"
                      onClick={() =>
                        removeFromWishlist(product.id)
                      }
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#dfba6a] bg-[#dfba6a] text-xl text-[#070605] transition hover:bg-[#070605] hover:text-[#fae39d]"
                    >
                      ♥
                    </button>

                    {/* VIEW PRODUCT */}

                    <Link
                      to={`/ghararas/${product.id}`}
                      className="absolute bottom-0 left-0 right-0 translate-y-full border-t border-[#dfba6a]/40 bg-[#070605]/95 py-4 text-center text-[10px] tracking-[0.3em] text-[#fae39d] transition-transform duration-500 group-hover:translate-y-0"
                    >
                      VIEW PRODUCT
                    </Link>

                  </div>

                  {/* PRODUCT INFO */}

                  <Link
                    to={`/ghararas/${product.id}`}
                  >

                    <div className="border-x border-b border-[#dfba6a]/10 bg-[#0e0c0a] px-4 pb-5 pt-4">

                      <p className="text-[9px] tracking-[0.3em] text-[#fae39d]">
                        {product.category.toUpperCase()}
                      </p>

                      <h3 className="mt-2 font-serif text-xl text-[#fae39d] transition-colors group-hover:text-[#ffffff]">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-sm tracking-widest text-[#eed9a4]">
                        ₹{" "}
                        {new Intl.NumberFormat("en-IN").format(
                          product.price
                        )}
                      </p>

                    </div>

                  </Link>

                </article>

              ))}

            </div>

          </div>

        )}

      </section>

      <Footer />

    </main>
  );
}

export default Wishlist;