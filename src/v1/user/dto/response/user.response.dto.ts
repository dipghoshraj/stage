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
            preferences: {
                select: {
                    id: true,
                    dislikedGenres: true,
                    favoriteGenres: true,
                }
            },
            whatchHistory:{
                select: {
                    id: true,
                    contentId: true,
                    watchedOn: true,
                    rating: true,
                }
            }
        }
    }
}
  