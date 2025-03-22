"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Calendar, Check, CreditCard, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GridBackground } from "@/components/grid-background"
import { FadeIn } from "@/components/animations/fade-in"

// Define event type
type Event = {
  id: string
  title: string
  category: string
  date: string
  time: string
  location: string
  price: number
  availableSeats: number
  image: string
}

// Define ticket type
type TicketType = "standard" | "vip" | "early"

// Define booking state
type BookingState = {
  ticketType: TicketType
  ticketCount: number
  selectedSeats: string[]
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  additionalAttendees: Array<{
    firstName: string
    lastName: string
    email: string
  }>
  paymentInfo: {
    cardNumber: string
    expiryDate: string
    cvc: string
    nameOnCard: string
    billingAddress: string
    city: string
    zip: string
  }
}

// Booking steps
const steps = [
  { id: "tickets", label: "Select Tickets" },
  { id: "seats", label: "Choose Seats" },
  { id: "details", label: "Your Details" },
  { id: "payment", label: "Payment" },
  { id: "confirmation", label: "Confirmation" },
]

// Sample event data (in a real app, this would come from an API)
const events: Record<string, Event> = {
  "1": {
    id: "1",
    title: "Tech Conference 2025",
    category: "Technology",
    date: "May 15-17, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Moscone Center, San Francisco, CA",
    price: 299,
    availableSeats: 245,
    image: "/placeholder.svg?height=300&width=600",
  },
  "2": {
    id: "2",
    title: "Music Festival",
    category: "Entertainment",
    date: "June 10-12, 2025",
    time: "12:00 PM - 11:00 PM",
    location: "Zilker Park, Austin, TX",
    price: 199,
    availableSeats: 578,
    image: "/placeholder.svg?height=300&width=600",
  },
  "3": {
    id: "3",
    title: "Design Summit",
    category: "Design",
    date: "July 5, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "Metropolitan Pavilion, New York, NY",
    price: 149,
    availableSeats: 120,
    image: "/placeholder.svg?height=300&width=600",
  },
}

