"use client";

import { useState } from "react";

const quickActions = [
  {
    title: "Fair Fare",
    description: "Check if you're being overcharged",
    icon: "₹",
    href: "#fair-fare",
  },
  {
    title: "AI Suggestor",
    description: "Discover places made for you",
    icon: "✦",
    href: "#suggestor",
  },
  {
    title: "Partner Finder",
    description: "Find trusted local services",
    icon: "♧",
    href: "#partners",
  },
  {
    title: "Live Trip",
    description: "Track your journey safely",
    icon: "⌖",
    href: "#live-trip",
  },
];

const recommendations = [
  {
    name: "Araku Valley",
    type: "Nature & Adventure",
    time: "Full day",
    rating: "4.8",
    emoji: "🏔️",
  },
  {
    name: "Borra Caves",
    type: "Adventure",
    time: "2–3 hours",
    rating: "4.7",
    emoji: "🪨",
  },
  {
    name: "RK Beach",
    type: "Beach & Relax",
    time: "2 hours",
    rating: "4.6",
    emoji: "🏖️",
  },
];

const partners = [
  {
    name: "Local Explorer",
    type: "Verified Guide",
    rating: "4.9",
    price: "₹800/day",
    emoji: "🧭",
  },
  {
    name: "CityRide",
    type: "Verified Transport",
    rating: "4.8",
    price: "From ₹12/km",
    emoji: "🚕",
  },
  {
    name: "TravelNest",
    type: "Verified Stay",
    rating: "4.7",
    price: "From ₹1,200",
    emoji: "🏨",
  },
];

