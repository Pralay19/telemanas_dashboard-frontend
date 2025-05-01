"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Download } from "lucide-react"
// import Plot from "react-plotly.js"
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
import { fetchQuestionCountryData, fetchQuestionStateData } from "@/utils/api"

interface QuestionModalProps {
  questionId: number
  selectedState: string
  onStateChange: (state: string) => void
  onClose: () => void
}

export default function QuestionModal({ questionId, selectedState, onStateChange, onClose }: QuestionModalProps) {
  const [countryData, setCountryData] = useState<any>(null)
  const [stateData, setStateData] = useState<any>(null)
  const [states, setStates] = useState<string[]>(["CA", "NY", "TX", "FL", "IL"])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  // Create refs for the chart elements
  const countryChartRef = useRef<any>(null)
  const stateChartRef = useRef<any>(null)

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

  // Improved function to download chart as PNG
  const downloadChartAsPng = async (chartRef: React.RefObject<any>, chartType: string) => {
    try {
      setDownloading(true)

      if (!chartRef.current) {
        console.error("Chart reference is not available")
        return
      }

      // Get the chart div element
      const chartDiv = chartRef.current.el

      if (!chartDiv) {
        console.error("Chart div element not found")
        return
      }

      // Wait for Plotly to be available
      if (typeof window === "undefined" || !window.Plotly) {
        console.error("Plotly is not available on window")
        return
      }

      // Get the chart data and layout from the ref
      const chartInstance = chartRef.current.props
      if (!chartInstance) {
        console.error("Chart instance not found")
        return
      }

      // Create a new div for the export
      const exportDiv = document.createElement("div")
      exportDiv.style.position = "absolute"
      exportDiv.style.left = "-9999px"
      document.body.appendChild(exportDiv)

      // Create a new Plotly chart for export
      await window.Plotly.newPlot(exportDiv, chartInstance.data, {
        ...chartInstance.layout,
        width: 800,
        height: 600,
        paper_bgcolor: "#1a2233",
        plot_bgcolor: "#1a2233",
      })

      // Generate the image
      const dataUrl = await window.Plotly.toImage(exportDiv, {
        format: "png",
        width: 800,
        height: 600,
        scale: 2,
      })

      // Create download link
      const link = document.createElement("a")
      link.download = `question-${questionId}-${chartType}-${selectedState}.png`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up
      document.body.removeChild(exportDiv)
    } catch (error) {
      console.error("Error downloading chart:", error)
      alert("Failed to download chart. Please try again.")
    } finally {
      setDownloading(false)
    }
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

      case 2: // Bar chart for time of day
        return {
          data: [
            {
              x: data.labels,
              y: data.values,
              type: "bar",
              marker: {
                color: "#6366f1",
                opacity: 0.8,
                line: {
                  color: "#8b5cf6",
                  width: 1.5,
                },
              },
              name: "Call Volume",
            },
          ],
          layout: {
            title: title,
            autosize: true,
            margin: { l: 40, r: 20, t: 40, b: 40 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#e5e7eb" },
            xaxis: {
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
              title: "Time of Day",
            },
            yaxis: {
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
              title: "Call Volume",
            },
            showlegend: true,
            legend: {
              bgcolor: "rgba(26, 34, 51, 0.7)",
              bordercolor: "#4b5563",
              borderwidth: 1,
              font: { color: "#e5e7eb" },
            },
          },
        }

      case 3: // Scatter plot for duration vs resolution
        return {
          data: [
            {
              x: data.x,
              y: data.y,
              mode: "markers",
              type: "scatter",
              marker: {
                color: "#6366f1",
                size: 10,
                opacity: 0.7,
                line: {
                  color: "#8b5cf6",
                  width: 1,
                },
              },
              text: data.text,
              name: "Resolution Rate",
            },
          ],
          layout: {
            title: title,
            autosize: true,
            margin: { l: 40, r: 20, t: 40, b: 40 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#e5e7eb" },
            xaxis: {
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
              title: "Call Duration (minutes)",
            },
            yaxis: {
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
              title: "Resolution Rate (%)",
            },
            showlegend: true,
            legend: {
              bgcolor: "rgba(26, 34, 51, 0.7)",
              bordercolor: "#4b5563",
              borderwidth: 1,
              font: { color: "#e5e7eb" },
            },
          },
        }

      case 4: // Sankey diagram for reopened cases
        return {
          data: [
            {
              type: "sankey",
              orientation: "h",
              node: {
                pad: 15,
                thickness: 20,
                line: {
                  color: "black",
                  width: 0.5,
                },
                label: data.nodes,
                color: data.nodeColors || ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#10b981"],
              },
              link: {
                source: data.source,
                target: data.target,
                value: data.value,
                color: data.linkColors || "rgba(99, 102, 241, 0.4)",
              },
            },
          ],
          layout: {
            title: title,
            autosize: true,
            margin: { l: 0, r: 0, t: 40, b: 0 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#e5e7eb" },
            legend: {
              bgcolor: "rgba(26, 34, 51, 0.7)",
              bordercolor: "#4b5563",
              borderwidth: 1,
              font: { color: "#e5e7eb" },
            },
          },
        }

      case 5: // Choropleth map
        return {
          data: [
            {
              type: "choropleth",
              locationmode: "USA-states",
              locations: data.locations,
              z: data.values,
              text: data.text,
              colorscale: "Viridis",
              colorbar: {
                title: "Call Volume",
                thickness: 20,
                outlinewidth: 0,
                bordercolor: "#4b5563",
                tickfont: { color: "#e5e7eb" },
                titlefont: { color: "#e5e7eb" },
              },
              marker: {
                line: {
                  color: "#1f2937",
                  width: 1,
                },
              },
            },
          ],
          layout: {
            title: title,
            geo: {
              scope: "usa",
              showlakes: true,
              lakecolor: "#1a2233",
              bgcolor: "rgba(0,0,0,0)",
            },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#e5e7eb" },
            margin: { l: 0, r: 0, t: 40, b: 0 },
            legend: {
              bgcolor: "rgba(26, 34, 51, 0.7)",
              bordercolor: "#4b5563",
              borderwidth: 1,
              font: { color: "#e5e7eb" },
            },
          },
        }

      // Add new chart types
      case 6: // Line chart for call volumes and resolution rates over time
        return {
          data: [
            {
              x: data.x,
              y: data.y1,
              type: "scatter",
              mode: "lines+markers",
              name: data.labels[0],
              line: {
                color: "#6366f1",
                width: 3,
              },
              marker: {
                size: 8,
                color: "#6366f1",
              },
            },
            {
              x: data.x,
              y: data.y2,
              type: "scatter",
              mode: "lines+markers",
              name: data.labels[1],
              line: {
                color: "#10b981",
                width: 3,
              },
              marker: {
                size: 8,
                color: "#10b981",
              },
              yaxis: "y2",
            },
          ],
          layout: {
            title: title,
            autosize: true,
            margin: { l: 50, r: 50, t: 40, b: 40 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#e5e7eb" },
            xaxis: {
              title: "Month",
              gridcolor: "#1f2937",
            },
            yaxis: {
              title: "Call Volume",
              titlefont: { color: "#6366f1" },
              tickfont: { color: "#6366f1" },
            },
            yaxis2: {
              title: "Resolution Rate (%)",
              titlefont: { color: "#10b981" },
              tickfont: { color: "#10b981" },
              overlaying: "y",
              side: "right",
              showgrid: false,
            },
            showlegend: true,
            legend: {
              bgcolor: "rgba(26, 34, 51, 0.7)",
              bordercolor: "#4b5563",
              borderwidth: 1,
              font: { color: "#e5e7eb" },
            },
          },
        }

      case 7: // Heatmap for call durations across hours
        return {
          data: [
            {
              z: data.z,
              x: data.x,
              y: data.y,
              type: "heatmap",
              colorscale: [
                [0, "#1a2233"],
                [0.2, "#374151"],
                [0.4, "#6366f1"],
                [0.6, "#8b5cf6"],
                [0.8, "#ec4899"],
                [1, "#f43f5e"],
              ],
              showscale: true,
              colorbar: {
                title: "Call Duration (min)",
                thickness: 20,
                outlinewidth: 0,
                bordercolor: "#4b5563",
                tickfont: { color: "#e5e7eb" },
                titlefont: { color: "#e5e7eb" },
              },
            },
          ],
          layout: {
            title: title,
            autosize: true,
            margin: { l: 50, r: 50, t: 40, b: 40 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#e5e7eb" },
            xaxis: {
              title: "Time of Day",
              gridcolor: "#1f2937",
            },
            yaxis: {
              title: "Day of Week",
              gridcolor: "#1f2937",
            },
            showlegend: false,
          },
        }

      case 8: // Radar chart for state comparison
        return {
          data: isCountry
            ? data.states.map((state: string, index: number) => ({
                type: "scatterpolar",
                r: data.values[index],
                theta: data.categories,
                fill: "toself",
                name: state,
                line: {
                  color: ["#6366f1", "#8b5cf6", "#ec4899"][index % 3],
                },
              }))
            : data.regions.map((region: string, index: number) => ({
                type: "scatterpolar",
                r: data.values[index],
                theta: data.categories,
                fill: "toself",
                name: region,
                line: {
                  color: ["#6366f1", "#8b5cf6", "#ec4899", "#10b981"][index % 4],
                },
              })),
          layout: {
            title: title,
            autosize: true,
            margin: { l: 40, r: 40, t: 40, b: 40 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#e5e7eb" },
            polar: {
              radialaxis: {
                visible: true,
                range: [0, 100],
                gridcolor: "#1f2937",
              },
              angularaxis: {
                gridcolor: "#1f2937",
              },
              bgcolor: "rgba(0,0,0,0)",
            },
            showlegend: true,
            legend: {
              bgcolor: "rgba(26, 34, 51, 0.7)",
              bordercolor: "#4b5563",
              borderwidth: 1,
              font: { color: "#e5e7eb" },
            },
          },
        }

      case 9: // Bubble chart
        return {
          data: [
            {
              x: data.x,
              y: data.y,
              mode: "markers",
              marker: {
                size: data.size,
                sizemode: "diameter",
                sizeref: 0.1,
                color: data.size,
                colorscale: "Viridis",
                showscale: true,
                colorbar: {
                  title: "Resolution Rate (%)",
                  thickness: 20,
                  outlinewidth: 0,
                  bordercolor: "#4b5563",
                  tickfont: { color: "#e5e7eb" },
                  titlefont: { color: "#e5e7eb" },
                },
              },
              text: data.text,
              hovertemplate:
                "<b>%{text}</b><br>Call Volume: %{x}<br>Avg Duration: %{y} min<br>Resolution Rate: %{marker.size}%",
            },
          ],
          layout: {
            title: title,
            autosize: true,
            margin: { l: 50, r: 50, t: 40, b: 40 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#e5e7eb" },
            xaxis: {
              title: "Call Volume",
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
            },
            yaxis: {
              title: "Average Call Duration (minutes)",
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
            },
            showlegend: false,
          },
        }

      case 10: // Area chart
        return {
          data: [
            {
              x: data.x,
              y: data.anxiety,
              type: "scatter",
              mode: "lines",
              name: "Anxiety",
              stackgroup: "one",
              fillcolor: "rgba(99, 102, 241, 0.6)",
              line: { color: "#6366f1", width: 1 },
            },
            {
              x: data.x,
              y: data.depression,
              type: "scatter",
              mode: "lines",
              name: "Depression",
              stackgroup: "one",
              fillcolor: "rgba(139, 92, 246, 0.6)",
              line: { color: "#8b5cf6", width: 1 },
            },
            {
              x: data.x,
              y: data.stress,
              type: "scatter",
              mode: "lines",
              name: "Stress",
              stackgroup: "one",
              fillcolor: "rgba(236, 72, 153, 0.6)",
              line: { color: "#ec4899", width: 1 },
            },
            {
              x: data.x,
              y: data.other,
              type: "scatter",
              mode: "lines",
              name: "Other",
              stackgroup: "one",
              fillcolor: "rgba(244, 63, 94, 0.6)",
              line: { color: "#f43f5e", width: 1 },
            },
          ],
          layout: {
            title: title,
            autosize: true,
            margin: { l: 50, r: 20, t: 40, b: 40 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#e5e7eb" },
            xaxis: {
              title: "Month",
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
            },
            yaxis: {
              title: "Number of Calls",
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
            },
            showlegend: true,
            legend: {
              bgcolor: "rgba(26, 34, 51, 0.7)",
              bordercolor: "#4b5563",
              borderwidth: 1,
              font: { color: "#e5e7eb" },
            },
          },
        }

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
                <div className="h-[400px]">
                  {countryChartConfig && (
                    <Plot
                      ref={countryChartRef}
                      data={countryChartConfig.data}
                      layout={countryChartConfig.layout}
                      config={{ responsive: true, displayModeBar: false }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => downloadChartAsPng(countryChartRef, "national")}
                    disabled={downloading}
                    className={`flex items-center gap-2 px-4 py-2 ${
                      downloading ? "bg-gray-600" : "bg-purple-700 hover:bg-purple-600"
                    } rounded-md text-sm`}
                  >
                    <Download size={16} />
                    {downloading ? "Downloading..." : "Download Chart"}
                  </button>
                </div>
              </div>

              {/* Right pane: State chart */}
              <div className="bg-[#242f47] rounded-xl p-4">
                <div className="h-[400px]">
                  {stateChartConfig && (
                    <Plot
                      ref={stateChartRef}
                      data={stateChartConfig.data}
                      layout={stateChartConfig.layout}
                      config={{ responsive: true, displayModeBar: false }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => downloadChartAsPng(stateChartRef, "state")}
                    disabled={downloading}
                    className={`flex items-center gap-2 px-4 py-2 ${
                      downloading ? "bg-gray-600" : "bg-purple-700 hover:bg-purple-600"
                    } rounded-md text-sm`}
                  >
                    <Download size={16} />
                    {downloading ? "Downloading..." : "Download Chart"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
