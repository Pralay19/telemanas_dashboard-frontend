"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

export default function NLPSearch() {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Open in a new tab with the query as a parameter
    window.open(`/nlp-results?query=${encodeURIComponent(query)}`, "_blank")
  }

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4">Natural Language to SQL</h2>
      <p className="text-gray-400 mb-4">Ask questions about your data in plain English and get visualized results</p>

      <form onSubmit={handleSubmit} className="flex w-full max-w-3xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Show me call volume by state for last month"
          className="flex-grow px-4 py-3 rounded-l-md text-gray-800 bg-white border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-r-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}
// This component is a search bar that allows users to input natural language queries.