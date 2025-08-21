"use client"

import { Suspense } from "react"
import { Header } from "./header"
import { BottomNavigation } from "./bottom-navigation"
import { ErrorBoundary } from "@/components/error-boundary"
import { Loading } from "@/components/loading"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Suspense fallback={<Loading />}>
          <Header />
        </Suspense>
        
        {/* Main Content */}
        <main className="pt-16 pb-16 md:pb-0">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
        
        {/* Bottom Navigation (Mobile Only) */}
        <Suspense fallback={<Loading />}>
          <BottomNavigation />
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}