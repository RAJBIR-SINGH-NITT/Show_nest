const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  await prisma.rating.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Seeding users...');
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  // 1. Customer User
  const customer = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'customer@shownest.com',
      password: hashedPassword,
      role: 'customer'
    }
  });

  // 2. Vendor User
  const vendor = await prisma.user.create({
    data: {
      username: 'pvr_cinemas',
      email: 'vendor@shownest.com',
      password: hashedPassword,
      role: 'vendor'
    }
  });

  // 3. Admin User
  const admin = await prisma.user.create({
    data: {
      username: 'admin_shownest',
      email: 'admin@shownest.com',
      password: hashedPassword,
      role: 'admin'
    }
  });

  console.log('Seeding events...');

  // Event 1 (Movies)
  await prisma.event.create({
    data: {
      title: 'Avengers: Secret Wars',
      category: 'Movies',
      price: 250.00,
      seatsAvailable: 45,
      location: 'PVR Cinemas, Mumbai',
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      vendorId: vendor.id
    }
  });

  // Event 2 (Concerts)
  await prisma.event.create({
    data: {
      title: 'Coldplay: Music of the Spheres Tour',
      category: 'Concerts',
      price: 4500.00,
      seatsAvailable: 12,
      location: 'D.Y. Patil Stadium, Navi Mumbai',
      date: new Date(Date.now() + 86400000 * 5), // 5 days from now
      vendorId: vendor.id
    }
  });

  // Event 3 (Shows)
  await prisma.event.create({
    data: {
      title: 'The Stand-up Show by Bassi',
      category: 'Shows',
      price: 800.00,
      seatsAvailable: 120,
      location: 'NCPA, Mumbai',
      date: new Date(Date.now() + 86400000 * 7), // 7 days from now
      vendorId: vendor.id
    }
  });

  console.log('Database seeded successfully!');
  console.log('Accounts created:');
  console.log('  Customer: customer@shownest.com / password123');
  console.log('  Vendor:   vendor@shownest.com / password123');
  console.log('  Admin:    admin@shownest.com / password123');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
