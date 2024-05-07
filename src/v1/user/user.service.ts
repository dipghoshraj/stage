import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/input/create-user.dto';
import { UpdateUserDto } from './dto/input/update-user.dto';
import { Genre, Prisma } from '@prisma/client';
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
    const userData: UserResponse = await this.prisma.user.create({
      data,
      select
    })

    console.log(userData);

    let access_token = await this.jwtservice.signAsync({mobile: createUserDto.mobile, userId: userData?.id})
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
      return { ...userData, access_token: await this.jwtservice.signAsync({mobile: userData.mobile, userId: userData?.id})};
    }
    
    throw new UnauthorizedException('User or password wrong')
  }
}
