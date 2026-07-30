'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Adebayo & Funke',
    role: 'Wedding Couple',
    image: 'https://i.pravatar.cc/150?img=11',
    rating: 5,
    text: 'Rivers Kitchen made our wedding day absolutely perfect. The food was exquisite, the presentation stunning, and our guests are still talking about the jollof rice!',
  },
  {
    id: 2,
    name: 'Chukwuemeka Nwosu',
    role: 'Corporate Executive',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'We have used Rivers Kitchen for all our corporate events. Their professionalism and attention to detail is unmatched. Highly recommended!',
  },
  {
    id: 3,
    name: 'Fatima Ibrahim',
    role: 'Birthday Celebrant',
    image: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'My 50th birthday party was a huge success thanks to Rivers Kitchen. The menu was diverse and delicious. Every guest complimented the food.',
  },
  {
    id: 4,
    name: 'Olumide & Aisha',
    role: 'Traditional Wedding',
    image: 'https://i.pravatar.cc/150?img=13',
    rating: 5,
    text: 'They understood exactly what we needed for our traditional wedding. The authentic flavors and generous portions made our day unforgettable.',
  },
  {
    id: 5,
    name: 'Pastor Emmanuel',
    role: 'Church Program Coordinator',
    image: 'https://i.pravatar.cc/150?img=15',
    rating: 5,
    text: 'Reliable, punctual, and the food quality is always excellent. Rivers Kitchen has become our go-to caterer for all church events.',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="reviews" className="py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-button text-sm tracking-widest uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            What Our Clients
            <span className="text-gold"> Say</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about their experience with Rivers Kitchen.
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main Testimonial Card */}
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gold/20 relative overflow-hidden">
            <Quote className="absolute top-6 right-8 w-16 h-16 text-gold/10" />

            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gold/30">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-cream/90 text-lg md:text-xl leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                <div>
                  <h4 className="font-heading text-xl font-bold text-cream">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-gold font-button text-sm">{testimonials[current].role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border-2 border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    current === index ? 'bg-gold w-8' : 'bg-gold/30 hover:bg-gold/50'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border-2 border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        {/* Google Reviews Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-zinc-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-gold/20">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>
            <span className="text-cream font-semibold">5.0</span>
            <span className="text-cream/60">on Google Reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
