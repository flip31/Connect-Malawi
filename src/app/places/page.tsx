import { supabase } from "@/lib/supabase";

export const metadata = {
    title: "Place to visit malawi | Connect Malawi",
    description: "Explore the best tourist attractions in malawi"
}

export default async function PlacesPage () {
    const {data: places, error} = await supabase.from("places").select("*");
    if(error){
        return <p>failed to load places</p>
    }

    return(
    <section>
        <h1 className="text-4xl font-bold mb-6">Places to Visit in Malawi</h1>

        <div className="grid grid-row gap-4">
            {places.map(places=>(
                <div key={places.id} className="border rounded-lg p-4 shadow">
                    <h2>{places.name}</h2>
                    <p>{places.region}</p>
                    <p>{places.description}</p>
                </div>
            ))}
        </div>
    </section>
    )
}