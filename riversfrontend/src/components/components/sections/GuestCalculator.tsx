'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Users, Utensils, Wine, Droplets, UserCheck, Table } from 'lucide-react';

export default function GuestCalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [adults, setAdults] = useState(100);
  const [children, setChildren] = useState(20);
  const [duration, setDuration] = useState(4);

  const totalGuests = adults + children;

  const calculations = {
    rice: Math.ceil(totalGuests * 0.35),
    meat: Math.ceil(totalGuests * 0.25),
    chickenPieces: Math.ceil(totalGuests * 1.2),
    drinks: Math.ceil(totalGuests * 2),
    water: Math.ceil(totalGuests * 1.5),
    waiters: Math.ceil(totalGuests / 20),
    tables: Math.ceil(totalGuests / 8),
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-NG').format(num);
  };

  return (
    <section id="guest-calculator" className="py-24 bg-gradient-to-b from-black to-zinc-900">
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
            Planning Tool
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Guest
            <span className="text-gold"> Calculator</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            Plan your event with our intelligent guest calculator. Get accurate estimates for food, drinks, and staffing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Adults */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
              <label className="flex items-center gap-3 text-cream font-semibold mb-4">
                <Users className="w-5 h-5 text-gold" />
                Number of Adults
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setAdults(Math.max(0, adults - 10))}
                  className="w-12 h-12 rounded-full bg-zinc-700 text-cream flex items-center justify-center hover:bg-zinc-600 transition-colors text-xl font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  value={adults}
                  onChange={(e) => setAdults(Math.max(0, parseInt(e.target.value) || 0))}
                  className="flex-1 bg-zinc-700/50 border border-gold/20 rounded-xl px-4 py-3 text-cream text-center text-2xl font-bold focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  onClick={() => setAdults(adults + 10)}
                  className="w-12 h-12 rounded-full bg-zinc-700 text-cream flex items-center justify-center hover:bg-zinc-600 transition-colors text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
              <label className="flex items-center gap-3 text-cream font-semibold mb-4">
                <Users className="w-5 h-5 text-gold" />
                Number of Children (under 12)
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setChildren(Math.max(0, children - 5))}
                  className="w-12 h-12 rounded-full bg-zinc-700 text-cream flex items-center justify-center hover:bg-zinc-600 transition-colors text-xl font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  value={children}
                  onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                  className="flex-1 bg-zinc-700/50 border border-gold/20 rounded-xl px-4 py-3 text-cream text-center text-2xl font-bold focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  onClick={() => setChildren(children + 5)}
                  className="w-12 h-12 rounded-full bg-zinc-700 text-cream flex items-center justify-center hover:bg-zinc-600 transition-colors text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Event Duration */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
              <label className="flex items-center gap-3 text-cream font-semibold mb-4">
                <Utensils className="w-5 h-5 text-gold" />
                Event Duration (hours)
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDuration(Math.max(1, duration - 1))}
                  className="w-12 h-12 rounded-full bg-zinc-700 text-cream flex items-center justify-center hover:bg-zinc-600 transition-colors text-xl font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 bg-zinc-700/50 border border-gold/20 rounded-xl px-4 py-3 text-cream text-center text-2xl font-bold focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  onClick={() => setDuration(duration + 1)}
                  className="w-12 h-12 rounded-full bg-zinc-700 text-cream flex items-center justify-center hover:bg-zinc-600 transition-colors text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-gradient-to-br from-gold/20 to-gold/5 backdrop-blur-sm rounded-3xl p-8 border border-gold/30">
              <h3 className="font-heading text-2xl font-bold text-cream mb-2">
                Event Summary
              </h3>
              <p className="text-cream/60 mb-6">Based on {totalGuests} total guests</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-zinc-800/50 rounded-2xl p-4 text-center border border-gold/20">
                  <Utensils className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="font-heading text-2xl font-bold text-cream">{formatNumber(calculations.rice)}</p>
                  <p className="text-cream/60 text-xs">Rice Plates</p>
                </div>
                <div className="bg-zinc-800/50 rounded-2xl p-4 text-center border border-gold/20">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="w-4 h-4 bg-gold rounded-full" />
                  </div>
                  <p className="font-heading text-2xl font-bold text-cream">{formatNumber(calculations.meat)}</p>
                  <p className="text-cream/60 text-xs">Meat Portions</p>
                </div>
                <div className="bg-zinc-800/50 rounded-2xl p-4 text-center border border-gold/20">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="w-3 h-3 bg-gold rounded-sm rotate-45" />
                  </div>
                  <p className="font-heading text-2xl font-bold text-cream">{formatNumber(calculations.chickenPieces)}</p>
                  <p className="text-cream/60 text-xs">Chicken Pieces</p>
                </div>
                <div className="bg-zinc-800/50 rounded-2xl p-4 text-center border border-gold/20">
                  <Wine className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="font-heading text-2xl font-bold text-cream">{formatNumber(calculations.drinks)}</p>
                  <p className="text-cream/60 text-xs">Drinks</p>
                </div>
                <div className="bg-zinc-800/50 rounded-2xl p-4 text-center border border-gold/20">
                  <Droplets className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="font-heading text-2xl font-bold text-cream">{formatNumber(calculations.water)}</p>
                  <p className="text-cream/60 text-xs">Water Bottles</p>
                </div>
                <div className="bg-zinc-800/50 rounded-2xl p-4 text-center border border-gold/20">
                  <UserCheck className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="font-heading text-2xl font-bold text-cream">{calculations.waiters}</p>
                  <p className="text-cream/60 text-xs">Waiters Needed</p>
                </div>
                <div className="bg-zinc-800/50 rounded-2xl p-4 text-center border border-gold/20 col-span-2">
                  <Table className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="font-heading text-2xl font-bold text-cream">{calculations.tables}</p>
                  <p className="text-cream/60 text-xs">Serving Tables</p>
                </div>
              </div>

              <p className="text-center text-cream/50 text-sm">
                *Estimates based on standard event catering ratios
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
