import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PriceCryptocurrencyGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(PriceCryptocurrencyGateway.name);
  intervalObject = {};

  constructor(private readonly prisma: PrismaService) {}

  afterInit(server: Server) {
    this.logger.log('WebSocket server initialized', server);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);

    // Listen for the 'send-coin-name' event
    client.on('request-coins-price', async () => {
      await this.sendAllCoinsPrice();
      this.logger.log(`request-coins-price`);
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    Object.keys(this.intervalObject).forEach((interval) =>
      clearInterval(interval),
    );
  }

  async sendAllCoinsPrice() {
    const intervalId = `interval${Math.random() * 1000}`;

    this.intervalObject[intervalId] = setInterval(
      async () => {
        const coinsList = await this.prisma.coin.findMany({
          select: {
            id: true,
          },
        });
        const coinPrices = await this.prisma.coinPrice.findMany({
          where: {
            coinId: {
              in: coinsList.map((coin) => coin.id),
            },
          },
          orderBy: {
            timestamp: 'desc',
          },
          distinct: ['coinId'],
          select: {
            coinId: true,
            priceUsd: true,
          },
        });
        this.server.emit('coin-data', coinPrices);
      },
      5 * 60 * 1000,
    );
  }
}
