"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const signup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) return alert(error.message)

    router.push("/places")
  }

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-bold">Sign Up</h1>

      <input
        placeholder="Email"
        className="border p-2 w-full"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        onChange={e => setPassword(e.target.value)}
      />

      <button
        onClick={signup}
        className="bg-black text-white px-4 py-2 w-full"
      >
        Create Account
      </button>
    </div>
  )
}
