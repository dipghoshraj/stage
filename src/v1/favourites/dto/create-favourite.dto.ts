import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsEmail, Length, Matches, isEmail, IsString, IsArray, IsEnum} from 'class-validator'

type ContectType = "Movie" | "TVShow"
const ContectType = {
    Movie: "Movie",
    TVShow: "TVShow",
}

export class CreateFavouriteDto {
    @ApiProperty()
    @IsString() // Assuming the reference key is a string
    contentId: string;
}