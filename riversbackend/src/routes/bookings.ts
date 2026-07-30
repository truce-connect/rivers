import express from 'express';
import { z } from 'zod';
import { db } from '../db';
import { bookings, insertBookingSchema } from '../db/schema';
import { eq } from 'drizzle-orm';
import { sendWhatsAppNotification, sendEmailNotification } from '../services/notifications';

const router = express.Router();

const createBookingSchema = insertBookingSchema.extend({
  eventDate: z.string().min(1, 'Event date is required'),
});

router.get('/', async (req, res) => {
  try {
    const allBookings = await db.select().from(bookings).orderBy(bookings.createdAt);
    res.json(allBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const booking = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    if (!booking.length) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking[0]);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

router.post('/', async (req, res) => {
  try {
    const validatedData = createBookingSchema.parse(req.body);

    const now = new Date().toISOString();
    const [newBooking] = await db.insert(bookings).values({
      ...validatedData,
      createdAt: now,
      updatedAt: now,
    }).returning();

    await sendWhatsAppNotification({
      phone: validatedData.phone,
      name: validatedData.fullName,
      eventType: validatedData.eventType,
      eventDate: validatedData.eventDate,
      guestCount: validatedData.guestCount,
      location: validatedData.location,
    });

    await sendEmailNotification({
      to: validatedData.email,
      subject: 'Booking Request Received - Rivers Kitchen',
      body: `Dear ${validatedData.fullName},\n\nThank you for your booking request. We have received your inquiry for ${validatedData.eventType} on ${validatedData.eventDate}.\n\nWe will contact you within 24 hours to confirm the details.\n\nBest regards,\nRivers Kitchen Team`,
    });

    res.status(201).json({
      success: true,
      data: newBooking,
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const [updated] = await db.update(bookings).set({
      status,
      updatedAt: new Date().toISOString(),
    }).where(eq(bookings.id, id)).returning();

    if (!updated) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(bookings).where(eq(bookings.id, id));
    res.json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

export default router;
