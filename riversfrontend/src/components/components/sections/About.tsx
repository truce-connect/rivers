'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Award, Users, ChefHat } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Passion for Food',
    description: 'Every dish is crafted with love and dedication, using recipes passed down through generations.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards in ingredients, presentation, and service for every event.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We believe in bringing people together through the universal language of great food.',
  },
  {
    icon: ChefHat,
    title: 'Expertise',
    description: 'Our team of professional chefs brings decades of experience in African and international cuisine.',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Rivers Kitchen Chef"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold text-black p-6 rounded-2xl shadow-2xl">
              <p className="font-heading text-3xl font-bold">10+</p>
              <p className="font-button text-sm">Years of Excellence</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-button text-sm tracking-widest uppercase mb-4 block">
              Our Story
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6 leading-tight">
              Crafting Moments
              <span className="text-gold"> Through Food</span>
            </h2>
            <div className="space-y-6 text-cream/80 text-lg leading-relaxed mb-10">
              <p>
                Rivers Kitchen was born from a deep passion for African cuisine and a desire to create
                unforgettable dining experiences. What started as a small family kitchen in Lagos has
                grown into one of Nigeria&apos;s most trusted catering brands.
              </p>
              <p>
                We specialize in blending traditional Nigerian flavors with modern culinary techniques,
                creating menus that honor our heritage while delighting contemporary palates. From
                intimate family gatherings to grand corporate events, we bring the same level of
                dedication and attention to detail.
              </p>
              <p>
                Our mission is simple: to make every meal tell a story. Whether it&apos;s a wedding,
                a birthday, or a corporate gala, we pour our heart into every dish we serve.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 hover:border-gold/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-cream mb-2">
                      {value.title}
                    </h3>
                    <p className="text-cream/60 text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
