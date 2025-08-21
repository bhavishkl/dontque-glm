export interface ServiceType {
  id: string
  name: string
  description: string
  icon: string
  color: string
  category: string
  features: string[]
  fields: ServiceField[]
}

export interface ServiceField {
  name: string
  label: string
  type: 'text' | 'number' | 'select' | 'email' | 'tel'
  required: boolean
  options?: string[]
  placeholder?: string
}

export interface QueueLocation {
  id: string
  name: string
  address: string
  phone: string
  latitude: number
  longitude: number
  serviceType: string
  status: 'active' | 'busy' | 'closed' | 'maintenance'
  currentQueue: number
  estimatedWaitTime: number
  rating: number
  price?: string
  operatingHours: string
  facilities: string[]
  specialties?: string[]
  doctors?: string[]
}

export interface QueueEntry {
  id: string
  userId: string
  serviceType: string
  locationId: string
  position: number
  estimatedWaitTime: number
  status: 'waiting' | 'serving' | 'completed' | 'cancelled'
  joinedAt: Date
  completedAt?: Date
  metadata: Record<string, any>
}

export const serviceTypes: ServiceType[] = [
  {
    id: 'cng-pump',
    name: 'CNG Pumps',
    description: 'Skip the long queues at CNG refueling stations',
    icon: '⛽',
    color: 'bg-green-600',
    category: 'Automotive',
    features: [
      'Real-time queue tracking',
      'Multiple pump locations',
      'Estimated wait times',
      'Fuel price updates'
    ],
    fields: [
      { name: 'driverName', label: 'Driver Name', type: 'text', required: true, placeholder: 'Enter your full name' },
      { name: 'vehicleNumber', label: 'Vehicle Number', type: 'text', required: true, placeholder: 'MH-01-AB-1234' },
      { name: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true, options: ['Auto Rickshaw', 'Car', 'Bus', 'Truck'] },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+91 98765 43210' }
    ]
  },
  {
    id: 'clinic',
    name: 'Clinics',
    description: 'Book appointments and join queues at healthcare clinics',
    icon: '🏥',
    color: 'bg-blue-600',
    category: 'Healthcare',
    features: [
      'Doctor appointment booking',
      'Specialty clinics',
      'Real-time queue status',
      'Medical records integration'
    ],
    fields: [
      { name: 'patientName', label: 'Patient Name', type: 'text', required: true, placeholder: 'Enter patient full name' },
      { name: 'age', label: 'Age', type: 'number', required: true, placeholder: 'Enter age' },
      { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+91 98765 43210' },
      { name: 'symptoms', label: 'Symptoms (Optional)', type: 'text', required: false, placeholder: 'Brief description of symptoms' },
      { name: 'doctorPreference', label: 'Doctor Preference (Optional)', type: 'select', required: false, options: ['Any Available', 'General Physician', 'Specialist'] }
    ]
  },
  {
    id: 'restaurant',
    name: 'Restaurants',
    description: 'Join virtual queues at popular restaurants and food courts',
    icon: '🍽️',
    color: 'bg-orange-600',
    category: 'Food & Dining',
    features: [
      'Table booking',
      'Real-time wait times',
      'Menu preview',
      'Special dietary options'
    ],
    fields: [
      { name: 'customerName', label: 'Customer Name', type: 'text', required: true, placeholder: 'Enter your full name' },
      { name: 'partySize', label: 'Party Size', type: 'number', required: true, placeholder: 'Number of people' },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+91 98765 43210' },
      { name: 'specialRequests', label: 'Special Requests (Optional)', type: 'text', required: false, placeholder: 'Any dietary restrictions or preferences' }
    ]
  },
  {
    id: 'government',
    name: 'Government Offices',
    description: 'Skip lines at government offices and public services',
    icon: '🏛️',
    color: 'bg-purple-600',
    category: 'Public Services',
    features: [
      'Appointment scheduling',
      'Document processing',
      'Real-time queue updates',
      'Service status tracking'
    ],
    fields: [
      { name: 'applicantName', label: 'Applicant Name', type: 'text', required: true, placeholder: 'Enter your full name' },
      { name: 'aadharNumber', label: 'Aadhar Number', type: 'text', required: true, placeholder: 'XXXX-XXXX-XXXX' },
      { name: 'serviceType', label: 'Service Type', type: 'select', required: true, options: ['Passport', 'Driving License', 'PAN Card', 'Other'] },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+91 98765 43210' }
    ]
  }
]

export const getServiceById = (id: string): ServiceType | undefined => {
  return serviceTypes.find(service => service.id === id)
}

export const getServicesByCategory = (category: string): ServiceType[] => {
  return serviceTypes.filter(service => service.category === category)
}

export const getAllCategories = (): string[] => {
  return [...new Set(serviceTypes.map(service => service.category))]
}

export const getQueuePageForService = (serviceType: string): string => {
  // All services now use the multi-counter queue system
  return '/queue-status/multi-counter';
}