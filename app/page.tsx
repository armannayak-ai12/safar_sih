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
    <main className="safar-landing-page">
      {/* ====================================================
          SECTION 1: HERO (Preserved 100% intact)
          ==================================================== */}
      <section className="safar-unified-hero">
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
          <div className="safar-dest-overlay-direct">
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
            <li><a href="#why" onClick={() => setMobileOpen(false)}>Why SAFAR</a></li>
            <li><a href="#features" onClick={() => setMobileOpen(false)}>Features</a></li>
            <li><a href="#how" onClick={() => setMobileOpen(false)}>How It Works</a></li>
            <li><a href="#destinations" onClick={() => setMobileOpen(false)}>Destinations</a></li>
            <li><a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a></li>
          </ul>

          <div className="safar-nav-right">
            <button type="button" className="safar-theme-toggle" aria-label="Toggle Theme">
              <SunIcon />
            </button>
            <Link href={authHref} className="safar-signin-link">
              {isLoggedIn ? "Dashboard" : "Sign In"}
            </Link>
            <Link href="/login" className="safar-getstarted-btn">
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
            <div className="safar-hero-text-block">
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
              <div className="safar-search-card-anchor">
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
              <div className="safar-benefits-row">
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
            <div className="safar-hero-bottom-label">
              — TRAVEL MORE • WORRY LESS
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 2: WHY SAFAR (COMPACT CORE VALUE)
          ==================================================== */}
      <section id="why" className="safar-section-why">
        <div className="safar-section-container">
          <div className="safar-why-header-row">
            <div className="safar-why-intro">
              <span className="safar-section-eyebrow">WHY SAFAR</span>
              <h2 className="safar-section-title">Travel more. Worry less.</h2>
              <p className="safar-section-lead">
                SAFAR brings smarter planning, fair travel, companionship and safety into one simple journey.
              </p>
            </div>
          </div>

          <div className="safar-why-benefits-grid">
            <div className="safar-why-benefit-card">
              <div className="safar-benefit-badge-icon">✦</div>
              <h4>PLAN SMARTER</h4>
              <p>Personalized trips</p>
            </div>

            <div className="safar-why-benefit-card">
              <div className="safar-benefit-badge-icon">₹</div>
              <h4>PAY FAIR</h4>
              <p>Fare guidance</p>
            </div>

            <div className="safar-why-benefit-card">
              <div className="safar-benefit-badge-icon">🤝</div>
              <h4>GO TOGETHER</h4>
              <p>Shared travel</p>
            </div>

            <div className="safar-why-benefit-card">
              <div className="safar-benefit-badge-icon">🛡️</div>
              <h4>STAY SAFE</h4>
              <p>Trip safety</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 3: CORE FEATURES
          ==================================================== */}
      <section id="features" className="safar-section-features">
        <div className="safar-section-container">
          <span className="safar-section-eyebrow">CORE CAPABILITIES</span>
          <h2 className="safar-section-title">Everything you need for a smarter SAFAR.</h2>
          <p className="safar-section-lead">
            Four focused tools designed to make every step of your journey effortless and secure.
          </p>

          <div className="safar-features-grid">
            <div className="safar-feature-card">
              <div className="safar-feature-top">
                <div className="safar-feature-icon-box">
                  <CompassIcon />
                </div>
                <div className="safar-feature-info">
                  <h3>Plan My SAFAR</h3>
                  <p>Plan around your time, budget and interests.</p>
                </div>
              </div>
              <div className="safar-feature-action">
                <Link href={planHref} className="safar-feature-link">
                  Plan your trip <ArrowRight />
                </Link>
              </div>
            </div>

            <div className="safar-feature-card">
              <div className="safar-feature-top">
                <div className="safar-feature-icon-box">
                  <RupeeIcon />
                </div>
                <div className="safar-feature-info">
                  <h3>Fair Fare</h3>
                  <p>Know the expected fare before you travel.</p>
                </div>
              </div>
              <div className="safar-feature-action">
                <Link href="/fair-fare" className="safar-feature-link">
                  Check fare guidance <ArrowRight />
                </Link>
              </div>
            </div>

            <div className="safar-feature-card">
              <div className="safar-feature-top">
                <div className="safar-feature-icon-box">
                  <PartnersIcon />
                </div>
                <div className="safar-feature-info">
                  <h3>Travel Together</h3>
                  <p>Find compatible travellers and shared rides.</p>
                </div>
              </div>
              <div className="safar-feature-action">
                <Link href="/partner-finder" className="safar-feature-link">
                  Find travel partners <ArrowRight />
                </Link>
              </div>
            </div>

            <div className="safar-feature-card">
              <div className="safar-feature-top">
                <div className="safar-feature-icon-box">
                  <ShieldIcon />
                </div>
                <div className="safar-feature-info">
                  <h3>SAFAR Safe</h3>
                  <p>Stay connected throughout your journey.</p>
                </div>
              </div>
              <div className="safar-feature-action">
                <Link href="/trip/active" className="safar-feature-link">
                  Explore safety tools <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 4: HOW IT WORKS
          ==================================================== */}
      <section id="how" className="safar-section-how">
        <div className="safar-section-container">
          <span className="safar-section-eyebrow">SIMPLE PROCESS</span>
          <h2 className="safar-section-title">Your SAFAR in four steps.</h2>
          <p className="safar-section-lead">
            From your first idea to reaching your destination safely.
          </p>

          <div className="safar-how-timeline">
            <div className="safar-how-step-card">
              <span className="safar-how-step-num">01</span>
              <h4>TELL US</h4>
              <p>Location, time, budget &amp; interests</p>
            </div>

            <div className="safar-how-step-card">
              <span className="safar-how-step-num">02</span>
              <h4>GET YOUR PLAN</h4>
              <p>A personalized travel plan</p>
            </div>

            <div className="safar-how-step-card">
              <span className="safar-how-step-num">03</span>
              <h4>GET THERE</h4>
              <p>Fair fares &amp; shared travel</p>
            </div>

            <div className="safar-how-step-card">
              <span className="safar-how-step-num">04</span>
              <h4>STAY SAFE</h4>
              <p>Track your journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 5: DESTINATIONS / DISCOVER
          ==================================================== */}
      <section id="destinations" className="safar-section-destinations">
        <div className="safar-section-container">
          <span className="safar-section-eyebrow">DISCOVER INDIA</span>
          <h2 className="safar-section-title">Go where your curiosity takes you.</h2>
          <p className="safar-section-lead">
            Authentic experiences crafted around cultural heritage, scenic landscapes, and local warmth.
          </p>

          <div className="safar-destinations-grid">
            <div className="safar-dest-photo-card">
              <Image
                src="/safar-jaipur-hero.png"
                alt="Jaipur, Rajasthan"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="safar-dest-bg-img"
              />
              <div className="safar-dest-gradient-overlay" />
              <div className="safar-dest-card-content">
                <h3>Jaipur</h3>
                <p>Colour, craft &amp; royal stories</p>
              </div>
            </div>

            <div className="safar-dest-photo-card">
              <Image
                src="/safar-jaipur-hero.png"
                alt="Udaipur, Rajasthan"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="safar-dest-bg-img"
                style={{ filter: "hue-rotate(20deg) saturate(1.1)" }}
              />
              <div className="safar-dest-gradient-overlay" />
              <div className="safar-dest-card-content">
                <h3>Udaipur</h3>
                <p>Lakes, Mewar heritage &amp; tranquil waters</p>
              </div>
            </div>

            <div className="safar-dest-photo-card">
              <Image
                src="/safar-jaipur-hero.png"
                alt="Rishikesh, Uttarakhand"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="safar-dest-bg-img"
                style={{ filter: "hue-rotate(140deg) saturate(0.9)" }}
              />
              <div className="safar-dest-gradient-overlay" />
              <div className="safar-dest-card-content">
                <h3>Rishikesh</h3>
                <p>Himalayan foothills &amp; peaceful river trails</p>
              </div>
            </div>

            <div className="safar-dest-photo-card">
              <Image
                src="/safar-jaipur-hero.png"
                alt="Varanasi, Uttar Pradesh"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="safar-dest-bg-img"
                style={{ filter: "sepia(0.3) saturate(1.2)" }}
              />
              <div className="safar-dest-gradient-overlay" />
              <div className="safar-dest-card-content">
                <h3>Varanasi</h3>
                <p>Ancient ghats, evening Aarti &amp; silk traditions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 6: IMPACT
          ==================================================== */}
      <section id="impact" className="safar-section-impact">
        <div className="safar-section-container">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="safar-section-eyebrow">OUR COMMITMENT</span>
            <h2 className="safar-section-title" style={{ marginBottom: 8 }}>Better journeys. Better tourism.</h2>
            <p className="safar-section-lead" style={{ margin: "0 auto" }}>
              Creating positive change for travellers, local businesses, and host communities across India.
            </p>
          </div>

          <div className="safar-impact-ribbon">
            <div className="safar-impact-item">
              <span className="safar-impact-icon">💰</span>
              <span>Cost Saving</span>
            </div>

            <div className="safar-impact-item">
              <span className="safar-impact-icon">🧭</span>
              <span>Personalization</span>
            </div>

            <div className="safar-impact-item">
              <span className="safar-impact-icon">♿</span>
              <span>Accessibility</span>
            </div>

            <div className="safar-impact-item">
              <span className="safar-impact-icon">🤝</span>
              <span>Social Travel</span>
            </div>

            <div className="safar-impact-item">
              <span className="safar-impact-icon">🛡️</span>
              <span>Safety</span>
            </div>

            <div className="safar-impact-item">
              <span className="safar-impact-icon">🌱</span>
              <span>Smarter Tourism</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 7: FINAL CTA
          ==================================================== */}
      <section id="cta" className="safar-section-cta">
        <div className="safar-cta-box">
          <span className="safar-section-eyebrow" style={{ color: "#ffd899" }}>START YOUR SAFAR</span>
          <h2>Where will your curiosity take you next?</h2>
          <p>Plan smarter. Travel fair. Go together. Stay safe.</p>
          <Link href={planHref} className="safar-btn-cta-main">
            Plan my SAFAR <ArrowRight />
          </Link>
        </div>
      </section>

      {/* ====================================================
          SECTION 8: MINIMAL FOOTER
          ==================================================== */}
      <footer id="contact" className="safar-footer-minimal">
        <div className="safar-section-container">
          <div className="safar-footer-row">
            <div className="safar-footer-brand">
              <h4>SAFAR</h4>
              <p style={{ color: "#e5ece8", fontWeight: 700, marginBottom: 8 }}>
                Travel Fair. Go Together. Stay Safe.
              </p>
              <p>
                An intelligent Indian travel companion for personalized exploration, fair transit guidance, and connected safety.
              </p>
            </div>

            <div className="safar-footer-links">
              <h5>Explore</h5>
              <ul>
                <li><a href="#destinations">Destinations</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#how">How It Works</a></li>
              </ul>
            </div>

            <div className="safar-footer-links">
              <h5>SAFAR</h5>
              <ul>
                <li><Link href={planHref}>Plan My SAFAR</Link></li>
                <li><Link href="/fair-fare">Fair Fare</Link></li>
                <li><Link href="/partner-finder">Travel Together</Link></li>
                <li><Link href="/trip/active">SAFAR Safe</Link></li>
              </ul>
            </div>

            <div className="safar-footer-links">
              <h5>Contact &amp; Legal</h5>
              <ul>
                <li><Link href="/login">Sign In</Link></li>
                <li><Link href="/login">Get Started</Link></li>
                <li><a href="#why">Privacy &amp; Safety</a></li>
                <li><a href="mailto:support@safar.in">support@safar.in</a></li>
              </ul>
            </div>
          </div>

          <div className="safar-footer-bottom-bar">
            <div>© {new Date().getFullYear()} SAFAR. Built for Smart India Hackathon. All rights reserved.</div>
            <div>Travel Responsibly • Support Local Heritage</div>
          </div>
        </div>
      </footer>

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
