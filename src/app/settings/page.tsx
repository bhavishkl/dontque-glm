"use client"
import { Suspense } from "react"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Loading } from "@/components/loading"
import { 
  Settings, 
  Bell, 
  MapPin, 
  User, 
  Shield,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Database,
  LogOut,
  Download,
  Upload,
  Trash2,
  Fuel,
  Stethoscope,
  Utensils,
  Building
} from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      queueUpdates: true,
      serviceStatus: true,
      promotions: false,
      reminders: true,
      emailNotifications: false,
      pushNotifications: true,
      cngPumpAlerts: true,
      clinicReminders: true,
      restaurantUpdates: true,
      governmentAlerts: true
    },
    appearance: {
      theme: "light",
      language: "english",
      fontSize: "medium",
      highContrast: false
    },
    location: {
      autoLocation: true,
      defaultRadius: "5",
      favoriteLocations: {
        "cng-pump": ["CNG Station - Andheri East", "CNG Station - Powai"],
        "clinic": ["HealthCheck Clinic - Andheri", "City Hospital - Bandra"],
        "restaurant": ["Spice Garden - Powai", "Biryani House - Andheri"],
        "government": ["RTO Office - Andheri", "PAN Center - Powai"]
      }
    },
    privacy: {
      shareLocation: true,
      shareStats: false,
      allowAnalytics: true,
      dataCollection: true
    },
    services: {
      "cng-pump": {
        enabled: true,
        maxWaitTime: "30",
        priceAlerts: true,
        favoriteFuelType: "CNG"
      },
      "clinic": {
        enabled: true,
        preferredSpecialty: "General Physician",
        appointmentType: "in-person",
        reminderTime: "24"
      },
      "restaurant": {
        enabled: true,
        preferredCuisine: "Indian",
        partySize: "2",
        dietaryRestrictions: ""
      },
      "government": {
        enabled: true,
        documentType: "PAN Card",
        appointmentReminders: true,
        statusUpdates: true
      }
    }
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }))
  }

  const handleAppearanceChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      appearance: { ...prev.appearance, [key]: value }
    }))
  }

  const handleLocationChange = (key: string, value: string | boolean | string[]) => {
    setSettings(prev => ({
      ...prev,
      location: { ...prev.location, [key]: value }
    }))
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value }
    }))
  }

  const handleServiceChange = (serviceType: string, key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      services: { 
        ...prev.services, 
        [serviceType]: { ...prev.services[serviceType as keyof typeof prev.services], [key]: value }
      }
    }))
  }

  return (
    <Suspense fallback={<Loading />}>
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-gray-900" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your app preferences and account</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="queue-updates" className="text-base font-medium">Queue Updates</Label>
                      <p className="text-sm text-gray-600">Get notified when your position changes</p>
                    </div>
                    <Switch
                      id="queue-updates"
                      checked={settings.notifications.queueUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("queueUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="service-status" className="text-base font-medium">Service Status</Label>
                      <p className="text-sm text-gray-600">Receive updates about service availability</p>
                    </div>
                    <Switch
                      id="service-status"
                      checked={settings.notifications.serviceStatus}
                      onCheckedChange={(checked) => handleNotificationChange("serviceStatus", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="promotions" className="text-base font-medium">Promotions</Label>
                      <p className="text-sm text-gray-600">Get special offers and discounts</p>
                    </div>
                    <Switch
                      id="promotions"
                      checked={settings.notifications.promotions}
                      onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reminders" className="text-base font-medium">Reminders</Label>
                      <p className="text-sm text-gray-600">Service and document renewal reminders</p>
                    </div>
                    <Switch
                      id="reminders"
                      checked={settings.notifications.reminders}
                      onCheckedChange={(checked) => handleNotificationChange("reminders", checked)}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium mb-4">Service-Specific Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-green-600" />
                        <Label htmlFor="cng-alerts" className="text-base font-medium">CNG Pump Alerts</Label>
                      </div>
                      <Switch
                        id="cng-alerts"
                        checked={settings.notifications.cngPumpAlerts}
                        onCheckedChange={(checked) => handleNotificationChange("cngPumpAlerts", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-blue-600" />
                        <Label htmlFor="clinic-reminders" className="text-base font-medium">Clinic Reminders</Label>
                      </div>
                      <Switch
                        id="clinic-reminders"
                        checked={settings.notifications.clinicReminders}
                        onCheckedChange={(checked) => handleNotificationChange("clinicReminders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-orange-600" />
                        <Label htmlFor="restaurant-updates" className="text-base font-medium">Restaurant Updates</Label>
                      </div>
                      <Switch
                        id="restaurant-updates"
                        checked={settings.notifications.restaurantUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("restaurantUpdates", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-purple-600" />
                        <Label htmlFor="government-alerts" className="text-base font-medium">Government Service Alerts</Label>
                      </div>
                      <Switch
                        id="government-alerts"
                        checked={settings.notifications.governmentAlerts}
                        onCheckedChange={(checked) => handleNotificationChange("governmentAlerts", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Service Preferences
                </CardTitle>
                <CardDescription>
                  Customize your preferences for each service type
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* CNG Pump Settings */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Fuel className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold">CNG Pumps</h3>
                    <Switch
                      checked={settings.services["cng-pump"].enabled}
                      onCheckedChange={(checked) => handleServiceChange("cng-pump", "enabled", checked)}
                    />
                  </div>
                  <div className="ml-7 space-y-3">
                    <div>
                      <Label htmlFor="max-wait-cng" className="text-sm font-medium">Maximum Wait Time</Label>
                      <Select value={settings.services["cng-pump"].maxWaitTime} onValueChange={(value) => handleServiceChange("cng-pump", "maxWaitTime", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="price-alerts-cng" className="text-sm font-medium">Price Alerts</Label>
                      <Switch
                        id="price-alerts-cng"
                        checked={settings.services["cng-pump"].priceAlerts}
                        onCheckedChange={(checked) => handleServiceChange("cng-pump", "priceAlerts", checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Clinic Settings */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Clinics</h3>
                    <Switch
                      checked={settings.services["clinic"].enabled}
                      onCheckedChange={(checked) => handleServiceChange("clinic", "enabled", checked)}
                    />
                  </div>
                  <div className="ml-7 space-y-3">
                    <div>
                      <Label htmlFor="preferred-specialty" className="text-sm font-medium">Preferred Specialty</Label>
                      <Select value={settings.services["clinic"].preferredSpecialty} onValueChange={(value) => handleServiceChange("clinic", "preferredSpecialty", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Physician">General Physician</SelectItem>
                          <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                          <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                          <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="appointment-type" className="text-sm font-medium">Appointment Type</Label>
                      <Select value={settings.services["clinic"].appointmentType} onValueChange={(value) => handleServiceChange("clinic", "appointmentType", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-person">In-person</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="any">Any Available</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="reminder-time" className="text-sm font-medium">Reminder Time (hours before)</Label>
                      <Select value={settings.services["clinic"].reminderTime} onValueChange={(value) => handleServiceChange("clinic", "reminderTime", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 hour</SelectItem>
                          <SelectItem value="6">6 hours</SelectItem>
                          <SelectItem value="12">12 hours</SelectItem>
                          <SelectItem value="24">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Restaurant Settings */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Utensils className="w-5 h-5 text-orange-600" />
                    <h3 className="text-lg font-semibold">Restaurants</h3>
                    <Switch
                      checked={settings.services["restaurant"].enabled}
                      onCheckedChange={(checked) => handleServiceChange("restaurant", "enabled", checked)}
                    />
                  </div>
                  <div className="ml-7 space-y-3">
                    <div>
                      <Label htmlFor="preferred-cuisine" className="text-sm font-medium">Preferred Cuisine</Label>
                      <Select value={settings.services["restaurant"].preferredCuisine} onValueChange={(value) => handleServiceChange("restaurant", "preferredCuisine", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Indian">Indian</SelectItem>
                          <SelectItem value="Chinese">Chinese</SelectItem>
                          <SelectItem value="Italian">Italian</SelectItem>
                          <SelectItem value="Mexican">Mexican</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="party-size" className="text-sm font-medium">Default Party Size</Label>
                      <Select value={settings.services["restaurant"].partySize} onValueChange={(value) => handleServiceChange("restaurant", "partySize", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 person</SelectItem>
                          <SelectItem value="2">2 people</SelectItem>
                          <SelectItem value="4">4 people</SelectItem>
                          <SelectItem value="6">6 people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dietary-restrictions" className="text-sm font-medium">Dietary Restrictions</Label>
                      <Input 
                        id="dietary-restrictions"
                        value={settings.services["restaurant"].dietaryRestrictions}
                        onChange={(e) => handleServiceChange("restaurant", "dietaryRestrictions", e.target.value)}
                        placeholder="e.g., Vegetarian, Gluten-free"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Government Services Settings */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold">Government Services</h3>
                    <Switch
                      checked={settings.services["government"].enabled}
                      onCheckedChange={(checked) => handleServiceChange("government", "enabled", checked)}
                    />
                  </div>
                  <div className="ml-7 space-y-3">
                    <div>
                      <Label htmlFor="document-type" className="text-sm font-medium">Default Document Type</Label>
                      <Select value={settings.services["government"].documentType} onValueChange={(value) => handleServiceChange("government", "documentType", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PAN Card">PAN Card</SelectItem>
                          <SelectItem value="Driving License">Driving License</SelectItem>
                          <SelectItem value="Passport">Passport</SelectItem>
                          <SelectItem value="Aadhar Card">Aadhar Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="appointment-reminders" className="text-sm font-medium">Appointment Reminders</Label>
                      <Switch
                        id="appointment-reminders"
                        checked={settings.services["government"].appointmentReminders}
                        onCheckedChange={(checked) => handleServiceChange("government", "appointmentReminders", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="status-updates" className="text-sm font-medium">Status Updates</Label>
                      <Switch
                        id="status-updates"
                        checked={settings.services["government"].statusUpdates}
                        onCheckedChange={(checked) => handleServiceChange("government", "statusUpdates", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {settings.appearance.theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize how the app looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="theme" className="text-base font-medium">Theme</Label>
                    <Select value={settings.appearance.theme} onValueChange={(value) => handleAppearanceChange("theme", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto (System)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language" className="text-base font-medium">Language</Label>
                    <Select value={settings.appearance.language} onValueChange={(value) => handleAppearanceChange("language", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                        <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                        <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                        <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="font-size" className="text-base font-medium">Font Size</Label>
                    <Select value={settings.appearance.fontSize} onValueChange={(value) => handleAppearanceChange("fontSize", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="x-large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="high-contrast" className="text-base font-medium">High Contrast</Label>
                      <p className="text-sm text-gray-600">Improve visibility with high contrast mode</p>
                    </div>
                    <Switch
                      id="high-contrast"
                      checked={settings.appearance.highContrast}
                      onCheckedChange={(checked) => handleAppearanceChange("highContrast", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location Settings
                </CardTitle>
                <CardDescription>
                  Manage your location preferences and favorite service locations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-location" className="text-base font-medium">Auto-detect Location</Label>
                      <p className="text-sm text-gray-600">Automatically find nearby services</p>
                    </div>
                    <Switch
                      id="auto-location"
                      checked={settings.location.autoLocation}
                      onCheckedChange={(checked) => handleLocationChange("autoLocation", checked)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="search-radius" className="text-base font-medium">Default Search Radius</Label>
                    <Select value={settings.location.defaultRadius} onValueChange={(value) => handleLocationChange("defaultRadius", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select radius" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 km</SelectItem>
                        <SelectItem value="3">3 km</SelectItem>
                        <SelectItem value="5">5 km</SelectItem>
                        <SelectItem value="10">10 km</SelectItem>
                        <SelectItem value="15">15 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium mb-4">Favorite Locations</h4>
                  <div className="space-y-4">
                    {/* CNG Pumps */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Fuel className="w-4 h-4 text-green-600" />
                        <h5 className="font-medium">CNG Pumps</h5>
                      </div>
                      <div className="space-y-2 ml-6">
                        {settings.location.favoriteLocations["cng-pump"].map((location, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                            <span className="text-sm">{location}</span>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full">
                          Add CNG Pump
                        </Button>
                      </div>
                    </div>

                    {/* Clinics */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className="w-4 h-4 text-blue-600" />
                        <h5 className="font-medium">Clinics</h5>
                      </div>
                      <div className="space-y-2 ml-6">
                        {settings.location.favoriteLocations["clinic"].map((location, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                            <span className="text-sm">{location}</span>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full">
                          Add Clinic
                        </Button>
                      </div>
                    </div>

                    {/* Restaurants */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Utensils className="w-4 h-4 text-orange-600" />
                        <h5 className="font-medium">Restaurants</h5>
                      </div>
                      <div className="space-y-2 ml-6">
                        {settings.location.favoriteLocations["restaurant"].map((location, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                            <span className="text-sm">{location}</span>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full">
                          Add Restaurant
                        </Button>
                      </div>
                    </div>

                    {/* Government Offices */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 text-purple-600" />
                        <h5 className="font-medium">Government Offices</h5>
                      </div>
                      <div className="space-y-2 ml-6">
                        {settings.location.favoriteLocations["government"].map((location, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                            <span className="text-sm">{location}</span>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full">
                          Add Government Office
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Control your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="share-location" className="text-base font-medium">Share Location</Label>
                      <p className="text-sm text-gray-600">Allow app to access your location</p>
                    </div>
                    <Switch
                      id="share-location"
                      checked={settings.privacy.shareLocation}
                      onCheckedChange={(checked) => handlePrivacyChange("shareLocation", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="share-stats" className="text-base font-medium">Share Statistics</Label>
                      <p className="text-sm text-gray-600">Share anonymous usage statistics</p>
                    </div>
                    <Switch
                      id="share-stats"
                      checked={settings.privacy.shareStats}
                      onCheckedChange={(checked) => handlePrivacyChange("shareStats", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-analytics" className="text-base font-medium">Allow Analytics</Label>
                      <p className="text-sm text-gray-600">Help improve the app with analytics</p>
                    </div>
                    <Switch
                      id="allow-analytics"
                      checked={settings.privacy.allowAnalytics}
                      onCheckedChange={(checked) => handlePrivacyChange("allowAnalytics", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-collection" className="text-base font-medium">Data Collection</Label>
                      <p className="text-sm text-gray-600">Collect data for personalized experience</p>
                    </div>
                    <Switch
                      id="data-collection"
                      checked={settings.privacy.dataCollection}
                      onCheckedChange={(checked) => handlePrivacyChange("dataCollection", checked)}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium mb-4">Data Management</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Data
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete My Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your account information and security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
                    <Input id="email" type="email" value="rajesh.kumar@email.com" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base font-medium">Phone Number</Label>
                    <Input id="phone" type="tel" value="+91 98765 43210" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-base font-medium">Password</Label>
                    <Input id="password" type="password" value="********" className="mt-2" />
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Change Password
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium mb-4">Connected Devices</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Samsung Galaxy S21</p>
                          <p className="text-sm text-gray-600">Mumbai, India • Active now</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Current</Badge>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium mb-4">Danger Zone</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                      <Database className="w-4 h-4 mr-2" />
                      Clear All Data
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      <LogOut className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
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
