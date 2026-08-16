import { useState, useEffect } from "react";

export default function CatalogFilterSidebar({
  allProducts = [],
  selectedCategories = [],
  setSelectedCategories,
  selectedOccasions = [],
  setSelectedOccasions,
  selectedColors = [],
  setSelectedColors,
  selectedFabrics = [],
  setSelectedFabrics,
  priceRange,
  setPriceRange,
  minPossiblePrice = 0,
  maxPossiblePrice = 250000,
  availableCategories = [],
  availableOccasions = [],
  availableColors = [],
  availableFabrics = [],
  onClearAll,
  isOpenMobile = false,
  setIsOpenMobile,
}) {
  // Accordion open/close state
  const [openSections, setOpenSections] = useState({
    category: true,
    collection: true,
    color: true,
    fabric: true,
    price: true,
  });

  // Local price input state so typing numbers doesn't prematurely trigger filters or jump scroll
  const [localMinPrice, setLocalMinPrice] = useState(priceRange[0]);
  const [localMaxPrice, setLocalMaxPrice] = useState(priceRange[1]);

  useEffect(() => {
    setLocalMinPrice(priceRange[0]);
    setLocalMaxPrice(priceRange[1]);
  }, [priceRange]);

  const handleApplyPrice = () => {
    let minVal = Number(localMinPrice);
    let maxVal = Number(localMaxPrice);

    if (isNaN(minVal) || minVal < 0) minVal = minPossiblePrice;
    if (isNaN(maxVal) || maxVal < 0) maxVal = maxPossiblePrice;

    if (minVal > maxVal) {
      const temp = minVal;
      minVal = maxVal;
      maxVal = temp;
    }

    setLocalMinPrice(minVal);
    setLocalMaxPrice(maxVal);
    setPriceRange([minVal, maxVal]);
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleCheckbox = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  // Calculate counts for dynamic display (checking fields & descriptions)
  const getCount = (type, value) => {
    const valLower = value.toLowerCase();
    return allProducts.filter((p) => {
      const descLower = p.description?.toLowerCase() || "";
      if (type === "category") return p.category?.toLowerCase() === valLower || descLower.includes(valLower);
      if (type === "occasion") return (Array.isArray(p.occasion) ? p.occasion : [p.occasion]).some((occ) => occ?.toLowerCase() === valLower) || descLower.includes(valLower);
      if (type === "color") return p.color?.toLowerCase() === valLower || descLower.includes(valLower);
      if (type === "fabric") return p.fabric?.toLowerCase() === valLower || descLower.includes(valLower);
      return true;
    }).length;
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedOccasions.length > 0 ||
    selectedColors.length > 0 ||
    selectedFabrics.length > 0 ||
    priceRange[0] > minPossiblePrice ||
    priceRange[1] < maxPossiblePrice;

  const content = (
    <div className="w-full">
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between border-b border-[#dfba6a]/20 pb-4">
        <h2 className="font-serif text-sm tracking-[0.25em] text-[#fae39d]">
          FILTER BY
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-[10px] tracking-[0.2em] text-[#dfba6a] transition hover:text-[#fae39d] hover:underline"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {/* 1. CATEGORY ACCORDION */}
      {availableCategories.length > 0 && (
        <div className="border-b border-[#dfba6a]/15 py-4">
          <button
            type="button"
            onClick={() => toggleSection("category")}
            className="flex w-full items-center justify-between text-left text-xs font-semibold tracking-[0.2em] text-[#eed9a4] transition hover:text-[#fae39d]"
          >
            <span>CATEGORY</span>
            <span className="text-sm font-light text-[#dfba6a]">
              {openSections.category ? "⌃" : "⌵"}
            </span>
          </button>

          {openSections.category && (
            <div className="mt-3.5 space-y-2.5">
              {availableCategories.map((cat) => {
                const count = getCount("category", cat);
                const isChecked = selectedCategories.includes(cat);
                return (
                  <label
                    key={cat}
                    className="flex cursor-pointer items-center justify-between text-xs text-[#c4b28f] transition hover:text-[#fae39d]"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          toggleCheckbox(
                            selectedCategories,
                            setSelectedCategories,
                            cat
                          )
                        }
                        className="h-3.5 w-3.5 rounded-none border border-[#dfba6a]/50 bg-[#070605] accent-[#dfba6a] focus:ring-0 focus:ring-offset-0"
                      />
                      <span>{cat}</span>
                    </div>
                    <span className="text-[11px] text-[#8e7a5c]">({count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. COLLECTION / OCCASION ACCORDION */}
      {availableOccasions.length > 0 && (
        <div className="border-b border-[#dfba6a]/15 py-4">
          <button
            type="button"
            onClick={() => toggleSection("collection")}
            className="flex w-full items-center justify-between text-left text-xs font-semibold tracking-[0.2em] text-[#eed9a4] transition hover:text-[#fae39d]"
          >
            <span>COLLECTION</span>
            <span className="text-sm font-light text-[#dfba6a]">
              {openSections.collection ? "⌃" : "⌵"}
            </span>
          </button>

          {openSections.collection && (
            <div className="mt-3.5 space-y-2.5">
              {availableOccasions.map((occ) => {
                const count = getCount("occasion", occ);
                const isChecked = selectedOccasions.includes(occ);
                return (
                  <label
                    key={occ}
                    className="flex cursor-pointer items-center justify-between text-xs text-[#c4b28f] transition hover:text-[#fae39d]"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          toggleCheckbox(
                            selectedOccasions,
                            setSelectedOccasions,
                            occ
                          )
                        }
                        className="h-3.5 w-3.5 rounded-none border border-[#dfba6a]/50 bg-[#070605] accent-[#dfba6a] focus:ring-0 focus:ring-offset-0"
                      />
                      <span>{occ}</span>
                    </div>
                    <span className="text-[11px] text-[#8e7a5c]">({count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3. COLOR ACCORDION */}
      {availableColors.length > 0 && (
        <div className="border-b border-[#dfba6a]/15 py-4">
          <button
            type="button"
            onClick={() => toggleSection("color")}
            className="flex w-full items-center justify-between text-left text-xs font-semibold tracking-[0.2em] text-[#eed9a4] transition hover:text-[#fae39d]"
          >
            <span>COLOR</span>
            <span className="text-sm font-light text-[#dfba6a]">
              {openSections.color ? "⌃" : "⌵"}
            </span>
          </button>

          {openSections.color && (
            <div className="mt-3.5 space-y-2.5">
              {availableColors.map((col) => {
                const count = getCount("color", col);
                const isChecked = selectedColors.includes(col);
                return (
                  <label
                    key={col}
                    className="flex cursor-pointer items-center justify-between text-xs text-[#c4b28f] transition hover:text-[#fae39d]"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          toggleCheckbox(selectedColors, setSelectedColors, col)
                        }
                        className="h-3.5 w-3.5 rounded-none border border-[#dfba6a]/50 bg-[#070605] accent-[#dfba6a] focus:ring-0 focus:ring-offset-0"
                      />
                      <span>{col}</span>
                    </div>
                    <span className="text-[11px] text-[#8e7a5c]">({count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. FABRIC ACCORDION */}
      {availableFabrics.length > 0 && (
        <div className="border-b border-[#dfba6a]/15 py-4">
          <button
            type="button"
            onClick={() => toggleSection("fabric")}
            className="flex w-full items-center justify-between text-left text-xs font-semibold tracking-[0.2em] text-[#eed9a4] transition hover:text-[#fae39d]"
          >
            <span>FABRIC</span>
            <span className="text-sm font-light text-[#dfba6a]">
              {openSections.fabric ? "⌃" : "⌵"}
            </span>
          </button>

          {openSections.fabric && (
            <div className="mt-3.5 space-y-2.5">
              {availableFabrics.map((fab) => {
                const count = getCount("fabric", fab);
                const isChecked = selectedFabrics.includes(fab);
                return (
                  <label
                    key={fab}
                    className="flex cursor-pointer items-center justify-between text-xs text-[#c4b28f] transition hover:text-[#fae39d]"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          toggleCheckbox(selectedFabrics, setSelectedFabrics, fab)
                        }
                        className="h-3.5 w-3.5 rounded-none border border-[#dfba6a]/50 bg-[#070605] accent-[#dfba6a] focus:ring-0 focus:ring-offset-0"
                      />
                      <span>{fab}</span>
                    </div>
                    <span className="text-[11px] text-[#8e7a5c]">({count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 5. PRICE ACCORDION */}
      <div className="py-4 border-b border-[#dfba6a]/15">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between text-left text-xs font-semibold tracking-[0.2em] text-[#eed9a4] transition hover:text-[#fae39d]"
        >
          <span>PRICE</span>
          <span className="text-sm font-light text-[#dfba6a]">
            {openSections.price ? "⌃" : "⌵"}
          </span>
        </button>

        {openSections.price && (
          <div className="mt-4 space-y-4">
            {/* MIN - MAX INPUTS */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1.5 text-[11px] text-[#8e7a5c]">₹</span>
                <input
                  type="number"
                  value={localMinPrice}
                  min={minPossiblePrice}
                  step={500}
                  onChange={(e) => setLocalMinPrice(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleApplyPrice();
                  }}
                  placeholder="Min"
                  className="w-full border border-[#dfba6a]/40 bg-[#0e0c0a] py-1.5 pl-6 pr-2 text-xs text-[#fae39d] outline-none focus:border-[#fae39d]"
                />
              </div>
              <span className="text-xs text-[#8e7a5c]">-</span>
              <div className="relative flex-1 flex items-center">
                <span className="absolute left-2.5 top-1.5 text-[11px] text-[#8e7a5c]">₹</span>
                <input
                  type="number"
                  value={localMaxPrice}
                  step={500}
                  onChange={(e) => setLocalMaxPrice(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleApplyPrice();
                  }}
                  placeholder="Max"
                  className="w-full border border-[#dfba6a]/40 bg-[#0e0c0a] py-1.5 pl-6 pr-6 text-xs text-[#fae39d] outline-none focus:border-[#fae39d]"
                />
                {Number(localMaxPrice) >= maxPossiblePrice && (
                  <span className="absolute right-2 text-xs font-bold text-[#fae39d] pointer-events-none" title="Includes higher prices">
                    +
                  </span>
                )}
              </div>
            </div>

            {/* RANGE SLIDER */}
            <div className="pt-1">
              <input
                type="range"
                min={minPossiblePrice}
                max={maxPossiblePrice}
                step={1000}
                value={localMaxPrice}
                onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none bg-[#dfba6a]/30 accent-[#dfba6a]"
              />
              <div className="mt-2 flex justify-between text-[10px] text-[#8e7a5c]">
                <span>₹ {Number(localMinPrice).toLocaleString("en-IN")}</span>
                <span>
                  ₹ {Number(localMaxPrice).toLocaleString("en-IN")}
                  {Number(localMaxPrice) >= maxPossiblePrice ? "+" : ""}
                </span>
              </div>
            </div>

            {/* DEDICATED APPLY PRICE BUTTON */}
            <button
              type="button"
              onClick={handleApplyPrice}
              className="w-full border border-[#dfba6a] bg-[#dfba6a] py-2 text-center text-[10px] font-extrabold tracking-[0.2em] !text-[#070605] transition hover:bg-[#fae39d] hover:!text-[#000000]"
            >
              APPLY PRICE
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-28">{content}</div>
      </aside>

      {/* MOBILE DRAWER MODAL */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* BACKDROP */}
          <div
            onClick={() => setIsOpenMobile(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* DRAWER CONTENT */}
          <div className="relative z-10 flex h-full w-4/5 max-w-sm flex-col overflow-y-auto border-r border-[#dfba6a]/30 bg-[#070605] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4">
              <span className="font-serif text-sm tracking-[0.2em] text-[#fae39d]">
                FILTERS
              </span>
              <button
                type="button"
                onClick={() => setIsOpenMobile(false)}
                className="text-xl text-[#dfba6a] hover:text-[#fae39d]"
              >
                ✕
              </button>
            </div>
            {content}
            <div className="mt-6 border-t border-[#dfba6a]/20 pt-4">
              <button
                type="button"
                onClick={() => setIsOpenMobile(false)}
                className="w-full border border-[#fae39d] bg-[#dfba6a] py-3 text-xs font-semibold tracking-[0.25em] text-[#070605] transition hover:bg-[#fae39d]"
              >
                APPLY FILTERS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
