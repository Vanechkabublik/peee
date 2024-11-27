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
      secret: process.env.JWT_SECRET || 'super_secret_key',
      signOptions: { expiresIn: '60m' }, // Срок действия токена
    }),
    ConfigModule.forRoot(), // Подключение .env файла
  ],
  controllers: [AuthController],
  providers: [VkontakteStrategy],
})
export class AuthModule {}
