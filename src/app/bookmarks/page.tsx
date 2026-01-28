import { supabase } from "@/lib/supabaseClient"
import PlaceCard from "@/app/components/PlaceCard"

export default async function BookmarksPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return <p className="p-6">Please login to see your bookmarks.</p>
  }

  const userId = session.user.id

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("place_id, places(*)")
    .eq("user_id", userId)

  if (!bookmarks || bookmarks.length === 0) {
    return <p className="p-6">No saved places yet 🔖</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {bookmarks.map(b => {
        const place = b.places?.[0] 

        if (!place) return null

        return (
          <PlaceCard
            key={place.id}
            id={place.id}
            name={place.name}
            region={place.region}
            description={place.description}
          />
        )
      })}
    </div>
  )
}
