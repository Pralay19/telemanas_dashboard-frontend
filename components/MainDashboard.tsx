"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ChartCard from "./ChartCard"
import { fetchCountryData, fetchStateData } from "@/utils/api"
// import Plot from "react-plotly.js"

import dynamic from 'next/dynamic';
import { Weight } from "lucide-react"

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface MainDashboardProps {
  selectedState: string
  onStateChange: (state: string) => void
}

interface CallFlow {
  labels: string[]
  values: number[]
  dropoffs: number[]
  dropoffPercentages: number[]
}

interface CountryData {
  totalCalls: number
  byGender: { [key: string]: number }
  timeseries: { date: string; calls: number }[]
  avgDuration: { date: string; minutes: number }[]
  byCategory: { [key: string]: number }
  newVsReopened: { new: number; reopened: number }
  byWeekday: { [key: string]: number }
  byAgeGroup: { [key: string]: number }
  callsByDirection: { month: string; incoming: number; outgoing: number }[]
  callFlow: CallFlow
}

interface StateData {
  state: string
  totalCalls: number
  byGender: { [key: string]: number }
  timeseries: { date: string; calls: number }[]
  avgDuration: { date: string; minutes: number }[]
  byCategory: { [key: string]: number }
  newVsReopened: { new: number; reopened: number }
  byWeekday: { [key: string]: number }
  byAgeGroup: { [key: string]: number }
  callsByDirection: { month: string; incoming: number; outgoing: number }[]
  callFlow: CallFlow
}

