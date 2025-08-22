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
  QrCode,
  Activity,
  Check,
  Clock,
  AlertCircle,
  Info,
  Trash2,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

// Optimized navigation array for performance
const navigation = [
  { name: "Dashboard", href: "/", icon: Home, mobileOnly: false },
  { name: "Find Services", href: "/find-services", icon: Search, mobileOnly: false },
  { name: "My Queues", href: "/my-queues", icon: List, mobileOnly: false },
  { name: "CNG Pumps", href: "/cng-pumps", icon: MapPin, mobileOnly: true },
  { name: "Activity", href: "/activity", icon: Activity, mobileOnly: true },
  { name: "Profile", href: "/profile", icon: User, mobileOnly: true },
  { name: "Notifications", href: "/notifications", icon: Bell, mobileOnly: true },
  { name: "Settings", href: "/settings", icon: Settings, mobileOnly: true },
]

// Notification types
type NotificationType = 'queue_update' | 'service_status' | 'promotion' | 'reminder' | 'system'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  icon: React.ComponentType<any>
}

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'queue_update',
    title: 'Queue Position Updated',
    message: 'You are now 3rd in queue at CNG Station - Andheri East',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    actionUrl: '/my-queues',
    icon: Clock
  },
  {
    id: '2',
    type: 'service_status',
    title: 'Service Available',
    message: 'HealthCheck Clinic - Andheri is now accepting new appointments',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
    actionUrl: '/find-services',
    icon: Check
  },
  {
    id: '3',
    type: 'promotion',
    title: 'Special Offer',
    message: 'Get 20% off on your next restaurant booking at Spice Garden',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    actionUrl: '/find-services',
    icon: Info
  },
  {
    id: '4',
    type: 'reminder',
    title: 'Appointment Reminder',
    message: 'Your clinic appointment is tomorrow at 10:00 AM',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
    actionUrl: '/my-queues',
    icon: Clock
  },
  {
    id: '5',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance tonight from 2:00 AM to 4:00 AM',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: true,
    icon: AlertCircle
  }
]

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [activeQueuesCount, setActiveQueuesCount] = useState(2) // This would come from an API/context
  const { toast } = useToast()

  // Calculate unread notifications count
  const unreadNotificationsCount = notifications.filter(n => !n.read).length

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

  // Simulate receiving new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // This would normally come from WebSocket or API polling
      // For demo purposes, we'll occasionally add a new notification
      if (Math.random() > 0.95) { // 5% chance every 10 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'queue_update',
          title: 'New Queue Update',
          message: 'Your queue position has been updated',
          timestamp: new Date(),
          read: false,
          actionUrl: '/my-queues',
          icon: Clock
        }
        
        setNotifications(prev => [newNotification, ...prev])
        
        // Show toast notification
        toast({
          title: "New Notification",
          description: newNotification.message,
          action: (
            <Link href={newNotification.actionUrl || '/notifications'}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
          ),
        })
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [toast])

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
    toast({
      title: "All notifications marked as read",
      description: "You've caught up on all your notifications",
    })
  }

  // Remove notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  // Format timestamp
  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  // Filter navigation based on screen size and current route
  const desktopNav = navigation.filter(item => !item.mobileOnly)
  const mobileNav = navigation

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out",
      isScrolled 
        ? "bg-red-500/95 backdrop-blur-md border-b border-red-600 shadow-sm" 
        : "bg-red-500 border-b border-red-600"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-lg font-semibold text-white hidden sm:block">QueueHub</span>
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
                      ? "bg-red-600 text-white"
                      : "text-white hover:bg-red-600 hover:text-white"
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-red-600">
                  <Bell className="w-5 h-5" />
                  {unreadNotificationsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                      {unreadNotificationsCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadNotificationsCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-xs h-6"
                    >
                      Mark all read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="flex-col items-start p-4 cursor-pointer"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3 w-full">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            notification.read ? 'bg-gray-100' : 'bg-blue-100'
                          }`}>
                            <notification.icon className={`w-4 h-4 ${
                              notification.read ? 'text-gray-500' : 'text-blue-600'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className={`text-sm font-medium truncate ${
                                notification.read ? 'text-gray-700' : 'text-gray-900'
                              }`}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <span className="text-xs text-gray-500">
                                  {formatTimeAgo(notification.timestamp)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-6 h-6 p-0 hover:bg-gray-100"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeNotification(notification.id)
                                  }}
                                >
                                  <Trash2 className="w-3 h-3 text-gray-400" />
                                </Button>
                              </div>
                            </div>
                            <p className={`text-sm mt-1 ${
                              notification.read ? 'text-gray-500' : 'text-gray-600'
                            }`}>
                              {notification.message}
                            </p>
                            {notification.actionUrl && (
                              <div className="mt-2">
                                <Link href={notification.actionUrl}>
                                  <Button variant="outline" size="sm" className="text-xs h-7">
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-4 left-2"></div>
                        )}
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuGroup>
                {notifications.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/notifications" className="justify-center text-center">
                        View all notifications
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-600">
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-red-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-red-600 bg-red-500">
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
                      ? "bg-red-600 text-white"
                      : "text-white hover:bg-red-600 hover:text-white"
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