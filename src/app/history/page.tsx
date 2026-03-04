
'use client';

import { Filter, MapPin, Search, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import AccountDropdown from '../components/AccountDropdown';
interface HistoryItem {
    id: string;
    title: string;
    description: string;
    timestamp: Date;
}

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch history data
        const fetchHistory = async () => {
            try {
                // Replace with your API endpoint
                const response = await fetch('/api/history');
                const data = await response.json();
                setHistory(data);
            } catch (error) {
                console.error('Failed to fetch history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div>
                <div className="relative bg-gradient-to-r from-black via-red-700 to-green-700 text-white overflow-hidden">
        
        {/* Account Icon - Top Right */}
        <div className="absolute top-6 right-6 z-50">
          <AccountDropdown />
        </div>

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
            <span className="text-white font-medium">History</span>
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
                    {} Amazing History
                  </span>
                </div>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight">
                Know Malawi
              </h1>
              <p className="text-xl text-gray-100 max-w-2xl leading-relaxed">
                Learn about the history of the Warm Heart of Africa
              </p>
            </div>

            {/* Stats Card - Malawian Colors */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[200px]">
              {/* <div className="text-4xl font-bold mb-1">{placesCount}</div> */}
              <div className="text-red-100 text-sm">Historyfr</div>
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
            </div>
            
            <div className="space-y-4">
                {history.length > 0 ? (
                    history.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow p-4">
                            <h2 className="text-lg font-semibold">{item.title}</h2>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                            <p className="text-gray-400 text-xs mt-2">
                                {new Date(item.timestamp).toLocaleDateString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No history items found.</p>
                )}
            </div>
        </div>
    );
}