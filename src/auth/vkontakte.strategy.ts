import { Strategy as VkStrategy } from 'passport-vkontakte';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport-vkontakte';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VkontakteStrategy extends PassportStrategy(VkStrategy, 'vkontakte') {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    super({
      clientID: configService.get<string>('VK_CLIENT_ID'),
      clientSecret: configService.get<string>('VK_CLIENT_SECRET'),
      callbackURL: configService.get<string>('VK_CALLBACK_URL'),
      scope: ['email'], // Права доступа
      display: 'page',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // Профиль пользователя с ВКонтакте
    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0].value,
      accessToken,
    };

    // Генерация JWT токена
    const jwtToken = this.jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });

    // Возвращаем данные пользователя и токен
    return {
      user,
      token: jwtToken,
    };
  }
}
