import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImage from "../assets/hero.png";
import { GoldFlower, GoldSparkle, GoldSparkleCluster } from "../components/GoldDecorations";

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#070605] text-[#e8dbbf]">
      <Navbar />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#070605] px-8 pb-24 pt-40 text-center border-b border-[#dfba6a]/20">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={heroImage}
            alt="The Shaan Collective Atelier"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#070605]/90 via-[#070605]/50 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#070605]/70 via-transparent to-transparent" />
        </div>

        {/* AMBIENT GOLDEN SPARKLES */}
        <GoldSparkleCluster className="z-10" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <p className="text-[11px] tracking-[0.45em] text-[#fae39d]">
              MAISON DE COUTURE
            </p>
            <GoldSparkle size={12} />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-[0.06em] text-[#fae39d] drop-shadow-[0_0_20px_rgba(250,227,157,0.3)]">
            ABOUT US
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3">
            <GoldFlower size={12} />
            <div className="h-px w-24 bg-linear-to-r from-[#fae39d] to-[#dfba6a]" />
            <GoldFlower size={12} />
          </div>

          <p className="mx-auto mt-6 max-w-2xl font-serif text-sm sm:text-base italic leading-7 text-[#e8dbbf]/90">
            Where centuries-old Awadhi and Mughal craftsmanship converges with contemporary regal silhouettes.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="px-6 py-20 md:px-12 bg-[#070605]">
        <div className="mx-auto max-w-6xl grid gap-16 md:grid-cols-2 items-center">
          <div>
            <div className="flex items-center gap-3">
              <GoldFlower size={16} />
              <span className="text-xs tracking-[0.3em] text-[#dfba6a]">OUR HERITAGE</span>
            </div>
            <h2 className="mt-4 font-serif text-4xl text-[#fae39d] md:text-5xl leading-tight">
              Honouring the Royal Art of Gharara & Couture
            </h2>
            <p className="mt-6 text-sm leading-8 text-[#c4b28f] tracking-wide">
              The Shaan Collective was born from a singular passion: to revive and elevate the timeless grandeur of royal Indian couture. Rooted in the rich cultural tapestry of Lucknow and the regal courts of India, every piece we craft tells a story of heritage, precision, and uncompromised beauty.
            </p>
            <p className="mt-4 text-sm leading-8 text-[#c4b28f] tracking-wide">
              Our signature ghararas, majestic bandhgalas, kundan ornaments, and embroidered accessories are created by master karigars whose families have preserved artisanal zari, zardozi, and gota patti techniques for generations.
            </p>
          </div>

          <div className="border border-[#dfba6a]/30 bg-[#0e0c0a] p-8 md:p-12 relative shadow-[0_0_30px_rgba(223,186,106,0.08)]">
            <div className="absolute top-4 right-4 text-3xl text-[#dfba6a]/20 font-serif">✦</div>
            <h3 className="font-serif text-2xl text-[#fae39d]">The Atelier Pillars</h3>
            <div className="mt-8 space-y-6">
              <div className="border-l-2 border-[#dfba6a] pl-4">
                <h4 className="text-sm font-semibold tracking-wider text-[#fae39d]">Artisanal Precision</h4>
                <p className="mt-1 text-xs text-[#a8997a] leading-6">Over 240 man-hours dedicated to hand-embroidering each bridal gharara ensemble.</p>
              </div>
              <div className="border-l-2 border-[#dfba6a] pl-4">
                <h4 className="text-sm font-semibold tracking-wider text-[#fae39d]">Pure Royal Textiles</h4>
                <p className="mt-1 text-xs text-[#a8997a] leading-6">Ethically sourced Banarasi brocades, raw silks, velvets, and hand-beaten gold zari threads.</p>
              </div>
              <div className="border-l-2 border-[#dfba6a] pl-4">
                <h4 className="text-sm font-semibold tracking-wider text-[#fae39d]">Bespoke Made-to-Measure</h4>
                <p className="mt-1 text-xs text-[#a8997a] leading-6">Customized fit, palette personalization, and heirloom monogramming for our patrons.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALLOUT SECTION */}
      <section className="border-y border-[#dfba6a]/20 bg-[#0b0907] px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="text-xs tracking-[0.4em] text-[#fae39d]">BESPOKE EXPERIENCE</span>
          <h3 className="mt-4 font-serif text-3xl text-[#fae39d] md:text-4xl">Step into the World of The Shaan Collective</h3>
          <p className="mt-4 text-xs leading-6 tracking-widest text-[#c4b28f]">
            Schedule an appointment with our stylists or explore our collections online.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-5">
            <Link
              to="/ghararas"
              className="border border-[#dfba6a] bg-[#dfba6a] px-8 py-3.5 text-xs font-bold tracking-[0.25em] text-[#070605] hover:bg-[#fae39d] transition"
            >
              EXPLORE COUTURE
            </Link>
            <Link
              to="/contact"
              className="border border-[#dfba6a]/50 px-8 py-3.5 text-xs font-semibold tracking-[0.25em] text-[#fae39d] hover:border-[#fae39d] hover:text-[#ffffff] transition"
            >
              BOOK CONSULTATION
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default AboutUs;
