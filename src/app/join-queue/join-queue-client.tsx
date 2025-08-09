"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  MapPin, 
  Clock, 
  Users, 
  Car, 
  Fuel,
  AlertCircle,
  CheckCircle,
  Search,
  User,
  Phone,
  Calendar,
  Stethoscope,
  Utensils,
  Building,
  Star
} from "lucide-react"
import { serviceTypes, getServiceById, ServiceField } from "@/lib/services"
import { sampleLocations, getLocationsByService } from "@/lib/sample-data"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function JoinQueueClient() {
  const searchParams = useSearchParams()
  const [selectedService, setSelectedService] = useState(searchParams.get("service") || "")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const service = selectedService ? getServiceById(selectedService) : null
  const locations = selectedService ? getLocationsByService(selectedService) : []

  useEffect(() => {
    // Reset form data when service changes
    setFormData({})
    setSelectedLocation("")
  }, [selectedService])

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const renderField = (field: ServiceField) => {
    const value = formData[field.name] || ""
    
    switch (field.type) {
      case "select":
        return (
          <Select value={value} onValueChange={(v) => handleFieldChange(field.name, v)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, "-")}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      case "tel":
        return (
          <Input
            type="tel"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        )
      
      case "email":
        return (
          <Input
            type="email"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        )
      
      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        )
      
      default:
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        )
    }
  }

  const getServiceIcon = (serviceId: string) => {
    const service = getServiceById(serviceId)
    return service?.icon || "📍"
  }

  const getServiceColor = (serviceId: string) => {
    const service = getServiceById(serviceId)
    return service?.color || "bg-gray-600"
  }

  if (isSubmitted) {
    const location = locations.find(loc => loc.id === selectedLocation)
    
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Joined Queue!</h2>
              <p className="text-gray-600 mb-6">
                You have been added to the queue at {location?.name}
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {(location?.currentQueue || 0) + 1}
                    </div>
                    <p className="text-sm text-gray-600">Your Position</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {location?.estimatedWaitTime}
                    </div>
                    <p className="text-sm text-gray-600">Est. Wait (mins)</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {service?.icon}
                    </div>
                    <p className="text-sm text-gray-600">Service Type</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button onClick={() => window.location.href = "/"}>
                  Go to Dashboard
                </Button>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Join Another Queue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Join Queue</h1>
          <p className="text-gray-600">Select a service and location to join the queue</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Service Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Service</CardTitle>
                <CardDescription>
                  Choose the type of service you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceTypes.map((serviceType) => (
                    <div
                      key={serviceType.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedService === serviceType.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedService(serviceType.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${serviceType.color} rounded-lg flex items-center justify-center text-lg`}>
                          {serviceType.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{serviceType.name}</h3>
                          <p className="text-sm text-gray-600">{serviceType.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location Selection */}
            {selectedService && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Select Location</CardTitle>
                  <CardDescription>
                    Choose where you want to join the queue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{location.name}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {location.currentQueue} in queue
                              </Badge>
                              <Badge 
                                variant={location.status === 'active' ? 'default' : 'secondary'}
                                className={location.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                              >
                                {location.status}
                              </Badge>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* User Information Form */}
            {selectedService && selectedLocation && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>
                    Please provide your details to join the queue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service?.fields.map((field) => (
                        <div key={field.name} className="space-y-2">
                          <Label htmlFor={field.name}>{field.label} {field.required && "*"}</Label>
                          {renderField(field)}
                        </div>
                      ))}
                    </div>

                    {selectedLocation && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          You are about to join the queue at {locations.find(l => l.id === selectedLocation)?.name}. 
                          Current wait time is approximately {locations.find(l => l.id === selectedLocation)?.estimatedWaitTime} minutes.
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={!selectedService || !selectedLocation || isSubmitting || 
                        service?.fields.some(field => field.required && !formData[field.name])
                      }
                    >
                      {isSubmitting ? "Joining Queue..." : "Join Queue"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Available Locations */}
          <div>
            {selectedService ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Available Locations
                  </CardTitle>
                  <CardDescription>
                    {service?.name} locations in your area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {locations.map((location) => (
                      <div 
                        key={location.id} 
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedLocation === location.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedLocation(location.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-900 text-sm">{location.name}</h3>
                          <Badge 
                            variant={location.status === 'active' ? 'default' : 'secondary'}
                            className={location.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                          >
                            {location.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{location.address}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">{location.currentQueue} in queue</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">{location.estimatedWaitTime} min wait</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">{location.rating.toFixed(1)} rating</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">2.5 km away</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto`}>
                    ❓
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Service</h3>
                  <p className="text-gray-600">
                    Choose a service type to see available locations and join the queue
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}