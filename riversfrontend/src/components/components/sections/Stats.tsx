'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CountUp from 'react-countup';
import { Award, Users, Utensils, Star } from 'lucide-react';

const stats = [
  { icon: Award, value: 1000, suffix: '+', label: 'Events Catered' },
  { icon: Users, value: 20000, suffix: '+', label: 'Happy Guests' },
  { icon: Utensils, value: 50, suffix: '+', label: 'Signature Dishes' },
  { icon: Star, value: 5.0, suffix: '★', label: 'Customer Rating' },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-button text-sm tracking-widest uppercase mb-4 block">
            Our Achievements
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Why Choose
            <span className="text-gold"> Rivers Kitchen</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            Our numbers speak for themselves. We've built our reputation on excellence and customer satisfaction.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gold/20 text-center hover:border-gold/50 transition-all"
              >
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-gold" />
                </div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + 0.1 * index }}
                  className="font-heading text-4xl md:text-5xl font-bold text-gold mb-2"
                >
                  {isInView && (
                    <CountUp
                      end={stat.value}
                      decimals={stat.value === 5.0 ? 1 : 0}
                      duration={2}
                      separator=","
                    />
                  )}
                  {stat.suffix}
                </motion.div>
                <p className="text-cream/70 font-body text-lg">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
