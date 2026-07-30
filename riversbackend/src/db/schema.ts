import { pgTable, serial, text, timestamp, integer, boolean, json } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  eventType: text('event_type').notNull(),
  eventDate: timestamp('event_date').notNull(),
  guestCount: text('guest_count').notNull(),
  location: text('location').notNull(),
  budget: text('budget'),
  notes: text('notes'),
  status: text('status', { enum: ['pending', 'confirmed', 'cancelled', 'completed'] }).default('pending').notNull(),
  paymentStatus: text('payment_status', { enum: ['pending', 'paid', 'failed', 'refunded'] }).default('pending').notNull(),
  paymentReference: text('payment_reference'),
  amount: integer('amount'),
  currency: text('currency').default('NGN'),
  metadata: json('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  bookingId: integer('booking_id').references(() => bookings.id).notNull(),
  reference: text('reference').notNull().unique(),
  amount: integer('amount').notNull(),
  currency: text('currency').default('NGN').notNull(),
  status: text('status', { enum: ['pending', 'success', 'failed'] }).default('pending').notNull(),
  gateway: text('gateway').default('paystack').notNull(),
  gatewayResponse: json('gateway_response'),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const menuPackages = pgTable('menu_packages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  guestCapacity: text('guest_capacity'),
  image: text('image'),
  items: json('items').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const customMenus = pgTable('custom_menus', {
  id: serial('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  items: json('items').notNull(),
  total: integer('total').notNull(),
  estimatedGuests: integer('estimated_guests'),
  contactInfo: json('contact_info'),
  status: text('status', { enum: ['draft', 'submitted', 'converted'] }).default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  subject: text('subject'),
  message: text('message').notNull(),
  source: text('source').default('website').notNull(),
  status: text('status', { enum: ['new', 'contacted', 'resolved'] }).default('new').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const insertBookingSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  eventType: z.string().min(2, 'Event type is required'),
  eventDate: z.string().min(1, 'Event date is required'),
  guestCount: z.string().min(1, 'Guest count is required'),
  location: z.string().min(2, 'Location is required'),
  budget: z.string().optional(),
  notes: z.string().optional(),
});

export const insertPaymentSchema = z.object({
  bookingId: z.number().int().positive(),
  reference: z.string().min(1, 'Reference is required'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('NGN'),
  gateway: z.string().default('paystack'),
});

export const insertMenuPackageSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  guestCapacity: z.string().optional(),
  image: z.string().optional(),
  items: z.any(),
  isActive: z.boolean().default(true),
});

export const insertCustomMenuSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  items: z.any(),
  total: z.number().nonnegative('Total must be non-negative'),
  estimatedGuests: z.number().int().positive().optional(),
  contactInfo: z.any().optional(),
  status: z.enum(['draft', 'submitted', 'converted']).default('draft'),
});

export const insertInquirySchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  source: z.string().default('website'),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type MenuPackage = typeof menuPackages.$inferSelect;
export type InsertMenuPackage = z.infer<typeof insertMenuPackageSchema>;
export type CustomMenu = typeof customMenus.$inferSelect;
export type InsertCustomMenu = z.infer<typeof insertCustomMenuSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
