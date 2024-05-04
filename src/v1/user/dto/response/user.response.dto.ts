import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';

export class UserResponse {
    id: string
    username: string
    mobile: string
    email: string
    access_token: string

    static selectUserPrisma(): Prisma.UserSelect {
        return {
            id: true,
            username: true,
            mobile: true,
            email: true,
            whatchHistory:{
                select: {
                    id: true,
                    contentId: true,
                    watchedOn: true,
                    rating: true,
                }
            },
            prefrance:{
                select: {
                    id: true,
                    favoriteGenres: true,
                    dislikedGenres: true
                }
            }
        }
    }
}
  