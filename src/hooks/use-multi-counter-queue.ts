'use client';

import { useQueueBase } from './use-queue-base';
import { serviceConfigs } from '@/lib/queue-types';

export function useMultiCounterQueue() {
  const multiCounterServiceConfig = serviceConfigs.find(config => config.id === 'multi-retail');
  
  if (!multiCounterServiceConfig) {
    throw new Error('Multi-counter service configuration not found');
  }

  const baseQueue = useQueueBase(multiCounterServiceConfig);

  const handleJoinMultiCounterQueue = (serviceInfo: { serviceType: string }) => {
    baseQueue.handleJoinQueue(serviceInfo);
  };

  const getAvailableCounters = (): Array<{
    id: number;
    name: string;
    services: string[];
    status: 'available' | 'occupied' | 'busy';
    currentQueue: number;
    currentlyServing: number;
    queueEntries: Array<{
      position: number;
      name: string;
      serviceType: string;
      status: 'waiting' | 'serving' | 'completed' | 'cancelled';
      waitTime: number;
    }>;
  }> => {
    // Real counter data with multiple services per counter
    return [
      { 
        id: 1, 
        name: 'Counter 1', 
        services: ['Billing', 'Payments'], 
        status: 'available' as const, 
        currentQueue: 2,
        currentlyServing: 1,
        queueEntries: [
          { position: 1, name: 'Rajesh Kumar', serviceType: 'Billing', status: 'serving' as const, waitTime: 0 },
          { position: 2, name: 'Priya Sharma', serviceType: 'Payments', status: 'waiting' as const, waitTime: 5 }
        ]
      },
      { 
        id: 2, 
        name: 'Counter 2', 
        services: ['Customer Service', 'Complaints'], 
        status: 'available' as const, 
        currentQueue: 1,
        currentlyServing: 1,
        queueEntries: [
          { position: 1, name: 'Amit Singh', serviceType: 'Customer Service', status: 'serving' as const, waitTime: 0 }
        ]
      },
      { 
        id: 3, 
        name: 'Counter 3', 
        services: ['Returns', 'Exchanges'], 
        status: 'occupied' as const, 
        currentQueue: 3,
        currentlyServing: 1,
        queueEntries: [
          { position: 1, name: 'Suresh Patel', serviceType: 'Returns', status: 'serving' as const, waitTime: 0 },
          { position: 2, name: 'Neha Gupta', serviceType: 'Returns', status: 'waiting' as const, waitTime: 8 },
          { position: 3, name: 'Vikram Mehta', serviceType: 'Exchanges', status: 'waiting' as const, waitTime: 12 }
        ]
      },
      { 
        id: 4, 
        name: 'Counter 4', 
        services: ['New Account', 'Account Updates'], 
        status: 'available' as const, 
        currentQueue: 1,
        currentlyServing: 0,
        queueEntries: [
          { position: 1, name: 'Anita Desai', serviceType: 'New Account', status: 'waiting' as const, waitTime: 10 }
        ]
      }
    ];
  };

  const getServiceWaitTime = (serviceType: string) => {
    switch (serviceType) {
      case 'Billing': return 5;
      case 'Customer Service': return 8;
      case 'Returns': return 12;
      case 'New Account': return 15;
      default: return 10;
    }
  };

  const getTotalQueueStats = () => {
    const counters = getAvailableCounters();
    const totalInQueue = counters.reduce((sum, counter) => sum + counter.currentQueue, 0);
    const totalCurrentlyServing = counters.reduce((sum, counter) => sum + counter.currentlyServing, 0);
    const averageWaitTime = Math.round(
      counters.reduce((sum, counter) => {
        const counterAvg = counter.queueEntries.reduce((entrySum, entry) => entrySum + entry.waitTime, 0) / counter.queueEntries.length;
        return sum + (isNaN(counterAvg) ? 0 : counterAvg);
      }, 0) / counters.length
    );
    
    return {
      totalInQueue,
      totalCurrentlyServing,
      averageWaitTime: isNaN(averageWaitTime) ? 0 : averageWaitTime
    };
  };

  const getOptimalCounter = (serviceType: string) => {
    const counters = getAvailableCounters();
    return counters
      .filter(counter => 
        counter.services.includes(serviceType) && 
        counter.status === 'available'
      )
      .sort((a, b) => a.currentQueue - b.currentQueue)[0];
  };

  return {
    ...baseQueue,
    serviceConfig: multiCounterServiceConfig,
    handleJoinMultiCounterQueue,
    getAvailableCounters,
    getServiceWaitTime,
    getOptimalCounter,
    getTotalQueueStats
  };
}