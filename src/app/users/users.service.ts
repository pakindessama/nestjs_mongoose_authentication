import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../../data/interfaces/user.interface';
import { CreateUserDto } from '../../data/dtos/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findOneByCondition(condition): Promise<IUser> {
    return await this.userModel.findOne(condition);
  }

  async findByCondition(condition): Promise<IUser[]> {
    return await this.userModel.find(condition).select('username email phone -_id');
  }

  async findAll(): Promise<IUser[]>{
      return await this.userModel.find().select('username email phone -_id');
  }
}