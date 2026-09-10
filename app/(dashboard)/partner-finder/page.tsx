"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";

// Clean inline SVG icons
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const VehicleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const AVAILABLE_INTERESTS = [
  "Food",
  "Culture",
  "Nature",
  "Adventure",
  "History",
  "Shopping",
  "Photography",
  "Relaxation",
] as const;

interface Traveller {
  id: string;
  name: string;
  age: number;
  shortBio: string;
  destination: string;
  travelDate: string;
  travelTime: string;
  interests: string[];
  transport: string;
  matchPercentage: number;
  initials: string;
  avatarColor: string;
}

const MOCK_TRAVELLERS: Traveller[] = [
  {
    id: "traveller-1",
    name: "Aarav Mehta",
    age: 22,
    shortBio: "Architecture student exploring Rajasthani forts, ancient stepwells, and street sketching.",
    destination: "Jaipur, Rajasthan",
    travelDate: "Tomorrow",
    travelTime: "10:30 AM",
    interests: ["Culture", "History", "Photography", "Food"],
    transport: "Cab / Auto",
    matchPercentage: 94,
    initials: "AM",
    avatarColor: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800",
  },
  {
    id: "traveller-2",
    name: "Priya Sharma",
    age: 26,
    shortBio: "Solo backpacker & food writer looking to explore heritage spice bazaars and local textile crafts.",
    destination: "Jaipur, Rajasthan",
    travelDate: "Tomorrow",
    travelTime: "11:15 AM",
    interests: ["Food", "Culture", "Shopping"],
    transport: "Mix of Everything",
    matchPercentage: 89,
    initials: "PS",
    avatarColor: "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800",
  },
  {
    id: "traveller-3",
    name: "Rohan Varma",
    age: 28,
    shortBio: "Weekend road tripper and landscape photographer heading for sunrise vistas and mountain trails.",
    destination: "Jaipur, Rajasthan",
    travelDate: "This Weekend",
    travelTime: "08:00 AM",
    interests: ["Nature", "Photography", "Adventure"],
    transport: "Public Transport",
    matchPercentage: 83,
    initials: "RV",
    avatarColor: "bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/50 dark:text-sky-200 dark:border-sky-800",
  },
  {
    id: "traveller-4",
    name: "Ananya Sen",
    age: 24,
    shortBio: "Historian on a cultural exploration trail across old palace quarters, museums, and royal havelis.",
    destination: "Jaipur, Rajasthan",
    travelDate: "Tomorrow",
    travelTime: "02:00 PM",
    interests: ["History", "Culture", "Relaxation"],
    transport: "Cab / Auto",
    matchPercentage: 78,
    initials: "AS",
    avatarColor: "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-800",
  },
  {
    id: "traveller-5",
    name: "Dev Malhotra",
    age: 23,
    shortBio: "College trekker keen on walking heritage trails, finding hidden street food stalls, and splitting rides.",
    destination: "Jaipur, Rajasthan",
    travelDate: "Next Monday",
    travelTime: "09:30 AM",
    interests: ["Adventure", "Food", "History"],
    transport: "Public Transport",
    matchPercentage: 72,
    initials: "DM",
    avatarColor: "bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/50 dark:text-purple-200 dark:border-purple-800",
  },
];

