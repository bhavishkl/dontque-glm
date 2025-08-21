"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Info, 
  Users, 
  Award, 
  Globe, 
  Shield,
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  Target,
  Heart,
  Zap
} from "lucide-react"

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Active Drivers", value: "50,000+" },
    { icon: MapPin, label: "CNG Pumps", value: "500+" },
    { icon: TrendingUp, label: "Daily Queues", value: "10,000+" },
    { icon: Star, label: "App Rating", value: "4.8/5" }
  ]

  const features = [
    {
      icon: Zap,
      title: "Real-time Queue Management",
      description: "Join virtual queues and get real-time updates on your position and estimated wait time"
    },
    {
      icon: MapPin,
      title: "Pump Locator",
      description: "Find nearby CNG pumps with current queue status, wait times, and pricing information"
    },
    {
      icon: Target,
      title: "Smart Notifications",
      description: "Receive alerts when your turn is approaching or when pump status changes"
    },
    {
      icon: Users,
      title: "Driver Profile",
      description: "Manage your personal information, vehicle details, and track your fueling history"
    }
  ]

  const team = [
    {
      name: "Rajesh Sharma",
      role: "Founder & CEO",
      bio: "Former auto driver with 15+ years experience, passionate about solving industry challenges"
    },
    {
      name: "Priya Patel",
      role: "CTO",
      bio: "Tech enthusiast with expertise in mobile app development and queue management systems"
    },
    {
      name: "Amit Kumar",
      role: "Head of Operations",
      bio: "Operations specialist focused on driver experience and pump partnerships"
    },
    {
      name: "Sneha Reddy",
      role: "Customer Success",
      bio: "Dedicated to ensuring drivers have the best experience with our platform"
    }
  ]

  const testimonials = [
    {
      name: "Ramesh Kumar",
      vehicle: "MH-01-AB-1234",
      quote: "This app has saved me hours of waiting time. I can now plan my day better and know exactly when to arrive at the pump.",
      rating: 5
    },
    {
      name: "Suresh Patel",
      vehicle: "MH-02-CD-5678",
      quote: "The real-time queue updates are amazing. No more guessing games or wasting fuel while waiting in long queues.",
      rating: 5
    },
    {
      name: "Vikram Singh",
      vehicle: "MH-03-EF-9012",
      quote: "Simple to use and very reliable. I've recommended this app to all my fellow auto drivers in Mumbai.",
      rating: 4
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">CQ</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">About CNG Queue</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing the CNG refueling experience for auto drivers across India with smart queue management and real-time updates
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-green-100 text-green-800">Free to Use</Badge>
            <Badge className="bg-blue-100 text-blue-800">Available 24/7</Badge>
            <Badge className="bg-purple-100 text-purple-800">500+ Pumps</Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">The Problem</h3>
                <p className="text-gray-600 mb-4">
                  Auto drivers across India face significant challenges when refueling at CNG pumps. Long queues, 
                  unpredictable wait times, and lack of real-time information lead to wasted time, fuel, and income.
                </p>
                <p className="text-gray-600">
                  Traditional queue management is inefficient, causing drivers to wait for hours without knowing 
                  their position or when they'll be served.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Our Solution</h3>
                <p className="text-gray-600 mb-4">
                  CNG Queue is a comprehensive digital platform that eliminates the chaos of physical queues. 
                  Our app allows drivers to join virtual queues, track their position in real-time, and receive 
                  notifications when their turn approaches.
                </p>
                <p className="text-gray-600">
                  By leveraging technology, we're making CNG refueling more efficient, predictable, and 
                  stress-free for thousands of auto drivers across India.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What Drivers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.vehicle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Get In Touch
            </CardTitle>
            <CardDescription>
              Have questions or feedback? We'd love to hear from you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">hello@cngqueue.in</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">+91 1800-123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Headquarters</p>
                  <p className="text-gray-600">Mumbai, India</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardHeader>
            <CardTitle>App Information</CardTitle>
            <CardDescription>Technical details and legal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Version</h4>
                <p className="text-gray-600">CNG Queue v2.1.0</p>
                
                <h4 className="font-medium text-gray-900">Last Updated</h4>
                <p className="text-gray-600">December 15, 2024</p>
                
                <h4 className="font-medium text-gray-900">Size</h4>
                <p className="text-gray-600">24.5 MB</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Compatibility</h4>
                <p className="text-gray-600">Android 8.0+ and iOS 12.0+</p>
                
                <h4 className="font-medium text-gray-900">Languages</h4>
                <p className="text-gray-600">English, Hindi, Marathi, Tamil, Telugu</p>
                
                <h4 className="font-medium text-gray-900">License</h4>
                <p className="text-gray-600">Free to use with premium features available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download the App
            </CardTitle>
            <CardDescription>
              Available on both Android and iOS platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Download for iOS
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Download for Android
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 border-t">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-600">Made with love for auto drivers across India</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2024 CNG Queue. All rights reserved. | 
            <a href="#" className="text-blue-600 hover:underline mx-1">Privacy Policy</a> | 
            <a href="#" className="text-blue-600 hover:underline mx-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </MainLayout>
  )
}
