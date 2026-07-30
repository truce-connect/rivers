'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Calendar, MapPin, Users, Phone, Mail, Check, Loader2 } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';
import { api } from '@/lib/api';

interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  guests: string;
  location: string;
  budget: string;
  notes: string;
}

export default function BookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>();

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await api.post('/bookings', {
        ...data,
        eventDate: data.date,
      });

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gold/10 backdrop-blur-sm rounded-2xl p-12 border border-gold/30"
          >
            <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-black" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-cream mb-4">
              Booking Request Sent!
            </h2>
            <p className="text-cream/70 mb-8">
              Thank you for your interest. We&apos;ll contact you shortly to discuss your event details.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-gold text-black px-8 py-3 rounded-full font-button font-semibold hover:bg-gold/90 transition-all"
            >
              Send Another Request
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-button text-sm tracking-widest uppercase mb-4 block">
            Book Your Event
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Let&apos;s Plan Your
            <span className="text-gold"> Perfect Event</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            Fill out the form below and we&apos;ll get back to you within 24 hours
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gold/20">
              <h3 className="font-heading text-2xl font-bold text-cream mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-cream/60 text-sm mb-1">Phone</p>
                    <a href={`tel:${CONTACT_INFO.phone}`} className="text-cream font-semibold hover:text-gold transition-colors">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-cream/60 text-sm mb-1">Email</p>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-cream font-semibold hover:text-gold transition-colors">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-cream/60 text-sm mb-1">Location</p>
                    <p className="text-cream font-semibold">{CONTACT_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gold/20 to-gold/5 backdrop-blur-sm rounded-2xl p-8 border border-gold/30">
              <h3 className="font-heading text-xl font-bold text-cream mb-4">Quick Response</h3>
              <p className="text-cream/70 mb-6">
                We typically respond to all inquiries within 24 hours. For urgent requests, call us directly.
              </p>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-button font-semibold hover:bg-green-600 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gold/20 space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-cream font-semibold mb-2 block">Full Name *</label>
                  <input
                    {...register('fullName', { required: 'Full name is required' })}
                    className="w-full bg-zinc-700/50 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder-cream/40 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-cream font-semibold mb-2 block">Phone Number *</label>
                  <input
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full bg-zinc-700/50 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder-cream/40 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-cream font-semibold mb-2 block">Email Address *</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full bg-zinc-700/50 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder-cream/40 focus:outline-none focus:border-gold transition-colors"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-cream font-semibold mb-2">
                    <Calendar className="w-4 h-4 text-gold" />
                    Event Date *
                  </label>
                  <input
                    {...register('date', { required: 'Event date is required' })}
                    type="date"
                    className="w-full bg-zinc-700/50 border border-gold/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors"
                  />
                  {errors.date && (
                    <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-cream font-semibold mb-2">
                    <Users className="w-4 h-4 text-gold" />
                    Number of Guests *
                  </label>
                  <select
                    {...register('guests', { required: 'Number of guests is required' })}
                    className="w-full bg-zinc-700/50 border border-gold/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="">Select guest count</option>
                    <option value="10-50">10 - 50</option>
                    <option value="50-100">50 - 100</option>
                    <option value="100-200">100 - 200</option>
                    <option value="200-500">200 - 500</option>
                    <option value="500+">500+</option>
                  </select>
                  {errors.guests && (
                    <p className="text-red-400 text-sm mt-1">{errors.guests.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-cream font-semibold mb-2 block">Event Type *</label>
                  <select
                    {...register('eventType', { required: 'Event type is required' })}
                    className="w-full bg-zinc-700/50 border border-gold/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="">Select event type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Corporate">Corporate Event</option>
                    <option value="Traditional Wedding">Traditional Wedding</option>
                    <option value="Naming Ceremony">Naming Ceremony</option>
                    <option value="House Warming">House Warming</option>
                    <option value="Burial Reception">Burial Reception</option>
                    <option value="Church Program">Church Program</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.eventType && (
                    <p className="text-red-400 text-sm mt-1">{errors.eventType.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-cream font-semibold mb-2 block">Budget Range</label>
                  <select
                    {...register('budget')}
                    className="w-full bg-zinc-700/50 border border-gold/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="100k-300k">₦100,000 - ₦300,000</option>
                    <option value="300k-500k">₦300,000 - ₦500,000</option>
                    <option value="500k-1m">₦500,000 - ₦1,000,000</option>
                    <option value="1m-2m">₦1,000,000 - ₦2,000,000</option>
                    <option value="2m+">₦2,000,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-cream font-semibold mb-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  Event Location *
                </label>
                <input
                  {...register('location', { required: 'Event location is required' })}
                  className="w-full bg-zinc-700/50 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder-cream/40 focus:outline-none focus:border-gold transition-colors"
                  placeholder="Event venue or address"
                />
                {errors.location && (
                  <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>
                )}
              </div>

              <div>
                <label className="text-cream font-semibold mb-2 block">Special Requests / Notes</label>
                <textarea
                  {...register('notes')}
                  rows={4}
                  className="w-full bg-zinc-700/50 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder-cream/40 focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="Any special dietary requirements, preferences, or additional information..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gold text-black py-4 rounded-full font-button font-semibold text-lg hover:bg-gold/90 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Send Booking Request'
                )}
              </button>

              <p className="text-center text-cream/50 text-sm">
                By submitting this form, you agree to be contacted via phone or email regarding your catering inquiry.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}