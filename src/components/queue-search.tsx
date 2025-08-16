"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  QrCode, 
  Hash,
  PlusCircle,
  Clock,
  X
} from "lucide-react"
import Link from "next/link"

interface QueueSearchProps {
  onSearch: (query: string) => void
  onQueueIdSubmit: (queueId: string) => void
  onQrScan: () => void
}

interface FrequentQueue {
  id: string
  name: string
  lastUsed: string
  usageCount: number
}

interface RecentSearch {
  query: string
  timestamp: string
}

export function QueueSearch({ onSearch, onQueueIdSubmit, onQrScan }: QueueSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [queueId, setQueueId] = useState("")
  const [frequentQueues, setFrequentQueues] = useState<FrequentQueue[]>([])
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([])
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedFrequentQueues = localStorage.getItem('frequentQueues')
    const savedRecentSearches = localStorage.getItem('recentSearches')
    
    if (savedFrequentQueues) {
      setFrequentQueues(JSON.parse(savedFrequentQueues))
    } else {
      // Initialize with sample data
      const sampleFrequentQueues: FrequentQueue[] = [
        { id: "Q-12345", name: "CNG Station - Andheri East", lastUsed: "2024-01-15", usageCount: 12 },
        { id: "Q-67890", name: "City Care Clinic - Andheri", lastUsed: "2024-01-14", usageCount: 8 },
        { id: "Q-24680", name: "Bank Branch - Powai", lastUsed: "2024-01-13", usageCount: 5 }
      ]
      setFrequentQueues(sampleFrequentQueues)
      localStorage.setItem('frequentQueues', JSON.stringify(sampleFrequentQueues))
    }
    
    if (savedRecentSearches) {
      setRecentSearches(JSON.parse(savedRecentSearches))
    }
  }, [])

  // Save frequent queues to localStorage whenever they change
  useEffect(() => {
    if (frequentQueues.length > 0) {
      localStorage.setItem('frequentQueues', JSON.stringify(frequentQueues))
    }
  }, [frequentQueues])

  // Save recent searches to localStorage whenever they change
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
    }
  }, [recentSearches])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery)
      
      // Add to recent searches
      const newSearch: RecentSearch = {
        query: searchQuery.trim(),
        timestamp: new Date().toISOString()
      }
      
      // Remove if already exists and add to beginning
      const updatedSearches = recentSearches.filter(s => s.query !== searchQuery.trim())
      setRecentSearches([newSearch, ...updatedSearches].slice(0, 10)) // Keep only last 10
      setSearchQuery("")
      setShowSearchDropdown(false)
    }
  }

  const handleQueueIdSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (queueId.trim()) {
      onQueueIdSubmit(queueId.trim())
      
      // Update frequent queues
      const existingIndex = frequentQueues.findIndex(q => q.id === queueId.trim())
      let updatedQueues: FrequentQueue[]
      
      if (existingIndex >= 0) {
        // Update existing queue
        updatedQueues = [...frequentQueues]
        updatedQueues[existingIndex] = {
          ...updatedQueues[existingIndex],
          lastUsed: new Date().toISOString(),
          usageCount: updatedQueues[existingIndex].usageCount + 1
        }
      } else {
        // Add new queue
        const newQueue: FrequentQueue = {
          id: queueId.trim(),
          name: `Queue ${queueId.trim()}`,
          lastUsed: new Date().toISOString(),
          usageCount: 1
        }
        updatedQueues = [newQueue, ...frequentQueues].slice(0, 8) // Keep only last 8
      }
      
      setFrequentQueues(updatedQueues)
      setQueueId("")
    }
  }

  const handleFrequentQueueClick = (queueId: string) => {
    setQueueId(queueId)
    // Auto-submit after a short delay
    setTimeout(() => {
      onQueueIdSubmit(queueId)
      
      // Update usage count
      const updatedQueues = frequentQueues.map(q => 
        q.id === queueId 
          ? { ...q, lastUsed: new Date().toISOString(), usageCount: q.usageCount + 1 }
          : q
      )
      setFrequentQueues(updatedQueues)
    }, 100)
  }

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query)
    setShowSearchDropdown(false)
    // Auto-submit after a short delay
    setTimeout(() => {
      onSearch(query)
      
      // Move to top of recent searches
      const updatedSearches = recentSearches.filter(s => s.query !== query)
      setRecentSearches([{ query, timestamp: new Date().toISOString() }, ...updatedSearches])
    }, 100)
  }

  const removeRecentSearch = (query: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updatedSearches = recentSearches.filter(s => s.query !== query)
    setRecentSearches(updatedSearches)
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return `${Math.floor(diffInHours / 24)}d ago`
  }
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="space-y-4 p-6">
        {/* Queue ID Input - Priority Section */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-semibold text-gray-900">Enter Queue ID (Priority Access)</span>
          </div>
        <form onSubmit={handleQueueIdSubmit} className="flex gap-2 mb-3">
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
          
          {/* Frequently Used Queue IDs */}
          {frequentQueues.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-3 h-3 text-gray-600" />
                <span className="text-xs font-medium text-gray-700">Frequently Used</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {frequentQueues.slice(0, 6).map((queue) => (
                  <Badge
                    key={queue.id}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-200 border-gray-300 text-gray-700 px-2 py-1 text-xs"
                    onClick={() => handleFrequentQueueClick(queue.id)}
                  >
                    {queue.id}
                    <span className="ml-1 text-gray-500">({queue.usageCount})</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search and QR Scanner Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Search Bar with Dropdown */}
          <div className="relative">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search services, locations, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                className="pl-10 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </form>
            
            {/* Recent Searches Dropdown */}
            {showSearchDropdown && recentSearches.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2 px-2">
                    <Clock className="w-3 h-3 text-gray-600" />
                    <span className="text-xs font-medium text-gray-700">Recent Searches</span>
                  </div>
                  {recentSearches.slice(0, 8).map((search, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer group"
                      onClick={() => handleRecentSearchClick(search.query)}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Search className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-700 truncate">{search.query}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{formatDate(search.timestamp)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => removeRecentSearch(search.query, e)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* QR Scanner Button */}
          <Button 
            onClick={onQrScan}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            Scan QR Code
          </Button>
        </div>

        {/* Find Services Button */}
        <Link href="/find-services">
          <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold flex items-center justify-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Find Services
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}