export default function MainDashboard({ selectedState, onStateChange }: MainDashboardProps) {
  const [countryData, setCountryData] = useState<CountryData | null>(null)
  const [stateData, setStateData] = useState<StateData | null>(null)
  const [states, setStates] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Fetch country data
        // const countryResult = await fetchCountryData()
        // setCountryData(countryResult)

        // Fetch state data
        const stateDataResult = await fetchStateData()
        const statesList = stateDataResult.map((state: StateData) => state.state)
        setStates(statesList)

        // Find the selected state data
        const selectedStateData = stateDataResult.find((state: StateData) => state.state === selectedState) || "India"
        setStateData(selectedStateData || null)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [selectedState])

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStateChange(e.target.value)
  }

  if (loading || !stateData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-400">Loading dashboard data...</div>
      </div>
    )
  }

  // Calculate percentage change (dummy calculation for demonstration)
  const percentChange = 12.5 // This would be calculated from actual data
  const Calls = 0.75 // This would be calculated from actual data

  // Prepare data for charts
  const timeseriesData = stateData.timeseries.map((item) => ({
    x: new Date(item.date),
    y: item.calls,
  }))

  const avgDurationData = stateData.avgDuration.map((item) => ({
    x: new Date(item.date),
    y: item.minutes,
  }))

  const categoryLabels = Object.keys(stateData.triage)
  const categoryValues = Object.values(stateData.triage)

  const weekdayLabels = Object.keys(stateData.byWeekday)
  const weekdayValues = Object.values(stateData.byWeekday)

  // Prepare data for age group bar chart
  const ageGroupLabels = Object.keys(stateData.byAgeGroup)
  const ageGroupValues = Object.values(stateData.byAgeGroup)
  const ageGroupColors = ["#60a5fa", "#34d399", "#f97316", "#facc15", "#a78bfa", "#f472b6"]

  //  incoming vs outgoing calls stacked area chart
  const months = stateData.callsByDirection.map((item) => item.month)
  const incomingCalls = stateData.callsByDirection.map((item) => item.incoming)
  const outgoingCalls = stateData.callsByDirection.map((item) => item.outgoing)

  // call flow funnel chart
  const { labels, values, dropoffs, dropoffPercentages } = stateData.callflow

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <div className="flex items-center">
          <label htmlFor="state-select" className="mr-2 text-gray-400">
            Select State:
          </label>
          <select
            id="state-select"
            value={selectedState}
            onChange={handleStateChange}
            className="bg-[#1a2233] border border-gray-700 rounded-md px-3 py-1 text-white"
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Card A: Total Calls */}
        <ChartCard title="Total Calls" className="bg-gradient-to-br from-blue-900 to-purple-900">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="text-4xl font-bold">{stateData.totalCalls.toLocaleString()}</div>
            <div className="text-gray-300 mt-2">Total calls received</div>
          </div>
        </ChartCard>

        {/* Card B: Gender Breakdown */}
        <ChartCard title="Gender Breakdown" className="bg-gradient-to-br from-purple-900 to-pink-900">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="flex justify-center w-full">
              <div className="text-center px-4">
                <div className="text-3xl font-bold">{stateData.byGender.Male.toLocaleString()}</div>
                <div className="text-gray-300">Male</div>
              </div>
              <div className="text-center px-4">
                <div className="text-3xl font-bold">{stateData.byGender.Female.toLocaleString()}</div>
                <div className="text-gray-300">Female</div>
              </div>
            </div>
          </div>
        </ChartCard>

        {/* Card C: Percentage Change */}
        <ChartCard title="% Change vs. Last Period">
          <div className="flex flex-col justify-center items-center h-full">
            <div className={`text-3xl font-bold ${percentChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {percentChange >= 0 ? "+" : ""}
              {percentChange}%
            </div>
            <div className="text-gray-300 mt-2">Change in call volume</div>
          </div>
        </ChartCard>

        {/* Card D:  Calls */}
        <ChartCard title="Calls">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="text-3xl font-bold">{Calls.toFixed(2)}</div>
            <div className="text-gray-300 mt-2">call ratio</div>
          </div>
        </ChartCard>
      </div>

      {/* Row 2: Line Chart and Area Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Card E: Line Chart of Calls Over Time */}
        <ChartCard title="Calls Over Time" className="lg:col-span-2">
          <div className="h-64">
            <Plot
              data={[
                {
                  x: stateData.timeseries.map((item) => item.date),
                  y: stateData.timeseries.map((item) => item.calls),
                  type: "scatter",
                  mode: "lines",
                  line: { color: "#6366f1", width: 3 },
                  name: "Calls",
                },
              ]}
              layout={{
                autosize: true,
                margin: { l: 40, r: 20, t: 10, b: 40 },
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
                showlegend: false,
              }}
              config={{ responsive: true, displayModeBar: false }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </ChartCard>

        {/* Card F: Area Chart of Average Call Duration */}
        <ChartCard title="Average Call Duration in Minutes">
          <div className="h-64">
            <Plot
              data={[
                {
                  x: stateData.avgDuration.map((item) => item.date),
                  y: stateData.avgDuration.map((item) => item.minutes),
                  type: "scatter",
                  mode: "lines",
                  fill: "tozeroy",
                  fillcolor: "rgba(139, 92, 246, 0.3)",
                  line: { color: "#8b5cf6", width: 2 },
                  name: "Avg Duration",
                },
              ]}
              layout={{
                autosize: true,
                margin: { l: 40, r: 20, t: 10, b: 40 },
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
                showlegend: false,
              }}
              config={{ responsive: true, displayModeBar: false }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="mt-2 text-center">
            <button className="px-4 py-1 bg-purple-700 hover:bg-purple-600 rounded-md text-sm">View Details</button>
          </div>
        </ChartCard>
      </div>

      {/* Row 3: Donut, Semi-Donut, and Bar Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Card G: Donut Chart of Issue Categories */}
        <ChartCard title="Issue Categories">
          <div className="h-64">
            <Plot
              data={[
                {
                  values: categoryValues,
                  labels: categoryLabels,
                  type: "pie",
                  hole: 0.6,
                  marker: {
                    colors: ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#10b981"],
                  },
                  textinfo: "label+percent",
                  textposition: "outside",
                  automargin: true,
                  name: "Categories",
                },
              ]}
              layout={{
                autosize: true,
                margin: { l: 0, r: 0, t: 10, b: 10 },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                font: { color: "#e5e7eb" },
                showlegend: false,
              }}
              config={{ responsive: true, displayModeBar: false }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </ChartCard>

        {/* Card H: Semi-Donut of New vs Reopened */}
        {/* <ChartCard title="New vs. Reopened Requests">
          <div className="h-64">
            <Plot
              data={[
                {
                  values: [stateData.newVsReopened.new, stateData.newVsReopened.reopened],
                  labels: ["New", "Reopened"],
                  type: "pie",
                  hole: 0.6,
                  marker: {
                    colors: ["#10b981", "#f43f5e"],
                  },
                  textinfo: "label+percent",
                  textposition: "outside",
                  automargin: true,
                  domain: { x: [0, 1], y: [0, 1] },
                  rotation: 90,
                  name: "Request Type",
                },
              ]}
              layout={{
                autosize: true,
                margin: { l: 0, r: 0, t: 10, b: 10 },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                font: { color: "#e5e7eb" },
                showlegend: false,
                annotations: [
                  {
                    font: {
                      size: 14,
                      color: "#e5e7eb",
                    },
                    showarrow: false,
                    text: `${Math.round((stateData.newVsReopened.new / (stateData.newVsReopened.new + stateData.newVsReopened.reopened)) * 100)}% New`,
                    x: 0.5,
                    y: 0.5,
                  },
                ],
              }}
              config={{ responsive: true, displayModeBar: false }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </ChartCard> */}

        {/* Card I: Bar Chart of Calls per Weekday */}
        <ChartCard title="Calls per Weekday">
          <div className="h-64">
            <Plot
              data={[
                {
                  x: weekdayLabels,
                  y: weekdayValues,
                  type: "bar",
                  marker: {
                    color: "#6366f1",
                    opacity: 0.8,
                    line: {
                      color: "#8b5cf6",
                      width: 1.5,
                    },
                  },
                  name: "Calls by Day",
                },
              ]}
              layout={{
                autosize: true,
                margin: { l: 40, r: 20, t: 10, b: 40 },
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
                showlegend: false,
                bargap: 0.3,
              }}
              config={{ responsive: true, displayModeBar: false }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </ChartCard>
      </div>

      {/* Row 4: New Charts - Age Groups Bar Chart and Call Direction Stacked Area Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Card J: Bar Chart of Calls by Age Group */}
        <ChartCard title="Calls by Age Group">
          <div className="h-64">
            <Plot
              data={[
                {
                  x: ageGroupLabels,
                  y: ageGroupValues,
                  type: "bar",
                  marker: {
                    color: ageGroupColors,
                    opacity: 0.9,
                    line: {
                      width: 1,
                      color: "#374151",
                    },
                  },
                  textfont: {weight: "bold"},
                  name: "Calls by Age Group",
                  text: ageGroupValues.map(String),
                  textposition: "auto",
                  hoverinfo: "",
                },
              ]}
              layout={{
                autosize: true,
                margin: { l: 40, r: 20, t: 10, b: 60 },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                font: { color: "#e5e7eb" },
                xaxis: {
                  gridcolor: "#1f2937",
                  zerolinecolor: "#1f2937",
                  title: "Age Group",
                  titlefont: { size: 12 },
                },
                yaxis: {
                  gridcolor: "#1f2937",
                  zerolinecolor: "#1f2937",
                  title: "Number of Calls",
                  titlefont: { size: 12 },
                },
                showlegend: false,
                bargap: 0.3,
              }}
              config={{ responsive: true, displayModeBar: false }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="mt-2 text-xs text-center text-gray-400">
            Distribution of calls across different age groups
          </div>
        </ChartCard>

        {/* Card K: Stacked Area Chart of Incoming vs Outgoing Calls */}
        <ChartCard title="Incoming vs Outgoing Calls">
          <div className="h-64">
            <Plot
              data={[
                {
                  x: months,
                  y: incomingCalls,
                  type: "scatter",
                  mode: "lines",
                  name: "Incoming",
                  stackgroup: "one",
                  fillcolor: "rgba(99, 102, 241, 0.7)",
                  line: { color: "#6366f1", width: 1 },
                },
                {
                  x: months,
                  y: outgoingCalls,
                  type: "scatter",
                  mode: "lines",
                  name: "Outgoing",
                  stackgroup: "one",
                  fillcolor: "rgba(139, 92, 246, 0.7)",
                  line: { color: "#8b5cf6", width: 1 },
                },
              ]}
              layout={{
                autosize: true,
                margin: { l: 40, r: 20, t: 10, b: 40 },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                font: { color: "#e5e7eb" },
                xaxis: {
                  gridcolor: "#1f2937",
                  zerolinecolor: "#1f2937",
                  title: "Month",
                  titlefont: { size: 12 },
                },
                yaxis: {
                  gridcolor: "#1f2937",
                  zerolinecolor: "#1f2937",
                  title: "Number of Calls",
                  titlefont: { size: 12 },
                },
                legend: {
                  orientation: "h",
                  xanchor: "center",
                  yanchor: "bottom",
                  x: 0.5,
                  y: -0.2,
                  bgcolor: "rgba(26, 34, 51, 0.7)",
                  bordercolor: "#4b5563",
                  borderwidth: 1,
                  font: { color: "#e5e7eb", size: 10 },
                },
              }}
              config={{ responsive: true, displayModeBar: false }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </ChartCard>
      </div>

      {/* Row 5: Call Flow Funnel Chart (full width) */}
      <div className="grid grid-cols-1 gap-6">
        <ChartCard title="Call Flow Funnel" className="col-span-1">
          <div className="h-98">
            {/* Header with date range */}
            <div className="text-xs text-gray-400 mb-4">Jan 1, 2023 - Jun 30, 2023</div>

            {/* Funnel metrics display */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {labels.map((label, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold">
                    {values[index].toLocaleString()}
                    {index > 0 ? "K" : ""}
                  </div>
                  <div className="text-sm">{label}</div>
                  {index > 0 && dropoffs && dropoffs[index - 1] !== undefined && (
                    <div className="text-xs text-gray-400 mt-1">
                      {dropoffs[index - 1].toLocaleString()}
                      <br />
                      {dropoffPercentages && dropoffPercentages[index - 1] !== undefined
                        ? `${dropoffPercentages[index - 1]}%`
                        : ""}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Funnel chart */}
            <Plot
              data={[
                {
                  type: "funnel",
                  y: labels,
                  x: values,
                  textinfo: "percent initial",
                  textfont: {
                    family: "Poppins, sans-serif",
                    size: 14,
                    color: "black",
                    weight: "bold"
                  },
                  marker: {
                    color: [
                      "rgba(152, 251, 152, 0.8)", // Light green
                      "rgba(144, 238, 144, 0.8)", // Green
                      "rgba(60, 179, 113, 0.8)", // Medium green
                      "rgba(46, 139, 87, 0.8)", // Sea green
                      "rgba(0, 100, 0, 0.8)", // Dark green
                    ],
                    line: {
                      width: 1,
                      color: "#1f2937",
                    },
                  },
                  hoverinfo: "y+x+percent previous+percent initial",
                  orientation: "h",
                },
              ]}
              layout={{
                autosize: true,
                margin: { l: 120, r: 0, t: 0, b: 0 },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                font: { color: "#e5e7eb" },
                funnelmode: "stack",
                showlegend: false,
                hovermode: "closest",
                xaxis: {
                  showgrid: false,
                  zeroline: false,
                  showticklabels: false,
                },
                yaxis: {
                  showgrid: false,
                  zeroline: false,
                },
                
              }}
              config={{ responsive: true, displayModeBar: false }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <br />
          <div className="mt-2 text-xs text-center text-gray-400">
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
