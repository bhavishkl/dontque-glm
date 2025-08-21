"use client"
import { Suspense } from "react"
import { Loading } from "@/components/loading"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Activity, 
  Calendar, 
  Clock, 
  MapPin, 
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Filter,
  Search,
  Download,
  Share2,
  Users,
  Zap
} from "lucide-react"
import { serviceTypes, getServiceById } from "@/lib/services"
import { sampleLocations } from "@/lib/sample-data"
import { useState } from "react"

export default function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState("all")
  const [selectedTimeRange, setSelectedTimeRange] = useState("all")
  const [selectedActivityType, setSelectedActivityType] = useState("all")

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "queue_joined",
      serviceType: "cng-pump",
      locationName: "CNG Station - Andheri East",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: "active",
      details: {
        position: 3,
        estimatedWait: 15,
        metadata: { driverName: "Rajesh Kumar", vehicleNumber: "MH-01-AB-1234" }
      }
    },
    {
      id: 2,
      type: "queue_joined",
      serviceType: "clinic",
      locationName: "City Care Clinic - Andheri",
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      status: "active",
      details: {
        position: 7,
        estimatedWait: 30,
        metadata: { patientName: "Rajesh Kumar", age: "32" }
      }
    },
    {
      id: 3,
      type: "queue_completed",
      serviceType: "restaurant",
      locationName: "Spice Garden - Andheri",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: "completed",
      details: {
        actualWaitTime: 18,
        metadata: { customerName: "Rajesh Kumar", partySize: "2" }
      }
    },
    {
      id: 4,
      type: "queue_cancelled",
      serviceType: "clinic",
      locationName: "Lifeline Medical Center - Powai",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      status: "cancelled",
      details: {
        reason: "Too long wait time",
        metadata: { patientName: "Rajesh Kumar" }
      }
    },
    {
      id: 5,
      type: "queue_completed",
      serviceType: "government",
      locationName: "Regional Passport Office - Mumbai",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      status: "completed",
      details: {
        actualWaitTime: 75,
        metadata: { applicantName: "Rajesh Kumar", serviceType: "Passport" }
      }
    },
    {
      id: 6,
      type: "queue_joined",
      serviceType: "restaurant",
      locationName: "Pizza Corner - Powai",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      status: "completed",
      details: {
        actualWaitTime: 22,
        metadata: { customerName: "Rajesh Kumar", partySize: "4" }
      }
    },
    {
      id: 7,
      type: "favorite_added",
      serviceType: "cng-pump",
      locationName: "CNG Station - Powai",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      status: "completed",
      details: {
        action: "Added to favorites"
      }
    },
    {
      id: 8,
      type: "review_left",
      serviceType: "clinic",
      locationName: "Health First Clinic - Bandra",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: "completed",
      details: {
        rating: 5,
        comment: "Excellent service and very professional staff"
      }
    }
  ]

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.locationName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesService = selectedService === "all" || activity.serviceType === selectedService
    const matchesTimeRange = selectedTimeRange === "all" || checkTimeRange(activity.timestamp, selectedTimeRange)
    const matchesActivityType = selectedActivityType === "all" || activity.type === selectedActivityType
    
    return matchesSearch && matchesService && matchesTimeRange && matchesActivityType
  })

  function checkTimeRange(timestamp: Date, range: string): boolean {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const hours = diff / (1000 * 60 * 60)
    
    switch (range) {
      case "today":
        return hours < 24
      case "week":
        return hours < 168 // 7 days
      case "month":
        return hours < 730 // 30 days
      default:
        return true
    }
  }

  const formatTime = (timestamp: Date): string => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (minutes < 60) {
      return `${minutes} minutes ago`
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (days < 7) {
      return `${days} day${days > 1 ? 's' : ''} ago`
    } else {
      return timestamp.toLocaleDateString()
    }
  }

  const getActivityIcon = (type: string, status: string) => {
    switch (type) {
      case "queue_joined":
        return <Users className="w-5 h-5 text-blue-600" />
      case "queue_completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "queue_cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "favorite_added":
        return <Star className="w-5 h-5 text-yellow-600" />
      case "review_left":
        return <Star className="w-5 h-5 text-purple-600" />
      default:
        return <Activity className="w-5 h-5 text-gray-600" />
    }
  }

  const getActivityTitle = (activity: any): string => {
    switch (activity.type) {
      case "queue_joined":
        return `Joined queue at ${activity.locationName}`
      case "queue_completed":
        return `Completed service at ${activity.locationName}`
      case "queue_cancelled":
        return `Cancelled queue at ${activity.locationName}`
      case "favorite_added":
        return `Added ${activity.locationName} to favorites`
      case "review_left":
        return `Left review for ${activity.locationName}`
      default:
        return "Activity"
    }
  }

  const getActivityDescription = (activity: any): string => {
    switch (activity.type) {
      case "queue_joined":
        return `Position ${activity.details.position} • Est. wait ${activity.details.estimatedWait} min`
      case "queue_completed":
        return `Waited ${activity.details.actualWaitTime} minutes`
      case "queue_cancelled":
        return `Reason: ${activity.details.reason}`
      case "favorite_added":
        return activity.details.action
      case "review_left":
        return `${activity.details.rating}/5 stars`
      default:
        return ""
    }
  }

  const getServiceIcon = (serviceType: string) => {
    const service = getServiceById(serviceType)
    return service?.icon || "📍"
  }

  const getServiceColor = (serviceType: string) => {
    const service = getServiceById(serviceType)
    return service?.color || "bg-gray-600"
  }

  // Stats calculation
  const stats = {
    totalActivities: activities.length,
    completedQueues: activities.filter(a => a.type === "queue_completed").length,
    cancelledQueues: activities.filter(a => a.type === "queue_cancelled").length,
    totalTimeSaved: activities
      .filter(a => a.type === "queue_completed" && a.details.actualWaitTime && a.details.estimatedWait)
      .reduce((total, a) => total + ((a.details.estimatedWait || 0) - (a.details.actualWaitTime || 0)), 0)
  }

  return (
    <Suspense fallback={<Loading />}>
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
            <p className="text-gray-600">Track your queue history and service interactions</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Activities</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalActivities}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedQueues}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cancelled</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.cancelledQueues}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Saved</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTimeSaved} min</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      <div className="flex items-center gap-2">
                        <span>{service.icon}</span>
                        <span>{service.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedActivityType} onValueChange={setSelectedActivityType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Activities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="queue_joined">Queue Joined</SelectItem>
                  <SelectItem value="queue_completed">Queue Completed</SelectItem>
                  <SelectItem value="queue_cancelled">Queue Cancelled</SelectItem>
                  <SelectItem value="favorite_added">Favorite Added</SelectItem>
                  <SelectItem value="review_left">Review Left</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activity List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <p className="text-sm text-gray-600">
              {filteredActivities.length} activities found
            </p>
          </div>

          {filteredActivities.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or join some queues to see activity
                </p>
                <Button onClick={() => {
                  setSearchQuery("")
                  setSelectedService("all")
                  setSelectedTimeRange("all")
                  setSelectedActivityType("all")
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <Card key={activity.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type, activity.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{getActivityTitle(activity)}</h3>
                            <p className="text-sm text-gray-600">{getActivityDescription(activity)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 ${getServiceColor(activity.serviceType)} rounded-lg flex items-center justify-center text-sm`}>
                              {getServiceIcon(activity.serviceType)}
                            </div>
                            <Badge className={
                              activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                              activity.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              activity.status === 'active' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatTime(activity.timestamp)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{activity.locationName}</span>
                          </div>
                        </div>

                        {/* Additional details based on activity type */}
                        {activity.type === "review_left" && activity.details.comment && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700 italic">"{activity.details.comment}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
    </Suspense>
  )
}
