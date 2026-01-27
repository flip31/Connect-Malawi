"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

interface HistoryCardProps {
  id: string
  title: string
  content: string
}

export default function HistoryCard({ id, title, content }: HistoryCardProps) {
  const [userId, setUserId] = useState<string | null>(null)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user?.id ?? null)
    })
  }, [])

  const handleBookmark = async () => {
    if (!userId) {
      alert("You must log in to bookmark!")
      return
    }

    const res = await fetch("/api/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: id, itemType: "history", userId }),
    })

    const data = await res.json()
    if (data.success) setBookmarked(true)
    else alert(data.error)
  }

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-600 mt-1">{content}</p>
      <button
        onClick={handleBookmark}
        className={`mt-3 px-4 py-2 rounded ${
          bookmarked ? "bg-green-500 text-white" : "bg-gray-200"
        }`}
      >
        {bookmarked ? "Bookmarked 🔖" : "Bookmark ♡"}
      </button>
    </div>
  )
}
