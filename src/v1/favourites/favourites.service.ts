import { Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponse } from '../user/dto/response/user.response.dto';
import { FetchFavouriteDto} from './dto/fetch-favourites.dto';
import { FavouritesResponse} from './dto/response/favourite.response.dto'
import {ElasticSearchService} from 'src/elastic-search/elastic-search.service'
@Injectable()
export class FavouritesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly elasticSearchService: ElasticSearchService

  ){}

  async AddtoListAsync(userId: string, createFavouriteDto: CreateFavouriteDto){

    const data: Prisma.FavoriteCreateInput = {
      user: {
        connect: {
          id: userId
        }
      },
      Content: {
        connect: {
          id: createFavouriteDto.contentId
        }
      }
    }
    const myMovies = await this.prisma.favorite.create({data, include: {Content: true}})
    this.syncToes(myMovies.id)
    return myMovies
  }


  async fetchWithEs(userId: string, fetchFavouriteDto: FetchFavouriteDto){
    const query =  {
      query: {
        match: {
          userId: userId
        }
      }
    }
    const response = await this.elasticSearchService.searchDocuments( 'favourites',query, fetchFavouriteDto.page, fetchFavouriteDto.limit);
    const hists =  response.hits.hits?.map(hit => hit._source)
    return hists;
  }


  async deleteFavourites(userId: string, favid: string){
    const where: Prisma.FavoriteWhereUniqueInput = {id: favid, userId: userId}
    const deleteDoc = await this.prisma.favorite.delete({
      where
    })
    await this.elasticSearchService.deleteDocument('favourites', favid)
    return deleteDoc
  }


  async syncToes(favoriteId: string){

    const body = await this.singleFavorite(favoriteId)
    await this.elasticSearchService.indexFavDocument('favourites', body)
  }


  async singleFavorite(favid: string){
    const select: Prisma.FavoriteSelect = {
      id: true,
      userId: true,
      Content: {
        select: {
          id: true,
          title: true,
          type: true,
          description: true,
          episodes:{
            select: {
              id: true,
              episodeNumber: true,
              seasonNumber: true,
            }
          },
          director: {
            select: {
              name: true,
            }
          },
          actors: {
            select: {
              actor: {
                select: {name: true}
              }
            }
          }
        }
      }
    }

    const where: Prisma.FavoriteWhereInput = {
      id: favid
    }

    const favCOntents =  await this.prisma.favorite.findFirst({select, where})
    return FavouritesResponse.fromMap(favCOntents)
  }


}
