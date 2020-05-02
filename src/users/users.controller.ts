import { Controller, Get, Query, Post, Body, Put, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { User, UpdateUser } from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService, ) { }

    @Post()
    async create(@Body() createUserDto: User) {
        try {
            await this.userService.create(createUserDto);
        } catch (e) {
            if(e.code == '11000') throw new HttpException('User Already Exist', HttpStatus.BAD_REQUEST);
            throw new Error();
        }
    }

    @Get()
    async findAll(@Query() query: any) {
        const users = (query.start && query.limit) ? await this.userService.filter(query.start, query.limit) :
            await this.userService.findAll();
        if (users) return users;
        throw new HttpException('User Not Founf', HttpStatus.NOT_FOUND);
    }

    @Post('login')
    async login(@Body() body) {
        const token = await this.userService.login(body);
        if (token) return token;
        throw new HttpException('Unauthorized User', HttpStatus.UNAUTHORIZED);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.userService.findOne(id);
        if (user) return user;
        throw new HttpException('User Not Founf', HttpStatus.NOT_FOUND);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUser) {
        const user = await this.userService.update(id, updateUserDto);
        if (user) return user;
        throw new HttpException('User Not Founf', HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const user = await this.userService.delete(id);
        if (user) return user;
        throw new HttpException('User Not Founf', HttpStatus.NOT_FOUND);
    }
}
