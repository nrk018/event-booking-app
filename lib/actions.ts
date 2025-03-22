/*
"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
// import { prisma } from "@/lib/db"

// In a real application, these would interact with the database
// Here we're just simulating the functionality

// Event schemas
const EventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  totalSeats: z.coerce.number().int().min(1, "Total seats must be at least 1"),
  image: z.string().optional(),
})

// Ticket schemas
const TicketSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  type: z.string().min(1, "Ticket type is required"),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  seats: z.array(z.string()).optional(),
  userId: z.string().min(1, "User ID is required"),
})

// User schemas
const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

// Gate schemas
const GateSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  number: z.coerce.number().int().min(1, "Gate number is required"),
  location: z.string().min(1, "Location is required"),
  status: z.enum(["open", "limited", "closed"]),
  staffCount: z.coerce.number().int().min(0, "Staff count must be a non-negative number"),
})

// Event actions
export async function createEvent(formData: FormData) {
  const validatedFields = EventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    date: formData.get("date"),
    time: formData.get("time"),
    location: formData.get("location"),
    price: formData.get("price"),
    totalSeats: formData.get("totalSeats"),
    image: formData.get("image"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { title, description, category, date, time, location, price, totalSeats, image } = validatedFields.data

  try {
    // In a real app, this would create an event in the database
    // await prisma.event.create({
    //   data: {
    //     title,
    //     description,
    //     category,
    //     date: new Date(date),
    //     time,
    //     location,
    //     price,
    //     totalSeats,
    //     availableSeats: totalSeats,
    //     image,
    //     organizerId: "user-id-here", // This would come from the authenticated user
    //   },
    // })

    revalidatePath("/events")
    redirect("/events")
  } catch (error) {
    return {
      error: {
        _form: ["Failed to create event. Please try again."],
      },
    }
  }
}

// Ticket actions
export async function bookTicket(formData: FormData) {
  const validatedFields = TicketSchema.safeParse({
    eventId: formData.get("eventId"),
    type: formData.get("type"),
    quantity: formData.get("quantity"),
    seats: formData.getAll("seats"),
    userId: formData.get("userId"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { eventId, type, quantity, seats, userId } = validatedFields.data

  try {
    // In a real app, this would create tickets in the database
    // and update the available seats for the event
    // await prisma.$transaction(async (tx) => {
    //   // Update event available seats
    //   await tx.event.update({
    //     where: { id: eventId },
    //     data: {
    //       availableSeats: {
    //         decrement: quantity,
    //       },
    //     },
    //   })
    //
    //   // Create tickets
    //   for (let i = 0; i < quantity; i++) {
    //     await tx.ticket.create({
    //       data: {
    //         type,
    //         eventId,
    //         userId,
    //         seat: seats?.[i] || null,
    //         qrCode: `ticket-${Date.now()}-${i}`, // In a real app, generate a secure QR code
    //       },
    //     })
    //   }
    // })

    revalidatePath(`/events/${eventId}`)
    redirect(`/events/${eventId}/booking/confirmation`)
  } catch (error) {
    return {
      error: {
        _form: ["Failed to book tickets. Please try again."],
      },
    }
  }
}

// Check-in actions
export async function checkInTicket(ticketId: string, gateId: string) {
  try {
    // In a real app, this would update the ticket in the database
    // await prisma.ticket.update({
    //   where: { id: ticketId },
    //   data: {
    //     checkedIn: true,
    //     checkinTime: new Date(),
    //     gateId,
    //   },
    // })

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    return {
      error: "Failed to check in ticket. Please try again.",
    }
  }
}

// Gate actions
export async function updateGateStatus(gateId: string, status: "open" | "limited" | "closed") {
  try {
    // In a real app, this would update the gate in the database
    // await prisma.gate.update({
    //   where: { id: gateId },
    //   data: {
    //     status,
    //   },
    // })

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    return {
      error: "Failed to update gate status. Please try again.",
    }
  }
}

// User actions
export async function createUser(formData: FormData) {
  const validatedFields = UserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = validatedFields.data

  try {
    // In a real app, this would create a user in the database
    // and hash the password
    // await prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     password: await bcrypt.hash(password, 10),
    //   },
    // })

    redirect("/login")
  } catch (error) {
    return {
      error: {
        _form: ["Failed to create account. Please try again."],
      },
    }
  }
}

*/