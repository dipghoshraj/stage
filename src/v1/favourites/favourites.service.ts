import { Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponse } from '../user/dto/response/user.response.dto';
import { FetchFavouriteDto} from './dto/fetch-favourites.dto';
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

    if (lastdoc) where.id = {
      gt: lastdoc
    }

    console.log(where)

    const favCOntents =  await this.prisma.favorite.findMany({where, take: limit});
    let lastContentId;

    if (favCOntents.length > 0) {
      lastContentId = favCOntents[favCOntents.length - 1].id;
    }
    
    return {contents: favCOntents, lastDoc: lastContentId}
  }


}
