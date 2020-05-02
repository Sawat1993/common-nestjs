import { Controller, Get, Query, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { User, UpdateUser } from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService, ) { }

    @Post()
    create(@Body() createUserDto: User) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(@Query() query: any) {
        return (query.start && query.limit) ? this.userService.filter(query.start, query.limit) : this.userService.findAll();
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() body) {
        const token = await this.userService.login(body);
        if (token) return token;
        throw new Error('UnAuthorized User');
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUser) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
