import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CryptocurrencyController } from './cryptocurrency.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthHelpers } from 'src/auth/helpers/auth-helpers';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { GeneralCryptocurrencyRepository } from './repositories/general-cryptocurrency.repository';
import { PriceCryptocurrencyRepository } from './repositories/price-cryptocurrency.repository';
import { PriceCryptocurrencyGateway } from './gateway/price-cryptocurrency.gateway';
import { HistoricalPriceCryptocurrencyRepository } from './repositories/historical-price-cryptocurrency.repository';

@Module({
  imports: [HttpModule],
  controllers: [CryptocurrencyController],
  providers: [
    PrismaService,
    AuthHelpers,
    UserService,
    JwtService,
    GeneralCryptocurrencyRepository,
    PriceCryptocurrencyRepository,
    HistoricalPriceCryptocurrencyRepository,
    PriceCryptocurrencyGateway,
  ],
})
export class CryptocurrencyModule {}
