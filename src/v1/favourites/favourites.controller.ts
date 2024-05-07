import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.gurd';

import { FetchFavouriteDto} from './dto/fetch-favourites.dto';


@ApiTags('Favourites')
@Controller('v1/favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post() @ApiBearerAuth('access-token') @UseGuards(AuthGuard)
  create(@Req() req: any,  @Body() createFavouriteDto: CreateFavouriteDto) {
    const userId = req.userId
    return this.favouritesService.AddtoListAsync(userId, createFavouriteDto);
  }

  @Get()  @ApiBearerAuth('access-token') @UseGuards(AuthGuard)
  findAll(@Req() req: any, @Param() fetchFavouriteDto: FetchFavouriteDto) {
    const userId = req.userId
    if(!userId){
      throw new UnauthorizedException();
    }
    console.log(userId);
    return this.favouritesService.fetchListsandProfile(userId, fetchFavouriteDto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    const userId = req.userId
    return this.favouritesService.remove(+id);
  }
}
