// app/components/PlaceCard.tsx
"use client"

import { MapPin, ArrowRight } from "lucide-react"
import PlaceActions from "@/app/components/placeActions"
import Image from "next/image"
import { useState } from "react"

interface PlaceCardProps {
  id: string
  name: string
  region: string
  description: string
  image_url?: string
  category?: string
}

export default function PlaceCard({ 
  id, 
  name, 
  region, 
  description, 
  image_url,
  category 
}: PlaceCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-56 bg-gradient-to-br from-red-500 via-black to-green-600 overflow-hidden">
        {image_url && !imageError ? (
          <Image
            src={image_url}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-16 h-16 text-white/40" strokeWidth={1.5} />
          </div>
        )}
        
        {/* Category Badge - Malawian Flag Colors */}
        {category && (
          <div className="absolute top-4 right-4">
            <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-red-700 shadow-lg border border-red-200">
              {category}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Malawian Flag Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black via-red-600 to-green-600"></div>
      </div>

      {/* Content Section - Grows to fill space */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Region */}
        <div className="flex items-center gap-2 text-sm text-red-600 mb-3">
          <MapPin className="w-4 h-4" strokeWidth={2} />
          <span className="font-medium">{region}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
          {name}
        </h2>

        {/* Description - Grows to push buttons down */}
        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Bottom Section - Always at bottom */}
        <div className="mt-auto space-y-4">
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          
          {/* Actions Row */}
          <div className="flex items-center justify-between gap-3">
            <PlaceActions placeId={id} />
            
            <button 
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm group/btn transition-all"
              aria-label={`Learn more about ${name}`}
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Hover Effect Border - Malawian Colors */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-red-400/50 transition-all pointer-events-none"></div>
    </div>
  )
}