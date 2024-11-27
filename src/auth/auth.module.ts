import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { VkontakteStrategy } from './vkontakte.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'vkontakte' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'ildafg76766&^548', // Ваш секрет для JWT
      signOptions: { expiresIn: '60m' },
    }),
    ConfigModule.forRoot(), // Подключаем конфиг для получения VK_CLIENT_ID и т.д.
  ],
  controllers: [AuthController],
  providers: [VkontakteStrategy],
})
export class AuthModule {}