export default function BookingPage() {
  const router = useRouter()
  const pathname = usePathname()

  // Extract event ID from pathname
  const eventId = pathname.split("/")[2]

  // Initialize state
  const [currentStep, setCurrentStep] = useState(0)
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [bookingState, setBookingState] = useState<BookingState>({
    ticketType: "standard",
    ticketCount: 1,
    selectedSeats: [],
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    additionalAttendees: [],
    paymentInfo: {
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      nameOnCard: "",
      billingAddress: "",
      city: "",
      zip: "",
    },
  })

  // Fetch event data
  useEffect(() => {
    // Simulate API call
    const fetchEvent = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/events/${eventId}`)
        // const data = await response.json()

        // Using our mock data
        const data = events[eventId]

        if (data) {
          setEvent(data)

          // Initialize additional attendees array based on ticket count
          if (bookingState.ticketCount > 1) {
            setBookingState((prev) => ({
              ...prev,
              additionalAttendees: Array(bookingState.ticketCount - 1).fill({
                firstName: "",
                lastName: "",
                email: "",
              }),
            }))
          }
        } else {
          // Handle event not found
          router.push("/events")
        }
      } catch (error) {
        console.error("Error fetching event:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [eventId, router, bookingState.ticketCount])

  // Handle ticket type change
  const handleTicketTypeChange = (value: string) => {
    setBookingState((prev) => ({
      ...prev,
      ticketType: value as TicketType,
    }))
  }

  // Handle ticket count change
  const handleTicketCountChange = (increment: boolean) => {
    const newCount = increment ? Math.min(10, bookingState.ticketCount + 1) : Math.max(1, bookingState.ticketCount - 1)

    setBookingState((prev) => {
      // Adjust selected seats if reducing tickets
      const selectedSeats = prev.selectedSeats.slice(0, newCount)

      // Adjust additional attendees
      const additionalAttendees = Array(Math.max(0, newCount - 1))
        .fill(0)
        .map((_, i) => {
          return (
            prev.additionalAttendees[i] || {
              firstName: "",
              lastName: "",
              email: "",
            }
          )
        })

      return {
        ...prev,
        ticketCount: newCount,
        selectedSeats,
        additionalAttendees,
      }
    })
  }

  // Handle seat selection
  const handleSeatSelection = (seatId: string) => {
    setBookingState((prev) => {
      if (prev.selectedSeats.includes(seatId)) {
        // Remove seat if already selected
        return {
          ...prev,
          selectedSeats: prev.selectedSeats.filter((id) => id !== seatId),
        }
      } else if (prev.selectedSeats.length < prev.ticketCount) {
        // Add seat if not at max
        return {
          ...prev,
          selectedSeats: [...prev.selectedSeats, seatId],
        }
      }
      return prev
    })
  }

  // Handle personal info change
  const handlePersonalInfoChange = (field: keyof BookingState["personalInfo"], value: string) => {
    setBookingState((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }))
  }

  // Handle additional attendee info change
  const handleAttendeeInfoChange = (index: number, field: string, value: string) => {
    setBookingState((prev) => {
      const newAttendees = [...prev.additionalAttendees]
      newAttendees[index] = {
        ...newAttendees[index],
        [field]: value,
      }
      return {
        ...prev,
        additionalAttendees: newAttendees,
      }
    })
  }

  // Handle payment info change
  const handlePaymentInfoChange = (field: keyof BookingState["paymentInfo"], value: string) => {
    setBookingState((prev) => ({
      ...prev,
      paymentInfo: {
        ...prev.paymentInfo,
        [field]: value,
      },
    }))
  }

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // Calculate ticket price based on type
  const getTicketPrice = () => {
    if (!event) return 0

    switch (bookingState.ticketType) {
      case "vip":
        return event.price * 1.5
      case "early":
        return event.price * 0.8
      default:
        return event.price
    }
  }

  // Calculate subtotal
  const getSubtotal = () => {
    return getTicketPrice() * bookingState.ticketCount
  }

  // Calculate service fee
  const getServiceFee = () => {
    return getSubtotal() * 0.1
  }

  // Calculate total
  const getTotal = () => {
    return getSubtotal() + getServiceFee()
  }

  // Format seat label
  const formatSeatLabel = (seatId: string) => {
    const index = Number.parseInt(seatId.split("-")[1])
    return `${String.fromCharCode(65 + Math.floor(index / 10))}${(index % 10) + 1}`
  }

  // Check if current step is valid
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0: // Tickets
        return bookingState.ticketCount > 0
      case 1: // Seats
        return bookingState.selectedSeats.length === bookingState.ticketCount
      case 2: // Details
        const { firstName, lastName, email, phone } = bookingState.personalInfo
        const personalInfoValid = firstName && lastName && email && phone

        // Check additional attendees if any
        const attendeesValid = bookingState.additionalAttendees.every(
          (attendee) => attendee.firstName && attendee.lastName && attendee.email,
        )

        return personalInfoValid && attendeesValid
      case 3: // Payment
        const { cardNumber, expiryDate, cvc, nameOnCard, billingAddress, city, zip } = bookingState.paymentInfo
        return cardNumber && expiryDate && cvc && nameOnCard && billingAddress && city && zip
      default:
        return true
    }
  }

  // Handle booking submission
  const handleSubmitBooking = () => {
    // In a real app, this would submit the booking to an API
    // For now, just move to confirmation step
    nextStep()
  }

  // Show loading state if event data is loading
  if (isLoading || !event) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-black text-white">
        <GridBackground />
        <div className="relative z-10 flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <GridBackground />

      <main className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <FadeIn>
            <div className="flex items-center mb-8">
              <Link href={`/events/${eventId}`}>
                <Button variant="ghost" size="icon" className="mr-4 text-gray-400 hover:text-white">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Book Tickets</h1>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">{event.title}</h2>
                <div className="px-3 py-1 text-sm font-medium rounded-full bg-purple-500/20 text-purple-300">
                  {event.category}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-white">{event.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-white">{event.location}</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FadeIn delay={0.2}>
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex justify-between">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                            index < currentStep
                              ? "bg-green-500 text-white"
                              : index === currentStep
                                ? "bg-purple-600 text-white"
                                : "bg-gray-800 text-gray-400"
                          }`}
                        >
                          {index < currentStep ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
                        </div>
                        <span
                          className={`text-xs ${index === currentStep ? "text-white font-medium" : "text-gray-400"}`}
                        >
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="relative mt-3">
                    <div className="absolute top-0 left-4 right-4 h-1 bg-gray-800" />
                    <motion.div
                      className="absolute top-0 left-4 h-1 bg-purple-600"
                      initial={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                      animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Step Content */}
                <Card className="bg-gray-900/70 backdrop-blur-sm border-gray-800">
                  <CardContent className="p-6">
                    {/* Step 1: Select Tickets */}
                    {currentStep === 0 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Select Tickets</h3>

                        <div className="space-y-4">
                          <RadioGroup value={bookingState.ticketType} onValueChange={handleTicketTypeChange}>
                            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-colors">
                              <div className="flex items-start space-x-3">
                                <RadioGroupItem value="standard" id="standard" />
                                <div>
                                  <Label htmlFor="standard" className="text-base font-medium text-white">
                                    Standard Ticket
                                  </Label>
                                  <p className="text-sm text-gray-400">
                                    General admission with access to all main sessions
                                  </p>
                                </div>
                              </div>
                              <div className="font-bold text-white">${event.price}</div>
                            </div>

                            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-colors">
                              <div className="flex items-start space-x-3">
                                <RadioGroupItem value="vip" id="vip" />
                                <div>
                                  <Label htmlFor="vip" className="text-base font-medium text-white">
                                    VIP Ticket
                                  </Label>
                                  <p className="text-sm text-gray-400">
                                    Premium access with exclusive networking events
                                  </p>
                                </div>
                              </div>
                              <div className="font-bold text-white">${event.price * 1.5}</div>
                            </div>

                            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-colors">
                              <div className="flex items-start space-x-3">
                                <RadioGroupItem value="early" id="early" />
                                <div>
                                  <Label htmlFor="early" className="text-base font-medium text-white">
                                    Early Bird
                                  </Label>
                                  <p className="text-sm text-gray-400">Limited availability at a discounted rate</p>
                                </div>
                              </div>
                              <div className="font-bold text-white">${event.price * 0.8}</div>
                            </div>
                          </RadioGroup>

                          <div className="pt-4">
                            <Label htmlFor="ticket-count" className="block mb-2">
                              Number of Tickets
                            </Label>
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="border-gray-700 text-white hover:text-white"
                                onClick={() => handleTicketCountChange(false)}
                              >
                                -
                              </Button>
                              <div className="w-16 text-center font-bold text-white">{bookingState.ticketCount}</div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="border-gray-700 text-white hover:text-white"
                                onClick={() => handleTicketCountChange(true)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Choose Seats */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Choose Your Seats</h3>
                        <p className="text-gray-400">
                          Select {bookingState.ticketCount} seat{bookingState.ticketCount !== 1 ? "s" : ""} from the
                          available options below.
                        </p>

                        <div className="mt-6">
                          <div className="mb-6 text-center">
                            <div className="w-3/4 h-10 mx-auto bg-purple-500/20 rounded-t-xl flex items-center justify-center text-purple-300 text-sm">
                              STAGE
                            </div>
                          </div>

                          <div className="grid grid-cols-10 gap-2 mb-8">
                            {Array.from({ length: 100 }).map((_, index) => {
                              const seatId = `seat-${index}`
                              const isSelected = bookingState.selectedSeats.includes(seatId)
                              // Use a deterministic approach for available seats based on index
                              const isAvailable = index % 7 !== 0 && index % 13 !== 0

                              return (
                                <button
                                  key={seatId}
                                  className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-colors shadow-sm ${
                                    isSelected
                                      ? "bg-purple-600 text-white"
                                      : isAvailable
                                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                        : "bg-gray-900 text-gray-600 cursor-not-allowed"
                                  }`}
                                  onClick={() => isAvailable && handleSeatSelection(seatId)}
                                  disabled={
                                    !isAvailable ||
                                    (bookingState.selectedSeats.length >= bookingState.ticketCount && !isSelected)
                                  }
                                >
                                  {String.fromCharCode(65 + Math.floor(index / 10))}
                                  {(index % 10) + 1}
                                </button>
                              )
                            })}
                          </div>

                          <div className="flex justify-center gap-6 text-sm">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-sm bg-gray-800 mr-2"></div>
                              <span className="text-white">Available</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-sm bg-purple-600 mr-2"></div>
                              <span className="text-white">Selected</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-sm bg-gray-900 mr-2"></div>
                              <span className="text-white">Unavailable</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-800">
                          <div className="text-sm text-gray-400 mb-2">Selected Seats:</div>
                          {bookingState.selectedSeats.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {bookingState.selectedSeats.map((seatId) => (
                                <div
                                  key={seatId}
                                  className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm"
                                >
                                  {formatSeatLabel(seatId)}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-gray-500">No seats selected</div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 3: Your Details */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Your Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input
                              id="first-name"
                              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                              value={bookingState.personalInfo.firstName}
                              onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input
                              id="last-name"
                              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                              value={bookingState.personalInfo.lastName}
                              onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                              value={bookingState.personalInfo.email}
                              onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                              value={bookingState.personalInfo.phone}
                              onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                            />
                          </div>
                        </div>

                        {bookingState.ticketCount > 1 && (
                          <div className="pt-6 border-t border-gray-800">
                            <h4 className="font-medium mb-4">Additional Attendees</h4>

                            {bookingState.additionalAttendees.map((attendee, index) => (
                              <div key={index} className="mb-6 p-4 border border-gray-800 rounded-lg">
                                <h5 className="font-medium mb-4">Attendee {index + 2}</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                    <Label htmlFor={`attendee-${index}-first-name`}>First Name</Label>
                                    <Input
                                      id={`attendee-${index}-first-name`}
                                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                                      value={attendee.firstName}
                                      onChange={(e) => handleAttendeeInfoChange(index, "firstName", e.target.value)}
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor={`attendee-${index}-last-name`}>Last Name</Label>
                                    <Input
                                      id={`attendee-${index}-last-name`}
                                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                                      value={attendee.lastName}
                                      onChange={(e) => handleAttendeeInfoChange(index, "lastName", e.target.value)}
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor={`attendee-${index}-email`}>Email Address</Label>
                                    <Input
                                      id={`attendee-${index}-email`}
                                      type="email"
                                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                                      value={attendee.email}
                                      onChange={(e) => handleAttendeeInfoChange(index, "email", e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 4: Payment */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Payment Information</h3>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <div className="relative">
                              <Input
                                id="card-number"
                                placeholder="1234 5678 9012 3456"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 pl-10"
                                value={bookingState.paymentInfo.cardNumber}
                                onChange={(e) => handlePaymentInfoChange("cardNumber", e.target.value)}
                              />
                              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input
                                id="expiry"
                                placeholder="MM/YY"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                                value={bookingState.paymentInfo.expiryDate}
                                onChange={(e) => handlePaymentInfoChange("expiryDate", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input
                                id="cvc"
                                placeholder="123"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                                value={bookingState.paymentInfo.cvc}
                                onChange={(e) => handlePaymentInfoChange("cvc", e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="name-on-card">Name on Card</Label>
                            <Input
                              id="name-on-card"
                              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                              value={bookingState.paymentInfo.nameOnCard}
                              onChange={(e) => handlePaymentInfoChange("nameOnCard", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="billing-address">Billing Address</Label>
                            <Input
                              id="billing-address"
                              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                              value={bookingState.paymentInfo.billingAddress}
                              onChange={(e) => handlePaymentInfoChange("billingAddress", e.target.value)}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                                value={bookingState.paymentInfo.city}
                                onChange={(e) => handlePaymentInfoChange("city", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="zip">ZIP / Postal Code</Label>
                              <Input
                                id="zip"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                                value={bookingState.paymentInfo.zip}
                                onChange={(e) => handlePaymentInfoChange("zip", e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 5: Confirmation */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4">
                            <Check className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">Booking Confirmed!</h3>
                          <p className="text-gray-400 mt-2">Your tickets have been booked successfully.</p>
                        </div>

                        <div className="mt-8 p-6 border border-gray-800 rounded-lg">
                          <h4 className="font-medium mb-4">Booking Details</h4>

                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-gray-400 text-opacity-90">Event</span>
                              <span className="font-medium text-white">{event.title}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-400 text-opacity-90">Date</span>
                              <span className="text-white">{event.date}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-400 text-opacity-90">Time</span>
                              <span className="text-white">{event.time}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-400 text-opacity-90">Location</span>
                              <span className="text-white">{event.location}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-400 text-opacity-90">Tickets</span>
                              <span className="text-white">
                                {bookingState.ticketCount} x{" "}
                                {bookingState.ticketType.charAt(0).toUpperCase() + bookingState.ticketType.slice(1)}
                              </span>
                            </div>

                            {bookingState.selectedSeats.length > 0 && (
                              <div className="flex justify-between">
                                <span className="text-gray-400 text-opacity-90">Seats</span>
                                <div className="flex flex-wrap justify-end gap-1">
                                  {bookingState.selectedSeats.map((seatId) => (
                                    <div
                                      key={seatId}
                                      className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs"
                                    >
                                      {formatSeatLabel(seatId)}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="pt-4 border-t border-gray-800">
                              <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span className="text-white">${getTotal().toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 p-6 border border-gray-800 rounded-lg bg-gray-900/50">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Your QR Code</h4>
                            <Button variant="outline" size="sm" className="border-gray-700 text-white hover:text-white">
                              Download
                            </Button>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="w-48 h-48 bg-white p-2 rounded-lg mb-4">
                              <div className="w-full h-full bg-[url('/placeholder.svg?height=200&width=200')] bg-no-repeat bg-center bg-contain" />
                            </div>
                            <p className="text-sm text-gray-400 text-center">
                              Present this QR code at the event entrance for check-in
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-center mt-8">
                          <Link href="/dashboard">
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium">
                              Go to My Tickets
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    {currentStep < 4 && (
                      <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          disabled={currentStep === 0}
                          className="border-gray-700 text-white hover:text-white"
                        >
                          Back
                        </Button>

                        <Button
                          onClick={currentStep === 3 ? handleSubmitBooking : nextStep}
                          disabled={!isCurrentStepValid()}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium"
                        >
                          {currentStep === 3 ? "Complete Booking" : "Continue"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </FadeIn>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <FadeIn delay={0.3}>
                <div className="sticky top-8 rounded-xl bg-gray-900/70 backdrop-blur-sm border border-gray-800 p-6">
                  <h3 className="text-xl font-bold mb-4">Order Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-opacity-90">Event</span>
                      <span className="font-medium text-white">{event.title}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400 text-opacity-90">Date</span>
                      <span className="text-white">{event.date}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400 text-opacity-90">Tickets</span>
                      <span className="text-white">
                        {bookingState.ticketCount} x{" "}
                        {bookingState.ticketType.charAt(0).toUpperCase() + bookingState.ticketType.slice(1)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400 text-opacity-90">Price per Ticket</span>
                      <span className="text-white">${getTicketPrice().toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400 text-opacity-90">Subtotal</span>
                      <span className="text-white">${getSubtotal().toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400 text-opacity-90">Service Fee</span>
                      <span className="text-white">${getServiceFee().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-white">${getTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  {bookingState.selectedSeats.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-800">
                      <div className="text-sm text-gray-400 mb-2">Selected Seats:</div>
                      <div className="flex flex-wrap gap-2">
                        {bookingState.selectedSeats.map((seatId) => (
                          <div key={seatId} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                            {formatSeatLabel(seatId)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

