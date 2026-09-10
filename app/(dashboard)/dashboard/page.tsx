import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

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

  // Extract Google OAuth metadata (Google stores DP in avatar_url or picture)
  const fullName = user.user_metadata?.full_name || "Explorer";
  const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        
        {/* User Profile Header */}
        <header className="flex items-center gap-6 p-6 mb-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Profile Picture"
              width={72}
              height={72}
              className="rounded-full border-2 border-gray-100 shadow-sm"
              priority
            />
          ) : (
            <div className="w-[72px] h-[72px] bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500 font-semibold text-xl">
                {fullName.charAt(0)}
              </span>
            </div>
          )}
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {fullName}!
            </h1>
            <p className="text-gray-500 mt-1">{user.email}</p>
          </div>
        </header>

        {/* Dashboard Content Area */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 h-40">
             <h2 className="font-semibold text-gray-700">Upcoming Trips</h2>
             {/* Your trip components will go here */}
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 h-40">
             <h2 className="font-semibold text-gray-700">Recent Activity</h2>
             {/* Your activity components will go here */}
          </div>
        </section>

      </div>
    </main>
  );
}