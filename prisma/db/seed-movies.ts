// const bcrypt = require('bcrypt');
// const { PrismaClient, Genre, ContentType } = require('@prisma/client');

// async function seedMoviews() {
//   const prisma = new PrismaClient();

//   try {
//     const content = [];


//     // const tvShows = [];
//     // for (let i = 1; i <= 500; i++) {
//     //   tvShows.push({
//     //     title: `TV Show ${i}`,
//     //     description: `Description of TV Show ${i}`,
//     //     genres: { set: [Genre.Comedy, Genre.Drama] },
//     //     episodes: {
//     //         createMany: {
//     //             data: Array.from({ length: 20 }, (_, i) => ({
//     //               episodeNumber: i + 1,
//     //               seasonNumber: Math.ceil((i + 1) / 10),
//     //               releaseDate: new Date(`2022-05-${i + 1 < 10 ? '0' + (i + 1) : (i + 1)}`),
//     //               director: `Director ${i + 1}`,
//     //               actors: { set: [`Actor ${i + 1}`, `Actor ${i + 2}`] },
//     //             })),
//     //         }
//     //     }
//     //   });
//     // }
//     const prisma = new PrismaClient();

//     // Seed TV shows
//     // for (const tvShowData of tvShows) {
//     //   await prisma.tVShow.create({ data: tvShowData });
//     // }

//     // content.push({
//     //   title: `Movie ${i}`,
//     //   description: `Description of Movie ${i}`,
//     //   genres: { set: [Genre.Action, Genre.SciFi] },
//     //   releaseDate: new Date(`2023-01-${i < 10 ? '0' + i : i}`),
//     //   director: `Director ${i}`,
//     //   actors: { set: [`Actor ${i}`, `Actor ${i + 1}`] }
//     // });


//       // const actors = await prisma.director.createMany({
//       //   data: Array.from({ length: 20 }, (_, i) => ({
//       //     name: `director ${i}`
//       //   }))
//       // })

//     for (let i = 1; i <= 100; i++) {
//       const content = await prisma.content.create({ data: {
//           title: `Movie ${i}`,
//           description: `Description of Movie ${i}`,
//           genres: { set: [Genre.Action, Genre.SciFi] },
//           releaseDate: new Date(`2023-01-${(Math.floor(Math.random() * (30 - 10 + 1)) + 10)}`),
//           type: ContentType.TVShow,
//           director: {
//             connect: {
//               id: "663a7cbd862fe5fae5222c43"
//             }
//           },
//           episodes: {
//             createMany: {
//               data: Array.from({ length: 15 }, (_, i) => ({
//                 episodeNumber: i + 1,
//                 seasonNumber: Math.ceil((i + 1) / 10),
//               })),
//           }
//           }
//         }
//       });

//       await prisma.ContentActor.create({data: {
//         Content: {
//           connect: {
//             id: content.id
//           }
//         },
//         actor: {
//           connect: {id: "663a7c9b3e835444350a9697"}
//         }
//       }})

//       await prisma.ContentActor.create({data: {
//         Content: {
//           connect: {
//             id: content.id
//           }
//         },
//         actor: {
//           connect: {id: "663a7c9b3e835444350a9699"}
//         }
//       }})
      
//     }

//     console.log('Data seeded successfully!');
//   } catch (error) {
//     console.error('Error seeding data:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// seedMoviews();
