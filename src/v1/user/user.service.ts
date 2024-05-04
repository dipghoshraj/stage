import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/input/create-user.dto';
import { UpdateUserDto } from './dto/input/update-user.dto';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import {UserResponse} from './dto/response/user.response.dto'
import * as bcrypt from 'bcrypt';
import {LoginUserDto} from './dto/input/login-user.dto'
import { AddTOListDto} from './dto/input/add-list.dto'
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtservice: JwtService
  ){}
  
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const data: Prisma.UserCreateInput = {
      email: createUserDto.email,
      password: hashedPassword,
      mobile: createUserDto.mobile,
      username: createUserDto.username,
      favoriteGenres: createUserDto.favoriteGenres,
      dislikedGenres: createUserDto.dislikedGenres
    }

    const select: Prisma.UserSelect= UserResponse.selectUserPrisma();
    const userData = await this.prisma.user.create({
      data,
      select
    }).catch((error) => {
      console.log(error);
      if(error?.message.includes('Unique constraint failed')){
        throw new ConflictException(`${error?.meta?.target[0]} already exists`);
      }
    })

    console.log(userData);

    let access_token = await this.jwtservice.signAsync({uername: createUserDto.mobile})
    return {...userData, access_token: access_token}
  }


  async loginUser(loginUserDto: LoginUserDto) {
    const select: Prisma.UserSelect= {
      ...UserResponse.selectUserPrisma(),
      password: true
    };
    const where: Prisma.UserWhereInput = {mobile: loginUserDto.mobile}

    const userData = await this.prisma.user.findFirst({
      select,
      where
    });

    console.log(userData)

    if (userData && await bcrypt.compare(loginUserDto.password, userData.password)) {
      return { ...userData, access_token: await this.jwtservice.signAsync({userName: userData.username})};
    }
    
    throw new UnauthorizedException('User or password wrong')
  }


  async AddtoListAsync(addToListDto: AddTOListDto){

    const type = addToListDto.contentType
    if (type === 'Movie'){

      const data: Prisma.MyMoviesCreateInput = {
        movie: {
          connect: {
            id: addToListDto.contentId
          }
        }
      }

      const include: Prisma.MyMoviesInclude = {
        movie: true
      }


      const myMovies = await this.prisma.myMovies.create({
        data,
        include
      })

      return myMovies
    }else{

      const data: Prisma.MyShowsCreateInput = {
        tvShow: {
          connect: {
            id: addToListDto.contentId
          }
        }
      }

      const include: Prisma.MyShowsInclude = {
        tvShow: true
      }


      const myShows = await this.prisma.myShows.create({
        data,
        include
      })
      return myShows
    }
  }



  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
