'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChefHat, Award, BookOpen, Flame } from 'lucide-react';

export default function MeetTheChef() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const achievements = [
    { icon: Award, label: '15+ Years Experience', description: 'Master chef with international training' },
    { icon: ChefHat, label: 'Award Winning', description: 'Nigerian Chef of the Year 2023' },
    { icon: BookOpen, label: 'Author', description: 'Published &quot;African Flavors&quot; cookbook' },
    { icon: Flame, label: 'Innovator', description: 'Pioneer of modern Nigerian fusion cuisine' },
  ];

  return (
    <section id="chef" className="py-24 bg-black">
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
            <div className="relative rounded-3xl overflow-hidden aspect-square">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
                alt="Executive Chef"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            {/* Signature Dish Badge */}
            <div className="absolute -bottom-6 -right-6 bg-gold text-black p-6 rounded-2xl shadow-2xl max-w-xs">
              <p className="text-xs font-button uppercase tracking-wider mb-1">Signature Dish</p>
              <p className="font-heading text-lg font-bold">Smoky Jollof Rice</p>
              <p className="text-sm opacity-80">With secret spice blend</p>
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
              Meet the Chef
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6 leading-tight">
              Chef
              <span className="text-gold"> Emmanuel</span>
              <span className="text-gold"> Okonkwo</span>
            </h2>
            <div className="space-y-6 text-cream/80 text-lg leading-relaxed mb-10">
              <p>
                With over 15 years of culinary excellence, Chef Emmanuel Okonkwo has established himself
                as one of Nigeria&apos;s most sought-after catering experts. Trained in both traditional
                Nigerian cuisine and modern European techniques, he brings a unique fusion approach to
                every dish.
              </p>
              <p>
                His passion for food began in his grandmother&apos;s kitchen in Lagos, where he learned
                the secrets of authentic Nigerian cooking. Today, he leads a team of 20+ talented chefs
                at Rivers Kitchen, delivering exceptional catering experiences across Nigeria and beyond.
              </p>
              <p>
                &ldquo;My philosophy is simple: respect the ingredients, honor the tradition, and never
                stop innovating. Every plate tells a story, and I want our food to be part of your
                family&apos;s story.&rdquo;
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gold/20 hover:border-gold/50 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h4 className="font-heading text-lg font-semibold text-cream mb-1">
                      {achievement.label}
                    </h4>
                    <p className="text-cream/60 text-sm">{achievement.description}</p>
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
