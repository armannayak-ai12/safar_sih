import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

// Clean inline SVG icons
const RupeeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="m6 13 8.5 8" />
    <path d="M6 13h3a4 4 0 0 0 0-8" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default async function DashboardPage() {
  // Initialize the Supabase server client
  const supabase = await createClient();

  // Securely fetch the user from the server
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Safety net: redirect to login if no user is found
  if (error || !user) {
    redirect("/login");
  }

  // Extract user display name
  const fullName = user.user_metadata?.full_name || "Explorer";

  return (
    <div className="dashboard-canvas max-w-5xl mx-auto flex flex-col gap-4 sm:gap-5">
      {/* 1. GREETING */}
      <header className="pt-0.5 pb-2">
        <p className="text-[11px] font-bold tracking-[0.16em] text-[#e85b2a] uppercase">
          GOOD EVENING, {fullName}
        </p>
        <h1
          className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-[#10231c] dark:text-[#f8f4ec] mt-1 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Ready for your next SAFAR?
        </h1>
        <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-1">
          Plan smarter, pay fair, travel together and stay safe.
        </p>
      </header>

      {/* 2. PRIMARY PLAN MY SAFAR HERO (DOMINANT CENTERPIECE) */}
      <section className="bg-white dark:bg-[#16281f] rounded-2xl border border-[#e8e2d5] dark:border-[#274539] shadow-xs overflow-hidden flex flex-col md:flex-row items-stretch">
        <div className="p-6 sm:p-7 md:p-8 flex-1 flex flex-col justify-between z-10">
          <div>
            <span className="text-[11px] font-bold tracking-[0.16em] text-[#e85b2a] uppercase">
              PLAN YOUR JOURNEY
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-[30px] font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight mt-1.5 leading-snug"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Where will SAFAR take you next?
            </h2>
            <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-2 max-w-md leading-relaxed">
              Build a journey around your time, budget, interests and travel style.
            </p>
          </div>

          <div className="mt-5">
            <Link
              href="/suggestor"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e85b2a] hover:bg-[#d14d1e] text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-200 shadow-xs hover:translate-x-0.5"
            >
              <span>Plan My SAFAR</span>
              <ArrowRight />
            </Link>
          </div>
        </div>

        <div className="relative w-full md:w-[46%] h-48 md:h-auto min-h-[190px] overflow-hidden">
          <Image
            src="/safar-jaipur-hero.png"
            alt="Jaipur, Rajasthan"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 46vw"
            className="object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white dark:from-[#16281f] via-transparent to-transparent opacity-90 md:opacity-75" />
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/45 backdrop-blur-xs text-[11px] font-medium text-white/95 border border-white/20">
            Jaipur, Rajasthan
          </div>
        </div>
      </section>

      {/* 3. SUPPORTING ACTIONS (TRAVEL TOOLS — EXACTLY TWO CARDS) */}
      <section>
        <h3 className="text-[11px] font-bold tracking-[0.14em] text-[#52635a] dark:text-[#9db0a6] uppercase mb-3">
          TRAVEL TOOLS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CARD 1: PAY FAIR */}
          <div className="bg-white dark:bg-[#16281f] rounded-2xl p-5 sm:p-6 border border-[#e8e2d5] dark:border-[#274539] shadow-xs hover:border-[#e85b2a]/50 hover:shadow-sm transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#fdf3ee] dark:bg-[#e85b2a]/15 text-[#e85b2a] flex items-center justify-center">
                  <RupeeIcon />
                </div>
                <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider">
                  Fare Guidance
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight uppercase mt-3.5">
                PAY FAIR
              </h4>
              <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-1 leading-relaxed">
                Know what your ride should cost before you pay.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-[#f0ebe0] dark:border-[#274539] flex items-center justify-between">
              <Link
                href="/fair-fare"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#e85b2a] hover:text-[#d14d1e] transition-colors"
              >
                <span>Check fare</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <span className="text-[11px] text-[#8a9990] font-medium hidden sm:inline">
                Auto • Cab • Transit
              </span>
            </div>
          </div>

          {/* CARD 2: GO TOGETHER */}
          <div className="bg-white dark:bg-[#16281f] rounded-2xl p-5 sm:p-6 border border-[#e8e2d5] dark:border-[#274539] shadow-xs hover:border-[#e85b2a]/50 hover:shadow-sm transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#edf5f1] dark:bg-[#1c342a] text-[#1c4837] dark:text-[#9fc7b6] flex items-center justify-center">
                  <UsersIcon />
                </div>
                <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider">
                  Shared Journeys
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight uppercase mt-3.5">
                GO TOGETHER
              </h4>
              <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-1 leading-relaxed">
                Find travellers heading your way.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-[#f0ebe0] dark:border-[#274539] flex items-center justify-between">
              <Link
                href="/partner-finder"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#e85b2a] hover:text-[#d14d1e] transition-colors"
              >
                <span>Find travellers</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <span className="text-[11px] text-[#8a9990] font-medium hidden sm:inline">
                Split costs • Verified partners
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SAFAR SAFE STRIP */}
      <section className="bg-white dark:bg-[#16281f] rounded-xl p-3.5 sm:px-5 sm:py-3.5 border border-[#e8e2d5] dark:border-[#274539] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#10231c]/5 dark:bg-white/5 text-[#10231c] dark:text-[#f8f4ec] flex items-center justify-center flex-shrink-0">
            <ShieldIcon />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-[#10231c] dark:text-[#f8f4ec] uppercase">
                SAFAR SAFE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs text-[#52635a] dark:text-[#9db0a6] mt-0.5">
              Safety tools are ready whenever you&apos;re on the move.
            </p>
          </div>
        </div>

        <Link
          href="/trip"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#eee9df] dark:bg-[#1c342a] hover:bg-[#10231c] dark:hover:bg-[#f8f4ec] hover:text-white dark:hover:text-[#10231c] text-[#10231c] dark:text-[#f8f4ec] text-xs font-semibold rounded-lg transition-all self-start sm:self-auto flex-shrink-0"
        >
          <span>Open safety</span>
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}