import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import {IsNotEmpty, IsEmail, Length, Matches, isEmail, IsString, IsArray, IsEnum} from 'class-validator'
import { Genre } from '@prisma/client'


export class CreateUserDto {

    @ApiProperty()
    @Length(3, 20, {message: 'Please enter username from 3 to 20 character'})
    username: string;

    @ApiProperty()
    @Length(8, 16, {message: "password must be 8 to 16 character"})
    password: string;

    @ApiProperty()
    @Matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, { message: 'Invalid mobile number' })
    mobile: string;

    @ApiProperty()
    @IsEmail({}, {message: 'Please enter valid email address'})
    email: string;

    @ApiProperty()
    @IsArray()
    @IsEnum(Genre, { each: true })
    favoriteGenres: Genre[];

    @ApiProperty()
    @IsArray()
    @IsEnum(Genre, { each: true })
    dislikedGenres: Genre[];

}
