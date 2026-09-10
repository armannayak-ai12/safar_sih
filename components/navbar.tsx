"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle"; // Adjust the path if needed

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

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side: Brand & Links */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="font-bold text-xl tracking-tight text-blue-600 dark:text-blue-500">
            SAFAR
          </Link>
          
          <nav className="hidden md:flex gap-4">
            <Link href="/trip" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
              Trips
            </Link>
            <Link href="/fair-fare" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
              Fair Fare
            </Link>
            <Link href="/partner-finder" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
              Find Partners
            </Link>
          </nav>
        </div>

        {/* Right Side: Theme, Profile & Logout */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="hidden sm:flex items-center gap-3 border-l border-gray-200 dark:border-gray-800 pl-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {user.name || user.email}
            </span>
            
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full border border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 font-semibold text-xs">
                  {(user.name || user.email || "?").charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <button 
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 ml-2 px-3 py-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}