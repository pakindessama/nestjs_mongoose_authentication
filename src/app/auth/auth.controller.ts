import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../data/dtos/create-user.dto';
import { LoginUserDto } from '../../data/dtos/login-user.dto'
import { Public } from '../guards/public.decorator';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('register') 
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.authService.register(createUserDto);
    }

    /**
     * This is a public function
     * @param loginUserDto
     */
    @Post('login') 
    @Public() 
    async login(@Body() loginUserDto: LoginUserDto){
        return await this.authService.validateUserByPassword(loginUserDto);
    }
}