"use client"

import type React from "react"

import { useState } from "react"
import { Download } from "lucide-react"
import html2canvas from "html2canvas"

interface Html2CanvasDownloadProps {
  targetRef: React.RefObject<HTMLElement>
  filename: string
  buttonText?: string
}

export default function Html2CanvasDownload({
  targetRef,
  filename,
  buttonText = "Download Chart",
}: Html2CanvasDownloadProps) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    if (!targetRef.current || downloading) return

    try {
      setDownloading(true)

      // Use html2canvas to capture the chart
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: "#1a2233",
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
      })

      // Convert to data URL and trigger download
      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = filename
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading chart:", error)
      alert("Failed to download chart. Please try again.")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className={`flex items-center gap-2 px-4 py-2 ${
        downloading ? "bg-gray-600" : "bg-purple-700 hover:bg-purple-600"
      } rounded-md text-sm`}
    >
      <Download size={16} />
      {downloading ? "Downloading..." : buttonText}
    </button>
  )
}
