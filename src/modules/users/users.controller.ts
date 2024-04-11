import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @Get()
    async getAll() {
        return this.userService.getAllUsers()
    }
}
