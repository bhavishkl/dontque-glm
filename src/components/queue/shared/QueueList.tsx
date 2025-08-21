'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { QueueData } from "@/hooks/use-queue-base";

interface QueueListProps {
  queueData: QueueData;
  userPosition: number | null;
}

export function QueueList({ queueData, userPosition }: QueueListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "serving": return "bg-green-100 text-green-800";
      case "waiting": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "serving": return <CheckCircle className="w-4 h-4" />;
      case "waiting": return <Clock className="w-4 h-4" />;
      case "completed": return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const isUserEntry = (position: number) => position === userPosition;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Queue Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Queue Progress</span>
              <span>{queueData.currentlyServing} / {queueData.totalInQueue}</span>
            </div>
            <Progress 
              value={(queueData.currentlyServing / queueData.totalInQueue) * 100} 
              className="h-2"
            />
          </div>

          {/* Queue List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {queueData.queue.map((entry) => (
              <div
                key={entry.position}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  isUserEntry(entry.position) 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isUserEntry(entry.position) 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {entry.position}
                  </div>
                  <div>
                    <p className={`font-medium ${
                      isUserEntry(entry.position) ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {entry.name}
                      {isUserEntry(entry.position) && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          You
                        </Badge>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      Wait time: {entry.waitTime}m
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(entry.status)}
                  >
                    <span className="flex items-center gap-1">
                      {getStatusIcon(entry.status)}
                      {entry.status}
                    </span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Queue Summary */}
          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <p className="text-gray-600">Total</p>
                <p className="font-semibold">{queueData.totalInQueue}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Serving</p>
                <p className="font-semibold text-green-600">{queueData.currentlyServing}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Waiting</p>
                <p className="font-semibold text-blue-600">{queueData.totalInQueue - queueData.currentlyServing}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Avg Wait</p>
                <p className="font-semibold">{queueData.estimatedWaitPerPerson}m</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}