"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Download } from "lucide-react"
// import Plot from "react-plotly.js"
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
import { fetchQuestionCountryData, fetchQuestionStateData } from "@/utils/api"
import { Button } from "./ui/button";

//For choropleth map
import indiaGeoJSON from "./india.json"; 
let violinWidth = 1200;
interface QuestionModalProps {
  questionId: number
  selectedState: string
  onStateChange: (state: string) => void
  onClose: () => void
}

export default function QuestionModal({ questionId, selectedState, onStateChange, onClose }: QuestionModalProps) {
  const [countryData, setCountryData] = useState<any>(null)
  const [stateData, setStateData] = useState<any>(null)
  const [states, setStates] = useState<string[]>([
    "Karnataka",
    "Tripura",
    "Telangana",
    "Bihar",
    "Haryana",
    "Kerala",
    "Assam",
    "Chhattisgarh",
    "Punjab",
    "Goa",
    "Manipur",
    "Delhi",
    "Gujarat",
    "Mizoram",
    "Uttarakhand",
    "Ladakh",
    "Meghalaya",
    "Arunachal_Pradesh",
    "Nagaland",
    "Sikkim",
    "Uttar_Pradesh",
    "Odisha",
    "Jammu_Kashmir",
    "Tamil_Nadu",
    "Maharashtra",
    "Madhya_Pradesh",
    "West_Bengal",
    "Jharkhand",
    "Andhra_Pradesh",
    "Rajasthan",
    "Pondicherry",
    "Chandigarh",
    "Himachal_Pradesh",
    "Dadra_Daman_Diu",
    "Andaman_Nicobar",
    "Lakshadweep"
  ])
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
        if(questionId !== 14){
        const countryResult = await fetchQuestionCountryData(questionId)
        setCountryData(countryResult)}

        // Fetch state data for the question
        if(questionId !== 9){
        const stateResult = await fetchQuestionStateData(questionId, selectedState)
        setStateData(stateResult)

        // Update states list if available in the data
        if (stateResult && stateResult.states) {
          setStates(stateResult.states)
        }
      }
      } catch (error) {
        console.error(`Error loading data for question ${questionId}:`, error)
      } finally {
        setLoading(false)
      }
    }
    if (questionId === 3) {
      window.open("http://localhost:5000/", "_blank");
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
      if (isCountry) {
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
      } else {
        // For state data, find the selected state in the states array
        const stateIndex = data.states.findIndex(
          (state: string) => state.toLowerCase() === selectedState.toLowerCase(),
        )
        
        // If state is found, use its values, otherwise use the first state's values
        const stateValues = stateIndex !== -1 ? data.values[stateIndex] : data.values[0]

        return {
          data: [
            {
              values: stateValues,
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
            title: `${selectedState} Data`,
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
      }

      case 2: // Bar chart for time of day
        if(isCountry){
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
      } else {
        // For state data, find the selected state in the states array
        const stateIndex = data.states.findIndex(
          (state: string) => state.toLowerCase() === selectedState.toLowerCase(),
        )

        // If state is found, use its values, otherwise use the first state's values
        const stateValues = stateIndex !== -1 ? data.values[stateIndex] : data.values[0]
        // const stateValues = data.values[stateIndex] || data.values[0]
        const stateY = stateValues.map((value: number) => Math.ceil(value / 10) * 10)
        // console.log("State Y values:", stateY)
        const maxY = Math.max(...stateY);
        const top = Math.ceil(maxY / 10) * 10;

        // Dynamically calculate dtick: divide maxY by desired number of ticks (e.g., 5 or 6)
        const desiredTicks = 6;
        const dt = Math.ceil(top / desiredTicks / 10) * 10;
        return {
          data: [
            {
              x: data.labels,
              y: stateY,
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
              tickmode: "linear",
              tick0: 0,
              dtick: dt,
              minor: {
                showgrid: false,   // no minor‐gridlines
                showticklabels: false  // no minor tick labels
              },
              showgrid: true,
              ticks: "outside"
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
      }

      // case 3: // Scatter plot for duration vs resolution
      //   return {
      //     data: [
      //       {
      //         x: data.x,
      //         y: data.y,
      //         mode: "markers",
      //         type: "scatter",
      //         marker: {
      //           color: "#6366f1",
      //           size: 10,
      //           opacity: 0.7,
      //           line: {
      //             color: "#8b5cf6",
      //             width: 1,
      //           },
      //         },
      //         text: data.text,
      //         name: "Resolution Rate",
      //       },
      //     ],
      //     layout: {
      //       title: title,
      //       autosize: true,
      //       margin: { l: 40, r: 20, t: 40, b: 40 },
      //       paper_bgcolor: "rgba(0,0,0,0)",
      //       plot_bgcolor: "rgba(0,0,0,0)",
      //       font: { color: "#e5e7eb" },
      //       xaxis: {
      //         gridcolor: "#1f2937",
      //         zerolinecolor: "#1f2937",
      //         title: "Call Duration (minutes)",
      //       },
      //       yaxis: {
      //         gridcolor: "#1f2937",
      //         zerolinecolor: "#1f2937",
      //         title: "Resolution Rate (%)",
      //       },
      //       showlegend: true,
      //       legend: {
      //         bgcolor: "rgba(26, 34, 51, 0.7)",
      //         bordercolor: "#4b5563",
      //         borderwidth: 1,
      //         font: { color: "#e5e7eb" },
      //       },
      //     },
      //   }

      // case 4: // Sankey diagram for reopened cases
      // if (isCountry) {
      //   return {
      //     data: [
      //       {
      //         type: "sankey",
      //         orientation: "h",
      //         node: {
      //           pad: 15,
      //           thickness: 20,
      //           line: {
      //             color: "black",
      //             width: 0.5,
      //           },
      //           label: data.nodes,
      //           color: data.nodeColors || ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#10b981"],
      //         },
      //         link: {
      //           source: data.source,
      //           target: data.target,
      //           value: data.value,
      //           color: data.linkColors || "rgba(99, 102, 241, 0.4)",
      //         },
      //       },
      //     ],
      //     layout: {
      //       title: title,
      //       autosize: true,
      //       margin: { l: 0, r: 0, t: 40, b: 0 },
      //       paper_bgcolor: "rgba(0,0,0,0)",
      //       plot_bgcolor: "rgba(0,0,0,0)",
      //       font: { color: "#e5e7eb" },
      //       legend: {
      //         bgcolor: "rgba(26, 34, 51, 0.7)",
      //         bordercolor: "#4b5563",
      //         borderwidth: 1,
      //         font: { color: "#e5e7eb" },
      //       },
      //     },
      //   }
      // } 
      

      case 6: // Choropleth map for India
      if(selectedState === "India"){return null}
      if (isCountry) {
        return {
          data: [
            {
              type: "choropleth",
              geojson: indiaGeoJSON, // Path to the GeoJSON file
              featureidkey: "properties.st_nm",
              locationmode: "geojson-id", 
              locations: data.locations,
              z: data.values,
              text: data.text,
              colorscale: "hot",// Use a different colorscale
              colorbar: {
                title: "Complaint Volume",
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
              hovertemplate: "%{text}<br>Complaints: %{z}<extra></extra>",
            },
          ],
          layout: {
            title: title,
            geo: {
              scope: "asia", // Use a broader scope
              center: { lon: 80, lat: 22 }, // Center on India
              projection: { scale: 5 }, // Adjust scale to fit India
              showland: true,
              landcolor: "rgb(20, 20, 20)",
              showocean: true,
              oceancolor: "rgb(30, 30, 30)",
              showlakes: false,
              bgcolor: "rgba(0,0,0,0)",
            },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#e5e7eb" },
            margin: { l: 0, r: 0, t: 40, b: 0 },
          },
        }
      } else {
        // Find index of the selected state
        const stateIndex = data.states.findIndex(
          (state) => state.toLowerCase() === selectedState.toLowerCase()
        );
        
        // Get the 5 districts and values for that state
        if (stateIndex === -1) {
          console.warn(`State "${selectedState}" not found in data.states`);
        }
        const districtLabels = data.labels[stateIndex];
        const districtValues = data.values[stateIndex];
      
        return {
          data: [
            {
              x: districtLabels,       // districts as x-axis
              y: districtValues,       // complaint counts as y-axis
              type: "bar",
              text: districtLabels,    // use districts in hover text
              marker: {
                color: "#6366f1",
                opacity: 0.8,
              },
              hovertemplate: "%{text}<br>Complaints: %{y}<extra></extra>",
            },
          ],
          layout: {
            title: `${selectedState} Districts`,
            autosize: true,
            margin: { l: 50, r: 20, t: 40, b: 40 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#e5e7eb" },
            xaxis: {
              title: "District",
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
            },
            yaxis: {
              title: "Number of Complaints",
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
            },
            showlegend: false,
          },
        };
      }

      // Add new chart types
      case 2: // Line chart for call volumes and resolution rates over time
      
      if (isCountry) {
        return {
          data: [
            {
              x: data.x,
              y: data.y,
              type: "scatter",
              mode: "lines+markers",
              name: data.name || "Call Volume",
              line: {
                color: "#6366f1",
                width: 3,
              },
              marker: {
                size: 8,
                color: "#6366f1",
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
              title: "Month",
              gridcolor: "#1f2937",
            },
            yaxis: {
              title: "Call Volume",
              titlefont: { color: "#6366f1" },
              tickfont: { color: "#6366f1" },
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
      } else {
        // For state data, find the selected state in the states array
        // For state data, find the selected state in the states array
        const stateIndex = data.states
        ? data.states.findIndex((state: string) => state.toLowerCase() === selectedState.toLowerCase())
        : -1

      // If state is found, use its values, otherwise use the data as is
      const stateY = stateIndex !== -1 && data.y ? data.y[stateIndex] : data.y
      // const stateY2 = stateIndex !== -1 && data.y2_values ? data.y2_values[stateIndex] : data.y2

      return {
        data: [
          {
            x: data.x,
            y: stateY,
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
            gridcolor: "#1f2937",
            zerolinecolor: "#1f2937",
            autorange: false,
            range:     [0, top],

            tickmode: "linear",
            tick0:     0,
            dtick:    10,

            minor: {
              showgrid:       false,
              showticklabels: false,
            },

            showgrid: true,
            ticks:    "outside",
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
      }

      // case 7: // Heatmap for call durations across hours
      //   return {
      //     data: [
      //       {
      //         z: data.z,
      //         x: data.x,
      //         y: data.y,
      //         type: "heatmap",
      //         colorscale: [
      //           [0, "#1a2233"],
      //           [0.2, "#374151"],
      //           [0.4, "#6366f1"],
      //           [0.6, "#8b5cf6"],
      //           [0.8, "#ec4899"],
      //           [1, "#f43f5e"],
      //         ],
      //         showscale: true,
      //         colorbar: {
      //           title: "Call Duration (min)",
      //           thickness: 20,
      //           outlinewidth: 0,
      //           bordercolor: "#4b5563",
      //           tickfont: { color: "#e5e7eb" },
      //           titlefont: { color: "#e5e7eb" },
      //         },
      //       },
      //     ],
      //     layout: {
      //       title: title,
      //       autosize: true,
      //       margin: { l: 50, r: 50, t: 40, b: 40 },
      //       paper_bgcolor: "rgba(0,0,0,0)",
      //       plot_bgcolor: "rgba(0,0,0,0)",
      //       font: { color: "#e5e7eb" },
      //       xaxis: {
      //         title: "Time of Day",
      //         gridcolor: "#1f2937",
      //       },
      //       yaxis: {
      //         title: "Day of Week",
      //         gridcolor: "#1f2937",
      //       },
      //       showlegend: false,
      //     },
      //   }

      // case 8: // Radar chart for state comparison
      //   return {
      //     data: isCountry
      //       ? data.states.map((state: string, index: number) => ({
      //           type: "scatterpolar",
      //           r: data.values[index],
      //           theta: data.categories,
      //           fill: "toself",
      //           name: state,
      //           line: {
      //             color: ["#6366f1", "#8b5cf6", "#ec4899"][index % 3],
      //           },
      //         }))
      //       : data.regions.map((region: string, index: number) => ({
      //           type: "scatterpolar",
      //           r: data.values[index],
      //           theta: data.categories,
      //           fill: "toself",
      //           name: region,
      //           line: {
      //             color: ["#6366f1", "#8b5cf6", "#ec4899", "#10b981"][index % 4],
      //           },
      //         })),
      //     layout: {
      //       title: title,
      //       autosize: true,
      //       margin: { l: 40, r: 40, t: 40, b: 40 },
      //       paper_bgcolor: "rgba(0,0,0,0)",
      //       plot_bgcolor: "rgba(0,0,0,0)",
      //       font: { color: "#e5e7eb" },
      //       polar: {
      //         radialaxis: {
      //           visible: true,
      //           range: [0, 100],
      //           gridcolor: "#1f2937",
      //         },
      //         angularaxis: {
      //           gridcolor: "#1f2937",
      //         },
      //         bgcolor: "rgba(0,0,0,0)",
      //       },
      //       showlegend: true,
      //       legend: {
      //         bgcolor: "rgba(26, 34, 51, 0.7)",
      //         bordercolor: "#4b5563",
      //         borderwidth: 1,
      //         font: { color: "#e5e7eb" },
      //       },
      //     },
      //   }

      // case 4: // Bubble chart
      //   return {
      //     data: [
      //       {
      //         x: data.x,
      //         y: data.y,
      //         mode: "markers",
      //         marker: {
      //           size: data.size,
      //           sizemode: "diameter",
      //           sizeref: 0.1,
      //           color: data.size,
      //           colorscale: "Viridis",
      //           showscale: true,
      //           colorbar: {
      //             title: "Resolution Rate (%)",
      //             thickness: 20,
      //             outlinewidth: 0,
      //             bordercolor: "#4b5563",
      //             tickfont: { color: "#e5e7eb" },
      //             titlefont: { color: "#e5e7eb" },
      //           },
      //         },
      //         text: data.text,
      //         hovertemplate:
      //           "<b>%{text}</b><br>Call Volume: %{x}<br>Avg Duration: %{y} min<br>Resolution Rate: %{marker.size}%",
      //       },
      //     ],
      //     layout: {
      //       title: title,
      //       autosize: true,
      //       margin: { l: 50, r: 50, t: 40, b: 40 },
      //       paper_bgcolor: "rgba(0,0,0,0)",
      //       plot_bgcolor: "rgba(0,0,0,0)",
      //       font: { color: "#e5e7eb" },
      //       xaxis: {
      //         title: "Call Volume",
      //         gridcolor: "#1f2937",
      //         zerolinecolor: "#1f2937",
      //       },
      //       yaxis: {
      //         title: "Average Call Duration (minutes)",
      //         gridcolor: "#1f2937",
      //         zerolinecolor: "#1f2937",
      //       },
      //       showlegend: false,
      //     },
      //   }

      // case 10: // Area chart
      // if (isCountry) {
      //   return {
      //     data: [
      //       {
      //         x: data.x,
      //         y: data.anxiety,
      //         type: "scatter",
      //         mode: "lines",
      //         name: "Anxiety",
      //         stackgroup: "one",
      //         fillcolor: "rgba(99, 102, 241, 0.6)",
      //         line: { color: "#6366f1", width: 1 },
      //       },
      //       {
      //         x: data.x,
      //         y: data.depression,
      //         type: "scatter",
      //         mode: "lines",
      //         name: "Depression",
      //         stackgroup: "one",
      //         fillcolor: "rgba(139, 92, 246, 0.6)",
      //         line: { color: "#8b5cf6", width: 1 },
      //       },
      //       {
      //         x: data.x,
      //         y: data.stress,
      //         type: "scatter",
      //         mode: "lines",
      //         name: "Stress",
      //         stackgroup: "one",
      //         fillcolor: "rgba(236, 72, 153, 0.6)",
      //         line: { color: "#ec4899", width: 1 },
      //       },
      //       {
      //         x: data.x,
      //         y: data.other,
      //         type: "scatter",
      //         mode: "lines",
      //         name: "Other",
      //         stackgroup: "one",
      //         fillcolor: "rgba(244, 63, 94, 0.6)",
      //         line: { color: "#f43f5e", width: 1 },
      //       },
      //     ],
      //     layout: {
      //       title: title,
      //       autosize: true,
      //       margin: { l: 50, r: 20, t: 40, b: 40 },
      //       paper_bgcolor: "rgba(0,0,0,0)",
      //       plot_bgcolor: "rgba(0,0,0,0)",
      //       font: { color: "#e5e7eb" },
      //       xaxis: {
      //         title: "Month",
      //         gridcolor: "#1f2937",
      //         zerolinecolor: "#1f2937",
      //       },
      //       yaxis: {
      //         title: "Number of Calls",
      //         gridcolor: "#1f2937",
      //         zerolinecolor: "#1f2937",
      //       },
      //       showlegend: true,
      //       legend: {
      //         bgcolor: "rgba(26, 34, 51, 0.7)",
      //         bordercolor: "#4b5563",
      //         borderwidth: 1,
      //         font: { color: "#e5e7eb" },
      //       },
      //     },
      //   }
      // } else {
      //   // For state data, find the selected state in the states array
      //   const stateIndex = data.states
      //     ? data.states.findIndex((state: string) => state.toLowerCase() === selectedState.toLowerCase())
      //     : -1

      //   // If state is found, use its values, otherwise use the data as is
      //   const stateAnxiety = stateIndex !== -1 && data.anxiety_values ? data.anxiety_values[stateIndex] : data.anxiety
      //   const stateDepression =
      //     stateIndex !== -1 && data.depression_values ? data.depression_values[stateIndex] : data.depression
      //   const stateStress = stateIndex !== -1 && data.stress_values ? data.stress_values[stateIndex] : data.stress
      //   const stateOther = stateIndex !== -1 && data.other_values ? data.other_values[stateIndex] : data.other

      //   return {
      //     data: [
      //       {
      //         x: data.x,
      //         y: stateAnxiety,
      //         type: "scatter",
      //         mode: "lines",
      //         name: "Anxiety",
      //         stackgroup: "one",
      //         fillcolor: "rgba(99, 102, 241, 0.6)",
      //         line: { color: "#6366f1", width: 1 },
      //       },
      //       {
      //         x: data.x,
      //         y: stateDepression,
      //         type: "scatter",
      //         mode: "lines",
      //         name: "Depression",
      //         stackgroup: "one",
      //         fillcolor: "rgba(139, 92, 246, 0.6)",
      //         line: { color: "#8b5cf6", width: 1 },
      //       },
      //       {
      //         x: data.x,
      //         y: stateStress,
      //         type: "scatter",
      //         mode: "lines",
      //         name: "Stress",
      //         stackgroup: "one",
      //         fillcolor: "rgba(236, 72, 153, 0.6)",
      //         line: { color: "#ec4899", width: 1 },
      //       },
      //       {
      //         x: data.x,
      //         y: stateOther,
      //         type: "scatter",
      //         mode: "lines",
      //         name: "Other",
      //         stackgroup: "one",
      //         fillcolor: "rgba(244, 63, 94, 0.6)",
      //         line: { color: "#f43f5e", width: 1 },
      //       },
      //     ],
      //     layout: {
      //       title: title,
      //       autosize: true,
      //       margin: { l: 50, r: 20, t: 40, b: 40 },
      //       paper_bgcolor: "rgba(0,0,0,0)",
      //       plot_bgcolor: "rgba(0,0,0,0)",
      //       font: { color: "#e5e7eb" },
      //       xaxis: {
      //         title: "Month",
      //         gridcolor: "#1f2937",
      //         zerolinecolor: "#1f2937",
      //       },
      //       yaxis: {
      //         title: "Number of Calls",
      //         gridcolor: "#1f2937",
      //         zerolinecolor: "#1f2937",
      //       },
      //       showlegend: true,
      //       legend: {
      //         bgcolor: "rgba(26, 34, 51, 0.7)",
      //         bordercolor: "#4b5563",
      //         borderwidth: 1,
      //         font: { color: "#e5e7eb" },
      //       },
      //     },
      //   }
      // }
      case 11: // Complex Sankey diagram
        if (isCountry) {
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
                  color: data.nodeColors,
                },
                link: {
                  source: data.source,
                  target: data.target,
                  value: data.value,
                  color: "rgba(100, 100, 100, 0.4)",
                },
              },
            ],
            layout: {
              title: "Self/Care-takers/Health Care Workers Calls by Gender and Age",
              autosize: true,
              margin: { l: 0, r: 0, t: 40, b: 0 },
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#e5e7eb" },
              showlegend: false,
            },
          }
        } else {
          // For state data, find the selected state in the states array
          const stateIndex = data.states
            ? data.states.findIndex((state: string) => state.toLowerCase() === selectedState.toLowerCase())
            : -1

          // If state is found, use its values, otherwise use the first state's values
          const stateSources = stateIndex !== -1 && data.sources ? data.sources[stateIndex] : data.sources[0]
          const stateTargets = stateIndex !== -1 && data.targets ? data.targets[stateIndex] : data.targets[0]
          const stateValues = stateIndex !== -1 && data.values ? data.values[stateIndex] : data.values[0]

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
                  color: data.nodeColors,
                },
                link: {
                  source: stateSources,
                  target: stateTargets,
                  value: stateValues,
                  color: "rgba(100, 100, 100, 0.4)",
                },
              },
            ],
            layout: {
              title: `${selectedState}: Self/Care-takers/Health Care Workers Calls`,
              autosize: true,
              margin: { l: 0, r: 0, t: 40, b: 0 },
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#e5e7eb" },
              showlegend: false,
            },
          }
        }

      case 12: // Violin chart
        
        if (isCountry) {
          // Create violin plots for beg_end and middle data
          const begEndViolins = data.months.map((month: string, i: number) => ({
            type: "violin",
            x: Array(5).fill(month),
            y: [
              data.beg_end.min[i],
              data.beg_end.q1[i],
              data.beg_end.median[i],
              data.beg_end.q3[i],
              data.beg_end.max[i],
            ],
            name: "Beginning/End of Month",
            box: {
              visible: true,
            },
            line: {
              color: "#3b82f6",
            },
            meanline: {
              visible: true,
            },
            legendgroup: "Beginning/End",
            scalegroup: "Beginning/End",
            side: "negative",
            points: false,
            showlegend: i === 0, // Show legend only for the first violin
          }))

          const middleViolins = data.months.map((month: string, i: number) => ({
            type: "violin",
            x: Array(5).fill(month),
            y: [data.middle.min[i], data.middle.q1[i], data.middle.median[i], data.middle.q3[i], data.middle.max[i]],
            name: "Middle of Month",
            box: {
              visible: true,
            },
            line: {
              color: "#ec4899",
            },
            meanline: {
              visible: true,
            },
            legendgroup: "Middle",
            scalegroup: "Middle",
            side: "positive",
            points: false,
            showlegend: i=== 0, // Show legend only for the first violin
          }))

          return {
            data: [...begEndViolins, ...middleViolins],
            layout: {
              title: "Monthly Call Volume Distribution by Time Period - National",
              autosize: true,
              margin: { l: 60, r: 60, t: 50, b: 50 },
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#e5e7eb", size: 14 },
              xaxis: {
                title: "Month",
                gridcolor: "#1f2937",
                tickfont: { size: 12 },
              },
              yaxis: {
                title: "Call Volume",
                gridcolor: "#1f2937",
                zerolinecolor: "#1f2937",
                tickfont: { size: 12 },
              },
              violinmode: "overlay",
              showlegend: true,
              legend: {
                bgcolor: "rgba(26, 34, 51, 0.7)",
                bordercolor: "#4b5563",
                borderwidth: 1,
                font: { color: "#e5e7eb", size: 12 },
                y: 1.1,
                x: 0.5,
                xanchor: "center",
                orientation: "h",
              },
            },
          }
        } else {
          // For state data, find the selected state in the states array
          const stateIndex = data.states
            ? data.states.findIndex((state: string) => state.toLowerCase() === selectedState.toLowerCase())
            : -1

          // If state is found, use its values, otherwise use the first state's values
          const stateBegEnd = stateIndex !== -1 ? data.beg_end[stateIndex] : data.beg_end[0]
          const stateMiddle = stateIndex !== -1 ? data.middle[stateIndex] : data.middle[0]

          // Create violin plots for beg_end and middle data
          const begEndViolins = data.months.map((month: string, i: number) => ({
            type: "violin",
            x: Array(5).fill(month),
            y: [stateBegEnd.min[i], stateBegEnd.q1[i], stateBegEnd.median[i], stateBegEnd.q3[i], stateBegEnd.max[i]],
            name: "Beginning/End of Month",
            box: {
              visible: true,
            },
            line: {
              color: "#3b82f6",
            },
            meanline: {
              visible: true,
            },
            legendgroup: "Beginning/End",
            scalegroup: "Beginning/End",
            side: "negative",
            points: false,
            showlegend: i === 0, // Show legend only for the first violin
          }))

          const middleViolins = data.months.map((month: string, i: number) => ({
            type: "violin",
            x: Array(5).fill(month),
            y: [stateMiddle.min[i], stateMiddle.q1[i], stateMiddle.median[i], stateMiddle.q3[i], stateMiddle.max[i]],
            name: "Middle of Month",
            box: {
              visible: true,
            },
            line: {
              color: "#ec4899",
            },
            meanline: {
              visible: true,
            },
            legendgroup: "Middle",
            scalegroup: "Middle",
            side: "positive",
            points: false,
            showlegend: i === 0, // Show legend only for the first violin
          }))

          return {
            data: [...begEndViolins, ...middleViolins],
            layout: {
              title: `${selectedState}: Monthly Call Volume Distribution by Time Period`,
              autosize: true,
              margin: { l: 60, r: 60, t: 50, b: 50 },
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#e5e7eb", size: 14 },
              xaxis: {
                title: "Month",
                gridcolor: "#1f2937",
                tickfont: { size: 12 },
              },
              yaxis: {
                title: "Call Volume",
                gridcolor: "#1f2937",
                zerolinecolor: "#1f2937",
                tickfont: { size: 12 },
              },
              violinmode: "overlay",
              showlegend: true,
              legend: {
                bgcolor: "rgba(26, 34, 51, 0.7)",
                bordercolor: "#4b5563",
                borderwidth: 1,
                font: { color: "#e5e7eb", size: 12 },
                y: 1.1,
                x: 0.5,
                xanchor: "center",
                orientation: "h",
              },
            },
          }
        }

      case 13: // Calendar chart
        if (isCountry) {
          // Create a heatmap for the calendar
          return {
            data: [
              {
                z: data.values,
                x: Array.from({ length: 7 }, (_, i) => data.days[i]),
                y: Array.from({ length: 12 }, (_, i) => data.months[i]),
                type: "heatmap",
                colorscale: [
                  [0, "#e5f5e0"],
                  [0.25, "#c7e9c0"],
                  [0.5, "#a1d99b"],
                  [0.75, "#74c476"],
                  [1, "#31a354"],
                ],
                showscale: true,
                colorbar: {
                  title: "Call Volume",
                  thickness: 20,
                  outlinewidth: 0,
                  bordercolor: "#4b5563",
                  tickfont: { color: "#e5e7eb" },
                  titlefont: { color: "#e5e7eb" },
                },
              },
            ],
            layout: {
              title: `Call Volume Calendar for ${data.year}`,
              autosize: true,
              margin: { l: 50, r: 50, t: 40, b: 40 },
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#e5e7eb" },
              xaxis: {
                title: "Day of Week",
                gridcolor: "#1f2937",
              },
              yaxis: {
                title: "Month",
                gridcolor: "#1f2937",
                autorange: "reversed",
              },
              showlegend: false,
              annotations: [
                {
                  x: 0.5,
                  y: -0.15,
                  xref: "paper",
                  yref: "paper",
                  text: "Number of Calls Made Monthly in 2024",
                  showarrow: false,
                  font: {
                    size: 14,
                    color: "#e5e7eb",
                  },
                },
              ],
            },
          }
        } else {
          // For state data, find the selected state in the states array
          const stateIndex = data.states
            ? data.states.findIndex((state: string) => state.toLowerCase() === selectedState.toLowerCase())
            : -1

          // If state is found, use its values, otherwise use the first state's values
          const stateValues = stateIndex !== -1 && data.values ? data.values[stateIndex] : data.values[0]

          return {
            data: [
              {
                z: stateValues,
                x: Array.from({ length: 7 }, (_, i) => data.days[i]),
                y: Array.from({ length: 12 }, (_, i) => data.months[i]),
                type: "heatmap",
                colorscale: [
                  [0, "#e5f5e0"],
                  [0.25, "#c7e9c0"],
                  [0.5, "#a1d99b"],
                  [0.75, "#74c476"],
                  [1, "#31a354"],
                ],
                showscale: true,
                colorbar: {
                  title: "Call Volume",
                  thickness: 20,
                  outlinewidth: 0,
                  bordercolor: "#4b5563",
                  tickfont: { color: "#e5e7eb" },
                  titlefont: { color: "#e5e7eb" },
                },
              },
            ],
            layout: {
              title: `${selectedState}: Call Volume Calendar for ${data.year}`,
              autosize: true,
              margin: { l: 50, r: 50, t: 40, b: 40 },
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#e5e7eb" },
              xaxis: {
                title: "Day of Week",
                gridcolor: "#1f2937",
              },
              yaxis: {
                title: "Month",
                gridcolor: "#1f2937",
                autorange: "reversed",
              },
              showlegend: false,
              annotations: [
                {
                  x: 0.5,
                  y: -0.15,
                  xref: "paper",
                  yref: "paper",
                  text: "Number of Calls Made Monthly in 2024",
                  showarrow: false,
                  font: {
                    size: 14,
                    color: "#e5e7eb",
                  },
                },
              ],
            },
          }
        }

      case 14: // Population pyramid chart
        // This chart doesn't have a country version, only state
        // For state data, find the selected state in the states array
        if (!data || !data.states || !data.districts || !data.male || !data.female) {
          console.error("Missing required data for population pyramid chart")
          return {
            data: [
              {
                y: ["No data available"],
                x: [0],
                type: "bar",
                orientation: "h",
                marker: { color: "#3b82f6" },
              },
            ],
            layout: {
              title: `${selectedState}: No data available`,
              autosize: true,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#e5e7eb" },
            },
          }
        }
        // For state data, find the selected state in the states array
        const stateIndex = data.states.findIndex((state: string) => state.toLowerCase() === selectedState.toLowerCase())

        if (stateIndex === -1) {
          console.warn(`State "${selectedState}" not found in data.states`)
          return {
            data: [
              {
                y: ["State not found"],
                x: [0],
                type: "bar",
                orientation: "h",
                marker: { color: "#3b82f6" },
              },
            ],
            layout: {
              title: `${selectedState}: State not found in data`,
              autosize: true,
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: { color: "#e5e7eb" },
            },
          }
        }

        // If state is found, use its values
        const stateDistricts = data.districts[stateIndex]
        const stateMale = data.male[stateIndex]
        const stateFemale = data.female[stateIndex]

        return {
          data: [
            {
              y: stateDistricts,
              x: stateMale.map((val: number) => -val), // Negative values for male
              type: "bar",
              name: "Male",
              orientation: "h",
              marker: {
                color: "#3b82f6",
              },
              hoverinfo: "x+name",
              hovertemplate: "Male: %{x:,.0f}<extra></extra>",
            },
            {
              y: stateDistricts,
              x: stateFemale,
              type: "bar",
              name: "Female",
              orientation: "h",
              marker: {
                color: "#ec4899",
              },
              hoverinfo: "x+name",
              hovertemplate: "Female: %{x:,.0f}<extra></extra>",
            },
          ],
          layout: {
            title: `${selectedState}: Call Distribution by District and Gender`,
            autosize: true,
            margin: { l: 100, r: 20, t: 40, b: 40 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: { color: "#e5e7eb" },
            barmode: "relative",
            bargap: 0.1,
            xaxis: {
              title: "Number of Calls",
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
              tickformat: ",d",
              hoverformat: ",d",
            },
            yaxis: {
              title: "District",
              gridcolor: "#1f2937",
              zerolinecolor: "#1f2937",
            },
            showlegend: true,
            legend: {
              bgcolor: "rgba(26, 34, 51, 0.7)",
              bordercolor: "#4b5563",
              borderwidth: 1,
              font: { color: "#e5e7eb" },
              x: 0.5,
              y: 1.1,
              xanchor: "center",
              orientation: "h",
            },
            annotations: [
              {
                x: -Math.max(...stateMale) / 2,
                y: stateDistricts.length + 0.5,
                text: "Male",
                showarrow: false,
                font: {
                  color: "#3b82f6",
                },
              },
              {
                x: Math.max(...stateFemale) / 2,
                y: stateDistricts.length + 0.5,
                text: "Female",
                showarrow: false,
                font: {
                  color: "#ec4899",
                },
              },
            ],
          },
        }
      default:
        return null
    }
  }

  const countryChartConfig = getChartConfig(countryData, true)
  const stateChartConfig = getChartConfig(stateData, false)

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-[#1a2233] rounded-[1.5rem] shadow-2xl w-full max-w-6xl my-8 flex flex-col max-h-[90vh]">
          {questionId !== 3 ? (
            <>
              <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <h2 className="text-xl font-bold">Question {questionId} Analysis</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full">
                  <X size={20} />
                </button>
              </div>
  
              <div className="p-4 overflow-y-auto flex-1">
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
                ) : questionId===12 ? (// ——— Special layout for Q12 ———
                  <div className="flex flex-col gap-8">
                    {/* Country violin, on top */}
                    <div className="overflow-x-auto">
                      <div style={{ width: violinWidth, minWidth: '100%' }}>
                        {countryChartConfig && (
                          <Plot
                            ref={countryChartRef}
                            data={countryChartConfig.data}
                            layout={{
                              ...countryChartConfig.layout,
                              autosize: false,
                              width: violinWidth,
                              height: 400
                            }}
                            config={{ responsive: false, displayModeBar: false }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => downloadChartAsPng(countryChartRef, "national")}
                        disabled={downloading}
                        className={`flex items-center gap-2 px-4 py-2 ${
                          downloading ? "bg-gray-600" : "bg-purple-700 hover:bg-purple-600"
                        } rounded-md text-sm`}
                      >
                        <Download size={16} />
                        {downloading ? "Downloading..." : "Download Country Chart"}
                      </button>
                    </div>
                
                    {/* State violin, below with space */}
                    <div className="overflow-x-auto">
                      <div style={{ width: violinWidth, minWidth: '100%' }}>
                        {stateChartConfig && (
                          <Plot
                            ref={stateChartRef}
                            data={stateChartConfig.data}
                            layout={{
                              ...stateChartConfig.layout,
                              autosize: false,
                              width: violinWidth,
                              height: 400
                            }}
                            config={{ responsive: false, displayModeBar: false }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => downloadChartAsPng(stateChartRef, "state")}
                        disabled={downloading}
                        className={`flex items-center gap-2 px-4 py-2 ${
                          downloading ? "bg-gray-600" : "bg-purple-700 hover:bg-purple-600"
                        } rounded-md text-sm`}
                      >
                        <Download size={16} />
                        {downloading ? "Downloading..." : "Download State Chart"}
                      </button>
                    </div>
                  </div>
                  ) :(
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left pane: Country chart */}
                    {questionId !== 14 && (
                      <div className={`bg-[#242f47] rounded-xl p-4 ${questionId === 9 ? "md:col-span-2" : ""}`}>
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
                    )}
  
                    {/* Right pane: State chart */}
                    {questionId !==9  && (
                    <div className={`bg-[#242f47] rounded-xl p-4 ${
                        questionId === 14 ? "md:col-span-2" : ""
                      }`}
                    >
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
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <div className="text-xl font-bold">Number of repeated callers:</div>
              <button
                onClick={() => window.open("http://localhost:8001/", "_blank")}
                className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-md text-sm"
              >
                View Analysis
              </button>
              <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full">
                <X size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}  
