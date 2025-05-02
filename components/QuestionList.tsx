"use client"

interface QuestionListProps {
  onQuestionSelect: (questionId: number) => void
}

export default function QuestionList({ onQuestionSelect }: QuestionListProps) {
  
  const questions = [
    {
      id: 1,
      text: "What is the distribution of call categories across different states?",
      chartType: "Pie",
    },
    {
      id: 2,
      text: "How does call volume vary by time of day across different states?",
      chartType: "Bar",
    },
    {
      id: 3,
      text: "What is the correlation between call duration and issue resolution?",
      chartType: "Scatter",
    },
    {
      id: 4,
      text: "How do reopened cases distribute across different categories?",
      chartType: "Sankey",
    },
    {
      id: 5,
      text: "What is the geographical distribution of calls by state?",
      chartType: "Choropleth",
    },
    // Add new questions with different chart types
    {
      id: 6,
      text: "How do call volumes and resolution rates change over time?",
      chartType: "Line",
    },
    {
      id: 7,
      text: "What is the distribution of call durations across different hours of the day?",
      chartType: "Heatmap",
    },
    {
      id: 8,
      text: "How do different call metrics compare across states?",
      chartType: "Radar",
    },
    {
      id: 9,
      text: "What is the relationship between call volume, duration, and resolution rate?",
      chartType: "Bubble",
    },
    {
      id: 10,
      text: "How have call categories evolved over the past months?",
      chartType: "Area",
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
