'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Example {
  id: number;
  title: string;
  before: string;
  after: string;
  description: string;
}

interface BeforeAfterCardProps {
  example: Example;
  index: number;
}

function BeforeAfterCard({ example, index }: BeforeAfterCardProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-zinc-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gold/20 hover:border-gold/50 transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={example.before}
            alt={`${example.title} - Before`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={example.after}
              alt={`${example.title} - After`}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute top-0 bottom-0 w-1 sm:w-1 bg-gold shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          />
          <div
            className="absolute top-0 bottom-0 w-10 sm:w-8 -ml-4 sm:-ml-4 flex items-center cursor-ew-resize touch-manipulation"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={(e) => {
              const handleMove = (moveEvent: MouseEvent) => {
                const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                if (rect) {
                  const x = moveEvent.clientX - rect.left;
                  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                  setSliderPosition(percentage);
                }
              };
              const handleUp = () => {
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('mouseup', handleUp);
              };
              document.addEventListener('mousemove', handleMove);
              document.addEventListener('mouseup', handleUp);
            }}
            onTouchStart={(e) => {
              const handleTouchMove = (touchEvent: TouchEvent) => {
                const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                if (rect && touchEvent.touches[0]) {
                  const x = touchEvent.touches[0].clientX - rect.left;
                  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                  setSliderPosition(percentage);
                }
              };
              const handleTouchEnd = () => {
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
              };
              document.addEventListener('touchmove', handleTouchMove);
              document.addEventListener('touchend', handleTouchEnd);
            }}
          >
            <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gold rounded-full flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-xs sm:text-xs">↔</span>
            </div>
          </div>

          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-cream text-xs font-button">Before</span>
          </div>
          <div className="absolute top-4 right-4 bg-gold/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-black text-xs font-button font-semibold">After</span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-heading text-xl font-semibold text-cream mb-2">{example.title}</h3>
          <p className="text-cream/60 text-sm">{example.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

const examples: Example[] = [
  {
    id: 1,
    title: 'Wedding Reception Hall',
    before: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    description: 'From empty hall to elegant wedding setup',
  },
  {
    id: 2,
    title: 'Corporate Event Space',
    before: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    description: 'Transformed into a professional conference venue',
  },
  {
    id: 3,
    title: 'Outdoor Garden',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    description: 'Garden party setup with elegant decor',
  },
];

export default function BeforeAfter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="transformations" className="py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-button text-sm tracking-widest uppercase mb-4 block">
            Our Work
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Venue
            <span className="text-gold"> Transformations</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            See how we transform ordinary spaces into extraordinary event venues
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <BeforeAfterCard key={example.id} example={example} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
