// const bcrypt = require('bcrypt');
// const { PrismaClient, Genre } = require('@prisma/client');




// async function seedData() {
//   const prisma = new PrismaClient();

//   try {
//     // Sample data
//     const users = [
//       {
//         email: 'user1@example.com',
//         mobile: '9876543210',
//         password: await bcrypt.hash('password1', 10),
//         username: 'user1',
//         favoriteGenres: [Genre.Action, Genre.SciFi],
//         dislikedGenres: [Genre.Horror]
//       },
//       {
//         email: 'user2@example.com',
//         mobile: '9876543211',
//         password: await bcrypt.hash('password1', 10),
//         username: 'user2',
//         favoriteGenres: [Genre.Comedy, Genre.Drama],
//         dislikedGenres: [Genre.Fantasy]
//       }
//     ];

//     // Initialize Prisma client
//     const prisma = new PrismaClient();

//     // Seed users
//     for (const userData of users) {
//       await prisma.user.create({ data: userData });
//     }

//     console.log('Data seeded successfully!');
//   } catch (error) {
//     console.error('Error seeding data:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// seedData();
