"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";

// ====================================================
// ICONS (Clean Inline SVGs, Accessible & Dependency-Free)
// ====================================================
const LocationPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

const MetroIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="16" height="14" x="4" y="4" rx="2" />
    <path d="M4 10h16" />
    <path d="M12 4v6" />
    <circle cx="8" cy="14" r="1" />
    <circle cx="16" cy="14" r="1" />
    <path d="m8 18-2 3" />
    <path d="m16 18 2 3" />
  </svg>
);

const AutoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M5 17h10" />
    <path d="M5 15V8l6-3 6 4v6" />
    <path d="M11 5v10" />
    <path d="m2 14 3-4" />
  </svg>
);

const CabIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const WalkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="13" cy="4" r="2" />
    <path d="m7 21 3-5 3 2 3-5" />
    <path d="M10 16v-5l4-2 3 4" />
    <path d="m8 12 3-3" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);

// ====================================================
// TYPES & MODES
// ====================================================
export type JourneyPriority = "cheapest" | "fastest" | "best_value";

export type TransportMode = "train" | "bus" | "metro" | "auto" | "cab" | "walk";

export type OptionalPreference =
  | "fewer_transfers"
  | "comfortable"
  | "shared_ride"
  | "prefer_public_transport";

export interface JourneySegment {
  id: string;
  mode: TransportMode;
  modeLabel: string;
  fare: number;
  fareFormatted: string;
  durationMinutes: number;
  durationFormatted: string;
  notes: string;
}

export interface RouteOption {
  id: string;
  priorityKey: JourneyPriority;
  priorityLabel: string;
  badge?: string;
  fareEstimate: string;
  fareNumeric: number;
  durationEstimate: string;
  durationNumeric: number;
  transfersCount: number;
  tagline: string;
  reason: string;
  segments: JourneySegment[];
}

const MOCK_DESTINATIONS = [
  "Jaipur Railway Station",
  "Jaipur Airport",
  "Hawa Mahal",
  "Jaipur Bus Stand",
  "City Palace Jaipur",
];

const TRANSPORT_MODES: { id: TransportMode; label: string; icon: React.FC }[] = [
  { id: "train", label: "Train", icon: TrainIcon },
  { id: "bus", label: "Bus", icon: BusIcon },
  { id: "metro", label: "Metro", icon: MetroIcon },
  { id: "auto", label: "Auto", icon: AutoIcon },
  { id: "cab", label: "Cab", icon: CabIcon },
  { id: "walk", label: "Walk", icon: WalkIcon },
];

const OPTIONAL_PREFERENCES: { id: OptionalPreference; label: string }[] = [
  { id: "fewer_transfers", label: "Fewer transfers" },
  { id: "comfortable", label: "Comfortable" },
  { id: "shared_ride", label: "Shared ride" },
  { id: "prefer_public_transport", label: "Prefer public transport" },
];

