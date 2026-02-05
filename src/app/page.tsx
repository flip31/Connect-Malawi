'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Shield, Hotel } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Tour places data
  const tourPlaces = [
    {
      id: 1,
      image: '/welcoming/Lake-Malawi-Blue-Zebra-islands-scaled.jpg',
      title: 'Lake Malawi',
      description: 'Crystal clear waters',
    },
    {
      id: 2,
      image: '/welcoming/MT MULANJE.png',
      title: 'Mount Mulanje',
      description: 'Dramatic peaks',
    },
    {
      id: 3,
      image: '/welcoming/Liwonde-National-Park-2-scaled.jpg',
      title: 'Liwonde National Park',
      description: 'Wildlife safari',
    },
    {
      id: 4,
      image: '/welcoming/zomba plateu.png',
      title: 'Zomba Plateau',
      description: 'Mountain retreat',
    },
  ];

  return (
    <div className="relative">
      {/* FIRST SECTION - Hero */}
      <div className="h-screen w-full relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/welcoming/MT MULANJE.png"
            alt="Malawi landscape"
            fill
            className="object-cover"
            priority
          /> 
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Content */}
        <div className="relative z-30 h-[70%] flex flex-col">
          {/* Navigation */}
          <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-14 sm:h-14 relative">
                <Image
                  src="/welcoming/malawi-flag.webp"
                  alt="Malawi Flag"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className="text-white text-sm sm:text-base font-light tracking-widest">
                Connect Malawi
              </span>
            </div>

            <a href="#contact" className="text-white text-sm sm:text-base hover:underline">
              Contact Us
            </a>
          </nav>

          {/* Hero Text */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <h1 data-aos='zoom-in' className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-widest">
              Hello Malawi
            </h1>

            <p data-aos='zoom-in' className="text-white/40 text-base sm:text-lg md:text-xl font-light mb-8">
              Explore, learn, and experience the <br />
              Warm Heart of Africa.
            </p>

            {/* Search */}
            <div data-aos='zoom-in' className="relative w-full max-w-[420px] px-4 sm:px-0">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything"
                className="w-full px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white/25 backdrop-blur border border-white/40 text-white placeholder-white/70 focus:outline-none text-sm sm:text-base"
              />

              <button className="absolute right-6 sm:right-4 top-1/2 -translate-y-1/2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ICON LINKS */}
        <div className="absolute bottom-0 w-full py-4 sm:py-6 z-30">
          <div data-aos="fade-up" className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center px-4">
            <IconLink data-aos='zoom-in-up' href="/places" icon={MapPin} label="Places" />
            <IconLink data-aos='zoom-in-up' href="/history" icon={Clock} label="History" />
            <IconLink data-aos='zoom-in-up' href="/culture" icon={Shield} label="Culture" />
            <IconLink data-aos='zoom-in-up' href="/hotels" icon={Hotel} label="Hotels & Accommodation" />
          </div>
        </div>
      </div>

      {/* SECOND SECTION - Explore Malawi */}
      <section className="min-h-screen bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 grid md:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
          {/* Text Content */}
          <div data-aos="fade-right" className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Explore Malawi
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Malawi is a peaceful, landlocked country in southern Africa,
              known as the <span className="text-yellow-400 font-semibold">Warm Heart of Africa</span> for its
              friendly people and rich culture. From the crystal-clear
              waters of Lake Malawi to the dramatic peaks of Mount Mulanje,
              the country offers breathtaking landscapes, vibrant traditions,
              and unforgettable experiences.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-xs sm:text-sm text-gray-400">Bird Species</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">365</div>
                <div className="text-xs sm:text-sm text-gray-400">Days of Sunshine</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-full font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300"
              >
                Discover More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div data-aos="fade-left" className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-green-500/30 blur-2xl rounded-xl"></div>
            
            {/* Main image container */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl group">
              <Image
                src="/welcoming/mw.svg"
                alt="Malawi Map"
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-110 filter brightness-110 p-4"
              />
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating location badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2 animate-pulse">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-gray-800">Southern Africa</span>
              </div>

              {/* Fun fact tooltip*/}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <p className="text-xs sm:text-sm text-white">
                  🌟 <span className="font-semibold">Did you know?</span> Lake Malawi contains more fish species than any other lake in the world!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THIRD SECTION - Popular Tours */}
      <section className="min-h-screen bg-[#1a1a2e] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 relative z-20">
          <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Popular Tours
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Discover the best experiences Malawi has to offer
            </p>
          </div>

          {/* Tour Cards Grid*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up">
            {tourPlaces.map((place) => (
              <div key={place.id} className="group cursor-pointer">
                <div className="relative h-[280px] sm:h-[320px] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={place.image}
                    alt={place.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{place.title}</h3>
                    <p className="text-sm text-gray-300">{place.description}</p>
                  </div>
                </div>
                <button className="text-white text-sm uppercase tracking-wider hover:text-gray-300 transition">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ICON COMPONENT  */
function IconLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <Link href={href} className="flex flex-col items-center group">
      <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 bg-white/25 backdrop-blur rounded-full shadow-md flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition">
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-white" strokeWidth={1.5} />
      </div>
      <span className="text-sm sm:text-base lg:text-lg font-semibold text-white">
        {label}
      </span>
    </Link>
  );
}