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
  Settings, 
  Menu,
  X,
  Search,
  QrCode
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Optimized navigation array for performance
const navigation = [
  { name: "Dashboard", href: "/", icon: Home, mobileOnly: false },
  { name: "Services", href: "/services", icon: Search, mobileOnly: false },
  { name: "Join Queue", href: "/join-queue", icon: PlusCircle, mobileOnly: false },
  { name: "My Queues", href: "/my-queues", icon: List, mobileOnly: true },
  { name: "Find Services", href: "/find-services", icon: MapPin, mobileOnly: true },
  { name: "Profile", href: "/profile", icon: User, mobileOnly: true },
  { name: "Notifications", href: "/notifications", icon: Bell, mobileOnly: true },
  { name: "Settings", href: "/settings", icon: Settings, mobileOnly: true },
]

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeQueuesCount, setActiveQueuesCount] = useState(2) // This would come from an API/context

  // Performance optimization: Scroll event listener with throttling
  useEffect(() => {
    let ticking = false
    
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 10)
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
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Filter navigation based on screen size and current route
  const desktopNav = navigation.filter(item => !item.mobileOnly)
  const mobileNav = navigation

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm" 
        : "bg-white border-b border-gray-100"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 hidden sm:block">QueueHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {desktopNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.name === "My Queues" && activeQueuesCount > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {activeQueuesCount}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {activeQueuesCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                  {activeQueuesCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {mobileNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.name === "My Queues" && activeQueuesCount > 0 && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {activeQueuesCount}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}