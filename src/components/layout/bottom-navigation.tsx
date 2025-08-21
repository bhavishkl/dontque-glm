"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Home, 
  PlusCircle, 
  List, 
  MapPin, 
  User, 
  Bell,
  Activity
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Optimized bottom navigation items for mobile
const bottomNavItems = [
  { 
    name: "Home", 
    href: "/", 
    icon: Home,
    showBadge: false,
    badgeCount: 0
  },
  { 
    name: "Find", 
    href: "/find-services", 
    icon: MapPin,
    showBadge: false,
    badgeCount: 0
  },
  { 
    name: "Queues", 
    href: "/my-queues", 
    icon: List,
    showBadge: true,
    badgeCount: 2 // This would come from an API/context
  },
  { 
    name: "Activity", 
    href: "/activity", 
    icon: Activity,
    showBadge: false,
    badgeCount: 0
  },
  { 
    name: "Profile", 
    href: "/profile", 
    icon: User,
    showBadge: false,
    badgeCount: 0
  },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeQueuesCount, setActiveQueuesCount] = useState(2)

  // Performance optimization: Hide/show bottom nav on scroll with throttling
  useEffect(() => {
    let ticking = false
    
    const updateScrollState = () => {
      const currentScrollY = window.scrollY
      
      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY])

  // Update active queues count (this would come from context/API in real app)
  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // In a real app, this would come from WebSocket or context
      setActiveQueuesCount(prev => prev) // Keep it static for now
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Don't show on desktop or certain pages
  const shouldShow = typeof window !== 'undefined' && window.innerWidth < 768 && isVisible

  if (!shouldShow) {
    return null
  }

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 transition-transform duration-300 ease-in-out",
      isVisible ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            const badgeCount = item.name === "Queues" ? activeQueuesCount : item.badgeCount
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full relative transition-colors duration-200",
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <div className="relative">
                  <item.icon className={cn(
                    "w-5 h-5 transition-all duration-200",
                    isActive ? "scale-110" : "scale-100"
                  )} />
                  
                  {/* Badge */}
                  {item.showBadge && badgeCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-0">
                      {badgeCount}
                    </Badge>
                  )}
                </div>
                
                <span className={cn(
                  "text-xs mt-1 transition-all duration-200",
                  isActive ? "font-semibold" : "font-medium"
                )}>
                  {item.name}
                </span>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}