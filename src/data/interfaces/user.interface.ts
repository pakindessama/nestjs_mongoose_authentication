import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document{
    checkPassword(password: string, arg1: (err: any, isMatch: any) => void);
    email: string,
    username: string,
    password: string,
    phone: number
    
}