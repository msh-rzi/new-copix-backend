import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { TelegramModule } from './telegram/telegram.module';
import { ExchangeModule } from './exchange/exchange.module';
import { AiModule } from './ai/ai.module';
import { AlgorithmModule } from './algorithm/algorithm.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RobotModule } from './robot/robot.module';
import { CryptocurrencyModule } from './cryptocurrency/cryptocurrency.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      global: true,
    }),
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    TelegramModule,
    ExchangeModule,
    AiModule,
    AlgorithmModule,
    RobotModule,
    CryptocurrencyModule,
  ],
})
export class AppModule {}
