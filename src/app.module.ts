import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import {UserService} from './v1/user/user.service';
import {UserController} from './v1/user/user.controller'
import { FavouritesController} from './v1/favourites/favourites.controller'
import { FavouritesService} from './v1/favourites/favourites.service'
import { ElasticSearchService } from './elastic-search/elastic-search.service';
@Module({
  imports: [PrismaModule, 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AppController, UserController, FavouritesController],
  providers: [AppService, UserService, FavouritesService, ElasticSearchService],
})
export class AppModule {}
