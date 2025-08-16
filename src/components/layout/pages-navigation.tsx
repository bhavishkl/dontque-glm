"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Home,
  Search,
  List,
  User,
  Bell,
  Settings,
  Info,
  Activity,
  HelpCircle,
  Gauge,
  Car,
  Clock,
  ChevronDown,
  ChevronRight,
  Grid3X3,
  Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSub
} from "@/components/ui/dropdown-menu"

// Comprehensive page structure organized by categories
const pageCategories = [
  {
    name: "Main",
    icon: Home,
    pages: [
      { name: "Dashboard", href: "/", icon: Home, description: "Main dashboard and overview" },
      { name: "Find Services", href: "/find-services", icon: Search, description: "Search and discover services" },
      { name: "All Pages", href: "/all-pages", icon: Grid3X3, description: "View all available pages" },
    ]
  },
  {
    name: "Queue Management",
    icon: List,
    pages: [
      { name: "My Queues", href: "/my-queues", icon: List, description: "View and manage your queues" },
      { name: "Queue Status", href: "/queue-status", icon: Clock, description: "Check real-time queue status" },
      { name: "Activity", href: "/activity", icon: Activity, description: "Recent activity history" },
    ]
  },
  {
    name: "Services",
    icon: Grid3X3,
    pages: [
      { name: "CNG Pumps", href: "/cng-pumps", icon: Car, description: "CNG pump stations" },
    ]
  },
  {
    name: "Account",
    icon: User,
    pages: [
      { name: "Profile", href: "/profile", icon: User, description: "User profile and settings" },
      { name: "Notifications", href: "/notifications", icon: Bell, description: "Manage notifications" },
      { name: "Settings", href: "/settings", icon: Settings, description: "App settings and preferences" },
    ]
  },
  {
    name: "Support",
    icon: HelpCircle,
    pages: [
      { name: "Help", href: "/help", icon: HelpCircle, description: "Help and documentation" },
      { name: "About", href: "/about", icon: Info, description: "About QueueHub" },
    ]
  },
  {
    name: "Operator",
    icon: Gauge,
    pages: [
      { name: "Operator Dashboard", href: "/dashboard", icon: Gauge, description: "Operator control panel" },
    ]
  },
  {
    name: "Developer",
    icon: Grid3X3,
    pages: [
      { name: "API Health", href: "/api/health", icon: Grid3X3, description: "API health check endpoint" },
    ]
  }
]

// All pages flattened for quick access
const allPages = pageCategories.flatMap(category => 
  category.pages.map(page => ({
    ...page,
    category: category.name
  }))
)

interface PagesNavigationProps {
  variant?: "dropdown" | "grid" | "list"
  className?: string
}

export function PagesNavigation({ variant = "dropdown", className }: PagesNavigationProps) {
  const pathname = usePathname()
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName)
  }

  if (variant === "dropdown") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <Menu className="w-4 h-4" />
            <span>All Pages</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          {pageCategories.map((category) => (
            <DropdownMenuSub key={category.name}>
              <DropdownMenuSubTrigger className="gap-2">
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {category.pages.map((page) => {
                  const isActive = pathname === page.href
                  return (
                    <DropdownMenuItem key={page.href} asChild>
                      <Link
                        href={page.href}
                        className={cn(
                          "flex items-center gap-3 w-full",
                          isActive && "bg-gray-100 text-gray-900"
                        )}
                      >
                        <page.icon className="w-4 h-4" />
                        <div className="flex-1">
                          <div className="font-medium">{page.name}</div>
                          <div className="text-xs text-gray-500">{page.description}</div>
                        </div>
                        {isActive && <Badge variant="secondary" className="text-xs">Current</Badge>}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/all-pages" className="gap-2">
              <Grid3X3 className="w-4 h-4" />
              <span>View All Pages</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === "grid") {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">All Pages</h2>
          <p className="text-gray-600">Navigate to any page in the application</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPages.map((page) => {
            const isActive = pathname === page.href
            return (
              <Link
                key={page.href}
                href={page.href}
                className={cn(
                  "block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200",
                  isActive && "border-gray-400 bg-gray-50 shadow-sm"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <page.icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={cn(
                        "font-medium text-gray-900 truncate",
                        isActive && "font-semibold"
                      )}>
                        {page.name}
                      </h3>
                      {isActive && <Badge variant="secondary" className="text-xs">Current</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{page.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {page.category}
                    </Badge>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  if (variant === "list") {
    return (
      <div className={cn("space-y-4", className)}>
        {pageCategories.map((category) => (
          <div key={category.name} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <category.icon className="w-5 h-5 text-gray-700" />
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {category.pages.length}
                </Badge>
              </div>
              <ChevronDown 
                className={cn(
                  "w-4 h-4 text-gray-500 transition-transform duration-200",
                  openCategory === category.name && "rotate-180"
                )} 
              />
            </button>
            
            {openCategory === category.name && (
              <div className="p-4 space-y-2 bg-white">
                {category.pages.map((page) => {
                  const isActive = pathname === page.href
                  return (
                    <Link
                      key={page.href}
                      href={page.href}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-colors",
                        isActive 
                          ? "bg-gray-100 text-gray-900" 
                          : "hover:bg-gray-50 text-gray-700"
                      )}
                    >
                      <page.icon className="w-4 h-4" />
                      <div className="flex-1">
                        <div className="font-medium">{page.name}</div>
                        <div className="text-sm text-gray-500">{page.description}</div>
                      </div>
                      {isActive && <Badge variant="secondary" className="text-xs">Current</Badge>}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return null
}