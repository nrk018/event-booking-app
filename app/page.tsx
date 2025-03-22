import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GridBackground } from "@/components/grid-background"
import { FadeIn } from "@/components/animations/fade-in"
import { ParallaxSection } from "@/components/animations/parallax-section"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <GridBackground />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 md:py-32">
          <ParallaxSection>
            <FadeIn delay={0.2}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Seamless Events
                </span>
                <span className="block mt-2">From Booking to Entry</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="mt-6 max-w-2xl text-lg text-gray-300">
                Experience the future of event management with our intuitive booking and check-in system. Effortless for
                attendees, powerful for organizers.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="mt-10">
                <Link href="/events">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <span className="relative z-10 flex items-center">
                      Browse Events
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </ParallaxSection>
        </section>

        {/* Featured Events */}
        <section className="container mx-auto px-4 py-16">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-10">Featured Events</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event, index) => (
              <FadeIn key={event.id} delay={0.1 * index}>
                <Link href={`/events/${event.id}`}>
                  <Card className="h-full overflow-hidden bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-purple-500/50 transition-colors group">
                    <div className="aspect-video relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${event.image})` }}
                      />
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

          <FadeIn delay={0.6}>
            <div className="mt-12 text-center">
              <Link href="/events">
                <Button variant="outline" size="lg" className="border-gray-700 hover:bg-gray-800">
                  View All Events
                </Button>
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-24">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-16 text-center">A Complete Event Experience</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <FadeIn key={index} delay={0.1 * index}>
                <div className="relative p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-800">
                  <div className="absolute -top-8 left-6 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-8 text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

// Sample data
const featuredEvents = [
  {
    id: "1",
    title: "Tech Conference 2025",
    category: "Technology",
    date: "May 15-17, 2025",
    location: "San Francisco, CA",
    availableSeats: 245,
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "2",
    title: "Music Festival",
    category: "Entertainment",
    date: "June 10-12, 2025",
    location: "Austin, TX",
    availableSeats: 578,
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "3",
    title: "Design Summit",
    category: "Design",
    date: "July 5, 2025",
    location: "New York, NY",
    availableSeats: 120,
    image: "/placeholder.svg?height=300&width=600",
  },
]

const features = [
  {
    title: "Easy Booking",
    description: "Book tickets in seconds with our intuitive step-by-step process and interactive seat selection.",
    icon: Calendar,
  },
  {
    title: "Digital Check-in",
    description: "Skip the lines with our express QR code check-in system that works seamlessly on any device.",
    icon: Users,
  },
  {
    title: "Real-time Updates",
    description: "Get instant notifications about your event, including gate changes and important announcements.",
    icon: MapPin,
  },
]

