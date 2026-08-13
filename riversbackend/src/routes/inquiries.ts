import express from 'express';
import { z } from 'zod';
import { db } from '../db';
import { inquiries, insertInquirySchema } from '../db/schema';
import { sendWhatsAppNotification, sendEmailNotification } from '../services/notifications';
import { desc, eq } from 'drizzle-orm';

const router = express.Router();

const createInquirySchema = insertInquirySchema.extend({
  fullName: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

router.post('/', async (req, res) => {
  try {
    const validatedData = createInquirySchema.parse(req.body);

    const [inquiry] = await db.insert(inquiries).values({
      ...validatedData,
    }).returning();

    await sendWhatsAppNotification({
      phone: validatedData.phone,
      name: validatedData.fullName,
      message: validatedData.message,
      subject: validatedData.subject || 'New Inquiry',
    });

    await sendEmailNotification({
      to: validatedData.email,
      subject: 'We Received Your Inquiry - Rivers Kitchen',
      body: `Dear ${validatedData.fullName},\n\nThank you for reaching out to us. We have received your inquiry and will get back to you within 24 hours.\n\nBest regards,\nRivers Kitchen Team`,
    });

    res.status(201).json({
      success: true,
      data: inquiry,
      message: 'Inquiry submitted successfully',
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

router.get('/', async (req, res) => {
  try {
    const allInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
    res.json(allInquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const validStatuses = ['new', 'contacted', 'resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const [updated] = await db.update(inquiries).set({
      status,
    }).where(eq(inquiries.id, id)).returning();

    if (!updated) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

export default router;
