import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bookingRoutes from './routes/bookings';
import paymentRoutes from './routes/payments';
import menuRoutes from './routes/menus';
import inquiryRoutes from './routes/inquiries';
import servicesRoutes from './routes/services';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/services', servicesRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Rivers Kitchen API running on port ${PORT}`);
  });
}

export default app;
