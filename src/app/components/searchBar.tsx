// app/components/SearchBar.tsx
'use client'

import { Search } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useTransition } from "react"

export default function SearchBar() {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }

    // This updates the URL without a full page reload
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className="relative flex-1 max-w-md w-full">
      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isPending ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} />
      <input
        type="text"
        placeholder="Search..."
        defaultValue={searchParams.get('search')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all shadow-sm"
      />
    </div>
  )
}