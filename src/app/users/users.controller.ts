import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from 'src/data/interfaces/user.interface';

@Controller('users')
//We need to logged in to create or get of list of users
export class UsersController {

    constructor(private usersService: UsersService) {}

   
    @Post('all')
    @UseGuards(AuthGuard())
    async getAll(){
        return await this.usersService.findAll();
    }
    
    @Post('condition')
    @UseGuards(AuthGuard())
    async getByCondition(@Body() condition): Promise<IUser[]>{
        return await this.usersService.findByCondition(condition)
    }
}