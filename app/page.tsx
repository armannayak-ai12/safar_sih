"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState, useRef } from "react";

// Minimal SVG icons
const SearchIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4.35-4.35" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="m11 18-6-6 6-6" />
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

// Four Minimal Circular Icons for Benefits
const CompassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const RupeeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="m6 13 8.5 8" />
    <path d="M6 13h3a4 4 0 0 0 0-8" />
  </svg>
);

const PartnersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const destinations = [
  {
    num: "01",
    tag: "FEATURED DESTINATION",
    title: "Jaipur, Rajasthan",
    desc: "Colour, craft & royal stories",
    badge: "✓ Fair fare guidance",
    image: "/safar-jaipur-hero.png",
  },
  {
    num: "02",
    tag: "FEATURED DESTINATION",
    title: "Udaipur, Rajasthan",
    desc: "Lakes, Mewar heritage & tranquil waters",
    badge: "✓ Verified partner matches",
    image: "/safar-jaipur-hero.png",
  },
  {
    num: "03",
    tag: "FEATURED DESTINATION",
    title: "Varanasi, Uttar Pradesh",
    desc: "Ancient ghats, evening Aarti & silk traditions",
    badge: "✓ Fair fare guidance",
    image: "/safar-jaipur-hero.png",
  },
  {
    num: "04",
    tag: "FEATURED DESTINATION",
    title: "Manali, Himachal Pradesh",
    desc: "Snow peaks, cedar valleys & quiet mountain trails",
    badge: "✓ Ride safety monitoring",
    image: "/safar-jaipur-hero.png",
  },
];

const benefits = [
  {
    titleLine1: "Personalized",
    titleLine2: "Itineraries",
    icon: CompassIcon,
  },
  {
    titleLine1: "Fair Fare",
    titleLine2: "Guidance",
    icon: RupeeIcon,
  },
  {
    titleLine1: "Verified",
    titleLine2: "Partners",
    icon: PartnersIcon,
  },
  {
    titleLine1: "Safer",
    titleLine2: "Travel",
    icon: ShieldIcon,
  },
];

