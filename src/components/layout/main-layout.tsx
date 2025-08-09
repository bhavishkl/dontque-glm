import { Header } from "./header"
import { BottomNavigation } from "./bottom-navigation"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-16 pb-16 md:pb-0">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
      
      {/* Bottom Navigation (Mobile Only) */}
      <BottomNavigation />
    </div>
  )
}