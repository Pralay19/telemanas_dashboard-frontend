import type React from "react"

interface ChartCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

export default function ChartCard({ title, children, className = "" }: ChartCardProps) {
  return (
    <div className={`bg-[#1a2233] rounded-[1.5rem] shadow-lg overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-800">
        <h3 className="font-medium text-gray-200">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
