import Link from "next/link"
import { ArrowLeft, Check, Clock, Download, Filter, Search, Settings, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GridBackground } from "@/components/grid-background"
import { FadeIn } from "@/components/animations/fade-in"

export default function AdminDashboardPage() {
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
              <h1 className="text-3xl font-bold">Event Management</h1>
              <Button variant="ghost" size="icon" className="ml-auto text-gray-400 hover:text-white">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <FadeIn delay={0.1}>
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Check-ins</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,248 / 2,500</div>
                  <p className="text-sm text-gray-400 mt-1">49.9% of total capacity</p>
                  <div className="w-full h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                      style={{ width: "49.9%" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Current Check-in Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    124 <span className="text-green-500 text-lg">↑</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Per hour (last hour: 98)</p>
                  <div className="w-full h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Available Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">352</div>
                  <p className="text-sm text-gray-400 mt-1">14.1% of total capacity</p>
                  <div className="w-full h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                      style={{ width: "14.1%" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <Tabs defaultValue="checkins" className="mb-8">
              <TabsList className="bg-gray-900/50 border border-gray-800">
                <TabsTrigger value="checkins">Check-ins</TabsTrigger>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
                <TabsTrigger value="gates">Gates</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="checkins" className="mt-6">
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <CardTitle>Real-time Check-ins</CardTitle>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            placeholder="Search attendees..."
                            className="pl-10 bg-gray-800 border-gray-700 text-white w-full sm:w-[250px]"
                          />
                        </div>

                        <Button variant="outline" className="border-gray-700 text-white">
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border border-gray-800 overflow-hidden">
                      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-800/50 text-gray-400 text-sm font-medium">
                        <div className="col-span-5 md:col-span-3">Attendee</div>
                        <div className="col-span-3 hidden md:block">Ticket Type</div>
                        <div className="col-span-3 md:col-span-2">Gate</div>
                        <div className="col-span-4 md:col-span-2">Time</div>
                        <div className="col-span-2">Status</div>
                      </div>

                      {checkIns.map((checkIn, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-12 gap-4 p-4 border-t border-gray-800 hover:bg-gray-800/20 transition-colors"
                        >
                          <div className="col-span-5 md:col-span-3 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mr-3">
                              {checkIn.name.charAt(0)}
                            </div>
                            <div className="truncate">
                              <div className="font-medium">{checkIn.name}</div>
                              <div className="text-xs text-gray-400">{checkIn.email}</div>
                            </div>
                          </div>

                          <div className="col-span-3 hidden md:flex items-center">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                checkIn.ticketType === "VIP"
                                  ? "bg-purple-500/20 text-purple-300"
                                  : checkIn.ticketType === "Early Bird"
                                    ? "bg-blue-500/20 text-blue-300"
                                    : "bg-gray-500/20 text-gray-300"
                              }`}
                            >
                              {checkIn.ticketType}
                            </span>
                          </div>

                          <div className="col-span-3 md:col-span-2 flex items-center">
                            <div className="text-sm">Gate {checkIn.gate}</div>
                          </div>

                          <div className="col-span-4 md:col-span-2 flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <div className="text-sm">{checkIn.time}</div>
                          </div>

                          <div className="col-span-2 flex items-center">
                            {checkIn.status === "Checked In" ? (
                              <div className="flex items-center text-green-500">
                                <Check className="h-4 w-4 mr-1" />
                                <span className="text-xs hidden sm:inline">Checked In</span>
                              </div>
                            ) : checkIn.status === "Denied" ? (
                              <div className="flex items-center text-red-500">
                                <X className="h-4 w-4 mr-1" />
                                <span className="text-xs hidden sm:inline">Denied</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-yellow-500">
                                <Clock className="h-4 w-4 mr-1" />
                                <span className="text-xs hidden sm:inline">Pending</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                      <div>Showing 1-10 of 1,248 check-ins</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 border-gray-700 text-white">
                          Previous
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 border-gray-700 text-white">
                          Next
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tickets" className="mt-6">
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <CardTitle>Ticket Management</CardTitle>

                      <div className="flex gap-4">
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                          Release More Tickets
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {ticketTypes.map((ticket, index) => (
                        <Card key={index} className="bg-gray-800/50 border-gray-700">
                          <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                              <span>{ticket.name}</span>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  ticket.status === "On Sale"
                                    ? "bg-green-500/20 text-green-300"
                                    : ticket.status === "Limited"
                                      ? "bg-yellow-500/20 text-yellow-300"
                                      : "bg-red-500/20 text-red-300"
                                }`}
                              >
                                {ticket.status}
                              </span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Price</span>
                                <span className="font-bold">${ticket.price}</span>
                              </div>

                              <div className="flex justify-between">
                                <span className="text-gray-400">Sold</span>
                                <span>
                                  {ticket.sold} / {ticket.total}
                                </span>
                              </div>

                              <div className="flex justify-between">
                                <span className="text-gray-400">Available</span>
                                <span>{ticket.total - ticket.sold}</span>
                              </div>

                              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                                  style={{ width: `${(ticket.sold / ticket.total) * 100}%` }}
                                />
                              </div>

                              <div className="pt-4 flex gap-2">
                                <Button variant="outline" className="flex-1 border-gray-700 text-white">
                                  Edit
                                </Button>
                                <Button variant="outline" className="flex-1 border-gray-700 text-white">
                                  Manage
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="rounded-lg border border-gray-800 overflow-hidden mt-8">
                      <div className="p-4 bg-gray-800/50">
                        <h3 className="font-medium">Dynamic Pricing Settings</h3>
                      </div>

                      <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Automatic Price Adjustments</h4>
                            <p className="text-sm text-gray-400 mt-1">Adjust prices based on demand and availability</p>
                          </div>
                          <div className="w-12 h-6 rounded-full bg-purple-600 relative">
                            <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Last-Minute Discounts</h4>
                            <p className="text-sm text-gray-400 mt-1">
                              Offer discounts for unsold tickets close to event date
                            </p>
                          </div>
                          <div className="w-12 h-6 rounded-full bg-gray-700 relative">
                            <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Waitlist Auto-Release</h4>
                            <p className="text-sm text-gray-400 mt-1">
                              Automatically release tickets to waitlist when available
                            </p>
                          </div>
                          <div className="w-12 h-6 rounded-full bg-purple-600 relative">
                            <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gates" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                      <CardHeader>
                        <CardTitle>Gate Status & Management</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {gates.map((gate, index) => (
                            <div
                              key={index}
                              className="p-4 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-colors"
                            >
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                  <div className="flex items-center">
                                    <h3 className="text-lg font-bold">Gate {gate.number}</h3>
                                    <div
                                      className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${
                                        gate.status === "Open"
                                          ? "bg-green-500/20 text-green-300"
                                          : gate.status === "Limited"
                                            ? "bg-yellow-500/20 text-yellow-300"
                                            : "bg-red-500/20 text-red-300"
                                      }`}
                                    >
                                      {gate.status}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-400 mt-1">{gate.location}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold">{gate.currentRate}</div>
                                    <div className="text-xs text-gray-400">per hour</div>
                                  </div>

                                  <div className="text-center">
                                    <div className="text-2xl font-bold">{gate.totalCheckins}</div>
                                    <div className="text-xs text-gray-400">total</div>
                                  </div>

                                  <Button variant="outline" className="border-gray-700 text-white">
                                    Manage
                                  </Button>
                                </div>
                              </div>

                              <div className="mt-4 pt-4 border-t border-gray-800">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center">
                                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                                      <span className="text-sm text-gray-400">Staff: {gate.staffCount}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                      <span className="text-sm text-gray-400">Wait time: {gate.waitTime}</span>
                                    </div>
                                  </div>

                                  <div>
                                    <Button variant="outline" size="sm" className="border-gray-700 text-white">
                                      {gate.status === "Open" ? "Close Gate" : "Open Gate"}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                      <CardHeader>
                        <CardTitle>Entry Heatmap</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-square bg-gray-800 rounded-lg p-4 relative">
                          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] bg-no-repeat bg-center bg-contain opacity-70" />

                          {/* Heatmap overlay would be here in a real implementation */}
                          <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-red-500/40 blur-xl"></div>
                          <div className="absolute top-1/3 left-1/2 w-24 h-24 rounded-full bg-red-500/60 blur-xl"></div>
                          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full bg-yellow-500/40 blur-xl"></div>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold">Gate 2</div>
                              <div className="text-sm text-gray-400">Highest traffic</div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500/60 mr-2"></div>
                            <span>Low</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-yellow-500/60 mr-2"></div>
                            <span>Medium</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500/60 mr-2"></div>
                            <span>High</span>
                          </div>
                        </div>

                        <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                          View Detailed Analytics
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <CardTitle>Event Analytics</CardTitle>

                      <div className="flex gap-4">
                        <Button variant="outline" className="border-gray-700 text-white">
                          <Download className="h-4 w-4 mr-2" />
                          Export Report
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="aspect-[4/3] bg-gray-800 rounded-lg p-4 relative">
                        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=400')] bg-no-repeat bg-center bg-contain opacity-70" />
                        <div className="absolute inset-0 p-4">
                          <h3 className="font-medium mb-2">Check-in Rate Over Time</h3>
                        </div>
                      </div>

                      <div className="aspect-[4/3] bg-gray-800 rounded-lg p-4 relative">
                        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=400')] bg-no-repeat bg-center bg-contain opacity-70" />
                        <div className="absolute inset-0 p-4">
                          <h3 className="font-medium mb-2">Ticket Sales by Type</h3>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-800 overflow-hidden">
                      <div className="p-4 bg-gray-800/50">
                        <h3 className="font-medium">Key Metrics</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium text-gray-400">Check-in Conversion</h4>
                          <div className="text-3xl font-bold">78.4%</div>
                          <p className="text-sm text-green-500">+5.2% from last event</p>
                          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "78.4%" }} />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-sm font-medium text-gray-400">Average Check-in Time</h4>
                          <div className="text-3xl font-bold">2.4 min</div>
                          <p className="text-sm text-red-500">+0.3 min from last event</p>
                          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: "60%" }} />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-sm font-medium text-gray-400">No-show Rate</h4>
                          <div className="text-3xl font-bold">12.6%</div>
                          <p className="text-sm text-green-500">-2.1% from last event</p>
                          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: "12.6%" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </main>
    </div>
  )
}

// Sample data
const checkIns = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    ticketType: "Standard",
    gate: "1",
    time: "9:15 AM",
    status: "Checked In",
  },
  {
    name: "Emily Johnson",
    email: "emily.j@example.com",
    ticketType: "VIP",
    gate: "2",
    time: "9:18 AM",
    status: "Checked In",
  },
  {
    name: "Michael Brown",
    email: "michael.b@example.com",
    ticketType: "Standard",
    gate: "1",
    time: "9:22 AM",
    status: "Checked In",
  },
  {
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    ticketType: "Early Bird",
    gate: "3",
    time: "9:25 AM",
    status: "Denied",
  },
  {
    name: "David Lee",
    email: "david.l@example.com",
    ticketType: "VIP",
    gate: "2",
    time: "9:30 AM",
    status: "Checked In",
  },
  {
    name: "Jessica Taylor",
    email: "jessica.t@example.com",
    ticketType: "Standard",
    gate: "1",
    time: "9:32 AM",
    status: "Pending",
  },
  {
    name: "Robert Martinez",
    email: "robert.m@example.com",
    ticketType: "Standard",
    gate: "3",
    time: "9:35 AM",
    status: "Checked In",
  },
  {
    name: "Jennifer Garcia",
    email: "jennifer.g@example.com",
    ticketType: "Early Bird",
    gate: "1",
    time: "9:38 AM",
    status: "Checked In",
  },
  {
    name: "Thomas Anderson",
    email: "thomas.a@example.com",
    ticketType: "VIP",
    gate: "2",
    time: "9:42 AM",
    status: "Checked In",
  },
  {
    name: "Lisa Rodriguez",
    email: "lisa.r@example.com",
    ticketType: "Standard",
    gate: "3",
    time: "9:45 AM",
    status: "Denied",
  },
]

const ticketTypes = [
  {
    name: "Standard",
    price: 299,
    sold: 1200,
    total: 1500,
    status: "On Sale",
  },
  {
    name: "VIP",
    price: 499,
    sold: 380,
    total: 400,
    status: "Limited",
  },
  {
    name: "Early Bird",
    price: 199,
    sold: 600,
    total: 600,
    status: "Sold Out",
  },
]

const gates = [
  {
    number: 1,
    location: "Main Entrance (North)",
    status: "Open",
    currentRate: 45,
    totalCheckins: 524,
    staffCount: 5,
    waitTime: "< 5 min",
  },
  {
    number: 2,
    location: "VIP Entrance (East)",
    status: "Open",
    currentRate: 32,
    totalCheckins: 312,
    staffCount: 3,
    waitTime: "< 2 min",
  },
  {
    number: 3,
    location: "Side Entrance (West)",
    status: "Limited",
    currentRate: 28,
    totalCheckins: 412,
    staffCount: 4,
    waitTime: "15 min",
  },
  {
    number: 4,
    location: "Staff Entrance (South)",
    status: "Closed",
    currentRate: 0,
    totalCheckins: 0,
    staffCount: 0,
    waitTime: "N/A",
  },
]