// ====================================================
// MOCK RECOMMENDATION ENGINE (Isolated for future ML integration)
// ====================================================
function computeMockRoutes(
  priority: JourneyPriority,
  allowedModes: TransportMode[],
  optionalPrefs: OptionalPreference[]
): RouteOption[] {
  const hasMode = (m: TransportMode) => allowedModes.includes(m);

  // 1. Determine segments based on allowed modes
  // Best Value Route:
  const bestValueSegments: JourneySegment[] = [];
  if (hasMode("metro")) {
    bestValueSegments.push({
      id: "bv-1",
      mode: "metro",
      modeLabel: "Metro",
      fare: 30,
      fareFormatted: "₹30",
      durationMinutes: 25,
      durationFormatted: "25 min",
      notes: "Rapid metro line to Central Interchange",
    });
  } else if (hasMode("bus")) {
    bestValueSegments.push({
      id: "bv-1-bus",
      mode: "bus",
      modeLabel: "Bus",
      fare: 25,
      fareFormatted: "₹25",
      durationMinutes: 35,
      durationFormatted: "35 min",
      notes: "Connecting express bus",
    });
  } else if (hasMode("cab")) {
    bestValueSegments.push({
      id: "bv-1-cab",
      mode: "cab",
      modeLabel: "Cab",
      fare: 140,
      fareFormatted: "₹140",
      durationMinutes: 18,
      durationFormatted: "18 min",
      notes: "Direct cab to terminal",
    });
  } else {
    bestValueSegments.push({
      id: "bv-1-walk",
      mode: "walk",
      modeLabel: "Walk",
      fare: 0,
      fareFormatted: "₹0",
      durationMinutes: 20,
      durationFormatted: "20 min",
      notes: "Footpath trail to station",
    });
  }

  // Intercity / main backbone
  if (hasMode("train")) {
    bestValueSegments.push({
      id: "bv-2",
      mode: "train",
      modeLabel: "Train",
      fare: 450,
      fareFormatted: "₹450",
      durationMinutes: 260,
      durationFormatted: "4h 20m",
      notes: "Superfast Intercity Express",
    });
  } else if (hasMode("bus")) {
    bestValueSegments.push({
      id: "bv-2-bus",
      mode: "bus",
      modeLabel: "Bus",
      fare: 420,
      fareFormatted: "₹420",
      durationMinutes: 290,
      durationFormatted: "4h 50m",
      notes: "State Deluxe Express Bus",
    });
  } else {
    bestValueSegments.push({
      id: "bv-2-cab",
      mode: "cab",
      modeLabel: "Cab",
      fare: 2200,
      fareFormatted: "₹2,200",
      durationMinutes: 230,
      durationFormatted: "3h 50m",
      notes: "Intercity Highway Taxi",
    });
  }

  // Last-mile
  if (hasMode("auto")) {
    bestValueSegments.push({
      id: "bv-3",
      mode: "auto",
      modeLabel: "Auto",
      fare: 60,
      fareFormatted: "₹60",
      durationMinutes: 15,
      durationFormatted: "15 min",
      notes: "Prepaid auto stand to destination",
    });
  } else if (hasMode("cab")) {
    bestValueSegments.push({
      id: "bv-3-cab",
      mode: "cab",
      modeLabel: "Cab",
      fare: 90,
      fareFormatted: "₹90",
      durationMinutes: 12,
      durationFormatted: "12 min",
      notes: "City drop cab",
    });
  } else if (hasMode("bus")) {
    bestValueSegments.push({
      id: "bv-3-bus",
      mode: "bus",
      modeLabel: "Bus",
      fare: 20,
      fareFormatted: "₹20",
      durationMinutes: 20,
      durationFormatted: "20 min",
      notes: "Local circular bus route",
    });
  } else {
    bestValueSegments.push({
      id: "bv-3-walk",
      mode: "walk",
      modeLabel: "Walk",
      fare: 0,
      fareFormatted: "₹0",
      durationMinutes: 12,
      durationFormatted: "12 min",
      notes: "Pedestrian walkway",
    });
  }

  const bvTotalFare = bestValueSegments.reduce((sum, seg) => sum + seg.fare, 0);
  const bvTotalMins = bestValueSegments.reduce((sum, seg) => sum + seg.durationMinutes, 0);

  const bestValueRoute: RouteOption = {
    id: "route-best-value",
    priorityKey: "best_value",
    priorityLabel: "BEST VALUE",
    badge: "Recommended",
    fareEstimate: `₹${bvTotalFare} – ₹${bvTotalFare + 40}`,
    fareNumeric: bvTotalFare,
    durationEstimate: `~${Math.floor(bvTotalMins / 60)}h ${bvTotalMins % 60 ? `${bvTotalMins % 60}m` : "00m"}`,
    durationNumeric: bvTotalMins,
    transfersCount: Math.max(0, bestValueSegments.length - 1),
    tagline: "Balanced cost and travel time",
    reason: "Best balance of cost, time and convenience",
    segments: bestValueSegments,
  };

  // 2. Cheapest Route
  const cheapSegments: JourneySegment[] = [];
  if (hasMode("bus")) {
    cheapSegments.push({
      id: "ch-1",
      mode: "bus",
      modeLabel: "Bus",
      fare: 25,
      fareFormatted: "₹25",
      durationMinutes: 45,
      durationFormatted: "45 min",
      notes: "Local non-AC city feeder bus",
    });
  } else if (hasMode("metro")) {
    cheapSegments.push({
      id: "ch-1-m",
      mode: "metro",
      modeLabel: "Metro",
      fare: 30,
      fareFormatted: "₹30",
      durationMinutes: 30,
      durationFormatted: "30 min",
      notes: "Standard transit token",
    });
  } else {
    cheapSegments.push({
      id: "ch-1-w",
      mode: "walk",
      modeLabel: "Walk",
      fare: 0,
      fareFormatted: "₹0",
      durationMinutes: 35,
      durationFormatted: "35 min",
      notes: "Walking to station hub",
    });
  }

  if (hasMode("train")) {
    cheapSegments.push({
      id: "ch-2",
      mode: "train",
      modeLabel: "Train",
      fare: 450,
      fareFormatted: "₹450",
      durationMinutes: 260,
      durationFormatted: "4h 20m",
      notes: "Regular Sleeper / Mail Express class",
    });
  } else if (hasMode("bus")) {
    cheapSegments.push({
      id: "ch-2-b",
      mode: "bus",
      modeLabel: "Bus",
      fare: 410,
      fareFormatted: "₹410",
      durationMinutes: 300,
      durationFormatted: "5h 00m",
      notes: "Ordinary state transport bus",
    });
  } else {
    cheapSegments.push({
      id: "ch-2-c",
      mode: "cab",
      modeLabel: "Cab",
      fare: 1800,
      fareFormatted: "₹1,800",
      durationMinutes: 240,
      durationFormatted: "4h 00m",
      notes: "Shared ride highway cab",
    });
  }

  if (hasMode("walk") && optionalPrefs.includes("prefer_public_transport")) {
    cheapSegments.push({
      id: "ch-3-w",
      mode: "walk",
      modeLabel: "Walk",
      fare: 0,
      fareFormatted: "₹0",
      durationMinutes: 15,
      durationFormatted: "15 min",
      notes: "Short stroll from terminal",
    });
  } else if (hasMode("bus")) {
    cheapSegments.push({
      id: "ch-3",
      mode: "bus",
      modeLabel: "Bus",
      fare: 35,
      fareFormatted: "₹35",
      durationMinutes: 35,
      durationFormatted: "35 min",
      notes: "Connecting suburban route",
    });
  } else if (hasMode("auto")) {
    cheapSegments.push({
      id: "ch-3-a",
      mode: "auto",
      modeLabel: "Auto",
      fare: 55,
      fareFormatted: "₹55",
      durationMinutes: 18,
      durationFormatted: "18 min",
      notes: "Shared shared-auto stand",
    });
  } else {
    cheapSegments.push({
      id: "ch-3-w2",
      mode: "walk",
      modeLabel: "Walk",
      fare: 0,
      fareFormatted: "₹0",
      durationMinutes: 20,
      durationFormatted: "20 min",
      notes: "Pedestrian footpath",
    });
  }

  const chTotalFare = cheapSegments.reduce((sum, seg) => sum + seg.fare, 0);
  const chTotalMins = cheapSegments.reduce((sum, seg) => sum + seg.durationMinutes, 0);

  const cheapestRoute: RouteOption = {
    id: "route-cheapest",
    priorityKey: "cheapest",
    priorityLabel: "CHEAPEST",
    badge: priority === "cheapest" ? "Recommended" : undefined,
    fareEstimate: `₹${chTotalFare}`,
    fareNumeric: chTotalFare,
    durationEstimate: `~${Math.floor(chTotalMins / 60)}h ${chTotalMins % 60 ? `${chTotalMins % 60}m` : "00m"}`,
    durationNumeric: chTotalMins,
    transfersCount: Math.max(0, cheapSegments.length - 1),
    tagline: "Lowest estimated cost",
    reason: "Lowest estimated cost across public transit options",
    segments: cheapSegments,
  };

  // 3. Fastest Route
  const fastSegments: JourneySegment[] = [];
  if (hasMode("cab")) {
    fastSegments.push({
      id: "fa-1",
      mode: "cab",
      modeLabel: "Cab",
      fare: 350,
      fareFormatted: "₹350",
      durationMinutes: 30,
      durationFormatted: "30 min",
      notes: "Express door-to-station cab",
    });
  } else if (hasMode("metro")) {
    fastSegments.push({
      id: "fa-1-m",
      mode: "metro",
      modeLabel: "Metro",
      fare: 40,
      fareFormatted: "₹40",
      durationMinutes: 22,
      durationFormatted: "22 min",
      notes: "Direct Airport / Railway Express Line",
    });
  } else {
    fastSegments.push({
      id: "fa-1-a",
      mode: "auto",
      modeLabel: "Auto",
      fare: 100,
      fareFormatted: "₹100",
      durationMinutes: 25,
      durationFormatted: "25 min",
      notes: "Fast auto transit",
    });
  }

  if (hasMode("train")) {
    fastSegments.push({
      id: "fa-2",
      mode: "train",
      modeLabel: "Train",
      fare: 900,
      fareFormatted: "₹900",
      durationMinutes: 220,
      durationFormatted: "3h 40m",
      notes: "Superfast Shatabdi / Vande Bharat Express",
    });
  } else if (hasMode("cab")) {
    fastSegments.push({
      id: "fa-2-c",
      mode: "cab",
      modeLabel: "Cab",
      fare: 2800,
      fareFormatted: "₹2,800",
      durationMinutes: 210,
      durationFormatted: "3h 30m",
      notes: "Private expressway cab transfer",
    });
  } else {
    fastSegments.push({
      id: "fa-2-b",
      mode: "bus",
      modeLabel: "Bus",
      fare: 650,
      fareFormatted: "₹650",
      durationMinutes: 260,
      durationFormatted: "4h 20m",
      notes: "AC Multi-axle Volvo Express",
    });
  }

  const faTotalFare = fastSegments.reduce((sum, seg) => sum + seg.fare, 0);
  const faTotalMins = fastSegments.reduce((sum, seg) => sum + seg.durationMinutes, 0);

  const fastestRoute: RouteOption = {
    id: "route-fastest",
    priorityKey: "fastest",
    priorityLabel: "FASTEST",
    badge: priority === "fastest" ? "Recommended" : undefined,
    fareEstimate: `₹${faTotalFare.toLocaleString("en-IN")}`,
    fareNumeric: faTotalFare,
    durationEstimate: `~${Math.floor(faTotalMins / 60)}h ${faTotalMins % 60 ? `${faTotalMins % 60}m` : "00m"}`,
    durationNumeric: faTotalMins,
    transfersCount: Math.max(0, fastSegments.length - 1),
    tagline: "Shortest estimated travel time",
    reason: "Fastest door-to-destination transit routing",
    segments: fastSegments,
  };

  // Order routes so user's priority is first
  if (priority === "cheapest") {
    return [cheapestRoute, bestValueRoute, fastestRoute];
  }
  if (priority === "fastest") {
    return [fastestRoute, bestValueRoute, cheapestRoute];
  }
  return [bestValueRoute, cheapestRoute, fastestRoute];
}

