import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/common/dto/user';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleAuthGuard } from 'src/guards/google';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiResponse({ status: 200, type: CreateUserDto })
    @Post('register')
    registerUser(@Body() dto: CreateUserDto) {
        return this.authService.registerUser(dto)
    }


    @ApiOperation({ summary: 'Ссылка для авторизоции Google' })
    @Get('/google/login')
    @UseGuards(GoogleAuthGuard)
    googleLogin() {
    }

    @Get('/google/redirect')
    @UseGuards(GoogleAuthGuard)
    googleRedicrect(@Req() req: any) {
        

        return (
            `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Google Auth Redirect Page</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f2f2f2;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
                  gap: 20px;
                  height: 100vh;
              }
      
              .container {
                  text-align: center;
              }
      
              .message {
                  font-size: 24px;
                  margin-bottom: 20px;
              }
      
              .redirecting {
                  font-size: 18px;
                  color: #666;
              }
      
              .google-spinner {
                  width: 100px;
                  height: 100px;
                  border-radius: 50px;
                  position: relative;
                  -webkit-animation: spinner 3.68s linear infinite;
                  animation: spinner 3.68s linear infinite;
              }
      
              .google-spinner:before,
              .google-spinner:after {
                  content: "";
                  position: absolute;
                  width: 100px;
                  height: 50px;
                  left: 0;
              }
      
              .google-spinner:before {
                  top: 0;
                  background-color: #de4a42;
                  border-radius: 50px 50px 0 0;
                  -webkit-animation: spinner-before 3.68s linear infinite;
                  animation: spinner-before 3.68s linear infinite;
              }
      
              .google-spinner:after {
                  bottom: 0;
                  background-color: #3a7bf7;
                  border-radius: 0 0 50px 50px;
                  -webkit-animation: spinner-after 3.68s linear infinite;
                  animation: spinner-after 3.68s linear infinite;
              }
      
              .google-spinner .spinner-inner {
                  position: absolute;
                  z-index: 9999;
                  left: 0;
                  top: 0;
                  width: 100px;
                  height: 50px;
                  border-radius: 50px 50px 0 0;
                  background-color: #de4a42;
                  -webkit-animation: spinner-inner 3.68s linear infinite;
                  animation: spinner-inner 3.68s linear infinite;
                  transform-origin: 50px 50px;
              }
      
              @-webkit-keyframes spinner {
      
                  0%,
                  25% {
                      transform: rotate(0);
                  }
      
                  25.0001%,
                  50% {
                      transform: rotate(-90deg);
                  }
      
                  50.0001%,
                  75% {
                      transform: rotate(-180deg);
                  }
      
                  75.0001%,
                  100% {
                      transform: rotate(-270deg);
                  }
              }
      
              @keyframes spinner {
      
                  0%,
                  25% {
                      transform: rotate(0);
                  }
      
                  25.0001%,
                  50% {
                      transform: rotate(-90deg);
                  }
      
                  50.0001%,
                  75% {
                      transform: rotate(-180deg);
                  }
      
                  75.0001%,
                  100% {
                      transform: rotate(-270deg);
                  }
              }
      
              @-webkit-keyframes spinner-inner {
      
                  0%,
                  100% {
                      background-color: #3a7bf7;
                      transform: rotateX(0);
                  }
      
                  12.5% {
                      background-color: #0a5af4;
                      transform: rotateX(-90deg);
                  }
      
                  12.5001% {
                      background-color: #e6746d;
                      transform: rotateX(-90deg);
                  }
      
                  25% {
                      background-color: #de4a42;
                      transform: rotateX(-180deg);
                  }
      
                  37.5% {
                      background-color: #e6746d;
                      transform: rotateX(-90deg);
                  }
      
                  37.5001% {
                      background-color: #ffd64a;
                      transform: rotateX(-90deg);
                  }
      
                  50% {
                      background-color: #ffd64a;
                      transform: rotateX(0);
                  }
      
                  62.5% {
                      background-color: #ffe27d;
                      transform: rotateX(-90deg);
                  }
      
                  62.5001% {
                      background-color: #19824a;
                      transform: rotateX(-90deg);
                  }
      
                  75% {
                      background-color: #21ad63;
                      transform: rotateX(-180deg);
                  }
      
                  87.5% {
                      background-color: #2bd67c;
                      transform: rotateX(-90deg);
                  }
      
                  87.5001% {
                      background-color: #6b9cf9;
                      transform: rotateX(-90deg);
                  }
              }
      
              @keyframes spinner-inner {
      
                  0%,
                  100% {
                      background-color: #3a7bf7;
                      transform: rotateX(0);
                  }
      
                  12.5% {
                      background-color: #0a5af4;
                      transform: rotateX(-90deg);
                  }
      
                  12.5001% {
                      background-color: #e6746d;
                      transform: rotateX(-90deg);
                  }
      
                  25% {
                      background-color: #de4a42;
                      transform: rotateX(-180deg);
                  }
      
                  37.5% {
                      background-color: #e6746d;
                      transform: rotateX(-90deg);
                  }
      
                  37.5001% {
                      background-color: #ffd64a;
                      transform: rotateX(-90deg);
                  }
      
                  50% {
                      background-color: #ffd64a;
                      transform: rotateX(0);
                  }
      
                  62.5% {
                      background-color: #ffe27d;
                      transform: rotateX(-90deg);
                  }
      
                  62.5001% {
                      background-color: #19824a;
                      transform: rotateX(-90deg);
                  }
      
                  75% {
                      background-color: #21ad63;
                      transform: rotateX(-180deg);
                  }
      
                  87.5% {
                      background-color: #2bd67c;
                      transform: rotateX(-90deg);
                  }
      
                  87.5001% {
                      background-color: #6b9cf9;
                      transform: rotateX(-90deg);
                  }
              }
      
              @-webkit-keyframes spinner-before {
      
                  0%,
                  50% {
                      background-color: #de4a42;
                  }
      
                  50.0001%,
                  99.9999% {
                      background-color: #21ad63;
                  }
              }
      
              @keyframes spinner-before {
      
                  0%,
                  50% {
                      background-color: #de4a42;
                  }
      
                  50.0001%,
                  99.9999% {
                      background-color: #21ad63;
                  }
              }
      
              @-webkit-keyframes spinner-after {
      
                  0%,
                  25% {
                      background-color: #3a7bf7;
                  }
      
                  25.0001%,
                  75% {
                      background-color: #ffd64a;
                  }
      
                  75.0001%,
                  99.9999% {
                      background-color: #3a7bf7;
                  }
              }
      
              @keyframes spinner-after {
      
                  0%,
                  25% {
                      background-color: #3a7bf7;
                  }
      
                  25.0001%,
                  75% {
                      background-color: #ffd64a;
                  }
      
                  75.0001%,
                  99.9999% {
                      background-color: #3a7bf7;
                  }
              }
          </style>
      </head>
      
      <body>
          <div class="google-spinner">
              <div class="spinner-inner"></div>
          </div>
          <div class="container">
              <div class="message">Переадресация...</div>
              <div class="redirecting">Пожалуйста, подождите, вас перенаправляют на сайт UpBilim...</div>
          </div>
      
          <script>
              window.onload = function () {
                  window.location.href = '${process.env.REDIRECT_URL_FRONT_FOR_AUTH}/${req.user?.token}';
              }
          </script>
      </body>
      
      </html>`
        )
    }


    
}
