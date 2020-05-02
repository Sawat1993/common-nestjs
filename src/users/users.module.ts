import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TokenService } from './token/token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', () => console.log('New User Added'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, TokenService]
})
export class UsersModule {}
