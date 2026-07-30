'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Users, ArrowRight, Check } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

const packages = [
  {
    name: 'Traditional Wedding',
    description: 'Authentic Nigerian cuisine for your traditional marriage ceremony',
    image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80',
    guests: '200 - 500',
    price: '₦2,500,000',
    menu: ['Jollof Rice', 'Fried Rice', 'Assorted Meat', 'Peppered Turkey', 'Small Chops', 'Drinks'],
  },
  {
    name: 'White Wedding',
    description: 'Elegant continental and African fusion for your special day',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
    guests: '200 - 500',
    price: '₦3,000,000',
    menu: ['Continental Dishes', 'Jollof Rice', 'Grilled Chicken', 'Salad Bar', 'Desserts', 'Champagne'],
  },
  {
    name: 'Birthday Party',
    description: 'Fun, vibrant, and delicious catering for milestone celebrations',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
    guests: '50 - 200',
    price: '₦500,000',
    menu: ['Jollof Rice', 'Fried Rice', 'Grilled Chicken', 'Small Chops', 'Cake', 'Drinks'],
  },
  {
    name: 'House Warming',
    description: 'Warm and welcoming meals to celebrate your new home',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022fd1?w=600&q=80',
    guests: '50 - 150',
    price: '₦300,000',
    menu: ['Jollof Rice', 'Plantain', 'Meat', 'Fish', 'Salad', 'Drinks'],
  },
  {
    name: 'Naming Ceremony',
    description: 'Celebrate your little one with a memorable feast',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80',
    guests: '50 - 200',
    price: '₦400,000',
    menu: ['Jollof Rice', 'Fried Rice', 'Chicken', 'Small Chops', 'Cake', 'Juice'],
  },
  {
    name: 'Burial Reception',
    description: 'Respectful and generous catering to honor your loved ones',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
    guests: '200 - 500',
    price: '₦1,500,000',
    menu: ['Jollof Rice', 'Fried Rice', 'Assorted Meat', 'Fish', 'Salad', 'Drinks'],
  },
  {
    name: 'Church Program',
    description: 'Professional catering for religious events and conferences',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
    guests: '100 - 300',
    price: '₦600,000',
    menu: ['Jollof Rice', 'White Rice', 'Stew', 'Chicken', 'Salad', 'Water'],
  },
  {
    name: 'Corporate Event',
    description: 'Sophisticated catering for business gatherings and conferences',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    guests: '50 - 200',
    price: '₦800,000',
    menu: ['Continental Buffet', 'Local Rice', 'Grilled Proteins', 'Salad Bar', 'Desserts', 'Coffee'],
  },
  {
    name: 'End of Year Party',
    description: 'Celebrate the year in style with a spectacular feast',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
    guests: '200 - 500',
    price: '₦2,000,000',
    menu: ['BBQ', 'Jollof Rice', 'Fried Rice', 'Grilled Fish', 'Small Chops', 'Cocktails'],
  },
];

export default function Packages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const handleBookPackage = (packageName: string) => {
    const message = encodeURIComponent(
      `Hello Rivers Kitchen,\n\nI'm interested in the ${packageName} package.\n\nI would like to discuss the details and book this package.\n\nPlease contact me with more information.`
    );
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section id="packages" className="py-24 bg-gradient-to-b from-black to-zinc-900">
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
            Event Packages
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Tailored for Every
            <span className="text-gold"> Occasion</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            Choose from our curated event packages designed to make your celebration truly special
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group bg-zinc-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gold/20 hover:border-gold/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading text-xl font-bold text-cream">{pkg.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-cream/70 text-sm mb-4">{pkg.description}</p>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-cream/80">
                    <Users className="w-4 h-4 text-gold" />
                    <span className="text-sm">{pkg.guests} guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-cream/80">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span className="text-sm font-semibold text-gold">From {pkg.price}</span>
                  </div>
                </div>

                {/* Menu Preview */}
                <div className="mb-6">
                  <p className="text-cream/60 text-xs font-button uppercase tracking-wider mb-2">
                    Sample Menu
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.menu.map((item) => (
                      <span
                        key={item}
                        className="bg-gold/10 text-gold text-xs px-3 py-1 rounded-full border border-gold/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={() => handleBookPackage(pkg.name)}
                  className="w-full bg-gold text-black py-3 rounded-full font-button font-semibold hover:bg-gold/90 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  Book Package
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
