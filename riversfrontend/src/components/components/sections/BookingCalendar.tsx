'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

interface DayStatus {
  date: Date;
  status: 'available' | 'few-slots' | 'booked';
}

export default function BookingCalendar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: DayStatus[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: new Date(year, month, -startingDayOfWeek + i + 1), status: 'available' });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      const dayOfWeek = dayDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const dateKey = `${year}-${month}-${i}`;
      const hash = dateKey.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
      const random = Math.abs(hash) % 100 / 100;

      let status: DayStatus['status'] = 'available';
      if (isWeekend && random > 0.6) {
        status = 'few-slots';
      } else if (!isWeekend && random > 0.85) {
        status = 'booked';
      } else if (isWeekend && random > 0.85) {
        status = 'booked';
      }

      days.push({ date: dayDate, status });
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getStatusColor = (status: DayStatus['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'few-slots':
        return 'bg-yellow-500';
      case 'booked':
        return 'bg-red-500';
    }
  };

  const getStatusLabel = (status: DayStatus['status']) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'few-slots':
        return 'Few Slots';
      case 'booked':
        return 'Booked';
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  return (
    <section id="calendar" className="py-24 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-gold" />
            <span className="text-gold font-button text-sm tracking-widest uppercase">
              Availability
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Check
            <span className="text-gold"> Availability</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            Select a date to check availability and plan your event
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-800/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-gold/20"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevMonth}
              className="w-10 h-10 rounded-full border-2 border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <h3 className="font-heading text-2xl font-bold text-cream">{monthName}</h3>
            <button
              onClick={nextMonth}
              className="w-10 h-10 rounded-full border-2 border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-cream/60 font-button text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {days.map((day, index) => {
              const isCurrentMonth = day.date.getMonth() === currentMonth.getMonth();
              const selected = isSelected(day.date);

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.01 }}
                  onClick={() => setSelectedDate(day.date)}
                  disabled={!isCurrentMonth}
                  className={`relative aspect-square rounded-lg sm:rounded-xl flex items-center justify-center font-button text-xs sm:text-sm transition-all ${
                    !isCurrentMonth
                      ? 'text-cream/20'
                      : selected
                      ? 'bg-gold text-black'
                      : 'text-cream hover:bg-zinc-700'
                  }`}
                >
                  {day.date.getDate()}
                  {isCurrentMonth && (
                    <div
                      className={`absolute bottom-0.5 sm:bottom-1 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${getStatusColor(day.status)}`}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-8 border-t border-gold/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-cream/70 text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-cream/70 text-sm">Few Slots</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-cream/70 text-sm">Booked</span>
            </div>
          </div>

          {/* Selected Date Info */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-gold/10 rounded-2xl border border-gold/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cream/60 text-sm mb-1">Selected Date</p>
                  <p className="font-heading text-xl font-bold text-cream">
                    {selectedDate.toLocaleDateString('en-NG', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-cream/60 text-sm mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const dayStatus = days.find(
                        (d) => d.date.toDateString() === selectedDate.toDateString()
                      );
                      if (!dayStatus) return null;
                      return (
                        <>
                          {dayStatus.status === 'available' && (
                            <Check className="w-5 h-5 text-green-500" />
                          )}
                          {dayStatus.status === 'few-slots' && (
                            <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-black text-xs font-bold">!</div>
                          )}
                          {dayStatus.status === 'booked' && (
                            <X className="w-5 h-5 text-red-500" />
                          )}
                          <span className="text-cream font-semibold">
                            {getStatusLabel(dayStatus.status)}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
