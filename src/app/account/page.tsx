import { supabase } from "@/lib/supabaseClient"
import { redirect } from "next/navigation"
import { User, Heart, Bookmark, MapPin } from "lucide-react"
import Navigation from "@/app/components/navigation"

export default async function AccountPage() {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login?redirect=/account')
  }

  const userId = session.user.id

  const { count: likesCount } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  const { count: bookmarksCount } = await supabase
    .from('bookmarks')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-red-700 to-green-700 text-white">
        <Navigation />

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <User className="w-12 h-12" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">My Account</h1>
              <p className="text-gray-100">{session.user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <a
            href="/likes"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-red-200"
          >
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{likesCount || 0}</p>
                <p className="text-gray-600 text-sm">Liked Places</p>
              </div>
            </div>
          </a>

          <a
            href="/bookmarks"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-green-200"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Bookmark className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{bookmarksCount || 0}</p>
                <p className="text-gray-600 text-sm">Bookmarks</p>
              </div>
            </div>
          </a>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-gray-600 text-sm">Places Visited</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Details</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-lg text-gray-900 mt-1">{session.user.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">User ID</label>
              <p className="text-sm text-gray-500 mt-1 font-mono">{session.user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
