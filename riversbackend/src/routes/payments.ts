import express from 'express';
import { z } from 'zod';
import { db } from '../db';
import { payments, bookings } from '../db/schema';
import { eq, and } from 'drizzle-orm';

const router = express.Router();

const initiatePaymentSchema = z.object({
  bookingId: z.number().int().positive(),
  email: z.string().email(),
  amount: z.number().positive(),
});

router.post('/initiate', async (req, res) => {
  try {
    const { bookingId, email, amount } = initiatePaymentSchema.parse(req.body);

    const booking = await db.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1);
    if (!booking.length) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const reference = `RK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const [payment] = await db.insert(payments).values({
      bookingId,
      reference,
      amount: Math.round(amount * 100),
      currency: 'NGN',
      status: 'pending',
      gateway: 'paystack',
    }).returning();

    res.json({
      success: true,
      data: {
        reference: payment.reference,
        amount: payment.amount,
        currency: payment.currency,
        publicKey: process.env.PAYSTACK_PUBLIC_KEY,
        email,
      },
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { reference } = req.body;

    const payment = await db.select().from(payments).where(eq(payments.reference, reference)).limit(1);
    if (!payment.length) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({
      success: true,
      data: payment[0],
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const hash = req.headers['x-paystack-signature'];
    const event = req.body;

    if (event.event === 'charge.success') {
      const reference = event.data.reference;
      const [payment] = await db.select().from(payments).where(eq(payments.reference, reference)).limit(1);

      if (payment && payment.status === 'pending') {
        await db.update(payments).set({
          status: 'success',
          paidAt: new Date().toISOString(),
          gatewayResponse: JSON.stringify(event),
        }).where(eq(payments.id, payment.id));

        await db.update(bookings).set({
          paymentStatus: 'paid',
          status: 'confirmed',
          updatedAt: new Date().toISOString(),
        }).where(eq(bookings.id, payment.bookingId));
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

router.get('/booking/:bookingId', async (req, res) => {
  try {
    const bookingId = parseInt(req.params.bookingId);
    const bookingPayments = await db.select().from(payments).where(eq(payments.bookingId, bookingId));
    res.json(bookingPayments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

export default router;
