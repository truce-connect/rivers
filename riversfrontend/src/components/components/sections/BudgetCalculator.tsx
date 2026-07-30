'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Users, Calendar, MapPin, CheckCircle } from 'lucide-react';

const eventTypes = [
  { name: 'Wedding', basePrice: 500000 },
  { name: 'Birthday', basePrice: 150000 },
  { name: 'Corporate', basePrice: 200000 },
  { name: 'Traditional Wedding', basePrice: 400000 },
  { name: 'Naming Ceremony', basePrice: 100000 },
  { name: 'House Warming', basePrice: 120000 },
  { name: 'Burial Reception', basePrice: 250000 },
  { name: 'Church Program', basePrice: 180000 },
  { name: 'End of Year Party', basePrice: 300000 },
];

const foodPackages = [
  { name: 'Basic', multiplier: 1 },
  { name: 'Standard', multiplier: 1.5 },
  { name: 'Premium', multiplier: 2 },
  { name: 'Luxury', multiplier: 2.5 },
];

const riceTypes = [
  { name: 'Jollof Rice', pricePerGuest: 1500 },
  { name: 'Fried Rice', pricePerGuest: 1500 },
  { name: 'Ofada Rice', pricePerGuest: 2000 },
  { name: 'Coconut Rice', pricePerGuest: 1800 },
];

const proteins = [
  { name: 'Chicken', pricePerGuest: 2000 },
  { name: 'Beef', pricePerGuest: 1800 },
  { name: 'Turkey', pricePerGuest: 2200 },
  { name: 'Fish', pricePerGuest: 2500 },
  { name: 'Assorted', pricePerGuest: 3000 },
];

const soups = [
  { name: 'Egusi', pricePerGuest: 1500 },
  { name: 'Efo Riro', pricePerGuest: 1500 },
  { name: 'Banga', pricePerGuest: 1800 },
  { name: 'Afang', pricePerGuest: 2000 },
  { name: 'None', pricePerGuest: 0 },
];

const extras = [
  { name: 'Small Chops', pricePerGuest: 800 },
  { name: 'Desserts', pricePerGuest: 1000 },
  { name: 'Drinks', pricePerGuest: 1200 },
  { name: 'Live Grilling', pricePerGuest: 2500 },
  { name: 'Decor', pricePerGuest: 1500 },
  { name: 'Servers', pricePerGuest: 500 },
];

