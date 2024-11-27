import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем CORS
  app.enableCors({
    origin: '*',  // Разрешаем доступ с любых источников. Можете изменить на более ограниченные, если нужно.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные HTTP методы
    allowedHeaders: 'Content-Type, Accept, Authorization',  // Разрешенные заголовки
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
