import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LandingPage from "@/components/landing-page";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Logged-in users should not see the landing page
  if (user) {
    redirect("/dashboard");
  }

  return <LandingPage />;
}
