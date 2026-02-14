"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QueueSearch } from "@/components/queue-search"
import {
  Clock,
  Users,
  TrendingUp,
  Activity,
  Star,
  Bookmark,
  Heart,
  Zap,
} from "lucide-react"
import { serviceTypes } from "@/lib/services"
import { sampleLocations } from "@/lib/sample-data"
import Link from "next/link"

export default function Home() {
  const userStats = {
    totalQueuesJoined: 47,
    timeSaved: "12 hours",
    moneySaved: "₹2,450",
    favoriteService: "CNG Pumps",
  }

  const activeQueues = [
    { id: 1, serviceType: "cng-pump", serviceName: "CNG Station - Andheri East", position: 3, estimatedWait: 15, status: "active" },
    { id: 2, serviceType: "clinic", serviceName: "City Care Clinic - Andheri", position: 7, estimatedWait: 30, status: "active" },
  ]

  const savedQueues = [
    {
      id: 1,
      serviceType: "cng-pump",
      serviceName: "CNG Station - Andheri East",
      location: "Andheri East, Mumbai",
      lastUsed: "2 days ago",
      isFavorite: true,
      quickJoin: true,
      estimatedWait: 15,
      currentQueue: 8,
    },
    {
      id: 2,
      serviceType: "restaurant",
      serviceName: "Spice Garden Restaurant",
      location: "Powai, Mumbai",
      lastUsed: "1 week ago",
      isFavorite: true,
      quickJoin: false,
      estimatedWait: 25,
      currentQueue: 12,
    },
    {
      id: 3,
      serviceType: "clinic",
      serviceName: "City Care Clinic - Andheri",
      location: "Andheri West, Mumbai",
      lastUsed: "3 days ago",
      isFavorite: false,
      quickJoin: true,
      estimatedWait: 30,
      currentQueue: 15,
    },
    {
      id: 4,
      serviceType: "government",
      serviceName: "RTO Office - Andheri",
      location: "Andheri East, Mumbai",
      lastUsed: "2 weeks ago",
      isFavorite: false,
      quickJoin: false,
      estimatedWait: 45,
      currentQueue: 22,
    },
  ]

  const handleSearch = (query: string) => {
    console.log("Searching for:", query)
  }

  const handleQueueIdSubmit = (queueId: string) => {
    console.log("Joining queue with ID:", queueId)
  }

  const handleQrScan = () => {
    console.log("Opening QR scanner...")
  }

  const handleQuickJoin = (queueId: string) => {
    console.log("Quick joining queue:", queueId)
  }

  const handleToggleSave = (queueId: string) => {
    console.log("Toggling save for queue:", queueId)
  }

  const getServiceIcon = (serviceId: string) => {
    const service = serviceTypes.find((s) => s.id === serviceId)
    return service?.icon || "📍"
  }

  const getServiceColor = (serviceId: string) => {
    const service = serviceTypes.find((s) => s.id === serviceId)
    return service?.color || "bg-gray-600"
  }

  return (
    <MainLayout>
      <div className="space-y-8 pb-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <QueueSearch onSearch={handleSearch} onQueueIdSubmit={handleQueueIdSubmit} onQrScan={handleQrScan} />
        </section>

        {activeQueues.length > 0 && (
          <section>
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Activity className="h-5 w-5 text-gray-700" />
                  Your Active Queues
                </CardTitle>
                <CardDescription className="text-gray-600">You currently have {activeQueues.length} active queue(s)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {activeQueues.map((queue) => (
                    <div key={queue.id} className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm text-white ${getServiceColor(queue.serviceType)}`}>
                            {getServiceIcon(queue.serviceType)}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{queue.serviceName}</h3>
                            <p className="text-sm text-gray-600">Position {queue.position}</p>
                          </div>
                        </div>
                        <Badge className="border-green-200 bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{queue.estimatedWait} min</span>
                        </div>
                        <Link href="/my-queues">
                          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Saved Queues</h2>
            <Link href="/my-queues">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                View All Saved
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {savedQueues.map((queue) => (
              <Card key={queue.id} className="border-gray-200 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${getServiceColor(queue.serviceType)}`}>
                      {getServiceIcon(queue.serviceType)}
                    </div>
                    <div className="flex items-center gap-1">
                      {queue.isFavorite && <Heart className="h-4 w-4 fill-current text-red-500" />}
                      {queue.quickJoin && <Zap className="h-4 w-4 text-yellow-500" />}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-1 text-base text-gray-900">{queue.serviceName}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">{queue.location}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-gray-600">{queue.estimatedWait} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-gray-600">{queue.currentQueue} in queue</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">Last used: {queue.lastUsed}</div>

                    <div className="flex gap-2">
                      {queue.quickJoin ? (
                        <Button onClick={() => handleQuickJoin(queue.id.toString())} className="flex-1 bg-gray-900 text-white hover:bg-gray-800" size="sm">
                          Find
                        </Button>
                      ) : (
                        <Link href={`/find-services?service=${queue.serviceType}`} className="flex-1">
                          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50" size="sm">
                            Find Service
                          </Button>
                        </Link>
                      )}
                      <Button onClick={() => handleToggleSave(queue.id.toString())} variant="ghost" size="sm" className="p-2">
                        <Bookmark className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Stats</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Queues Joined</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats.totalQueuesJoined}</p>
                  </div>
                  <Users className="h-8 w-8 text-gray-700" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Time Saved</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats.timeSaved}</p>
                  </div>
                  <Clock className="h-8 w-8 text-gray-700" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Money Saved</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats.moneySaved}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-gray-700" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Favorite Service</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats.favoriteService}</p>
                  </div>
                  <Star className="h-8 w-8 text-gray-700" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Popular Nearby Services</CardTitle>
              <CardDescription className="text-gray-600">Quick access to trending services in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleLocations.slice(0, 4).map((location) => {
                  const service = serviceTypes.find((s) => s.id === location.serviceType)
                  return (
                    <div key={location.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50/60 p-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm text-white ${service?.color || "bg-gray-600"}`}>
                          {service?.icon || "📍"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{location.name}</p>
                          <p className="text-xs text-gray-600">
                            {location.currentQueue} in queue • {location.estimatedWaitTime} min
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={location.status === "active" ? "default" : "secondary"}
                        className={
                          location.status === "active"
                            ? "border-green-200 bg-green-100 text-green-800"
                            : "border-yellow-200 bg-yellow-100 text-yellow-800"
                        }
                      >
                        {location.status}
                      </Badge>
                    </div>
                  )
                })}
              </div>
              <Link href="/find-services">
                <Button variant="outline" className="mt-4 w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  View All Nearby Services
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </MainLayout>
  )
}
