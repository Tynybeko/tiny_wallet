import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from './users.controller';
import { UseCustomValidator } from 'src/common/validation/validators';

@Module({
    providers: [UsersService, PrismaService, UseCustomValidator],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {

}
