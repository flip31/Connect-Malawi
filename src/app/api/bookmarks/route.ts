import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
  const { placeId, userId } = await req.json()

  if (!userId || !placeId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: existing, error: checkError } = await supabaseAdmin
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("item_id", placeId)
    .eq("item_type", "place")
    .maybeSingle()

  if (checkError) {
    console.error("CHECK ERROR:", checkError)
    return NextResponse.json({ error: checkError.message }, { status: 500 })
  }

  if (existing) {
    const { error: deleteError } = await supabaseAdmin
      .from("bookmarks")
      .delete()
      .eq("id", existing.id)

    if (deleteError) {
      console.error("DELETE ERROR:", deleteError)
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    return NextResponse.json({ bookmarked: false })
  }

  const { error: insertError } = await supabaseAdmin
    .from("bookmarks")
    .insert({
      user_id: userId,
      item_id: placeId,
      item_type: "place",
    })

  if (insertError) {
    console.error("INSERT ERROR:", insertError)
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ bookmarked: true })
}
