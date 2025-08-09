"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  QrCode, 
  Hash
} from "lucide-react"

interface QueueSearchProps {
  onSearch: (query: string) => void
  onQueueIdSubmit: (queueId: string) => void
  onQrScan: () => void
}

export function QueueSearch({ onSearch, onQueueIdSubmit, onQrScan }: QueueSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [queueId, setQueueId] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleQueueIdSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (queueId.trim()) {
      onQueueIdSubmit(queueId.trim())
    }
  }

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-700" />
          Quick Queue Access
        </CardTitle>
        <CardDescription className="text-gray-600">
          Search services, enter queue ID, or scan QR code to join queues instantly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Queue ID Input - Priority Section */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-semibold text-gray-900">Enter Queue ID (Priority Access)</span>
          </div>
          <form onSubmit={handleQueueIdSubmit} className="flex gap-2">
            <Input
              placeholder="Enter queue ID (e.g., Q-12345)"
              value={queueId}
              onChange={(e) => setQueueId(e.target.value)}
              className="flex-1 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            />
            <Button 
              type="submit" 
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6"
              disabled={!queueId.trim()}
            >
              Join Queue
            </Button>
          </form>
        </div>

        {/* Search and QR Scanner Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search services, locations, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            />
          </form>

          {/* QR Scanner Button */}
          <Button 
            onClick={onQrScan}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            Scan QR Code
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 border-gray-300 text-gray-700">
            ⚡ Fast Track
          </Badge>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 border-gray-300 text-gray-700">
            🏥 Hospitals
          </Badge>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 border-gray-300 text-gray-700">
            ⛽ CNG Pumps
          </Badge>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 border-gray-300 text-gray-700">
            🍔 Restaurants
          </Badge>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100 border-gray-300 text-gray-700">
            🏦 Banks
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}