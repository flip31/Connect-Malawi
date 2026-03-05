"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MapPin, Search, Sun } from "lucide-react"
import AccountDropdown from "@/app/components/AccountDropdown"
import SearchBar from "../components/searchBar"
import "@/app/styles/history.css"

interface HistoryItem {
  id: string
  title: string
  content: string
  year?: string | number
  image_url?: string
  created_at: string
}

// ─── Malawi Sun SVG ───────────────────────────────────────────────────────────
// Coordinates pre-rounded to 2dp to prevent SSR/client hydration mismatch
const SUN_RAYS = Array.from({ length: 31 }, (_, i) => {
  const angle = (i * 360) / 31
  const rad   = (angle * Math.PI) / 180
  const cos   = Math.cos(rad)
  const sin   = Math.sin(rad)
  return {
    x1: +(50 + 26 * cos).toFixed(2),
    y1: +(50 + 26 * sin).toFixed(2),
    x2: +(50 + 46 * cos).toFixed(2),
    y2: +(50 + 46 * sin).toFixed(2),
  }
})

function MalawiSun({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="20" />
      {SUN_RAYS.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
      ))}
    </svg>
  )
}

// ─── Single History Row ───────────────────────────────────────────────────────
function HistoryRow({ item, index }: { item: HistoryItem; index: number }) {
  const flip    = index % 2 !== 0
  const ref     = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Use requestIdleCallback so heavy scroll work doesn't block the main thread
    const observe = () => {
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setVis(true)
            obs.disconnect()
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      )
      obs.observe(el)
      return obs
    }

    let obs: IntersectionObserver
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => { obs = observe() })
    } else {
      obs = observe()
    }

    return () => obs?.disconnect()
  }, [])

  const year = item.year ?? new Date(item.created_at).getFullYear()

  return (
    <div
      ref={ref}
      className={[
        "mw-row",
        flip    ? "mw-row--flip"    : "",
        vis     ? "mw-row--visible" : "",
      ].filter(Boolean).join(" ")}
    >
      {/* ── Image side ── */}
      <div className="mw-row__image-wrap">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            sizes="(max-width: 720px) 100vw, 430px"
            className="mw-row__img"
            loading="lazy"
            unoptimized
          />
        ) : (
          <div className="mw-row__placeholder">
            <MalawiSun className="mw-row__placeholder-sun" />
          </div>
        )}
        <span className="mw-row__year-ghost" aria-hidden="true">{year}</span>
      </div>

      {/* ── Text side ── */}
      <div className="mw-row__body">
        <p className="mw-row__tag">
          <MapPin size={11} aria-hidden="true" />
          Malawi · {year}
        </p>
        <h2 className="mw-row__title">{item.title}</h2>
        <p className="mw-row__text">{item.content}</p>
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function HistoryClient({
  historyItems = [],
  searchTerm   = "",
}: {
  historyItems: HistoryItem[]
  searchTerm?:  string
}) {
  const count = historyItems.length

  return (
    <>
      {/* ── HERO ── */}
      <div className="mw-hero">
        <MalawiSun className="mw-hero__sun" />

        <div className="mw-hero__account">
          <AccountDropdown />
        </div>

        <div className="mw-hero__content">
          <p className="mw-hero__eyebrow">
            <span aria-hidden="true" />
            Malawi Heritage
            <span aria-hidden="true" />
          </p>
          <h1 className="mw-hero__title">
            Our <em>History</em>
          </h1>
          <p className="mw-hero__sub">
            From the depths of the Maravi Empire to the birth of the Republic —
            the story of the Warm Heart of Africa.
          </p>
        </div>
      </div>

      {/* Flag colour bar */}
      <div className="mw-flag-bar" aria-hidden="true">
        <div className="mw-flag-bar__s" />
        <div className="mw-flag-bar__s" />
        <div className="mw-flag-bar__s" />
      </div>

      {/* ── STICKY SEARCH ── */}
      <div className="mw-search">
        <div className="mw-search__inner">
          <SearchBar />
        </div>
      </div>

      {/* ── INTRO ── */}
      <div className="mw-intro">
        <div>
          <p className="mw-intro__label">Smart City History</p>
          <h2 className="mw-intro__heading">Memorable city history</h2>
        </div>
        <p className="mw-intro__count">
          {count} {count === 1 ? "chapter" : "chapters"}
        </p>
      </div>

      {/* ── TIMELINE ── */}
      <div className="mw-timeline">
        {count === 0 ? (
          <div className="mw-empty">
            <Search className="mw-empty__icon" aria-hidden="true" />
            <p className="mw-empty__text">No history found</p>
            <p>
              {searchTerm
                ? `No results for "${searchTerm}"`
                : "No history items yet."}
            </p>
          </div>
        ) : (
          historyItems.map((item, i) => (
            <HistoryRow key={item.id} item={item} index={i} />
          ))
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer className="mw-footer">
        <strong>Connect Malawi</strong> · Malawian Heritage ·{" "}
        {new Date().getFullYear()}
      </footer>
    </>
  )
}