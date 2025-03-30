import Library from "@/components/Library";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const search = await searchParams;

  console.log({ search });

  return (
    <main className="min-h-screen bg-gray-50 mx-auto">
      <Library />
    </main>
  );
}
