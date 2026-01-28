"use client"  

import PlaceActions from "@/app/components/placeActions"

interface PlaceCardProps {
  id: string
  name: string
  region: string
  description: string
}

export default function PlaceCard({ id, name, region, description }: PlaceCardProps) {

  return (
    <div className="border border-red-500 p-4 rounded-lg shadow my-2 ">
      <h2 className="font-bold font-red-500">{name}</h2>
      <p className="text-green-300">{region}</p>
      <p>{description}</p>
      <PlaceActions placeId={id} />
      <div></div>
    </div>
  )
}
