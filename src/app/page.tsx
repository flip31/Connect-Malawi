'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Shield, Hotel } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* ================= HERO SECTION (NO SCROLL) ================= */}
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
          <nav className="flex items-center justify-between px-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 relative">
                <Image
                  src="/welcoming/malawi-flag.webp"
                  alt="Malawi Flag"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className="text-white text-xl font-light tracking-widest">
                Connect Malawi
              </span>
            </div>

            <a href="#contact" className="text-white text-lg">
              Contact Us
            </a>
          </nav>

          {/* Hero Text */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="text-white text-5xl font-bold mb-4 tracking-widest">
              Hello Malawi
            </h1>

            <p className="text-white/40 text-2xl font-light mb-8">
              Explore, learn, and experience the <br />
              Warm Heart of Africa.
            </p>

            {/* Search */}
            <div className="relative w-[420px]">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything"
                className="w-full px-7 py-3 rounded-full bg-white/25 backdrop-blur border border-white/40 text-white placeholder-white/70 focus:outline-none"
              />

              <button className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-white"
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

        {/* SVG WAVE */}
        <div className="absolute bottom-[0px] left-0 w-full z-20 pointer-events-none">
          <svg
            viewBox="0 0 1920 240"
            preserveAspectRatio="none"
            className="w-full h-[400px]"
          >
            <path
              d="
                M0,130
                C120,40 260,190 400,110
                C520,170 660,30 780,120
                C900,60 1040,210 1160,140
                C1280,50 1400,180 1520,90
                C1640,200 1760,70 1880,120
                C1910,110 1920,115 1920,115
                L1920,240
                L0,240
                Z
              "
              fill="#E6E6E6"
            />
          </svg>
        </div>

        {/* ICON LINKS */}
        <div className="absolute bottom-0 w-full bg-#E6E6E6 z-30 py-6">
          <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 text-center">
            <IconLink href="/places" icon={MapPin} label="Places" />
            <IconLink href="/history" icon={Clock} label="History" />
            <IconLink href="/culture" icon={Shield} label="Culture" />
            <IconLink href="/hotels" icon={Hotel} label="Hotels & Accommodation" />
          </div>
        </div>
      </div>

      {/* EXPLORE MALAWI SECTION  */}
      <section className="min-h-screen bg-[#E6E6E6] flex items-center">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Explore Malawi
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed">
              Malawi is a peaceful, landlocked country in southern Africa,
              known as the <strong>Warm Heart of Africa</strong> for its
              friendly people and rich culture. From the crystal-clear
              waters of Lake Malawi to the dramatic peaks of Mount Mulanje,
              the country offers breathtaking landscapes, vibrant traditions,
              and unforgettable experiences.
            </p>
          </div>

          {/* Image */}
          <div className="relative h-[420px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/welcoming/lake-malawi.jpg"
              alt="Lake Malawi"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* ================= ICON COMPONENT ================= */
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
      <div className="w-18 h-18 bg-white rounded-full shadow-md flex items-center justify-center mb-3 group-hover:scale-110 transition">
        <Icon className="w-9 h-9 text-gray-800" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">
        {label}
      </h3>
    </Link>
  );
}
