import { Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponse } from '../user/dto/response/user.response.dto';
import { FetchFavouriteDto} from './dto/fetch-favourites.dto';
import { FavouritesResponse} from './dto/response/favourite.response.dto'
@Injectable()
export class FavouritesService {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  findAll() {
    return `This action returns all favourites`;
  }

  remove(id: number) {
    return `This action removes a #${id} favourite`;
  }

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
    return myMovies
  }


  async fetchListsandProfile(userId: string, fetchFavouriteDto: FetchFavouriteDto){
    const limit = 10;
    const lastdoc =  fetchFavouriteDto.lastDoc


    const where: Prisma.FavoriteWhereInput = {
      userId: userId
    }

    const select: Prisma.FavoriteSelect = {
      id: true,
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

    if (lastdoc) where.id = {
      gt: lastdoc
    }

    console.log(where, fetchFavouriteDto)
    const favCOntents =  await this.prisma.favorite.findMany({select, where, take: limit});
    let lastContentId;

    if (favCOntents.length > 0) {
      lastContentId = favCOntents[favCOntents.length - 1].id;
    }
    const fav = favCOntents.map(content => FavouritesResponse.fromMap(content))
    return {contents: fav, lastDoc: lastContentId}
  }


  async deleteFavourites(userId: string, favid: string){

    const where: Prisma.FavoriteWhereUniqueInput = {id: favid, userId: userId}

    const deleteDoc = await this.prisma.favorite.delete({
      where
    })

    return deleteDoc
  }


}
