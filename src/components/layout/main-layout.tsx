"use client"

import { Suspense } from "react"
import { Header } from "./header"
import { BottomNavigation } from "./bottom-navigation"
import { ErrorBoundary } from "@/components/error-boundary"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200" />}>
          <Header />
        </Suspense>
        
        {/* Main Content */}
        <main className="pt-16 pb-16 md:pb-0">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
        
        {/* Bottom Navigation (Mobile Only) */}
        <Suspense fallback={<div className="h-16 bg-white border-t border-gray-200" />}>
          <BottomNavigation />
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}