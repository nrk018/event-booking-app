import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GridBackground } from "@/components/grid-background"
import { FadeIn } from "@/components/animations/fade-in"

export default function EventDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the event data based on the ID
  const event = events.find((e) => e.id === params.id) || events[0]

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <GridBackground />

      <main className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <FadeIn>
            <div className="flex items-center mb-8">
              <Link href="/events">
                <Button variant="ghost" size="icon" className="mr-4 text-gray-400 hover:text-white">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Event Details</h1>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="rounded-xl overflow-hidden">
                  <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }} />
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="mt-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h2 className="text-3xl font-bold">{event.title}</h2>
                    <div className="px-3 py-1 text-sm font-medium rounded-full bg-purple-500/20 text-purple-300">
                      {event.category}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-purple-400" />
                      <div>
                        <div className="text-sm text-gray-400">Date</div>
                        <div>{event.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-purple-400" />
                      <div>
                        <div className="text-sm text-gray-400">Time</div>
                        <div>{event.time}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-purple-400" />
                      <div>
                        <div className="text-sm text-gray-400">Location</div>
                        <div>{event.location}</div>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <h3>About This Event</h3>
                    <p>{event.description}</p>

                    <h3>What You&apos;ll Experience</h3>
                    <ul>
                      {event.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-1">
              <FadeIn delay={0.2}>
                <div className="sticky top-8 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6">
                  <h3 className="text-xl font-bold mb-4">Book Your Ticket</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price</span>
                      <span className="font-bold">${event.price}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Available Seats</span>
                      <span className="font-bold">{event.availableSeats}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-300">
                        Available
                      </span>
                    </div>
                  </div>

                  <Link href={`/events/${event.id}/booking`}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      Book Now
                    </Button>
                  </Link>

                  <div className="mt-4">
                    <Button variant="outline" className="w-full border-gray-700 text-gray-300">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Event
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <h4 className="font-medium mb-3">Event Organizer</h4>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mr-3">
                        {event.organizer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{event.organizer.name}</div>
                        <div className="text-sm text-gray-400">{event.organizer.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
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
    time: "9:00 AM - 6:00 PM",
    location: "Moscone Center, San Francisco, CA",
    price: 299,
    availableSeats: 245,
    image: "/placeholder.svg?height=500&width=1000",
    description:
      "Join us for the biggest tech conference of the year. Connect with industry leaders, discover the latest innovations, and expand your network in the heart of Silicon Valley.",
    highlights: [
      "Keynote speeches from tech industry leaders",
      "Hands-on workshops and technical sessions",
      "Networking opportunities with professionals",
      "Product demonstrations and exhibitions",
      "Career fair with top tech companies",
    ],
    organizer: {
      name: "TechEvents Inc.",
      role: "Event Organizer",
    },
  },
  {
    id: "2",
    title: "Music Festival",
    category: "Entertainment",
    date: "June 10-12, 2025",
    time: "12:00 PM - 11:00 PM",
    location: "Zilker Park, Austin, TX",
    price: 199,
    availableSeats: 578,
    image: "/placeholder.svg?height=500&width=1000",
    description:
      "Experience three days of amazing live music across multiple stages featuring the hottest artists and emerging talent. Enjoy food vendors, art installations, and an unforgettable atmosphere.",
    highlights: [
      "Over 100 musical performances across 8 stages",
      "Diverse lineup spanning multiple genres",
      "Gourmet food and craft beverage options",
      "Interactive art installations",
      "VIP experiences available",
    ],
    organizer: {
      name: "SoundWave Productions",
      role: "Festival Promoter",
    },
  },
  {
    id: "3",
    title: "Design Summit",
    category: "Design",
    date: "July 5, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "Metropolitan Pavilion, New York, NY",
    price: 149,
    availableSeats: 120,
    image: "/placeholder.svg?height=500&width=1000",
    description:
      "A one-day intensive summit for designers and creative professionals. Learn from industry experts, participate in workshops, and connect with fellow designers.",
    highlights: [
      "Talks from leading designers and creative directors",
      "Interactive design workshops",
      "Portfolio reviews with industry professionals",
      "Design tool demonstrations",
      "Networking reception",
    ],
    organizer: {
      name: "Creative Collective",
      role: "Design Community",
    },
  },
]