export default function Home() {
  const [idea, setIdea] = useState("");
  const [isAsked, setIsAsked] = useState(false);
  const [destIndex, setDestIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsLoggedIn(document.cookie.split("; ").some((row) => row.startsWith("safar_session=")));
  }, []);

  // Preserved auth routing
  const planHref = isLoggedIn ? "/suggestor" : "/login?next=/suggestor";
  const authHref = isLoggedIn ? "/suggestor" : "/login";

  const examples = [
    "A weekend trip near me",
    "3 days of food and culture",
    "A peaceful mountain escape",
  ];

  const handleAsk = (e: FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      setIsAsked(true);
    }
  };

  const handleExampleClick = (example: string) => {
    setIdea(example);
    setIsAsked(true);
  };

  const prevDest = () => {
    setDestIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1));
  };

  const nextDest = () => {
    setDestIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1));
  };

  const scrollToSearch = () => {
    const el = document.getElementById("search-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 400);
    }
  };

  const currentDest = destinations[destIndex];

  return (
    <main className="safar-unified-hero">
      {/* 1. PHOTOGRAPH VISUAL LAYER (Integrated background extending across right ~58% of hero) */}
      <div className="safar-hero-photo-layer" aria-label="Hero Destination Image">
        <div className="safar-hero-photo-inner">
          <Image
            src={currentDest.image}
            alt="Jaipur Rajasthan at sunset with Hawa Mahal"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 60vw"
            className="safar-hero-photo-img"
          />
        </div>
        {/* Soft cream horizontal blend overlay - invisible edge transition */}
        <div className="safar-hero-photo-cream-blend" />
        {/* Subtle top tint for navbar legibility */}
        <div className="safar-hero-photo-top-tint" />
        {/* Bottom vignette for destination overlay contrast */}
        <div className="safar-hero-photo-bottom-vignette" />

        {/* Floating Fair Fare Badge (Upper Right of Image) */}
        <div className="safar-fare-badge-floating">
          {currentDest.badge}
        </div>

        {/* Destination Information sitting DIRECTLY OVER THE IMAGE */}
        <div id="destinations" className="safar-dest-overlay-direct">
          <span className="safar-dest-tag">{currentDest.tag}</span>
          <h2 className="safar-dest-title">{currentDest.title}</h2>
          <p className="safar-dest-desc">{currentDest.desc}</p>

          <div className="safar-dest-controls">
            <button
              type="button"
              onClick={prevDest}
              className="safar-circle-control-btn"
              aria-label="Previous destination"
            >
              <ArrowLeft />
            </button>
            <span className="safar-dest-counter">
              {currentDest.num} / 04
            </span>
            <button
              type="button"
              onClick={nextDest}
              className="safar-circle-control-btn"
              aria-label="Next destination"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* 2. NAVBAR (Integrated inside the same hero, transparent background) */}
      <header className="safar-hero-nav">
        <div className="safar-nav-left">
          <Link href="/" className="safar-nav-brand">
            <Image
              src="/safar-logo.jpeg"
              alt="SAFAR logo"
              width={38}
              height={38}
              className="safar-nav-brand-logo"
              priority
            />
            <span className="safar-nav-brand-name">SAFAR</span>
          </Link>
          <span className="safar-nav-tagline">Explore • Plan • Travel Safely</span>
        </div>

        <ul className={`safar-nav-center ${mobileOpen ? "mobile-open" : ""}`}>
          <li><Link href="/" onClick={() => setMobileOpen(false)}>Home</Link></li>
          <li><a href="#about" onClick={() => setMobileOpen(false)}>About</a></li>
          <li><a href="#features" onClick={() => setMobileOpen(false)}>Features</a></li>
          <li><a href="#destinations" onClick={() => setMobileOpen(false)}>Destinations</a></li>
          <li><a href="#how" onClick={() => setMobileOpen(false)}>How It Works</a></li>
          <li><a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a></li>
        </ul>

        <div className="safar-nav-right">
          <button type="button" className="safar-theme-toggle" aria-label="Toggle Theme">
            <SunIcon />
          </button>
          <Link href={authHref} className="safar-signin-link">
            {isLoggedIn ? "Dashboard" : "Sign In"}
          </Link>
          <Link href="/register" className="safar-getstarted-btn">
            Get Started
          </Link>
          <button
            type="button"
            className="safar-nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {/* 3. HERO BODY (One unified canvas) */}
      <div className="safar-hero-body">
        {/* LEFT HERO CONTENT */}
        <div className="safar-hero-content-col">
          <div id="about" className="safar-hero-text-block">
            <span className="safar-eyebrow">
              EXPLORE • PLAN • TRAVEL • SAFELY
            </span>

            <h1 className="safar-headline">
              Your Next Journey,<br />
              <span className="safar-orange-highlight">Smarter</span> with SAFAR
            </h1>

            <p className="safar-supporting-copy">
              Personalized itineraries, fair fare guidance, verified partners,
              and real-time safety support — all in one place.
            </p>

            {/* AI SEARCH CARD (Overlaps cream / image transition) */}
            <div id="how" className="safar-search-card-anchor">
              <div id="search-card" className="safar-search-card" aria-label="AI Travel Assistant">
                <form onSubmit={handleAsk}>
                  <div className="safar-search-input-row">
                    <SearchIcon />
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="safar-search-input"
                      value={idea}
                      onChange={(e) => {
                        setIdea(e.target.value);
                        setIsAsked(false);
                      }}
                      placeholder="What's on your mind?"
                      aria-label="What's on your mind?"
                    />
                    <button type="submit" className="safar-btn-ask">
                      Ask SAFAR →
                    </button>
                  </div>
                </form>

                {isAsked && (
                  <div className="safar-ai-response">
                    <p>
                      <strong>Great choice.</strong> We&apos;ll shape a customized SAFAR plan around &ldquo;{idea || "your trip"}&rdquo;.
                    </p>
                    <Link href={planHref}>
                      Start planning <ArrowRight />
                    </Link>
                  </div>
                )}

                <div className="safar-search-divider" />

                <div className="safar-search-suggestions">
                  <span className="safar-suggestion-label">Try an idea:</span>
                  {examples.map((example) => (
                    <button
                      key={example}
                      type="button"
                      className="safar-pill-btn"
                      onClick={() => handleExampleClick(example)}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 COMPACT INLINE BENEFITS */}
            <div id="features" className="safar-benefits-row">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.titleLine1} className="safar-benefit-item">
                    <div className="safar-benefit-icon-circle">
                      <Icon />
                    </div>
                    <div className="safar-benefit-text">
                      <div>{benefit.titleLine1}</div>
                      <div>{benefit.titleLine2}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LOWER-LEFT LABEL */}
          <div id="contact" className="safar-hero-bottom-label">
            — TRAVEL MORE • WORRY LESS
          </div>
        </div>
      </div>

      {/* FLOATING AI BUTTON */}
      <button
        type="button"
        onClick={scrollToSearch}
        className="safar-floating-assistant-btn"
        aria-label="Ask SAFAR AI Assistant"
      >
        <span className="safar-assistant-dot" />
        <span>✦ Ask SAFAR</span>
      </button>
    </main>
  );
}
