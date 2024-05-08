import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtservice: JwtService
    ){}

    async canActivate(context: ExecutionContext) {
        
        
        const request = context.switchToHttp().getRequest();
        if(!request.headers['authorization']) throw new UnauthorizedException();

        const token = request.headers['authorization'].split(' ')[1];
        if(!token) {
            throw new UnauthorizedException();

        }
        try{
            let decoded = await this.jwtservice.verifyAsync(token);
            console.log(decoded);
            if(!decoded|| !decoded.userId){
                throw new UnauthorizedException();
            }
            request.userId = decoded.userId;
            return true;
        }catch(err){
            throw new UnauthorizedException();
        }
    }
}