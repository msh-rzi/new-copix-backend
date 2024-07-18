import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { commandGenerator } from '../utils/commandGenerator';

@Injectable()
export class AiChatGPTRepository {
  OpenAI: OpenAI;
  constructor(private readonly configService: ConfigService) {
    // eslint-disable-next-line no-restricted-syntax
    const apiKey = this.configService.get<string>('CHAT_GPT_API_KEY');
    this.OpenAI = new OpenAI({
      apiKey,
    });
  }

  async generateCompletion(prompt: string, isOrder?: boolean) {
    try {
      const content = isOrder ? commandGenerator(prompt) : prompt;

      console.log('start generating');
      const completion = await this.OpenAI.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a helpful trading assistant.' },
          {
            role: 'user',
            content,
          },
        ],
        model: 'gpt-4-turbo',
      });
      console.log('end generating');
      const response = completion.choices[0].message.content;
      console.log({ response });
      return response;
    } catch (error) {
      console.error('Error generating completion:', error);
      return null;
    }
  }
}
