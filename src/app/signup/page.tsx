"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Mail, Lock } from "lucide-react"

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

  const signupWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/places`,
      },
    })

    if (error) alert(error.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">

        {/* Malawi Logo */}
        <div className="flex justify-center">
          <Image
            src="/welcoming/mw.svg"
            alt="Malawi Logo"
            width={80}
            height={80}
          />
        </div>

        <h1 className="text-2xl font-bold text-center text-red-600">
          Sign Up
        </h1>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="Email"
            className="border w-full pl-10 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="password"
            placeholder="Password"
            className="border w-full pl-10 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* Sign Up Button */}
        <button
          onClick={signup}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Create Account
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="flex-1" />
          <span className="text-sm text-gray-400">OR</span>
          <hr className="flex-1" />
        </div>

        {/* Google Sign Up */}
        <button
          onClick={signupWithGoogle}
          className="w-full border flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          <Image
            src="/welcoming/google.svg"
            alt="Google"
            width={18}
            height={18}
          />
          <span>Sign up with Google</span>
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
