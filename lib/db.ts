// This file would contain the database connection and models
// Here's a simplified example of what it might look like

import { PrismaClient } from "@prisma/client"

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// Database models would be defined in schema.prisma
// Here's a simplified representation of the models:

/*
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  password      String
  role          String    @default("user")
  tickets       Ticket[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Event {
  id            String    @id @default(cuid())
  title         String
  description   String
  category      String
  date          DateTime
  time          String
  location      String
  price         Float
  totalSeats    Int
  availableSeats Int
  image         String?
  organizerId   String
  organizer     User      @relation(fields: [organizerId], references: [id])
  tickets       Ticket[]
  gates         Gate[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Ticket {
  id            String    @id @default(cuid())
  type          String    @default("standard")
  price         Float
  eventId       String
  event         Event     @relation(fields: [eventId], references: [id])
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  seat          String?
  status        String    @default("active")
  checkedIn     Boolean   @default(false)
  checkinTime   DateTime?
  gateId        String?
  gate          Gate?     @relation(fields: [gateId], references: [id])
  qrCode        String    @unique
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Gate {
  id            String    @id @default(cuid())
  number        Int
  location      String
  status        String    @default("closed")
  staffCount    Int       @default(0)
  eventId       String
  event         Event     @relation(fields: [eventId], references: [id])
  tickets       Ticket[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
*/

