'use client';

import { useState, useEffect } from 'react';
import { QueueType, ServiceConfig } from '@/lib/queue-types';

export interface QueueData {
  totalInQueue: number;
  currentlyServing: number;
  averageServiceTime: number;
  estimatedWaitPerPerson: number;
  queue: QueueEntry[];
}

export interface QueueEntry {
  position: number;
  name: string;
  waitTime: number;
  status: 'waiting' | 'serving' | 'completed';
  [key: string]: any;
}

export interface UserInfo {
  name: string;
  phone: string;
  email?: string;
  [key: string]: any;
}

export function useQueueBase(serviceConfig: ServiceConfig) {
  const [hasJoinedQueue, setHasJoinedQueue] = useState(false);
  const [userPosition, setUserPosition] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    phone: '',
    email: ''
  });
  const [queueData, setQueueData] = useState<QueueData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateQueueData();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(timer);
  }, []);

  // Initialize queue data
  useEffect(() => {
    updateQueueData();
  }, [serviceConfig]);

  const updateQueueData = () => {
    const mockData = generateMockQueueData(serviceConfig);
    setQueueData(mockData);
  };

  const generateMockQueueData = (config: ServiceConfig): QueueData => {
    const totalInQueue = Math.floor(Math.random() * 20) + 5;
    const currentlyServing = Math.min(3, totalInQueue);
    const averageServiceTime = getAverageServiceTime(config.queueType);
    const estimatedWaitPerPerson = Math.round(averageServiceTime / Math.max(1, totalInQueue));

    const queue: QueueEntry[] = [];
    const names = ['Rajesh Kumar', 'Suresh Patel', 'Amit Singh', 'Vikram Sharma', 'Sanjay Verma'];

    for (let i = 1; i <= totalInQueue; i++) {
      const waitTime = (i - 1) * estimatedWaitPerPerson;
      const status = i <= currentlyServing ? 'serving' : 'waiting';
      
      queue.push({
        position: i,
        name: names[(i-1) % names.length],
        waitTime,
        status
      });
    }

    return {
      totalInQueue,
      currentlyServing,
      averageServiceTime,
      estimatedWaitPerPerson,
      queue
    };
  };

  const getAverageServiceTime = (queueType: string): number => {
    switch (queueType) {
      case 'cng': return 8;
      case 'hospital': return 15;
      case 'multi-counter': return 12;
      case 'basic': return 10;
      default: return 10;
    }
  };

  const handleJoinQueue = (additionalInfo: Record<string, any> = {}) => {
    if (!queueData) return;

    const newPosition = queueData.totalInQueue + 1;
    setUserPosition(newPosition);
    setHasJoinedQueue(true);
    setUserInfo(prev => ({ ...prev, ...additionalInfo }));
    
    // Update queue data to include new user
    updateQueueData();
  };

  const handleLeaveQueue = () => {
    setHasJoinedQueue(false);
    setUserPosition(null);
    setUserInfo({
      name: '',
      phone: '',
      email: ''
    });
  };

  const updateUserInfo = (field: string, value: any) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getUserEstimatedWaitTime = (): number => {
    if (!userPosition || !queueData) return 0;
    return (userPosition - 1) * queueData.estimatedWaitPerPerson;
  };

  return {
    hasJoinedQueue,
    userPosition,
    userInfo,
    queueData,
    currentTime,
    handleJoinQueue,
    handleLeaveQueue,
    updateUserInfo,
    getUserEstimatedWaitTime
  };
}