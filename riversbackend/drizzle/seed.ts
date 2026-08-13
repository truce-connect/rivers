import { db } from '../src/db';
import { menuPackages } from '../src/db/schema';

async function seed() {
  const packages = [
    {
      name: 'Traditional Wedding',
      description: 'Authentic Nigerian cuisine for your traditional marriage ceremony',
      price: 2500000,
      guestCapacity: '200 - 500',
      image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80',
      items: ['Jollof Rice', 'Fried Rice', 'Assorted Meat', 'Peppered Turkey', 'Small Chops', 'Drinks'],
      isActive: true,
    },
    {
      name: 'White Wedding',
      description: 'Elegant continental and African fusion for your special day',
      price: 3000000,
      guestCapacity: '200 - 500',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
      items: ['Continental Dishes', 'Jollof Rice', 'Grilled Chicken', 'Salad Bar', 'Desserts', 'Champagne'],
      isActive: true,
    },
    {
      name: 'Birthday Party',
      description: 'Fun, vibrant, and delicious catering for milestone celebrations',
      price: 500000,
      guestCapacity: '50 - 200',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
      items: ['Jollof Rice', 'Fried Rice', 'Grilled Chicken', 'Small Chops', 'Cake', 'Drinks'],
      isActive: true,
    },
    {
      name: 'Corporate Event',
      description: 'Sophisticated catering for business gatherings and conferences',
      price: 800000,
      guestCapacity: '50 - 200',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
      items: ['Continental Buffet', 'Local Rice', 'Grilled Proteins', 'Salad Bar', 'Desserts', 'Coffee'],
      isActive: true,
    },
  ];

  for (const pkg of packages) {
    await db.insert(menuPackages).values(pkg);
  }

  console.log('Database seeded successfully');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
