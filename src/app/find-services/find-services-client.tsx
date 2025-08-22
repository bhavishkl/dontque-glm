"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star,
  Navigation,
  Search,
  Filter,
  Users,
  Heart,
  Share2,
  ArrowRight
} from "lucide-react"
import { serviceTypes, getServiceById, getAllCategories, getQueuePageForService } from "@/lib/services"
import { sampleLocations } from "@/lib/sample-data"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function FindServicesClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState(searchParams.get("service") || "all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("distance")
  const [userLocation, setUserLocation] = useState({ lat: 19.0760, lng: 72.8777 }) // Default to Mumbai

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log("Error getting location:", error)
        }
      )
    }
  }, [])

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const filteredLocations = sampleLocations
    .filter(location => {
      const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           location.address.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesService = selectedService === "all" || location.serviceType === selectedService
      const matchesCategory = selectedCategory === "all" || 
        getServiceById(location.serviceType)?.category === selectedCategory
      return matchesSearch && matchesService && matchesCategory
    })
    .map(location => ({
      ...location,
      distance: calculateDistance(userLocation.lat, userLocation.lng, location.latitude, location.longitude)
    }))
    .sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return a.distance - b.distance
        case "queue":
          return a.currentQueue - b.currentQueue
        case "wait":
          return a.estimatedWaitTime - b.estimatedWaitTime
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const categories = getAllCategories()

  const getServiceIcon = (serviceId: string) => {
    const service = getServiceById(serviceId)
    return service?.icon || "📍"
  }

  const getServiceColor = (serviceId: string) => {
    const service = getServiceById(serviceId)
    return service?.color || "bg-gray-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "busy": return "bg-yellow-100 text-yellow-800"
      case "closed": return "bg-red-100 text-red-800"
      case "maintenance": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const ServiceFilterCard = ({ service }: { service: any }) => {
    const locations = sampleLocations.filter(loc => loc.serviceType === service.id)
    const isSelected = selectedService === service.id
    
    return (
      <div
        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => setSelectedService(isSelected ? "all" : service.id)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${service.color} rounded-lg flex items-center justify-center text-lg`}>
            {service.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{service.name}</h3>
            <p className="text-sm text-gray-600">{locations.length} locations</p>
          </div>
          {isSelected && (
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const LocationCard = ({ location }: { location: any }) => {
    const service = getServiceById(location.serviceType)
    
    // Generate a 6-digit queue ID based on location ID
    const queueId = String(100000 + (location.id % 900000)).padStart(6, '0')
    
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${service?.color || 'bg-gray-600'} rounded-lg flex items-center justify-center text-lg`}>
                {service?.icon || '📍'}
              </div>
              <div>
                <CardTitle className="text-lg">{location.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {location.distance.toFixed(1)} km away
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Queue ID</div>
              <div className="text-lg font-mono font-bold text-blue-600">
                {queueId}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Rating section - outside queue status */}
            <div className="flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-lg font-bold text-yellow-800">{location.rating.toFixed(1)}</span>
                <span className="text-sm text-yellow-700">rating</span>
              </div>
            </div>

            {/* Main content split: static info (left) and queue status (right) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Static information */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <p className="text-sm text-gray-600">{location.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{location.operatingHours}</span>
                  </div>
                </div>

                {/* Facilities */}
                {location.facilities && location.facilities.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Facilities</p>
                    <div className="flex flex-wrap gap-1">
                      {location.facilities.slice(0, 4).map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                      {location.facilities.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{location.facilities.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Specialties */}
                {location.specialties && location.specialties.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-1">
                      {location.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Queue status panel */}
              <div className="md:col-span-1">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 h-full flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">Status</span>
                    <Badge className={getStatusColor(location.status)}>{location.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">In Queue</span>
                    <span className="text-lg font-bold text-blue-900">{location.currentQueue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">Estimated Wait</span>
                    <span className="text-lg font-bold text-blue-900">{location.estimatedWaitTime} min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  const queuePage = getQueuePageForService(location.serviceType);
                  router.push(`${queuePage}?service=${location.serviceType}&location=${location.id}&name=${encodeURIComponent(location.name)}`);
                }}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Join Queue
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Services</h1>
        </div>

        <Tabs defaultValue="search" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search Services</TabsTrigger>
            <TabsTrigger value="browse">Browse by Category</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            {/* Search and Filters */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search locations, services, or addresses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  {/* Filters Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Service Type</label>
                      <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="All Services" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">🔍 All Services</SelectItem>
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
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">📂 All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              📂 {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Sort By</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="distance">📍 Distance</SelectItem>
                          <SelectItem value="queue">👥 Queue Length</SelectItem>
                          <SelectItem value="wait">⏰ Wait Time</SelectItem>
                          <SelectItem value="rating">⭐ Rating</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Actions</label>
                      <Button 
                        variant="outline" 
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedService("all")
                          setSelectedCategory("all")
                          setSortBy("distance")
                        }}
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm font-medium text-gray-700">
                  {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} found
                </p>
                {(searchQuery || selectedService !== "all" || selectedCategory !== "all" || sortBy !== "distance") && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                    Filters Active
                  </Badge>
                )}
              </div>
              <div className="text-xs text-gray-500">
                Sorted by {sortBy === "distance" ? "Distance" : sortBy === "queue" ? "Queue Length" : sortBy === "wait" ? "Wait Time" : "Rating"}
              </div>
            </div>

            {/* Locations List */}
            <div className="space-y-4">
              {filteredLocations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>

            {filteredLocations.length === 0 && (
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No locations found</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We couldn't find any locations matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedService("all")
                        setSelectedCategory("all")
                        setSortBy("distance")
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Clear All Filters
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedService("all")}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Browse All Services
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="browse" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Service Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ServiceFilterCard service={{ id: "all", name: "All Services", icon: "🔍", color: "bg-gray-600", category: "All", features: [] }} />
                {serviceTypes.map((service) => (
                  <ServiceFilterCard key={service.id} service={service} />
                ))}
              </div>
            </div>

            {/* Show filtered results based on service selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedService === "all" ? "All Locations" : `${getServiceById(selectedService)?.name || 'Service'} Locations`}
                </h3>
                <p className="text-sm text-gray-600">
                  {filteredLocations.length} locations found
                </p>
              </div>

              {/* Locations List */}
              <div className="space-y-4">
                {filteredLocations.map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))}
              </div>

              {filteredLocations.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No locations found</h3>
                    <p className="text-gray-600 mb-4">
                      Try selecting a different service type
                    </p>
                    <Button onClick={() => setSelectedService("all")}>
                      Show All Services
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}