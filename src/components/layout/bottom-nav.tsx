"use client"

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
  Search
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const bottomNavigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Find", href: "/find-services", icon: Search },
  { name: "Queues", href: "/my-queues", icon: List },
  { name: "Profile", href: "/profile", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg lg:hidden">
      <div className="flex items-center justify-around">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 min-w-[60px] transition-colors",
                isActive
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <div className="relative">
                <item.icon className={cn(
                  "w-5 h-5 mb-1",
                  isActive ? "text-gray-900" : "text-gray-500"
                )} />
                {item.name === "Queues" && (
                  <Badge className="absolute -top-1 -right-2 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white border-0">
                    2
                  </Badge>
                )}
                {item.name === "Profile" && (
                  <Badge className="absolute -top-1 -right-2 h-2 w-2 rounded-full p-0 bg-green-500 border-0" />
                )}
              </div>
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-gray-900" : "text-gray-500"
              )}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}