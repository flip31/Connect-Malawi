// app/components/placeActions.tsx
"use client"

import { Heart, Bookmark } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

interface PlaceActionsProps {
  placeId: string
}

export default function PlaceActions({ placeId }: PlaceActionsProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // Check if place is liked
        const { data: likeData } = await supabase
          .from('likes')
          .select('*')
          .eq('user_id', user.id)
          .eq('place_id', placeId)
          .single()
        
        setIsLiked(!!likeData)

        // Check if place is bookmarked
        const { data: bookmarkData } = await supabase
          .from('bookmarks')
          .select('*')
          .eq('user_id', user.id)
          .eq('place_id', placeId)
          .single()
        
        setIsBookmarked(!!bookmarkData)
      }
    }

    checkUser()
  }, [placeId])

  const handleLike = async () => {
    // Check if user is logged in
    if (!user) {
      router.push('/login?redirect=/places')
      return
    }

    if (isLiked) {
      // Unlike
      await supabase
        .from('likes')
        .delete()
        .eq('user_id', user.id)
        .eq('place_id', placeId)
      setIsLiked(false)
    } else {
      // Like
      await supabase
        .from('likes')
        .insert({ user_id: user.id, place_id: placeId })
      setIsLiked(true)
    }
  }

  const handleBookmark = async () => {
    // Check if user is logged in
    if (!user) {
      router.push('/login?redirect=/places')
      return
    }

    if (isBookmarked) {
      // Remove bookmark
      await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('place_id', placeId)
      setIsBookmarked(false)
    } else {
      // Add bookmark
      await supabase
        .from('bookmarks')
        .insert({ user_id: user.id, place_id: placeId })
      setIsBookmarked(true)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLike}
        className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
          isLiked 
            ? 'bg-red-50 text-red-600' 
            : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
        }`}
        aria-label={isLiked ? "Unlike" : "Like"}
      >
        <Heart 
          className={`w-5 h-5 transition-all ${
            isLiked ? 'fill-red-600' : 'group-hover:scale-110'
          }`}
          strokeWidth={2}
        />
      </button>

      <button
        onClick={handleBookmark}
        className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
          isBookmarked 
            ? 'bg-green-50 text-green-700' 
            : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'
        }`}
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
      >
        <Bookmark 
          className={`w-5 h-5 transition-all ${
            isBookmarked ? 'fill-green-700' : 'group-hover:scale-110'
          }`}
          strokeWidth={2}
        />
      </button>
    </div>
  )
}