import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import {IsNotEmpty, IsEmail, Length, Matches, isEmail, IsString, IsArray, IsEnum} from 'class-validator'

type ContectType = "Movie" | "TVShow"



export class AddTOListDto {

    @ApiProperty()
    @IsEnum(Genre, { each: true })
    contentType: ContectType;


    @ApiProperty()
    @IsString() // Assuming the reference key is a string
    contentId: string;
}