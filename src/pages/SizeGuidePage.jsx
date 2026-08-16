import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImage from "../assets/hero.png";
import { sizeGuideData } from "../components/SizeGuideModal";
import { GoldFlower, GoldSparkle, GoldSparkleCluster } from "../components/GoldDecorations";

function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState("women");
  const [unit, setUnit] = useState("in"); // "in" | "cm"

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentData = sizeGuideData[activeTab] || sizeGuideData.women;
  const rows = unit === "cm" && currentData.cmRows ? currentData.cmRows : currentData.rows;
  const earringsRows = unit === "cm" && currentData.earringsCmRows ? currentData.earringsCmRows : currentData.earringsRows;
  const nosePinsRows = unit === "cm" && currentData.nosePinsCmRows ? currentData.nosePinsCmRows : currentData.nosePinsRows;

  return (
    <main className="min-h-screen bg-[#070605] text-[#e8dbbf]">
      <Navbar />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#070605] px-8 pb-24 pt-40 text-center border-b border-[#dfba6a]/20">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={heroImage}
            alt="The Shaan Collective Size Guide"
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
              PERFECT FIT & PROPORTIONS
            </p>
            <GoldSparkle size={12} />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-[0.06em] text-[#fae39d] drop-shadow-[0_0_20px_rgba(250,227,157,0.3)]">
            SIZE GUIDE
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3">
            <GoldFlower size={12} />
            <div className="h-px w-24 bg-linear-to-r from-[#fae39d] to-[#dfba6a]" />
            <GoldFlower size={12} />
          </div>

          <p className="mx-auto mt-6 max-w-2xl font-serif text-sm sm:text-base italic leading-7 text-[#e8dbbf]/90">
            Comprehensive sizing charts and exact number conversions across Women's Couture, Men's Outerwear, Accessories, and Royal Jewellery (including Earrings & Nose Pins).
          </p>
        </div>
      </section>

      {/* SIZE GUIDE INTERACTIVE SECTION */}
      <section className="px-6 py-20 md:px-12 bg-[#070605]">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* TABS & UNIT TOGGLE HEADER */}
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#dfba6a]/20 pb-6">
            {/* CATEGORY TABS */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {[
                { id: "women", label: "Women's Gharara" },
                { id: "men", label: "Men's Jackets" },
                { id: "accessories", label: "Accessories & Footwear" },
                { id: "jewellery", label: "Jewellery, Earrings & Naths" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`border px-5 py-2.5 text-xs font-semibold tracking-[0.2em] transition ${
                    activeTab === tab.id
                      ? "border-[#fae39d] bg-[#dfba6a] text-[#070605]"
                      : "border-[#dfba6a]/30 bg-[#070605] text-[#c4b28f] hover:border-[#dfba6a] hover:text-[#fae39d]"
                  }`}
                >
                  {tab.label.toUpperCase()}
                </button>
              ))}
            </div>

            {/* INCHES / CM TOGGLE */}
            <div className="flex items-center gap-1 border border-[#dfba6a]/30 p-1 bg-[#0e0c0a]">
              <button
                type="button"
                onClick={() => setUnit("in")}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wider transition ${
                  unit === "in"
                    ? "bg-[#dfba6a] text-[#070605]"
                    : "text-[#c4b28f] hover:text-[#fae39d]"
                }`}
              >
                INCHES
              </button>
              <button
                type="button"
                onClick={() => setUnit("cm")}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wider transition ${
                  unit === "cm"
                    ? "bg-[#dfba6a] text-[#070605]"
                    : "text-[#c4b28f] hover:text-[#fae39d]"
                }`}
              >
                CENTIMETERS
              </button>
            </div>
          </div>

          {/* ACTIVE CHART INFO */}
          <div>
            <div className="flex items-center gap-3">
              <GoldFlower size={14} />
              <h2 className="font-serif text-2xl text-[#fae39d]">{currentData.title}</h2>
            </div>
            <p className="mt-2 text-xs text-[#a8997a] tracking-wide">{currentData.subtitle}</p>
          </div>

          {/* MAIN TABLE (NECKLACES / BANGLES / RINGS / APPAREL / ACCESSORIES) */}
          <div>
            {activeTab === "jewellery" && (
              <h3 className="font-serif text-sm tracking-[0.2em] text-[#fae39d] mb-3 uppercase">
                1. Royal Necklaces, Bangles & Rings
              </h3>
            )}
            <div className="overflow-x-auto border border-[#dfba6a]/30 bg-[#0e0c0a] shadow-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#dfba6a]/30 bg-[#120f0c] text-[#fae39d]">
                    {currentData.columns.map((col, idx) => (
                      <th key={idx} className="p-4 font-serif tracking-[0.15em] text-xs font-normal uppercase">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dfba6a]/15">
                  {rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#dfba6a]/5 transition-colors"
                    >
                      <td className="p-4 font-bold text-[#fae39d] bg-[#dfba6a]/5">
                        {row.size}
                      </td>
                      {activeTab === "women" && (
                        <>
                          <td className="p-4 text-[#e8dbbf]">{row.bust}</td>
                          <td className="p-4 text-[#e8dbbf]">{row.waist}</td>
                          <td className="p-4 text-[#e8dbbf]">{row.hip}</td>
                          <td className="p-4 text-[#e8dbbf]">{row.kurta}</td>
                          <td className="p-4 text-[#e8dbbf]">{row.gharara}</td>
                          <td className="p-4 text-[#dfba6a] font-medium">{row.standard}</td>
                        </>
                      )}
                      {activeTab === "men" && (
                        <>
                          <td className="p-4 text-[#e8dbbf]">{row.chest}</td>
                          <td className="p-4 text-[#e8dbbf]">{row.shoulder}</td>
                          <td className="p-4 text-[#e8dbbf]">{row.sleeve}</td>
                          <td className="p-4 text-[#e8dbbf]">{row.length}</td>
                          <td className="p-4 text-[#dfba6a] font-medium">{row.standard}</td>
                        </>
                      )}
                      {activeTab === "accessories" && (
                        <>
                          <td className="p-4 text-[#dfba6a] font-medium">{row.footwear}</td>
                          <td className="p-4 text-[#e8dbbf]">{row.footLength}</td>
                          <td className="p-4 text-[#e8dbbf]">{row.belt}</td>
                          <td className="p-4 text-[#c4b28f]">{row.dimension}</td>
                        </>
                      )}
                      {activeTab === "jewellery" && (
                        <>
                          <td className="p-4 text-[#dfba6a] font-medium">{row.bangleDia}</td>
                          <td className="p-4 text-[#e8dbbf]">{row.bangleCirc}</td>
                          <td className="p-4 text-[#e8dbbf]">{row.ring}</td>
                          <td className="p-4 text-[#c4b28f]">{row.necklace}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* JEWELLERY EXTENSION: EARRINGS TABLE */}
          {activeTab === "jewellery" && currentData.earringsColumns && (
            <div className="pt-4">
              <h3 className="font-serif text-sm tracking-[0.2em] text-[#fae39d] mb-3 uppercase">
                2. Royal Earrings, Jhumkas & Chandbalis Size Chart
              </h3>
              <div className="overflow-x-auto border border-[#dfba6a]/30 bg-[#0e0c0a] shadow-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#dfba6a]/30 bg-[#120f0c] text-[#fae39d]">
                      {currentData.earringsColumns.map((col, idx) => (
                        <th key={idx} className="p-4 font-serif tracking-[0.15em] text-xs font-normal uppercase">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfba6a]/15">
                    {earringsRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#dfba6a]/5 transition-colors">
                        <td className="p-4 font-bold text-[#fae39d] bg-[#dfba6a]/5">{row.size}</td>
                        <td className="p-4 text-[#dfba6a] font-medium">{row.style}</td>
                        <td className="p-4 text-[#e8dbbf]">{row.drop}</td>
                        <td className="p-4 text-[#e8dbbf]">{row.width}</td>
                        <td className="p-4 text-[#c4b28f]">{row.backing}</td>
                        <td className="p-4 text-[#e8dbbf]">{row.look}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* JEWELLERY EXTENSION: NOSE PINS & NATHS TABLE */}
          {activeTab === "jewellery" && currentData.nosePinsColumns && (
            <div className="pt-4">
              <h3 className="font-serif text-sm tracking-[0.2em] text-[#fae39d] mb-3 uppercase">
                3. Royal Nose Pins & Bridal Naths Size Chart
              </h3>
              <div className="overflow-x-auto border border-[#dfba6a]/30 bg-[#0e0c0a] shadow-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#dfba6a]/30 bg-[#120f0c] text-[#fae39d]">
                      {currentData.nosePinsColumns.map((col, idx) => (
                        <th key={idx} className="p-4 font-serif tracking-[0.15em] text-xs font-normal uppercase">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfba6a]/15">
                    {nosePinsRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#dfba6a]/5 transition-colors">
                        <td className="p-4 font-bold text-[#fae39d] bg-[#dfba6a]/5">{row.size}</td>
                        <td className="p-4 text-[#dfba6a] font-medium">{row.style}</td>
                        <td className="p-4 text-[#e8dbbf]">{row.motif}</td>
                        <td className="p-4 text-[#e8dbbf]">{row.ring}</td>
                        <td className="p-4 text-[#c4b28f]">{row.chain}</td>
                        <td className="p-4 text-[#e8dbbf]">{row.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MEASURING GUIDE */}
          <div className="border border-[#dfba6a]/20 bg-[#0e0c0a] p-8">
            <h3 className="font-serif text-xl tracking-[0.15em] text-[#fae39d] uppercase">
              How to Take Your Measurements & Fit Instructions
            </h3>
            <p className="mt-2 text-xs text-[#a8997a]">
              Guidelines to ensure your bespoke ensembles, jhumkas, and royal naths sit comfortably throughout ceremonies.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {currentData.measuringTips.map((tip, idx) => (
                <div key={idx} className="border-l-2 border-[#dfba6a] pl-4">
                  <h4 className="text-xs font-semibold tracking-wider text-[#fae39d]">{tip.title}</h4>
                  <p className="mt-1.5 text-xs leading-6 text-[#c4b28f]">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BESPOKE COUTURE CALLOUT */}
          <div className="border border-[#dfba6a]/30 bg-[#070605] p-8 text-center">
            <p className="font-serif text-2xl text-[#fae39d]">Bespoke Sizing & Custom Nath Clips</p>
            <p className="mt-3 text-xs leading-7 tracking-wider text-[#c4b28f] max-w-2xl mx-auto">
              Our master jewellers and stylists can customize ear-chains (sahare), clip-on mechanisms for unpierced noses, or adjust bangle diameters. Connect with our styling concierge for tailored assistance.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default SizeGuidePage;
