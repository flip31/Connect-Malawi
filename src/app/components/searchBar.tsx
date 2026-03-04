'use client'

import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [text, setText] = useState(searchParams.get('search') || '');

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (text) {
                router.push(`/places?search=${text}`)
            } else {
                router.push('/places')
            }
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [text, router]);

    return (
    <div className="relative flex-1 max-w-md w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search names or regions..."
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
      />
    </div>
  );

}