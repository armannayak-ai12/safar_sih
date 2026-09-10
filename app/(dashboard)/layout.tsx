import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email ||
    "User";

  const avatar =
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture;

  return (
    <>
      <Navbar
        user={{
          name,
          email: user.email,
          avatar,
        }}
      />

      <main>{children}</main>
    </>
  );
}