interface TripPageProps {
  params: Promise<{
    tripId: string;
  }>;
}

export default async function TripPage({ params }: TripPageProps) {
  const { tripId } = await params;

  return (
    <main>
      <h1>Trip</h1>
      <p>Trip ID: {tripId}</p>
      <button>SOS</button>
    </main>
  );
}
