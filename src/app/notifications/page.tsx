"use client"
import { Suspense } from "react"
import { Loading } from "@/components/loading"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Clock,
  MapPin,
  Car,
  Fuel,
  TrendingUp,
  Settings,
  Trash2,
  Filter,
  Stethoscope,
  Utensils,
  Building,
  Users
} from "lucide-react"
import { useState } from "react"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "queue_update",
      serviceType: "cng-pump",
      title: "Your position has changed",
      message: "You are now at position 3 in the queue at Andheri East CNG Station",
      time: "2 minutes ago",
      read: false,
      priority: "high",
      action: {
        text: "View Queue",
        url: "/queue-status"
      }
    },
    {
      id: 2,
      type: "queue_update",
      serviceType: "clinic",
      title: "Appointment reminder",
      message: "Your appointment at HealthCheck Clinic is in 2 hours",
      time: "15 minutes ago",
      read: false,
      priority: "high",
      action: {
        text: "View Details",
        url: "/queue-status"
      }
    },
    {
      id: 3,
      type: "service_status",
      serviceType: "cng-pump",
      title: "Pump status update",
      message: "CNG Station - Bandra is now busy with longer wait times",
      time: "30 minutes ago",
      read: false,
      priority: "medium",
      action: {
        text: "View Pumps",
        url: "/locator"
      }
    },
    {
      id: 4,
      type: "queue_update",
      serviceType: "restaurant",
      title: "Table ready soon",
      message: "Your table at Spice Garden will be ready in 15 minutes",
      time: "1 hour ago",
      read: true,
      priority: "medium",
      action: {
        text: "View Queue",
        url: "/queue-status"
      }
    },
    {
      id: 5,
      type: "reminder",
      serviceType: "government",
      title: "Document processing update",
      message: "Your PAN Card application is under review",
      time: "2 hours ago",
      read: true,
      priority: "medium",
      action: {
        text: "Track Status",
        url: "/queue-status"
      }
    },
    {
      id: 6,
      type: "queue_update",
      serviceType: "cng-pump",
      title: "Almost your turn!",
      message: "You are next in line at Andheri East CNG Station",
      time: "3 hours ago",
      read: true,
      priority: "high",
      action: {
        text: "View Queue",
        url: "/queue-status"
      }
    },
    {
      id: 7,
      type: "promotion",
      serviceType: "cng-pump",
      title: "Special offer!",
      message: "Get 5% discount on CNG at Powai station this week",
      time: "4 hours ago",
      read: true,
      priority: "low",
      action: {
        text: "View Offer",
        url: "/locator"
      }
    },
    {
      id: 8,
      type: "system",
      serviceType: "system",
      title: "App update available",
      message: "Version 2.1 is now available with new features",
      time: "5 hours ago",
      read: true,
      priority: "medium",
      action: {
        text: "Update Now",
        url: "#"
      }
    },
    {
      id: 9,
      type: "queue_update",
      serviceType: "clinic",
      title: "Doctor available",
      message: "Dr. Sharma is now available for your consultation",
      time: "6 hours ago",
      read: true,
      priority: "high",
      action: {
        text: "Find Services",
        url: "/find-services"
      }
    },
    {
      id: 10,
      type: "service_status",
      serviceType: "restaurant",
      title: "Restaurant busy",
      message: "Spice Garden is experiencing high demand tonight",
      time: "1 day ago",
      read: true,
      priority: "medium",
      action: {
        text: "View Alternatives",
        url: "/locator"
      }
    },
    {
      id: 11,
      type: "queue_update",
      serviceType: "cng-pump",
      title: "Queue completed",
      message: "You have successfully completed fueling at Andheri East",
      time: "1 day ago",
      read: true,
      priority: "high",
      action: null
    },
    {
      id: 12,
      type: "alert",
      serviceType: "system",
      title: "Profile incomplete",
      message: "Please complete your profile for better service experience",
      time: "2 days ago",
      read: true,
      priority: "medium",
      action: {
        text: "Complete Profile",
        url: "/profile"
      }
    }
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notif.read
    return notif.type === activeTab
  })

  const getNotificationIcon = (type: string, serviceType?: string) => {
    switch (type) {
      case "queue_update":
        switch (serviceType) {
          case 'cng-pump':
            return <Fuel className="w-5 h-5" />
          case 'clinic':
            return <Stethoscope className="w-5 h-5" />
          case 'restaurant':
            return <Utensils className="w-5 h-5" />
          case 'government':
            return <Building className="w-5 h-5" />
          default:
            return <Users className="w-5 h-5" />
        }
      case "service_status":
        switch (serviceType) {
          case 'cng-pump':
            return <Fuel className="w-5 h-5" />
          case 'clinic':
            return <Stethoscope className="w-5 h-5" />
          case 'restaurant':
            return <Utensils className="w-5 h-5" />
          case 'government':
            return <Building className="w-5 h-5" />
          default:
            return <MapPin className="w-5 h-5" />
        }
      case "reminder":
        return <Clock className="w-5 h-5" />
      case "promotion":
        return <TrendingUp className="w-5 h-5" />
      case "system":
        return <Settings className="w-5 h-5" />
      case "alert":
        return <AlertCircle className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getNotificationColor = (type: string, serviceType?: string) => {
    switch (type) {
      case "queue_update":
        switch (serviceType) {
          case 'cng-pump':
            return "bg-green-100 text-green-600"
          case 'clinic':
            return "bg-blue-100 text-blue-600"
          case 'restaurant':
            return "bg-orange-100 text-orange-600"
          case 'government':
            return "bg-purple-100 text-purple-600"
          default:
            return "bg-blue-100 text-blue-600"
        }
      case "service_status":
        switch (serviceType) {
          case 'cng-pump':
            return "bg-green-100 text-green-600"
          case 'clinic':
            return "bg-blue-100 text-blue-600"
          case 'restaurant':
            return "bg-orange-100 text-orange-600"
          case 'government':
            return "bg-purple-100 text-purple-600"
          default:
            return "bg-gray-100 text-gray-600"
        }
      case "reminder":
        return "bg-yellow-100 text-yellow-600"
      case "promotion":
        return "bg-purple-100 text-purple-600"
      case "system":
        return "bg-gray-100 text-gray-600"
      case "alert":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Suspense fallback={<Loading />}>
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-900" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">Stay updated with queue status and service alerts</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
            <Button variant="outline" onClick={clearAllNotifications}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear all
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
                <p className="text-sm text-gray-600">Unread</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {notifications.filter(n => n.priority === 'high').length}
                </div>
                <p className="text-sm text-gray-600">High Priority</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {notifications.filter(n => n.type === 'queue_update').length}
                </div>
                <p className="text-sm text-gray-600">Queue Updates</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Filters */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="queue_update">Queue</TabsTrigger>
            <TabsTrigger value="service_status">Services</TabsTrigger>
            <TabsTrigger value="reminder">Reminders</TabsTrigger>
            <TabsTrigger value="promotion">Offers</TabsTrigger>
            <TabsTrigger value="alert">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-600">
                    {activeTab === "unread" 
                      ? "You're all caught up!" 
                      : "No notifications in this category."
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`transition-all hover:shadow-md ${!notification.read ? 'border-blue-200 bg-blue-50' : ''}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type, notification.serviceType)}`}>
                          {getNotificationIcon(notification.type, notification.serviceType)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority}
                                </Badge>
                              </div>
                              <p className="text-gray-600 mb-2">{notification.message}</p>
                              <p className="text-sm text-gray-500">{notification.time}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              {!notification.read && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          {notification.action && (
                            <div className="mt-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  // In a real app, this would navigate to the URL
                                  console.log("Navigate to:", notification.action.url)
                                }}
                              >
                                {notification.action.text}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Manage your notification preferences for each service type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Queue Updates</p>
                  <p className="text-sm text-gray-600">Get notified when your position changes in any queue</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600">Enabled</span>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Service Status</p>
                  <p className="text-sm text-gray-600">Receive updates about service availability and status</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600">Enabled</span>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">CNG Pump Alerts</p>
                  <p className="text-sm text-gray-600">Price updates and pump status for CNG stations</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600">Enabled</span>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Clinic Reminders</p>
                  <p className="text-sm text-gray-600">Appointment reminders and doctor availability</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600">Enabled</span>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Restaurant Updates</p>
                  <p className="text-sm text-gray-600">Table readiness and restaurant status updates</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600">Enabled</span>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Government Service Alerts</p>
                  <p className="text-sm text-gray-600">Document processing and appointment updates</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600">Enabled</span>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Promotions</p>
                  <p className="text-sm text-gray-600">Get special offers and discounts from partner services</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Disabled</span>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
    </Suspense>
  )
}
