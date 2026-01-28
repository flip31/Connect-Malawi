import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
  const { placeId, userId } = await req.json()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if already bookmarked
  const { data: existing } = await supabaseAdmin
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("place_id", placeId)
    .single()

  // If exists → remove (toggle off)
  if (existing) {
    await supabaseAdmin
      .from("bookmarks")
      .delete()
      .eq("id", existing.id)

    return NextResponse.json({ bookmarked: false })
  }

  // Else → insert
  await supabaseAdmin.from("bookmarks").insert({
    user_id: userId,
    place_id: placeId,
  })

  return NextResponse.json({ bookmarked: true })
}
