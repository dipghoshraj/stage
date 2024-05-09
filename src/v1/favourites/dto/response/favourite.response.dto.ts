import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { response } from 'express';


class Episodes {
    id: string;
    episodeNumber: number;
    seasonNumber: number
}


class Content{
    id: string;
    title: string;
    type: string;
    description: string;
    episodes: Episodes[];
    actors: string[];
    director: string


    static fromMap(data: any): Content {
        const response = new Content()

        response.id = data.id
        response.title = data.title
        response.type = data.type
        response.description = data.description


        response.episodes = data.episodes
        response.actors = data.actors.map(act => act.actor.name)
        response.director = data.director.name
        return response
    }
}


export class FavouritesResponse {

    id: string;
    content: Content
    userId: string

    static fromMap(data: any): FavouritesResponse {
        const response = new FavouritesResponse();
        // console.log(data);
        response.id = data.id;
        response.userId = data.userId;
        response.content = Content.fromMap(data.Content) 
        return response;
    }
}