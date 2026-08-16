/* =========================================================
   GOLD DECORATIVE ELEMENTS: SPARKLES, FLOWERS & WAVES
   ========================================================= */

// 1. ROYAL GOLDEN 4-POINT SPARKLE / STAR
export function GoldSparkle({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`animate-pulse pointer-events-none drop-shadow-[0_0_8px_rgba(250,227,157,0.8)] ${className}`}
    >
      <defs>
        <linearGradient id={`gold-sparkle-grad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#fae39d" />
          <stop offset="70%" stopColor="#dfba6a" />
          <stop offset="100%" stopColor="#b88e36" />
        </linearGradient>
      </defs>
      <path
        d="M12 0 C12 6.5 6.5 12 0 12 C6.5 12 12 17.5 12 24 C12 17.5 17.5 12 24 12 C17.5 12 12 6.5 12 0 Z"
        fill={`url(#gold-sparkle-grad-${size})`}
      />
      <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
    </svg>
  );
}

// 2. AMBIENT GOLDEN SPARKLE CLUSTER
export function GoldSparkleCluster({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Sparkle 1 */}
      <div className="absolute top-[15%] left-[8%] animate-bounce duration-[3000ms]">
        <GoldSparkle size={14} className="opacity-75" />
      </div>
      {/* Sparkle 2 */}
      <div className="absolute top-[28%] right-[12%] animate-pulse duration-[2500ms]">
        <GoldSparkle size={20} className="opacity-90" />
      </div>
      {/* Sparkle 3 */}
      <div className="absolute bottom-[35%] left-[18%] animate-pulse duration-[4000ms]">
        <GoldSparkle size={12} className="opacity-60" />
      </div>
      {/* Sparkle 4 */}
      <div className="absolute top-[60%] right-[22%] animate-bounce duration-[3500ms]">
        <GoldSparkle size={16} className="opacity-80" />
      </div>
      {/* Sparkle 5 */}
      <div className="absolute bottom-[18%] right-[8%] animate-pulse duration-[2800ms]">
        <GoldSparkle size={18} className="opacity-85" />
      </div>
      {/* Sparkle 6 */}
      <div className="absolute top-[8%] right-[38%] animate-pulse duration-[3200ms]">
        <GoldSparkle size={10} className="opacity-70" />
      </div>

      {/* Ambient floating golden dust particles */}
      <div className="absolute top-[22%] left-[45%] h-1.5 w-1.5 rounded-full bg-[#fae39d] opacity-60 shadow-[0_0_8px_#fae39d] animate-ping duration-[3000ms]" />
      <div className="absolute top-[50%] left-[12%] h-2 w-2 rounded-full bg-[#dfba6a] opacity-50 shadow-[0_0_10px_#dfba6a] animate-pulse duration-[2200ms]" />
      <div className="absolute bottom-[28%] right-[40%] h-1.5 w-1.5 rounded-full bg-[#fae39d] opacity-70 shadow-[0_0_8px_#fae39d] animate-ping duration-[4000ms]" />
      <div className="absolute top-[75%] left-[32%] h-1 w-1 rounded-full bg-[#fae39d] opacity-80 shadow-[0_0_6px_#fae39d]" />
      <div className="absolute top-[38%] right-[5%] h-2 w-2 rounded-full bg-[#fae39d] opacity-60 shadow-[0_0_10px_#fae39d] animate-pulse duration-[2700ms]" />
    </div>
  );
}

