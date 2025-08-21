export interface QueueType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface ServiceConfig {
  id: string;
  name: string;
  queueType: string;
  features: string[];
  customFields?: CustomField[];
  priorityRules?: PriorityRule[];
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'email' | 'phone';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export interface PriorityRule {
  id: string;
  name: string;
  condition: string;
  priority: number;
}

export const QUEUE_TYPES: QueueType[] = [
  {
    id: 'multi-counter',
    name: 'Multi-Counter Queue',
    description: 'Multiple service counters with parallel processing',
    icon: 'LayoutGrid',
    color: 'green'
  }
];

export const serviceConfigs: ServiceConfig[] = [
  {
    id: 'multi-retail',
    name: 'Retail Services',
    queueType: 'multi-counter',
    features: ['Multiple counters', 'Service selection', 'Load balancing'],
    customFields: [
      {
        id: 'service-type',
        name: 'Service Type',
        type: 'select',
        required: true,
        options: ['Billing', 'Customer Service', 'Returns', 'New Account']
      }
    ]
  },
  {
    id: 'multi-bank',
    name: 'Bank Services',
    queueType: 'multi-counter',
    features: ['Multiple counters', 'Token system', 'Service specialization'],
    customFields: [
      {
        id: 'service-type',
        name: 'Service Type',
        type: 'select',
        required: true,
        options: ['Deposits', 'Withdrawals', 'Loans', 'Account Services']
      }
    ]
  },
  {
    id: 'multi-healthcare',
    name: 'Healthcare Services',
    queueType: 'multi-counter',
    features: ['Multiple counters', 'Appointment priority', 'Doctor specialization'],
    customFields: [
      {
        id: 'service-type',
        name: 'Service Type',
        type: 'select',
        required: true,
        options: ['General Checkup', 'Specialist', 'Emergency', 'Follow-up']
      },
      {
        id: 'patient-id',
        name: 'Patient ID',
        type: 'text',
        required: false,
        placeholder: 'PAT-001'
      }
    ]
  },
  {
    id: 'multi-fuel',
    name: 'Fuel Station Services',
    queueType: 'multi-counter',
    features: ['Multiple pumps', 'Vehicle tracking', 'Fuel type selection'],
    customFields: [
      {
        id: 'vehicle-number',
        name: 'Vehicle Number',
        type: 'text',
        required: true,
        placeholder: 'MH-01-AB-1234'
      },
      {
        id: 'fuel-type',
        name: 'Fuel Type',
        type: 'select',
        required: true,
        options: ['CNG', 'Regular', 'Premium', 'Diesel']
      }
    ]
  }
];