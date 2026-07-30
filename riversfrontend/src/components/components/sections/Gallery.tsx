'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { X, ZoomIn } from 'lucide-react';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', category: 'Wedding', title: 'Elegant Wedding Setup' },
  { id: 2, src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', category: 'Birthday', title: 'Birthday Celebration' },
  { id: 3, src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80', category: 'Corporate', title: 'Corporate Event' },
  { id: 4, src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80', category: 'Outdoor', title: 'Outdoor Catering' },
  { id: 5, src: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&q=80', category: 'Traditional', title: 'Traditional Wedding' },
  { id: 6, src: 'https://images.unsplash.com/photo-1536935338788-843bb5285307?w=800&q=80', category: 'Cocktail', title: 'Cocktail Bar' },
  { id: 7, src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80', category: 'Kitchen', title: 'Kitchen Preparation' },
  { id: 8, src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80', category: 'Private Chef', title: 'Private Chef Service' },
  { id: 9, src: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80', category: 'Traditional', title: 'Amala & Ewedu' },
  { id: 10, src: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=800&q=80', category: 'Kitchen', title: 'Jollof Rice' },
  { id: 11, src: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80', category: 'Kitchen', title: 'Grilled Chicken' },
  { id: 12, src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', category: 'Kitchen', title: 'Seafood Platter' },
];

const categories = ['All', 'Wedding', 'Birthday', 'Corporate', 'Outdoor', 'Traditional', 'Cocktail', 'Kitchen', 'Private Chef'];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <section ref={ref} id="gallery" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-button text-sm tracking-widest uppercase mb-4 block">
            Our Portfolio
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            A Glimpse of Our
            <span className="text-gold"> Work</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            Browse through our gallery of stunning events and culinary creations
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

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              className="relative group overflow-hidden rounded-2xl cursor-pointer aspect-square"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-12 h-12 text-gold" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-gold text-xs font-button uppercase tracking-wider">
                  {image.category}
                </span>
                <h3 className="text-cream font-heading font-semibold">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Gallery Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="border-2 border-gold text-gold px-8 py-3 rounded-full font-button font-semibold hover:bg-gold hover:text-black transition-all">
            View Full Gallery
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-4 right-4 text-cream hover:text-gold transition-colors"
            >
              <X size={32} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[90vh] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute bottom-8 left-0 right-0 text-center"
            >
              <span className="text-gold text-sm font-button uppercase tracking-wider">
                {selectedImage.category}
              </span>
              <h3 className="text-cream font-heading text-2xl font-semibold">{selectedImage.title}</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
