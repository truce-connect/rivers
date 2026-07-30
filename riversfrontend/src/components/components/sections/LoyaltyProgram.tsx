'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Crown, Gift, Users, Star, TrendingUp, Award, Check } from 'lucide-react';

interface Tier {
  name: string;
  icon: React.ElementType;
  minSpend: number;
  benefits: string[];
  color: string;
}

const tiers: Tier[] = [
  {
    name: 'Bronze Member',
    icon: Award,
    minSpend: 0,
    benefits: ['5% discount on all bookings', 'Birthday special offer', 'Newsletter updates'],
    color: 'from-orange-500/20 to-orange-500/5',
  },
  {
    name: 'Silver Member',
    icon: Star,
    minSpend: 500000,
    benefits: ['10% discount on all bookings', 'Priority booking', 'Free tasting session', 'Exclusive menu previews'],
    color: 'from-gray-400/20 to-gray-400/5',
  },
  {
    name: 'Gold Member',
    icon: TrendingUp,
    minSpend: 1500000,
    benefits: ['15% discount on all bookings', 'VIP event access', 'Dedicated event coordinator', 'Custom menu design', 'Complimentary decor'],
    color: 'from-yellow-500/20 to-yellow-500/5',
  },
  {
    name: 'Platinum Member',
    icon: Crown,
    minSpend: 3000000,
    benefits: ['20% discount on all bookings', 'Personal chef consultation', 'Exclusive venue partnerships', 'Year-round priority', 'Corporate account manager', 'Custom branding options'],
    color: 'from-purple-500/20 to-purple-500/5',
  },
];

const perks = [
  { icon: Gift, title: 'Referral Rewards', description: 'Earn ₦50,000 for every successful referral' },
  { icon: Users, title: 'Corporate Loyalty', description: 'Special rates for recurring corporate events' },
  { icon: Star, title: 'VIP Treatment', description: 'Exclusive access to seasonal menus and events' },
  { icon: Crown, title: 'Premium Support', description: 'Dedicated account manager for members' },
];

export default function LoyaltyProgram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="loyalty" className="py-24 bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-gold" />
            <span className="text-gold font-button text-sm tracking-widest uppercase">
              Loyalty Program
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Rewards &
            <span className="text-gold"> Benefits</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            The more you celebrate with us, the more you save. Join our loyalty program and unlock exclusive benefits.
          </p>
        </motion.div>

        {/* Membership Tiers */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`relative bg-gradient-to-br ${tier.color} backdrop-blur-sm rounded-3xl p-6 border border-gold/20 hover:border-gold/50 transition-all duration-300`}
              >
                <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-heading text-xl font-bold text-cream mb-2">{tier.name}</h3>
                <p className="text-gold font-button text-sm mb-4">
                  From ₦{tier.minSpend.toLocaleString()}
                </p>
                <ul className="space-y-2 mb-6">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-cream/70 text-sm">
                      <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Perks Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 text-center hover:border-gold/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-cream mb-2">{perk.title}</h4>
                <p className="text-cream/60 text-sm">{perk.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-cream/70 mb-6 max-w-2xl mx-auto">
            Start earning rewards today. Sign up for our loyalty program and get exclusive access to special offers.
          </p>
          <button className="bg-gold text-black px-8 py-4 rounded-full font-button font-semibold text-lg hover:bg-gold/90 transition-all hover:scale-105">
            Join Loyalty Program
          </button>
        </motion.div>
      </div>
    </section>
  );
}
