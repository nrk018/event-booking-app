import Link from "next/link"
import { ArrowLeft, Calendar, Check, Clock, Download, MapPin, QrCode, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GridBackground } from "@/components/grid-background"
import { FadeIn } from "@/components/animations/fade-in"

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <GridBackground />

      <main className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <FadeIn>
            <div className="flex items-center mb-8">
              <Link href="/">
                <Button variant="ghost" size="icon" className="mr-4 text-gray-400 hover:text-white">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">My Tickets</h1>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Tabs defaultValue="upcoming" className="mb-8">
              <TabsList className="bg-gray-900/50 border border-gray-800">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event, index) => (
                    <FadeIn key={event.id} delay={0.05 * index}>
                      <Card className="h-full overflow-hidden bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-purple-500/50 transition-colors">
                        <div className="aspect-video relative overflow-hidden">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${event.image})` }}
                          />
                          <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full bg-green-500 text-white">
                            Confirmed
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <div className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-300">
                              {event.category}
                            </div>
                          </div>

                          <div className="space-y-3 text-gray-400">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Ticket className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Ticket #{event.ticketNumber}</span>
                            </div>
                          </div>

                          <div className="mt-6 flex gap-2">
                            <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                              <QrCode className="h-4 w-4 mr-2" />
                              Check In
                            </Button>
                            <Button variant="outline" size="icon" className="border-gray-700 text-white">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </FadeIn>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="past" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event, index) => (
                    <FadeIn key={event.id} delay={0.05 * index}>
                      <Card className="h-full overflow-hidden bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-purple-500/50 transition-colors">
                        <div className="aspect-video relative overflow-hidden">
                          <div
                            className="absolute inset-0 bg-cover bg-center grayscale"
                            style={{ backgroundImage: `url(${event.image})` }}
                          />
                          <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full bg-gray-600 text-white">
                            Attended
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <div className="px-2 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
                              {event.category}
                            </div>
                          </div>

                          <div className="space-y-3 text-gray-400">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Ticket className="h-4 w-4 mr-2 text-gray-500" />
                              <span>Ticket #{event.ticketNumber}</span>
                            </div>
                            <div className="flex items-center">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              <span className="text-green-500">Checked in at {event.checkinTime}</span>
                            </div>
                          </div>

                          <div className="mt-6">
                            <Button variant="outline" className="w-full border-gray-700 text-white">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </FadeIn>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Upcoming Check-ins</h2>

              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {upcomingEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className="flex flex-col md:flex-row gap-6 p-4 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-colors"
                      >
                        <div className="md:w-1/4">
                          <div
                            className="aspect-video rounded-lg bg-cover bg-center"
                            style={{ backgroundImage: `url(${event.image})` }}
                          />
                        </div>

                        <div className="md:w-2/4 space-y-3">
                          <h3 className="text-xl font-bold">{event.title}</h3>

                          <div className="flex flex-wrap gap-4 text-gray-400">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{event.location}</span>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <div className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-300">
                              Gate opens at {event.gateOpenTime}
                            </div>
                          </div>
                        </div>

                        <div className="md:w-1/4 flex flex-col justify-center items-center gap-4">
                          <div className="w-24 h-24 bg-white p-2 rounded-lg">
                            <div className="w-full h-full bg-[url('/placeholder.svg?height=100&width=100')] bg-no-repeat bg-center bg-contain" />
                          </div>

                          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                            Check In
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  )
}

// Sample data
const upcomingEvents = [
  {
    id: "1",
    title: "Tech Conference 2025",
    category: "Technology",
    date: "May 15-17, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Moscone Center, San Francisco, CA",
    ticketNumber: "1234567890",
    gateOpenTime: "8:00 AM",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "2",
    title: "Music Festival",
    category: "Entertainment",
    date: "June 10-12, 2025",
    time: "12:00 PM - 11:00 PM",
    location: "Zilker Park, Austin, TX",
    ticketNumber: "0987654321",
    gateOpenTime: "11:00 AM",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "3",
    title: "Design Summit",
    category: "Design",
    date: "July 5, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "Metropolitan Pavilion, New York, NY",
    ticketNumber: "5678901234",
    gateOpenTime: "9:00 AM",
    image: "/placeholder.svg?height=300&width=600",
  },
]

const pastEvents = [
  {
    id: "4",
    title: "AI Conference 2024",
    category: "Technology",
    date: "November 10, 2024",
    location: "Convention Center, Las Vegas, NV",
    ticketNumber: "2468013579",
    checkinTime: "8:45 AM",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "5",
    title: "Marketing Summit",
    category: "Business",
    date: "October 5, 2024",
    location: "Hyatt Regency, Chicago, IL",
    ticketNumber: "1357924680",
    checkinTime: "9:30 AM",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "6",
    title: "Film Festival",
    category: "Entertainment",
    date: "September 15-20, 2024",
    location: "Various Venues, Los Angeles, CA",
    ticketNumber: "8642097531",
    checkinTime: "6:15 PM",
    image: "/placeholder.svg?height=300&width=600",
  },
]

