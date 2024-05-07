import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';



class WatchHistoryResponse {
    id: string
    contentId: string
    watchedOn: Date
    rating: number
}
export class UserResponse {
    id?: string
    username?: string
    mobile?: string
    email?: string
    access_token?: string
    watchHistory?:  WatchHistoryResponse[]



    static selectUserPrisma(): Prisma.UserSelect {
        return {
            id: true,
             mobile: true,
            email: true,
            watchHistory: {
                select:{
                    id: true,
                    contentId: true,
                    watchedOn: true,
                    rating: true,
                }
            },
            favoriteGenres: true,
            dislikedGenres: true,
        }
    }
}
  