import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  GoldSparkle,
  GoldSparkleCluster,
  GoldFlower,
} from "../components/GoldDecorations";

function OrderSuccess() {
  return (
    <main className="relative min-h-screen bg-[#070605] text-[#e8dbbf] flex flex-col justify-between">

      <Navbar />

      {/* AMBIENT GOLDEN SPARKLES */}
      <GoldSparkleCluster className="z-10 opacity-75" />

      <section className="relative z-20 flex min-h-[70vh] items-center justify-center px-6 pt-36 pb-16">

        <div className="w-full max-w-2xl text-center">

          {/* BRAND */}
          <div className="flex items-center justify-center gap-3">
            <GoldFlower size={16} />
            <p className="text-xs tracking-[0.5em] text-[#fae39d]">
              THE SHAAN COLLECTIVE
            </p>
            <GoldSparkle size={14} />
          </div>

          {/* SUCCESS ICON WITH RADIANT GOLDEN RING */}
          <div className="relative mx-auto mt-10 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#fae39d] bg-[#0c0a08] shadow-[0_0_40px_rgba(250,227,157,0.45)] animate-pulse">

            {/* Sparkle orbiting icon */}
            <div className="absolute -top-2 -right-2">
              <GoldSparkle size={20} />
            </div>
            <div className="absolute -bottom-1 -left-1">
              <GoldSparkle size={14} />
            </div>

            <span className="text-5xl text-[#fae39d] drop-shadow-[0_0_15px_rgba(250,227,157,0.8)]">
              ✓
            </span>

          </div>

          {/* HEADING */}
          <h1 className="mt-10 font-serif text-5xl tracking-[0.08em] text-[#fae39d] md:text-7xl drop-shadow-[0_0_20px_rgba(250,227,157,0.3)]">
            ORDER CONFIRMED
          </h1>

          <div className="mx-auto mt-7 flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#dfba6a]" />
            <GoldFlower size={16} />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#dfba6a]" />
          </div>

          {/* MESSAGE */}
          <p className="mx-auto mt-8 max-w-lg text-sm leading-7 tracking-widest text-[#e8dbbf]">
            Thank you for shopping with The Shaan Collective.
            Your order has been successfully placed.
          </p>

          <p className="mt-6 text-xs tracking-[0.3em] text-[#fae39d]">
            YOUR ORDER IS BEING PREPARED
          </p>

          {/* ACTIONS */}
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">

            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="border border-[#dfba6a] bg-[#dfba6a] px-10 py-4 text-xs tracking-[0.3em] !text-[#070605] font-extrabold transition hover:bg-[#fae39d] hover:!text-[#000000]"
            >
              CONTINUE SHOPPING
            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}

export default OrderSuccess;