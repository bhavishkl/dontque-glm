'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star,
  Users,
  AlertTriangle
} from "lucide-react";
import { QueueLocation } from "@/lib/services";
import { getServiceById } from "@/lib/services";

interface LocationInfoCardProps {
  location: QueueLocation;
  showWaitTimeHighlight?: boolean;
}

export function LocationInfoCard({ location, showWaitTimeHighlight = true }: LocationInfoCardProps) {
  const service = getServiceById(location.serviceType);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "busy": return "bg-yellow-100 text-yellow-800";
      case "closed": return "bg-red-100 text-red-800";
      case "maintenance": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return null;
      case "busy": return <AlertTriangle className="w-4 h-4" />;
      case "closed": return <AlertTriangle className="w-4 h-4" />;
      case "maintenance": return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${service?.color || 'bg-gray-600'} rounded-lg flex items-center justify-center text-lg`}>
              {service?.icon || '📍'}
            </div>
            <div>
              <CardTitle className="text-lg">{location.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getStatusColor(location.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(location.status)}
                    {location.status}
                  </span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600">{location.address}</span>
          </div>

          {/* Contact and Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{location.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{location.operatingHours}</span>
            </div>
          </div>

          {/* Queue and Rating Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span>{location.currentQueue} in queue</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-500" />
              <span>{location.rating.toFixed(1)} rating</span>
            </div>
          </div>

          {/* Estimated Wait Time Highlight */}
          {showWaitTimeHighlight && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">Estimated Wait Time</span>
                <span className="text-lg font-bold text-blue-900">{location.estimatedWaitTime} min</span>
              </div>
            </div>
          )}

          {/* Price (for CNG pumps) */}
          {location.price && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-900">Current Price</span>
                <span className="text-lg font-bold text-green-900">{location.price}</span>
              </div>
            </div>
          )}

          {/* Facilities */}
          {location.facilities && location.facilities.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Facilities</p>
              <div className="flex flex-wrap gap-1">
                {location.facilities.slice(0, 6).map((facility, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {facility}
                  </Badge>
                ))}
                {location.facilities.length > 6 && (
                  <Badge variant="outline" className="text-xs">
                    +{location.facilities.length - 6} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Specialties (for clinics and restaurants) */}
          {location.specialties && location.specialties.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                {location.serviceType === 'clinic' ? 'Specialties' : 'Cuisine'}
              </p>
              <div className="flex flex-wrap gap-1">
                {location.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Doctors (for clinics) */}
          {location.doctors && location.doctors.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Available Doctors</p>
              <div className="flex flex-wrap gap-1">
                {location.doctors.map((doctor, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {doctor}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}