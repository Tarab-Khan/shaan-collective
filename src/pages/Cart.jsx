import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formattedSubtotal = new Intl.NumberFormat("en-IN").format(
    subtotal
  );

  return (
    <main className="min-h-screen bg-[#070605] text-[#e8dbbf]">

      <Navbar />

      {/* HEADER */}

      <section className="bg-[#070605] px-6 pb-16 pt-36 text-center border-b border-[#dfba6a]/20">

        <div className="mx-auto max-w-7xl">

          <p className="text-xs tracking-[0.5em] text-[#fae39d]">
            YOUR SELECTION
          </p>

          <h1 className="mt-4 font-serif text-5xl tracking-[0.08em] text-[#fae39d] md:text-7xl">
            YOUR BAG
          </h1>

          <div className="mx-auto mt-6 h-px w-20 bg-[#dfba6a]" />

        </div>

      </section>

      {/* CART */}

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">

        {cart.length === 0 ? (

          <div className="flex min-h-[500px] flex-col items-center justify-center text-center">

            <div className="text-6xl text-[#fae39d]">
              ♡
            </div>

            <h2 className="mt-6 font-serif text-4xl text-[#fae39d]">
              Your bag is empty
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#c4b28f]">
              Discover our collection and find something made
              for your next celebration.
            </p>

            <Link
              to="/"
              className="mt-8 border border-[#dfba6a] bg-[#dfba6a] px-10 py-4 text-xs tracking-[0.3em] !text-[#070605] font-extrabold transition hover:bg-[#fae39d] hover:!text-[#000000]"
            >
              EXPLORE
            </Link>

          </div>

        ) : (

          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

            {/* ITEMS */}

            <div>

              <div className="mb-8 border-b border-[#dfba6a]/20 pb-5">

                <p className="text-xs tracking-[0.3em] text-[#fae39d]">
                  {cart.length}{" "}
                  {cart.length === 1 ? "ITEM" : "ITEMS"}
                </p>

              </div>

              <div className="space-y-8">

                {cart.map((item, index) => (

                  <article
                    key={`${item.id}-${item.size}-${index}`}
                    className="flex flex-row gap-4 sm:gap-6 border-b border-[#dfba6a]/20 pb-8"
                  >

                    <div className="h-32 w-24 sm:h-48 sm:w-36 shrink-0 overflow-hidden border border-[#dfba6a]/20 bg-[#0e0c0a]">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                    </div>

                    <div className="flex flex-1 flex-col justify-between">

                      <div>
                        <p className="text-[9px] tracking-[0.3em] text-[#fae39d]">
                          {item.category.toUpperCase()}
                        </p>

                        <h2 className="mt-1 sm:mt-2 font-serif text-lg sm:text-2xl text-[#fae39d]">
                          {item.name}
                        </h2>

                        <p className="mt-2 text-xs sm:text-sm text-[#c4b28f]">
                          Size:{" "}
                          <span className="text-[#eed9a4]">
                            {item.size}
                          </span>
                        </p>

                        <p className="mt-2 text-xs sm:text-sm text-[#eed9a4] font-semibold">
                          ₹{" "}
                          {new Intl.NumberFormat("en-IN").format(
                            item.price
                          )}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

                        <div className="flex items-center border border-[#dfba6a]/40 bg-[#070605]">

                          <button
                            type="button"
                            onClick={() => decreaseQuantity(index)}
                            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-[#fae39d] transition hover:bg-[#dfba6a] hover:text-[#070605]"
                          >
                            −
                          </button>

                          <span className="flex h-8 w-9 sm:h-9 sm:w-10 items-center justify-center border-x border-[#dfba6a]/40 text-xs sm:text-sm text-[#fae39d]">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(index)}
                            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-[#fae39d] transition hover:bg-[#dfba6a] hover:text-[#070605]"
                          >
                            +
                          </button>

                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(index)}
                          className="text-[10px] tracking-[0.2em] text-[#dfba6a] transition hover:text-[#fae39d]"
                        >
                          REMOVE
                        </button>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            </div>

            {/* SUMMARY */}

            <aside className="h-fit border border-[#dfba6a]/30 bg-[#0e0c0a] p-8">

              <h2 className="font-serif text-3xl text-[#fae39d]">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5 border-b border-[#dfba6a]/20 pb-7">

                <div className="flex justify-between text-sm">

                  <span className="text-[#c4b28f]">
                    Subtotal
                  </span>

                  <span className="text-[#e8dbbf]">
                    ₹ {formattedSubtotal}
                  </span>

                </div>

                <div className="flex justify-between text-sm text-[#c4b28f]">

                  <span>Shipping</span>

                  <span className="text-[#fae39d]">Calculated at checkout</span>

                </div>

              </div>

              <div className="flex justify-between pt-7">

                <span className="font-serif text-xl text-[#fae39d]">
                  Total
                </span>

                <span className="text-lg font-bold text-[#eed9a4]">
                  ₹ {formattedSubtotal}
                </span>

              </div>

              <Link
                to="/checkout"
                onClick={() => window.scrollTo(0, 0)}
                className="mt-8 block w-full border border-[#dfba6a] bg-[#dfba6a] py-5 text-center text-xs tracking-[0.3em] !text-[#070605] font-extrabold transition hover:bg-[#fae39d] hover:!text-[#000000]"
              >
                PROCEED TO CHECKOUT
              </Link>

              <Link
                to="/"
                className="mt-5 block text-center text-[10px] tracking-[0.25em] text-[#dfba6a] hover:text-[#fae39d]"
              >
                CONTINUE SHOPPING
              </Link>

            </aside>

          </div>

        )}

      </section>

      <Footer />

    </main>
  );
}

export default Cart;