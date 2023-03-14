import { NestFactory } from '@nestjs/core';
import { AnswersModule } from './answers.module';

async function bootstrap() {
  const app = await NestFactory.create(AnswersModule);
  await app.listen(3000);
}
bootstrap();
