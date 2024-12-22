import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CryptocurrencyController } from './cryptocurrency.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthHelpers } from 'src/auth/helpers/auth-helpers';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CryptocurrencyRepository } from './repositories/cryptocurrency.repository';

@Module({
  imports: [HttpModule],
  controllers: [CryptocurrencyController],
  providers: [
    PrismaService,
    AuthHelpers,
    UserService,
    JwtService,
    CryptocurrencyRepository,
  ],
})
export class CryptocurrencyModule {}
