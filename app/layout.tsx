import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DeFi Trading Education Portal",
  description: "Learn DeFi Trading Through Interactive Challenges",
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#121212] text-white antialiased`} suppressHydrationWarning>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-[#2A2A2A] py-6 px-4 md:px-6">
              <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-400">© 2025 DeFi Trading Education Portal. All rights reserved.</p>
                </div>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Terms
                  </a>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Privacy
                  </a>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Contact
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}


import './globals.css'