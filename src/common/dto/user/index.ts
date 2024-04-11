import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, Min, Validate } from "class-validator"


export class CreateUserDto {
    @ApiProperty({ description: 'Email пользователя', example: 'example@gmail.com' })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string


    @ApiProperty({ description: 'Имя пользователя', example: 'Иван', required: false })
    @IsString()
    @IsNotEmpty()
    name: string


    @ApiProperty({ description: 'Пароль пользователя', example: '************' })
    @IsString()
    @IsStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 2, minSymbols: 0 })
    @IsNotEmpty()
    password: string


    @ApiProperty({ description: 'Фамилия пользователя', example: 'Иванов', required: false })
    @IsString()
    @IsNotEmpty()
    surname: string


    @ApiProperty({ description: 'Телефон пользователя', example: '+996559020199' })
    @IsString()
    @IsPhoneNumber('KG')
    @IsNotEmpty()
    phone: string

}

export class GoogleAuthDto {
    id: string
    email: string
    familyName: string
    givenName: string
    photos: { value: string }[]
}