export default function Home() {
  const [fare, setFare] = useState("");
  const [showFare, setShowFare] = useState(false);
  const [sos, setSos] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-slate-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#f7f7f4]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-lg font-bold text-white">
              S
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">SAFAR</h1>
              <p className="hidden text-[10px] font-medium uppercase tracking-widest text-slate-500 sm:block">
                Travel smarter
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#dashboard" className="text-slate-900">
              Dashboard
            </a>
            <a href="#fair-fare" className="text-slate-500 hover:text-slate-900">
              Fair Fare
            </a>
            <a href="#suggestor" className="text-slate-500 hover:text-slate-900">
              AI Suggestor
            </a>
            <a href="#partners" className="text-slate-500 hover:text-slate-900">
              Partners
            </a>
            <a href="#live-trip" className="text-slate-500 hover:text-slate-900">
              Live Trip
            </a>
          </div>

          <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium shadow-sm">
            <span>📍</span>
            <span className="hidden sm:inline">Vizag</span>
            <span className="text-slate-400">⌄</span>
          </button>
        </div>
      </nav>

      {/* HERO / DASHBOARD */}
      <section id="dashboard" className="mx-auto max-w-7xl px-5 pb-8 pt-8 lg:px-8 lg:pt-12">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl sm:p-10">
            <div className="mb-10 flex items-start justify-between">
              <div>
                <p className="mb-2 text-sm font-medium text-slate-400">
                  YOUR JOURNEY
                </p>
                <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-5xl">
                  Explore more.
                  <br />
                  Travel with confidence.
                </h2>
              </div>

              <div className="hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-right sm:block">
                <p className="text-xs text-slate-400">Trip status</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Active
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-slate-400">Destination</p>
                <p className="mt-1 font-semibold">Visakhapatnam</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-slate-400">Trip duration</p>
                <p className="mt-1 font-semibold">3 Days</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-slate-400">Travellers</p>
                <p className="mt-1 font-semibold">5 People</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">TODAY</p>
                <h3 className="mt-1 text-2xl font-bold">Your plan</h3>
              </div>
              <span className="text-3xl">☀️</span>
            </div>

            <div className="mt-7 space-y-4">
              <div className="flex gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-slate-950" />
                <div>
                  <p className="text-sm font-semibold">RK Beach</p>
                  <p className="text-xs text-slate-500">09:00 AM · Relax & explore</p>
                </div>
              </div>

              <div className="ml-1 h-6 border-l border-dashed border-slate-300" />

              <div className="flex gap-4">
                <div className="mt-1 h-3 w-3 rounded-full border-2 border-slate-950 bg-white" />
                <div>
                  <p className="text-sm font-semibold">Kailasagiri</p>
                  <p className="text-xs text-slate-500">02:00 PM · Viewpoint</p>
                </div>
              </div>

              <div className="ml-1 h-6 border-l border-dashed border-slate-300" />

              <div className="flex gap-4">
                <div className="mt-1 h-3 w-3 rounded-full border-2 border-slate-950 bg-white" />
                <div>
                  <p className="text-sm font-semibold">Tenneti Park</p>
                  <p className="text-xs text-slate-500">06:00 PM · Sunset</p>
                </div>
              </div>
            </div>

            <button className="mt-7 w-full rounded-xl bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              View full itinerary →
            </button>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            QUICK ACTIONS
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Everything you need, in one place.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl font-bold">
                  {item.icon}
                </div>

                <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-900">
                  →
                </span>
              </div>

              <h3 className="mt-5 font-bold">{item.title}</h3>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* FAIR FARE */}
      <section
        id="fair-fare"
        className="mx-auto max-w-7xl px-5 py-10 lg:px-8"
      >
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
          <div className="grid lg:grid-cols-2">
            <div className="bg-slate-100 p-7 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                FAIR FARE
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Know what a fair price looks like.
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
                Check transportation prices before you pay. SAFAR helps you
                understand whether a quoted fare is reasonable.
              </p>

              <div className="mt-8 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    From
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <span>📍</span>
                    <input
                      className="w-full bg-transparent text-sm outline-none"
                      placeholder="Your current location"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    To
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <span>📍</span>
                    <input
                      className="w-full bg-transparent text-sm outline-none"
                      placeholder="Where are you going?"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Quoted fare
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <span>₹</span>
                    <input
                      value={fare}
                      onChange={(e) => setFare(e.target.value)}
                      type="number"
                      className="w-full bg-transparent text-sm outline-none"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setShowFare(true)}
                  className="w-full rounded-xl bg-slate-950 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Check Fair Fare
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10">
              {showFare ? (
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    ESTIMATED FAIR RANGE
                  </p>

                  <div className="mt-3 text-5xl font-bold">
                    ₹180–₹220
                  </div>

                  <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Your quoted fare
                      </span>
                      <span className="font-bold">
                        ₹{fare || "350"}
                      </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[82%] rounded-full bg-slate-900" />
                    </div>

                    <p className="mt-4 text-sm font-semibold">
                      ⚠️ This fare may be higher than expected.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowFare(false)}
                    className="mt-5 text-sm font-semibold underline"
                  >
                    Check another route
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-4xl">
                    ₹
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    No surprises. Just fair travel.
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                    Enter your route and quoted fare to get a simple,
                    easy-to-understand price comparison.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* AI SUGGESTOR */}
      <section
        id="suggestor"
        className="mx-auto max-w-7xl px-5 py-10 lg:px-8"
      >
        <div className="rounded-[2rem] bg-slate-950 p-7 text-white sm:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              AI SUGGESTOR
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              What do you feel like exploring?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Tell SAFAR what you enjoy and how much time you have. Get
              recommendations that fit your trip.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {["🏖️ Beaches", "🏔️ Adventure", "🍜 Local Food", "🏛️ Culture", "🌿 Nature"].map(
              (item) => (
                <button
                  key={item}
                  className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white hover:text-slate-950"
                >
                  {item}
                </button>
              )
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {recommendations.map((place) => (
              <div
                key={place.name}
                className="rounded-2xl bg-white p-5 text-slate-900"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{place.emoji}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                    ★ {place.rating}
                  </span>
                </div>

                <h3 className="mt-5 font-bold">{place.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{place.type}</p>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <span>⏱ {place.time}</span>
                  <button className="font-bold text-slate-900">Explore →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER FINDER */}
      <section
        id="partners"
        className="mx-auto max-w-7xl px-5 py-10 lg:px-8"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              PARTNER FINDER
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              Trusted people for your trip.
            </h2>
          </div>

          <button className="hidden text-sm font-bold underline sm:block">
            View all partners
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                  {partner.emoji}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{partner.name}</h3>
                    <span className="text-xs">✓</span>
                  </div>

                  <p className="text-sm text-slate-500">{partner.type}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-400">Rating</p>
                  <p className="mt-1 font-bold">★ {partner.rating}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">Price</p>
                  <p className="mt-1 font-bold">{partner.price}</p>
                </div>
              </div>

              <button className="mt-5 w-full rounded-xl border border-slate-200 py-3 text-sm font-bold transition hover:bg-slate-950 hover:text-white">
                View profile
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE TRIP */}
      <section
        id="live-trip"
        className="mx-auto max-w-7xl px-5 py-10 pb-20 lg:px-8"
      >
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
            <div className="relative min-h-[430px] overflow-hidden bg-slate-200">
              <div className="absolute inset-0 opacity-30">
                <div className="h-full w-full bg-[linear-gradient(90deg,transparent_49%,#64748b_50%,transparent_51%),linear-gradient(0deg,transparent_49%,#64748b_50%,transparent_51%)] bg-[size:80px_80px]" />
              </div>

              <div className="absolute left-[28%] top-[35%] flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 ring-8 ring-white/60">
                <span className="h-2 w-2 rounded-full bg-white" />
              </div>

              <div className="absolute left-[65%] top-[58%] flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 ring-8 ring-white/60">
                <span className="h-2 w-2 rounded-full bg-white" />
              </div>

              <div className="absolute left-[29%] top-[37%] h-[160px] w-[300px] rotate-[24deg] border-t-2 border-dashed border-slate-950" />

              <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold shadow-lg">
                ● LIVE TRIP
              </div>
            </div>

            <div className="p-7 sm:p-9">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                LIVE TRIP
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                You're on the way.
              </h2>

              <div className="mt-7 rounded-2xl bg-slate-100 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Current trip</span>
                  <span className="text-xs font-bold">28 min</span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-slate-950" />
                  <span className="text-sm font-semibold">Kailasagiri</span>
                </div>

                <div className="ml-1 my-2 h-8 border-l border-dashed border-slate-400" />

                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full border-2 border-slate-950 bg-white" />
                  <span className="text-sm font-semibold">Tenneti Park</span>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
                <span className="text-xl">🛡️</span>
                <div>
                  <p className="text-sm font-bold">Safety status</p>
                  <p className="text-xs text-slate-500">
                    Your trip is being monitored
                  </p>
                </div>
              </div>

              <button className="mt-5 w-full rounded-xl bg-slate-100 py-3 text-sm font-bold hover:bg-slate-200">
                View live trip
              </button>

              <button
                onClick={() => setSos(true)}
                className="mt-3 w-full rounded-xl bg-red-600 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-red-700"
              >
                🚨 SOS — Emergency Help
              </button>

              {sos && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
                  <p className="font-bold text-red-700">
                    Emergency assistance
                  </p>
                  <p className="mt-1 text-sm text-red-600">
                    SOS activated in demo mode. Connect this button to your
                    team's emergency service/API before production.
                  </p>

                  <button
                    onClick={() => setSos(false)}
                    className="mt-3 text-sm font-bold text-red-700 underline"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <span className="font-bold text-slate-900">SAFAR</span>
            <span className="ml-2">Smart, Affordable & Fair Assistance for Travelers</span>
          </div>

          <p>Built for Smart India Hackathon</p>
        </div>
      </footer>
    </main>
  );
}