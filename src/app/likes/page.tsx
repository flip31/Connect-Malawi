import { supabase } from "@/lib/supabaseClient"
import PlaceCard from "@/app/components/PlaceCard"
import { Heart } from "lucide-react"
import { redirect } from "next/navigation"

export default async function LikesPage() {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?redirect=/likes")
  }

  const userId = session.user.id

  const { data: likes } = await supabase
    .from("likes")
    .select(`
      id,
      place_id,
      places (
        id,
        name,
        region,
        description,
        image_url,
        category
      )
    `)
    .eq("user_id", userId)

  const likedPlaces = likes?.map(like => like.places).filter(Boolean) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Heart className="w-10 h-10" fill="white" />
            <div>
              <h1 className="text-4xl font-bold">Liked Places</h1>
              <p className="text-red-100 mt-2">
                {likedPlaces.length} places you love ❤️
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {likedPlaces.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No liked places yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start exploring and like your favorite destinations!
            </p>

            <a
              href="/places"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md"
            >
              Explore Places
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedPlaces.map((place: any) => (
              <PlaceCard
                key={place.id}
                id={place.id}
                name={place.name}
                region={place.region}
                description={place.description}
                image_url={place.image_url}
                category={place.category}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
