import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('vkontakte')
  @UseGuards(AuthGuard('vkontakte'))
  async vkontakteAuth() {
    // Это не будет вызвано, так как после успешной авторизации 
    // вызовется метод validate из VkontakteStrategy.
  }

  @Get('vkontakte/callback')
  @UseGuards(AuthGuard('vkontakte'))
  vkontakteAuthCallback() {
    // После успешной авторизации, возвращаем данные и токен
    return { message: 'Авторизация успешна' };
  }
}
