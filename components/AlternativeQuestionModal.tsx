"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
// import Plot from "react-plotly.js"
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
import { fetchQuestionCountryData, fetchQuestionStateData } from "@/utils/api"
import Html2CanvasDownload from "./html2canvas-download"

interface QuestionModalProps {
  questionId: number
  selectedState: string
  onStateChange: (state: string) => void
  onClose: () => void
}

export default function AlternativeQuestionModal({
  questionId,
  selectedState,
  onStateChange,
  onClose,
}: QuestionModalProps) {
  const [countryData, setCountryData] = useState<any>(null)
  const [stateData, setStateData] = useState<any>(null)
  const [states, setStates] = useState<string[]>(["CA", "NY", "TX", "FL", "IL"])
  const [loading, setLoading] = useState(true)

  // Create refs for the chart containers
  const countryChartContainerRef = useRef<HTMLDivElement>(null)
  const stateChartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Fetch country data for the question
        const countryResult = await fetchQuestionCountryData(questionId)
        setCountryData(countryResult)

        // Fetch state data for the question
        const stateResult = await fetchQuestionStateData(questionId, selectedState)
        setStateData(stateResult)
      } catch (error) {
        console.error(`Error loading data for question ${questionId}:`, error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [questionId, selectedState])

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStateChange(e.target.value)
  }

  // Get chart configuration based on question ID
  const getChartConfig = (data: any, isCountry: boolean) => {
    if (!data) return null

    const title = isCountry ? "National Data" : `${selectedState} Data`

    switch (questionId) {
      case 1: // Pie chart for categories
        return {
          data: [
            {
              values: data.values,
              labels: data.labels,
              type: "pie",
              hole: 0.4,
              marker: {
                colors: ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#10b981"],
              },
              textinfo: "label+percent",
              textposition: "outside",
              automargin: true,
              hoverinfo: "label+percent+value",
            },
          ],
          layout: {
            title: title,
            autosize: true,
            margin: { l: 0, r: 0, t: 40, b: 0 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#e5e7eb" },
            showlegend: true,
            legend: {
              orientation: "h",
              xanchor: "center",
              yanchor: "bottom",
              x: 0.5,
              y: -0.2,
              bgcolor: "rgba(26, 34, 51, 0.7)",
              bordercolor: "#4b5563",
              borderwidth: 1,
              font: { color: "#e5e7eb" },
            },
          },
        }

      // Other cases remain the same...
      default:
        return null
    }
  }

  const countryChartConfig = getChartConfig(countryData, true)
  const stateChartConfig = getChartConfig(stateData, false)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#1a2233] rounded-[1.5rem] shadow-2xl w-full max-w-6xl my-8 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Question {questionId} Analysis</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto">
          <div className="flex justify-end mb-4">
            <div className="flex items-center">
              <label htmlFor="modal-state-select" className="mr-2 text-gray-400">
                Select State for Comparison:
              </label>
              <select
                id="modal-state-select"
                value={selectedState}
                onChange={handleStateChange}
                className="bg-[#242f47] border border-gray-700 rounded-md px-3 py-1 text-white"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl text-gray-400">Loading chart data...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left pane: Country chart */}
              <div className="bg-[#242f47] rounded-xl p-4">
                <div ref={countryChartContainerRef} className="h-[400px]">
                  {countryChartConfig && (
                    <Plot
                      data={countryChartConfig.data}
                      layout={countryChartConfig.layout}
                      config={{ responsive: true, displayModeBar: false }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </div>
                <div className="mt-4 flex justify-center">
                  <Html2CanvasDownload
                    targetRef={countryChartContainerRef}
                    filename={`question-${questionId}-national-${selectedState}.png`}
                  />
                </div>
              </div>

              {/* Right pane: State chart */}
              <div className="bg-[#242f47] rounded-xl p-4">
                <div ref={stateChartContainerRef} className="h-[400px]">
                  {stateChartConfig && (
                    <Plot
                      data={stateChartConfig.data}
                      layout={stateChartConfig.layout}
                      config={{ responsive: true, displayModeBar: false }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </div>
                <div className="mt-4 flex justify-center">
                  <Html2CanvasDownload
                    targetRef={stateChartContainerRef}
                    filename={`question-${questionId}-state-${selectedState}.png`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
