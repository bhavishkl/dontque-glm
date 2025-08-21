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
  MapPin, 
  Phone, 
  Clock, 
  Fuel,
  Car,
  Navigation,
  Star,
  Search,
  Filter,
  Grid,
  List
} from "lucide-react"
import { useState } from "react"

export default function CNGPumpsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("distance")
  const [viewMode, setViewMode] = useState("list")

  const cngPumps = [
    {
      id: "1",
      name: "CNG Station - Andheri East",
      address: "Western Express Highway, Andheri East, Mumbai - 400069",
      phone: "+91 22 2834 5678",
      distance: 0.5,
      rating: 4.5,
      status: "active",
      currentQueue: 12,
      estimatedWait: 25,
      price: "₹89.5/kg",
      operatingHours: "24/7",
      facilities: ["Restroom", "Air Fill", "Water", "Snacks"],
      coordinates: { lat: 19.1196, lng: 72.8465 }
    },
    {
      id: "2",
      name: "CNG Station - Powai",
      address: "Hiranandani Gardens, Powai, Mumbai - 400076",
      phone: "+91 22 2570 1234",
      distance: 2.1,
      rating: 4.3,
      status: "active",
      currentQueue: 8,
      estimatedWait: 18,
      price: "₹88.9/kg",
      operatingHours: "6:00 AM - 11:00 PM",
      facilities: ["Restroom", "Air Fill", "Water"],
      coordinates: { lat: 19.1177, lng: 72.9070 }
    },
    {
      id: "3",
      name: "CNG Station - Bandra",
      address: "Linking Road, Bandra West, Mumbai - 400050",
      phone: "+91 22 2642 5678",
      distance: 3.8,
      rating: 4.7,
      status: "busy",
      currentQueue: 15,
      estimatedWait: 32,
      price: "₹90.2/kg",
      operatingHours: "24/7",
      facilities: ["Restroom", "Air Fill", "Water", "Snacks", "Mechanic"],
      coordinates: { lat: 19.0596, lng: 72.8295 }
    },
    {
      id: "4",
      name: "CNG Station - Santacruz",
      address: "SV Road, Santacruz West, Mumbai - 400054",
      phone: "+91 22 2661 9012",
      distance: 1.2,
      rating: 4.2,
      status: "active",
      currentQueue: 6,
      estimatedWait: 15,
      price: "₹89.8/kg",
      operatingHours: "5:30 AM - 10:30 PM",
      facilities: ["Restroom", "Air Fill"],
      coordinates: { lat: 19.0805, lng: 72.8339 }
    },
    {
      id: "5",
      name: "CNG Station - Goregaon",
      address: "Western Express Highway, Goregaon East, Mumbai - 400063",
      phone: "+91 22 2877 3456",
      distance: 4.5,
      rating: 4.0,
      status: "active",
      currentQueue: 9,
      estimatedWait: 20,
      price: "₹89.2/kg",
      operatingHours: "6:00 AM - 10:00 PM",
      facilities: ["Restroom", "Water"],
      coordinates: { lat: 19.1659, lng: 72.8498 }
    },
    {
      id: "6",
      name: "CNG Station - Malad",
      address: "Link Road, Malad West, Mumbai - 400064",
      phone: "+91 22 2880 7890",
      distance: 6.2,
      rating: 4.4,
      status: "busy",
      currentQueue: 18,
      estimatedWait: 38,
      price: "₹88.7/kg",
      operatingHours: "24/7",
      facilities: ["Restroom", "Air Fill", "Water", "Snacks"],
      coordinates: { lat: 19.1873, lng: 72.8498 }
    }
  ]

  const filteredPumps = cngPumps
    .filter(pump => {
      const matchesSearch = pump.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pump.address.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = selectedStatus === "all" || pump.status === selectedStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return a.distance - b.distance
        case "queue":
          return a.currentQueue - b.currentQueue
        case "wait":
          return a.estimatedWait - b.estimatedWait
        case "price":
          return parseFloat(a.price.replace('₹', '').replace('/kg', '')) - 
                 parseFloat(b.price.replace('₹', '').replace('/kg', ''))
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "busy": return "bg-yellow-100 text-yellow-800"
      case "closed": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <Suspense fallback={<Loading />}>
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CNG Pumps</h1>
            <p className="text-gray-600">Find nearby CNG stations and check queue status</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search pumps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="queue">Queue Length</SelectItem>
                  <SelectItem value="wait">Wait Time</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredPumps.length} pumps found
          </p>
        </div>

        {/* Pumps List/Grid */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredPumps.map((pump) => (
            <Card key={pump.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{pump.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {pump.distance} km away
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(pump.status)}>
                    {pump.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Address */}
                  <div>
                    <p className="text-sm text-gray-600">{pump.address}</p>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{pump.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{pump.operatingHours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-gray-500" />
                      <span>{pump.currentQueue} in queue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-gray-500" />
                      <span>{pump.price}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(pump.rating)}
                    </div>
                    <span className="text-sm text-gray-600">({pump.rating})</span>
                  </div>

                  {/* Wait Time */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-900">Estimated Wait Time</span>
                      <span className="text-lg font-bold text-blue-900">{pump.estimatedWait} min</span>
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Facilities</p>
                    <div className="flex flex-wrap gap-1">
                      {pump.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Find Services
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPumps.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No pumps found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={() => {
                setSearchQuery("")
                setSelectedStatus("all")
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
    </Suspense>
  )
}
