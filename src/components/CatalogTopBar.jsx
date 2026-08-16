import { useState, useRef, useEffect } from "react";

export default function CatalogTopBar({
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  totalCount = 0,
  itemLabel = "Products",
  onOpenMobileFilter,
  activeFilterCount = 0,
  placeholder = "Search products",
  currentPage = 1,
  totalPages = 1,
}) {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { label: "Best Selling", value: "Featured" },
    { label: "Price: Low → High", value: "Price: Low → High" },
    { label: "Price: High → Low", value: "Price: High → Low" },
    { label: "Name: A → Z", value: "Name: A → Z" },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortOption)?.label || "Best Selling";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* 1. TOP SEARCH BAR */}
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="h-4 w-4 text-[#dfba6a]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-[#dfba6a]/30 bg-[#0e0c0a] py-3.5 pl-11 pr-10 text-sm text-[#fae39d] outline-none transition placeholder:text-[#8e7a5c] focus:border-[#fae39d] focus:bg-[#120f0c]"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#dfba6a] hover:text-[#fae39d]"
          >
            ✕
          </button>
        )}
      </div>

      {/* 2. BAR BELOW SEARCH: COUNT (LEFT), PAGE NUMBER (CENTER) & SORT (RIGHT) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dfba6a]/15 pb-3 pt-1">
        {/* LEFT: MOBILE FILTER BUTTON & PRODUCT COUNT */}
        <div className="flex items-center gap-4">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={onOpenMobileFilter}
            className="flex items-center gap-2 border border-[#dfba6a]/40 bg-[#0e0c0a] px-3.5 py-1.5 text-xs tracking-[0.2em] text-[#fae39d] transition hover:border-[#fae39d] hover:bg-[#dfba6a] hover:text-[#070605] lg:hidden"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>FILTER {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}</span>
          </button>

          {/* Product Count */}
          <p className="text-xs tracking-[0.15em] text-[#c4b28f]">
            <span className="font-semibold text-[#fae39d]">{totalCount}</span>{" "}
            {itemLabel}
          </p>
        </div>

        {/* CENTER: PAGE NUMBER INDICATOR */}
        {totalCount > 0 && (
          <div className="flex items-center gap-2 text-center text-xs tracking-[0.25em] text-[#fae39d]">
            <span className="text-[10px] text-[#dfba6a]">✦</span>
            <span className="font-semibold">
              PAGE {currentPage} OF {totalPages}
            </span>
            <span className="text-[10px] text-[#dfba6a]">✦</span>
          </div>
        )}

        {/* RIGHT: SORT DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            className="flex items-center gap-2.5 text-xs tracking-[0.15em] text-[#eed9a4] transition hover:text-[#fae39d]"
          >
            <span className="text-[#8e7a5c]">SORT:</span>
            <span className="font-medium text-[#fae39d]">{currentSortLabel}</span>
            <span className="text-[10px] text-[#dfba6a]">
              {sortDropdownOpen ? "⌃" : "⌵"}
            </span>
          </button>

          {sortDropdownOpen && (
            <div className="absolute right-0 top-full z-30 mt-2 w-48 border border-[#dfba6a]/40 bg-[#0e0c0a] py-2 shadow-2xl backdrop-blur-md">
              {sortOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => {
                    setSortOption(opt.value);
                    setSortDropdownOpen(false);
                  }}
                  className={`block w-full px-4 py-2.5 text-left text-xs tracking-[0.15em] transition ${
                    sortOption === opt.value
                      ? "bg-[#dfba6a]/20 text-[#fae39d] font-semibold"
                      : "text-[#c4b28f] hover:bg-[#dfba6a]/10 hover:text-[#fae39d]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
