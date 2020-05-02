import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TokenService } from '../shared/token/token.service';
import { PasswordService } from '../shared/password/password.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private userModel: Model<User>, private tokenService: TokenService, private passwordService: PasswordService) { }

    async create(user: User) {
        user.password = await this.passwordService.hash(user.password);
        const createUser = new this.userModel(user)
        return await createUser.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find({}, { password: 0 });
    }

    async findOne(id): Promise<User> {
        return await this.userModel.findById(id, { password: 0 });
    }

    async filter(start, limit): Promise<User[]> {
        return await this.userModel.find({}, { password: 0 }).skip(start).limit(limit);
    }

    async update(id, user) {
        return await this.userModel.findByIdAndUpdate(id, { $set: user });
    }

    async delete(id) {
        return await this.userModel.findByIdAndRemove(id);
    }

    async login(cred) {
        const user = await this.userModel.findOne({ userName: cred.userName });
        if (!user) return false;
        if (await this.passwordService.compare(cred.password, user.password)) {
            return this.tokenService.generateToken({ name: user.firstName + ' ' + user.lastName, role: user.role });
        }
        return false;
    }
}
