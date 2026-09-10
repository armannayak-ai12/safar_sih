"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavbarProps {
  user: {
    email?: string;
    name?: string;
    avatar?: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const supabase = createClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Trips", href: "/trip" },
    { label: "Plan My SAFAR", href: "/suggestor" },
    { label: "Fair Fare", href: "/fair-fare" },
    { label: "Go Together", href: "/partner-finder" },
  ];

  return (
    <header className="bg-white dark:bg-[#10231c] border-b border-[#e8e2d5] dark:border-[#274539] sticky top-0 z-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Left Side: Brand & Desktop Links */}
        <div className="flex items-center gap-8">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 font-black text-xl tracking-tight text-[#10231c] dark:text-[#f8f4ec] hover:text-[#e85b2a] dark:hover:text-[#e85b2a] transition-colors"
          >
            <Image
              src="/safar-logo.jpeg"
              alt="SAFAR Logo"
              width={30}
              height={30}
              className="rounded-lg object-cover shadow-2xs"
            />
            <span>SAFAR</span>
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#52635a] hover:text-[#e85b2a] dark:text-[#9db0a6] dark:hover:text-[#f8f4ec] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side: Theme, Profile, Logout & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Desktop User Info */}
          <div className="hidden sm:flex items-center gap-3 border-l border-[#e8e2d5] dark:border-[#274539] pl-3.5">
            <span className="text-xs font-semibold text-[#10231c] dark:text-[#f8f4ec] max-w-[140px] truncate">
              {user.name || user.email}
            </span>

            {user.avatar ? (
              <Image
                src={user.avatar}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full border border-[#e8e2d5] dark:border-[#274539] object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-[#eee9df] dark:bg-[#1c342a] rounded-full flex items-center justify-center">
                <span className="text-[#10231c] dark:text-[#f8f4ec] font-bold text-xs">
                  {(user.name || user.email || "?").charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Logout Button */}
          <button
            onClick={handleLogout}
            className="hidden sm:inline-flex text-xs font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 ml-1 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            Logout
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#10231c] dark:text-[#f8f4ec] hover:bg-[#eee9df]/50 dark:hover:bg-[#1c342a] transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Drawer / Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e8e2d5] dark:border-[#274539] bg-[#fffefa] dark:bg-[#10231c] px-4 py-4 shadow-md transition-all">
          {/* User Preview on Mobile */}
          <div className="flex items-center gap-3 pb-3 mb-3 border-b border-[#e8e2d5] dark:border-[#274539]">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full border border-[#e8e2d5] dark:border-[#274539] object-cover"
              />
            ) : (
              <div className="w-9 h-9 bg-[#eee9df] dark:bg-[#1c342a] rounded-full flex items-center justify-center">
                <span className="text-[#10231c] dark:text-[#f8f4ec] font-bold text-xs">
                  {(user.name || user.email || "?").charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec] truncate">
                {user.name || "SAFAR Traveler"}
              </div>
              <div className="text-[11px] text-[#52635a] dark:text-[#9db0a6] truncate">
                {user.email}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-[#10231c] dark:text-[#f8f4ec] hover:text-[#e85b2a] hover:bg-[#eee9df]/40 dark:hover:bg-[#1c342a] rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Logout Action */}
          <div className="mt-3 pt-3 border-t border-[#e8e2d5] dark:border-[#274539]">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}