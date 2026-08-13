'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  Heart,
  Building2,
  Cake,
  ChefHat,
  Utensils,
  Martini,
  Flame,
  Users,
  Award,
  Star,
  Sparkles,
  Gift,
  Music,
  Camera,
  Plane,
  Car,
} from 'lucide-react';
import { api } from '@/lib/api';

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Building2,
  Cake,
  ChefHat,
  Utensils,
  Martini,
  Flame,
  Users,
  Award,
  Star,
  Sparkles,
  Gift,
  Music,
  Camera,
  Plane,
  Car,
};

interface Service {
  id: number;
  title: string;
  description: string;
  price?: string;
  image: string;
  icon: string;
  isActive: boolean;
}

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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.get<Service[]>('/services');
        const activeServices = data.filter(s => s.isActive);
        setServices(activeServices);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

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
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Heart;
              return (
                <motion.div
                  key={service.id}
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
                    {service.price && (
                      <p className="text-gold font-button font-semibold mt-3">
                        From {service.price}
                      </p>
                    )}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/50 rounded-2xl transition-all duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
