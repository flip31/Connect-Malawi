// app/places/page.tsx
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import PlaceCard from "@/app/components/PlaceCard"
import { Search, Filter, MapPin, Sparkles } from "lucide-react"

export const revalidate = 0

export default async function PlacesPage() {
  const { data: places, error } = await supabaseAdmin
    .from("places")
    .select("*")
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching places:", error)
  }

  const placesCount = places?.length || 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header - Malawian Flag Colors */}
      <div className="relative bg-gradient-to-r from-black via-red-700 to-green-700 text-white overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>

        {/* Malawian Flag Stripe Pattern */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-black via-red-600 to-green-600"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-red-100 text-sm mb-6">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span className="text-white font-medium">Places</span>
          </div>

          {/* Header Content */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl border border-white/30">
                  <MapPin className="w-8 h-8" strokeWidth={2} />
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-medium text-red-100">
                    {placesCount} Amazing Destinations
                  </span>
                </div>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight">
                Explore Malawi
              </h1>
              <p className="text-xl text-gray-100 max-w-2xl leading-relaxed">
                Discover the breathtaking beauty of the Warm Heart of Africa
              </p>
            </div>

            {/* Stats Card - Malawian Colors */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[200px]">
              <div className="text-4xl font-bold mb-1">{placesCount}</div>
              <div className="text-red-100 text-sm">Places to Explore</div>
              <div className="mt-3 h-1 bg-gradient-to-r from-red-500 to-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search places..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                aria-label="Search places"
              />
            </div>

            {/* Filter Button - Malawian Accent */}
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {error ? (
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-xl shadow-sm">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 rounded-full p-2">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-red-800 text-lg">Failed to load places</p>
                <p className="text-red-600 mt-1">{error.message}</p>
                <button className="mt-4 text-sm text-red-700 hover:text-red-800 font-medium underline">
                  Try again
                </button>
              </div>
            </div>
          </div>
        ) : !places || places.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-red-100 to-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-12 h-12 text-red-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No places found</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We're working on adding amazing destinations for you to explore. Check back soon!
              </p>
              <a 
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <span>Back to Home</span>
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-red-600">{placesCount}</span> places
              </p>
              <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500">
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>A-Z</option>
              </select>
            </div>

            {/* Places Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {places.map(place => (
                <PlaceCard
                  key={place.id}
                  id={place.id}
                  name={place.name}
                  region={place.region}
                  description={place.description}
                  image_url={place.image_url}
                  category={place.category}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}