import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MarketSentimentService {
  constructor(private readonly httpService: HttpService) {}

  async fetchFearGreedIndex(): Promise<any> {
    const url = 'https://api.alternative.me/fng/'; // Example API for Fear/Greed Index
    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching Fear/Greed Index: ${error.message}`);
    }
  }

  async fetchNewsSentiment(keywords: string): Promise<any> {
    const url = `https://newsapi.org/v2/everything?q=${keywords}&apiKey=YOUR_NEWS_API_KEY`; // Replace with your News API key
    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching News Sentiment: ${error.message}`);
    }
  }
}
