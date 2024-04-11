import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto, GoogleAuthDto } from 'src/common/dto/user';
import { TokenService } from '../token/token.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcryptjs from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly tokenService: TokenService,
        private readonly prismaService: PrismaService) { }


    public async registerUser(dto: CreateUserDto) {
        const newUser = await this.userService.createUser(dto)
        const payload = {
            name: newUser.name,
            email: newUser.email
        }
        const { password, ...someData } = newUser
        const token = await this.tokenService.generateJwtToken(payload)
        return {
            ...someData, token
        }
    }


    public async login(userDto: CreateUserDto) {
        const token = await this.tokenService.generateJwtToken(userDto)
        return {
            ...userDto,
            token
        }
    }


    public async checkUser(email: string, password: string) {
        const user = await this.prismaService.user.findFirst({ where: { email } })
        if (!user) throw new BadRequestException({ message: 'Неправильный логин или пароль!' })
        const check = await bcryptjs.compare(password, user.password)
        if (!check) throw new BadRequestException({ message: 'Неправильный логин или пароль!' })
        return user
    }

    public async validateUser(email: string, password: string): Promise<any> {
        const user = await this.prismaService.user.findFirst({ where: { email } })
        if (!user) return null;
        const passwordEquals = await bcryptjs.compare(password, user.password)
        if (user && passwordEquals) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }


    public async googleValidate(googleDto: GoogleAuthDto) {
        const checkUser = await this.prismaService.user.findFirst({ where: { email: googleDto.email } })
        if (checkUser) {
            return this.login(checkUser)
        }
        const newUser: CreateUserDto = {
            surname: googleDto.familyName,
            name: googleDto.givenName,
            password: process.env.PASSWORD_FOR_ACCOUNT_GOOGLE,
            email: googleDto.email,
            phone: null,
        }
        return this.registerUser(newUser)
    }

}
