'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

export default function MobileBookButton() {
  const handleCall = () => {
    window.open(`tel:${CONTACT_INFO.phone}`, '_self');
  };

  return (
    <motion.button
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2 }}
      onClick={handleCall}
      className="md:hidden fixed bottom-6 left-4 right-4 z-50 bg-gold text-black py-4 rounded-full font-button font-bold text-lg shadow-2xl hover:bg-gold/90 transition-all flex items-center justify-center gap-2"
    >
      <Phone size={20} />
      Book Your Event
    </motion.button>
  );
}