export default function BudgetCalculator() {
  const [guests, setGuests] = useState(50);
  const [eventType, setEventType] = useState(eventTypes[0]);
  const [foodPackage, setFoodPackage] = useState(foodPackages[1]);
  const [riceType, setRiceType] = useState(riceTypes[0]);
  const [protein, setProtein] = useState(proteins[0]);
  const [soup, setSoup] = useState(soups[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const toggleExtra = (extraName: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraName)
        ? prev.filter(e => e !== extraName)
        : [...prev, extraName]
    );
  };

  const calculateTotal = () => {
    let total = eventType.basePrice;
    total += guests * riceType.pricePerGuest * foodPackage.multiplier;
    total += guests * protein.pricePerGuest * foodPackage.multiplier;
    total += guests * soup.pricePerGuest * foodPackage.multiplier;
    
    selectedExtras.forEach(extraName => {
      const extra = extras.find(e => e.name === extraName);
      if (extra) {
        total += guests * extra.pricePerGuest;
      }
    });

    return total;
  };

  const total = calculateTotal();
  const cookingDuration = Math.ceil(guests / 50) * 2; // 2 hours per 50 guests
  const serversNeeded = Math.ceil(guests / 20);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="calculator" className="py-24 bg-gradient-to-b from-zinc-900 to-black">
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
            <Calculator className="w-8 h-8 text-gold" />
            <span className="text-gold font-button text-sm tracking-widest uppercase">
              Interactive Calculator
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Catering Budget
            <span className="text-gold"> Calculator</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            Get an instant estimate for your event. Customize your options and see real-time pricing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Guest Count */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
              <label className="flex items-center gap-3 text-cream font-semibold mb-4">
                <Users className="w-5 h-5 text-gold" />
                Number of Guests
              </label>
              <input
                type="range"
                min="10"
                max="500"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between mt-2 text-cream/60 text-sm">
                <span>10</span>
                <span className="text-gold font-semibold text-lg">{guests} guests</span>
                <span>500</span>
              </div>
            </div>

            {/* Event Type */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
              <label className="flex items-center gap-3 text-cream font-semibold mb-4">
                <Calendar className="w-5 h-5 text-gold" />
                Event Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {eventTypes.map((type) => (
                  <button
                    key={type.name}
                    onClick={() => setEventType(type)}
                    className={`px-4 py-3 rounded-xl text-sm font-button transition-all ${
                      eventType.name === type.name
                        ? 'bg-gold text-black'
                        : 'bg-zinc-700 text-cream hover:bg-zinc-600'
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Food Package */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
              <label className="text-cream font-semibold mb-4 block">Food Package</label>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {foodPackages.map((pkg) => (
                  <button
                    key={pkg.name}
                    onClick={() => setFoodPackage(pkg)}
                    className={`px-4 py-3 rounded-xl text-sm font-button transition-all ${
                      foodPackage.name === pkg.name
                        ? 'bg-gold text-black'
                        : 'bg-zinc-700 text-cream hover:bg-zinc-600'
                    }`}
                  >
                    {pkg.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Rice Type */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
              <label className="text-cream font-semibold mb-4 block">Rice Type</label>
              <div className="grid grid-cols-2 gap-3">
                {riceTypes.map((rice) => (
                  <button
                    key={rice.name}
                    onClick={() => setRiceType(rice)}
                    className={`px-4 py-3 rounded-xl text-sm font-button transition-all ${
                      riceType.name === rice.name
                        ? 'bg-gold text-black'
                        : 'bg-zinc-700 text-cream hover:bg-zinc-600'
                    }`}
                  >
                    {rice.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Protein */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
              <label className="text-cream font-semibold mb-4 block">Protein</label>
              <div className="grid grid-cols-2 gap-3">
                {proteins.map((prot) => (
                  <button
                    key={prot.name}
                    onClick={() => setProtein(prot)}
                    className={`px-4 py-3 rounded-xl text-sm font-button transition-all ${
                      protein.name === prot.name
                        ? 'bg-gold text-black'
                        : 'bg-zinc-700 text-cream hover:bg-zinc-600'
                    }`}
                  >
                    {prot.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Soup */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
              <label className="text-cream font-semibold mb-4 block">Soup Option</label>
              <div className="grid grid-cols-2 gap-3">
                {soups.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSoup(s)}
                    className={`px-4 py-3 rounded-xl text-sm font-button transition-all ${
                      soup.name === s.name
                        ? 'bg-gold text-black'
                        : 'bg-zinc-700 text-cream hover:bg-zinc-600'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/20">
              <label className="text-cream font-semibold mb-4 block">Add Extras</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {extras.map((extra) => (
                  <button
                    key={extra.name}
                    onClick={() => toggleExtra(extra.name)}
                    className={`px-4 py-3 rounded-xl text-sm font-button transition-all flex items-center justify-center gap-2 ${
                      selectedExtras.includes(extra.name)
                        ? 'bg-gold text-black'
                        : 'bg-zinc-700 text-cream hover:bg-zinc-600'
                    }`}
                  >
                    {selectedExtras.includes(extra.name) && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {extra.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-gradient-to-br from-gold/20 to-gold/5 backdrop-blur-sm rounded-2xl p-8 border border-gold/30">
              <h3 className="font-heading text-2xl font-bold text-cream mb-6">
                Estimated Cost
              </h3>

              <motion.div
                key={total}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl md:text-6xl font-bold text-gold mb-8 font-heading"
              >
                {formatCurrency(total)}
              </motion.div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gold/20">
                  <span className="text-cream/70">Event Type</span>
                  <span className="text-cream font-semibold">{eventType.name}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gold/20">
                  <span className="text-cream/70">Guest Count</span>
                  <span className="text-cream font-semibold">{guests} guests</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gold/20">
                  <span className="text-cream/70">Package</span>
                  <span className="text-cream font-semibold">{foodPackage.name}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gold/20">
                  <span className="text-cream/70">Cooking Duration</span>
                  <span className="text-cream font-semibold">{cookingDuration} hours</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gold/20">
                  <span className="text-cream/70">Servers Needed</span>
                  <span className="text-cream font-semibold">{serversNeeded}</span>
                </div>
              </div>

              <button className="w-full bg-gold text-black py-4 rounded-full font-button font-semibold text-lg hover:bg-gold/90 transition-all hover:scale-105">
                Book This Package
              </button>

              <p className="text-center text-cream/50 text-sm mt-4">
                *Final price may vary based on specific requirements
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
