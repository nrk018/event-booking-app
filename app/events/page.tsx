import Link from "next/link"
import { ArrowLeft, Calendar, Filter, MapPin, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GridBackground } from "@/components/grid-background"
import { FadeIn } from "@/components/animations/fade-in"

export default function EventsPage() {
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
              <h1 className="text-3xl font-bold">Browse Events</h1>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input placeholder="Search events..." className="pl-10 bg-gray-900/50 border-gray-800 text-white" />
              </div>

              <div className="flex gap-4">
                <Select>
                  <SelectTrigger className="w-[180px] bg-gray-900/50 border-gray-800 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="border-gray-800 text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <FadeIn key={event.id} delay={0.05 * index}>
                <Link href={`/events/${event.id}`}>
                  <Card className="h-full overflow-hidden bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-purple-500/50 transition-colors group">
                    <div className="aspect-video relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${event.image})` }}
                      />
                      {event.featured && (
                        <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full bg-purple-500 text-white">
                          Featured
                        </div>
                      )}
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
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{event.availableSeats} seats available</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button
                          variant="outline"
                          className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                        >
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-12 flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="border-gray-800 text-white">
                  1
                </Button>
                <Button variant="outline" size="icon" className="border-gray-800 text-white">
                  2
                </Button>
                <Button variant="outline" size="icon" className="border-gray-800 text-white">
                  3
                </Button>
                <Button variant="outline" size="icon" className="border-gray-800 text-white">
                  ...
                </Button>
                <Button variant="outline" size="icon" className="border-gray-800 text-white">
                  10
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  )
}

// Sample data
const events = [
  {
    id: "1",
    title: "Tech Conference 2025",
    category: "Technology",
    date: "May 15-17, 2025",
    location: "San Francisco, CA",
    availableSeats: 245,
    featured: true,
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "2",
    title: "Music Festival",
    category: "Entertainment",
    date: "June 10-12, 2025",
    location: "Austin, TX",
    availableSeats: 578,
    featured: false,
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "3",
    title: "Design Summit",
    category: "Design",
    date: "July 5, 2025",
    location: "New York, NY",
    availableSeats: 120,
    featured: false,
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "4",
    title: "Business Conference",
    category: "Business",
    date: "August 20-22, 2025",
    location: "Chicago, IL",
    availableSeats: 350,
    featured: false,
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "5",
    title: "AI & Machine Learning Expo",
    category: "Technology",
    date: "September 15, 2025",
    location: "Seattle, WA",
    availableSeats: 180,
    featured: true,
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "6",
    title: "Film Festival",
    category: "Entertainment",
    date: "October 5-10, 2025",
    location: "Los Angeles, CA",
    availableSeats: 420,
    featured: false,
    image: "/placeholder.svg?height=300&width=600",
  },
]

