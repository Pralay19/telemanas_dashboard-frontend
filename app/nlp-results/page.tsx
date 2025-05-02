"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
// import Plot from "react-plotly.js"
import dynamic from "next/dynamic"
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

import { Search } from "lucide-react"

interface NLPResult {
  chartType: "bar" | "pie" | "line" | "choropleth"
  title: string
  description: string
  data: any // This will vary based on chart type
}

export default function NLPResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<NLPResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch("http://localhost:8000/static/nlp.json")
        if (!response.ok) {
          throw new Error("Failed to fetch NLP results")
        }

        const data = await response.json()
        setResult(data)
      } catch (err) {
        console.error("Error fetching NLP results:", err)
        setError("Failed to process your query. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchData()
    }
  }, [query])

  const renderChart = () => {
    if (!result) return null

    switch (result.chartType) {
      case "bar":
        return (
          <Plot
            data={[
              {
                x: result.data.labels,
                y: result.data.values,
                type: "bar",
                marker: {
                  color: "#6366f1",
                  opacity: 0.8,
                },
                name: result.title,
              },
            ]}
            layout={{
              autosize: true,
              title: result.title,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#e5e7eb" },
              xaxis: {
                gridcolor: "#1f2937",
                zerolinecolor: "#1f2937",
              },
              yaxis: {
                gridcolor: "#1f2937",
                zerolinecolor: "#1f2937",
              },
            }}
            config={{ responsive: true }}
            style={{ width: "100%", height: "500px" }}
          />
        )

      case "pie":
        return (
          <Plot
            data={[
              {
                values: result.data.values,
                labels: result.data.labels,
                type: "pie",
                marker: {
                  colors: ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#10b981", "#3b82f6", "#14b8a6"],
                },
                textinfo: "label+percent",
                textposition: "outside",
                automargin: true,
                name: result.title,
              },
            ]}
            layout={{
              autosize: true,
              title: result.title,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#e5e7eb" },
            }}
            config={{ responsive: true }}
            style={{ width: "100%", height: "500px" }}
          />
        )

      case "line":
        return (
          <Plot
            data={[
              {
                x: result.data.x,
                y: result.data.y,
                type: "scatter",
                mode: "lines+markers",
                line: { color: "#6366f1", width: 3 },
                name: result.title,
              },
            ]}
            layout={{
              autosize: true,
              title: result.title,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#e5e7eb" },
              xaxis: {
                gridcolor: "#1f2937",
                zerolinecolor: "#1f2937",
              },
              yaxis: {
                gridcolor: "#1f2937",
                zerolinecolor: "#1f2937",
              },
            }}
            config={{ responsive: true }}
            style={{ width: "100%", height: "500px" }}
          />
        )

      case "choropleth":
        return (
          <Plot
            data={[
              {
                type: "choropleth",
                locationmode: "country names",
                locations: result.data.locations,
                z: result.data.values,
                text: result.data.text,
                colorscale: "Viridis",
                autocolorscale: false,
                colorbar: {
                  title: result.title,
                  thickness: 20,
                },
                marker: {
                  line: {
                    color: "#1f2937",
                    width: 0.5,
                  },
                },
              },
            ]}
            layout={{
              autosize: true,
              title: result.title,
              geo: {
                scope: "asia",
                countrycolor: "#1f2937",
                showland: true,
                landcolor: "#1f2937",
                showlakes: true,
                lakecolor: "#0d1117",
                subunitcolor: "#1f2937",
              },
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#e5e7eb" },
            }}
            config={{ responsive: true }}
            style={{ width: "100%", height: "500px" }}
          />
        )

      default:
        return <div className="text-red-500">Unsupported chart type: {result.chartType}</div>
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Natural Language Query Results</h1>
        <p className="text-gray-400">Query: {query}</p>
      </header>

      <div className="mb-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-xl text-gray-300">Processing your query...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-red-400 mb-2">Error</h3>
            <p className="text-gray-300">{error}</p>
          </div>
        ) : result ? (
          <div className="bg-[#1a2233] border border-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
            <p className="text-gray-400 mb-6">{result.description}</p>
            {renderChart()}
          </div>
        ) : null}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Ask Another Question</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const newQuery = formData.get("query")?.toString() || ""
            if (!newQuery.trim()) return

            // Reload the page with the new query
            window.location.href = `/nlp-results?query=${encodeURIComponent(newQuery)}`
          }}
          className="flex w-full max-w-3xl"
        >
          <input
            type="text"
            name="query"
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
    </div>
  )
}
