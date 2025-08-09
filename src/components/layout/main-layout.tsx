<<<<<<< HEAD
import { Header } from "./header"
import { BottomNavigation } from "./bottom-navigation"
=======
import { SidebarNav } from "./sidebar-nav"
>>>>>>> f44114e207d42265333890f4cc8b677e778e9ad2

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
<<<<<<< HEAD
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
=======
      <SidebarNav />
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
>>>>>>> f44114e207d42265333890f4cc8b677e778e9ad2
    </div>
  )
}