"use client"
import { Suspense } from "react"
import { Loading } from "@/components/loading"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users, 
  Clock, 
  MapPin, 
  Car, 
  Fuel,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Activity,
  Timer,
  User
} from "lucide-react"
import { useState, useEffect } from "react"

export default function QueueStatusPage() {
  const [selectedPump, setSelectedPump] = useState("1")
  const [currentTime, setCurrentTime] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(timer)
  }, [])

  const cngPumps = [
    { id: "1", name: "CNG Station - Andheri East", status: "active" },
    { id: "2", name: "CNG Station - Powai", status: "active" },
    { id: "3", name: "CNG Station - Bandra", status: "busy" },
    { id: "4", name: "CNG Station - Santacruz", status: "active" },
  ]

  const queueData = {
    "1": {
      totalInQueue: 12,
      currentlyServing: 3,
      averageServiceTime: 8,
      estimatedWaitPerPerson: 6,
      queue: [
        { position: 1, vehicleNumber: "MH-01-AB-1234", driverName: "Rajesh Kumar", waitTime: 0, status: "serving" },
        { position: 2, vehicleNumber: "MH-02-CD-5678", driverName: "Suresh Patel", waitTime: 2, status: "waiting" },
        { position: 3, vehicleNumber: "MH-03-EF-9012", driverName: "Amit Singh", waitTime: 4, status: "waiting" },
        { position: 4, vehicleNumber: "MH-04-GH-3456", driverName: "Vikram Sharma", waitTime: 6, status: "waiting" },
        { position: 5, vehicleNumber: "MH-01-IJ-7890", driverName: "Sanjay Verma", waitTime: 8, status: "waiting" },
        { position: 6, vehicleNumber: "MH-02-KL-2345", driverName: "Rakesh Mehta", waitTime: 10, status: "waiting" },
        { position: 7, vehicleNumber: "MH-03-MN-6789", driverName: "Dinesh Kumar", waitTime: 12, status: "waiting" },
        { position: 8, vehicleNumber: "MH-04-OP-0123", driverName: "Mahesh Singh", waitTime: 14, status: "waiting" },
        { position: 9, vehicleNumber: "MH-01-QR-4567", driverName: "Rahul Sharma", waitTime: 16, status: "waiting" },
        { position: 10, vehicleNumber: "MH-02-ST-8901", driverName: "Alok Patel", waitTime: 18, status: "waiting" },
        { position: 11, vehicleNumber: "MH-03-UV-2345", driverName: "Vivek Kumar", waitTime: 20, status: "waiting" },
        { position: 12, vehicleNumber: "MH-04-WX-6789", driverName: "Rajendra Singh", waitTime: 22, status: "waiting" },
      ]
    },
    "2": {
      totalInQueue: 8,
      currentlyServing: 2,
      averageServiceTime: 7,
      estimatedWaitPerPerson: 5,
      queue: [
        { position: 1, vehicleNumber: "MH-01-YZ-0123", driverName: "Prakash Reddy", waitTime: 0, status: "serving" },
        { position: 2, vehicleNumber: "MH-02-AB-4567", driverName: "Srinivas Rao", waitTime: 3, status: "waiting" },
        { position: 3, vehicleNumber: "MH-03-CD-8901", driverName: "Ramesh Babu", waitTime: 6, status: "waiting" },
        { position: 4, vehicleNumber: "MH-04-EF-2345", driverName: "Krishna Murthy", waitTime: 9, status: "waiting" },
        { position: 5, vehicleNumber: "MH-01-GH-6789", driverName: "Venkatesh Iyer", waitTime: 12, status: "waiting" },
        { position: 6, vehicleNumber: "MH-02-IJ-0123", driverName: "Balakrishnan Nair", waitTime: 15, status: "waiting" },
        { position: 7, vehicleNumber: "MH-03-KL-4567", driverName: "Chandrasekhar Menon", waitTime: 18, status: "waiting" },
        { position: 8, vehicleNumber: "MH-04-MN-8901", driverName: "Subramanian Swamy", waitTime: 21, status: "waiting" },
      ]
    }
  }

  const currentPumpData = queueData[selectedPump as keyof typeof queueData] || queueData["1"]
  const selectedPumpInfo = cngPumps.find(p => p.id === selectedPump)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "serving": return "bg-green-100 text-green-800"
      case "waiting": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "serving": return <CheckCircle className="w-4 h-4" />
      case "waiting": return <Clock className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <Suspense fallback={<Loading />}>
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Queue Status</h1>
            <p className="text-gray-600">Real-time queue information</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedPump} onValueChange={setSelectedPump}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select CNG Pump" />
              </SelectTrigger>
              <SelectContent>
                {cngPumps.map((pump) => (
                  <SelectItem key={pump.id} value={pump.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{pump.name}</span>
                      <Badge 
                        variant={pump.status === 'active' ? 'default' : 'secondary'}
                        className={pump.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {pump.status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Queue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total in Queue</p>
                  <p className="text-2xl font-bold text-gray-900">{currentPumpData.totalInQueue}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Currently Serving</p>
                  <p className="text-2xl font-bold text-gray-900">{currentPumpData.currentlyServing}</p>
                </div>
                <Car className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Service Time</p>
                  <p className="text-2xl font-bold text-gray-900">{currentPumpData.averageServiceTime}m</p>
                </div>
                <Timer className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Wait per Person</p>
                  <p className="text-2xl font-bold text-gray-900">{currentPumpData.estimatedWaitPerPerson}m</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="queue" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="queue">Queue List</TabsTrigger>
            <TabsTrigger value="live">Live Updates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="queue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Current Queue - {selectedPumpInfo?.name}
                </CardTitle>
                <CardDescription>
                  Last updated: {currentTime.toLocaleTimeString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {currentPumpData.queue.map((person) => (
                    <div 
                      key={person.position} 
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-gray-700">{person.position}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{person.driverName}</p>
                            <Badge className={getStatusColor(person.status)}>
                              {person.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{person.vehicleNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          {getStatusIcon(person.status)}
                          <span>{person.waitTime} min</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="live" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Activity Feed</CardTitle>
                  <CardDescription>Real-time queue updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Vehicle MH-01-AB-1234 started fueling</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">New vehicle joined the queue</p>
                        <p className="text-xs text-gray-500">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Vehicle MH-02-CD-5678 completed fueling</p>
                        <p className="text-xs text-gray-500">8 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Pump efficiency updated</p>
                        <p className="text-xs text-gray-500">12 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Queue Progress</CardTitle>
                  <CardDescription>Current serving progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Current Vehicle</span>
                        <span>75% Complete</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">MH-01-AB-1234 - Rajesh Kumar</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Next in Line</span>
                        <span>Waiting</span>
                      </div>
                      <Progress value={0} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">MH-02-CD-5678 - Suresh Patel</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Statistics</CardTitle>
                  <CardDescription>Queue performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Vehicles Served</span>
                      <span className="font-semibold">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Wait Time</span>
                      <span className="font-semibold">18 minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Peak Queue Length</span>
                      <span className="font-semibold">15 vehicles</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pump Utilization</span>
                      <span className="font-semibold">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Efficiency Metrics</CardTitle>
                  <CardDescription>Operational efficiency data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Service Efficiency</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Queue Management</span>
                        <span>88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Customer Satisfaction</span>
                        <span>94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
    </Suspense>
  )
}