// ====================================================
// COMPONENT: FAIR FARE PAGE
// ====================================================
export default function FairFarePage() {
  // Input states
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [isCurrentLocationSelected, setIsCurrentLocationSelected] = useState(false);
  const [priority, setPriority] = useState<JourneyPriority>("best_value");
  const [selectedModes, setSelectedModes] = useState<TransportMode[]>([
    "train",
    "bus",
    "metro",
    "auto",
    "cab",
    "walk",
  ]);
  const [isAllModes, setIsAllModes] = useState(true);
  const [selectedPreferences, setSelectedPreferences] = useState<OptionalPreference[]>([]);

  // Workflow states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [activeRouteId, setActiveRouteId] = useState<string>("route-best_value");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const destinationInputRef = useRef<HTMLInputElement>(null);

  // Toggle "All Modes"
  const handleToggleAllModes = () => {
    if (!isAllModes) {
      setSelectedModes(["train", "bus", "metro", "auto", "cab", "walk"]);
      setIsAllModes(true);
    } else {
      // Keep at least train & bus
      setSelectedModes(["train", "bus"]);
      setIsAllModes(false);
    }
  };

  // Toggle individual transport mode
  const handleToggleMode = (mode: TransportMode) => {
    let next: TransportMode[];
    if (selectedModes.includes(mode)) {
      if (selectedModes.length === 1) return; // keep at least one
      next = selectedModes.filter((m) => m !== mode);
    } else {
      next = [...selectedModes, mode];
    }
    setSelectedModes(next);
    setIsAllModes(next.length === 6);
  };

  // Toggle optional preference
  const handleTogglePreference = (pref: OptionalPreference) => {
    setSelectedPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  // Geolocation trigger (pure client-side, no external API)
  const handleUseCurrentLocation = () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsCurrentLocationSelected(true);
          setStartLocation("Current location selected");
        },
        () => {
          setIsCurrentLocationSelected(true);
          setStartLocation("Current location selected");
        }
      );
    } else {
      setIsCurrentLocationSelected(true);
      setStartLocation("Current location selected");
    }
  };

  // Compute mock routes reactively
  const computedRoutes = useMemo(() => {
    return computeMockRoutes(priority, selectedModes, selectedPreferences);
  }, [priority, selectedModes, selectedPreferences]);

  // Active route
  const activeRoute = useMemo(() => {
    return (
      computedRoutes.find((r) => r.id === activeRouteId) || computedRoutes[0]
    );
  }, [computedRoutes, activeRouteId]);

  // Handle Find My Best SAFAR submission
  const handleFindBestSafar = (e: React.FormEvent) => {
    e.preventDefault();

    // Default fallbacks if user leaves blank
    if (!startLocation) {
      setStartLocation("Current location selected");
      setIsCurrentLocationSelected(true);
    }
    if (!destination) {
      setDestination("Hawa Mahal, Jaipur");
    }

    setIsAnalyzing(true);
    setShowSuggestions(false);

    // 1-second polished analyzing transition
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResults(true);
      // Set active route to the top recommendation
      setActiveRouteId(computedRoutes[0].id);
    }, 1000);
  };

  return (
    <div className="dashboard-canvas max-w-5xl mx-auto flex flex-col gap-8 py-2 pb-16">
      {/* 1. TOP BREADCRUMB / BACK NAVIGATION */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52635a] hover:text-[#e85b2a] dark:text-[#9db0a6] dark:hover:text-[#f8f4ec] transition-colors"
        >
          <span>← Back to SAFAR</span>
        </Link>

        {hasResults && !isAnalyzing && (
          <button
            type="button"
            onClick={() => setHasResults(false)}
            className="text-xs font-bold text-[#e85b2a] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            ← Modify Search
          </button>
        )}
      </div>

      {/* 2. HEADER */}
      <header className="border-b border-[#e8e2d5] dark:border-[#274539] pb-5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-[0.18em] text-[#e85b2a] uppercase">
            SMART TRANSPORT
          </span>
          <span className="inline-block w-1 h-1 rounded-full bg-[#e8e2d5]" />
          <span className="text-[10px] font-bold tracking-wider text-[#8a9990] uppercase">
            PAY FAIR
          </span>
        </div>
        <h1
          className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#10231c] dark:text-[#f8f4ec] mt-1 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Find the best way to get there.
        </h1>
        <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-1.5 max-w-2xl leading-relaxed">
          Tell SAFAR where you’re going and what matters most. We’ll find the best-value journey for you.
        </p>
      </header>

      {/* 3. PAGE 2: ANALYZING STATE */}
      {isAnalyzing && (
        <section className="bg-white dark:bg-[#16281f] rounded-3xl border border-[#e8e2d5] dark:border-[#274539] p-10 sm:p-14 shadow-xs text-center flex flex-col items-center justify-center gap-4 animate-in fade-in duration-200">
          <div className="relative w-14 h-14 rounded-2xl bg-[#fdf3ee] dark:bg-[#e85b2a]/20 text-[#e85b2a] flex items-center justify-center">
            <div className="animate-spin text-[#e85b2a]">
              <SparklesIcon />
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-[#e85b2a]/30 animate-ping pointer-events-none" />
          </div>
          <div>
            <h2
              className="text-xl sm:text-2xl font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Finding your best SAFAR…
            </h2>
            <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-1 max-w-md">
              Comparing routes, transport options and estimated fares.
            </p>
          </div>

          {/* Route Progress indicator simulation */}
          <div className="w-48 sm:w-64 h-1.5 bg-[#f0ebe1] dark:bg-[#223b30] rounded-full overflow-hidden mt-3">
            <div className="h-full bg-[#e85b2a] rounded-full animate-pulse w-3/4" />
          </div>
        </section>
      )}

      {/* 4. PAGE 3: RESULTS STATE */}
      {hasResults && !isAnalyzing && (
        <div className="flex flex-col gap-8 animate-in fade-in duration-200">
          {/* Main Recommended Section */}
          <section className="bg-white dark:bg-[#16281f] rounded-3xl border border-[#e8e2d5] dark:border-[#274539] p-6 sm:p-8 shadow-xs flex flex-col gap-7">
            {/* Header / Summary Tag */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[#e8e2d5] dark:border-[#274539]">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#e85b2a] bg-[#fdf3ee] dark:bg-[#e85b2a]/20 px-2.5 py-0.5 rounded-full">
                    YOUR BEST SAFAR
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                    {activeRoute.priorityLabel}
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  The best way to get there
                </h2>
                <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-1">
                  From <span className="font-semibold text-[#10231c] dark:text-[#f8f4ec]">{startLocation || "Your Location"}</span> to{" "}
                  <span className="font-semibold text-[#10231c] dark:text-[#f8f4ec]">{destination || "Destination"}</span>
                </p>
              </div>

              {/* Price & Duration Hero Box */}
              <div className="p-4 rounded-2xl bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] flex flex-col sm:items-end min-w-[200px]">
                <div className="text-2xl sm:text-3xl font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight">
                  {activeRoute.fareEstimate}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#52635a] dark:text-[#9db0a6] mt-0.5">
                  <ClockIcon />
                  <span>{activeRoute.durationEstimate}</span>
                </div>
                <span className="text-[11px] text-[#8a9990] mt-1 italic">
                  &ldquo;{activeRoute.tagline}&rdquo;
                </span>
              </div>
            </div>

            {/* VISUAL JOURNEY TIMELINE */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#10231c] dark:text-[#f8f4ec]">
                JOURNEY TIMELINE
              </span>

              <div className="relative pl-6 sm:pl-8 flex flex-col gap-6 before:content-[''] before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-[#e8e2d5] dark:before:bg-[#274539]">
                {/* 1. Origin Node */}
                <div className="relative flex items-start gap-3">
                  <span className="absolute -left-[20px] sm:-left-[24px] mt-0.5 w-[14px] h-[14px] rounded-full bg-[#10231c] dark:bg-[#f8f4ec] border-2 border-white dark:border-[#16281f]" />
                  <div>
                    <div className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                      📍 {startLocation || "Your Location"}
                    </div>
                    <div className="text-[11px] text-[#52635a] dark:text-[#9db0a6]">
                      Journey origin point
                    </div>
                  </div>
                </div>

                {/* Segment Nodes */}
                {activeRoute.segments.map((segment) => (
                  <div key={segment.id} className="relative flex items-start gap-3">
                    <span className="absolute -left-[20px] sm:-left-[24px] mt-0.5 w-[14px] h-[14px] rounded-full bg-[#e85b2a] border-2 border-white dark:border-[#16281f]" />
                    <div className="p-3 rounded-xl bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5]/80 dark:border-[#274539]/80 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-lg bg-white dark:bg-[#16281f] text-[#e85b2a] shadow-2xs">
                          {segment.mode === "train" && <TrainIcon />}
                          {segment.mode === "bus" && <BusIcon />}
                          {segment.mode === "metro" && <MetroIcon />}
                          {segment.mode === "auto" && <AutoIcon />}
                          {segment.mode === "cab" && <CabIcon />}
                          {segment.mode === "walk" && <WalkIcon />}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                            {segment.modeLabel}
                          </div>
                          <div className="text-[11px] text-[#8a9990]">
                            {segment.notes}
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col sm:items-end justify-between border-t sm:border-t-0 border-[#f0ebe1] dark:border-[#223b30] pt-1 sm:pt-0 text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                        <span>{segment.fareFormatted}</span>
                        <span className="text-[11px] font-normal text-[#52635a] dark:text-[#9db0a6]">
                          {segment.durationFormatted}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 3. Destination Node */}
                <div className="relative flex items-start gap-3">
                  <span className="absolute -left-[20px] sm:-left-[24px] mt-0.5 w-[14px] h-[14px] rounded-full bg-emerald-600 border-2 border-white dark:border-[#16281f]" />
                  <div>
                    <div className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                      📍 {destination || "Destination"}
                    </div>
                    <div className="text-[11px] text-[#52635a] dark:text-[#9db0a6]">
                      Arrival & final drop-off
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KEY JOURNEY METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#e8e2d5] dark:border-[#274539]">
              <div className="p-3.5 rounded-xl bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539]">
                <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider block">
                  Estimated Total
                </span>
                <span className="text-sm sm:text-base font-bold text-[#10231c] dark:text-[#f8f4ec] mt-0.5 block">
                  {activeRoute.fareEstimate}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539]">
                <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider block">
                  Estimated Time
                </span>
                <span className="text-sm sm:text-base font-bold text-[#10231c] dark:text-[#f8f4ec] mt-0.5 block">
                  {activeRoute.durationEstimate}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539]">
                <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider block">
                  Transfers
                </span>
                <span className="text-sm sm:text-base font-bold text-[#10231c] dark:text-[#f8f4ec] mt-0.5 block">
                  {activeRoute.transfersCount} {activeRoute.transfersCount === 1 ? "transfer" : "transfers"}
                </span>
              </div>
            </div>
          </section>

          {/* TWO-COLUMN SECTION: FARE BREAKDOWN & ALTERNATIVE OPTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* FARE BREAKDOWN CARD */}
            <section className="lg:col-span-5 bg-white dark:bg-[#16281f] rounded-3xl border border-[#e8e2d5] dark:border-[#274539] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#10231c] dark:text-[#f8f4ec] mb-1">
                  Estimated Fare Breakdown
                </h3>
                <p className="text-xs text-[#52635a] dark:text-[#9db0a6] mb-4">
                  Segment-by-segment transport estimates
                </p>

                <div className="space-y-3 text-xs font-medium">
                  {activeRoute.segments.map((seg) => (
                    <div key={seg.id} className="flex items-center justify-between py-1 border-b border-[#f0ebe1] dark:border-[#223b30]">
                      <span className="text-[#52635a] dark:text-[#9db0a6]">{seg.modeLabel}</span>
                      <span className="font-bold text-[#10231c] dark:text-[#f8f4ec]">{seg.fareFormatted}</span>
                    </div>
                  ))}

                  <div className="pt-2 flex items-center justify-between text-sm font-bold border-t-2 border-[#e8e2d5] dark:border-[#274539]">
                    <span className="text-[#10231c] dark:text-[#f8f4ec]">Estimated total</span>
                    <span className="text-[#e85b2a]">{activeRoute.fareEstimate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-[#f0ebe1] dark:border-[#223b30]">
                <p className="text-[11px] text-[#8a9990] leading-relaxed">
                  Actual fares may vary based on local traffic conditions, peak hours, booking class, and auto negotiations.
                </p>
              </div>
            </section>

            {/* ALTERNATIVE OPTIONS SECTION */}
            <section className="lg:col-span-7 bg-white dark:bg-[#16281f] rounded-3xl border border-[#e8e2d5] dark:border-[#274539] p-6 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#10231c] dark:text-[#f8f4ec]">
                    Compare Alternative Routes
                  </h3>
                  <p className="text-xs text-[#52635a] dark:text-[#9db0a6]">
                    Click any alternative route to inspect details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {computedRoutes.map((alt) => {
                  const isSelected = alt.id === activeRoute.id;
                  return (
                    <button
                      key={alt.id}
                      type="button"
                      onClick={() => setActiveRouteId(alt.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${isSelected
                          ? "border-[#e85b2a] bg-[#fdf3ee] dark:bg-[#e85b2a]/15 ring-1 ring-[#e85b2a] shadow-xs"
                          : "border-[#e8e2d5] dark:border-[#274539] bg-[#fbf9f4] dark:bg-[#10231c] hover:border-[#e85b2a]/50"
                        }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold tracking-wider uppercase text-[#52635a] dark:text-[#9db0a6]">
                            {alt.priorityLabel}
                          </span>
                          {alt.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                              {alt.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-base font-bold text-[#10231c] dark:text-[#f8f4ec]">
                          {alt.fareEstimate}
                        </div>
                        <div className="text-xs text-[#52635a] dark:text-[#9db0a6] mt-0.5">
                          {alt.durationEstimate}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#e8e2d5]/60 dark:border-[#274539]/60">
                        <p className="text-[11px] text-[#8a9990] leading-snug">
                          {alt.reason}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* PAY FAIR EXPLANATION CARD */}
          <section className="bg-white dark:bg-[#16281f] rounded-2xl border border-[#e8e2d5] dark:border-[#274539] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8a9990] block">
                How SAFAR helps
              </span>
              <h4 className="text-sm sm:text-base font-bold text-[#10231c] dark:text-[#f8f4ec] mt-0.5">
                Intelligent journey combination
              </h4>
              <p className="text-xs text-[#52635a] dark:text-[#9db0a6] mt-1 leading-relaxed">
                SAFAR compares available transport options and combines them into a practical journey based on your priorities.
              </p>
            </div>

            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] text-[11px] font-bold text-[#52635a] dark:text-[#9db0a6]">
                <span className="w-2 h-2 rounded-full bg-[#e85b2a]" />
                <span>SAFAR recommendation · Prototype</span>
              </span>
            </div>
          </section>
        </div>
      )}

      {/* 5. PAGE 1: JOURNEY INPUT FORM (Visible initially or when not viewing results/analyzing) */}
      {!hasResults && !isAnalyzing && (
        <form onSubmit={handleFindBestSafar} className="flex flex-col gap-6">
          {/* LOCATION SECTION */}
          <section className="bg-white dark:bg-[#16281f] rounded-3xl border border-[#e8e2d5] dark:border-[#274539] p-6 sm:p-7 shadow-xs flex flex-col gap-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#10231c] dark:text-[#f8f4ec] flex items-center gap-2">
              <LocationPinIcon />
              <span>Route Locations</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Starting Point */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="start-location" className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                    Starting from
                  </label>
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    className="text-[11px] font-semibold text-[#e85b2a] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <CrosshairIcon />
                    <span>Use my current location</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="start-location"
                    type="text"
                    value={startLocation}
                    onChange={(e) => {
                      setStartLocation(e.target.value);
                      setIsCurrentLocationSelected(false);
                    }}
                    placeholder="Enter your starting location"
                    className="w-full pl-3.5 pr-10 py-3 bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] rounded-xl text-sm text-[#10231c] dark:text-[#f8f4ec] placeholder-[#8a9990] outline-none focus:border-[#e85b2a] focus:ring-2 focus:ring-[#e85b2a]/15 transition-all"
                  />
                  {isCurrentLocationSelected && (
                    <div className="absolute right-3 top-3.5 flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold pointer-events-none">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                  )}
                </div>
                {isCurrentLocationSelected && (
                  <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                    Current location selected
                  </p>
                )}
              </div>

              {/* Destination */}
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="destination-location" className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                  Going to
                </label>
                <input
                  ref={destinationInputRef}
                  id="destination-location"
                  type="text"
                  value={destination}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setShowSuggestions(true);
                  }}
                  placeholder="Where do you want to go?"
                  className="w-full pl-3.5 pr-4 py-3 bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] rounded-xl text-sm text-[#10231c] dark:text-[#f8f4ec] placeholder-[#8a9990] outline-none focus:border-[#e85b2a] focus:ring-2 focus:ring-[#e85b2a]/15 transition-all"
                />

                {/* Destination suggestions dropdown/pills */}
                {showSuggestions && (
                  <div className="mt-1 p-3 rounded-2xl bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] shadow-md flex flex-col gap-1.5 z-10">
                    <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider">
                      Suggested Destinations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {MOCK_DESTINATIONS.map((place) => (
                        <button
                          key={place}
                          type="button"
                          onClick={() => {
                            setDestination(place);
                            setShowSuggestions(false);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#16281f] border border-[#e8e2d5] dark:border-[#274539] hover:border-[#e85b2a] text-xs font-medium text-[#10231c] dark:text-[#f8f4ec] hover:text-[#e85b2a] transition-all cursor-pointer"
                        >
                          {place}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* JOURNEY PRIORITY SECTION */}
          <section className="bg-white dark:bg-[#16281f] rounded-3xl border border-[#e8e2d5] dark:border-[#274539] p-6 sm:p-7 shadow-xs flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#10231c] dark:text-[#f8f4ec]">
              What matters most?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* CHEAPEST */}
              <button
                type="button"
                onClick={() => setPriority("cheapest")}
                className={`p-4 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${priority === "cheapest"
                    ? "border-[#e85b2a] bg-[#fdf3ee] dark:bg-[#e85b2a]/15 ring-1 ring-[#e85b2a] shadow-xs"
                    : "border-[#e8e2d5] dark:border-[#274539] bg-[#fbf9f4] dark:bg-[#10231c] hover:border-[#e85b2a]/50"
                  }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec] uppercase tracking-wider">
                    CHEAPEST
                  </span>
                  {priority === "cheapest" && <CheckIcon />}
                </div>
                <p className="text-xs text-[#52635a] dark:text-[#9db0a6]">
                  Spend as little as possible
                </p>
              </button>

              {/* FASTEST */}
              <button
                type="button"
                onClick={() => setPriority("fastest")}
                className={`p-4 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${priority === "fastest"
                    ? "border-[#e85b2a] bg-[#fdf3ee] dark:bg-[#e85b2a]/15 ring-1 ring-[#e85b2a] shadow-xs"
                    : "border-[#e8e2d5] dark:border-[#274539] bg-[#fbf9f4] dark:bg-[#10231c] hover:border-[#e85b2a]/50"
                  }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec] uppercase tracking-wider">
                    FASTEST
                  </span>
                  {priority === "fastest" && <CheckIcon />}
                </div>
                <p className="text-xs text-[#52635a] dark:text-[#9db0a6]">
                  Reach your destination sooner
                </p>
              </button>

              {/* BEST VALUE */}
              <button
                type="button"
                onClick={() => setPriority("best_value")}
                className={`p-4 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${priority === "best_value"
                    ? "border-[#e85b2a] bg-[#fdf3ee] dark:bg-[#e85b2a]/15 ring-1 ring-[#e85b2a] shadow-xs"
                    : "border-[#e8e2d5] dark:border-[#274539] bg-[#fbf9f4] dark:bg-[#10231c] hover:border-[#e85b2a]/50"
                  }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec] uppercase tracking-wider">
                    BEST VALUE
                  </span>
                  {priority === "best_value" && <CheckIcon />}
                </div>
                <p className="text-xs text-[#52635a] dark:text-[#9db0a6]">
                  Balance cost, time & convenience
                </p>
              </button>
            </div>
          </section>

          {/* TRANSPORT PREFERENCES */}
          <section className="bg-white dark:bg-[#16281f] rounded-3xl border border-[#e8e2d5] dark:border-[#274539] p-6 sm:p-7 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#10231c] dark:text-[#f8f4ec]">
                How would you like to travel?
              </h2>
              <button
                type="button"
                onClick={handleToggleAllModes}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${isAllModes
                    ? "bg-[#10231c] text-white dark:bg-[#f8f4ec] dark:text-[#10231c]"
                    : "bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] text-[#52635a] dark:text-[#9db0a6]"
                  }`}
              >
                All modes
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
              {TRANSPORT_MODES.map((item) => {
                const isSelected = selectedModes.includes(item.id);
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleToggleMode(item.id)}
                    className={`p-3 rounded-2xl border transition-all duration-150 flex flex-col items-center justify-center gap-1.5 cursor-pointer ${isSelected
                        ? "border-[#e85b2a] bg-[#fdf3ee] dark:bg-[#e85b2a]/15 text-[#e85b2a] font-bold"
                        : "border-[#e8e2d5] dark:border-[#274539] bg-[#fbf9f4] dark:bg-[#10231c] text-[#52635a] dark:text-[#9db0a6] hover:border-[#e85b2a]/50"
                      }`}
                  >
                    <Icon />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* OPTIONAL PREFERENCES */}
          <section className="bg-white dark:bg-[#16281f] rounded-3xl border border-[#e8e2d5] dark:border-[#274539] p-6 sm:p-7 shadow-xs flex flex-col gap-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#10231c] dark:text-[#f8f4ec]">
              Optional Preferences
            </h2>

            <div className="flex flex-wrap gap-2">
              {OPTIONAL_PREFERENCES.map((opt) => {
                const isSelected = selectedPreferences.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleTogglePreference(opt.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${isSelected
                        ? "border-[#10231c] bg-[#10231c] text-white dark:border-[#f8f4ec] dark:bg-[#f8f4ec] dark:text-[#10231c]"
                        : "border-[#e8e2d5] dark:border-[#274539] bg-[#fbf9f4] dark:bg-[#10231c] text-[#52635a] dark:text-[#9db0a6] hover:border-[#e85b2a]"
                      }`}
                  >
                    {isSelected ? `✓ ${opt.label}` : opt.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* PRIMARY CTA */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-[#8a9990]">
              SAFAR combines live transit data and route cost models.
            </p>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#e85b2a] hover:bg-[#d14d1e] active:scale-[0.98] text-white text-sm font-bold shadow-xs transition-all cursor-pointer"
            >
              <span>Find My Best SAFAR</span>
              <ArrowRightIcon />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
