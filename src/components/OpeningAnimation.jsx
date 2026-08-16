import { useEffect, useRef } from "react";
import gsap from "gsap";
import shaanImage from "../assets/shaan-collective.jpeg";
import shaanLogo from "../assets/shaan-logo.png";

function OpeningAnimation({ onComplete }) {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // ==========================================
      // 1. TS
      // ==========================================

      tl.from(".ts-letter", {
        opacity: 0,
        scale: 0.7,
        letterSpacing: "0.8em",
        duration: 1,
        ease: "power3.out",
      })

        // ==========================================
        // 2. BRAND NAME
        // ==========================================

        .from(
          ".brand-name",
          {
            opacity: 0,
            y: 25,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35"
        )

        // ==========================================
        // 3. TAGLINE
        // ==========================================

        .from(
          ".tagline",
          {
            opacity: 0,
            y: 15,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.35"
        )

        // ==========================================
        // 4. LOGO DISAPPEARS + CURTAINS OPEN
        // ==========================================

        .to(
          ".intro-content",
          {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          "+=0.4"
        )

        .to(
          ".curtain-left",
          {
            xPercent: -100,
            duration: 1.8,
            ease: "power3.inOut",
          },
          "<"
        )

        .to(
          ".curtain-right",
          {
            xPercent: 100,
            duration: 1.8,
            ease: "power3.inOut",
          },
          "<"
        )

        // ==========================================
        // 5. HOLD IMAGE FOR A MOMENT
        // ==========================================

        .to({}, {
          duration: 0.4,
        })

        // ==========================================
        // IMAGE FADE OUT
        // ==========================================

        .to(".main-image", {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
        })

        // Fade the image fragments too, if they exist
        .to(
          ".image-fragment",
          {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<"
        )

        // Fade out gold particles if they exist
        .to(
          ".gold-particle",
          {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<"
        )

        // Give the fade a little time to finish
        .to({}, {
          duration: 0.2,
        })

        .call(() => {
          onComplete();
        });
    }, container);

    return () => ctx.revert();
  }, [onComplete]);

  return (
        <div
        ref={container}
        className="opening-screen fixed inset-0 z-50 overflow-hidden bg-[#050505]"
        >

        {/* ==================================
            MAIN IMAGE
        ================================== */}

        <img
            src={shaanImage}
            alt="The Shaan Collective"
            className="main-image absolute inset-0 z-10 h-full w-full object-contain"
        />

        {/* ==================================
            IMAGE FRAGMENTS
        ================================== */}

        <div className="pointer-events-none absolute inset-0 z-15 flex items-center justify-center">
            <div className="relative h-full aspect-square">

                {Array.from({ length: 24 }).map((_, index) => {
                const columns = 4;
                const rows = 6;

                const column = index % columns;
                const row = Math.floor(index / columns);

                return (
                    <div
                    key={index}
                    className="image-fragment absolute opacity-0"
                    style={{
                        width: `${100 / columns}%`,
                        height: `${100 / rows}%`,
                        left: `${column * (100 / columns)}%`,
                        top: `${row * (100 / rows)}%`,

                        backgroundImage: `url(${shaanImage})`,
                        backgroundSize: `${columns * 100}% ${rows * 100}%`,

                        backgroundPosition: `${(column / (columns - 1)) * 100}% ${
                        (row / (rows - 1)) * 100
                        }%`,
                    }}
                    />
                );
                })}

            </div>
        </div>
      {/* ==================================
          GOLD PARTICLES
      ================================== */}

      <div className="pointer-events-none absolute inset-0 z-25">
        {Array.from({ length: 35 }).map((_, index) => (
          <span
            key={index}
            className="gold-particle absolute left-1/2 top-1/2 h-1 w-1 rounded-full text-[#d4af37]"
          />
        ))}
      </div>

      {/* ==================================
          LOGO INTRO
      ================================== */}

      <div className="intro-content absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#050505] text-[#d4af68]">
        <div className="ts-letter text-8xl font-serif tracking-[0.3em]">
          TS
        </div>

        <div className="brand-name mt-6 text-2xl tracking-[0.25em]">
          THE SHAAN COLLECTIVE
        </div>

        <div className="tagline mt-3 text-sm tracking-[0.5em] text-[#c8b99a]">
          WHERE ROYALTY LIVES
        </div>
      </div>

      {/* ==================================
          LEFT CURTAIN
      ================================== */}

      <div
        className="curtain-left absolute inset-y-0 left-0 z-20 w-1/2 bg-[#0b0b0b]"
        style={{
          boxShadow: "inset -20px 0 40px rgba(0,0,0,0.35)",
        }}
      >
        <img
          src={shaanLogo}
          alt="The Shaan Collective"
          className="absolute left-1/2 top-1/2 h-24 w-auto -translate-x-1/2 -translate-y-1/2 object-contain"
        />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_50%,#d4af68,transparent_35%)]" />

        <div className="absolute right-0 top-0 h-full w-0.5 bg-[#d4af37]" />
      </div>

      {/* ==================================
          RIGHT CURTAIN
      ================================== */}

      <div
        className="curtain-right absolute inset-y-0 right-0 z-20 w-1/2 bg-[#0b0b0b]"
        style={{
          boxShadow: "inset 20px 0 40px rgba(0,0,0,0.35)",
        }}
      >
        <img
          src={shaanLogo}
          alt="The Shaan Collective"
          className="absolute left-1/2 top-1/2 h-24 w-auto -translate-x-1/2 -translate-y-1/2 object-contain"
        />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,#d4af68,transparent_35%)]" />

        <div className="absolute left-0 top-0 h-full w-0.5 bg-[#d4af37]" />
      </div>
    </div>
  );
}

export default OpeningAnimation;