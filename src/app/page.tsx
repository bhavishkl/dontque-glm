"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { QueueSearch } from "@/components/queue-search"
import { 
  Clock, 
  MapPin, 
  Users, 
  TrendingUp, 
  Activity,
  PlusCircle,
  Star
} from "lucide-react"
import { serviceTypes } from "@/lib/services"
import { sampleLocations } from "@/lib/sample-data"
import Link from "next/link"

export default function Home() {
  // Mock data for demonstration
  const userStats = {
    totalQueuesJoined: 47,
    timeSaved: "12 hours",
    moneySaved: "₹2,450",
    favoriteService: "CNG Pumps"
  }

  const activeQueues = [
    { id: 1, serviceType: "cng-pump", serviceName: "CNG Station - Andheri East", position: 3, estimatedWait: 15, status: "active" },
    { id: 2, serviceType: "clinic", serviceName: "City Care Clinic - Andheri", position: 7, estimatedWait: 30, status: "active" }
  ]

  // Search and queue handlers
  const handleSearch = (query: string) => {
    console.log("Searching for:", query)
    // Implement search functionality
  }

  const handleQueueIdSubmit = (queueId: string) => {
    console.log("Joining queue with ID:", queueId)
    // Implement queue ID join functionality
  }

  const handleQrScan = () => {
    console.log("Opening QR scanner...")
    // Implement QR scanner functionality
  }

  const getServiceIcon = (serviceId: string) => {
    const service = serviceTypes.find(s => s.id === serviceId)
    return service?.icon || "📍"
  }

  const getServiceColor = (serviceId: string) => {
    const service = serviceTypes.find(s => s.id === serviceId)
    return service?.color || "bg-gray-600"
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Queue Search Component - Priority Section */}
        <QueueSearch 
          onSearch={handleSearch}
          onQueueIdSubmit={handleQueueIdSubmit}
          onQrScan={handleQrScan}
        />

        {/* Active Queues */}
        {activeQueues.length > 0 && (
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Activity className="w-5 h-5 text-gray-700" />
                Your Active Queues
              </CardTitle>
              <CardDescription className="text-gray-600">
                You currently have {activeQueues.length} active queue(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeQueues.map((queue) => (
                  <div key={queue.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 ${getServiceColor(queue.serviceType)} rounded-lg flex items-center justify-center text-white text-sm`}>
                          {getServiceIcon(queue.serviceType)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{queue.serviceName}</h3>
                          <p className="text-sm text-gray-600">Position {queue.position}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{queue.estimatedWait} min</span>
                      </div>
                      <Link href="/my-queues">
                        <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">View Details</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Services */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Available Services</h2>
            <Link href="/services">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">View All Services</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceTypes.map((service) => (
              <Card key={service.id} className="border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-2xl mb-3 mx-auto`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg text-gray-900">{service.name}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <strong>Category:</strong> {service.category}
                    </div>
                    <Link href={`/join-queue?service=${service.id}`}>
                      <Button className="w-full mt-3 bg-gray-900 hover:bg-gray-800 text-white" size="sm">
                        Join Queue
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Queues Joined</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalQueuesJoined}</p>
                </div>
                <Users className="w-8 h-8 text-gray-700" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Saved</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.timeSaved}</p>
                </div>
                <Clock className="w-8 h-8 text-gray-700" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Money Saved</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.moneySaved}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-gray-700" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Favorite Service</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.favoriteService}</p>
                </div>
                <Star className="w-8 h-8 text-gray-700" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Nearby */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Popular Nearby Services</CardTitle>
            <CardDescription className="text-gray-600">Quick access to trending services in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleLocations.slice(0, 4).map((location) => {
                const service = serviceTypes.find(s => s.id === location.serviceType)
                return (
                  <div key={location.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${service?.color || 'bg-gray-600'} rounded-lg flex items-center justify-center text-white text-sm`}>
                        {service?.icon || '📍'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{location.name}</p>
                        <p className="text-xs text-gray-600">{location.currentQueue} in queue • {location.estimatedWaitTime} min</p>
                      </div>
                    </div>
                    <Badge 
                      variant={location.status === 'active' ? 'default' : 'secondary'}
                      className={location.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}
                    >
                      {location.status}
                    </Badge>
                  </div>
                )
              })}
            </div>
            <Link href="/find-services">
              <Button variant="outline" className="w-full mt-4 border-gray-300 text-gray-700 hover:bg-gray-50">
                View All Nearby Services
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}