"use client"
import { Suspense } from "react"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Car, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Star,
  Award,
  Edit,
  Camera,
  Fuel,
  Clock,
  TrendingUp,
  Shield,
  Utensils,
  Building,
  Stethoscope,
  Users
} from "lucide-react"
import { Loading } from "@/components/loading"
import { serviceTypes, getServiceById } from "@/lib/services"
import { useState } from "react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Rajesh",
    lastName: "Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    address: "123, Andheri East, Mumbai - 400069",
    licenseNumber: "MH01-2023-123456",
    experience: "5 years"
  })

  const vehicleData = {
    vehicleNumber: "MH-01-AB-1234",
    vehicleType: "Auto Rickshaw",
    make: "Bajaj",
    model: "RE",
    year: "2020",
    fuelType: "CNG",
    registrationDate: "15-03-2020",
    insuranceExpiry: "14-03-2025",
    pucExpiry: "20-12-2024",
    lastService: "10-11-2024",
    nextServiceDue: "10-02-2025"
  }

  const statsData = {
    totalQueuesJoined: 89,
    totalServicesUsed: 4,
    averageWaitTime: "18 minutes",
    timeSaved: "12 hours",
    favoriteService: "CNG Pumps",
    rating: 4.8
  }

  const recentActivity = [
    { id: 1, action: "Joined CNG queue at Andheri East", time: "2 hours ago", details: "Position: 3, Wait time: 15 min", serviceType: "cng-pump" },
    { id: 2, action: "Completed clinic appointment", time: "5 hours ago", details: "HealthCheck Clinic - General Consultation", serviceType: "clinic" },
    { id: 3, action: "Joined restaurant queue", time: "1 day ago", details: "Spice Garden - Party of 2", serviceType: "restaurant" },
    { id: 4, action: "Profile updated", time: "2 days ago", details: "Updated phone number", serviceType: "system" },
    { id: 5, action: "Completed government service", time: "3 days ago", details: "PAN Card application processed", serviceType: "government" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'cng-pump':
        return <Fuel className="w-5 h-5 text-green-600" />
      case 'clinic':
        return <Stethoscope className="w-5 h-5 text-blue-600" />
      case 'restaurant':
        return <Utensils className="w-5 h-5 text-orange-600" />
      case 'government':
        return <Building className="w-5 h-5 text-purple-600" />
      default:
        return <Clock className="w-5 h-5 text-blue-600" />
    }
  }

  const getServiceColor = (serviceType: string) => {
    switch (serviceType) {
      case 'cng-pump':
        return 'bg-green-100'
      case 'clinic':
        return 'bg-blue-100'
      case 'restaurant':
        return 'bg-orange-100'
      case 'government':
        return 'bg-purple-100'
      default:
        return 'bg-gray-100'
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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your profile and track activity across all services</p>
          </div>
          <Button 
            variant={isEditing ? "default" : "outline"}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="services">My Services</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic details and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                      </div>
                      <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {formData.firstName} {formData.lastName}
                      </h3>
                      <p className="text-gray-600">QueueHub User</p>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(statsData.rating)}
                        <span className="text-sm text-gray-600">({statsData.rating})</span>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="userType">User Type</Label>
                      <Input
                        id="userType"
                        value="General User"
                        disabled={true}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Member Since</Label>
                      <Input
                        id="memberSince"
                        value="January 2023"
                        disabled={true}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">Verified</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">Verified</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Account</p>
                      <p className="text-sm text-gray-600">Active</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Queues Joined</p>
                      <p className="text-2xl font-bold text-gray-900">{statsData.totalQueuesJoined}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Services Used</p>
                      <p className="text-2xl font-bold text-gray-900">{statsData.totalServicesUsed}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Time Saved</p>
                      <p className="text-2xl font-bold text-gray-900">{statsData.timeSaved}</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Average Wait Time</CardTitle>
                  <CardDescription>Your average waiting time across all pumps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{statsData.averageWaitTime}</div>
                    <p className="text-gray-600">Better than average (25 min)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Favorite Service</CardTitle>
                  <CardDescription>Your most used service category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Fuel className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{statsData.favoriteService}</p>
                      <p className="text-sm text-gray-600">Used 47 times</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest queue activities and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className={`w-10 h-10 ${getServiceColor(activity.serviceType)} rounded-full flex items-center justify-center flex-shrink-0`}>
                        {getServiceIcon(activity.serviceType)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <span className="text-sm text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Services</CardTitle>
                <CardDescription>Services you frequently use and your preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {serviceTypes.map((service) => (
                    <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.category}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Usage Count</span>
                          <span className="text-sm text-gray-600">
                            {service.id === 'cng-pump' ? '47 times' : 
                             service.id === 'clinic' ? '12 times' :
                             service.id === 'restaurant' ? '8 times' : '5 times'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Last Used</span>
                          <span className="text-sm text-gray-600">
                            {service.id === 'cng-pump' ? '2 hours ago' : 
                             service.id === 'clinic' ? '5 hours ago' :
                             service.id === 'restaurant' ? '1 day ago' : '3 days ago'}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Queue Updates</p>
                      <p className="text-sm text-gray-600">Get notified when your queue position changes</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Service Reminders</p>
                      <p className="text-sm text-gray-600">Reminders for upcoming appointments</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Promotional Offers</p>
                      <p className="text-sm text-gray-600">Special offers from partner services</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Preferences</CardTitle>
                <CardDescription>Customize your experience for each service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Fuel className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">CNG Pumps</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Preferred Location</span>
                        <span className="font-medium">Andheri East</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Wait Time</span>
                        <span className="font-medium">30 minutes</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">Clinics</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Preferred Specialty</span>
                        <span className="font-medium">General Physician</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Appointment Type</span>
                        <span className="font-medium">In-person</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
    </Suspense>
  )
}