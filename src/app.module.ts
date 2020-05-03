import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from './auth.gaurd';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/m3bi', { useNewUrlParser: true, useUnifiedTopology: true })
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }],
})
export class AppModule { }
