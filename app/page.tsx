"use client"

import { useState } from "react"
import MainDashboard from "@/components/MainDashboard"
import QuestionList from "@/components/QuestionList"
import QuestionModal from "@/components/QuestionModal"

export default function Home() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const [selectedState, setSelectedState] = useState("IN")

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
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-gray-400">Call Center Performance Metrics</p>
      </header>

      <MainDashboard selectedState={selectedState} onStateChange={handleStateChange} />

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
