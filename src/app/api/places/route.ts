import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
  const body = await req.json()

  const { name, description, region } = body

  if (!name || !description || !region) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    )
  }

  const { error } = await supabaseAdmin
    .from("places")
    .insert([{ name, description, region }])

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
