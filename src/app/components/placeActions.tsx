// app/components/placeActions.tsx
"use client"

import { Heart, Bookmark, Loader2 } from "lucide-react"
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
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<'like' | 'bookmark' | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkUserAndStatus()
  }, [placeId])

  const checkUserAndStatus = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // Check like status
        const { data: likeData } = await supabase
          .from('likes')
          .select('id')
          .eq('user_id', user.id)
          .eq('place_id', placeId)
          .maybeSingle()
        
        setIsLiked(!!likeData)

        // Check bookmark status
        const { data: bookmarkData } = await supabase
          .from('bookmarks')
          .select('id')
          .eq('user_id', user.id)
          .eq('place_id', placeId)
          .maybeSingle()
        
        setIsBookmarked(!!bookmarkData)
      }
    } catch (error) {
      console.error("Error checking user status:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    // Check if user is logged in
    if (!user) {
      router.push('/login?redirect=/places')
      return
    }

    try {
      setActionLoading('like')
      
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', user.id)
          .eq('place_id', placeId)

        if (error) throw error
        setIsLiked(false)
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({ user_id: user.id, place_id: placeId })

        if (error) throw error
        setIsLiked(true)
      }
    } catch (error: any) {
      console.error("Like error:", error)
      alert(error.message || "Failed to update like")
    } finally {
      setActionLoading(null)
    }
  }

  const handleBookmark = async () => {
    // Check if user is logged in
    if (!user) {
      router.push('/login?redirect=/places')
      return
    }

    try {
      setActionLoading('bookmark')

      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('place_id', placeId)

        if (error) throw error
        setIsBookmarked(false)
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('bookmarks')
          .insert({ user_id: user.id, place_id: placeId })

        if (error) throw error
        setIsBookmarked(true)
      }
    } catch (error: any) {
      console.error("Bookmark error:", error)
      alert(error.message || "Failed to update bookmark")
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLike}
        disabled={actionLoading === 'like'}
        className={`group flex items-center justify-center w-10 h-10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
          isLiked 
            ? 'bg-red-50 text-red-600' 
            : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
        }`}
        aria-label={isLiked ? "Unlike" : "Like"}
      >
        {actionLoading === 'like' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Heart 
            className={`w-5 h-5 transition-all ${
              isLiked ? 'fill-red-600' : 'group-hover:scale-110'
            }`}
            strokeWidth={2}
          />
        )}
      </button>

      <button
        onClick={handleBookmark}
        disabled={actionLoading === 'bookmark'}
        className={`group flex items-center justify-center w-10 h-10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
          isBookmarked 
            ? 'bg-green-50 text-green-700' 
            : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'
        }`}
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
      >
        {actionLoading === 'bookmark' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Bookmark 
            className={`w-5 h-5 transition-all ${
              isBookmarked ? 'fill-green-700' : 'group-hover:scale-110'
            }`}
            strokeWidth={2}
          />
        )}
      </button>
    </div>
  )
}