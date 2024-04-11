import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { UseCustomValidator } from 'src/common/validation/validators';
import { TokenModule } from '../token/token.module';
import { GoogleStrategy } from 'src/strategy/google';
import { SessionSerialize } from 'src/serialize';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [
    AuthController
  ],
  providers: [
    // PassportModule,
    AuthService,
    PrismaService,
    UseCustomValidator,
    GoogleStrategy,
    SessionSerialize
  ],
  imports: [
    UsersModule,
    TokenModule
  ]
})
export class AuthModule { }