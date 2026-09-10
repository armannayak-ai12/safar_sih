import { cookies } from "next/headers";

export interface User {
  id: string;
  name: string;
  email: string;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("safar_session")?.value;

  if (!session) {
    return null;
  }

  return {
    id: "demo-user",
    name: "SAFAR Traveler",
    email: "traveler@safar.internal",
  };
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return Boolean(user);
}
