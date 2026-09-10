"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

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
    <nav>
      <div>
        <strong>SAFAR</strong>
      </div>

      <div>
        {user.avatar && (
          <img
            src={user.avatar}
            alt="Profile"
            width={32}
            height={32}
          />
        )}

        <span>{user.name || user.email}</span>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}