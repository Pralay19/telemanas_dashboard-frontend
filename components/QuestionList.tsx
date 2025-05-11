"use client"

interface QuestionListProps {
  onQuestionSelect: (questionId: number) => void
}

export default function QuestionList({ onQuestionSelect }: QuestionListProps) {
  
  const questions = [
    {
      id: 1,
      text: "What is the distribution of age across different states?(Example Chart)",
      chartType: "Pie",
    },
    {
      id: 2,
      text: "How does call volume vary by time of day across different states?",
      chartType: "Bar",
    },
    {
      id: 3,
      text: "What is the number of repeated callers India vs States?",
      chartType: "",
    },
    {
      id: 4,
      text: "Transfer of calls across States?",
      chartType: "Sankey",
    },
    {
      id: 5,
      text: "What is the geographical distribution of calls by state and for each state top districts?",
      chartType: "Choropleth",
    },
    // Add new questions with different chart types
    {
      id: 6,
      text: "Variation of call counts in terms of 24 hour time window?",
      chartType: "Line",
    },
    // {
    //   id: 7,
    //   text: "What is the distribution of call durations across different hours of the day?(Example Chart)",
    //   chartType: "Heatmap",
    // },
    // {
    //   id: 8,
    //   text: "How do different call metrics compare across states?(Example Chart)",
    //   chartType: "Radar",
    // },
    // {
    //   id: 9,
    //   text: "What is the relationship between call volume, duration, and resolution rate?(Example Chart)",
    //   chartType: "Bubble",
    // },
    // {
    //   id: 10,
    //   text: "How have call categories evolved over the past months?(Example Chart)",
    //   chartType: "Area",
    // },
    {
      id: 11,
      text: "Self/care-takers/Health Care Workers calls, looking at trends against gender and age",
      chartType: "Complex Sankey",
    },
    {
      id: 12,
      text: "Monthly call volume distribution by gender across different states",
      chartType: "Violin",
    },
    {
      id: 13,
      text: "Daily call volume throughout the year",
      chartType: "Calendar",
    },
    {
      id: 14,
      text: "Call distribution by district and gender",
      chartType: "Population Pyramid",
    },
  ]

  return (
    <div className="bg-[#1a2233] rounded-[1.5rem] shadow-lg overflow-hidden">
      <div className="max-h-96 overflow-y-auto">
        {questions.map((question) => (
          <div key={question.id} className="p-4 border-b border-gray-800 hover:bg-[#242f47] transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-gray-200 mb-2">{question.text}</p>
                <span className="inline-block px-2 py-1 bg-blue-900 text-xs rounded-md text-blue-200">
                  {question.chartType} Chart
                </span>
              </div>  
              <button
                onClick={() => onQuestionSelect(question.id)}
                className="ml-4 px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-md text-sm whitespace-nowrap"
              >
                View Chart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
