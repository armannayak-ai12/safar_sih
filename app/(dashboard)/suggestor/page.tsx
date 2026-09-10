"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ====================================================
// ICONS (Clean Inline SVGs, Accessible & Dependency-free)
// ====================================================
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CompassIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

const LocationPinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CrosshairIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="22" y1="12" x2="18" y2="12" />
    <line x1="6" y1="12" x2="2" y2="12" />
    <line x1="12" y1="6" x2="12" y2="2" />
    <line x1="12" y1="22" x2="12" y2="18" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const TrainIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="16" height="16" x="4" y="3" rx="2" />
    <path d="M4 11h16" />
    <path d="M12 3v8" />
    <path d="m8 19-2 3" />
    <path d="m18 22-2-3" />
    <circle cx="8" cy="15" r="1" />
    <circle cx="16" cy="15" r="1" />
  </svg>
);

const BusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 6v6" />
    <path d="M16 6v6" />
    <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

const CarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ====================================================
// TYPES & MOCK DATA
// ====================================================
interface Destination {
  id: string;
  name: string;
  state: string;
  description: string;
  estimatedBudget: number;
  duration: string;
  interestTags: string[];
  whyThisFits: string;
  image: string;
  accentBadge: string;
  day1Summary: string;
  day2Summary: string;
}

interface TransportOption {
  id: string;
  name: string;
  fareRange: string;
  duration: string;
  isRecommended: boolean;
  notes: string;
  icon: "train" | "bus" | "cab";
}

const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    description: "Colour, craft & royal stories",
    estimatedBudget: 2800,
    duration: "2 days",
    interestTags: ["Culture", "Food", "History"],
    whyThisFits: "Great fit for your budget and relaxed travel mood.",
    image: "/safar-jaipur-hero.png",
    accentBadge: "Royal Heritage",
    day1Summary: "Amer Fort walk, Nahargarh sunset & traditional street cuisine",
    day2Summary: "Hawa Mahal morning, artisan textile bazaars & quiet courtyard tea",
  },
  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    description: "Lakes, palaces & slow evenings",
    estimatedBudget: 3200,
    duration: "2 days",
    interestTags: ["Culture", "Relaxation", "Photography"],
    whyThisFits: "Serene waters and romantic heritage within your 2-day timeframe.",
    image: "/safar-jaipur-hero.png",
    accentBadge: "Lakes & Courtyards",
    day1Summary: "Lake Pichola boat ride, City Palace & twilight lakeside ghats",
    day2Summary: "Saheliyon-ki-Bari gardens, craft alleys & rooftop dinner",
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    description: "Rivers, mountains & adventure",
    estimatedBudget: 2900,
    duration: "2 days",
    interestTags: ["Adventure", "Nature", "Relaxation"],
    whyThisFits: "Perfect blend of Himalayan foothills and active escapes.",
    image: "/safar-jaipur-hero.png",
    accentBadge: "Mountain Sanctuary",
    day1Summary: "Ganga riverside walk, suspension bridges & evening Aarti ceremony",
    day2Summary: "Gentle river rafting, waterfall hike & quiet mountain cafe",
  },
];

const MOCK_TRANSPORTS: TransportOption[] = [
  {
    id: "train",
    name: "Train",
    fareRange: "₹450–₹700",
    duration: "~4h 30m",
    isRecommended: true,
    notes: "Direct Express • Scenic route",
    icon: "train",
  },
  {
    id: "bus",
    name: "Bus",
    fareRange: "₹500–₹800",
    duration: "~5h",
    isRecommended: false,
    notes: "AC Sleeper • Frequent departures",
    icon: "bus",
  },
  {
    id: "cab",
    name: "Cab",
    fareRange: "₹3,000+",
    duration: "~4h",
    isRecommended: false,
    notes: "Private door-to-door • Flexible stops",
    icon: "cab",
  },
];

const QUICK_SUGGESTIONS = [
  "2 days • ₹3000 • Adventure",
  "3 days • ₹5000 • Relaxed",
  "Weekend in Jaipur",
  "Food + Culture • ₹4000",
];

type LocationStatus = "idle" | "detecting" | "detected" | "unavailable";

