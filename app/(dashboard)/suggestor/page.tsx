"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const DURATION_OPTIONS = [
  "1 day",
  "2 days",
  "3 days",
  "4 days",
  "5 days",
  "7 days",
];

const INTEREST_OPTIONS = [
  "Food",
  "Culture",
  "Nature",
  "Adventure",
  "History",
  "Shopping",
  "Photography",
  "Relaxation",
];

const MOOD_OPTIONS = [
  { id: "relaxed", label: "Relaxed", desc: "Unhurried pace with ample downtime" },
  { id: "balanced", label: "Balanced", desc: "Optimal blend of sightseeing and leisure" },
  { id: "explore-more", label: "Explore More", desc: "High-energy itinerary maximizing locations" },
];

const TRANSPORT_OPTIONS = [
  { id: "public-transport", label: "Public Transport", desc: "Metro networks, buses, and local rail" },
  { id: "cab-auto", label: "Cab / Auto", desc: "Doorstep on-demand cabs and auto-rickshaws" },
  { id: "mix", label: "Mix of Everything", desc: "Smart combination of transit, cabs and walking" },
];

interface GeolocationCoords {
  latitude: number;
  longitude: number;
}

type GeoState = "idle" | "detecting" | "detected" | "denied" | "unsupported";

export default function SuggestorPage() {
  // Geolocation State
  const [coords, setCoords] = useState<GeolocationCoords | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoState>("detecting");
  const [geoErrorCode, setGeoErrorCode] = useState<number | null>(null);

  // Form State
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("3 days");
  const [budget, setBudget] = useState("5,000");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Culture",
    "Food",
  ]);
  const [mood, setMood] = useState("Balanced");
  const [transport, setTransport] = useState("Mix of Everything");

  // UI / Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Request browser geolocation with exact options
  const detectLocation = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setGeoStatus("unsupported");
      return;
    }

    setGeoStatus("detecting");
    setGeoErrorCode(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setGeoStatus("detected");
        setGeoErrorCode(null);
      },
      (err) => {
        console.warn("Geolocation error:", err.code, err.message);
        setGeoErrorCode(err.code);
        setGeoStatus("denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
    if (errors.interests) {
      setErrors((prev) => ({ ...prev, interests: "" }));
    }
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/[^0-9]/g, "");
    if (!rawDigits) {
      setBudget("");
      return;
    }
    const num = parseInt(rawDigits, 10);
    setBudget(num.toLocaleString("en-IN"));
    if (errors.budget) {
      setErrors((prev) => ({ ...prev, budget: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!destination.trim()) {
      newErrors.destination = "Please specify where you want to go.";
    }
    if (!duration) {
      newErrors.duration = "Please select a trip duration.";
    }
    const numericBudget = parseInt(budget.replace(/[^0-9]/g, "") || "0", 10);
    if (!budget.trim() || numericBudget <= 0) {
      newErrors.budget = "Please enter a valid budget greater than zero.";
    }
    if (selectedInterests.length === 0) {
      newErrors.interests = "Please select at least one interest.";
    }
    if (!mood) {
      newErrors.mood = "Please select how you want the trip to feel.";
    }
    if (!transport) {
      newErrors.transport = "Please select your preferred way to get around.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  const handleEditPreferences = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="safar-planner-page">
      {/* 1. Header */}
      <header className="safar-planner-nav">
        <Link href="/" className="safar-planner-brand">
          <Image
            src="/safar-logo.jpeg"
            alt="SAFAR logo"
            width={32}
            height={32}
            className="safar-planner-brand-logo"
            priority
          />
          <span className="safar-planner-brand-name">SAFAR</span>
        </Link>
        <Link href="/" className="safar-planner-back-link">
          ← Back to SAFAR
        </Link>
      </header>

      {/* 2. Page Intro */}
      <section className="safar-planner-hero">
        <h1 className="safar-planner-heading">Plan your SAFAR</h1>
        <p className="safar-planner-subheading">
          Tell us where you want to go and how you want to experience it.
        </p>
      </section>

      {/* 3. Main Container */}
      <main className="safar-planner-main">
        <div className="safar-planner-form-card">
          <div className="safar-planner-card-accent-bar" />

          {!isSubmitted ? (
            /* ====================================================
               PLANNER FORM
               ==================================================== */
            <form onSubmit={handleSubmit} noValidate className="safar-planner-grid">
              {/* Validation Alert */}
              {Object.keys(errors).length > 0 && (
                <div className="safar-planner-error-box" role="alert">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>Please provide all required fields highlighted below to continue.</span>
                </div>
              )}

              {/* 3. Live Current Location */}
              <div className="safar-planner-location-box">
                <div className="safar-planner-location-header">
                  <span className="safar-planner-location-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="2" x2="12" y2="6" />
                      <line x1="12" y1="18" x2="12" y2="22" />
                      <line x1="2" y1="12" x2="6" y2="12" />
                      <line x1="18" y1="12" x2="22" y2="12" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Your location
                  </span>

                  {geoStatus === "denied" && (
                    <button
                      type="button"
                      onClick={detectLocation}
                      className="safar-planner-location-btn"
                    >
                      Try again
                    </button>
                  )}
                </div>

                <div className="safar-planner-location-status">
                  {geoStatus === "detecting" && (
                    <div className="flex items-center gap-2">
                      <span className="safar-status-dot safar-status-dot-pulse" />
                      <span>Detecting your location...</span>
                    </div>
                  )}

                  {geoStatus === "detected" && (
                    <div className="flex items-center gap-2">
                      <span className="safar-status-dot safar-status-dot-active" />
                      <span>Location detected</span>
                    </div>
                  )}

                  {geoStatus === "denied" && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="safar-status-dot safar-status-dot-idle" />
                        <span className="font-semibold text-stone-700">Location access is unavailable.</span>
                      </div>
                      <p className="text-xs text-stone-500 pl-4 m-0">
                        {geoErrorCode === 1
                          ? "Location permission was denied. Please allow location access in your browser/site settings for localhost and click 'Try again'."
                          : "Allow location access to get better recommendations."}
                      </p>
                    </div>
                  )}

                  {geoStatus === "unsupported" && (
                    <div className="flex items-center gap-2">
                      <span className="safar-status-dot safar-status-dot-idle" />
                      <span>Geolocation is not supported by your browser.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Destination */}
              <div>
                <div className="safar-planner-section-title">
                  <label htmlFor="destination" className="safar-planner-label">
                    Where do you want to go?
                  </label>
                  <span className="safar-planner-label-hint">Required</span>
                </div>
                <div className="safar-planner-input-wrap">
                  <span className="safar-planner-input-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <input
                    id="destination"
                    type="text"
                    className={`safar-planner-input ${errors.destination ? "input-error" : ""}`}
                    placeholder="City, destination or region"
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      if (errors.destination) {
                        setErrors((prev) => ({ ...prev, destination: "" }));
                      }
                    }}
                    autoComplete="off"
                  />
                </div>
                {errors.destination && (
                  <span className="safar-planner-field-error">
                    {errors.destination}
                  </span>
                )}
              </div>

              {/* 5. Duration */}
              <div>
                <div className="safar-planner-section-title">
                  <label className="safar-planner-label">How long?</label>
                  <span className="safar-planner-label-hint">Single select</span>
                </div>
                <div className="safar-planner-duration-group" role="radiogroup" aria-label="How long?">
                  {DURATION_OPTIONS.map((item) => {
                    const isSelected = duration === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        className={`safar-planner-duration-pill ${isSelected ? "is-active" : ""}`}
                        onClick={() => {
                          setDuration(item);
                          if (errors.duration) {
                            setErrors((prev) => ({ ...prev, duration: "" }));
                          }
                        }}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
                {errors.duration && (
                  <span className="safar-planner-field-error">
                    {errors.duration}
                  </span>
                )}
              </div>

              {/* 6. Budget */}
              <div>
                <div className="safar-planner-section-title">
                  <label htmlFor="budget" className="safar-planner-label">
                    What&apos;s your budget?
                  </label>
                  <span className="safar-planner-label-hint">INR</span>
                </div>
                <div className="safar-planner-input-wrap">
                  <span className="safar-planner-currency-symbol">₹</span>
                  <input
                    id="budget"
                    type="text"
                    inputMode="numeric"
                    className={`safar-planner-input safar-planner-currency-input ${errors.budget ? "input-error" : ""}`}
                    placeholder="5,000"
                    value={budget}
                    onChange={handleBudgetChange}
                  />
                </div>
                {errors.budget && (
                  <span className="safar-planner-field-error">
                    {errors.budget}
                  </span>
                )}
              </div>

              {/* 7. Interests */}
              <div>
                <div className="safar-planner-section-title">
                  <label className="safar-planner-label">What are you interested in?</label>
                  <span className="safar-planner-label-hint">Select multiple</span>
                </div>
                <div className="safar-planner-chips-wrap">
                  {INTEREST_OPTIONS.map((item) => {
                    const isSelected = selectedInterests.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        className={`safar-planner-chip ${isSelected ? "is-active" : ""}`}
                        onClick={() => toggleInterest(item)}
                        aria-pressed={isSelected}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
                {errors.interests && (
                  <span className="safar-planner-field-error">
                    {errors.interests}
                  </span>
                )}
              </div>

              {/* 8. Travel Mood */}
              <div>
                <div className="safar-planner-section-title">
                  <label className="safar-planner-label">How do you want the trip to feel?</label>
                  <span className="safar-planner-label-hint">Single select</span>
                </div>
                <div className="safar-planner-card-options-3col" role="radiogroup" aria-label="How do you want the trip to feel?">
                  {MOOD_OPTIONS.map((opt) => {
                    const isSelected = mood === opt.label;
                    return (
                      <div
                        key={opt.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        className={`safar-planner-option-card ${isSelected ? "is-active" : ""}`}
                        onClick={() => {
                          setMood(opt.label);
                          if (errors.mood) {
                            setErrors((prev) => ({ ...prev, mood: "" }));
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            setMood(opt.label);
                          }
                        }}
                      >
                        <div className="safar-planner-option-radio">
                          <span className={`safar-radio-circle ${isSelected ? "is-checked" : ""}`} />
                          <span className="safar-planner-option-title">{opt.label}</span>
                        </div>
                        <span className="safar-planner-option-desc">{opt.desc}</span>
                      </div>
                    );
                  })}
                </div>
                {errors.mood && (
                  <span className="safar-planner-field-error">
                    {errors.mood}
                  </span>
                )}
              </div>

              {/* 9. Transport */}
              <div>
                <div className="safar-planner-section-title">
                  <label className="safar-planner-label">Preferred way to get around</label>
                  <span className="safar-planner-label-hint">Single select</span>
                </div>
                <div className="safar-planner-card-options-3col" role="radiogroup" aria-label="Preferred way to get around">
                  {TRANSPORT_OPTIONS.map((opt) => {
                    const isSelected = transport === opt.label;
                    return (
                      <div
                        key={opt.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        className={`safar-planner-option-card ${isSelected ? "is-active" : ""}`}
                        onClick={() => {
                          setTransport(opt.label);
                          if (errors.transport) {
                            setErrors((prev) => ({ ...prev, transport: "" }));
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            setTransport(opt.label);
                          }
                        }}
                      >
                        <div className="safar-planner-option-radio">
                          <span className={`safar-radio-circle ${isSelected ? "is-checked" : ""}`} />
                          <span className="safar-planner-option-title">{opt.label}</span>
                        </div>
                        <span className="safar-planner-option-desc">{opt.desc}</span>
                      </div>
                    );
                  })}
                </div>
                {errors.transport && (
                  <span className="safar-planner-field-error">
                    {errors.transport}
                  </span>
                )}
              </div>

              {/* 10. Primary CTA */}
              <div className="pt-2">
                <button type="submit" className="safar-planner-cta-btn">
                  <span>Create My SAFAR →</span>
                </button>
              </div>
            </form>
          ) : (
            /* ====================================================
               CONFIRMATION STATE
               ==================================================== */
            <div className="safar-planner-confirm-wrap">
              <div className="safar-planner-confirm-badge" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h2 className="safar-planner-confirm-heading">
                Your preferences are ready.
              </h2>

              <p className="safar-planner-confirm-subheading">
                Next, SAFAR will build your personalized journey.
              </p>

              <div className="safar-planner-summary-card">
                <div className="safar-planner-summary-card-top">
                  <span className="safar-planner-summary-header">
                    TRIP PREFERENCES
                  </span>
                  <span className="safar-planner-summary-badge">
                    Draft Itinerary
                  </span>
                </div>

                <div className="safar-planner-summary-grid">
                  <div className="safar-planner-summary-item">
                    <span className="safar-planner-summary-item-label">Location status</span>
                    <span className="safar-planner-summary-item-value">
                      {geoStatus === "detected"
                        ? "Location detected"
                        : geoStatus === "detecting"
                          ? "Detecting location..."
                          : "Location access unavailable"}
                    </span>
                  </div>

                  <div className="safar-planner-summary-item">
                    <span className="safar-planner-summary-item-label">Destination</span>
                    <span className="safar-planner-summary-item-value">{destination}</span>
                  </div>

                  <div className="safar-planner-summary-item">
                    <span className="safar-planner-summary-item-label">Duration</span>
                    <span className="safar-planner-summary-item-value">{duration}</span>
                  </div>

                  <div className="safar-planner-summary-item">
                    <span className="safar-planner-summary-item-label">Budget</span>
                    <span className="safar-planner-summary-item-value">₹{budget}</span>
                  </div>

                  <div className="safar-planner-summary-item">
                    <span className="safar-planner-summary-item-label">Mood</span>
                    <span className="safar-planner-summary-item-value">{mood}</span>
                  </div>

                  <div className="safar-planner-summary-item">
                    <span className="safar-planner-summary-item-label">Transport</span>
                    <span className="safar-planner-summary-item-value">{transport}</span>
                  </div>
                </div>

                <div className="safar-planner-summary-item pt-3 border-t border-[#e8e2d5]">
                  <span className="safar-planner-summary-item-label">Interests</span>
                  <div className="safar-planner-summary-chips">
                    {selectedInterests.map((interest) => (
                      <span key={interest} className="safar-planner-summary-chip">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="safar-planner-confirm-actions">
                <button
                  type="button"
                  onClick={handleEditPreferences}
                  className="safar-planner-btn-secondary"
                >
                  Edit Preferences
                </button>
                <Link href="/" className="safar-planner-btn-back">
                  ← Back to SAFAR
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="safar-planner-footer">
        © {new Date().getFullYear()} SAFAR • Travel Fair. Go Together. Stay Safe.
      </footer>
    </div>
  );
}

