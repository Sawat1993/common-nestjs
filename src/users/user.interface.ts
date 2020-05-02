import { Document } from 'mongoose';

export interface User extends Document {
    firstName: string;
    lastName: string;
    userName: string;
    role: string;
    password: string;
}

export interface UpdateUser extends Document {
    firstName: string;
    lastName: string;
    userName: string;
    role: string;
}