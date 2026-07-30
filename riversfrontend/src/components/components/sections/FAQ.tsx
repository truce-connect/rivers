'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer:
      'We recommend booking at least 2-4 weeks in advance for small events and 1-3 months for large weddings or corporate events. For peak seasons (December, Easter), we advise booking 3-6 months ahead.',
  },
  {
    question: 'Do you provide serving staff and equipment?',
    answer:
      'Yes, we provide professional serving staff, tables, chairs, linens, cutlery, plates, and all necessary catering equipment. Our team handles setup, service, and cleanup so you can enjoy your event.',
  },
  {
    question: 'Can you accommodate dietary restrictions?',
    answer:
      'Absolutely. We can prepare vegetarian, vegan, halal, gluten-free, and allergy-friendly meals. Please inform us of any dietary requirements during booking so we can customize the menu accordingly.',
  },
  {
    question: 'What is your pricing structure?',
    answer:
      'Our pricing depends on guest count, menu selection, event type, and additional services. We offer per-person pricing and package deals. Use our Budget Calculator for an instant estimate or contact us for a custom quote.',
  },
  {
    question: 'Do you offer tastings before the event?',
    answer:
      'Yes, we offer complimentary tastings for events with 100+ guests. For smaller events, we provide tasting sessions at a nominal fee. Tastings help you finalize your menu and ensure everything meets your expectations.',
  },
  {
    question: 'What areas do you service?',
    answer:
      'We primarily service Lagos and surrounding areas. For events outside Lagos, additional transportation fees may apply. Contact us to discuss your location and we will provide a tailored quote.',
  },
  {
    question: 'How do I make payments?',
    answer:
      'We accept bank transfers, card payments, and mobile money. A 50% deposit is required to confirm your booking, with the balance due 3 days before the event. Payment plans are available for large events.',
  },
  {
    question: 'What happens if I need to cancel or reschedule?',
    answer:
      'We understand plans change. Cancellations made 30+ days before the event receive a full refund of the deposit. Cancellations within 14-29 days receive a 50% refund. Within 14 days, the deposit is non-refundable but can be rescheduled within 6 months.',
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-gold" />
            <span className="text-gold font-button text-sm tracking-widest uppercase">
              FAQ
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Frequently Asked
            <span className="text-gold"> Questions</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            Everything you need to know about our catering services. Can&apos;t find your answer? Contact us directly.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-gold/20 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/80 transition-colors"
              >
                <span className="font-heading text-lg font-semibold text-cream pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-gold" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-cream/70 leading-relaxed">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
