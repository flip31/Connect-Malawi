"use client"  

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

interface PlaceCardProps {
  id: string
  name: string
  region: string
  description: string
}

export default function PlaceCard({ id, name, region, description }: PlaceCardProps) {
  const [liked, setLiked] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user?.id ?? null)
    })
  }, [])

  const handleLike = async () => {
    if (!userId) return alert("Login to like!")
    const res = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placeId: id, userId }),
    })
    const data = await res.json()
    if (data.success) setLiked(true)
    else alert(data.error)
  }

  return (
    <div className="border border-blue-500 p-4 rounded shadow my-2 ">
      <h2 className="font-bold font-red-500">{name}</h2>
      <p>{region}</p>
      <p>{description}</p>
      <button
        className={`mt-2 px-4 py-2 rounded bg-red-700 ${liked ? "bg-red-500 text-white" : "bg-gray-200"}`}
        onClick={handleLike}
      >
        {liked ? "Liked ❤️" : "Like ♡"}
      </button>
    </div>
  )
}
