import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImage from "../assets/hero.png";
import { GoldFlower, GoldSparkle, GoldSparkleCluster } from "../components/GoldDecorations";

function Shipping() {
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
            alt="The Shaan Collective Shipping"
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
              GLOBAL LOGISTICS & CARE
            </p>
            <GoldSparkle size={12} />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-[0.06em] text-[#fae39d] drop-shadow-[0_0_20px_rgba(250,227,157,0.3)]">
            SHIPPING & DELIVERY
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3">
            <GoldFlower size={12} />
            <div className="h-px w-24 bg-linear-to-r from-[#fae39d] to-[#dfba6a]" />
            <GoldFlower size={12} />
          </div>

          <p className="mx-auto mt-6 max-w-2xl font-serif text-sm sm:text-base italic leading-7 text-[#e8dbbf]/90">
            Insured, tamper-evident white-glove worldwide delivery for all royal couture and jewellery pieces.
          </p>
        </div>
      </section>

      {/* SHIPPING CONTENT */}
      <section className="px-6 py-20 md:px-12 bg-[#070605]">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* TIMELINE OVERVIEW CARDS */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border border-[#dfba6a]/30 bg-[#0e0c0a] p-6 text-center">
              <span className="text-2xl text-[#fae39d]">✦</span>
              <h3 className="mt-3 font-serif text-lg text-[#fae39d]">Domestic (India)</h3>
              <p className="mt-2 text-xs text-[#a8997a] leading-6">
                Complimentary insured express shipping across all major Indian cities within 3–6 business days.
              </p>
            </div>

            <div className="border border-[#dfba6a]/30 bg-[#0e0c0a] p-6 text-center">
              <span className="text-2xl text-[#fae39d]">✦</span>
              <h3 className="mt-3 font-serif text-lg text-[#fae39d]">International Couture</h3>
              <p className="mt-2 text-xs text-[#a8997a] leading-6">
                DHL Express worldwide delivery to US, UK, UAE, Canada, and Europe in 6–10 business days.
              </p>
            </div>

            <div className="border border-[#dfba6a]/30 bg-[#0e0c0a] p-6 text-center">
              <span className="text-2xl text-[#fae39d]">✦</span>
              <h3 className="mt-3 font-serif text-lg text-[#fae39d]">Custom Bridal</h3>
              <p className="mt-2 text-xs text-[#a8997a] leading-6">
                Made-to-order ensembles require 3–5 weeks of artisanal embroidery prior to express dispatch.
              </p>
            </div>
          </div>

          {/* DETAILED POLICIES */}
          <div className="space-y-10 border-t border-[#dfba6a]/20 pt-12">
            <div>
              <div className="flex items-center gap-3">
                <GoldFlower size={14} />
                <h3 className="font-serif text-2xl text-[#fae39d]">Packaging & Insured Transit</h3>
              </div>
              <p className="mt-3 text-xs leading-7 text-[#c4b28f] tracking-wide">
                Every gharara and bespoke ensemble is delicately encased in breathable cotton garment sleeves, placed within rigid velvet-lined heirloom presentation trunks, and sealed with tamper-evident serial seals. All consignments are 100% insured up to point of signature upon delivery.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <GoldFlower size={14} />
                <h3 className="font-serif text-2xl text-[#fae39d]">Customs, Duties & Taxes</h3>
              </div>
              <p className="mt-3 text-xs leading-7 text-[#c4b28f] tracking-wide">
                For international deliveries, customs clearance and import duties may be levied by local authorities according to the destination country's regulations. Our concierge team coordinates directly with express couriers to facilitate seamless customs clearance.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <GoldFlower size={14} />
                <h3 className="font-serif text-2xl text-[#fae39d]">Tracking Your Order</h3>
              </div>
              <p className="mt-3 text-xs leading-7 text-[#c4b28f] tracking-wide">
                As soon as your heirloom is hand-inspected and dispatched from our atelier, an SMS and email containing the live tracking link will be transmitted to you. You may also contact our 24/7 styling concierge at concierge@shaan-collective.com for dispatch updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Shipping;
