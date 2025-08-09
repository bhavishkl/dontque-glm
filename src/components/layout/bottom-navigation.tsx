"use client"

import { useState, useMemo, useCallback } from "react"
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

// Optimized navigation structure with performance in mind
const navigationItems = [
  { 
    name: "Home", 
    href: "/", 
    icon: Home,
    exactMatch: true,
    showBadge: false
  },
  { 
    name: "Join", 
    href: "/join-queue", 
    icon: PlusCircle,
    exactMatch: false,
    showBadge: false
  },
  { 
    name: "Queues", 
    href: "/my-queues", 
    icon: List,
    exactMatch: false,
    showBadge: true,
    badgeCount: 2
  },
  { 
    name: "Nearby", 
    href: "/find-services", 
    icon: MapPin,
    exactMatch: false,
    showBadge: false
  },
  { 
    name: "Profile", 
    href: "/profile", 
    icon: User,
    exactMatch: false,
    showBadge: false
  },
] as const

interface BottomNavigationProps {
  className?: string
}

export function BottomNavigation({ className }: BottomNavigationProps) {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState<string>("")
  
  // Memoize active state calculation for performance
  const isActive = useCallback((href: string, exactMatch: boolean) => {
    if (exactMatch) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }, [pathname])

  // Memoize navigation items with computed states
  const navItems = useMemo(() => {
    return navigationItems.map(item => ({
      ...item,
      isActive: isActive(item.href, item.exactMatch)
    }))
  }, [isActive])

  // Optimized click handler
  const handleItemClick = useCallback((itemName: string) => {
    setActiveItem(itemName)
    // Add haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }, [])

  // Hide bottom navigation on certain routes
  const shouldHideNavigation = useMemo(() => {
    const hideRoutes = ['/settings', '/help', '/about', '/activity']
    return hideRoutes.some(route => pathname.startsWith(route))
  }, [pathname])

  if (shouldHideNavigation) {
    return null
  }

  return (
    <>
      <nav className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg",
        "md:hidden", // Hide on desktop
        className
      )}>
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => handleItemClick(item.name)}
              className={cn(
                "flex flex-col items-center justify-center gap-1",
                "transition-all duration-200 ease-in-out",
                "relative overflow-hidden",
                item.isActive 
                  ? "text-gray-900 bg-gray-50" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
                "active:scale-95" // Touch feedback
              )}
            >
              {/* Active indicator */}
              {item.isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full" />
              )}
              
              {/* Icon with badge */}
              <div className="relative">
                <item.icon 
                  className={cn(
                    "w-5 h-5 transition-all duration-200",
                    item.isActive ? "scale-110" : "scale-100"
                  )} 
                />
                {item.showBadge && item.badgeCount && item.badgeCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className={cn(
                      "absolute -top-2 -right-2 w-4 h-4 p-0 flex items-center justify-center text-[10px] font-bold",
                      "border-2 border-white",
                      "animate-pulse" // Subtle animation for attention
                    )}
                  >
                    {item.badgeCount}
                  </Badge>
                )}
              </div>
              
              {/* Label */}
              <span className={cn(
                "text-xs font-medium transition-all duration-200",
                item.isActive ? "font-semibold" : "font-normal"
              )}>
                {item.name}
              </span>
              
              {/* Ripple effect for touch devices */}
              <div className="absolute inset-0 bg-gray-200 opacity-0 active:opacity-20 transition-opacity duration-200 rounded-lg" />
            </Link>
          ))}
        </div>
      </nav>
      
      {/* Safe area padding for notched devices */}
      <div className="fixed bottom-0 left-0 right-0 h-0 md:hidden bg-white pointer-events-none">
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </>
  )
}