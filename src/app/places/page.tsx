import PlaceCard from "../components/PlaceCard"
import { supabase } from "@/lib/supabaseClient"

export default async function PlacesPage() {
  const { data: places } = await supabase.from("places").select("*")

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
      {places?.map(place => (
        <PlaceCard
          key={place.id}
          id={place.id}
          name={place.name}
          region={place.region} 
          description={place.description}
        />
      ))}
    </div>
  )
}
