import { useState } from "react";

export const sizeGuideData = {
  women: {
    title: "Women's Couture (Ghararas & Outfits)",
    subtitle: "All measurements in standard body fitting. Handcrafted with bespoke tailoring margins.",
    columns: ["Size", "Bust", "Waist", "Hip", "Kurta Length", "Gharara Length", "US / UK / EU"],
    rows: [
      { size: "XS", bust: "32 in", waist: "26 in", hip: "36 in", kurta: "36 in", gharara: "40 in", standard: "US 2 / UK 6 / EU 34" },
      { size: "S", bust: "34 in", waist: "28 in", hip: "38 in", kurta: "37 in", gharara: "41 in", standard: "US 4 / UK 8 / EU 36" },
      { size: "M", bust: "36 in", waist: "30 in", hip: "40 in", kurta: "38 in", gharara: "41 in", standard: "US 6 / UK 10 / EU 38" },
      { size: "L", bust: "38 in", waist: "32 in", hip: "42 in", kurta: "39 in", gharara: "42 in", standard: "US 8 / UK 12 / EU 40" },
      { size: "XL", bust: "40 in", waist: "34 in", hip: "44 in", kurta: "40 in", gharara: "42 in", standard: "US 10 / UK 14 / EU 42" },
      { size: "XXL", bust: "42 in", waist: "36 in", hip: "46 in", kurta: "40 in", gharara: "43 in", standard: "US 12 / UK 16 / EU 44" },
    ],
    cmRows: [
      { size: "XS", bust: "81 cm", waist: "66 cm", hip: "91 cm", kurta: "91 cm", gharara: "102 cm", standard: "US 2 / UK 6 / EU 34" },
      { size: "S", bust: "86 cm", waist: "71 cm", hip: "97 cm", kurta: "94 cm", gharara: "104 cm", standard: "US 4 / UK 8 / EU 36" },
      { size: "M", bust: "91 cm", waist: "76 cm", hip: "102 cm", kurta: "97 cm", gharara: "104 cm", standard: "US 6 / UK 10 / EU 38" },
      { size: "L", bust: "97 cm", waist: "81 cm", hip: "107 cm", kurta: "99 cm", gharara: "107 cm", standard: "US 8 / UK 12 / EU 40" },
      { size: "XL", bust: "102 cm", waist: "86 cm", hip: "112 cm", kurta: "102 cm", gharara: "107 cm", standard: "US 10 / UK 14 / EU 42" },
      { size: "XXL", bust: "107 cm", waist: "91 cm", hip: "117 cm", kurta: "102 cm", gharara: "109 cm", standard: "US 12 / UK 16 / EU 44" },
    ],
    measuringTips: [
      { title: "Bust", desc: "Measure around the fullest part of your bust while keeping the tape parallel to the floor." },
      { title: "Waist", desc: "Measure around the narrowest natural waistline, usually right above the navel." },
      { title: "Hip", desc: "Measure around the fullest part of your hips with feet placed together." },
      { title: "Gharara Length", desc: "Measure from your natural waistline down to the floor, accounting for heel height." },
    ],
  },
  men: {
    title: "Men's Luxury Outerwear & Jackets",
    subtitle: "Tailored royal silhouette. Includes 2 inches of ease margin for royal layering.",
    columns: ["Size", "Chest", "Shoulder", "Sleeve Length", "Jacket Length", "Numeric Match"],
    rows: [
      { size: "XS", chest: "36 in", shoulder: "17.0 in", sleeve: "24.5 in", length: "28.5 in", standard: "UK/US 36 (EU 46)" },
      { size: "S", chest: "38 in", shoulder: "17.5 in", sleeve: "25.0 in", length: "29.0 in", standard: "UK/US 38 (EU 48)" },
      { size: "M", chest: "40 in", shoulder: "18.0 in", sleeve: "25.5 in", length: "29.5 in", standard: "UK/US 40 (EU 50)" },
      { size: "L", chest: "42 in", shoulder: "18.5 in", sleeve: "26.0 in", length: "30.0 in", standard: "UK/US 42 (EU 52)" },
      { size: "XL", chest: "44 in", shoulder: "19.0 in", sleeve: "26.5 in", length: "30.5 in", standard: "UK/US 44 (EU 54)" },
      { size: "XXL", chest: "46 in", shoulder: "19.5 in", sleeve: "27.0 in", length: "31.0 in", standard: "UK/US 46 (EU 56)" },
    ],
    cmRows: [
      { size: "XS", chest: "91 cm", shoulder: "43.2 cm", sleeve: "62.2 cm", length: "72.4 cm", standard: "UK/US 36 (EU 46)" },
      { size: "S", chest: "96.5 cm", shoulder: "44.5 cm", sleeve: "63.5 cm", length: "73.7 cm", standard: "UK/US 38 (EU 48)" },
      { size: "M", chest: "101.6 cm", shoulder: "45.7 cm", sleeve: "64.8 cm", length: "75.0 cm", standard: "UK/US 40 (EU 50)" },
      { size: "L", chest: "106.7 cm", shoulder: "47.0 cm", sleeve: "66.0 cm", length: "76.2 cm", standard: "UK/US 42 (EU 52)" },
      { size: "XL", chest: "111.8 cm", shoulder: "48.3 cm", sleeve: "67.3 cm", length: "77.5 cm", standard: "UK/US 44 (EU 54)" },
      { size: "XXL", chest: "116.8 cm", shoulder: "49.5 cm", sleeve: "68.6 cm", length: "78.7 cm", standard: "UK/US 46 (EU 56)" },
    ],
    measuringTips: [
      { title: "Chest", desc: "Measure around the fullest circumference of your chest under your armpits." },
      { title: "Shoulder", desc: "Measure from the tip of one shoulder bone across the natural back curve to the other." },
      { title: "Sleeve", desc: "Measure from the shoulder seam down along the outer arm to the wrist bone." },
    ],
  },
  accessories: {
    title: "Accessories & Footwear Sizing",
    subtitle: "Includes handcrafted juttis, mojaris, belts, and scarves sizing metrics.",
    columns: ["Size", "Footwear (EU/UK/US)", "Foot Length", "Belt Waist", "Dimension"],
    rows: [
      { size: "XS", footwear: "EU 37 / UK 4 / US 6", footLength: "9.25 in", belt: "28 - 30 in", dimension: "Standard Petite" },
      { size: "S", footwear: "EU 38 / UK 5 / US 7", footLength: "9.50 in", belt: "30 - 32 in", dimension: "Small Formal" },
      { size: "M", footwear: "EU 39 / UK 6 / US 8", footLength: "9.85 in", belt: "32 - 34 in", dimension: "Regular Classic" },
      { size: "L", footwear: "EU 40 / UK 7 / US 9", footLength: "10.2 in", belt: "34 - 36 in", dimension: "Comfort Fit" },
      { size: "XL", footwear: "EU 41 / UK 8 / US 10", footLength: "10.5 in", belt: "36 - 38 in", dimension: "Grand / Long" },
      { size: "Free Size", footwear: "Universal Fit", footLength: "Adjustable", belt: "Adjustable 28-38 in", dimension: "Dupattas: 2.5m x 1.1m | Potli: 9x8 in" },
    ],
    cmRows: [
      { size: "XS", footwear: "EU 37 / UK 4 / US 6", footLength: "23.5 cm", belt: "71 - 76 cm", dimension: "Standard Petite" },
      { size: "S", footwear: "EU 38 / UK 5 / US 7", footLength: "24.1 cm", belt: "76 - 81 cm", dimension: "Small Formal" },
      { size: "M", footwear: "EU 39 / UK 6 / US 8", footLength: "25.0 cm", belt: "81 - 86 cm", dimension: "Regular Classic" },
      { size: "L", footwear: "EU 40 / UK 7 / US 9", footLength: "25.9 cm", belt: "86 - 91 cm", dimension: "Comfort Fit" },
      { size: "XL", footwear: "EU 41 / UK 8 / US 10", footLength: "26.7 cm", belt: "91 - 96 cm", dimension: "Grand / Long" },
      { size: "Free Size", footwear: "Universal Fit", footLength: "Adjustable", belt: "Adjustable 71-96 cm", dimension: "Dupattas: 2.5m x 1.1m | Potli: 23x20 cm" },
    ],
    measuringTips: [
      { title: "Footwear / Juttis", desc: "Stand flat on a piece of paper, trace your heel to longest toe, and match in cm/in." },
      { title: "Belts & Kamarbands", desc: "Measure over your ethnic outfit at the high waist or low waist as preferred." },
    ],
  },
  jewellery: {
    title: "Royal Jewellery, Earrings & Nose Pins Sizing",
    subtitle: "Specifications for necklaces, bangles, rings, earrings/jhumkas, and bridal nose pins (naths).",
    columns: ["Size", "Bangle Size (Dia)", "Bangle Circumference", "Ring Size (US)", "Necklace Style & Drop"],
    rows: [
      { size: "XS", bangleDia: "2.2 (2.12 in)", bangleCirc: "6.68 in", ring: "Size 5 - 6 (15.7 mm)", necklace: "Choker (14 - 15 in drop)" },
      { size: "S", bangleDia: "2.4 (2.25 in)", bangleCirc: "7.06 in", ring: "Size 6 - 7 (16.5 mm)", necklace: "Collar (16 in drop)" },
      { size: "M", bangleDia: "2.6 (2.37 in)", bangleCirc: "7.46 in", ring: "Size 7 - 8 (17.3 mm)", necklace: "Princess (18 in drop)" },
      { size: "L", bangleDia: "2.8 (2.50 in)", bangleCirc: "7.85 in", ring: "Size 8 - 9 (18.1 mm)", necklace: "Matinee (20 - 22 in drop)" },
      { size: "XL", bangleDia: "2.10 (2.62 in)", bangleCirc: "8.24 in", ring: "Size 9 - 10 (19.0 mm)", necklace: "Rani Haar / Opera (24 - 30 in drop)" },
      { size: "Free Size", bangleDia: "Adjustable / Openable", bangleCirc: "Fits 2.2 - 2.8", ring: "Adjustable Band", necklace: "Adjustable Dori / Extension" },
    ],
    cmRows: [
      { size: "XS", bangleDia: "5.4 cm", bangleCirc: "17.0 cm", ring: "15.7 mm", necklace: "Choker (35 - 38 cm)" },
      { size: "S", bangleDia: "5.7 cm", bangleCirc: "17.9 cm", ring: "16.5 mm", necklace: "Collar (40 cm)" },
      { size: "M", bangleDia: "6.0 cm", bangleCirc: "18.9 cm", ring: "17.3 mm", necklace: "Princess (45 cm)" },
      { size: "L", bangleDia: "6.3 cm", bangleCirc: "19.9 cm", ring: "18.1 mm", necklace: "Matinee (50 - 55 cm)" },
      { size: "XL", bangleDia: "6.7 cm", bangleCirc: "20.9 cm", ring: "19.0 mm", necklace: "Rani Haar (60 - 75 cm)" },
      { size: "Free Size", bangleDia: "Adjustable", bangleCirc: "Fits 17 - 20 cm", ring: "Adjustable", necklace: "Adjustable Dori" },
    ],
    earringsColumns: ["Size", "Earring Style", "Drop Length", "Width / Diameter", "Backing / Anchor", "Look & Feel"],
    earringsRows: [
      { size: "XS", style: "Royal Studs / Tops", drop: "0.4 in", width: "0.4 in", backing: "Bombay Screw / Post", look: "Subtle & Daily Royal" },
      { size: "S", style: "Petite Jhumkis & Drops", drop: "1.2 in", width: "0.8 in", backing: "Push Back with Support", look: "Festive Minimal" },
      { size: "M", style: "Classic Chandbalis", drop: "2.2 in", width: "1.5 in", backing: "French Clip / Post", look: "Signature Wedding" },
      { size: "L", style: "Grand Bahubali Drops", drop: "3.2 in", width: "2.0 in", backing: "Post + Pearl Sahara Hook", look: "Royal Statement" },
      { size: "XL", style: "Bridal Shoulder Dusters", drop: "4.2 in", width: "2.5 in", backing: "Triple Ear-Chain Anchor", look: "Grand Ceremony Heirloom" },
      { size: "Free Size", style: "Adjustable Ear Cuffs", drop: "1.5 - 3.5 in", width: "Adjustable", backing: "Non-Pierced Clip-On", look: "Universal Fit" },
    ],
    earringsCmRows: [
      { size: "XS", style: "Royal Studs / Tops", drop: "1.0 cm", width: "1.0 cm", backing: "Bombay Screw / Post", look: "Subtle & Daily Royal" },
      { size: "S", style: "Petite Jhumkis & Drops", drop: "3.0 cm", width: "2.0 cm", backing: "Push Back with Support", look: "Festive Minimal" },
      { size: "M", style: "Classic Chandbalis", drop: "5.5 cm", width: "3.8 cm", backing: "French Clip / Post", look: "Signature Wedding" },
      { size: "L", style: "Grand Bahubali Drops", drop: "8.0 cm", width: "5.0 cm", backing: "Post + Pearl Sahara Hook", look: "Royal Statement" },
      { size: "XL", style: "Bridal Shoulder Dusters", drop: "10.5 cm", width: "6.3 cm", backing: "Triple Ear-Chain Anchor", look: "Grand Ceremony Heirloom" },
      { size: "Free Size", style: "Adjustable Ear Cuffs", drop: "3.8 - 9.0 cm", width: "Adjustable", backing: "Non-Pierced Clip-On", look: "Universal Fit" },
    ],
    nosePinsColumns: ["Size", "Nose Pin / Nath Style", "Motif Size", "Ring Diameter", "Chain / Dori Length", "Fitting Type"],
    nosePinsRows: [
      { size: "XS", style: "Kundan Solitaire Stud / Laung", motif: "0.08 in (2 mm)", ring: "N/A (Stud)", chain: "N/A", fit: "Pierced (20 Gauge Post)" },
      { size: "S", style: "Floral Nose Ring / Petite Nathni", motif: "0.15 in (4 mm)", ring: "0.4 in (10 mm)", chain: "N/A", fit: "Pierced or Light Clip" },
      { size: "M", style: "Classic Traditional Nath", motif: "0.35 in (9 mm)", ring: "0.8 in (20 mm)", chain: "6.0 in (15 cm) Pearl Dori", fit: "Clip-On / Pierced" },
      { size: "L", style: "Grand Bridal Kundan Nath", motif: "0.60 in (15 mm)", ring: "1.4 in (35 mm)", chain: "8.0 in (20 cm) 2-Strand Pearl", fit: "Clip-On + Hair Hook" },
      { size: "XL", style: "Regal Awadhi Tehzeeb Nath", motif: "1.00 in (25 mm)", ring: "2.0 in (50 mm)", chain: "10.0 in (25 cm) 3-Strand Kundan", fit: "Ceremonial Bridal Statement" },
      { size: "Free Size", style: "Universal Pressing Clip Nath", motif: "0.45 in (12 mm)", ring: "1.1 in (28 mm)", chain: "7.0 in (18 cm) Detachable", fit: "Non-Pierced Spring Clip" },
    ],
    nosePinsCmRows: [
      { size: "XS", style: "Kundan Solitaire Stud / Laung", motif: "0.2 cm", ring: "N/A (Stud)", chain: "N/A", fit: "Pierced (20 Gauge Post)" },
      { size: "S", style: "Floral Nose Ring / Petite Nathni", motif: "0.4 cm", ring: "1.0 cm", chain: "N/A", fit: "Pierced or Light Clip" },
      { size: "M", style: "Classic Traditional Nath", motif: "0.9 cm", ring: "2.0 cm", chain: "15 cm Pearl Dori", fit: "Clip-On / Pierced" },
      { size: "L", style: "Grand Bridal Kundan Nath", motif: "1.5 cm", ring: "3.5 cm", chain: "20 cm 2-Strand Pearl", fit: "Clip-On + Hair Hook" },
      { size: "XL", style: "Regal Awadhi Tehzeeb Nath", motif: "2.5 cm", ring: "5.0 cm", chain: "25 cm 3-Strand Kundan", fit: "Ceremonial Bridal Statement" },
      { size: "Free Size", style: "Universal Pressing Clip Nath", motif: "1.2 cm", ring: "2.8 cm", chain: "18 cm Detachable", fit: "Non-Pierced Spring Clip" },
    ],
    measuringTips: [
      { title: "Earrings & Sahara Hooks", desc: "Statement chandbalis (L & XL) include handcrafted pearl ear chains (sahare) that hook into hair to distribute weight comfortably." },
      { title: "Nose Pins & Bridal Naths", desc: "Available in both pierced and non-pierced clip-on versions. Measure from nostril piercing to desired lower lip drop for ideal ring diameter." },
      { title: "Bangles & Chokers", desc: "Bring thumb and pinky finger together to measure widest knuckle circumference for bangles. Chokers sit high on the collarbone." },
    ],
  },
};

