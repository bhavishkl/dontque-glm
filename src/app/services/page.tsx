"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Star,
  Users,
  Clock,
  MapPin,
  PlusCircle,
  Heart,
  Zap
} from "lucide-react"
import { serviceTypes, getAllCategories } from "@/lib/services"
import { sampleLocations } from "@/lib/sample-data"
import { useState } from "react"
import Link from "next/link"

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState("grid")

  const filteredServices = serviceTypes
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "category":
          return a.category.localeCompare(b.category)
        case "popular":
        default:
          // For demo, we'll sort by the number of locations available
          const aLocations = sampleLocations.filter(loc => loc.serviceType === a.id).length
          const bLocations = sampleLocations.filter(loc => loc.serviceType === b.id).length
          return bLocations - aLocations
      }
    })

  const categories = getAllCategories()

  const getServiceStats = (serviceId: string) => {
    const locations = sampleLocations.filter(loc => loc.serviceType === serviceId)
    const totalQueues = locations.reduce((sum, loc) => sum + loc.currentQueue, 0)
    const avgRating = locations.reduce((sum, loc) => sum + loc.rating, 0) / locations.length
    const avgWaitTime = locations.reduce((sum, loc) => sum + loc.estimatedWaitTime, 0) / locations.length
    
    return {
      locations: locations.length,
      totalQueues,
      avgRating: avgRating || 0,
      avgWaitTime: Math.round(avgWaitTime) || 0
    }
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">All Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join virtual queues for any service type. From CNG pumps to clinics, restaurants to government offices - we've got you covered.
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredServices.length} services found
          </p>
        </div>

        {/* Services Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const stats = getServiceStats(service.id)
              
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center text-2xl`}>
                          {service.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <CardDescription className="text-sm">{service.category}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">{service.description}</p>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{stats.locations} locations</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{stats.totalQueues} in queues</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{stats.avgRating.toFixed(1)} rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{stats.avgWaitTime} min avg</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {service.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{service.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Link href={`/join-queue?service=${service.id}`}>
                          <Button className="w-full">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Join Queue
                          </Button>
                        </Link>
                        <Link href={`/find-services?service=${service.id}`}>
                          <Button variant="outline" className="w-full">
                            <MapPin className="w-4 h-4 mr-2" />
                            Find Locations
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredServices.map((service) => {
              const stats = getServiceStats(service.id)
              
              return (
                <Card key={service.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center text-3xl flex-shrink-0`}>
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.category}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">{stats.avgRating.toFixed(1)}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{stats.locations}</div>
                            <p className="text-xs text-gray-600">Locations</p>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{stats.totalQueues}</div>
                            <p className="text-xs text-gray-600">Total Queues</p>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">{stats.avgWaitTime}m</div>
                            <p className="text-xs text-gray-600">Avg Wait</p>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-orange-600">{service.features.length}</div>
                            <p className="text-xs text-gray-600">Features</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {service.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/join-queue?service=${service.id}`}>
                            <Button>
                              <PlusCircle className="w-4 h-4 mr-2" />
                              Join Queue
                            </Button>
                          </Link>
                          <Link href={`/find-services?service=${service.id}`}>
                            <Button variant="outline">
                              <MapPin className="w-4 h-4 mr-2" />
                              Find Locations
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {filteredServices.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}