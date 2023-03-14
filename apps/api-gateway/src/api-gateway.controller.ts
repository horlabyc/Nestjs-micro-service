import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAnswerDto } from 'apps/answers/src/dto/create-answer.dto';
import { CreateQuestionDto } from 'apps/questions/src/dto/create-question.dto';

@Controller()
export class ApiGatewayController {
  constructor(
    @Inject('questions_service') private clientQuest: ClientProxy,
    @Inject('answers_service') private clientAnsw: ClientProxy,
  ) {}

  @Post()
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.clientQuest.emit('question_created', createQuestionDto);
  }

  @Get()
  async getQuestions() {
    return this.clientQuest.send(
      {
        cmd: 'get-all-questions',
      },
      '',
    );
  }

  @Post('/:questionsId/answers')
  async createAnswer(
    @Body() createAnswer: CreateAnswerDto,
    @Param('questionsId', ParseIntPipe) questionsId: number,
  ) {
    createAnswer.questionId = questionsId;
    return this.clientAnsw.emit('answer_created', createAnswer);
  }

  @Get('/:questionsId/answers')
  async getAnswers(@Param('questionsId', ParseIntPipe) questionsId: number) {
    return this.clientAnsw.send(
      {
        cmd: 'get-all-answers',
      },
      { questionsId },
    );
  }
}
