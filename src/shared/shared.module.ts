import { Module } from '@nestjs/common';
import { TokenService } from './token/token.service';
import { PasswordService } from './password/password.service';

@Module({
  providers: [TokenService, PasswordService],
  exports: [TokenService, PasswordService]
})
export class SharedModule {}
