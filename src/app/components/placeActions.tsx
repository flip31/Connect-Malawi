"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function PlaceActions({ placeId }: { placeId: string }) {
  const [userId, setUserId] = useState<string | null>(null)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user
      if (!user) return

      setUserId(user.id)

      // Check LIKE
      const { data: like } = await supabase
        .from("likes")
        .select("id")
        .eq("user_id", user.id)
        .eq("place_id", placeId)
        .single()

      setLiked(!!like)

      // Check BOOKMARK
      const { data: bookmark } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", user.id)
        .eq("place_id", placeId)
        .single()

      setBookmarked(!!bookmark)
    })
  }, [placeId])

  const toggleBookmark = async () => {
    if (!userId) return alert("Login to save places")

    const res = await fetch("/api/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placeId, userId }),
    })

    const data = await res.json()
    setBookmarked(data.bookmarked)
  }

  return (
    <div className="flex gap-3 mt-3">
      <button
        className={`px-3 py-1 rounded ${
          liked ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
      >
        {liked ? "Liked ❤️" : "Like ♡"}
      </button>

      <button
        onClick={toggleBookmark}
        className={`px-3 py-1 rounded ${
          bookmarked ? "bg-yellow-500 text-white" : "bg-gray-200"
        }`}
      >
        {bookmarked ? "Saved 🔖" : "Bookmark"}
      </button>
    </div>
  )
}
