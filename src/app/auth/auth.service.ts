import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../../data/dtos/login-user.dto';
import { CreateUserDto } from '../../data/dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from '../../data/interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService){

    }

    async validateUserByPassword(loginAttempt: LoginUserDto) {

        // This will be used for the initial login
        const userToAttempt = await this.usersService.findOneByCondition({"username":loginAttempt.username});
        
        return new Promise((resolve) => {

            // Check the supplied password against the hash stored for this email address
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
    
                if(err) throw new UnauthorizedException();
    
                if(isMatch){
                    // If there is a successful match, generate a JWT for the user
                    resolve(this.createJwtPayload(userToAttempt));
    
                } else {
                    throw new UnauthorizedException();
                }
    
            });

        });

    }

    async validateUserByJwt(payload: JwtPayload) { 

        // This will be used when the user has already logged in and has a JWT
        const user = await this.usersService.findOneByCondition({"_id": payload.id});

        if(user){
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }

    }

    async register(createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto);
    }

    createJwtPayload(user){

        const data: JwtPayload = {
            id: user._id
        };

        const jwt = this.jwtService.sign(data);
        const temp = {"username":user.username, "email":user.email}
        return {
            expiresIn: 3600,
            token: jwt,
            user: temp
        }
    }

}