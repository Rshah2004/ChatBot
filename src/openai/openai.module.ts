import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';

@Module({
  controllers: [OpenaiController],
  imports: [ConfigModule],
  providers: [
    OpenaiService,
    {
        provide: OpenAI,
        useFactory: (configService: ConfigService) =>
            new OpenAI({apiKey: configService.getOrThrow('OPENAI_API_KEY') }),
        inject: [ ConfigService ],
    },
]
})
export class OpenaiModule {}
