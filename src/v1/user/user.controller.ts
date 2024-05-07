import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/input/create-user.dto';
import { UpdateUserDto } from './dto/input/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {LoginUserDto} from './dto/input/login-user.dto'
import {UserResponse} from './dto/response/user.response.dto'
import {AddTOListDto} from './dto/input/add-list.dto'
import { AuthGuard } from 'src/guard/auth.gurd';
@ApiTags('Users')
@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto){
    return await this.userService.create(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto){
    return await this.userService.loginUser(loginUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // 


  @Post('/add-list') @ApiBearerAuth('access-token') @UseGuards(AuthGuard)
  async addtoList(@Req() req: any,  @Body() addtoListDto: AddTOListDto) {
    const userId = req.userId
    return await this.userService.AddtoListAsync(userId, addtoListDto);
  }


  @Get('/my-list') @ApiBearerAuth('access-token') @UseGuards(AuthGuard)
  async myList(@Req() req: any){
    const userId = req.userId
    return await this.userService.fetchListsandProfile(userId)
  }
}
