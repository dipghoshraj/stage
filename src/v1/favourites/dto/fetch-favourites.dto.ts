import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsEmail, Length, Matches, isEmail, IsString, IsArray, IsEnum, IsNumber, IsOptional} from 'class-validator'

export class FetchFavouriteDto {
    
    @ApiProperty()
    @IsNumber()
    page: number

    @ApiProperty()
    @IsNumber()
    limit: number

}