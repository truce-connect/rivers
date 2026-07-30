'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Heart,
  Building2,
  Cake,
  ChefHat,
  Utensils,
  Martini,
  Flame,
  Users,
} from 'lucide-react';

const services = [
  {
    icon: Heart,
    title: 'Wedding Catering',
    description: 'Elegant culinary experiences for your special day, from traditional to white weddings.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
  },
  {
    icon: Building2,
    title: 'Corporate Catering',
    description: 'Professional catering for business events, conferences, and corporate gatherings.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
  },
  {
    icon: Cake,
    title: 'Birthday Parties',
    description: 'Celebrate milestones with delicious food that makes your party unforgettable.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
  },
  {
    icon: ChefHat,
    title: 'Private Chef Experience',
    description: 'Personalized dining experiences with a dedicated chef for intimate gatherings.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80',
  },
  {
    icon: Utensils,
    title: 'Outdoor Catering',
    description: 'Full-service outdoor catering for garden parties, beach events, and open-air celebrations.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80',
  },
  {
    icon: Martini,
    title: 'Cocktail & Dessert Bar',
    description: 'Sophisticated drink stations and dessert bars that elevate any event.',
    image: 'https://images.unsplash.com/photo-1536935338788-843bb5285307?w=600&q=80',
  },
  {
    icon: Flame,
    title: 'Live Grilling',
    description: 'Interactive live cooking stations with professional chefs grilling to perfection.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80',
  },
  {
    icon: Users,
    title: 'Traditional Weddings',
    description: 'Authentic Nigerian cuisine for traditional marriage ceremonies and cultural events.',
    image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="services"
      className="py-24 bg-gradient-to-b from-black to-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-button text-sm tracking-widest uppercase mb-4 block">
            What We Offer
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Our Premium
            <span className="text-gold"> Services</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            From intimate gatherings to grand celebrations, we bring culinary excellence to every occasion
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl bg-zinc-800/50 backdrop-blur-sm border border-gold/20 hover:border-gold/50 transition-all duration-300"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-6 h-full flex flex-col">
                  <div className="mb-4">
                    <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/30 transition-colors">
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-cream mb-2 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-cream/70 text-sm leading-relaxed flex-grow">
                    {service.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/50 rounded-2xl transition-all duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
