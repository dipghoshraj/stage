const { PrismaClient, Genre, ContentType } = require('@prisma/client');

async function seedFavs() {

    const prisma = new PrismaClient();
    const content = await prisma.content.findMany({where:{
        type: ContentType.TVShow,
    }, take: 50})

    const ids = content.map(c => c.id)
    console.log(ids)

    for(const id of  ids){
        await prisma.favorite.create({
            data: {
                Content: {
                    connect:{
                        id: id
                    }
                },
                user: {
                    connect:{
                        id: '663a85d3634e2c34fb0ed0a3'
                    }
                }
            }
        })
    }
}

seedFavs()