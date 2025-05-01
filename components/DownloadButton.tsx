"use client"
import { Download } from "lucide-react"

interface DownloadButtonProps {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
}

export default function DownloadButton({ onClick, disabled = false, loading = false }: DownloadButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex items-center gap-2 px-4 py-2 ${
        disabled || loading ? "bg-gray-600" : "bg-purple-700 hover:bg-purple-600"
      } rounded-md text-sm`}
    >
      <Download size={16} />
      {loading ? "Downloading..." : "Download Chart"}
    </button>
  )
}
