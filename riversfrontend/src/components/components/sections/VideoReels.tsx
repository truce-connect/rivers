'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, Video } from 'lucide-react';

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const reels = [
  {
    id: 1,
    title: 'Food Preparation',
    description: 'Watch our chefs prepare authentic jollof rice',
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80',
    videoUrl: '#',
  },
  {
    id: 2,
    title: 'Behind the Scenes',
    description: 'A day in the life of Rivers Kitchen',
    thumbnail: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80',
    videoUrl: '#',
  },
  {
    id: 3,
    title: 'Wedding Buffet Setup',
    description: 'Elegant buffet setup for a luxury wedding',
    thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
    videoUrl: '#',
  },
  {
    id: 4,
    title: 'Live Grilling Station',
    description: 'Interactive live cooking at corporate event',
    thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
    videoUrl: '#',
  },
  {
    id: 5,
    title: 'Chef at Work',
    description: 'Executive Chef Emmanuel preparing signature dish',
    thumbnail: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80',
    videoUrl: '#',
  },
  {
    id: 6,
    title: 'Traditional Wedding',
    description: 'Highlights from a traditional Nigerian wedding',
    thumbnail: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80',
    videoUrl: '#',
  },
];

export default function VideoReels() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <section id="videos" className="py-24 bg-black">
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
            <Video className="w-8 h-8 text-gold" />
            <span className="text-gold font-button text-sm tracking-widest uppercase">
              Video Gallery
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            See Us in
            <span className="text-gold"> Action</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            Watch our team in action. From food preparation to event execution, see the Rivers Kitchen difference.
          </p>
        </motion.div>

        {/* Reels Grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reels.map((reel, index) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onClick={() => setActiveVideo(reel.id)}
              className="group relative aspect-[9/16] sm:aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-zinc-800"
            >
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-gold/90 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <Play className="w-8 h-8 text-black ml-1" fill="black" />
                </motion.div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <InstagramIcon />
                  <span className="text-gold text-xs font-button uppercase tracking-wider">Reel</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-cream mb-1">{reel.title}</h3>
                <p className="text-cream/60 text-sm">{reel.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Modal */}
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <div className="max-w-4xl w-full">
              <div className="aspect-video bg-zinc-800 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-gold mx-auto mb-4" />
                  <p className="text-cream text-lg">
                    Video playback would appear here
                  </p>
                  <p className="text-cream/60 text-sm mt-2">
                    Connect your video hosting service to enable playback
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
