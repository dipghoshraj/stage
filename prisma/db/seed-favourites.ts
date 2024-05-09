const { PrismaClient, Genre, ContentType } = require('@prisma/client');
const {ElasticSearchService} =  require('../../src/elastic-search/elastic-search.service.ts')
async function seedFavs() {

    const prisma = new PrismaClient();
    const elasticService =  new ElasticSearchService()

    const content = await prisma.content.findMany({where:{
        type: ContentType.TVShow,
    }, take: 50})

    const ids = content.map(c => c.id)
    console.log(ids)

    for(const id of  ids){
    }
}

seedFavs()