// Simple fetch wrappers for API calls

/**
 * Fetch country-level call data
 * [REPLACE WITH YOUR DATA HERE]
 * Expected JSON shape matches the country_calls.json format
 */
export async function fetchCountryData() {
  try {
    const response = await fetch("/data/country_calls.json")
    if (!response.ok) {
      throw new Error("Failed to fetch country data")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching country data:", error)
    // Return dummy data for demonstration
    return {
      totalCalls: 12500,
      byGender: { Male: 7000, Female: 5500 },
      timeseries: [
        { date: "2025-01-01", calls: 300 },
        { date: "2025-01-02", calls: 320 },
        { date: "2025-01-03", calls: 340 },
        { date: "2025-01-04", calls: 360 },
        { date: "2025-01-05", calls: 380 },
        { date: "2025-01-06", calls: 400 },
        { date: "2025-01-07", calls: 420 },
      ],
      avgDuration: [
        { date: "2025-01-01", minutes: 2.4 },
        { date: "2025-01-02", minutes: 2.6 },
        { date: "2025-01-03", minutes: 2.8 },
        { date: "2025-01-04", minutes: 3.0 },
        { date: "2025-01-05", minutes: 3.2 },
        { date: "2025-01-06", minutes: 3.4 },
        { date: "2025-01-07", minutes: 3.6 },
      ],
      byCategory: {
        Anxiety: 4000,
        Depression: 3500,
        Stress: 2500,
        Relationship: 1500,
        Other: 1000,
      },
      newVsReopened: { new: 8000, reopened: 4500 },
      byWeekday: {
        Mon: 1800,
        Tue: 2000,
        Wed: 2200,
        Thu: 2100,
        Fri: 1900,
        Sat: 1300,
        Sun: 1200,
      },
      // Add new data for age groups
      byAgeGroup: {
        "Under 18": 1200,
        "18-24": 2800,
        "25-34": 3500,
        "35-44": 2500,
        "45-54": 1500,
        "55+": 1000,
      },
      // Add new data for incoming vs outgoing calls
      callsByDirection: [
        { month: "Jan", incoming: 1800, outgoing: 1200 },
        { month: "Feb", incoming: 1900, outgoing: 1300 },
        { month: "Mar", incoming: 2100, outgoing: 1500 },
        { month: "Apr", incoming: 2000, outgoing: 1400 },
        { month: "May", incoming: 2200, outgoing: 1600 },
        { month: "Jun", incoming: 2400, outgoing: 1800 },
        { month: "Jul", incoming: 2300, outgoing: 1700 },
      ],
      // Updated funnel data structure
      callFlow: {
        labels: ["Received", "Answered", "Processed", "Resolved", "Followed Up"],
        values: [256.2, 198.4, 139.2, 9.4, 5.9],
        dropoffs: [57.8, 59.2, 129.8, 3.5],
        dropoffPercentages: [22.6, 29.8, 93.2, 37.2],
      },
    }
  }
}

/**
 * Fetch state-level call data
 * [REPLACE WITH YOUR DATA HERE]
 * Expected JSON shape matches the state_calls.json format
 */
export async function fetchStateData() {
  try {
    const response = await fetch("http://localhost:8000/static/states.json")
    if (!response.ok) {
      throw new Error("Failed to fetch state data")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching state data:", error)
    // Return dummy data for demonstration
    return [
      {
        state: "IN",
        totalCalls: 2200,
        byGender: { Male: 1200, Female: 900 },
        timeseries: [
          { date: "2025-01-01", calls: 50 },
          { date: "2025-01-02", calls: 55 },
          { date: "2025-01-03", calls: 60 },
          { date: "2025-01-04", calls: 65 },
          { date: "2025-01-05", calls: 70 },
          { date: "2025-01-06", calls: 75 },
          { date: "2025-01-07", calls: 80 },
        ],
        avgDuration: [
          { date: "2025-01-01", minutes: 2.2 },
          { date: "2025-01-02", minutes: 2.4 },
          { date: "2025-01-03", minutes: 2.6 },
          { date: "2025-01-04", minutes: 2.8 },
          { date: "2025-01-05", minutes: 3.0 },
          { date: "2025-01-06", minutes: 3.2 },
          { date: "2025-01-07", minutes: 3.4 },
        ],
        byCategory: {
          Anxiety: 700,
          Depression: 600,
          Stress: 400,
          Relationship: 250,
          Other: 150,
        },
        newVsReopened: { new: 1400, reopened: 700 },
        byWeekday: {
          Mon: 300,
          Tue: 350,
          Wed: 380,
          Thu: 360,
          Fri: 320,
          Sat: 220,
          Sun: 170,
        },
        // Add new data for age groups
        byAgeGroup: {
          "Under 18": 200,
          "18-24": 450,
          "25-34": 600,
          "35-44": 450,
          "45-54": 250,
          "55+": 150,
        },
        // Add new data for incoming vs outgoing calls
        callsByDirection: [
          { month: "Jan", incoming: 300, outgoing: 200 },
          { month: "Feb", incoming: 320, outgoing: 220 },
          { month: "Mar", incoming: 350, outgoing: 250 },
          { month: "Apr", incoming: 340, outgoing: 240 },
          { month: "May", incoming: 370, outgoing: 270 },
          { month: "Jun", incoming: 400, outgoing: 300 },
          { month: "Jul", incoming: 380, outgoing: 280 },
        ],
        // Updated funnel data structure
        callFlow: {
          labels: ["Received", "Answered", "Processed", "Resolved", "Followed Up"],
          values: [42.5, 33.2, 24.6, 8.3, 5.1],
          dropoffs: [9.3, 8.6, 16.3, 3.2],
          dropoffPercentages: [21.9, 25.9, 66.3, 38.6],
        },
      },
      {
        state: "NY",
        totalCalls: 1800,
        byGender: { Male: 1000, Female: 800 },
        timeseries: [
          { date: "2025-01-01", calls: 45 },
          { date: "2025-01-02", calls: 50 },
          { date: "2025-01-03", calls: 55 },
          { date: "2025-01-04", calls: 60 },
          { date: "2025-01-05", calls: 65 },
          { date: "2025-01-06", calls: 70 },
          { date: "2025-01-07", calls: 75 },
        ],
        avgDuration: [
          { date: "2025-01-01", minutes: 2.3 },
          { date: "2025-01-02", minutes: 2.5 },
          { date: "2025-01-03", minutes: 2.7 },
          { date: "2025-01-04", minutes: 2.9 },
          { date: "2025-01-05", minutes: 3.1 },
          { date: "2025-01-06", minutes: 3.3 },
          { date: "2025-01-07", minutes: 3.5 },
        ],
        byCategory: {
          Anxiety: 600,
          Depression: 500,
          Stress: 350,
          Relationship: 200,
          Other: 150,
        },
        newVsReopened: { new: 1200, reopened: 600 },
        byWeekday: {
          Mon: 260,
          Tue: 290,
          Wed: 310,
          Thu: 300,
          Fri: 280,
          Sat: 190,
          Sun: 170,
        },
        // Add new data for age groups
        byAgeGroup: {
          "Under 18": 180,
          "18-24": 400,
          "25-34": 520,
          "35-44": 380,
          "45-54": 200,
          "55+": 120,
        },
        // Add new data for incoming vs outgoing calls
        callsByDirection: [
          { month: "Jan", incoming: 250, outgoing: 180 },
          { month: "Feb", incoming: 270, outgoing: 190 },
          { month: "Mar", incoming: 300, outgoing: 210 },
          { month: "Apr", incoming: 290, outgoing: 200 },
          { month: "May", incoming: 320, outgoing: 230 },
          { month: "Jun", incoming: 350, outgoing: 250 },
          { month: "Jul", incoming: 330, outgoing: 240 },
        ],
        // Updated funnel data structure
        callFlow: {
          labels: ["Received", "Answered", "Processed", "Resolved", "Followed Up"],
          values: [36.8, 28.5, 20.2, 7.1, 4.3],
          dropoffs: [8.3, 8.3, 13.1, 2.8],
          dropoffPercentages: [22.6, 29.1, 64.9, 39.4],
        },
      },
      {
        state: "TX",
        totalCalls: 1600,
        byGender: { Male: 900, Female: 700 },
        timeseries: [
          { date: "2025-01-01", calls: 40 },
          { date: "2025-01-02", calls: 45 },
          { date: "2025-01-03", calls: 50 },
          { date: "2025-01-04", calls: 55 },
          { date: "2025-01-05", calls: 60 },
          { date: "2025-01-06", calls: 65 },
          { date: "2025-01-07", calls: 70 },
        ],
        avgDuration: [
          { date: "2025-01-01", minutes: 2.1 },
          { date: "2025-01-02", minutes: 2.3 },
          { date: "2025-01-03", minutes: 2.5 },
          { date: "2025-01-04", minutes: 2.7 },
          { date: "2025-01-05", minutes: 2.9 },
          { date: "2025-01-06", minutes: 3.1 },
          { date: "2025-01-07", minutes: 3.3 },
        ],
        byCategory: {
          Anxiety: 550,
          Depression: 450,
          Stress: 300,
          Relationship: 180,
          Other: 120,
        },
        newVsReopened: { new: 1100, reopened: 500 },
        byWeekday: {
          Mon: 230,
          Tue: 260,
          Wed: 280,
          Thu: 270,
          Fri: 240,
          Sat: 170,
          Sun: 150,
        },
        // Add new data for age groups
        byAgeGroup: {
          "Under 18": 160,
          "18-24": 350,
          "25-34": 480,
          "35-44": 320,
          "45-54": 180,
          "55+": 110,
        },
        // Add new data for incoming vs outgoing calls
        callsByDirection: [
          { month: "Jan", incoming: 220, outgoing: 160 },
          { month: "Feb", incoming: 240, outgoing: 170 },
          { month: "Mar", incoming: 270, outgoing: 190 },
          { month: "Apr", incoming: 260, outgoing: 180 },
          { month: "May", incoming: 290, outgoing: 210 },
          { month: "Jun", incoming: 320, outgoing: 230 },
          { month: "Jul", incoming: 300, outgoing: 220 },
        ],
        // Updated funnel data structure
        callFlow: {
          labels: ["Received", "Answered", "Processed", "Resolved", "Followed Up"],
          values: [32.4, 25.1, 17.8, 6.2, 3.8],
          dropoffs: [7.3, 7.3, 11.6, 2.4],
          dropoffPercentages: [22.5, 29.1, 65.2, 38.7],
        },
      },
    ]
  }
}

/**
 * Fetch question data for country level
 * [REPLACE WITH YOUR DATA HERE]
 * Expected JSON shape varies by question type
 */
export async function fetchQuestionCountryData(questionId: number) {
  try {
    const response = await fetch(`http://localhost:8000/static/question${questionId}_country.json`)
    if (!response.ok) {
      throw new Error(`Failed to fetch country data for question ${questionId}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching country data for question ${questionId}:`, error)
    // Return dummy data based on question type
    switch (questionId) {
      case 1: // Pie chart
        return {
          labels: ["Anxiety", "Depression", "Stress", "Other"],
          values: [400, 300, 150, 50],
        }
      case 2: // Bar chart
        return {
          labels: ["Morning", "Afternoon", "Evening", "Night"],
          values: [250, 350, 400, 200],
        }
      case 3: // Scatter plot
        return {
          x: [2, 3, 4, 5, 6, 7, 8, 9, 10],
          y: [60, 65, 70, 75, 80, 85, 90, 88, 85],
          text: ["Cat A", "Cat B", "Cat C", "Cat D", "Cat E", "Cat F", "Cat G", "Cat H", "Cat I"],
        }
      case 4: // Sankey diagram
        return {
          nodes: ["Anxiety", "Depression", "Stress", "Reopened", "Resolved"],
          source: [0, 0, 1, 1, 2, 2],
          target: [3, 4, 3, 4, 3, 4],
          value: [20, 80, 30, 70, 10, 90],
        }
      case 5: // Choropleth map
        return {
          locations: ["CA", "NY", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI"],
          values: [2100, 1800, 1600, 1400, 1200, 1000, 900, 800, 700, 600],
          text: [
            "California",
            "New York",
            "Texas",
            "Florida",
            "Illinois",
            "Pennsylvania",
            "Ohio",
            "Georgia",
            "North Carolina",
            "Michigan",
          ],
        }
      // Add new chart types
      case 6: // Line chart
        return {
          x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          y1: [65, 70, 80, 75, 85, 90, 95, 100, 90, 95],
          y2: [60, 65, 70, 75, 80, 85, 90, 85, 80, 85],
          labels: ["Call Volume", "Resolution Rate"],
        }
      case 7: // Heatmap
        return {
          x: ["12am", "4am", "8am", "12pm", "4pm", "8pm"],
          y: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          z: [
            [1, 2, 5, 6, 4, 3],
            [2, 3, 6, 7, 5, 4],
            [3, 4, 7, 8, 6, 5],
            [2, 3, 6, 7, 5, 4],
            [1, 2, 5, 6, 4, 3],
            [0, 1, 3, 4, 2, 1],
            [0, 1, 2, 3, 2, 1],
          ],
        }
      case 8: // Radar chart
        return {
          categories: ["Call Volume", "Avg Duration", "Resolution Rate", "Customer Satisfaction", "Agent Performance"],
          states: ["CA", "NY", "TX"],
          values: [
            [90, 80, 85, 75, 95], // CA
            [85, 75, 80, 80, 90], // NY
            [80, 85, 75, 70, 85], // TX
          ],
        }
      case 9: // Bubble chart
        return {
          x: [800, 1200, 1600, 2000, 2400], // Call volume
          y: [2.5, 3.0, 3.5, 4.0, 4.5], // Avg duration
          size: [70, 80, 75, 85, 90], // Resolution rate
          text: ["CA", "NY", "TX", "FL", "IL"],
        }
      case 10: // Area chart
        return {
          x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          anxiety: [400, 420, 450, 470, 490, 510],
          depression: [300, 320, 340, 360, 380, 400],
          stress: [200, 210, 220, 230, 240, 250],
          other: [100, 105, 110, 115, 120, 125],
        }
      default:
        return null
    }
  }
}

/**
 * Fetch question data for state level
 * [REPLACE WITH YOUR DATA HERE]
 * Expected JSON shape varies by question type
 */
export async function fetchQuestionStateData(questionId: number, state: string) {
  try {
    const response = await fetch(`http://localhost:8000/static/question${questionId}_state.json`)
    if (!response.ok) {
      throw new Error(`Failed to fetch state data for question ${questionId}`)
    }
    const data = await response.json()
    // Filter by state if the data contains multiple states
    return data.state === state ? data : data
  } catch (error) {
    console.error(`Error fetching state data for question ${questionId}:`, error)
    // Return dummy data based on question type
    switch (questionId) {
      case 1: // Pie chart
        return {
          state: "CA",
          labels: ["Anxiety", "Depression", "Stress", "Other"],
          values: [120, 90, 60, 30],
        }
      case 2: // Bar chart
        return {
          state: "CA",
          labels: ["Morning", "Afternoon", "Evening", "Night"],
          values: [50, 70, 80, 40],
        }
      case 3: // Scatter plot
        return {
          state: "CA",
          x: [2, 3, 4, 5, 6, 7, 8, 9, 10],
          y: [55, 60, 65, 70, 75, 80, 85, 83, 80],
          text: ["Cat A", "Cat B", "Cat C", "Cat D", "Cat E", "Cat F", "Cat G", "Cat H", "Cat I"],
        }
      case 4: // Sankey diagram
        return {
          state: "CA",
          nodes: ["Anxiety", "Depression", "Stress", "Reopened", "Resolved"],
          source: [0, 0, 1, 1, 2, 2],
          target: [3, 4, 3, 4, 3, 4],
          value: [15, 85, 25, 75, 5, 95],
        }
      case 5: // Choropleth map - not applicable for state level, so we'll return counties
        return {
          state: "CA",
          locations: ["Los Angeles", "San Diego", "Orange", "Riverside", "San Bernardino"],
          values: [500, 400, 300, 250, 200],
          text: [
            "Los Angeles County",
            "San Diego County",
            "Orange County",
            "Riverside County",
            "San Bernardino County",
          ],
        }
      // Add new chart types
      case 6: // Line chart
        return {
          state: "CA",
          x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          y1: [35, 40, 45, 50, 55, 60, 65, 70, 65, 70],
          y2: [30, 35, 40, 45, 50, 55, 60, 55, 50, 55],
          labels: ["Call Volume", "Resolution Rate"],
        }
      case 7: // Heatmap
        return {
          state: "CA",
          x: ["12am", "4am", "8am", "12pm", "4pm", "8pm"],
          y: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          z: [
            [0, 1, 3, 4, 2, 1],
            [1, 2, 4, 5, 3, 2],
            [2, 3, 5, 6, 4, 3],
            [1, 2, 4, 5, 3, 2],
            [0, 1, 3, 4, 2, 1],
            [0, 0, 2, 3, 1, 0],
            [0, 0, 1, 2, 1, 0],
          ],
        }
      case 8: // Radar chart
        return {
          state: "CA",
          categories: ["Call Volume", "Avg Duration", "Resolution Rate", "Customer Satisfaction", "Agent Performance"],
          regions: ["North", "South", "East", "West"],
          values: [
            [90, 80, 85, 75, 95], // North
            [85, 75, 80, 80, 90], // South
            [80, 85, 75, 70, 85], // East
            [75, 70, 85, 90, 80], // West
          ],
        }
      case 9: // Bubble chart
        return {
          state: "CA",
          x: [200, 300, 400, 500, 600], // Call volume by region
          y: [2.0, 2.5, 3.0, 3.5, 4.0], // Avg duration
          size: [65, 75, 70, 80, 85], // Resolution rate
          text: ["North", "South", "East", "West", "Central"],
        }
      case 10: // Area chart
        return {
          state: "CA",
          x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          anxiety: [120, 130, 140, 150, 160, 170],
          depression: [90, 95, 100, 105, 110, 115],
          stress: [60, 65, 70, 75, 80, 85],
          other: [30, 32, 34, 36, 38, 40],
        }
      default:
        return null
    }
  }
}

/*
* Fetch NLP query results
*/
// export async function fetchNLPResults(query: string) {
//  try {
//    const response = await fetch("http://localhost:8000/static/nlp.json")
//    if (!response.ok) {
//     throw new Error("Failed to fetch state data")
//   }
//    return response.json()
//  } catch (error) {
//    console.error("Error fetching NLP results:", error)
//    // Return dummy data as fallback
//    return {
//      chartType: "bar",
//      title: "Sample Query Results",
//      description: "This is a sample result for demonstration purposes.",
//      data: {
//        labels: ["Category A", "Category B", "Category C", "Category D", "Category E"],
//        values: [120, 150, 200, 180, 90],
//      },
//    }
//  }
// }