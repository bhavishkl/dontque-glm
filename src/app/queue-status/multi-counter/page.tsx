'use client';

import { Suspense, useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Clock, 
  LayoutGrid, 
  UserPlus, 
  Ticket,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  MapPin
} from "lucide-react";
import { LocationInfoCard } from "@/components/queue/shared/LocationInfoCard";
import { useMultiCounterQueue } from "@/hooks/use-multi-counter-queue";
import { useSearchParams } from "next/navigation";
import { getLocationById } from "@/lib/sample-data";

function MultiCounterQueueContent() {
  const searchParams = useSearchParams();
  const {
    hasJoinedQueue,
    userPosition,
    userInfo,
    queueData,
    serviceConfig,
    handleJoinMultiCounterQueue,
    handleLeaveQueue,
    updateUserInfo,
    getUserEstimatedWaitTime,
    getAvailableCounters,
    getTotalQueueStats
  } = useMultiCounterQueue();

  const [showJoinForm, setShowJoinForm] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedCounter, setSelectedCounter] = useState<number | null>(null);

  // Get location from URL parameters
  const locationParam = searchParams.get('location');
  const selectedLocation = locationParam ? getLocationById(locationParam) : null;
  
  const availableCounters = getAvailableCounters();
  const totalStats = getTotalQueueStats();

  const handleJoinQueue = () => {
    if (selectedService && selectedCounter && validateForm()) {
      handleJoinMultiCounterQueue({ serviceType: selectedService });
      setShowJoinForm(false);
    }
  };

  const validateForm = () => {
    if (!userInfo.name || !userInfo.phone || !selectedService || !selectedCounter) return false;
    
    if (serviceConfig.customFields) {
      for (const field of serviceConfig.customFields) {
        if (field.required && !userInfo[field.id]) {
          return false;
        }
      }
    }
    
    return true;
  };

  const getCounterStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'occupied': return 'bg-blue-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getCounterStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'occupied': return 'Serving';
      case 'busy': return 'Busy';
      default: return 'Offline';
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Location Info Section */}
        {selectedLocation && (
          <div className="bg-white border-b border-gray-200 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <LocationInfoCard location={selectedLocation} />
            </div>
          </div>
        )}
        
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <LayoutGrid className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Multi-Counter Queue</h1>
                    <p className="text-gray-600">{serviceConfig.name}</p>
                  </div>
                </div>
                {selectedLocation && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedLocation.name}</span>
                  </div>
                )}
              </div>
              
              {/* Live Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-500 rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Queue</p>
                      <p className="text-2xl font-bold">{totalStats.totalInQueue}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                
                <div className="bg-green-500 rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Now Serving</p>
                      <p className="text-2xl font-bold">{totalStats.totalCurrentlyServing}</p>
                    </div>
                    <LayoutGrid className="w-8 h-8 text-green-200" />
                  </div>
                </div>
                
                <div className="bg-purple-500 rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Active Counters</p>
                      <p className="text-2xl font-bold">
                        {availableCounters.filter(c => c.status === 'available' || c.status === 'occupied').length}
                      </p>
                    </div>
                    <LayoutGrid className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
                
                <div className="bg-orange-500 rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Avg Wait</p>
                      <p className="text-2xl font-bold">{totalStats.averageWaitTime}m</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* User Queue Status */}
          {hasJoinedQueue && userPosition && (
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardHeader className="bg-green-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  You're in the Queue!
                </CardTitle>
                <CardDescription className="text-green-100">
                  You have successfully joined the {serviceConfig.name} queue
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-green-600">{userPosition}</span>
                    </div>
                    <p className="text-sm text-gray-600">Your Position</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-blue-600">{getUserEstimatedWaitTime()}m</span>
                    </div>
                    <p className="text-sm text-gray-600">Est. Wait Time</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600">Total Queue</p>
                    <p className="font-semibold text-gray-900">{queueData?.totalInQueue || 0}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="text-sm text-gray-600">Service</p>
                    <p className="font-semibold text-gray-900">{userInfo['service-type'] || 'General'}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="destructive"
                    onClick={handleLeaveQueue}
                    className="flex-1"
                  >
                    Leave Queue
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Get SMS Updates
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Updates
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Counter Tabs */}
          <Tabs defaultValue={availableCounters[0]?.id?.toString()} className="w-full">
            <TabsList className="flex w-full overflow-x-auto whitespace-nowrap">
              {availableCounters.map((counter) => (
                <TabsTrigger key={counter.id} value={counter.id.toString()} className="flex items-center gap-2 px-4 py-2 min-w-fit">
                  <div className={`w-2 h-2 rounded-full ${getCounterStatusColor(counter.status)}`} />
                  {counter.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {availableCounters.map((counter) => (
              <TabsContent key={counter.id} value={counter.id.toString()} className="space-y-6">
                {/* Counter Info */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {counter.name}
                        <Badge variant="outline" className="ml-2">
                          {getCounterStatusText(counter.status)}
                        </Badge>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Queue: {counter.currentQueue}</span>
                        <span>Serving: {counter.currentlyServing}</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Services Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Available Services</CardTitle>
                    <CardDescription>Services available at this counter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {counter.services.map((service, index) => (
                        <div 
                          key={index}
                          className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setSelectedService(service);
                            setSelectedCounter(counter.id);
                            setShowJoinForm(true);
                          }}
                        >
                          <h3 className="font-semibold mb-2">{service}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>Est. wait: {Math.round(counter.currentQueue * 2.5)}m</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Join Queue Section */}
                {showJoinForm && selectedCounter === counter.id && !hasJoinedQueue && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Join Queue</CardTitle>
                      <CardDescription>Enter your details to join the queue</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={userInfo.name}
                            onChange={(e) => updateUserInfo('name', e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={userInfo.phone}
                            onChange={(e) => updateUserInfo('phone', e.target.value)}
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userInfo.email}
                            onChange={(e) => updateUserInfo('email', e.target.value)}
                            placeholder="your@email.com"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="service">Service *</Label>
                          <Select value={selectedService} onValueChange={setSelectedService}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {counter.services.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      {/* Custom Fields */}
                      {serviceConfig.customFields?.map((field) => (
                        <div key={field.id}>
                          <Label htmlFor={field.id}>
                            {field.name} {field.required && '*'}
                          </Label>
                          {field.type === 'select' ? (
                            <Select 
                              value={userInfo[field.id] || ''} 
                              onValueChange={(value) => updateUserInfo(field.id, value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={`Select ${field.name}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              id={field.id}
                              type={field.type}
                              value={userInfo[field.id] || ''}
                              onChange={(e) => updateUserInfo(field.id, e.target.value)}
                              placeholder={field.placeholder}
                              required={field.required}
                            />
                          )}
                        </div>
                      ))}
                      
                      <div className="flex gap-4">
                        <Button 
                          onClick={handleJoinQueue}
                          disabled={!validateForm()}
                          className="flex-1"
                        >
                          <Ticket className="w-4 h-4 mr-2" />
                          Join Queue
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setShowJoinForm(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Queue List Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Current Queue</CardTitle>
                    <CardDescription>People currently in queue at this counter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {counter.queueEntries.length > 0 ? (
                      <div className="space-y-2">
                        {counter.queueEntries.map((entry, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
                                {entry.position}
                              </div>
                              <div>
                                <p className="font-medium">{entry.name}</p>
                                <p className="text-sm text-gray-600">{entry.serviceType}</p>
                              </div>
                            </div>
                            <Badge variant="outline">
                              {entry.waitTime}m
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No one is currently in queue</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}

export default function MultiCounterQueuePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MultiCounterQueueContent />
    </Suspense>
  );
}