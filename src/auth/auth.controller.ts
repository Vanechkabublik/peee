import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  // Callback для обработки авторизации
  @Get('vkontakte/callback')
  @UseGuards(AuthGuard('vkontakte'))
  async vkontakteAuthCallback(@Req() req: Request) {
    const code = req.query.code; // Извлечение параметра code
    console.log('Code from VK:', code);

    // Данные пользователя из Passport
    const user = req.user;

    return {
      message: 'Авторизация успешна',
      user,
      code, // Вернуть или логировать
    };
  }
}  
