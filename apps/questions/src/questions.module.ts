import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dbQuestion.sqlite',
      entities: [Question],
      synchronize: true,
    }),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