export default function SizeGuideModal({ isOpen, onClose, initialCategory = "women" }) {
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [unit, setUnit] = useState("in"); // "in" | "cm"

  if (!isOpen) return null;

  const currentData = sizeGuideData[activeTab] || sizeGuideData.women;
  const rows = unit === "cm" && currentData.cmRows ? currentData.cmRows : currentData.rows;
  const earringsRows = unit === "cm" && currentData.earringsCmRows ? currentData.earringsCmRows : currentData.earringsRows;
  const nosePinsRows = unit === "cm" && currentData.nosePinsCmRows ? currentData.nosePinsCmRows : currentData.nosePinsRows;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* MODAL CONTAINER */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-[#dfba6a]/40 bg-[#0c0a08] shadow-[0_0_50px_rgba(223,186,106,0.15)] text-[#e8dbbf]">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#dfba6a]/20 bg-[#070605] px-6 py-5 md:px-8">
          <div>
            <span className="text-[10px] tracking-[0.35em] text-[#dfba6a]">THE SHAAN COLLECTIVE</span>
            <h2 className="mt-1 font-serif text-2xl text-[#fae39d] md:text-3xl">SIZE & MEASUREMENT GUIDE</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center border border-[#dfba6a]/30 text-[#dfba6a] transition hover:border-[#fae39d] hover:bg-[#dfba6a] hover:text-[#070605]"
          >
            ✕
          </button>
        </div>

        {/* TABS & UNIT TOGGLE */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfba6a]/15 bg-[#090807] px-6 py-3 md:px-8">
          {/* CATEGORY TABS */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "women", label: "Women (Gharara)" },
              { id: "men", label: "Men (Jackets)" },
              { id: "accessories", label: "Accessories" },
              { id: "jewellery", label: "Jewellery, Earrings & Naths" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`border px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.2em] transition ${
                  activeTab === tab.id
                    ? "border-[#fae39d] bg-[#dfba6a] text-[#070605]"
                    : "border-[#dfba6a]/30 bg-[#070605] text-[#c4b28f] hover:border-[#dfba6a] hover:text-[#fae39d]"
                }`}
              >
                {tab.label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* UNIT SWITCH */}
          <div className="flex items-center gap-1 border border-[#dfba6a]/30 p-0.5 bg-[#070605]">
            <button
              type="button"
              onClick={() => setUnit("in")}
              className={`px-3 py-1 text-[10px] font-semibold tracking-wider transition ${
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
              className={`px-3 py-1 text-[10px] font-semibold tracking-wider transition ${
                unit === "cm"
                  ? "bg-[#dfba6a] text-[#070605]"
                  : "text-[#c4b28f] hover:text-[#fae39d]"
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          <div>
            <h3 className="font-serif text-lg text-[#fae39d]">{currentData.title}</h3>
            <p className="mt-1 text-xs text-[#a8997a] tracking-wide">{currentData.subtitle}</p>
          </div>

          {/* MAIN SIZING TABLE */}
          <div>
            {activeTab === "jewellery" && (
              <h4 className="font-serif text-sm tracking-[0.2em] text-[#fae39d] mb-3 uppercase">
                1. Necklaces, Bangles & Rings
              </h4>
            )}
            <div className="overflow-x-auto border border-[#dfba6a]/20 bg-[#070605]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#dfba6a]/30 bg-[#120f0c] text-[#fae39d]">
                    {currentData.columns.map((col, idx) => (
                      <th key={idx} className="p-3.5 font-serif tracking-[0.15em] text-[11px] font-normal uppercase">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dfba6a]/10">
                  {rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#dfba6a]/5 transition-colors"
                    >
                      <td className="p-3.5 font-bold text-[#fae39d] bg-[#dfba6a]/5">
                        {row.size}
                      </td>
                      {activeTab === "women" && (
                        <>
                          <td className="p-3.5 text-[#e8dbbf]">{row.bust}</td>
                          <td className="p-3.5 text-[#e8dbbf]">{row.waist}</td>
                          <td className="p-3.5 text-[#e8dbbf]">{row.hip}</td>
                          <td className="p-3.5 text-[#e8dbbf]">{row.kurta}</td>
                          <td className="p-3.5 text-[#e8dbbf]">{row.gharara}</td>
                          <td className="p-3.5 text-[#dfba6a] font-medium">{row.standard}</td>
                        </>
                      )}
                      {activeTab === "men" && (
                        <>
                          <td className="p-3.5 text-[#e8dbbf]">{row.chest}</td>
                          <td className="p-3.5 text-[#e8dbbf]">{row.shoulder}</td>
                          <td className="p-3.5 text-[#e8dbbf]">{row.sleeve}</td>
                          <td className="p-3.5 text-[#e8dbbf]">{row.length}</td>
                          <td className="p-3.5 text-[#dfba6a] font-medium">{row.standard}</td>
                        </>
                      )}
                      {activeTab === "accessories" && (
                        <>
                          <td className="p-3.5 text-[#dfba6a] font-medium">{row.footwear}</td>
                          <td className="p-3.5 text-[#e8dbbf]">{row.footLength}</td>
                          <td className="p-3.5 text-[#e8dbbf]">{row.belt}</td>
                          <td className="p-3.5 text-[#c4b28f]">{row.dimension}</td>
                        </>
                      )}
                      {activeTab === "jewellery" && (
                        <>
                          <td className="p-3.5 text-[#dfba6a] font-medium">{row.bangleDia}</td>
                          <td className="p-3.5 text-[#e8dbbf]">{row.bangleCirc}</td>
                          <td className="p-3.5 text-[#e8dbbf]">{row.ring}</td>
                          <td className="p-3.5 text-[#c4b28f]">{row.necklace}</td>
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
            <div>
              <h4 className="font-serif text-sm tracking-[0.2em] text-[#fae39d] mb-3 uppercase">
                2. Royal Earrings & Chandbalis Size Chart
              </h4>
              <div className="overflow-x-auto border border-[#dfba6a]/20 bg-[#070605]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#dfba6a]/30 bg-[#120f0c] text-[#fae39d]">
                      {currentData.earringsColumns.map((col, idx) => (
                        <th key={idx} className="p-3.5 font-serif tracking-[0.15em] text-[11px] font-normal uppercase">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfba6a]/10">
                    {earringsRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#dfba6a]/5 transition-colors">
                        <td className="p-3.5 font-bold text-[#fae39d] bg-[#dfba6a]/5">{row.size}</td>
                        <td className="p-3.5 text-[#dfba6a] font-medium">{row.style}</td>
                        <td className="p-3.5 text-[#e8dbbf]">{row.drop}</td>
                        <td className="p-3.5 text-[#e8dbbf]">{row.width}</td>
                        <td className="p-3.5 text-[#c4b28f]">{row.backing}</td>
                        <td className="p-3.5 text-[#e8dbbf]">{row.look}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* JEWELLERY EXTENSION: NOSE PINS & NATHS TABLE */}
          {activeTab === "jewellery" && currentData.nosePinsColumns && (
            <div>
              <h4 className="font-serif text-sm tracking-[0.2em] text-[#fae39d] mb-3 uppercase">
                3. Royal Nose Pins & Bridal Naths Size Chart
              </h4>
              <div className="overflow-x-auto border border-[#dfba6a]/20 bg-[#070605]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#dfba6a]/30 bg-[#120f0c] text-[#fae39d]">
                      {currentData.nosePinsColumns.map((col, idx) => (
                        <th key={idx} className="p-3.5 font-serif tracking-[0.15em] text-[11px] font-normal uppercase">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfba6a]/10">
                    {nosePinsRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#dfba6a]/5 transition-colors">
                        <td className="p-3.5 font-bold text-[#fae39d] bg-[#dfba6a]/5">{row.size}</td>
                        <td className="p-3.5 text-[#dfba6a] font-medium">{row.style}</td>
                        <td className="p-3.5 text-[#e8dbbf]">{row.motif}</td>
                        <td className="p-3.5 text-[#e8dbbf]">{row.ring}</td>
                        <td className="p-3.5 text-[#c4b28f]">{row.chain}</td>
                        <td className="p-3.5 text-[#e8dbbf]">{row.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MEASURING TIPS */}
          <div className="border border-[#dfba6a]/20 bg-[#0e0c0a] p-5">
            <h4 className="font-serif text-sm tracking-[0.2em] text-[#fae39d] uppercase">
              How to Measure & Fit Guidelines
            </h4>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {currentData.measuringTips.map((tip, idx) => (
                <div key={idx} className="border-l border-[#dfba6a]/40 pl-3">
                  <p className="text-xs font-semibold text-[#fae39d]">{tip.title}</p>
                  <p className="mt-1 text-[11px] leading-5 text-[#c4b28f]">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BESPOKE NOTE */}
          <div className="border border-[#dfba6a]/20 bg-[#070605] p-4 text-center">
            <p className="text-xs tracking-wider text-[#eed9a4]">
              Need custom tailoring, non-pierced nath clips, or made-to-measure assistance? Contact our royal styling concierge.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-[#dfba6a]/20 bg-[#070605] px-6 py-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="border border-[#dfba6a] bg-[#dfba6a] px-6 py-2.5 text-[10px] font-bold tracking-[0.25em] text-[#070605] hover:bg-[#fae39d] transition"
          >
            CLOSE GUIDE
          </button>
        </div>
      </div>
    </div>
  );
}
