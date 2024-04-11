import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from 'src/common/dto/user';
import { AppErrors } from 'src/common/errors';
import * as bcrypt from 'bcrypt'
import { UseCustomValidator } from 'src/common/validation/validators';



@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly validateService: UseCustomValidator
    ) { }

    public async createUser(dto: CreateUserDto) {
        await this.validateService.unique([
            { table: 'user', column: 'email', value: dto.email },
            { table: 'user', column: 'phone', value: dto.phone },
        ])
        // const checkEmail = await this.prismaService.user.findUnique({
        //     where: {
        //         email: dto.email
        //     },
        // })
        // if (checkEmail) throw new BadRequestException(AppErrors.USER_EXIST)
        // const checkNumber = await this.prismaService.user.findUnique({
        //     where: {
        //         phone: dto.phone
        //     }
        // })
        // if (checkNumber) throw new BadRequestException(AppErrors.USER_PHONE_EXIST)
        const salt = await bcrypt.genSalt();
        dto.password = await this.createPass(dto.password, salt);
        return this.prismaService.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                surname: dto.surname,
                phone: dto.phone,
                password: dto.password,
            }
        })

    }

    public async getAllUsers() {
        return await this.prismaService.user.findMany()
    }


    private async createPass(password: string, salt: number) {
        return bcrypt.hash(password, salt)
    }

    public async getUserWithPhone(phone: string) {
        const user = this.prismaService.user.findFirst({ where: { phone } })
        if (!user) throw new HttpException({ message: 'Пользователь не найден' }, 404)
        return user
    }


}
