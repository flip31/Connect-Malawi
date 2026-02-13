"use client"

import { User, Heart, Bookmark, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Navigation() {
  const [user, setUser] = useState<any>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    setShowDropdown(false)
  }

  return (
    <nav className="flex items-center justify-between px-12 py-6">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 relative">
          <Image
            src="/welcoming/malawi-flag.webp"
            alt="Malawi Flag"
            fill
            className="object-contain rounded-full"
          />
        </div>
        <a
          href="/"
          className="text-white text-[26px] font-normal tracking-wide drop-shadow-lg"
        >
          Connect Malawi
        </a>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="/"
          className="text-white hover:text-gray-200 transition-colors drop-shadow-lg"
        >
          Home
        </a>
        <a
          href="/places"
          className="text-white hover:text-gray-200 transition-colors drop-shadow-lg"
        >
          Places
        </a>
        <a
          href="#contact"
          className="text-white hover:text-gray-200 transition-colors drop-shadow-lg"
        >
          Contact Us
        </a>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-full transition-all border border-white/30"
            >
              <User className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">Account</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                <div className="bg-gradient-to-r from-red-600 to-green-600 px-4 py-3">
                  <p className="text-white text-sm font-medium truncate">
                    {user.email}
                  </p>
                </div>

                <div className="py-2">
                  <a
                    href="/account"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">My Profile</span>
                  </a>

                  <a
                    href="/likes"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Heart className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700">Liked Places</span>
                  </a>

                  <a
                    href="/bookmarks"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Bookmark className="w-5 h-5 text-green-700" />
                    <span className="text-gray-700">Bookmarks</span>
                  </a>

                  <div className="border-t border-gray-200 my-2" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span className="text-red-600 font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <a
            href="/login"
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 px-6 py-2 rounded-full font-semibold transition-all shadow-lg"
          >
            <User className="w-5 h-5" />
            <span>Login</span>
          </a>
        )}
      </div>
    </nav>
  )
}
