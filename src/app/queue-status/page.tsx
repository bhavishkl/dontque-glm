'use client';

import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  LayoutGrid, 
  ArrowRight,
  Clock,
  TrendingUp,
  CheckCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { QUEUE_TYPES, serviceConfigs } from "@/lib/queue-types";
import { useEffect } from "react";

function QueueStatusContent() {
  const router = useRouter();

  // Auto-redirect to multi-counter queue since it's the only option
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/queue-status/multi-counter');
    }, 1000); // Redirect after 1 second
    
    return () => clearTimeout(timer);
  }, [router]);

  const handleNavigateToQueue = (queueType: string) => {
    router.push(`/queue-status/${queueType}`);
  };

  const getQueueIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return Users;
      case 'LayoutGrid': return LayoutGrid;
      default: return LayoutGrid;
    }
  };

  const getQueueStats = (queueType: string) => {
    // Mock statistics for the queue type
    switch (queueType) {
      case 'multi-counter':
        return {
          totalInQueue: 15,
          avgWaitTime: 8,
          efficiency: 88
        };
      default:
        return {
          totalInQueue: 0,
          avgWaitTime: 0,
          efficiency: 0
        };
    }
  };

  const getServicesForQueueType = (queueType: string) => {
    return serviceConfigs.filter(config => config.queueType === queueType);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Queue Management</h1>
            <p className="text-gray-600">
              Advanced multi-counter queue system for all your service needs
            </p>
          </div>
        </div>

        {/* Auto-redirect Notice */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <LayoutGrid className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">Redirecting to Multi-Counter Queue</p>
                <p className="text-xs text-blue-700">You will be automatically redirected in 1 second</p>
              </div>
              <Button 
                size="sm" 
                onClick={() => router.push('/queue-status/multi-counter')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Go Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Queue Type Selection - Only Multi-Counter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUEUE_TYPES.map((queueType) => {
            const Icon = getQueueIcon(queueType.icon);
            const stats = getQueueStats(queueType.id);
            const services = getServicesForQueueType(queueType.id);
            
            return (
              <Card 
                key={queueType.id}
                className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-200"
                onClick={() => handleNavigateToQueue(queueType.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${queueType.color}-100`}>
                        <Icon className={`w-6 h-6 text-${queueType.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{queueType.name}</CardTitle>
                        <CardDescription>{queueType.description}</CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Queue Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-xs text-gray-600">In Queue</p>
                        <p className="font-semibold">{stats.totalInQueue}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock className="w-4 h-4 text-orange-600" />
                        </div>
                        <p className="text-xs text-gray-600">Avg Wait</p>
                        <p className="font-semibold">{stats.avgWaitTime}m</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-xs text-gray-600">Efficiency</p>
                        <p className="font-semibold">{stats.efficiency}%</p>
                      </div>
                    </div>

                    {/* Available Services */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Available Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {services.slice(0, 3).map((service) => (
                          <Badge key={service.id} variant="outline" className="text-xs">
                            {service.name}
                          </Badge>
                        ))}
                        {services.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Key Features:</p>
                      <div className="space-y-1">
                        {services[0]?.features.slice(0, 2).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigateToQueue(queueType.id);
                      }}
                    >
                      Access {queueType.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* System Overview */}
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>Real-time queue statistics across all services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">15</p>
                <p className="text-sm text-gray-600">Total in Queue</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">4</p>
                <p className="text-sm text-gray-600">Active Counters</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">8m</p>
                <p className="text-sm text-gray-600">Avg Wait Time</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">88%</p>
                <p className="text-sm text-gray-600">System Efficiency</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

export default function QueueStatusPage() {
  return (
    <Suspense fallback={<Loading />}>
      <QueueStatusContent />
    </Suspense>
  );
}