import express from 'express';
import { z } from 'zod';
import { db } from '../db';
import { services, insertServiceSchema } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allServices = await db.select().from(services).orderBy(desc(services.createdAt));
    res.json(allServices);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const service = await db.select().from(services).where(eq(services.id, id)).limit(1);
    if (!service.length) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service[0]);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

router.post('/', async (req, res) => {
  try {
    const validatedData = insertServiceSchema.parse(req.body);

    const [newService] = await db.insert(services).values({
      ...validatedData,
    }).returning();

    res.status(201).json({
      success: true,
      data: newService,
      message: 'Service created successfully',
    });
  } catch (error) {
    console.error('Error creating service:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create service' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const validatedData = insertServiceSchema.parse(req.body);

    const [updated] = await db.update(services).set({
      ...validatedData,
      updatedAt: new Date(),
    }).where(eq(services.id, id)).returning();

    if (!updated) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({
      success: true,
      data: updated,
      message: 'Service updated successfully',
    });
  } catch (error) {
    console.error('Error updating service:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update service' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(services).where(eq(services.id, id));
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

export default router;
