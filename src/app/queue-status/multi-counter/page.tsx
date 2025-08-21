'use client';

import { Suspense, useState, useEffect } from "react";
import { Loading } from "@/components/loading";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Clock, 
  TrendingUp, 
  LayoutGrid, 
  UserPlus, 
  Ticket,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  Activity,
  ArrowRight,
  X,
  MapPin
} from "lucide-react";
import { useMultiCounterQueue } from "@/hooks/use-multi-counter-queue";
import { useSearchParams } from "next/navigation";
import { getLocationById } from "@/lib/sample-data";
import { motion, AnimatePresence } from "framer-motion";

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
    getTotalQueueStats,
    getOptimalCounter
  } = useMultiCounterQueue();

  const [showJoinForm, setShowJoinForm] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedCounter, setSelectedCounter] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get location from URL parameters
  const locationParam = searchParams.get('location');
  const selectedLocation = locationParam ? getLocationById(locationParam) : null;
  
  const availableCounters = getAvailableCounters();
  const totalStats = getTotalQueueStats();

  // Auto-select optimal counter when service is selected
  useEffect(() => {
    if (selectedService) {
      const optimalCounter = getOptimalCounter(selectedService);
      if (optimalCounter) {
        setSelectedCounter(optimalCounter.id);
      }
    }
  }, [selectedService, getOptimalCounter]);

  const handleJoinQueue = () => {
    if (selectedService && validateForm()) {
      setIsAnimating(true);
      setTimeout(() => {
        handleJoinMultiCounterQueue({ serviceType: selectedService });
        setIsAnimating(false);
        setShowJoinForm(false);
      }, 500);
    }
  };

  const validateForm = () => {
    if (!userInfo.name || !userInfo.phone || !selectedService) return false;
    
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

  const renderServiceOptions = () => {
    const allServices = Array.from(new Set(
      availableCounters.flatMap(counter => counter.services)
    ));
    
    return allServices.map(service => {
      const countersForService = availableCounters.filter(c => c.services.includes(service));
      const availableCountersForService = countersForService.filter(c => c.status === 'available');
      const totalQueue = countersForService.reduce((sum, c) => sum + c.currentQueue, 0);
      
      return {
        service,
        counters: countersForService.length,
        availableCounters: availableCountersForService.length,
        totalQueue,
        avgWaitTime: Math.round(totalQueue * 2.5) // Mock calculation
      };
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Queue</p>
                      <p className="text-2xl font-bold">{totalStats.totalInQueue}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Now Serving</p>
                      <p className="text-2xl font-bold">{totalStats.totalCurrentlyServing}</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
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
                
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
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
          {/* Service Selection Section */}
          {!hasJoinedQueue && !showJoinForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Target className="w-6 h-6" />
                    Choose Your Service
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Select the service you need and we'll find the best counter for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderServiceOptions().map((serviceInfo, index) => (
                      <motion.div
                        key={serviceInfo.service}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="cursor-pointer group"
                        onClick={() => {
                          setSelectedService(serviceInfo.service);
                          setShowJoinForm(true);
                        }}
                      >
                        <div className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all duration-200 group-hover:scale-105">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                              {serviceInfo.service}
                            </h3>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${serviceInfo.availableCounters > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                              <span className="text-xs text-gray-600">
                                {serviceInfo.availableCounters}/{serviceInfo.counters}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">In Queue:</span>
                              <span className="font-medium">{serviceInfo.totalQueue}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Est. Wait:</span>
                              <span className="font-medium text-orange-600">{serviceInfo.avgWaitTime}m</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">Click to select</span>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Counter Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <LayoutGrid className="w-6 h-6 text-blue-600" />
                Service Counters
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span>Serving</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span>Busy</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {availableCounters.map((counter, index) => (
                <motion.div
                  key={counter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className={`h-full border-2 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                    selectedCounter === counter.id 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                    onClick={() => !hasJoinedQueue && setSelectedCounter(counter.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{counter.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getCounterStatusColor(counter.status)}`} />
                          <span className="text-xs font-medium text-gray-600">
                            {getCounterStatusText(counter.status)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Services */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-600 mb-2">Services:</p>
                        <div className="flex flex-wrap gap-1">
                          {counter.services.slice(0, 2).map((service, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {counter.services.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{counter.services.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Queue Info */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">Queue</p>
                          <p className="text-lg font-bold text-gray-900">{counter.currentQueue}</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">Serving</p>
                          <p className="text-lg font-bold text-green-600">{counter.currentlyServing}</p>
                        </div>
                      </div>
                      
                      {/* Current Queue Preview */}
                      {counter.queueEntries.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">Now serving:</p>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">
                              {counter.queueEntries[0].position}
                            </div>
                            <span className="text-gray-900 truncate">{counter.queueEntries[0].name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {counter.queueEntries[0].serviceType}
                            </Badge>
                          </div>
                        </div>
                      )}
                      
                      {!hasJoinedQueue && (
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCounter(counter.id);
                              setShowJoinForm(true);
                            }}
                          >
                            Join This Counter
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Join Queue Section */}
          {showJoinForm && !hasJoinedQueue && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <UserPlus className="w-6 h-6" />
                        Join Queue
                      </CardTitle>
                      <CardDescription className="text-blue-100">
                        {selectedService ? `Service: ${selectedService}` : 'Select a service to join the queue'}
                      </CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowJoinForm(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Your Information
                      </h3>
                      
                      <div className="space-y-3">
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
                      </div>
                    </div>
                    
                    {/* Service Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Service Details
                      </h3>
                      
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="service-type">Service Type *</Label>
                          <Select value={selectedService} onValueChange={setSelectedService}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {renderServiceOptions().map((serviceInfo) => (
                                <SelectItem key={serviceInfo.service} value={serviceInfo.service}>
                                  <div className="flex items-center justify-between w-full">
                                    <span>{serviceInfo.service}</span>
                                    <span className="text-xs text-gray-500">
                                      {serviceInfo.availableCounters} counters available
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {selectedService && selectedCounter && (
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-5 h-5 text-blue-600" />
                              <span className="font-medium text-blue-900">Recommended Counter</span>
                            </div>
                            <p className="text-sm text-blue-800">
                              Counter {selectedCounter} is optimal for {selectedService}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-blue-700">
                              <span>Queue: {availableCounters.find(c => c.id === selectedCounter)?.currentQueue || 0}</span>
                              <span>•</span>
                              <span>Est. wait: {Math.round((availableCounters.find(c => c.id === selectedCounter)?.currentQueue || 0) * 2.5)}m</span>
                            </div>
                          </div>
                        )}
                        
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
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <Button 
                      onClick={handleJoinQueue}
                      disabled={!validateForm() || isAnimating}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isAnimating ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          <Ticket className="w-4 h-4 mr-2" />
                          Join Queue
                        </>
                      )}
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
            </motion.div>
          )}

          {/* User Queue Status */}
          {hasJoinedQueue && userPosition && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-xl">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    You're in the Queue!
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    You have successfully joined the {serviceConfig.name} queue
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
            </motion.div>
          )}

          {/* Location Information */}
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{selectedLocation.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{selectedLocation.address}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{selectedLocation.phone}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Operating Hours</h4>
                      <p className="text-sm text-gray-600">{selectedLocation.operatingHours}</p>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          {selectedLocation.status === 'active' ? 'Open Now' : 'Closed'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Services</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedLocation.facilities.slice(0, 4).map((facility, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                        {selectedLocation.facilities.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{selectedLocation.facilities.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default function MultiCounterQueuePage() {
  return (
    <Suspense fallback={<Loading />}>
      <MultiCounterQueueContent />
    </Suspense>
  );
}