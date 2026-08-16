import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { ghararaProducts } from "../data/products";
import { menProducts } from "../data/menProducts";
import { jewelleryProducts } from "../data/jewelleryProducts";
import { accessoryProducts } from "../data/accessoryProducts";

import WishlistButton from "../components/WishlistButton";
import {
  GoldSparkle,
  GoldSparkleCluster,
  GoldFlower,
  GoldFloralDivider,
  GoldWaveOverlay,
} from "../components/GoldDecorations";

import heroImage from "../assets/hero.png";

function Main() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "women-collection") {
      setTimeout(() => {
        document
          .getElementById("women-collection")
          ?.scrollIntoView({
            behavior: "smooth",
          });

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }, 100);
    }

    if (location.state?.scrollTo === "men-collection") {
      setTimeout(() => {
        document
          .getElementById("men-collection")
          ?.scrollIntoView({
            behavior: "smooth",
          });

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }, 100);
    }
  }, [location]);

  return (
    <main className="min-h-screen bg-[#070605] text-[#e8dbbf]">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#070605] py-28 md:py-32">
        <Navbar />

        {/* HERO IMAGE */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="The Shaan Collective"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-r from-[#070605]/90 via-[#070605]/50 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#070605]/70 via-transparent to-transparent" />
        </div>

        {/* AMBIENT GOLDEN SPARKLES */}
        <GoldSparkleCluster className="z-10" />

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-8">
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <p className="text-[11px] tracking-[0.45em] text-[#fae39d]">
                THE SHAAN COLLECTIVE
              </p>
              <GoldSparkle size={12} />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[0.04em] text-[#fae39d] drop-shadow-[0_0_20px_rgba(250,227,157,0.3)]">
              WHERE ROYALTY
              <br />
              LIVES
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <GoldFlower size={12} />
              <div className="h-px w-24 bg-linear-to-r from-[#fae39d] to-[#dfba6a]" />
              <GoldFlower size={12} />
            </div>

            <p className="mt-5 max-w-md font-serif text-sm sm:text-base italic leading-7 text-[#e8dbbf]/90">
              Discover timeless Indian craftsmanship,
              contemporary elegance and pieces created
              for life's most unforgettable celebrations.
            </p>

            {/* HERO BUTTONS */}
            <div className="mt-8 flex flex-row items-center gap-4">
              <Link
                to="/ghararas"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center justify-center border border-[#dfba6a]/70 px-7 py-3.5 text-xs font-semibold tracking-[0.25em] text-[#fae39d] transition-all duration-500 hover:bg-[#dfba6a] hover:text-[#070605]"
              >
                EXPLORE WOMEN
              </Link>

              <Link
                to="/men"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center justify-center border border-[#dfba6a]/70 px-7 py-3.5 text-xs font-semibold tracking-[0.25em] text-[#fae39d] transition-all duration-500 hover:bg-[#dfba6a] hover:text-[#070605]"
              >
                EXPLORE MEN
              </Link>
            </div>
          </div>
        </div>

        {/* VERTICAL TEXT */}
        <div className="absolute bottom-32 right-2 hidden rotate-90 text-[13px] tracking-[0.5em] text-[#fae39d]/60 lg:block z-10">
          WHERE ROYALTY LIVES
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-8 left-8 hidden items-center gap-4 text-[#fae39d] md:flex z-10">
          <div className="h-10 w-px bg-[#dfba6a]" />
          <span className="text-xs tracking-[0.4em]">
            SCROLL DOWN
          </span>
        </div>
      </section>

      {/* =====================================================
          WOMEN - NEW ARRIVALS
      ===================================================== */}
      <section className="bg-[#0c0a08] px-8 py-24 border-b border-[#dfba6a]/15">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.45em] text-[#fae39d]">
                WOMEN
              </p>
              <h2 className="mt-4 font-serif text-5xl text-[#fae39d] md:text-6xl">
                New Arrivals
              </h2>
            </div>

            <Link
              to="/ghararas"
              onClick={() => window.scrollTo(0, 0)}
              className="border-b border-[#dfba6a] pb-2 text-xs tracking-[0.3em] text-[#fae39d] transition hover:text-[#ffffff]"
            >
              MORE
            </Link>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ghararaProducts
              .filter((product) => product.isNewArrival)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  category="WOMEN"
                  price={`₹ ${new Intl.NumberFormat("en-IN").format(
                    product.price
                  )}`}
                  image={product.image}
                  link={`/ghararas/${product.id}`}
                  state={{ fromMain: true }}
                  product={product}
                  wishlistId={`gharara-${product.id}`}
                  showNewTag={true}
                />
              ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          MEN - NEW ARRIVALS
      ===================================================== */}
      <section className="bg-[#070605] px-8 py-24 border-b border-[#dfba6a]/15">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.45em] text-[#fae39d]">
                MEN
              </p>
              <h2 className="mt-4 font-serif text-5xl text-[#fae39d] md:text-6xl">
                New Arrivals
              </h2>
            </div>

            <Link
              to="/men"
              onClick={() => window.scrollTo(0, 0)}
              className="border-b border-[#dfba6a] pb-2 text-xs tracking-[0.3em] text-[#fae39d] transition hover:text-[#ffffff]"
            >
              MORE
            </Link>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {menProducts
              .filter((product) => product.isNewArrival)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  category="MEN"
                  price={`₹ ${new Intl.NumberFormat("en-IN").format(
                    product.price
                  )}`}
                  image={product.image}
                  link={`/men/${product.id}`}
                  state={{ fromMain: true }}
                  product={product}
                  wishlistId={`men-${product.id}`}
                  showNewTag={true}
                />
              ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          JEWELLERY - NEW ARRIVALS
      ===================================================== */}
      <section className="bg-[#0c0a08] px-8 py-24 border-b border-[#dfba6a]/15">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.45em] text-[#fae39d]">
                JEWELLERY
              </p>
              <h2 className="mt-4 font-serif text-5xl text-[#fae39d] md:text-6xl">
                New Arrivals
              </h2>
            </div>

            <Link
              to="/jewellery"
              onClick={() => window.scrollTo(0, 0)}
              className="border-b border-[#dfba6a] pb-2 text-xs tracking-[0.3em] text-[#fae39d] transition hover:text-[#ffffff]"
            >
              MORE
            </Link>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {jewelleryProducts
              .filter((product) => product.isNewArrival)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  category="JEWELLERY"
                  price={`₹ ${new Intl.NumberFormat("en-IN").format(
                    product.price
                  )}`}
                  image={product.image}
                  link={`/jewellery/${product.id}`}
                  state={{ fromMain: true }}
                  product={product}
                  wishlistId={`jewellery-${product.id}`}
                  showNewTag={true}
                />
              ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ACCESSORIES - NEW ARRIVALS
      ===================================================== */}
      <section className="bg-[#070605] px-8 py-24 border-b border-[#dfba6a]/15">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.45em] text-[#fae39d]">
                ACCESSORIES
              </p>
              <h2 className="mt-4 font-serif text-5xl text-[#fae39d] md:text-6xl">
                New Arrivals
              </h2>
            </div>

            <Link
              to="/accessories"
              onClick={() => window.scrollTo(0, 0)}
              className="border-b border-[#dfba6a] pb-2 text-xs tracking-[0.3em] text-[#fae39d] transition hover:text-[#ffffff]"
            >
              MORE
            </Link>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {accessoryProducts
              .filter((product) => product.isNewArrival)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  category="ACCESSORIES"
                  price={`₹ ${new Intl.NumberFormat("en-IN").format(
                    product.price
                  )}`}
                  image={product.image}
                  link={`/accessories/${product.id}`}
                  state={{ fromMain: true }}
                  product={product}
                  wishlistId={`accessory-${product.id}`}
                  showNewTag={true}
                />
              ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WOMEN - THE COLLECTION
      ===================================================== */}
      <section
        id="women-collection"
        className="bg-[#0c0a08] px-8 py-24 border-b border-[#dfba6a]/15"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs tracking-[0.45em] text-[#fae39d]">
              WOMEN
            </p>
            <h2 className="mt-4 font-serif text-5xl text-[#fae39d] md:text-6xl">
              The Collection
            </h2>
            <div className="mx-auto mt-5 h-px w-20 bg-[#dfba6a]" />
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <CollectionCard
              title="BRIDAL"
              subtitle="For the beginning of forever"
              number="01"
              image={ghararaProducts[0].image}
              link="/women/bridal"
            />

            <CollectionCard
              title="WEDDING"
              subtitle="Made for every celebration"
              number="02"
              image={ghararaProducts[1].image}
              link="/women/wedding"
            />

            <CollectionCard
              title="PARTY"
              subtitle="Make every entrance unforgettable"
              number="03"
              image={ghararaProducts[2].image}
              link="/women/party"
            />

            <CollectionCard
              title="FESTIVE"
              subtitle="Tradition with a modern soul"
              number="04"
              image={ghararaProducts[3].image}
              link="/women/festive"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          MEN - THE COLLECTION
      ===================================================== */}
      <section
        id="men-collection"
        className="bg-[#070605] px-8 py-24 border-b border-[#dfba6a]/15"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs tracking-[0.45em] text-[#fae39d]">
              MEN
            </p>
            <h2 className="mt-4 font-serif text-5xl text-[#fae39d] md:text-6xl">
              The Collection
            </h2>
            <div className="mx-auto mt-5 h-px w-20 bg-[#dfba6a]" />
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <CollectionCard
              title="GROOM"
              subtitle="The finest expression of the groom"
              number="01"
              image={menProducts[0].image}
              link="/men/collection/groom"
            />

            <CollectionCard
              title="WEDDING"
              subtitle="Refined dressing for every celebration"
              number="02"
              image={menProducts[1].image}
              link="/men/collection/wedding"
            />

            <CollectionCard
              title="PARTY"
              subtitle="Statement dressing after dark"
              number="03"
              image={menProducts[2].image}
              link="/men/collection/party"
            />

            <CollectionCard
              title="FESTIVE"
              subtitle="Heritage crafted for celebration"
              number="04"
              image={menProducts[3].image}
              link="/men/collection/festive"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          OCCASION SECTION
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#070605] px-8 py-32 border-b border-[#dfba6a]/20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08] to-[#070605]" />

        {/* AMBIENT GOLDEN SPARKLES */}
        <GoldSparkleCluster className="z-10 opacity-70" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-xs tracking-[0.5em] text-[#fae39d]">
            DRESS FOR THE MOMENT
          </p>

          <h2 className="mt-6 font-serif text-5xl text-[#fae39d] md:text-7xl">
            Made for Every Celebration
          </h2>

          <GoldFloralDivider className="my-6" />

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 tracking-[0.12em] text-[#e8dbbf]">
            From intimate celebrations to grand weddings,
            discover pieces designed to become part of your
            most treasured memories.
          </p>

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("women-collection")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
            className="mt-10 border border-[#dfba6a] px-10 py-4 text-xs tracking-[0.3em] text-[#fae39d] transition-all duration-500 hover:bg-[#dfba6a] hover:text-[#070605] shadow-[0_0_20px_rgba(223,186,106,0.2)]"
          >
            EXPLORE OCCASIONS
          </button>
        </div>

        {/* FLOWING GOLDEN WAVES AT OCCASION BOTTOM */}
        <GoldWaveOverlay className="absolute bottom-0 left-0 z-10 opacity-60" height="h-24" />
      </section>

      <Footer />
    </main>
  );
}

/* =====================================================
   COLLECTION CARD
===================================================== */
function CollectionCard({
  title,
  subtitle,
  number,
  image,
  link,
}) {
  return (
    <div className="group relative h-117.5 overflow-hidden bg-[#070605] border border-[#dfba6a]/20 hover:border-[#fae39d]/60 transition-all duration-500">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070605] via-[#070605]/20 to-transparent" />

      {/* NUMBER */}
      <div className="absolute right-6 top-6 text-xs tracking-[0.3em] text-[#fae39d]">
        {number}
      </div>

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 p-8 text-[#e8dbbf]">
        <p className="text-[10px] tracking-[0.4em] text-[#fae39d]">
          COLLECTION
        </p>

        <h3 className="mt-3 font-serif text-4xl text-[#fae39d]">
          {title}
        </h3>

        <p className="mt-3 text-xs tracking-widest text-[#e8dbbf]/80">
          {subtitle}
        </p>

        <Link
          to={link || "#"}
          className="mt-6 inline-block border-b border-[#dfba6a] pb-2 text-[10px] tracking-[0.3em] text-[#fae39d] transition hover:text-[#ffffff]"
        >
          EXPLORE
        </Link>
      </div>
    </div>
  );
}

/* =====================================================
   PRODUCT CARD
===================================================== */
function ProductCard({
  name,
  category,
  price,
  image,
  link,
  state,
  product,
  wishlistId,
}) {
  return (
    <Link
      to={link}
      state={state}
      className="group block"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-[#0e0c0a] border border-[#dfba6a]/20 group-hover:border-[#fae39d]/60 transition-all duration-500">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* NEW ARRIVAL TAG */}
        <span className="absolute left-4 top-4 z-10 border border-[#dfba6a]/60 bg-[#070605]/90 px-2.5 py-1 text-[9px] font-bold tracking-[0.25em] text-[#fae39d] shadow-[0_0_12px_rgba(223,186,106,0.35)] backdrop-blur-sm">
          NEW
        </span>

        {/* SYNCHRONIZED WISHLIST */}
        <WishlistButton
          product={product}
          wishlistId={wishlistId}
        />
      </div>

      <div className="pt-5">
        <p className="text-[9px] tracking-[0.3em] text-[#fae39d]">
          {category}
        </p>

        <h3 className="mt-2 font-serif text-xl text-[#fae39d]">
          {name}
        </h3>

        <p className="mt-2 text-xs tracking-[0.15em] text-[#eed9a4]">
          {price}
        </p>
      </div>
    </Link>
  );
}

export default Main;