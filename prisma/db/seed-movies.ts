const bcrypt = require('bcrypt');
const { PrismaClient, Genre } = require('@prisma/client');

async function seedMoviews() {
  const prisma = new PrismaClient();

  try {
    const movies = [];
    for (let i = 1; i <= 15; i++) {
      movies.push({
        title: `Movie ${i}`,
        description: `Description of Movie ${i}`,
        genres: { set: [Genre.Action, Genre.SciFi] },
        releaseDate: new Date(`2023-01-${i < 10 ? '0' + i : i}`),
        director: `Director ${i}`,
        actors: { set: [`Actor ${i}`, `Actor ${i + 1}`] }
      });
    }

    const tvShows = [];
    for (let i = 1; i <= 15; i++) {
      tvShows.push({
        title: `TV Show ${i}`,
        description: `Description of TV Show ${i}`,
        genres: { set: [Genre.Comedy, Genre.Drama] },
      });
    }

    // const episodes = [];
    // for (let i = 1; i <= 30; i++) {
    //   episodes.push({
    //     episodeNumber: i,
    //     seasonNumber: Math.ceil(i / 10),
    //     releaseDate: new Date(`2022-05-${i < 10 ? '0' + i : i}`),
    //     director: `Director ${i}`,
    //     actors: { set: [`Actor ${i}`, `Actor ${i + 1}`] }
    //   });
    // }

    // Initialize Prisma client
    const prisma = new PrismaClient();

    // Seed movies
    // for (const movieData of movies) {
    //   await prisma.movie.create({ data: movieData });
    // }

    // Seed TV shows
    for (const tvShowData of tvShows) {
      await prisma.tVShow.create({ data: tvShowData });
    }

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedMoviews();
