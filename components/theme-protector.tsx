"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Add 'default' here
export default function ThemeProtector() {
  const pathname = usePathname();

  useEffect(() => {
    const isDashboardRoute =
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/trip") ||
      pathname.startsWith("/fair-fare") ||
      pathname.startsWith("/partner-finder") ||
      pathname.startsWith("/suggestor");

    if (!isDashboardRoute) {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, [pathname]);

  return null;
}