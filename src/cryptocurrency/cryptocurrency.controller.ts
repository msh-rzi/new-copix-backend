import { CryptocurrencyRepository } from './repositories/cryptocurrency.repository';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('Cryptocurrency')
@Controller({
  path: 'cryptocurrency',
  version: '1',
})
export class CryptocurrencyController {
  constructor(
    private readonly cryptocurrencyRepository: CryptocurrencyRepository,
  ) {}

  @UseGuards(AuthGuard)
  @Post('create-cryptocurrencies')
  @HttpCode(HttpStatus.CREATED)
  create() {
    return this.cryptocurrencyRepository.fetchAndStoreCryptocurrencies();
  }

  @UseGuards(AuthGuard)
  @Get('get-all-coins')
  @HttpCode(HttpStatus.ACCEPTED)
  getAllCoins() {
    return this.cryptocurrencyRepository.getAllCoins();
  }
}
