"use client"

import { useState } from "react"
import MainDashboard from "@/components/MainDashboard"
import QuestionList from "@/components/QuestionList"
import QuestionModal from "@/components/QuestionModal"
import NLPSearch from "@/components/NLPSearch"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const [selectedState, setSelectedState] = useState("India")

  const handleQuestionSelect = (questionId: number) => {
    setSelectedQuestion(questionId)
  }

  const handleCloseModal = () => {
    setSelectedQuestion(null)
  }

  const handleStateChange = (state: string) => {
    setSelectedState(state)
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Tele-MANAS Analytics Dashboard</h1>
        <p className="text-gray-400">Analytical data</p>
      </header>

      <MainDashboard selectedState={selectedState} onStateChange={handleStateChange} />

      {/*NLP search bar, this can be setuped to use with the NLP backend but for the time being we chose to go with
      another approach as the system that we built can also generate graphs so we don't require to render
      separate graphs by taking the inputs from the backend. But this component can be used for interactivity and
      UI purposes. */}
      {/* <div className="mt-10">
        <NLPSearch />
      </div> */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 ">Natural Language Query</h2>
        <button className="ml-4 px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-md text-sm whitespace-nowrap"
            onClick={() => {window.open("http://localhost:8001/", "_blank");}}
              >
           Ask
        </button>
        </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Analysis Questions</h2>
        <QuestionList onQuestionSelect={handleQuestionSelect} />
      </div>

      

      {selectedQuestion !== null && (
        <QuestionModal
          questionId={selectedQuestion}
          selectedState={selectedState}
          onStateChange={handleStateChange}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
