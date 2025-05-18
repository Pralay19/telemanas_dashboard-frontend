
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
      newVsReopened: { new: 8001, reopened: 4500 },
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


export async function fetchStateData() {
  try {
    const response = await fetch("http://localhost:8001/static/states.json")
    // const response = await fetch("/data/states.json")
    if (!response.ok) {
      throw new Error("Failed to fetch state data")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching state data:", error)
    // Return dummy data for demonstration
    return [
      {
        state: "India",
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
        state: "Maharashtra",
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
        state: "Karnataka",
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


export async function fetchQuestionCountryData(questionId: number) {
  try {
    const response = await fetch(`http://localhost:8001/static/question${questionId}_country.json`)
    // const response = await fetch(`/data/question${questionId}_country.json`)
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
      case 3: // Repeated callers plot
        return {
          
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
          locations: [
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
          ],
          values: [2100, 1800, 1600, 1400, 1200, 1000, 900, 800, 700, 600],
          text: [
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
          ],
        }
      case 6: // Line chart
        return {
          x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          y: [65, 70, 80, 75, 85, 90, 95, 100, 90, 95],
          // y2: [60, 65, 70, 75, 80, 85, 90, 85, 80, 85],
          labels: ["Call Volume", "Resolution Rate"],
        }
      // case 7: // Heatmap
      //   return {
      //     x: ["12am", "4am", "8am", "12pm", "4pm", "8pm"],
      //     y: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //     z: [
      //       [1, 2, 5, 6, 4, 3],
      //       [2, 3, 6, 7, 5, 4],
      //       [3, 4, 7, 8, 6, 5],
      //       [2, 3, 6, 7, 5, 4],
      //       [1, 2, 5, 6, 4, 3],
      //       [0, 1, 3, 4, 2, 1],
      //       [0, 1, 2, 3, 2, 1],
      //     ],
      //   }
      // case 8: // Radar chart
      //   return {
      //     categories: ["Call Volume", "Avg Duration", "Resolution Rate", "Customer Satisfaction", "Agent Performance"],
      //     states: ["CA", "NY", "TX"],
      //     values: [
      //       [90, 80, 85, 75, 95], // CA
      //       [85, 75, 80, 80, 90], // NY
      //       [80, 85, 75, 70, 85], // TX
      //     ],
      //   }
      // case 9: // Bubble chart
      //   return {
      //     x: [800, 1200, 1600, 2000, 2400], // Call volume
      //     y: [2.5, 3.0, 3.5, 4.0, 4.5], // Avg duration
      //     size: [70, 80, 75, 85, 90], // Resolution rate
      //     text: ["CA", "NY", "TX", "FL", "IL"],
      //   }
      // case 10: // Area chart
      //   return {
      //     x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      //     anxiety: [400, 420, 450, 470, 490, 510],
      //     depression: [300, 320, 340, 360, 380, 400],
      //     stress: [200, 210, 220, 230, 240, 250],
      //     other: [100, 105, 110, 115, 120, 125],
      //   }
        case 11: // Complex Sankey
        return {
          nodes: [
            "Male",
            "Female",
            "Transgender",
            "Prefer Not To Say",
            "Other Gender",
            "Adults",
            "Children",
            "Elders",
            "Patient",
            "Caregiver",
            "Health Care Worker",
            "Others",
          ],
          source: [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7],
          target: [5, 6, 7, 5, 6, 7, 5, 7, 5, 7, 5, 7, 8, 9, 10, 8, 9, 11, 8, 9, 10],
          value: [
            70000, 10000, 5000, 50000, 8001, 3000, 15, 4, 1200, 300, 200, 28, 90000, 25000, 5000, 15000, 2000, 1000,
            6000, 2000, 300,
          ],
          nodeColors: [
            "#4f83cc",
            "#3498db",
            "#9b59b6",
            "#95a5a6",
            "#34495e",
            "#2ecc71",
            "#e74c3c",
            "#f1c40f",
            "#e67e22",
            "#8e44ad",
            "#16a085",
            "#7f8c8d",
          ],
        }
      case 12: // Violin chart
        return {
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          male: {
            min: [1500, 1800, 2000, 2200, 2400, 2500, 2600, 2500, 2400, 2300, 2100, 1900],
            q1: [2000, 2200, 2400, 2600, 2800, 2900, 3000, 2900, 2800, 2700, 2500, 2300],
            median: [2500, 2700, 2900, 3100, 3300, 3400, 3500, 3400, 3300, 3200, 3000, 2800],
            q3: [3000, 3200, 3400, 3600, 3800, 3900, 4000, 3900, 3800, 3700, 3500, 3300],
            max: [3500, 3700, 3900, 4100, 4300, 4400, 4500, 4400, 4300, 4200, 4000, 3800],
          },
          female: {
            min: [1700, 2000, 2200, 2400, 2600, 2700, 2800, 2700, 2600, 2500, 2300, 2100],
            q1: [2200, 2400, 2600, 2800, 3000, 3100, 3200, 3100, 3000, 2900, 2700, 2500],
            median: [2700, 2900, 3100, 3300, 3500, 3600, 3700, 3600, 3500, 3400, 3200, 3000],
            q3: [3200, 3400, 3600, 3800, 4000, 4100, 4200, 4100, 4000, 3900, 3700, 3500],
            max: [3700, 3900, 4100, 4300, 4500, 4600, 4700, 4600, 4500, 4400, 4200, 4000],
          },
        }
      case 13: // Calendar chart
        return {
          year: 2024,
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          values: [
            [2500, 2600, 2700, 2800, 2900, 3000, 1800],
            [2600, 2700, 2800, 2900, 3000, 1900, 1700],
            [2700, 2800, 2900, 3000, 3100, 2000, 1600],
            [2800, 2900, 3000, 3100, 3200, 2100, 1500],
            [2900, 3000, 3100, 3200, 3300, 2200, 1400],
            [3000, 3100, 3200, 3300, 3400, 2300, 1300],
            [3100, 3200, 3300, 3400, 3500, 2400, 1200],
            [3000, 3100, 3200, 3300, 3400, 2300, 1300],
            [2900, 3000, 3100, 3200, 3300, 2200, 1400],
            [2800, 2900, 3000, 3100, 3200, 2100, 1500],
            [2700, 2800, 2900, 3000, 3100, 2000, 1600],
            [2600, 2700, 2800, 2900, 3000, 1900, 1700],
          ],
        }
      default:
        return null
    }
  }
}


export async function fetchQuestionStateData(questionId: number, state: string) {
  try {
    const response = await fetch(`http://localhost:8001/static/question${questionId}_state.json`)
    // const response = await fetch(`/data/question${questionId}_state.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch state data for question ${questionId}`)
    }
    const data = await response.json()
    // console.log("Response:", data)
    return data.state === state ? data : data
  } catch (error) {
    console.error(`Error fetching state data for question ${questionId}:`, error)
    
    switch (questionId) {
      case 1: // Pie chart
      return {
        states: ["Karnataka", "Maharashtra", "Delhi"],
        values: [
          [3, 40, 50],
          [2, 35, 45],
          [7, 30, 40],
        ],
        labels: ["Category 1", "Category 2", "Category 3"],
      }
      case 2: // Bar chart
        return {
          states: ["Karnataka", "Maharashtra", "Tamil Nadu"],
          labels: ["Morning", "Afternoon", "Evening", "Night"],
          values: [
            [50, 70, 80, 40],
            [60, 80, 90, 50],
            [40, 60, 70, 30],
          ],
        }
      case 3: // Scatter plot
        return {
          states: ["Karnataka", "Maharashtra", "Tamil Nadu"],
          x: [2, 3, 4, 5, 6, 7, 8, 9, 10],
          y: [55, 60, 65, 70, 75, 80, 85, 83, 80],
          text: ["Cat A", "Cat B", "Cat C", "Cat D", "Cat E", "Cat F", "Cat G", "Cat H", "Cat I"],
        }
      case 4: // Sankey diagram
        return {
          states: ["Karnataka", "Maharashtra", "Tamil Nadu"],
          nodes: ["Anxiety", "Depression", "Stress", "Reopened", "Resolved"],
          sources: [
            [0, 0, 1, 1, 2, 2],
            [0, 0, 1, 1, 2, 2],
            [0, 0, 1, 1, 2, 2],
          ],
          targets: [
            [3, 4, 3, 4, 3, 4],
            [3, 4, 3, 4, 3, 4],
            [3, 4, 3, 4, 3, 4],
          ],
          values: [
            [15, 85, 25, 75, 5, 95],
            [20, 80, 30, 70, 10, 90],
            [10, 90, 20, 80, 5, 95],
          ],
        }
      case 5: // Choropleth map - not applicable for state level, so we'll return counties
        return {
          state: "",
          locations: [
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
          ],
          values: [500, 400, 300, 250, 200],
          text: [
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
          ],
        }
      case 6: // Line chart
        return {
          states: ["Karnataka", "Maharashtra", "Tamil Nadu"],
          x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          y: [
            [35, 40, 45, 50, 55, 60, 65, 70, 65, 70],
            [40, 45, 50, 55, 60, 65, 70, 75, 70, 75],
            [30, 35, 40, 45, 50, 55, 60, 65, 60, 65],
          ],
          labels: ["Call Volume"],
        }
      // case 7: // Heatmap
      //   return {
      //     states: ["Karnataka", "Maharashtra", "Tamil Nadu"],
      //     x: ["12am", "4am", "8am", "12pm", "4pm", "8pm"],
      //     y: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //     z_values: [
      //       [
      //         [0, 1, 3, 4, 2, 1],
      //         [1, 2, 4, 5, 3, 2],
      //         [2, 3, 5, 6, 4, 3],
      //         [1, 2, 4, 5, 3, 2],
      //         [0, 1, 3, 4, 2, 1],
      //         [0, 0, 2, 3, 1, 0],
      //         [0, 0, 1, 2, 1, 0],
      //       ],
      //       [
      //         [1, 2, 4, 5, 3, 2],
      //         [2, 3, 5, 6, 4, 3],
      //         [3, 4, 6, 7, 5, 4],
      //         [2, 3, 5, 6, 4, 3],
      //         [1, 2, 4, 5, 3, 2],
      //         [1, 1, 3, 4, 2, 1],
      //         [1, 1, 2, 3, 2, 1],
      //       ],
      //       [
      //         [0, 1, 2, 3, 1, 0],
      //         [1, 2, 3, 4, 2, 1],
      //         [2, 3, 4, 5, 3, 2],
      //         [1, 2, 3, 4, 2, 1],
      //         [0, 1, 2, 3, 1, 0],
      //         [0, 0, 1, 2, 0, 0],
      //         [0, 0, 0, 1, 0, 0],
      //       ],
      //     ],
      //   }
      // case 8: // Radar chart
      //   return {
      //     state: "Karnataka",
      //     categories: ["Call Volume", "Avg Duration", "Resolution Rate", "Customer Satisfaction", "Agent Performance"],
      //     regions: ["North", "South", "East", "West"],
      //     values: [
      //       [90, 80, 85, 75, 95], // North
      //       [85, 75, 80, 80, 90], // South
      //       [80, 85, 75, 70, 85], // East
      //       [75, 70, 85, 90, 80], // West
      //     ],
      //   }
      // case 9: // Bubble chart
      //   return {
      //     states: ["Karnataka", "Maharashtra", "Tamil Nadu"],
      //     x_values: [
      //       [200, 300, 400, 500, 600], // Karnataka
      //       [250, 350, 450, 550, 650], // Maharashtra
      //       [150, 250, 350, 450, 550], // Tamil Nadu
      //     ],
      //     y_values: [
      //       [2.0, 2.5, 3.0, 3.5, 4.0], // Karnataka
      //       [2.2, 2.7, 3.2, 3.7, 4.2], // Maharashtra
      //       [1.8, 2.3, 2.8, 3.3, 3.8], // Tamil Nadu
      //     ],
      //     size_values: [
      //       [65, 75, 70, 80, 85], // Karnataka
      //       [70, 80, 75, 85, 90], // Maharashtra
      //       [60, 70, 65, 75, 80], // Tamil Nadu
      //     ],
      //     text_values: [
      //       ["North", "South", "East", "West", "Central"], // Karnataka
      //       ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"], // Maharashtra
      //       ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"], // Tamil Nadu
      //     ],
      //   }
      // case 10: // Area chart
      //   return {
      //     states: ["Karnataka", "Maharashtra", "Tamil Nadu"],
      //     x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      //     anxiety_values: [
      //       [120, 130, 140, 150, 160, 170], // Karnataka
      //       [140, 150, 160, 170, 180, 190], // Maharashtra
      //       [100, 110, 120, 130, 140, 150], // Tamil Nadu
      //     ],
      //     depression_values: [
      //       [90, 95, 100, 105, 110, 115], // Karnataka
      //       [100, 105, 110, 115, 120, 125], // Maharashtra
      //       [80, 85, 90, 95, 100, 105], // Tamil Nadu
      //     ],
      //     stress_values: [
      //       [60, 65, 70, 75, 80, 85], // Karnataka
      //       [70, 75, 80, 85, 90, 95], // Maharashtra
      //       [50, 55, 60, 65, 70, 75], // Tamil Nadu
      //     ],
      //     other_values: [
      //       [30, 32, 34, 36, 38, 40], // Karnataka
      //       [35, 37, 39, 41, 43, 45], // Maharashtra
      //       [25, 27, 29, 31, 33, 35], // Tamil Nadu
      //     ],
      //   }
      //   case 11: // Complex Sankey
      //   return {
      //     nodes: [
      //       "Male",
      //       "Female",
      //       "Transgender",
      //       "Prefer Not To Say",
      //       "Other Gender",
      //       "Adults",
      //       "Children",
      //       "Elders",
      //       "Patient",
      //       "Caregiver",
      //       "Health Care Worker",
      //       "Others",
      //     ],
      //     source: [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7],
      //     target: [5, 6, 7, 5, 6, 7, 5, 7, 5, 7, 5, 7, 8, 9, 10, 8, 9, 11, 8, 9, 10],
      //     value: [
      //       70000, 10000, 5000, 50000, 8001, 3000, 15, 4, 1200, 300, 200, 28, 90000, 25000, 5000, 15000, 2000, 1000,
      //       6000, 2000, 300,
      //     ],
      //     nodeColors: [
      //       "#4f83cc",
      //       "#3498db",
      //       "#9b59b6",
      //       "#95a5a6",
      //       "#34495e",
      //       "#2ecc71",
      //       "#e74c3c",
      //       "#f1c40f",
      //       "#e67e22",
      //       "#8e44ad",
      //       "#16a085",
      //       "#7f8c8d",
      //     ],
      //   }
      // case 12: // Violin chart
      //   return {
      //     months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      //     male: {
      //       min: [1500, 1800, 2000, 2200, 2400, 2500, 2600, 2500, 2400, 2300, 2100, 1900],
      //       q1: [2000, 2200, 2400, 2600, 2800, 2900, 3000, 2900, 2800, 2700, 2500, 2300],
      //       median: [2500, 2700, 2900, 3100, 3300, 3400, 3500, 3400, 3300, 3200, 3000, 2800],
      //       q3: [3000, 3200, 3400, 3600, 3800, 3900, 4000, 3900, 3800, 3700, 3500, 3300],
      //       max: [3500, 3700, 3900, 4100, 4300, 4400, 4500, 4400, 4300, 4200, 4000, 3800],
      //     },
      //     female: {
      //       min: [1700, 2000, 2200, 2400, 2600, 2700, 2800, 2700, 2600, 2500, 2300, 2100],
      //       q1: [2200, 2400, 2600, 2800, 3000, 3100, 3200, 3100, 3000, 2900, 2700, 2500],
      //       median: [2700, 2900, 3100, 3300, 3500, 3600, 3700, 3600, 3500, 3400, 3200, 3000],
      //       q3: [3200, 3400, 3600, 3800, 4000, 4100, 4200, 4100, 4000, 3900, 3700, 3500],
      //       max: [3700, 3900, 4100, 4300, 4500, 4600, 4700, 4600, 4500, 4400, 4200, 4000],
      //     },
      //   }
      // case 13: // Calendar chart
      //   return {
      //     year: 2024,
      //     months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      //     days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //     values: [
      //       [2500, 2600, 2700, 2800, 2900, 3000, 1800],
      //       [2600, 2700, 2800, 2900, 3000, 1900, 1700],
      //       [2700, 2800, 2900, 3000, 3100, 2000, 1600],
      //       [2800, 2900, 3000, 3100, 3200, 2100, 1500],
      //       [2900, 3000, 3100, 3200, 3300, 2200, 1400],
      //       [3000, 3100, 3200, 3300, 3400, 2300, 1300],
      //       [3100, 3200, 3300, 3400, 3500, 2400, 1200],
      //       [3000, 3100, 3200, 3300, 3400, 2300, 1300],
      //       [2900, 3000, 3100, 3200, 3300, 2200, 1400],
      //       [2800, 2900, 3000, 3100, 3200, 2100, 1500],
      //       [2700, 2800, 2900, 3000, 3100, 2000, 1600],
      //       [2600, 2700, 2800, 2900, 3000, 1900, 1700],
      //     ],
      //   }

        case 11: // Complex Sankey
        return {
          states: ["Karnataka", "Maharashtra", "Tamil Nadu"],
          nodes: [
            "Male",
            "Female",
            "Transgender",
            "Prefer Not To Say",
            "Other Gender",
            "Adults",
            "Children",
            "Elders",
            "Patient",
            "Caregiver",
            "Health Care Worker",
            "Others",
          ],
          sources: [
            [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7],
            [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7],
            [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7],
          ],
          targets: [
            [5, 6, 7, 5, 6, 7, 5, 7, 5, 7, 5, 7, 8, 9, 10, 8, 9, 11, 8, 9, 10],
            [5, 6, 7, 5, 6, 7, 5, 7, 5, 7, 5, 7, 8, 9, 10, 8, 9, 11, 8, 9, 10],
            [5, 6, 7, 5, 6, 7, 5, 7, 5, 7, 5, 7, 8, 9, 10, 8, 9, 11, 8, 9, 10],
          ],
          values: [
            [
              25000, 4000, 2000, 18001, 3000, 1000, 5, 2, 400, 100, 70, 10, 30000, 8001, 1500, 5000, 700, 300, 2000,
              700, 100,
            ],
            [
              30000, 5000, 2500, 22000, 3500, 1200, 7, 1, 500, 120, 80, 12, 35000, 10000, 2000, 6000, 800, 400, 2500,
              800, 120,
            ],
            [
              20000, 3000, 1500, 15000, 2500, 800, 3, 1, 300, 80, 50, 6, 25000, 7000, 1500, 4000, 500, 300, 1500, 500,
              80,
            ],
          ],
          nodeColors: [
            "#4f83cc",
            "#3498db",
            "#9b59b6",
            "#95a5a6",
            "#34495e",
            "#2ecc71",
            "#e74c3c",
            "#f1c40f",
            "#e67e22",
            "#8e44ad",
            "#16a085",
            "#7f8c8d",
          ],
        }
      case 12: // Violin chart
        return {
          states: ["Karnataka", "Maharashtra", "Tamil Nadu"],
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          male: [
            {
              min: [800, 900, 1000, 1100, 1200, 1250, 1300, 1250, 1200, 1150, 1050, 950],
              q1: [1000, 1100, 1200, 1300, 1400, 1450, 1500, 1450, 1400, 1350, 1250, 1150],
              median: [1250, 1350, 1450, 1550, 1650, 1700, 1750, 1700, 1650, 1600, 1500, 1400],
              q3: [1500, 1600, 1700, 1800, 1900, 1950, 2000, 1950, 1900, 1850, 1750, 1650],
              max: [1750, 1850, 1950, 2050, 2150, 2200, 2250, 2200, 2150, 2100, 2000, 1900],
            },
            {
              min: [1000, 1100, 1200, 1300, 1400, 1450, 1500, 1450, 1400, 1350, 1250, 1150],
              q1: [1200, 1300, 1400, 1500, 1600, 1650, 1700, 1650, 1600, 1550, 1450, 1350],
              median: [1450, 1550, 1650, 1750, 1850, 1900, 1950, 1900, 1850, 1800, 1700, 1600],
              q3: [1700, 1800, 1900, 2000, 2100, 2150, 2200, 2150, 2100, 2050, 1950, 1850],
              max: [1950, 2050, 2150, 2250, 2350, 2400, 2450, 2400, 2350, 2300, 2200, 2100],
            },
            {
              min: [700, 800, 900, 1000, 1100, 1150, 1200, 1150, 1100, 1050, 950, 850],
              q1: [900, 1000, 1100, 1200, 1300, 1350, 1400, 1350, 1300, 1250, 1150, 1050],
              median: [1150, 1250, 1350, 1450, 1550, 1600, 1650, 1600, 1550, 1500, 1400, 1300],
              q3: [1400, 1500, 1600, 1700, 1800, 1850, 1900, 1850, 1800, 1750, 1650, 1550],
              max: [1650, 1750, 1850, 1950, 2050, 2100, 2150, 2100, 2050, 2000, 1900, 1800],
            },
          ],
          female: [
            {
              min: [850, 950, 1050, 1150, 1250, 1300, 1350, 1300, 1250, 1200, 1100, 1000],
              q1: [1050, 1150, 1250, 1350, 1450, 1500, 1550, 1500, 1450, 1400, 1300, 1200],
              median: [1300, 1400, 1500, 1600, 1700, 1750, 1800, 1750, 1700, 1650, 1550, 1450],
              q3: [1550, 1650, 1750, 1850, 1950, 2000, 2050, 2000, 1950, 1900, 1800, 1700],
              max: [1800, 1900, 2000, 2100, 2200, 2250, 2300, 2250, 2200, 2150, 2050, 1950],
            },
            {
              min: [1050, 1150, 1250, 1350, 1450, 1500, 1550, 1500, 1450, 1400, 1300, 1200],
              q1: [1250, 1350, 1450, 1550, 1650, 1700, 1750, 1700, 1650, 1600, 1500, 1400],
              median: [1500, 1600, 1700, 1800, 1900, 1950, 2000, 1950, 1900, 1850, 1750, 1650],
              q3: [1750, 1850, 1950, 2050, 2150, 2200, 2250, 2200, 2150, 2100, 2000, 1900],
              max: [2000, 2100, 2200, 2300, 2400, 2450, 2500, 2450, 2400, 2350, 2250, 2150],
            },
            {
              min: [750, 850, 950, 1050, 1150, 1200, 1250, 1200, 1150, 1100, 1000, 900],
              q1: [950, 1050, 1150, 1250, 1350, 1400, 1450, 1400, 1350, 1300, 1200, 1100],
              median: [1200, 1300, 1400, 1500, 1600, 1650, 1700, 1650, 1600, 1550, 1450, 1350],
              q3: [1450, 1550, 1650, 1750, 1850, 1900, 1950, 1900, 1850, 1800, 1700, 1600],
              max: [1700, 1800, 1900, 2000, 2100, 2150, 2200, 2150, 2100, 2050, 1950, 1850],
            },
          ],
        }
      case 13: // Calendar chart
        return {
          states: ["Karnataka", "Maharashtra", "Tamil Nadu"],
          year: 2024,
          months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          values: [
            [
              [1200, 1300, 1400, 1500, 1600, 900, 800],
              [1300, 1400, 1500, 1600, 1700, 1000, 900],
              [1400, 1500, 1600, 1700, 1800, 1100, 1000],
              [1500, 1600, 1700, 1800, 1900, 1200, 1100],
              [1600, 1700, 1800, 1900, 2000, 1300, 1200],
              [1700, 1800, 1900, 2000, 2100, 1400, 1300],
              [1800, 1900, 2000, 2100, 2200, 1500, 1400],
              [1700, 1800, 1900, 2000, 2100, 1400, 1300],
              [1600, 1700, 1800, 1900, 2000, 1300, 1200],
              [1500, 1600, 1700, 1800, 1900, 1200, 1100],
              [1400, 1500, 1600, 1700, 1800, 1100, 1000],
              [1300, 1400, 1500, 1600, 1700, 1000, 900],
            ],
            [
              [1500, 1600, 1700, 1800, 1900, 1200, 1100],
              [1600, 1700, 1800, 1900, 2000, 1300, 1200],
              [1700, 1800, 1900, 2000, 2100, 1400, 1300],
              [1800, 1900, 2000, 2100, 2200, 1500, 1400],
              [1900, 2000, 2100, 2200, 2300, 1600, 1500],
              [2000, 2100, 2200, 2300, 2400, 1700, 1600],
              [2100, 2200, 2300, 2400, 2500, 1800, 1700],
              [2000, 2100, 2200, 2300, 2400, 1700, 1600],
              [1900, 2000, 2100, 2200, 2300, 1600, 1500],
              [1800, 1900, 2000, 2100, 2200, 1500, 1400],
              [1700, 1800, 1900, 2000, 2100, 1400, 1300],
              [1600, 1700, 1800, 1900, 2000, 1300, 1200],
            ],
            [
              [1000, 1100, 1200, 1300, 1400, 800, 700],
              [1100, 1200, 1300, 1400, 1500, 900, 800],
              [1200, 1300, 1400, 1500, 1600, 1000, 900],
              [1300, 1400, 1500, 1600, 1700, 1100, 1000],
              [1400, 1500, 1600, 1700, 1800, 1200, 1100],
              [1500, 1600, 1700, 1800, 1900, 1300, 1200],
              [1600, 1700, 1800, 1900, 2000, 1400, 1300],
              [1500, 1600, 1700, 1800, 1900, 1300, 1200],
              [1400, 1500, 1600, 1700, 1800, 1200, 1100],
              [1300, 1400, 1500, 1600, 1700, 1100, 1000],
              [1200, 1300, 1400, 1500, 1600, 1000, 900],
              [1100, 1200, 1300, 1400, 1500, 900, 800],
            ],
          ],
        }
      case 14: // Population pyramid chart
        return {
          states: ["Karnataka", "Maharashtra", "Tamil Nadu"],
          districts: [
            ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
            ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
            ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
          ],
          male: [
            [1200, 800, 600, 500, 400],
            [1500, 1200, 900, 800, 600],
            [1300, 900, 700, 600, 500],
          ],
          female: [
            [1100, 750, 550, 450, 350],
            [1400, 1100, 850, 750, 550],
            [1200, 850, 650, 550, 450],
          ],
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
//    const response = await fetch("http://localhost:8001/static/nlp.json")
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