import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Analytics Dashboard",
  description: "Call Center Performance Metrics Dashboard",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Load Plotly.js with defer to ensure it's available when needed */}
        <script src="https://cdn.plot.ly/plotly-2.24.1.min.js" defer></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
