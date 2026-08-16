export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 49,
  className = "",
}) {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers array with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={`mt-14 flex flex-col items-center justify-between gap-6 border-t border-[#dfba6a]/20 pt-8 sm:flex-row ${className}`}>
      {/* ITEM RANGE SUMMARY */}
      <p className="text-xs tracking-[0.2em] text-[#c4b28f]">
        Showing <span className="font-semibold text-[#fae39d]">{startItem}–{endItem}</span> of{" "}
        <span className="font-semibold text-[#fae39d]">{totalItems}</span> pieces
      </p>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 ? (
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex h-9 items-center justify-center border border-[#dfba6a]/40 bg-[#0c0a08] px-3.5 text-xs tracking-[0.2em] text-[#fae39d] transition hover:border-[#fae39d] hover:bg-[#dfba6a] hover:!text-[#070605] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#dfba6a]/40 disabled:hover:bg-[#0c0a08] disabled:hover:!text-[#fae39d]"
          >
            ← PREV
          </button>

          {/* PAGE NUMBERS */}
          {pages.map((p, idx) => {
            if (p === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="flex h-9 w-7 items-center justify-center text-xs text-[#8e7a5c]"
                >
                  ...
                </span>
              );
            }

            const isCurrent = p === currentPage;
            return (
              <button
                key={`page-${p}`}
                type="button"
                onClick={() => onPageChange(p)}
                className={`flex h-9 min-w-9 items-center justify-center border px-2 text-xs font-semibold tracking-wider transition ${
                  isCurrent
                    ? "border-[#fae39d] bg-[#dfba6a] !text-[#070605] font-bold shadow-[0_0_15px_rgba(223,186,106,0.35)]"
                    : "border-[#dfba6a]/30 bg-[#0c0a08] text-[#e8dbbf] hover:border-[#dfba6a] hover:bg-[#dfba6a]/15 hover:text-[#fae39d]"
                }`}
              >
                {p}
              </button>
            );
          })}

          {/* NEXT BUTTON */}
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="flex h-9 items-center justify-center border border-[#dfba6a]/40 bg-[#0c0a08] px-3.5 text-xs tracking-[0.2em] text-[#fae39d] transition hover:border-[#fae39d] hover:bg-[#dfba6a] hover:!text-[#070605] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#dfba6a]/40 disabled:hover:bg-[#0c0a08] disabled:hover:!text-[#fae39d]"
          >
            NEXT →
          </button>
        </div>
      ) : (
        <div className="border border-[#dfba6a]/30 bg-[#0c0a08] px-4 py-1.5 text-[11px] tracking-[0.25em] text-[#fae39d]">
          PAGE 1 OF 1
        </div>
      )}
    </div>
  );
}
