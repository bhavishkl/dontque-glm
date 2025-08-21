"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle,
  AlertCircle,
  XCircle,
  Phone,
  Navigation,
  MoreHorizontal,
  Activity,
  Calendar,
  Star
} from "lucide-react"
import { serviceTypes, getServiceById } from "@/lib/services"
import { sampleLocations } from "@/lib/sample-data"

export default function MyQueuesPage() {
  const [activeTab, setActiveTab] = useState("active")

  // Mock data for demonstration
  const activeQueues = [
    {
      id: "1",
      serviceType: "cng-pump",
      locationId: "cng-1",
      position: 3,
      totalInQueue: 12,
      estimatedWaitTime: 15,
      joinedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: "active",
      metadata: {
        driverName: "Rajesh Kumar",
        vehicleNumber: "MH-01-AB-1234"
      }
    },
    {
      id: "2",
      serviceType: "clinic",
      locationId: "clinic-1",
      position: 7,
      totalInQueue: 15,
      estimatedWaitTime: 30,
      joinedAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      status: "active",
      metadata: {
        patientName: "Rajesh Kumar",
        age: "32",
        symptoms: "Fever and headache"
      }
    }
  ]

  const completedQueues = [
    {
      id: "3",
      serviceType: "restaurant",
      locationId: "restaurant-1",
      position: 12,
      totalInQueue: 25,
      estimatedWaitTime: 20,
      joinedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      completedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      status: "completed",
      actualWaitTime: 18,
      metadata: {
        customerName: "Rajesh Kumar",
        partySize: "2"
      }
    },
    {
      id: "4",
      serviceType: "government",
      locationId: "govt-1",
      position: 45,
      totalInQueue: 150,
      estimatedWaitTime: 90,
      joinedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      completedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: "completed",
      actualWaitTime: 75,
      metadata: {
        applicantName: "Rajesh Kumar",
        serviceType: "Passport"
      }
    }
  ]

  const cancelledQueues = [
    {
      id: "5",
      serviceType: "clinic",
      locationId: "clinic-2",
      position: 15,
      totalInQueue: 22,
      estimatedWaitTime: 45,
      joinedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      cancelledAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: "cancelled",
      metadata: {
        patientName: "Rajesh Kumar",
        reason: "Too long wait time"
      }
    }
  ]

  const getLocation = (locationId: string) => {
    return sampleLocations.find(loc => loc.id === locationId)
  }

  const getService = (serviceType: string) => {
    return getServiceById(serviceType)
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    
    if (minutes < 60) {
      return `${minutes} minutes ago`
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
      const days = Math.floor(minutes / 1440)
      return `${days} day${days > 1 ? 's' : ''} ago`
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "completed": return "bg-blue-100 text-blue-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Clock className="w-4 h-4" />
      case "completed": return <CheckCircle className="w-4 h-4" />
      case "cancelled": return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const QueueCard = ({ queue }: { queue: any }) => {
    const location = getLocation(queue.locationId)
    const service = getService(queue.serviceType)
    
    if (!location || !service) return null

    const progress = queue.status === "active" 
      ? ((queue.totalInQueue - queue.position) / queue.totalInQueue) * 100
      : 100

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${service.color} rounded-lg flex items-center justify-center text-lg`}>
                {service.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{location.name}</h3>
                <p className="text-sm text-gray-600">{service.name}</p>
              </div>
            </div>
            <Badge className={getStatusColor(queue.status)}>
              {queue.status.charAt(0).toUpperCase() + queue.status.slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Your Position</p>
              <p className="text-lg font-semibold text-gray-900">#{queue.position}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Est. Wait Time</p>
              <p className="text-lg font-semibold text-gray-900">{queue.estimatedWaitTime} min</p>
            </div>
          </div>

          {queue.status === "active" && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Queue Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {formatTime(queue.joinedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{location.rating.toFixed(1)}</span>
            </div>
          </div>

          {queue.status === "active" && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Navigation className="w-4 h-4 mr-2" />
                Directions
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const queuesByTab = {
    active: activeQueues,
    completed: completedQueues,
    cancelled: cancelledQueues
  }

  return (
    <MainLayout>
        <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Queues</h1>
            <p className="text-gray-600">Manage all your active and past queue bookings</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Join New Queue
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Queues</p>
                  <p className="text-2xl font-bold text-gray-900">{activeQueues.length}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{completedQueues.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Saved</p>
                  <p className="text-2xl font-bold text-gray-900">3.5 hrs</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                </div>
                <Star className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Queue Lists */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="flex items-center gap-2">
              Active ({activeQueues.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              Completed ({completedQueues.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex items-center gap-2">
              Cancelled ({cancelledQueues.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {activeQueues.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Queues</h3>
                  <p className="text-gray-600 mb-4">
                    You don't have any active queues at the moment
                  </p>
                  <Button>Join a Queue</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeQueues.map((queue) => (
                  <QueueCard key={queue.id} queue={queue} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedQueues.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Completed Queues</h3>
                  <p className="text-gray-600">
                    You haven't completed any queues yet
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedQueues.map((queue) => (
                  <QueueCard key={queue.id} queue={queue} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {cancelledQueues.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Cancelled Queues</h3>
                  <p className="text-gray-600">
                    You haven't cancelled any queues
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cancelledQueues.map((queue) => (
                  <QueueCard key={queue.id} queue={queue} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      </MainLayout>
  )
}