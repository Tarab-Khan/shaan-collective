import { Link } from "react-router-dom";
import { GoldWaveOverlay, GoldFlower } from "./GoldDecorations";

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="text-xs tracking-[0.3em] text-[#fae39d]">
        {title}
      </h4>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            onClick={() => window.scrollTo(0, 0)}
            className="block text-xs tracking-widest text-[#e8dbbf] transition-colors hover:text-[#fae39d]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#dfba6a]/20 bg-[#070605] text-[#e8dbbf]">

      {/* FLOWING GOLDEN WAVES ACROSS FOOTER */}
      <div className="relative w-full overflow-hidden">
        <GoldWaveOverlay height="h-28" className="opacity-90" />
      </div>

      <div className="mx-auto max-w-7xl px-8 pb-20 pt-4">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 sm:gap-12">

          {/* BRAND */}

          <div>
            <GoldFlower size={18} />
            <h3 className="font-serif text-3xl tracking-[0.2em] text-[#fae39d]">
              TS
            </h3>

            <div className="mt-4 h-px w-12 bg-[#dfba6a]" />

            <p className="mt-5 max-w-xs text-xs leading-6 tracking-widest text-[#e8dbbf]">
              The Shaan Collective — where timeless
              craftsmanship meets modern royalty.
            </p>

          </div>


          {/* NAVIGATE */}

          <FooterColumn
            title="NAVIGATE"
            items={[
              { label: "Gharara", path: "/ghararas" },
              { label: "Jacket", path: "/men" },
              { label: "Jewellery", path: "/jewellery" },
              { label: "Accessories", path: "/accessories" },
              { label: "Wishlist", path: "/wishlist" },
              { label: "Cart", path: "/cart" },
            ]}
          />


          {/* INFORMATION */}

          <FooterColumn
            title="INFORMATION"
            items={[
              { label: "About Us", path: "/about" },
              { label: "Contact", path: "/contact" },
              { label: "Size Guide", path: "/size-guide" },
              { label: "Shipping", path: "/shipping" },
              { label: "Atelier Admin Vault", path: "/admin" },
            ]}
          />


          {/* FOLLOW */}

          <FooterColumn
            title="FOLLOW US"
            items={[
              { label: "Instagram", path: "#" },
              { label: "Facebook", path: "#" },
              { label: "Pinterest", path: "#" },
              { label: "YouTube", path: "#" },
            ]}
          />

        </div>


        {/* COPYRIGHT */}

        <div className="mt-16 border-t border-[#dfba6a]/20 pt-6 text-center text-[10px] tracking-[0.3em] text-[#c4b28f]">
          © 2026 THE SHAAN COLLECTIVE ALL RIGHTS RESERVED
        </div>

      </div>

    </footer>
  );
}

export default Footer;