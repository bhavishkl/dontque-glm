'use client';

import { Suspense } from "react";
import { Loading } from "@/components/loading";
import { MainLayout } from "@/components/layout/main-layout";
import { JoinQueueSection } from "@/components/queue/shared/JoinQueueSection";
import { LocationInfoCard } from "@/components/queue/shared/LocationInfoCard";
import { MultiCounterTabs } from "@/components/queue/shared/MultiCounterTabs";
import { Card, CardContent } from "@/components/ui/card";
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

  // Get location from URL parameters
  const locationParam = searchParams.get('location');
  const selectedLocation = locationParam ? getLocationById(locationParam) : null;
  
  const availableCounters = getAvailableCounters();
  const totalStats = getTotalQueueStats();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Multi-Counter Queue</h1>
            <p className="text-gray-600">
              {serviceConfig.name} - Multiple service counters with parallel processing
            </p>
          </div>
        </div>

        {/* Queue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total in Queue</p>
                  <p className="text-2xl font-bold text-gray-900">{totalStats.totalInQueue}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">TQ</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Now Serving</p>
                  <p className="text-2xl font-bold text-green-600">{totalStats.totalCurrentlyServing}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">NS</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Counters</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {availableCounters.filter(c => c.status === 'available' || c.status === 'occupied').length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">AC</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Wait Time</p>
                  <p className="text-2xl font-bold text-orange-600">{totalStats.averageWaitTime}m</p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-semibold">AW</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Information */}
        {selectedLocation && (
          <LocationInfoCard 
            location={selectedLocation} 
            showWaitTimeHighlight={true}
          />
        )}

        {/* Counter Status with Tabs */}
        <MultiCounterTabs 
          counters={availableCounters} 
          userPosition={userPosition} 
        />

        {/* Queue Joining Section */}
        <JoinQueueSection
          serviceConfig={serviceConfig}
          queueData={queueData}
          hasJoinedQueue={hasJoinedQueue}
          userPosition={userPosition}
          userInfo={userInfo}
          onJoinQueue={(additionalInfo) => handleJoinMultiCounterQueue(additionalInfo as { serviceType: string })}
          onLeaveQueue={handleLeaveQueue}
          onUpdateUserInfo={updateUserInfo}
          getUserEstimatedWaitTime={getUserEstimatedWaitTime}
        />
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