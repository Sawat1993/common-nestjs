import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UsersService {
    private users: User[] = [];

    create(cat: User) {
        this.users.push(cat);
    }

    findAll(): User[] {
        return this.users;
    }

    findOne(id): User {
        return this.users.find(user => user.id === id);
    }

    filter(start, limit): User[] {
        return this.users.filter((user, index) => index >= start && index - start <= limit);
    }

    update(id, user) {
        for (let index = 0; index < this.users.length; index++) {
            let oldUser = this.users[index];
            if (id === oldUser.id) {
                oldUser = user;
                return;
            }
        }
    }

    delete(id) {
        this.users = this.users.filter(user => user.id != id);
    }
}
