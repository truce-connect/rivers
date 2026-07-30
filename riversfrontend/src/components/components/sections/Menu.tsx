'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';

const menuItems = [
  {
    name: 'Smoky Jollof Rice',
    description: 'Our signature party jollof with authentic smoky flavor',
    price: '₦3,500',
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=600&q=80',
    category: 'Rice',
    rating: 5,
  },
  {
    name: 'Grilled Chicken',
    description: 'Perfectly seasoned and grilled to perfection',
    price: '₦4,500',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&q=80',
    category: 'Protein',
    rating: 5,
  },
  {
    name: 'Seafood Platter',
    description: 'Fresh assortment of prawns, crabs, and fish',
    price: '₦8,000',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
    category: 'Seafood',
    rating: 5,
  },
  {
    name: 'Peppered Turkey',
    description: 'Spicy peppered turkey with authentic Nigerian seasoning',
    price: '₦4,000',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80',
    category: 'Protein',
    rating: 4.5,
  },
  {
    name: 'Small Chops',
    description: 'Assorted finger foods - puff puff, samosa, spring rolls',
    price: '₦2,500',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
    category: 'Appetizers',
    rating: 5,
  },
  {
    name: 'Desserts',
    description: 'Premium cakes, pastries, and sweet treats',
    price: '₦3,000',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80',
    category: 'Desserts',
    rating: 5,
  },
  {
    name: 'Ofada Rice',
    description: 'Traditional Ofada rice with special sauce',
    price: '₦4,000',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80',
    category: 'Rice',
    rating: 5,
  },
  {
    name: 'Egusi Soup',
    description: 'Rich melon seed soup with assorted meat',
    price: '₦3,500',
    image: 'https://images.unsplash.com/photo-1645177627174-4f8bb697c8a3?w=600&q=80',
    category: 'Soup',
    rating: 4.5,
  },
  {
    name: 'Amala & Ewedu',
    description: 'Traditional Yoruba delicacy with gbegiri',
    price: '₦3,000',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80',
    category: 'Swallow',
    rating: 5,
  },
  {
    name: 'Pounded Yam',
    description: 'Freshly pounded yam with vegetable soup',
    price: '₦3,500',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
    category: 'Swallow',
    rating: 5,
  },
  {
    name: 'Afang Soup',
    description: 'Calabar specialty with fresh vegetables and meat',
    price: '₦4,500',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
    category: 'Soup',
    rating: 5,
  },
  {
    name: 'Cocktails',
    description: 'Signature cocktails and mocktails',
    price: '₦2,000',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80',
    category: 'Drinks',
    rating: 4.5,
  },
];

const categories = ['All', 'Rice', 'Protein', 'Seafood', 'Soup', 'Swallow', 'Appetizers', 'Desserts', 'Drinks'];

export default function Menu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <section ref={ref} id="menu" className="py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-button text-sm tracking-widest uppercase mb-4 block">
            Our Menu
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Signature
            <span className="text-gold"> Dishes</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            Explore our carefully crafted menu featuring authentic Nigerian cuisine and international favorites
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-button text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-gold text-black'
                  : 'bg-zinc-800 text-cream hover:bg-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-2xl bg-zinc-800/50 backdrop-blur-sm border border-gold/20 hover:border-gold/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="text-cream text-sm font-semibold">{item.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading text-lg font-semibold text-cream group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-gold font-button font-semibold">{item.price}</span>
                </div>
                <p className="text-cream/60 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-cream/40 text-xs font-button uppercase tracking-wider">
                    {item.category}
                  </span>
                  <button className="text-gold hover:text-gold/80 transition-colors flex items-center gap-1 text-sm font-semibold">
                    Add to Menu
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Full Menu Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="border-2 border-gold text-gold px-8 py-3 rounded-full font-button font-semibold hover:bg-gold hover:text-black transition-all">
            View Full Menu
          </button>
        </motion.div>
      </div>
    </section>
  );
}
