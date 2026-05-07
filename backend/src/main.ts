import { NestFactory } from '@nestjs/core';
import { AppModule } from './application.module';

async function bootstrap() {
  const server = await NestFactory.create(AppModule);
  server.enableCors();
  await server.listen(3001);
  console.log('server listen on 3001','http://localhost:3001');
}

bootstrap();
