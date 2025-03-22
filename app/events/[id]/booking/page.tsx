"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Calendar, Check, CreditCard, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GridBackground } from "@/components/grid-background"
import { FadeIn } from "@/components/animations/fade-in"

// Booking steps
const steps = [
  { id: "tickets", label: "Select Tickets" },
  { id: "seats", label: "Choose Seats" },
  { id: "details", label: "Your Details" },
  { id: "payment", label: "Payment" },
  { id: "confirmation", label: "Confirmation" },
]

export default function BookingPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [ticketCount, setTicketCount] = useState(1)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  // In a real app, you would fetch the event data based on the ID
  const event = {
    id: params.id,
    title: "Tech Conference 2025",
    category: "Technology",
    date: "May 15-17, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Moscone Center, San Francisco, CA",
    price: 299,
    availableSeats: 245,
    image: "/placeholder.svg?height=300&width=600",
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSeatSelection = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId))
    } else {
      if (selectedSeats.length < ticketCount) {
        setSelectedSeats([...selectedSeats, seatId])
      }
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <GridBackground />

      <main className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <FadeIn>
            <div className="flex items-center mb-8">
              <Link href={`/events/${params.id}`}>
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
                <h2 className="text-xl font-bold">{event.title}</h2>
                <div className="px-3 py-1 text-sm font-medium rounded-full bg-purple-500/20 text-purple-300">
                  {event.category}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{event.location}</span>
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
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                  <CardContent className="p-6">
                    {currentStep === 0 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold">Select Tickets</h3>

                        <div className="space-y-4">
                          <RadioGroup defaultValue="standard">
                            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-colors">
                              <div className="flex items-start space-x-3">
                                <RadioGroupItem value="standard" id="standard" />
                                <div>
                                  <Label htmlFor="standard" className="text-base font-medium">
                                    Standard Ticket
                                  </Label>
                                  <p className="text-sm text-gray-400">
                                    General admission with access to all main sessions
                                  </p>
                                </div>
                              </div>
                              <div className="font-bold">${event.price}</div>
                            </div>

                            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-colors">
                              <div className="flex items-start space-x-3">
                                <RadioGroupItem value="vip" id="vip" />
                                <div>
                                  <Label htmlFor="vip" className="text-base font-medium">
                                    VIP Ticket
                                  </Label>
                                  <p className="text-sm text-gray-400">
                                    Premium access with exclusive networking events
                                  </p>
                                </div>
                              </div>
                              <div className="font-bold">${event.price * 1.5}</div>
                            </div>

                            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-colors">
                              <div className="flex items-start space-x-3">
                                <RadioGroupItem value="early" id="early" />
                                <div>
                                  <Label htmlFor="early" className="text-base font-medium">
                                    Early Bird
                                  </Label>
                                  <p className="text-sm text-gray-400">Limited availability at a discounted rate</p>
                                </div>
                              </div>
                              <div className="font-bold">${event.price * 0.8}</div>
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
                                className="border-gray-700 text-white"
                                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                              >
                                -
                              </Button>
                              <div className="w-16 text-center font-bold">{ticketCount}</div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="border-gray-700 text-white"
                                onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold">Choose Your Seats</h3>
                        <p className="text-gray-400">
                          Select {ticketCount} seat{ticketCount !== 1 ? "s" : ""} from the available options below.
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
                              const isSelected = selectedSeats.includes(seatId)
                              const isAvailable = Math.random() > 0.3 // Randomly mark some seats as unavailable

                              return (
                                <button
                                  key={seatId}
                                  className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-colors ${
                                    isSelected
                                      ? "bg-purple-600 text-white"
                                      : isAvailable
                                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                        : "bg-gray-900 text-gray-600 cursor-not-allowed"
                                  }`}
                                  onClick={() => isAvailable && handleSeatSelection(seatId)}
                                  disabled={!isAvailable || (selectedSeats.length >= ticketCount && !isSelected)}
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
                              <span>Available</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-sm bg-purple-600 mr-2"></div>
                              <span>Selected</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-sm bg-gray-900 mr-2"></div>
                              <span>Unavailable</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-800">
                          <div className="text-sm text-gray-400 mb-2">Selected Seats:</div>
                          {selectedSeats.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {selectedSeats.map((seatId) => {
                                const index = Number.parseInt(seatId.split("-")[1])
                                return (
                                  <div
                                    key={seatId}
                                    className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm"
                                  >
                                    {String.fromCharCode(65 + Math.floor(index / 10))}
                                    {(index % 10) + 1}
                                  </div>
                                )
                              })}
                            </div>
                          ) : (
                            <div className="text-gray-500">No seats selected</div>
                          )}
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold">Your Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" className="bg-gray-800 border-gray-700 text-white" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" className="bg-gray-800 border-gray-700 text-white" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" className="bg-gray-800 border-gray-700 text-white" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" className="bg-gray-800 border-gray-700 text-white" />
                          </div>
                        </div>

                        {ticketCount > 1 && (
                          <div className="pt-6 border-t border-gray-800">
                            <h4 className="font-medium mb-4">Additional Attendees</h4>

                            {Array.from({ length: ticketCount - 1 }).map((_, index) => (
                              <div key={index} className="mb-6 p-4 border border-gray-800 rounded-lg">
                                <h5 className="font-medium mb-4">Attendee {index + 2}</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                    <Label htmlFor={`attendee-${index}-first-name`}>First Name</Label>
                                    <Input
                                      id={`attendee-${index}-first-name`}
                                      className="bg-gray-800 border-gray-700 text-white"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor={`attendee-${index}-last-name`}>Last Name</Label>
                                    <Input
                                      id={`attendee-${index}-last-name`}
                                      className="bg-gray-800 border-gray-700 text-white"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor={`attendee-${index}-email`}>Email Address</Label>
                                    <Input
                                      id={`attendee-${index}-email`}
                                      type="email"
                                      className="bg-gray-800 border-gray-700 text-white"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold">Payment Information</h3>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <div className="relative">
                              <Input
                                id="card-number"
                                placeholder="1234 5678 9012 3456"
                                className="bg-gray-800 border-gray-700 text-white pl-10"
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
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" className="bg-gray-800 border-gray-700 text-white" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="name-on-card">Name on Card</Label>
                            <Input id="name-on-card" className="bg-gray-800 border-gray-700 text-white" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="billing-address">Billing Address</Label>
                            <Input id="billing-address" className="bg-gray-800 border-gray-700 text-white" />
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input id="city" className="bg-gray-800 border-gray-700 text-white" />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="zip">ZIP / Postal Code</Label>
                              <Input id="zip" className="bg-gray-800 border-gray-700 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4">
                            <Check className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold">Booking Confirmed!</h3>
                          <p className="text-gray-400 mt-2">Your tickets have been booked successfully.</p>
                        </div>

                        <div className="mt-8 p-6 border border-gray-800 rounded-lg">
                          <h4 className="font-medium mb-4">Booking Details</h4>

                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Event</span>
                              <span className="font-medium">{event.title}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-400">Date</span>
                              <span>{event.date}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-400">Time</span>
                              <span>{event.time}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-400">Location</span>
                              <span>{event.location}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-400">Tickets</span>
                              <span>{ticketCount} x Standard</span>
                            </div>

                            {selectedSeats.length > 0 && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Seats</span>
                                <div className="flex flex-wrap justify-end gap-1">
                                  {selectedSeats.map((seatId) => {
                                    const index = Number.parseInt(seatId.split("-")[1])
                                    return (
                                      <div
                                        key={seatId}
                                        className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs"
                                      >
                                        {String.fromCharCode(65 + Math.floor(index / 10))}
                                        {(index % 10) + 1}
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            )}

                            <div className="pt-4 border-t border-gray-800">
                              <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>${event.price * ticketCount}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 p-6 border border-gray-800 rounded-lg bg-gray-900/50">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Your QR Code</h4>
                            <Button variant="outline" size="sm" className="border-gray-700 text-white">
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
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                              Go to My Tickets
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}

                    {currentStep < 4 && (
                      <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          disabled={currentStep === 0}
                          className="border-gray-700 text-white"
                        >
                          Back
                        </Button>

                        <Button
                          onClick={nextStep}
                          disabled={currentStep === 1 && selectedSeats.length < ticketCount}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
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

            <div className="lg:col-span-1">
              <FadeIn delay={0.3}>
                <div className="sticky top-8 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6">
                  <h3 className="text-xl font-bold mb-4">Order Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Event</span>
                      <span className="font-medium">{event.title}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Date</span>
                      <span>{event.date}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Tickets</span>
                      <span>{ticketCount} x Standard</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Price per Ticket</span>
                      <span>${event.price}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>${event.price * ticketCount}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Service Fee</span>
                      <span>${(event.price * ticketCount * 0.1).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${(event.price * ticketCount * 1.1).toFixed(2)}</span>
                    </div>
                  </div>

                  {selectedSeats.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-800">
                      <div className="text-sm text-gray-400 mb-2">Selected Seats:</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedSeats.map((seatId) => {
                          const index = Number.parseInt(seatId.split("-")[1])
                          return (
                            <div key={seatId} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                              {String.fromCharCode(65 + Math.floor(index / 10))}
                              {(index % 10) + 1}
                            </div>
                          )
                        })}
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

