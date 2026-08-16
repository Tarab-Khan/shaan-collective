import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import CatalogFilterSidebar from "../components/CatalogFilterSidebar";
import CatalogTopBar from "../components/CatalogTopBar";
import Pagination from "../components/Pagination";
import { useProducts } from "../context/ProductContext";
import { GoldSparkleCluster, GoldFlower, GoldSparkle } from "../components/GoldDecorations";

function WomenCollection() {
  const { womenProducts, jewelleryProducts, accessoryProducts, heroBanners } = useProducts();
  const heroImage = heroBanners?.women || heroBanners?.home;

  const { occasion } = useParams();
  const storageKey = occasion ? `women_${occasion.toLowerCase()}` : "women_all";
  const ITEMS_PER_PAGE = 49;

  const minPossiblePrice = 2000;
  const maxPossiblePrice = 200000;

  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState(() => {
    return sessionStorage.getItem(`${storageKey}_search`) || "";
  });
  const [sortOption, setSortOption] = useState(() => {
    return sessionStorage.getItem(`${storageKey}_sort`) || "Featured";
  });
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const saved = sessionStorage.getItem(`${storageKey}_categories`);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [];
  });
  const [selectedOccasions, setSelectedOccasions] = useState(() => {
    const saved = sessionStorage.getItem(`${storageKey}_occasions`);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return occasion ? [occasion.charAt(0).toUpperCase() + occasion.slice(1)] : [];
  });
  const [selectedColors, setSelectedColors] = useState(() => {
    const saved = sessionStorage.getItem(`${storageKey}_colors`);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [];
  });
  const [selectedFabrics, setSelectedFabrics] = useState(() => {
    const saved = sessionStorage.getItem(`${storageKey}_fabrics`);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [];
  });
  const [priceRange, setPriceRange] = useState(() => {
    const saved = sessionStorage.getItem(`${storageKey}_price`);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [minPossiblePrice, maxPossiblePrice];
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const catalogRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (catalogRef.current) {
      const rect = catalogRef.current.getBoundingClientRect();
      if (rect.top < -50) {
        const targetScroll = window.scrollY + rect.top - 80;
        window.scrollTo({ top: Math.max(0, targetScroll), behavior: "smooth" });
      }
    }
  }, [
    selectedCategories,
    selectedOccasions,
    selectedColors,
    selectedFabrics,
    priceRange,
    searchTerm,
    sortOption,
  ]);

  useEffect(() => {
    sessionStorage.setItem(`${storageKey}_search`, searchTerm);
  }, [searchTerm, storageKey]);

  useEffect(() => {
    sessionStorage.setItem(`${storageKey}_sort`, sortOption);
  }, [sortOption, storageKey]);

  useEffect(() => {
    sessionStorage.setItem(`${storageKey}_categories`, JSON.stringify(selectedCategories));
  }, [selectedCategories, storageKey]);

  useEffect(() => {
    sessionStorage.setItem(`${storageKey}_occasions`, JSON.stringify(selectedOccasions));
  }, [selectedOccasions, storageKey]);

  useEffect(() => {
    sessionStorage.setItem(`${storageKey}_colors`, JSON.stringify(selectedColors));
  }, [selectedColors, storageKey]);

  useEffect(() => {
    sessionStorage.setItem(`${storageKey}_fabrics`, JSON.stringify(selectedFabrics));
  }, [selectedFabrics, storageKey]);

  useEffect(() => {
    sessionStorage.setItem(`${storageKey}_price`, JSON.stringify(priceRange));
  }, [priceRange, storageKey]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [occasion]);

  const names = {
    bridal: "Bridal",
    wedding: "Wedding",
    party: "Party",
    festive: "Festive",
  };

  const collectionName = names[occasion] || "Women's Collection";

  const allWomenProducts = [
    ...(womenProducts || []).map((p) => ({ ...p, itemType: "gharara", link: `/ghararas/${p.id}`, wishlistKey: `gharara-${p.id}` })),
    ...(jewelleryProducts || []).map((p) => ({ ...p, itemType: "jewellery", link: `/jewellery/${p.id}`, wishlistKey: `jewellery-${p.id}` })),
    ...(accessoryProducts || []).filter((p) => p.gender === "Women" || !p.gender).map((p) => ({ ...p, itemType: "accessory", link: `/accessories/${p.id}`, wishlistKey: `accessory-${p.id}` })),
  ];

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedOccasions([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setPriceRange([minPossiblePrice, maxPossiblePrice]);
    setSearchTerm("");
  };

  // Dynamically derive available filter options from current products & descriptions
  const availableCategories = Array.from(
    new Set(
      allWomenProducts
        .map((p) => p.category)
        .filter(Boolean)
    )
  );
  const availableOccasions = Array.from(
    new Set(
      allWomenProducts
        .flatMap((p) => (Array.isArray(p.occasion) ? p.occasion : [p.occasion]))
        .filter(Boolean)
    )
  );
  const availableColors = Array.from(
    new Set(
      allWomenProducts
        .map((p) => p.color)
        .filter(Boolean)
    )
  );
  const availableFabrics = Array.from(
    new Set(
      allWomenProducts
        .map((p) => p.fabric)
        .filter(Boolean)
    )
  );

  const filteredProducts = allWomenProducts.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(
        (c) =>
          c.toLowerCase() === product.category?.toLowerCase() ||
          product.description?.toLowerCase().includes(c.toLowerCase())
      );

    const matchesOccasion =
      selectedOccasions.length === 0 ||
      selectedOccasions.some(
        (sel) =>
          product.occasion?.some((occ) => occ.toLowerCase() === sel.toLowerCase()) ||
          product.description?.toLowerCase().includes(sel.toLowerCase())
      );

    const matchesColor =
      selectedColors.length === 0 ||
      selectedColors.some(
        (c) =>
          c.toLowerCase() === product.color?.toLowerCase() ||
          product.description?.toLowerCase().includes(c.toLowerCase())
      );

    const matchesFabric =
      selectedFabrics.length === 0 ||
      selectedFabrics.some(
        (f) =>
          f.toLowerCase() === product.fabric?.toLowerCase() ||
          product.description?.toLowerCase().includes(f.toLowerCase())
      );

    const matchesPrice =
      priceRange[1] >= maxPossiblePrice
        ? product.price >= priceRange[0]
        : product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.fabric?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.color?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.occasion?.some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return (
      matchesCategory &&
      matchesOccasion &&
      matchesColor &&
      matchesFabric &&
      matchesPrice &&
      matchesSearch
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "Price: Low → High") return a.price - b.price;
    if (sortOption === "Price: High → Low") return b.price - a.price;
    if (sortOption === "Name: A → Z") return a.name.localeCompare(b.name);
    return 0;
  });

  // Calculate pagination (limit 49 items per page)
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (catalogRef.current) {
      const rect = catalogRef.current.getBoundingClientRect();
      const targetScroll = window.scrollY + rect.top - 80;
      window.scrollTo({ top: Math.max(0, targetScroll), behavior: "smooth" });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategories,
    selectedOccasions,
    selectedColors,
    selectedFabrics,
    priceRange,
    searchTerm,
    sortOption,
  ]);

  const activeFilterCount =
    selectedCategories.length +
    selectedOccasions.length +
    selectedColors.length +
    selectedFabrics.length +
    (priceRange[0] > minPossiblePrice || priceRange[1] < maxPossiblePrice ? 1 : 0);

  return (
    <main className="min-h-screen bg-[#070605] text-[#e8dbbf]">
      <Navbar />

      {/* =========================================
          PAGE HEADER (HOME HERO EFFECT)
      ========================================= */}
      <section className="relative overflow-hidden bg-[#070605] px-8 pb-24 pt-40 text-center border-b border-[#dfba6a]/20">
        {/* HERO BACKGROUND IMAGE WITH HOME GRADIENTS */}
        <div className="absolute inset-0 pointer-events-none">
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

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* BRAND LABEL */}
          <div className="mb-2 flex items-center justify-center gap-3">
            <p className="text-[11px] tracking-[0.45em] text-[#fae39d]">
              THE SHAAN COLLECTIVE
            </p>
            <GoldSparkle size={12} />
          </div>

          {/* PAGE NUMBER BEFORE HEADER TITLE */}
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#dfba6a]/40" />
            <p className="text-[11px] font-medium tracking-[0.4em] text-[#fae39d]">
              PAGE {currentPage} OF {totalPages}
            </p>
            <span className="h-px w-8 bg-[#dfba6a]/40" />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-[0.06em] text-[#fae39d] drop-shadow-[0_0_20px_rgba(250,227,157,0.3)] uppercase">
            {collectionName}
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3">
            <GoldFlower size={12} />
            <div className="h-px w-24 bg-linear-to-r from-[#fae39d] to-[#dfba6a]" />
            <GoldFlower size={12} />
          </div>

          <p className="mx-auto mt-6 max-w-xl font-serif text-sm sm:text-base italic leading-7 text-[#e8dbbf]/90">
            Handcrafted luxury ghararas, bespoke jewellery and accessories for unforgettable celebrations.
          </p>
        </div>
      </section>

      {/* =========================================
          CATALOG SECTION (SIDEBAR + PRODUCTS)
      ========================================= */}
      <section ref={catalogRef} className="min-h-[80vh] bg-[#070605] px-6 py-12 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row">
          {/* LEFT FILTER SIDEBAR */}
          <CatalogFilterSidebar
            allProducts={allWomenProducts}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedOccasions={selectedOccasions}
            setSelectedOccasions={setSelectedOccasions}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedFabrics={selectedFabrics}
            setSelectedFabrics={setSelectedFabrics}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minPossiblePrice={minPossiblePrice}
            maxPossiblePrice={maxPossiblePrice}
            availableCategories={availableCategories}
            availableOccasions={availableOccasions}
            availableColors={availableColors}
            availableFabrics={availableFabrics}
            onClearAll={handleClearAll}
            isOpenMobile={isMobileFilterOpen}
            setIsOpenMobile={setIsMobileFilterOpen}
          />

          {/* RIGHT COLUMN: SEARCH + SORT + PRODUCT GRID */}
          <div className="min-w-0 flex-1">
            {/* SEARCH & SORT TOPBAR */}
            <CatalogTopBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortOption={sortOption}
              setSortOption={setSortOption}
              totalCount={sortedProducts.length}
              itemLabel="Pieces"
              onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
              activeFilterCount={activeFilterCount}
              placeholder="Search products"
              currentPage={currentPage}
              totalPages={totalPages}
            />

            <div className="mt-8">
              {sortedProducts.length === 0 ? (
                <div className="border border-[#dfba6a]/20 bg-[#0e0c0a] py-24 text-center">
                  <p className="text-5xl text-[#fae39d]">♡</p>
                  <h2 className="mt-6 font-serif text-3xl text-[#fae39d]">
                    No Products Found
                  </h2>
                  <p className="mt-3 text-sm text-[#c4b28f]">
                    Try clearing or modifying your filter criteria.
                  </p>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="mt-8 border border-[#dfba6a] px-6 py-3 text-[10px] tracking-[0.25em] text-[#fae39d] transition hover:bg-[#dfba6a] hover:text-[#070605]"
                  >
                    RESET ALL FILTERS
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedProducts.map((product) => (
                      <ProductCard
                        key={`${product.itemType}-${product.id}`}
                        product={product}
                        link={product.link}
                        wishlistId={product.wishlistKey}
                        showNewTag={true}
                      />
                    ))}
                  </div>

                  {/* ROYAL GOLD PAGINATION */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalItems={sortedProducts.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default WomenCollection;