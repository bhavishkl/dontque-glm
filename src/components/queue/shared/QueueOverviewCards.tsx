'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Users, Car, Timer, Clock } from "lucide-react";
import { QueueData } from "@/hooks/use-queue-base";

interface QueueOverviewCardsProps {
  queueData: QueueData;
  queueType: string;
}

export function QueueOverviewCards({ queueData, queueType }: QueueOverviewCardsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'cng': return Car;
      case 'hospital': return Users;
      default: return Users;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'cng': return 'text-orange-600';
      case 'hospital': return 'text-red-600';
      case 'multi-counter': return 'text-green-600';
      case 'basic': return 'text-blue-600';
      default: return 'text-blue-600';
    }
  };

  const Icon = getIcon(queueType);
  const iconColor = getIconColor(queueType);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total in Queue</p>
              <p className="text-2xl font-bold text-gray-900">{queueData.totalInQueue}</p>
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
              <p className="text-2xl font-bold text-gray-900">{queueData.currentlyServing}</p>
            </div>
            <Icon className={`w-8 h-8 ${iconColor}`} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Service Time</p>
              <p className="text-2xl font-bold text-gray-900">{queueData.averageServiceTime}m</p>
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
              <p className="text-2xl font-bold text-gray-900">{queueData.estimatedWaitPerPerson}m</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}