import { supabaseAdmin } from "@/lib/supabaseAdmin"
import HistoryClient from "@/app/history/HistoryCLient"

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const resolvedParams = await searchParams;
  const searchTerm = resolvedParams?.search || "";

  // Fetch the data from your Supabase 'history' table
  const { data: historyItems, error } = await supabaseAdmin
    .from("history")
    .select("*")
    .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("History Fetch Error:", error);
  }

  // Pass the data into your UI component
  return (
    <HistoryClient 
      historyItems={historyItems || []} 
      searchTerm={searchTerm} 
    />
  );
}