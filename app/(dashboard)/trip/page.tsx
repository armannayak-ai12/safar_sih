import Link from "next/link";

// Clean inline SVG icons
const CompassIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const LuggageIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 20h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M10 20v2" />
    <path d="M14 20v2" />
    <path d="M9 11v5" />
    <path d="M15 11v5" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function TripsPage() {
  return (
    <div className="dashboard-canvas max-w-4xl mx-auto flex flex-col gap-6 py-2">
      {/* Header */}
      <div className="border-b border-[#e8e2d5] dark:border-[#274539] pb-4">
        <span className="text-[11px] font-bold tracking-widest text-[#e85b2a] uppercase">
          JOURNEYS
        </span>
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight text-[#10231c] dark:text-[#f8f4ec] mt-0.5"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Your SAFAR trips
        </h1>
        <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-1">
          Keep track of your active journeys, past explorations, and safety records.
        </p>
      </div>

      {/* Clean Empty State */}
      <div className="bg-white dark:bg-[#16281f] rounded-2xl border border-[#e8e2d5] dark:border-[#274539] p-8 sm:p-12 text-center shadow-xs flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-[#eee9df] dark:bg-[#1c342a] text-[#10231c] dark:text-[#f8f4ec] flex items-center justify-center mb-4">
          <LuggageIcon />
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight">
          No trips yet. Your journeys will appear here.
        </h2>

        <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-2 max-w-md leading-relaxed">
          Plan a personalized journey around your budget, interests, and travel style to see your upcoming itineraries and safety monitoring here.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/suggestor"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#10231c] dark:bg-[#f8f4ec] hover:bg-[#e85b2a] dark:hover:bg-[#e85b2a] text-white dark:text-[#10231c] dark:hover:text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-200 shadow-xs hover:translate-x-0.5"
          >
            <CompassIcon />
            <span>Plan My SAFAR</span>
            <ArrowRight />
          </Link>

          <Link
            href="/dashboard"
            className="text-xs font-semibold text-[#52635a] hover:text-[#10231c] dark:text-[#9db0a6] dark:hover:text-[#f8f4ec] px-4 py-2 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
