import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma"; // Adjust import to your prisma instance

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  // 1. Exchange OAuth code for a session
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/login?error=auth`);
  }

  const user = data.user;
  const fullName = user.user_metadata?.full_name || "Explorer";
  const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || "";

  // 2. Sync user to your Prisma Database
  try {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        name: fullName,
        avatarUrl: avatarUrl,
      },
      create: {
        id: user.id,
        email: user.email!,
        name: fullName,
        avatarUrl: avatarUrl,
      },
    });
  } catch (dbError) {
    console.error("Database sync failed:", dbError);
    // You can choose to redirect to an error page here if critical
  }

  // 3. Save quick-access UI data to cookies
  // Storing these allows you to show the name/avatar instantly on the client side 
  // without needing a database fetch on every page load.
  cookieStore.set("safar_user_name", fullName, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: "lax",
  });

  if (avatarUrl) {
    cookieStore.set("safar_user_avatar", avatarUrl, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
    });
  }

  // 4. Redirect to the intended destination
  return NextResponse.redirect(`${origin}${next}`);
}