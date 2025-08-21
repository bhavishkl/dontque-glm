"use client"
import { Suspense } from "react"
import { Loading } from "@/components/loading"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle, 
  BookOpen,
  Video,
  Download,
  ExternalLink,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react"
import { useState } from "react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      category: "Getting Started",
      items: [
        {
          question: "How do I join a queue at a CNG pump?",
          answer: "To join a queue, go to the 'Find Services' page, select your preferred CNG pump, enter your vehicle number and driver name, then click 'Join Queue'. You'll receive a confirmation with your position and estimated wait time."
        },
        {
          question: "How do I find nearby CNG pumps?",
          answer: "Use the 'CNG Pumps' page to see all nearby stations. You can filter by distance, queue length, wait time, or price. The app uses your location to show the closest pumps first."
        },
        {
          question: "What information do I need to provide?",
          answer: "You need to provide your driver name, vehicle number, and select a CNG pump. Having your license and vehicle details ready in your profile will make the process faster."
        }
      ]
    },
    {
      category: "Queue Management",
      items: [
        {
          question: "How can I check my queue position?",
          answer: "Your current queue position is shown on the Dashboard. You can also check the 'Queue Status' page for real-time updates and detailed information about your position in the queue."
        },
        {
          question: "What happens if I leave the queue?",
          answer: "If you need to leave the queue, simply exit the app or go to the Queue Status page and select 'Leave Queue'. This will remove you from the queue and free up your spot for others."
        },
        {
          question: "How accurate are the wait time estimates?",
          answer: "Wait time estimates are based on historical data and current queue conditions. They're generally accurate within ±5 minutes, but actual times may vary based on pump efficiency and unexpected delays."
        }
      ]
    },
    {
      category: "Account & Profile",
      items: [
        {
          question: "How do I update my profile information?",
          answer: "Go to the 'Profile' page and click 'Edit Profile'. You can update your personal information, vehicle details, and contact information. Don't forget to save your changes."
        },
        {
          question: "Is my information secure?",
          answer: "Yes, we use industry-standard encryption to protect your data. Your personal information is never shared with third parties without your consent, and we comply with all data protection regulations."
        },
        {
          question: "How do I add multiple vehicles?",
          answer: "Currently, you can add one primary vehicle per account. If you need to manage multiple vehicles, please contact our support team for assistance."
        }
      ]
    },
    {
      category: "Technical Issues",
      items: [
        {
          question: "The app is not showing my current location",
          answer: "Make sure location services are enabled for the app in your device settings. Go to Settings > Privacy > Location Services and ensure the app has permission to access your location."
        },
        {
          question: "I'm not receiving notifications",
          answer: "Check your notification settings in the app and ensure push notifications are enabled. Also, verify that your device allows notifications from the app in system settings."
        },
        {
          question: "The app keeps crashing",
          answer: "Try restarting the app and your device. If the problem persists, check for app updates or contact our support team with details about your device and the issue."
        }
      ]
    },
    {
      category: "Payments & Billing",
      items: [
        {
          question: "Is there a fee to use the app?",
          answer: "The basic version of the app is free to use. We may introduce premium features in the future, but core queue management will always remain free for auto drivers."
        },
        {
          question: "How do I pay for CNG?",
          answer: "Payment is made directly at the CNG pump using cash, card, or digital payment methods. Our app only manages the queue system and doesn't handle payments."
        },
        {
          question: "Are there any hidden charges?",
          answer: "No, there are no hidden charges. The app is completely free to use for joining queues and checking pump status."
        }
      ]
    }
  ]

  const filteredFaqs = faqs.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0)

  const guides = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of using the CNG Queue app",
      icon: BookOpen,
      duration: "5 min read",
      link: "#"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: Video,
      duration: "10 videos",
      link: "#"
    },
    {
      title: "Driver Handbook",
      description: "Complete guide for auto drivers",
      icon: Download,
      duration: "PDF Download",
      link: "#"
    }
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      value: "+91 1800-123-4567",
      hours: "9:00 AM - 6:00 PM",
      available: true
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      value: "Start Chat",
      hours: "24/7",
      available: true
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email for detailed queries",
      value: "support@cngqueue.in",
      hours: "24/7",
      available: true
    }
  ]

  return (
    <Suspense fallback={<Loading />}>
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions, access guides, or get in touch with our support team
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <p className="text-sm text-gray-600">Help Articles</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <p className="text-sm text-gray-600">Support Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">&lt; 5 min</div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* FAQ Categories */}
            {filteredFaqs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">
                    Try searching with different keywords or browse all categories
                  </p>
                  <Button onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredFaqs.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                    <CardDescription>
                      {category.items.length} {category.items.length === 1 ? 'question' : 'questions'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.items.map((item, itemIndex) => (
                        <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}>
                          <AccordionTrigger className="text-left">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((guide, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <guide.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{guide.duration}</Badge>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Popular Topics</CardTitle>
                <CardDescription>Quick access to commonly requested information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">For New Users</h4>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start">
                        How to create an account
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        Understanding queue system
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        Setting up your profile
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Advanced Features</h4>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start">
                        Managing notifications
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        Using favorites and shortcuts
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        Understanding analytics
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <method.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {method.available ? (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        ) : (
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                        <span className="text-sm font-medium">
                          {method.available ? "Available" : "Unavailable"}
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">{method.value}</p>
                      <p className="text-sm text-gray-600">{method.hours}</p>
                      <Button className="w-full" disabled={!method.available}>
                        {method.available ? "Contact Now" : "Unavailable"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <Input placeholder="Your name" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <Input type="email" placeholder="your@email.com" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Subject</label>
                    <Input placeholder="How can we help?" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      rows={4}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your issue or question..."
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">App Status</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-600">Operational</span>
                      </div>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Queue System</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-600">Normal</span>
                      </div>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Notifications</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-600">Delivered</span>
                      </div>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">API Status</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium text-yellow-600">Slow</span>
                      </div>
                    </div>
                    <AlertCircle className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Incidents</CardTitle>
                <CardDescription>System status updates and maintenance notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">All systems operational</p>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">All services are running normally</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">API response time degraded</p>
                        <span className="text-sm text-gray-500">5 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">We're investigating increased response times</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">Scheduled maintenance</p>
                        <span className="text-sm text-gray-500">1 day ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Completed successfully with no downtime</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
    </Suspense>
  )
}
