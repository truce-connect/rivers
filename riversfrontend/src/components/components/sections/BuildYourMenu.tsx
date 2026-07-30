'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Plus, Minus, ShoppingCart } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const menuCategories = [
  { id: 'rice', name: 'Rice', items: [
    { id: 'jollof', name: 'Jollof Rice', price: 3500, category: 'Rice', image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&q=80', description: 'Our signature smoky party jollof' },
    { id: 'fried', name: 'Fried Rice', price: 3500, category: 'Rice', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80', description: 'Vegetable fried rice with chicken' },
    { id: 'ofada', name: 'Ofada Rice', price: 4000, category: 'Rice', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=80', description: 'Traditional Ofada with special sauce' },
    { id: 'coconut', name: 'Coconut Rice', price: 3800, category: 'Rice', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', description: 'Fragrant coconut-infused rice' },
  ]},
  { id: 'soup', name: 'Soup', items: [
    { id: 'egusi', name: 'Egusi Soup', price: 3500, category: 'Soup', image: 'https://images.unsplash.com/photo-1645177627174-4f8bb697c8a3?w=400&q=80', description: 'Rich melon seed soup with assorted meat' },
    { id: 'efo', name: 'Efo Riro', price: 3500, category: 'Soup', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', description: 'Spinach stew with assorted protein' },
    { id: 'banga', name: 'Banga Soup', price: 3800, category: 'Soup', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80', description: 'Palm nut soup with fresh fish' },
    { id: 'afang', name: 'Afang Soup', price: 4000, category: 'Soup', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80', description: 'Calabar specialty with fresh vegetables' },
  ]},
  { id: 'protein', name: 'Protein', items: [
    { id: 'chicken', name: 'Grilled Chicken', price: 4500, category: 'Protein', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=80', description: 'Perfectly seasoned and grilled' },
    { id: 'turkey', name: 'Peppered Turkey', price: 4000, category: 'Protein', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80', description: 'Spicy peppered turkey' },
    { id: 'fish', name: 'Grilled Fish', price: 5000, category: 'Protein', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80', description: 'Fresh tilapia with spices' },
    { id: 'beef', name: 'Assorted Beef', price: 4200, category: 'Protein', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80', description: 'Tender beef cuts with stew' },
  ]},
  { id: 'swallow', name: 'Swallow', items: [
    { id: 'amala', name: 'Amala & Ewedu', price: 3500, category: 'Swallow', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80', description: 'Traditional Yoruba delicacy' },
    { id: 'pounded', name: 'Pounded Yam', price: 3500, category: 'Swallow', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80', description: 'Freshly pounded with soup' },
    { id: 'fufu', name: 'Fufu & Soup', price: 3200, category: 'Swallow', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', description: 'Smooth fufu with your choice of soup' },
  ]},
  { id: 'appetizers', name: 'Appetizers', items: [
    { id: 'smallchops', name: 'Small Chops', price: 2500, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80', description: 'Puff puff, samosa, spring rolls' },
    { id: 'salad', name: 'Garden Salad', price: 2000, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', description: 'Fresh mixed greens with dressing' },
    { id: 'fruit', name: 'Fruit Platter', price: 3000, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80', description: 'Seasonal fresh fruits' },
  ]},
  { id: 'desserts', name: 'Desserts', items: [
    { id: 'cake', name: 'Cake Slice', price: 3000, category: 'Desserts', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', description: 'Rich chocolate or vanilla cake' },
    { id: 'pastries', name: 'Pastries', price: 1500, category: 'Desserts', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&q=80', description: 'Assorted meat and fish pies' },
    { id: 'icecream', name: 'Ice Cream', price: 2000, category: 'Desserts', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80', description: 'Premium local and imported flavors' },
  ]},
  { id: 'drinks', name: 'Drinks', items: [
    { id: 'juice', name: 'Fresh Juice', price: 2000, category: 'Drinks', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80', description: 'Freshly squeezed orange or pineapple' },
    { id: 'cocktail', name: 'Cocktails', price: 2500, category: 'Drinks', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80', description: 'Signature cocktails and mocktails' },
    { id: 'water', name: 'Bottled Water', price: 500, category: 'Drinks', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80', description: 'Premium bottled water' },
    { id: 'softdrinks', name: 'Soft Drinks', price: 800, category: 'Drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80', description: 'Assorted sodas and juices' },
  ]},
  { id: 'seafood', name: 'Seafood', items: [
    { id: 'shrimps', name: 'Grilled Shrimps', price: 6000, category: 'Seafood', image: 'https://images.unsplash.com/photo-1565680018093-ebb6b9e4a54e?w=400&q=80', description: 'Jumbo prawns with herbs' },
    { id: 'crab', name: 'Crab Feast', price: 7000, category: 'Seafood', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&q=80', description: 'Fresh crab with butter sauce' },
    { id: 'fish', name: 'Fish Pepper Soup', price: 4500, category: 'Seafood', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80', description: 'Traditional Nigerian fish soup' },
  ]},
];

export default function BuildYourMenu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState('rice');
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const currentCategory = menuCategories.find((cat) => cat.id === selectedCategory) || menuCategories[0];

  const toggleItem = (item: MenuItem) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
    setQuantities((prev) => ({
      ...prev,
      [item.id]: prev[item.id] || 1,
    }));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [itemId]: next };
    });
  };

  const total = selectedItems.reduce((sum, item) => {
    const qty = quantities[item.id] || 1;
    return sum + item.price * qty;
  }, 0);

  const estimatedGuests = Math.max(1, Math.floor(selectedItems.length * 15));

  const handleBookMenu = () => {
    if (selectedItems.length === 0) return;
    const itemList = selectedItems
      .map((item) => `${item.name} x${quantities[item.id] || 1}`)
      .join(', ');
    const message = encodeURIComponent(
      `Hello Rivers Kitchen,\n\nI have built a custom menu and would like to book.\n\nSelected Items:\n${itemList}\n\nTotal Estimate: ₦${total.toLocaleString()}\n\nPlease contact me to finalize the booking.`
    );
    window.open(`https://wa.me/234816165772?text=${message}`, '_blank');
  };

  return (
    <section id="build-menu" className="py-24 bg-black">
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
            Custom Menu Builder
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Build Your Own
            <span className="text-gold"> Menu</span>
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            Select your favorite dishes and build a custom menu for your event
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Tabs & Items */}
          <div className="lg:col-span-2">
            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-full font-button text-sm transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gold text-black'
                      : 'bg-zinc-800 text-cream hover:bg-zinc-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </motion.div>

            {/* Items Grid */}
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {currentCategory.items.map((item, index) => {
                const isSelected = selectedItems.some((i) => i.id === item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => toggleItem(item)}
                    className={`relative bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-4 border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'border-gold shadow-lg shadow-gold/20'
                        : 'border-gold/20 hover:border-gold/50'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-lg font-semibold text-cream mb-1">
                          {item.name}
                        </h3>
                        <p className="text-cream/60 text-sm mb-2">{item.description}</p>
                        <p className="text-gold font-button font-semibold">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        {isSelected ? (
                          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-black" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 border-2 border-gold/50 rounded-full flex items-center justify-center">
                            <Plus className="w-5 h-5 text-gold" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24 bg-gradient-to-br from-gold/20 to-gold/5 backdrop-blur-sm rounded-3xl p-6 border border-gold/30"
            >
              <h3 className="font-heading text-2xl font-bold text-cream mb-6">Your Menu</h3>

              {selectedItems.length === 0 ? (
                <p className="text-cream/60 text-center py-8">
                  Select items from the menu to build your custom catering menu
                </p>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-80 overflow-y-auto pr-2">
                    {selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-cream font-semibold text-sm truncate">{item.name}</p>
                          <p className="text-gold text-xs">₦{item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item.id, -1);
                            }}
                            className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-cream hover:bg-zinc-600"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-cream font-semibold w-6 text-center">
                            {quantities[item.id] || 1}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item.id, 1);
                            }}
                            className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-cream hover:bg-zinc-600"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 mb-6 pt-6 border-t border-gold/20">
                    <div className="flex justify-between text-cream/70">
                      <span>Total Items</span>
                      <span className="font-semibold">{selectedItems.length}</span>
                    </div>
                    <div className="flex justify-between text-cream/70">
                      <span>Est. Guests Served</span>
                      <span className="font-semibold">{estimatedGuests}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gold pt-3 border-t border-gold/20">
                      <span>Total</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBookMenu}
                    className="w-full bg-gold text-black py-4 rounded-full font-button font-semibold text-lg hover:bg-gold/90 transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Book This Menu
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
