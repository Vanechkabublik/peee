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
      clientID: configService.get<string>('VK_CLIENT_ID'), // ID приложения ВКонтакте
      clientSecret: configService.get<string>('VK_CLIENT_SECRET'), // Секретный ключ приложения
      callbackURL: configService.get<string>('VK_CALLBACK_URL'), // URL обратного вызова
      scope: ['email'], // Запрашиваемые права
      display: 'page', // Отображение страницы авторизации
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: Function, req: any) {
    const code = req.query.code;
    console.log('Authorization Code:', code);
  
    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value || null,
      accessToken,
    };
  
    const jwtToken = this.jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
  
    return done(null, {
      user,
      token: jwtToken,
      code, // Возвращаем code, если нужно
    });
  }
  
}
