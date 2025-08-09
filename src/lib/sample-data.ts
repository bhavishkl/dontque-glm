import { QueueLocation } from './services'

export const sampleLocations: QueueLocation[] = [
  // CNG Pumps
  {
    id: 'cng-1',
    name: 'CNG Station - Andheri East',
    address: 'Western Express Highway, Andheri East, Mumbai - 400069',
    phone: '+91 22 2834 5678',
    latitude: 19.1196,
    longitude: 72.8465,
    serviceType: 'cng-pump',
    status: 'active',
    currentQueue: 12,
    estimatedWaitTime: 25,
    rating: 4.5,
    price: '₹89.5/kg',
    operatingHours: '24/7',
    facilities: ['Restroom', 'Air Fill', 'Water', 'Snacks']
  },
  {
    id: 'cng-2',
    name: 'CNG Station - Powai',
    address: 'Hiranandani Gardens, Powai, Mumbai - 400076',
    phone: '+91 22 2570 1234',
    latitude: 19.1177,
    longitude: 72.9070,
    serviceType: 'cng-pump',
    status: 'active',
    currentQueue: 8,
    estimatedWaitTime: 18,
    rating: 4.3,
    price: '₹88.9/kg',
    operatingHours: '6:00 AM - 11:00 PM',
    facilities: ['Restroom', 'Air Fill', 'Water']
  },
  
  // Clinics
  {
    id: 'clinic-1',
    name: 'City Care Clinic - Andheri',
    address: 'SV Road, Andheri West, Mumbai - 400058',
    phone: '+91 22 2674 1234',
    latitude: 19.1075,
    longitude: 72.8365,
    serviceType: 'clinic',
    status: 'active',
    currentQueue: 15,
    estimatedWaitTime: 45,
    rating: 4.7,
    operatingHours: '8:00 AM - 8:00 PM',
    facilities: ['Parking', 'Pharmacy', 'Laboratory', 'X-Ray'],
    specialties: ['General Medicine', 'Pediatrics', 'Dermatology'],
    doctors: ['Dr. Sharma', 'Dr. Patel', 'Dr. Gupta']
  },
  {
    id: 'clinic-2',
    name: 'Lifeline Medical Center - Powai',
    address: 'Hiranandani Gardens, Powai, Mumbai - 400076',
    phone: '+91 22 2578 9012',
    latitude: 19.1157,
    longitude: 72.9080,
    serviceType: 'clinic',
    status: 'busy',
    currentQueue: 22,
    estimatedWaitTime: 60,
    rating: 4.4,
    operatingHours: '24/7 Emergency',
    facilities: ['Emergency', 'ICU', 'Pharmacy', 'Parking'],
    specialties: ['Cardiology', 'Orthopedics', 'General Surgery'],
    doctors: ['Dr. Reddy', 'Dr. Kumar', 'Dr. Singh']
  },
  {
    id: 'clinic-3',
    name: 'Health First Clinic - Bandra',
    address: 'Linking Road, Bandra West, Mumbai - 400050',
    phone: '+91 22 2643 5678',
    latitude: 19.0596,
    longitude: 72.8295,
    serviceType: 'clinic',
    status: 'active',
    currentQueue: 8,
    estimatedWaitTime: 30,
    rating: 4.6,
    operatingHours: '9:00 AM - 6:00 PM',
    facilities: ['Parking', 'Pharmacy'],
    specialties: ['General Medicine', 'Gynecology'],
    doctors: ['Dr. Desai', 'Dr. Shah']
  },
  
  // Restaurants
  {
    id: 'restaurant-1',
    name: 'Spice Garden - Andheri',
    address: 'Phoenix Mall, Andheri East, Mumbai - 400069',
    phone: '+91 22 2834 9999',
    latitude: 19.1186,
    longitude: 72.8475,
    serviceType: 'restaurant',
    status: 'busy',
    currentQueue: 25,
    estimatedWaitTime: 40,
    rating: 4.3,
    operatingHours: '11:00 AM - 11:00 PM',
    facilities: ['AC', 'Parking', 'Home Delivery', 'Party Hall'],
    specialties: ['North Indian', 'Chinese', 'Continental']
  },
  {
    id: 'restaurant-2',
    name: 'Pizza Corner - Powai',
    address: 'Hiranandani Plaza, Powai, Mumbai - 400076',
    phone: '+91 22 2570 8888',
    latitude: 19.1167,
    longitude: 72.9060,
    serviceType: 'restaurant',
    status: 'active',
    currentQueue: 12,
    estimatedWaitTime: 20,
    rating: 4.1,
    operatingHours: '10:00 AM - 10:00 PM',
    facilities: ['AC', 'Takeaway', 'Home Delivery'],
    specialties: ['Pizza', 'Italian', 'Fast Food']
  },
  
  // Government Offices
  {
    id: 'govt-1',
    name: 'Regional Passport Office - Mumbai',
    address: 'Bhikaji Cama Place, Mumbai - 400021',
    phone: '+91 22 2674 2000',
    latitude: 19.0075,
    longitude: 72.8275,
    serviceType: 'government',
    status: 'busy',
    currentQueue: 150,
    estimatedWaitTime: 120,
    rating: 3.2,
    operatingHours: '9:30 AM - 5:00 PM',
    facilities: ['Parking', 'Document Center', 'Photo Booth'],
    specialties: ['Passport Services', 'VISA Services']
  },
  {
    id: 'govt-2',
    name: 'RTO Office - Andheri',
    address: 'Western Express Highway, Andheri East, Mumbai - 400069',
    phone: '+91 22 2834 3000',
    latitude: 19.1206,
    longitude: 72.8455,
    serviceType: 'government',
    status: 'active',
    currentQueue: 80,
    estimatedWaitTime: 90,
    rating: 3.5,
    operatingHours: '9:00 AM - 6:00 PM',
    facilities: ['Parking', 'Document Verification', 'Test Center'],
    specialties: ['Driving License', 'Vehicle Registration']
  }
]

export const getLocationsByService = (serviceType: string): QueueLocation[] => {
  return sampleLocations.filter(location => location.serviceType === serviceType)
}

export const getLocationById = (id: string): QueueLocation | undefined => {
  return sampleLocations.find(location => location.id === id)
}

export const getNearbyLocations = (lat: number, lng: number, radius: number = 10): QueueLocation[] => {
  return sampleLocations.filter(location => {
    const distance = calculateDistance(lat, lng, location.latitude, location.longitude)
    return distance <= radius
  })
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}