export default function PartnerFinderPage() {
  // Form State
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [transport, setTransport] = useState("Mix of Everything");

  // Validation & Submission State
  const [errors, setErrors] = useState<{ destination?: string; date?: string; time?: string }>({});
  const [hasSearched, setHasSearched] = useState(false);
  const [travellers, setTravellers] = useState<Traveller[]>([]);

  // Modal / Profile View State
  const [selectedTraveller, setSelectedTraveller] = useState<Traveller | null>(null);
  const [sentRequests, setSentRequests] = useState<Record<string, boolean>>({});

  // Close modal on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && selectedTraveller) {
        setSelectedTraveller(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTraveller]);

  // Toggle interest chip
  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  // Form submission & validation
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: { destination?: string; date?: string; time?: string } = {};

    if (!destination.trim()) {
      newErrors.destination = "Please enter your travel destination.";
    }
    if (!date) {
      newErrors.date = "Please select your travel date.";
    }
    if (!time) {
      newErrors.time = "Please specify an estimated travel time.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear validation errors
    setErrors({});

    // Populate mock results with searched destination context
    const contextualResults = MOCK_TRAVELLERS.map((t) => ({
      ...t,
      destination: destination.trim(),
    }));

    setTravellers(contextualResults);
    setHasSearched(true);
  };

  // Send request action (Mock behavior)
  const handleSendRequest = (id: string) => {
    setSentRequests((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="dashboard-canvas max-w-5xl mx-auto flex flex-col gap-6 py-2">
      {/* 1. HEADER */}
      <header className="border-b border-[#e8e2d5] dark:border-[#274539] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold tracking-[0.16em] text-[#e85b2a] uppercase">
            GO TOGETHER
          </span>
          <h1
            className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-[#10231c] dark:text-[#f8f4ec] mt-1 leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Travel together. Go farther.
          </h1>
          <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-1">
            Find travellers heading your way and discover people with similar interests.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="text-xs font-semibold text-[#52635a] hover:text-[#e85b2a] dark:text-[#9db0a6] dark:hover:text-[#f8f4ec] transition-colors self-start sm:self-auto"
        >
          ← Back to SAFAR
        </Link>
      </header>

      {/* 2. PROMINENT SEARCH CARD */}
      <section className="bg-white dark:bg-[#16281f] rounded-2xl border border-[#e8e2d5] dark:border-[#274539] p-5 sm:p-7 shadow-xs">
        <div className="mb-5">
          <h2 className="text-base sm:text-lg font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight">
            Find travellers heading your way
          </h2>
          <p className="text-xs text-[#52635a] dark:text-[#9db0a6] mt-0.5">
            Enter your trip details below to match with compatible companions and shared rides.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col gap-5">
          {/* Main Inputs Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Destination */}
            <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-2">
              <label htmlFor="destination" className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-wide uppercase">
                Destination <span className="text-[#e85b2a]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8a9990]">
                  <MapPinIcon />
                </div>
                <input
                  id="destination"
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    if (errors.destination) setErrors((prev) => ({ ...prev, destination: undefined }));
                  }}
                  placeholder="Where are you going?"
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-[#fbf9f4] dark:bg-[#10231c] border ${errors.destination ? "border-red-500" : "border-[#e8e2d5] dark:border-[#274539]"
                    } rounded-xl text-sm text-[#10231c] dark:text-[#f8f4ec] placeholder-[#8a9990] outline-none focus:border-[#e85b2a] focus:ring-2 focus:ring-[#e85b2a]/15 transition-all`}
                />
              </div>
              {errors.destination && (
                <p className="text-[11px] font-medium text-red-600 dark:text-red-400 mt-0.5">{errors.destination}</p>
              )}
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="travel-date" className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-wide uppercase">
                Date <span className="text-[#e85b2a]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8a9990]">
                  <CalendarIcon />
                </div>
                <input
                  id="travel-date"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
                  }}
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-[#fbf9f4] dark:bg-[#10231c] border ${errors.date ? "border-red-500" : "border-[#e8e2d5] dark:border-[#274539]"
                    } rounded-xl text-sm text-[#10231c] dark:text-[#f8f4ec] outline-none focus:border-[#e85b2a] focus:ring-2 focus:ring-[#e85b2a]/15 transition-all`}
                />
              </div>
              {errors.date && (
                <p className="text-[11px] font-medium text-red-600 dark:text-red-400 mt-0.5">{errors.date}</p>
              )}
            </div>

            {/* Time */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="travel-time" className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-wide uppercase">
                Time <span className="text-[#e85b2a]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8a9990]">
                  <ClockIcon />
                </div>
                <input
                  id="travel-time"
                  type="time"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    if (errors.time) setErrors((prev) => ({ ...prev, time: undefined }));
                  }}
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-[#fbf9f4] dark:bg-[#10231c] border ${errors.time ? "border-red-500" : "border-[#e8e2d5] dark:border-[#274539]"
                    } rounded-xl text-sm text-[#10231c] dark:text-[#f8f4ec] outline-none focus:border-[#e85b2a] focus:ring-2 focus:ring-[#e85b2a]/15 transition-all`}
                />
              </div>
              {errors.time && (
                <p className="text-[11px] font-medium text-red-600 dark:text-red-400 mt-0.5">{errors.time}</p>
              )}
            </div>
          </div>

          {/* Transport Dropdown & Helper */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div className="flex items-center gap-2.5 flex-1 max-w-xs">
              <div className="text-[#8a9990] flex-shrink-0">
                <VehicleIcon />
              </div>
              <div className="flex-1">
                <label htmlFor="transport-select" className="sr-only">Transport Preference</label>
                <select
                  id="transport-select"
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] rounded-xl text-xs sm:text-sm text-[#10231c] dark:text-[#f8f4ec] outline-none focus:border-[#e85b2a] transition-all"
                >
                  <option value="Mix of Everything">Transport: Mix of Everything</option>
                  <option value="Public Transport">Transport: Public Transport</option>
                  <option value="Cab / Auto">Transport: Cab / Auto</option>
                </select>
              </div>
            </div>

            <p className="text-[11px] text-[#8a9990]">
              Select your travel style and preferences to optimize companionship compatibility.
            </p>
          </div>

          {/* Interests Multi-Select Chips */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#f0ebe0] dark:border-[#274539]">
            <span className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-wide uppercase">
              Interests <span className="text-[11px] text-[#8a9990] font-normal normal-case">(optional, pick what you enjoy)</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_INTERESTS.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${isSelected
                        ? "bg-[#e85b2a] border-[#e85b2a] text-white shadow-2xs"
                        : "bg-[#fbf9f4] dark:bg-[#10231c] border-[#e8e2d5] dark:border-[#274539] text-[#52635a] dark:text-[#9db0a6] hover:border-[#e85b2a]/50"
                      }`}
                  >
                    {isSelected ? `✓ ${interest}` : interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-[#f0ebe0] dark:border-[#274539] flex items-center justify-between">
            <span className="text-xs text-[#8a9990]">
              Required fields marked with <span className="text-[#e85b2a]">*</span>
            </span>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#e85b2a] hover:bg-[#d14d1e] text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-200 shadow-xs hover:translate-x-0.5"
            >
              <span>Find Travellers</span>
              <ArrowRight />
            </button>
          </div>
        </form>
      </section>

      {/* 3. RESULTS SECTION (Displayed after search) */}
      {hasSearched && (
        <section className="flex flex-col gap-4 animate-in fade-in duration-300">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#e8e2d5] dark:border-[#274539] pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight">
                Travellers heading your way
              </h2>
              <p className="text-xs text-[#52635a] dark:text-[#9db0a6] mt-0.5">
                Based on your destination, timing and interests
              </p>
            </div>
            <span className="text-xs font-semibold text-[#e85b2a] px-3 py-1 rounded-full bg-[#fdf3ee] dark:bg-[#e85b2a]/10 border border-[#e85b2a]/20 self-start sm:self-auto">
              {travellers.length} compatible travellers found
            </span>
          </div>

          {/* Traveller Cards: 2-column desktop grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {travellers.map((traveller) => {
              const isRequested = Boolean(sentRequests[traveller.id]);

              return (
                <div
                  key={traveller.id}
                  className="bg-white dark:bg-[#16281f] rounded-2xl p-5 border border-[#e8e2d5] dark:border-[#274539] shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top: Avatar, Name, Match Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-xl border flex items-center justify-center font-bold text-sm shadow-2xs ${traveller.avatarColor}`}
                        >
                          {traveller.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm sm:text-base font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight">
                              {traveller.name}, {traveller.age}
                            </h3>
                          </div>
                          <p className="text-xs text-[#52635a] dark:text-[#9db0a6] line-clamp-1">
                            {traveller.shortBio}
                          </p>
                        </div>
                      </div>

                      {/* Match Percentage Badge */}
                      <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-md bg-[#edf5f1] dark:bg-[#1c342a] text-[#1c4837] dark:text-[#9fc7b6] border border-[#d6e9de] dark:border-[#274539] whitespace-nowrap">
                        {traveller.matchPercentage}% match
                      </span>
                    </div>

                    {/* Meta: Destination & Timing */}
                    <div className="mt-3.5 pt-3 border-t border-[#f0ebe0] dark:border-[#274539] grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#8a9990] tracking-wider block">Destination</span>
                        <span className="font-semibold text-[#10231c] dark:text-[#f8f4ec] truncate block">
                          {traveller.destination}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#8a9990] tracking-wider block">Timing</span>
                        <span className="text-[#52635a] dark:text-[#9db0a6] block">
                          {traveller.travelDate} · {traveller.travelTime}
                        </span>
                      </div>
                    </div>

                    {/* Interest Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {traveller.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-0.5 rounded-md bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] text-[11px] text-[#52635a] dark:text-[#9db0a6]"
                        >
                          {interest}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 rounded-md bg-[#fdf3ee] dark:bg-[#e85b2a]/10 text-[11px] font-medium text-[#e85b2a]">
                        {traveller.transport}
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-4 pt-3 border-t border-[#f0ebe0] dark:border-[#274539] flex items-center justify-between">
                    {isRequested ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        <CheckIcon /> Request Sent
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#8a9990]">
                        Verified traveler profile
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedTraveller(traveller)}
                      className="px-3.5 py-1.5 rounded-lg border border-[#e8e2d5] dark:border-[#274539] hover:border-[#10231c] dark:hover:border-[#f8f4ec] text-xs font-semibold text-[#10231c] dark:text-[#f8f4ec] hover:bg-[#10231c] hover:text-white dark:hover:bg-[#f8f4ec] dark:hover:text-[#10231c] transition-all"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. PROFILE MODAL (Accessible dialog) */}
      {selectedTraveller && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-traveller-name"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-200"
          onClick={() => setSelectedTraveller(null)}
        >
          <div
            className="bg-white dark:bg-[#16281f] rounded-2xl border border-[#e8e2d5] dark:border-[#274539] max-w-lg w-full p-6 sm:p-7 shadow-xl relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelectedTraveller(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-[#8a9990] hover:text-[#10231c] dark:hover:text-[#f8f4ec] hover:bg-[#eee9df]/50 dark:hover:bg-[#1c342a] transition-colors"
              aria-label="Close traveller profile"
            >
              <CloseIcon />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-[#e8e2d5] dark:border-[#274539]">
              <div
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center font-bold text-lg shadow-xs ${selectedTraveller.avatarColor}`}
              >
                {selectedTraveller.initials}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 id="modal-traveller-name" className="text-lg sm:text-xl font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight">
                    {selectedTraveller.name}, {selectedTraveller.age}
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#edf5f1] dark:bg-[#1c342a] text-[#1c4837] dark:text-[#9fc7b6]">
                    {selectedTraveller.matchPercentage}% match
                  </span>
                </div>
                <p className="text-xs text-[#52635a] dark:text-[#9db0a6] mt-0.5">
                  Heading to {selectedTraveller.destination}
                </p>
              </div>
            </div>

            {/* Profile Bio */}
            <div className="py-4 border-b border-[#e8e2d5] dark:border-[#274539]">
              <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider block mb-1">
                About the traveller
              </span>
              <p className="text-xs sm:text-sm text-[#10231c] dark:text-[#f8f4ec] leading-relaxed">
                {selectedTraveller.shortBio}
              </p>
            </div>

            {/* Trip Details Grid */}
            <div className="py-4 border-b border-[#e8e2d5] dark:border-[#274539] grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider block">
                  Departure Date
                </span>
                <span className="font-semibold text-[#10231c] dark:text-[#f8f4ec]">
                  {selectedTraveller.travelDate}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider block">
                  Departure Time
                </span>
                <span className="font-semibold text-[#10231c] dark:text-[#f8f4ec]">
                  {selectedTraveller.travelTime}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider block">
                  Transport Preference
                </span>
                <span className="font-semibold text-[#e85b2a]">
                  {selectedTraveller.transport}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider block">
                  Safety Status
                </span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  ID Verified ✓
                </span>
              </div>
            </div>

            {/* Shared Interests */}
            <div className="py-4">
              <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider block mb-2">
                Travel Interests
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedTraveller.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-2.5 py-1 rounded-md bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] text-xs font-medium text-[#10231c] dark:text-[#f8f4ec]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#e8e2d5] dark:border-[#274539] flex flex-col gap-2.5">
              {sentRequests[selectedTraveller.id] ? (
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    disabled
                    className="w-full py-2.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-emerald-300 dark:border-emerald-800"
                  >
                    <CheckIcon /> Request Sent ✓
                  </button>
                  <p className="text-[11px] text-center text-[#52635a] dark:text-[#9db0a6] leading-relaxed">
                    Your travel request has been sent. Chat will become available if they accept.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSendRequest(selectedTraveller.id)}
                  className="w-full py-2.5 rounded-full bg-[#e85b2a] hover:bg-[#d14d1e] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <span>Send Travel Request</span>
                  <ArrowRight />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

