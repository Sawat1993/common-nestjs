import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TokenService } from './token/token.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, TokenService]
})
export class UsersModule {}
