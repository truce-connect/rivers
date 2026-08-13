import express from 'express';
import { z } from 'zod';
import { db } from '../db';
import { menuPackages, customMenus, insertCustomMenuSchema } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

const router = express.Router();

router.get('/packages', async (req, res) => {
  try {
    const packages = await db.select().from(menuPackages).where(eq(menuPackages.isActive, true)).orderBy(menuPackages.id);
    res.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
});

router.get('/packages/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pkg = await db.select().from(menuPackages).where(eq(menuPackages.id, id)).limit(1);
    if (!pkg.length) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(pkg[0]);
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({ error: 'Failed to fetch package' });
  }
});

router.post('/custom', async (req, res) => {
  try {
    const validatedData = insertCustomMenuSchema.parse(req.body);

    const [customMenu] = await db.insert(customMenus).values({
      ...validatedData,
    }).returning();

    res.status(201).json({
      success: true,
      data: customMenu,
      message: 'Custom menu saved successfully',
    });
  } catch (error) {
    console.error('Error saving custom menu:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to save custom menu' });
  }
});

router.get('/custom/:sessionId', async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const menus = await db.select().from(customMenus).where(eq(customMenus.sessionId, sessionId)).orderBy(desc(customMenus.createdAt));
    res.json(menus);
  } catch (error) {
    console.error('Error fetching custom menus:', error);
    res.status(500).json({ error: 'Failed to fetch custom menus' });
  }
});

router.post('/custom/:sessionId/convert', async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const { contactInfo } = req.body;

    const menus = await db.select().from(customMenus).where(eq(customMenus.sessionId, sessionId)).orderBy(desc(customMenus.createdAt));
    if (!menus.length) {
      return res.status(404).json({ error: 'No custom menu found' });
    }

    const latestMenu = menus[0];
    await db.update(customMenus).set({
      status: 'converted',
      contactInfo: JSON.stringify(contactInfo),
      updatedAt: new Date(),
    }).where(eq(customMenus.id, latestMenu.id));

    res.json({
      success: true,
      message: 'Custom menu converted to booking inquiry',
    });
  } catch (error) {
    console.error('Error converting custom menu:', error);
    res.status(500).json({ error: 'Failed to convert custom menu' });
  }
});

export default router;
