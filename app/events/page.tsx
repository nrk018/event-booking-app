"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Filter, MapPin, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GridBackground } from "@/components/grid-background"
import { FadeIn } from "@/components/animations/fade-in"

// Define event type
type Event = {
  id: string
  title: string
  category: string
  date: string
  location: string
  availableSeats: number
  featured: boolean
  image: string
}

// Define filter state
type FilterState = {
  search: string
  category: string
}

// Sample event data (in a real app, this would come from an API)
const eventsData: Event[] = [
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

// Available categories
const categories = [
  { value: "all", label: "All Categories" },
  { value: "technology", label: "Technology" },
  { value: "entertainment", label: "Entertainment" },
  { value: "business", label: "Business" },
  { value: "design", label: "Design" },
]

export default function EventsPage() {
  // State for filters
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
  })

  // State for events
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6

  // Fetch events (simulated)
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call with filters
        // const response = await fetch(`/api/events?search=${filters.search}&category=${filters.category}`)
        // const data = await response.json()

        // Simulate API call with filtering
        let filteredEvents = [...eventsData]

        // Apply search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase()
          filteredEvents = filteredEvents.filter(
            (event) =>
              event.title.toLowerCase().includes(searchLower) ||
              event.location.toLowerCase().includes(searchLower) ||
              event.category.toLowerCase().includes(searchLower),
          )
        }

        // Apply category filter
        if (filters.category && filters.category !== "all") {
          filteredEvents = filteredEvents.filter(
            (event) => event.category.toLowerCase() === filters.category.toLowerCase(),
          )
        }

        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        setEvents(filteredEvents)
      } catch (error) {
        console.error("Error fetching events:", error)
        setEvents([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [filters])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
    }))
    setCurrentPage(1) // Reset to first page on new search
  }

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      category: value,
    }))
    setCurrentPage(1) // Reset to first page on new category
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Calculate pagination
  const totalPages = Math.ceil(events.length / eventsPerPage)
  const paginatedEvents = events.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the beginning
      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, 4)
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 3)
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push("ellipsis-start")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("ellipsis-end")
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

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
                <Input
                  placeholder="Search events..."
                  className="pl-10 bg-gray-900/70 border-gray-800 text-white placeholder:text-gray-500"
                  value={filters.search}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="flex gap-4">
                <Select value={filters.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-[180px] bg-gray-900/70 border-gray-800 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" className="border-gray-800 text-white hover:text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </FadeIn>

          {isLoading ? (
            // Loading state
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="h-[400px] bg-gray-900/50 backdrop-blur-sm border-gray-800 animate-pulse">
                  <div className="aspect-video bg-gray-800"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-800 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded mb-3 w-1/2"></div>
                    <div className="h-4 bg-gray-800 rounded mb-3 w-2/3"></div>
                    <div className="h-4 bg-gray-800 rounded mb-6 w-1/2"></div>
                    <div className="h-10 bg-gray-800 rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : events.length === 0 ? (
            // No results state
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold mb-2">No events found</h2>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
              <Button
                variant="outline"
                className="border-gray-800 text-white hover:text-white"
                onClick={() => setFilters({ search: "", category: "all" })}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            // Results grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedEvents.map((event, index) => (
                <FadeIn key={event.id} delay={0.05 * index}>
                  <Link href={`/events/${event.id}`}>
                    <Card className="h-full overflow-hidden bg-gray-900/70 backdrop-blur-sm border-gray-800 hover:border-purple-500/50 transition-colors group">
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
                          <h3 className="text-xl font-bold text-white">{event.title}</h3>
                          <div className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-300">
                            {event.category}
                          </div>
                        </div>

                        <div className="space-y-3 text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-white">{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-white">{event.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-white">{event.availableSeats} seats available</span>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button
                            variant="outline"
                            className="w-full border-purple-500/30 text-purple-300 hover:text-purple-200 hover:bg-purple-500/20"
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
          )}

          {/* Pagination */}
          {!isLoading && events.length > 0 && (
            <FadeIn delay={0.3}>
              <div className="mt-12 flex justify-center">
                <div className="flex gap-2">
                  {getPageNumbers().map((page, index) =>
                    typeof page === "number" ? (
                      <Button
                        key={index}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        className={
                          currentPage === page
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "border-gray-800 text-white hover:text-white"
                        }
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    ) : (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        className="border-gray-800 text-white hover:text-white cursor-default"
                        disabled
                      >
                        ...
                      </Button>
                    ),
                  )}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </main>
    </div>
  )
}