// 3. ROYAL GOLDEN FLOWER / FLORAL MANDALA ORNAMENT
export function GoldFlower({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`inline-block drop-shadow-[0_0_10px_rgba(223,186,106,0.5)] ${className}`}
    >
      <defs>
        <linearGradient id="gold-flower-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fae39d" />
          <stop offset="50%" stopColor="#dfba6a" />
          <stop offset="100%" stopColor="#b88e36" />
        </linearGradient>
        <radialGradient id="flower-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#fae39d" />
          <stop offset="100%" stopColor="#dfba6a" />
        </radialGradient>
      </defs>

      {/* 8 Outer Petals */}
      <g stroke="url(#gold-flower-grad)" strokeWidth="1.2" fill="none">
        <path d="M32 32 C32 18, 24 10, 32 4 C40 10, 32 18, 32 32 Z" fill="rgba(223, 186, 106, 0.15)" />
        <path d="M32 32 C32 46, 40 54, 32 60 C24 54, 32 46, 32 32 Z" fill="rgba(223, 186, 106, 0.15)" />
        <path d="M32 32 C18 32, 10 24, 4 32 C10 40, 18 32, 32 32 Z" fill="rgba(223, 186, 106, 0.15)" />
        <path d="M32 32 C46 32, 54 40, 60 32 C54 24, 46 32, 32 32 Z" fill="rgba(223, 186, 106, 0.15)" />

        {/* Diagonal Petals */}
        <path d="M32 32 C22 22, 16 14, 12 12 C14 16, 22 22, 32 32 Z" fill="rgba(250, 227, 157, 0.1)" />
        <path d="M32 32 C42 22, 48 14, 52 12 C50 16, 42 22, 32 32 Z" fill="rgba(250, 227, 157, 0.1)" />
        <path d="M32 32 C22 42, 16 50, 12 52 C14 48, 22 42, 32 32 Z" fill="rgba(250, 227, 157, 0.1)" />
        <path d="M32 32 C42 42, 48 50, 52 52 C50 48, 42 42, 32 32 Z" fill="rgba(250, 227, 157, 0.1)" />
      </g>

      {/* Inner Petal Ring */}
      <circle cx="32" cy="32" r="8" stroke="url(#gold-flower-grad)" strokeWidth="1" fill="none" />

      {/* Center Pistil Core */}
      <circle cx="32" cy="32" r="3.5" fill="url(#flower-center)" />
    </svg>
  );
}

// 4. ROYAL FLORAL DIVIDER (FLOWER + GOLDEN WINGS)
export function GoldFloralDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#dfba6a] to-[#fae39d]" />
      <GoldFlower size={22} />
      <div className="h-px w-16 bg-gradient-to-l from-transparent via-[#dfba6a] to-[#fae39d]" />
    </div>
  );
}

// 5. FLOWING GOLDEN WAVES & SHIMMERING PARTICLES (As in reference bottom-right)
export function GoldWaveOverlay({ className = "", height = "h-44" }) {
  return (
    <div className={`pointer-events-none relative w-full overflow-hidden ${height} ${className}`}>
      <svg
        viewBox="0 0 1440 280"
        fill="none"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-full"
      >
        <defs>
          <linearGradient id="gold-wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b88e36" stopOpacity="0" />
            <stop offset="25%" stopColor="#dfba6a" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#fae39d" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#dfba6a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#b88e36" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="gold-wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fae39d" stopOpacity="0" />
            <stop offset="35%" stopColor="#eed9a4" stopOpacity="0.6" />
            <stop offset="65%" stopColor="#dfba6a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fae39d" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="gold-wave-fill" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fae39d" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#dfba6a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#070605" stopOpacity="0" />
          </linearGradient>

          <filter id="wave-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#fae39d" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Filled Wave Silhouette */}
        <path
          d="M0,180 C320,80 520,240 880,120 C1120,40 1320,160 1440,110 L1440,280 L0,280 Z"
          fill="url(#gold-wave-fill)"
        />

        {/* Primary Glowing Wave Ribbons */}
        <path
          d="M0,190 C320,90 520,250 880,130 C1120,50 1320,170 1440,120"
          stroke="url(#gold-wave-grad-1)"
          strokeWidth="2.5"
          filter="url(#wave-glow)"
        />

        <path
          d="M0,220 C280,140 600,270 940,160 C1180,90 1360,190 1440,150"
          stroke="url(#gold-wave-grad-2)"
          strokeWidth="1.8"
          filter="url(#wave-glow)"
        />

        <path
          d="M0,240 C380,170 680,290 1020,190 C1220,130 1380,210 1440,180"
          stroke="url(#gold-wave-grad-1)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.7"
        />
      </svg>

      {/* Particle dust on the waves */}
      <div className="absolute bottom-10 left-[15%] h-1.5 w-1.5 rounded-full bg-[#fae39d] shadow-[0_0_8px_#fae39d] animate-ping duration-[3000ms]" />
      <div className="absolute bottom-16 left-[38%] h-2 w-2 rounded-full bg-[#fae39d] shadow-[0_0_10px_#fae39d] animate-pulse duration-[2000ms]" />
      <div className="absolute bottom-8 left-[62%] h-1.5 w-1.5 rounded-full bg-[#dfba6a] shadow-[0_0_8px_#dfba6a] animate-ping duration-[4000ms]" />
      <div className="absolute bottom-20 left-[82%] h-2 w-2 rounded-full bg-[#fae39d] shadow-[0_0_12px_#fae39d] animate-pulse duration-[2500ms]" />
    </div>
  );
}