export default function SuggestorPage() {
  // 1. Search & Input State
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlanning, setIsPlanning] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 2. Location State (Strictly client-side navigator.geolocation)
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  // 3. Selection States for Results & Journey Preview
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedTransportId, setSelectedTransportId] = useState<string>("train");

  const inputRef = useRef<HTMLInputElement>(null);

  // Handle Location Detection
  const handleDetectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationStatus("unavailable");
      return;
    }

    setLocationStatus("detecting");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoordinates({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocationStatus("detected");
      },
      () => {
        setLocationStatus("unavailable");
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60000,
      }
    );
  };

  // Submit Search (Mock Intelligence)
  const handlePlanMySafar = (queryText?: string) => {
    const activeQuery = (queryText !== undefined ? queryText : searchQuery).trim();
    const effectiveQuery = activeQuery || "3 days, ₹5000 and want a relaxed trip";

    if (!searchQuery && !queryText) {
      setSearchQuery(effectiveQuery);
    }

    // Interactive transition
    setIsPlanning(true);
    setSelectedDestination(null);

    // Short polished delay (750ms) to demonstrate intelligent planning transition
    setTimeout(() => {
      setIsPlanning(false);
      setHasSearched(true);
    }, 750);
  };

  // Click Quick Suggestion
  const handleSelectQuickExample = (text: string) => {
    setSearchQuery(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Subtle modifier chip clicks
  const handleAddModifier = (text: string) => {
    setSearchQuery((prev) => {
      const clean = prev.trim();
      if (!clean) return text;
      if (clean.toLowerCase().includes(text.toLowerCase())) return clean;
      return `${clean}, ${text}`;
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Selected transport object
  const activeTransport =
    MOCK_TRANSPORTS.find((t) => t.id === selectedTransportId) || MOCK_TRANSPORTS[0];

  return (
    <div className="dashboard-canvas max-w-5xl mx-auto flex flex-col gap-8 py-2 pb-14">
      {/* TOP NAVIGATION */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52635a] hover:text-[#e85b2a] dark:text-[#9db0a6] dark:hover:text-[#f8f4ec] transition-colors"
        >
          <span>← Back to SAFAR</span>
        </Link>
      </div>

      {/* HEADER SECTION */}
      <header className="border-b border-[#e8e2d5] dark:border-[#274539] pb-5">
        <span className="text-[11px] font-bold tracking-[0.18em] text-[#e85b2a] uppercase">
          PLAN MY SAFAR
        </span>
        <h1
          className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#10231c] dark:text-[#f8f4ec] mt-1 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Where will your SAFAR take you?
        </h1>
        <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-1.5 max-w-2xl leading-relaxed">
          Tell SAFAR what you&apos;re looking for. We&apos;ll help shape the journey around your time, budget and travel mood.
        </p>
      </header>

      {/* VIEW 1: JOURNEY PREVIEW (When user clicked 'Explore SAFAR →') */}
      {selectedDestination ? (
        <section className="bg-white dark:bg-[#16281f] rounded-2xl border border-[#e8e2d5] dark:border-[#274539] p-6 sm:p-8 shadow-xs animate-in fade-in duration-200 flex flex-col gap-7">
          {/* Back Action & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e8e2d5] dark:border-[#274539]">
            <div>
              <button
                type="button"
                onClick={() => setSelectedDestination(null)}
                className="text-xs font-bold text-[#e85b2a] hover:underline mb-2 inline-flex items-center gap-1 cursor-pointer"
              >
                ← Back to options
              </button>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8a9990]">
                  YOUR SAFAR
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#e8e2d5]" />
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                  {selectedDestination.duration} · ₹{selectedDestination.estimatedBudget.toLocaleString("en-IN")}
                </span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight mt-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {selectedDestination.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-0.5">
                {selectedDestination.description}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedDestination(null);
                  setHasSearched(false);
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl border border-[#e8e2d5] dark:border-[#274539] text-xs font-bold text-[#52635a] hover:text-[#10231c] dark:text-[#9db0a6] dark:hover:text-[#f8f4ec] bg-[#fbf9f4] dark:bg-[#10231c] transition-colors cursor-pointer"
              >
                New Search
              </button>
            </div>
          </div>

          {/* COMPACT JOURNEY FLOW PREVIEW */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#10231c] dark:text-[#f8f4ec]">
              YOUR JOURNEY
            </span>

            {/* Vertical Flow Diagram */}
            <div className="relative pl-6 sm:pl-8 flex flex-col gap-6 before:content-[''] before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-[#e8e2d5] dark:before:bg-[#274539]">
              {/* Step 1: Location */}
              <div className="relative flex items-start gap-3">
                <span className="absolute -left-[20px] sm:-left-[24px] mt-0.5 w-[14px] h-[14px] rounded-full bg-[#10231c] dark:bg-[#f8f4ec] border-2 border-white dark:border-[#16281f]" />
                <div>
                  <div className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                    Your Location
                  </div>
                  <div className="text-[11px] text-[#52635a] dark:text-[#9db0a6]">
                    {locationStatus === "detected" && coordinates
                      ? `Departure detected (${coordinates.lat.toFixed(2)}°N, ${coordinates.lng.toFixed(2)}°E)`
                      : "Default departure origin"}
                  </div>
                </div>
              </div>

              {/* Step 2: Transport */}
              <div className="relative flex items-start gap-3">
                <span className="absolute -left-[20px] sm:-left-[24px] mt-0.5 w-[14px] h-[14px] rounded-full bg-[#e85b2a] border-2 border-white dark:border-[#16281f]" />
                <div>
                  <div className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec] flex items-center gap-2">
                    <span>Best transport:</span>
                    <span className="text-[#e85b2a]">{activeTransport.name} ({activeTransport.duration})</span>
                  </div>
                  <div className="text-[11px] text-[#52635a] dark:text-[#9db0a6]">
                    Estimated fare {activeTransport.fareRange} • {activeTransport.notes}
                  </div>
                </div>
              </div>

              {/* Step 3: Destination */}
              <div className="relative flex items-start gap-3">
                <span className="absolute -left-[20px] sm:-left-[24px] mt-0.5 w-[14px] h-[14px] rounded-full bg-[#10231c] dark:bg-[#f8f4ec] border-2 border-white dark:border-[#16281f]" />
                <div>
                  <div className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                    {selectedDestination.name}
                  </div>
                  <div className="text-[11px] text-[#52635a] dark:text-[#9db0a6]">
                    Arrival, luggage drop & check-in
                  </div>
                </div>
              </div>

              {/* Step 4: Day 1 */}
              <div className="relative flex items-start gap-3">
                <span className="absolute -left-[20px] sm:-left-[24px] mt-0.5 w-[14px] h-[14px] rounded-full bg-[#52635a] border-2 border-white dark:border-[#16281f]" />
                <div>
                  <div className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                    Day 1
                  </div>
                  <div className="text-[11px] text-[#52635a] dark:text-[#9db0a6]">
                    {selectedDestination.day1Summary}
                  </div>
                </div>
              </div>

              {/* Step 5: Day 2 */}
              <div className="relative flex items-start gap-3">
                <span className="absolute -left-[20px] sm:-left-[24px] mt-0.5 w-[14px] h-[14px] rounded-full bg-[#52635a] border-2 border-white dark:border-[#16281f]" />
                <div>
                  <div className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                    Day 2
                  </div>
                  <div className="text-[11px] text-[#52635a] dark:text-[#9db0a6]">
                    {selectedDestination.day2Summary}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BEST TRANSPORT SELECTOR */}
          <div className="pt-5 border-t border-[#e8e2d5] dark:border-[#274539] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#10231c] dark:text-[#f8f4ec]">
                  Best transport
                </h3>
                <p className="text-[11px] text-[#52635a] dark:text-[#9db0a6] mt-0.5">
                  Select your preferred mode from your starting point to {selectedDestination.name}
                </p>
              </div>
              <span className="text-[11px] font-medium text-[#8a9990]">
                {selectedTransportId === "train" ? "Train recommended" : `${activeTransport.name} selected`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
              {MOCK_TRANSPORTS.map((opt) => {
                const isSelected = selectedTransportId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedTransportId(opt.id)}
                    className={`relative p-4 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${isSelected
                        ? "border-[#e85b2a] bg-[#fdf3ee] dark:bg-[#e85b2a]/15 shadow-xs ring-1 ring-[#e85b2a]"
                        : "border-[#e8e2d5] dark:border-[#274539] bg-[#fbf9f4] dark:bg-[#10231c] hover:border-[#e85b2a]/50"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`p-1.5 rounded-lg ${isSelected ? "bg-[#e85b2a] text-white" : "bg-white dark:bg-[#16281f] text-[#52635a] dark:text-[#9db0a6]"}`}>
                          {opt.icon === "train" && <TrainIcon />}
                          {opt.icon === "bus" && <BusIcon />}
                          {opt.icon === "cab" && <CarIcon />}
                        </span>
                        <span className="text-sm font-bold text-[#10231c] dark:text-[#f8f4ec]">
                          {opt.name}
                        </span>
                      </div>

                      {opt.isRecommended && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-[10px] font-bold">
                          Recommended
                        </span>
                      )}
                    </div>

                    <div className="mt-2">
                      <div className="text-base font-bold text-[#10231c] dark:text-[#f8f4ec]">
                        {opt.fareRange}
                      </div>
                      <div className="text-xs text-[#52635a] dark:text-[#9db0a6] mt-0.5 flex items-center gap-1">
                        <ClockIcon />
                        <span>{opt.duration}</span>
                      </div>
                      <p className="text-[11px] text-[#8a9990] mt-2 border-t border-[#e8e2d5]/60 dark:border-[#274539]/60 pt-2">
                        {opt.notes}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        /* VIEW 2: SEARCH ENGINE HERO + DESTINATIONS */
        <>
          {/* PRIMARY SEARCH HERO CONTAINER */}
          <section className="bg-white dark:bg-[#16281f] rounded-2xl sm:rounded-3xl border border-[#e8e2d5] dark:border-[#274539] p-5 sm:p-7 shadow-xs flex flex-col gap-4">
            {/* Search Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePlanMySafar();
              }}
              className="flex flex-col gap-3"
            >
              <label htmlFor="safar-search" className="sr-only">
                Describe your journey
              </label>

              <div className="relative flex items-center">
                <div className="absolute left-4 text-[#8a9990] pointer-events-none flex items-center justify-center">
                  <SearchIcon />
                </div>
                <input
                  ref={inputRef}
                  id="safar-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Try: I have 3 days, ₹5000 and want a relaxed trip..."
                  className="w-full pl-12 pr-4 sm:pr-44 py-4 sm:py-4.5 bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] rounded-2xl text-sm sm:text-base text-[#10231c] dark:text-[#f8f4ec] placeholder-[#8a9990] outline-none focus:border-[#e85b2a] focus:ring-2 focus:ring-[#e85b2a]/15 transition-all shadow-inner"
                />

                {/* Primary Button on Desktop */}
                <div className="hidden sm:block absolute right-2">
                  <button
                    type="submit"
                    disabled={isPlanning}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#e85b2a] hover:bg-[#d14d1e] active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <span>Plan My SAFAR</span>
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>

              {/* Primary Button on Mobile */}
              <div className="sm:hidden">
                <button
                  type="submit"
                  disabled={isPlanning}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#e85b2a] hover:bg-[#d14d1e] text-white text-sm font-bold shadow-xs transition-all cursor-pointer"
                >
                  <span>Plan My SAFAR</span>
                  <ArrowRightIcon />
                </button>
              </div>
            </form>

            {/* SUBTLE OPTIONAL CONTROLS / SUGGESTIONS & CURRENT LOCATION */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#f0ebe1] dark:border-[#223b30]">
              {/* Subtle tuning chips (Days, Budget, Mood, Interests) */}
              <div className="flex items-center flex-wrap gap-1.5 text-[11px]">
                <span className="text-[#8a9990] font-medium mr-1">Quick add:</span>
                <button
                  type="button"
                  onClick={() => handleAddModifier("2 days")}
                  className="px-2.5 py-1 rounded-lg bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] text-[#52635a] dark:text-[#9db0a6] hover:border-[#e85b2a] hover:text-[#e85b2a] transition-all cursor-pointer"
                >
                  2 Days
                </button>
                <button
                  type="button"
                  onClick={() => handleAddModifier("₹3000 budget")}
                  className="px-2.5 py-1 rounded-lg bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] text-[#52635a] dark:text-[#9db0a6] hover:border-[#e85b2a] hover:text-[#e85b2a] transition-all cursor-pointer"
                >
                  ₹3000 Budget
                </button>
                <button
                  type="button"
                  onClick={() => handleAddModifier("Relaxed mood")}
                  className="px-2.5 py-1 rounded-lg bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] text-[#52635a] dark:text-[#9db0a6] hover:border-[#e85b2a] hover:text-[#e85b2a] transition-all cursor-pointer"
                >
                  Relaxed
                </button>
                <button
                  type="button"
                  onClick={() => handleAddModifier("Culture & Heritage")}
                  className="px-2.5 py-1 rounded-lg bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] text-[#52635a] dark:text-[#9db0a6] hover:border-[#e85b2a] hover:text-[#e85b2a] transition-all cursor-pointer"
                >
                  Culture
                </button>
                <button
                  type="button"
                  onClick={() => handleAddModifier("Adventure")}
                  className="px-2.5 py-1 rounded-lg bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] text-[#52635a] dark:text-[#9db0a6] hover:border-[#e85b2a] hover:text-[#e85b2a] transition-all cursor-pointer"
                >
                  Adventure
                </button>
              </div>

              {/* Subtle Current Location Trigger */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={locationStatus === "detecting"}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52635a] dark:text-[#9db0a6] hover:text-[#e85b2a] dark:hover:text-[#f8f4ec] transition-colors py-1 px-2 rounded-lg border border-transparent hover:border-[#e8e2d5] dark:hover:border-[#274539] cursor-pointer"
                >
                  {locationStatus === "idle" && (
                    <>
                      <CrosshairIcon />
                      <span>Use my current location</span>
                    </>
                  )}
                  {locationStatus === "detecting" && (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[#e85b2a] animate-ping" />
                      <span>Detecting location...</span>
                    </>
                  )}
                  {locationStatus === "detected" && (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-emerald-700 dark:text-emerald-400">Current location detected</span>
                    </>
                  )}
                  {locationStatus === "unavailable" && (
                    <>
                      <LocationPinIcon />
                      <span className="text-amber-700 dark:text-amber-400">Location unavailable</span>
                      <span className="text-[10px] text-[#8a9990] underline ml-1">Retry</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* QUICK EXAMPLES */}
            <div className="pt-3 border-t border-[#f0ebe1] dark:border-[#223b30] flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-xs font-semibold text-[#8a9990] flex-shrink-0">
                Try something like:
              </span>
              <div className="flex items-center flex-wrap gap-2">
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSelectQuickExample(suggestion)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] text-[#10231c] dark:text-[#f8f4ec] hover:border-[#e85b2a] hover:text-[#e85b2a] transition-all cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* MOCK LOADING TRANSITION */}
          {isPlanning && (
            <section className="bg-white dark:bg-[#16281f] rounded-2xl border border-[#e8e2d5] dark:border-[#274539] p-8 sm:p-12 shadow-xs text-center flex flex-col items-center justify-center gap-3 animate-in fade-in duration-150">
              <div className="w-12 h-12 rounded-2xl bg-[#fdf3ee] dark:bg-[#e85b2a]/20 text-[#e85b2a] flex items-center justify-center animate-spin">
                <CompassIcon />
              </div>
              <h2
                className="text-lg sm:text-xl font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Planning your SAFAR...
              </h2>
              <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] max-w-md">
                Matching your travel duration, regional budgets, and personal mood to curated destinations.
              </p>
            </section>
          )}

          {/* MOCK RESULT STATE: 3 DESTINATION CARDS */}
          {hasSearched && !isPlanning && (
            <section className="flex flex-col gap-6 animate-in fade-in duration-200">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Your SAFAR options
                  </h2>
                  <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-0.5">
                    Based on your time, budget and travel preferences
                  </p>
                </div>

                <span className="text-xs text-[#8a9990]">
                  Showing 3 matched destinations
                </span>
              </div>

              {/* 3-Column Destination Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {MOCK_DESTINATIONS.map((dest) => (
                  <article
                    key={dest.id}
                    className="bg-white dark:bg-[#16281f] rounded-2xl border border-[#e8e2d5] dark:border-[#274539] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                  >
                    {/* Destination Card Top / Image */}
                    <div>
                      <div className="relative aspect-[16/10] w-full bg-[#eee9df] dark:bg-[#1c342a] overflow-hidden">
                        <Image
                          src={dest.image}
                          alt={dest.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                            {dest.state}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-white">
                          <h3
                            className="text-xl font-bold tracking-tight"
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            {dest.name}
                          </h3>
                          <span className="text-xs font-semibold text-white/90">
                            {dest.duration}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-5 flex flex-col gap-3">
                        <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] font-medium leading-snug">
                          &ldquo;{dest.description}&rdquo;
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-[#f0ebe1] dark:border-[#223b30]">
                          <span className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                            ₹{dest.estimatedBudget.toLocaleString("en-IN")} estimated
                          </span>
                          <span className="text-[11px] text-[#8a9990]">
                            {dest.duration}
                          </span>
                        </div>

                        {/* Interest Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {dest.interestTags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] text-[11px] font-medium text-[#52635a] dark:text-[#9db0a6]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Why this fits */}
                        <div className="p-3 rounded-xl bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5]/80 dark:border-[#274539]/80 mt-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#e85b2a] block">
                            Why this fits
                          </span>
                          <p className="text-[11px] text-[#52635a] dark:text-[#9db0a6] mt-0.5 leading-relaxed">
                            {dest.whyThisFits}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Action */}
                    <div className="p-5 pt-0">
                      <button
                        type="button"
                        onClick={() => setSelectedDestination(dest)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#10231c] dark:bg-[#f8f4ec] text-white dark:text-[#10231c] hover:bg-[#e85b2a] dark:hover:bg-[#e85b2a] dark:hover:text-white text-xs font-bold transition-colors duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Explore SAFAR</span>
                        <ArrowRightIcon />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
