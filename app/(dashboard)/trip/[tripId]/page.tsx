import SafarSafeView from "@/components/safar-safe-view";

interface TripPageProps {
  params: Promise<{
    tripId: string;
  }>;
}

export default async function TripPage({ params }: TripPageProps) {
  const { tripId } = await params;

  return <SafarSafeView tripId={tripId} />;
}

