'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Ticket, Phone, Mail } from "lucide-react";
import { useQueueBase, UserInfo } from "@/hooks/use-queue-base";
import { ServiceConfig, CustomField } from "@/lib/queue-types";

interface JoinQueueSectionProps {
  serviceConfig: ServiceConfig;
  queueData: any;
  hasJoinedQueue: boolean;
  userPosition: number | null;
  userInfo: UserInfo;
  onJoinQueue: (additionalInfo: Record<string, any>) => void;
  onLeaveQueue: () => void;
  onUpdateUserInfo: (field: string, value: any) => void;
  getUserEstimatedWaitTime: () => number;
}

export function JoinQueueSection({
  serviceConfig,
  queueData,
  hasJoinedQueue,
  userPosition,
  userInfo,
  onJoinQueue,
  onLeaveQueue,
  onUpdateUserInfo,
  getUserEstimatedWaitTime
}: JoinQueueSectionProps) {
  const [showJoinForm, setShowJoinForm] = useState(false);

  const renderCustomField = (field: CustomField) => {
    const value = userInfo[field.id] || '';
    
    switch (field.type) {
      case 'select':
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{field.name} {field.required && '*'}</Label>
            <select
              id={field.id}
              value={value}
              onChange={(e) => onUpdateUserInfo(field.id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required={field.required}
            >
              <option value="">Select {field.name}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      
      case 'email':
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{field.name} {field.required && '*'}</Label>
            <Input
              id={field.id}
              type="email"
              value={value}
              onChange={(e) => onUpdateUserInfo(field.id, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        );
      
      case 'phone':
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{field.name} {field.required && '*'}</Label>
            <Input
              id={field.id}
              type="tel"
              value={value}
              onChange={(e) => onUpdateUserInfo(field.id, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        );
      
      default:
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>{field.name} {field.required && '*'}</Label>
            <Input
              id={field.id}
              type={field.type}
              value={value}
              onChange={(e) => onUpdateUserInfo(field.id, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        );
    }
  };

  const validateForm = () => {
    if (!userInfo.name || !userInfo.phone) return false;
    
    if (serviceConfig.customFields) {
      for (const field of serviceConfig.customFields) {
        if (field.required && !userInfo[field.id]) {
          return false;
        }
      }
    }
    
    return true;
  };

  if (!hasJoinedQueue) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Join Queue
          </CardTitle>
          <CardDescription>
            Join the {serviceConfig.name} queue
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showJoinForm ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Current Queue</p>
                  <p className="text-2xl font-bold text-gray-900">{queueData?.totalInQueue || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Est. Wait Time</p>
                  <p className="text-2xl font-bold text-gray-900">{queueData?.estimatedWaitPerPerson || 0}m</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Your Position</p>
                  <p className="text-2xl font-bold text-blue-600">{(queueData?.totalInQueue || 0) + 1}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Service Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {serviceConfig.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  onClick={() => setShowJoinForm(true)}
                  className="flex-1"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join Queue
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="flex-1"
                >
                  Go Back
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => onUpdateUserInfo('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={userInfo.phone}
                    onChange={(e) => onUpdateUserInfo('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => onUpdateUserInfo('email', e.target.value)}
                    placeholder="Enter your email (optional)"
                  />
                </div>
                {serviceConfig.customFields?.map(renderCustomField)}
                
                {/* Multi-counter specific: Show optimal counter info */}
                {serviceConfig.queueType === 'multi-counter' && userInfo['service-type'] && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Recommended Counter Assignment
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-700">
                        Service: {userInfo['service-type']}
                      </span>
                      <Badge className="bg-blue-100 text-blue-800">
                        Optimal counter will be assigned
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <Button 
                  onClick={() => onJoinQueue({})}
                  disabled={!validateForm()}
                  className="flex-1"
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  Confirm Join Queue
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowJoinForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Ticket className="w-5 h-5" />
          You're in the Queue!
        </CardTitle>
        <CardDescription className="text-green-700">
          You have joined the {serviceConfig.name} queue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Your Position</p>
            <p className="text-3xl font-bold text-green-600">{userPosition}</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Est. Wait Time</p>
            <p className="text-3xl font-bold text-blue-600">{getUserEstimatedWaitTime()}m</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Name</p>
            <p className="text-lg font-semibold text-gray-900">{userInfo.name}</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Contact</p>
            <p className="text-lg font-semibold text-gray-900">{userInfo.phone}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="destructive"
            onClick={onLeaveQueue}
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
        </div>
      </CardContent>
    </Card>
  );
}