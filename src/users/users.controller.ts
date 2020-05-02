import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { User } from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post()
    create(@Body() createUserDto: User) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(@Query() query: any) {
        return (query.start && query.limit) ? this.userService.filter(query.start, query.limit) : this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: User) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
