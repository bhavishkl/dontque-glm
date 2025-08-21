'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Users } from "lucide-react";

interface CounterQueueEntry {
  position: number;
  name: string;
  serviceType: string;
  status: 'waiting' | 'serving' | 'completed' | 'cancelled';
  waitTime: number;
}

interface CounterData {
  id: number;
  name: string;
  services: string[];
  status: 'available' | 'occupied' | 'busy';
  currentQueue: number;
  currentlyServing: number;
  queueEntries: CounterQueueEntry[];
}

interface MultiCounterTabsProps {
  counters: CounterData[];
  userPosition: number | null;
}

export function MultiCounterTabs({ counters, userPosition }: MultiCounterTabsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5" />
          Counter Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="counter-1" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {counters.map((counter) => (
              <TabsTrigger 
                key={counter.id} 
                value={`counter-${counter.id}`} 
                className="flex flex-col gap-1 p-3"
              >
                <span className="text-sm font-medium">{counter.name}</span>
                <Badge 
                  variant="secondary"
                  className={
                    counter.status === 'available' 
                      ? 'bg-green-100 text-green-800 text-xs'
                      : counter.status === 'occupied'
                      ? 'bg-blue-100 text-blue-800 text-xs'
                      : 'bg-yellow-100 text-yellow-800 text-xs'
                  }
                >
                  {counter.status}
                </Badge>
                <span className="text-xs text-gray-600">
                  {counter.currentQueue} in queue
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {counters.map((counter) => (
            <TabsContent key={counter.id} value={`counter-${counter.id}`} className="space-y-4">
              {/* Counter Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge 
                    variant="secondary"
                    className={
                      counter.status === 'available' 
                        ? 'bg-green-100 text-green-800'
                        : counter.status === 'occupied'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {counter.status}
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Current Queue</p>
                  <p className="text-lg font-semibold">{counter.currentQueue}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Now Serving</p>
                  <p className="text-lg font-semibold text-green-600">{counter.currentlyServing}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Services</p>
                  <p className="text-sm font-medium text-gray-900">
                    {counter.services.slice(0, 2).join(', ')}
                    {counter.services.length > 2 && ` +${counter.services.length - 2}`}
                  </p>
                </div>
              </div>
              
              {/* Services Available */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Services Available</h4>
                <div className="flex flex-wrap gap-2">
                  {counter.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Queue List for this counter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Queue for {counter.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{counter.currentQueue} people</span>
                  </div>
                </div>
                
                {counter.queueEntries.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {counter.queueEntries.map((entry) => (
                      <div
                        key={entry.position}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          entry.position === userPosition 
                            ? 'border-blue-300 bg-blue-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            entry.position === userPosition 
                              ? 'bg-blue-500 text-white' 
                              : entry.status === 'serving'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {entry.position}
                          </div>
                          <div>
                            <p className={`font-medium ${
                              entry.position === userPosition ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {entry.name}
                              {entry.position === userPosition && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  You
                                </Badge>
                              )}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>Service: {entry.serviceType}</span>
                              <span>•</span>
                              <span>Wait: {entry.waitTime}m</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className={
                              entry.status === 'serving' 
                                ? 'bg-green-100 text-green-800'
                                : entry.status === 'waiting'
                                ? 'bg-blue-100 text-blue-800'
                                : entry.status === 'completed'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-red-100 text-red-800'
                            }
                          >
                            {entry.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No one in queue for this counter</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}