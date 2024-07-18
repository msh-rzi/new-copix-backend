import { Injectable } from '@nestjs/common';
// services
import { TelegramAuthRepository } from './telegram.auth.repository';
// stuff
import { globalResponse } from 'src/utils/globalResponse';
// types
import { GlobalResponseType } from 'src/types/globalTypes';
import { ResponseCode, ResponseMessage } from 'src/types/globalEnums';
// telegram
import { Api } from 'telegram';

@Injectable()
export class TelegramChannelsRepository {
  constructor(private readonly AuthRepo: TelegramAuthRepository) {}

  async channels(userId: string): Promise<GlobalResponseType> {
    try {
      const session = await this.AuthRepo.getUserSession(userId);
      const client = await this.AuthRepo.initTelegramClient(userId, session);

      const dialogs = await client.getDialogs({});

      // Filter and map channels concurrently
      const channels = dialogs
        .filter((dialog) => dialog.isChannel)
        .map(async (dialog) => {
          let profilePhotoBuffer = null;
          try {
            profilePhotoBuffer = await client.downloadProfilePhoto(
              dialog.entity,
            );
          } catch (error) {
            console.error(
              `Error downloading profile photo for channel ${dialog.id}:`,
              error,
            );
          }

          return {
            id: dialog.id,
            title: dialog.title,
            username: (dialog.entity as any)?.username || '',
            profilePhoto: profilePhotoBuffer
              ? Buffer.from(profilePhotoBuffer).toString('base64')
              : '',
          };
        });

      const extractedChannels = await Promise.all(channels);

      return globalResponse({
        retCode: ResponseCode.OK,
        regMsg: ResponseMessage.OK,
        result: { channels: extractedChannels },
        retExtInfo: '',
      });
    } catch (error) {
      console.error('Error getting user channels:', error);
      return globalResponse({
        retCode: ResponseCode.INTERNAL_SERVER_ERROR,
        regMsg: ResponseMessage.ERROR,
        result: { error: error.message },
        retExtInfo: 'Internal server error',
      });
    }
  }

  async channelHistory(
    userId: string,
    channelId: bigint,
  ): Promise<GlobalResponseType> {
    try {
      const session = await this.AuthRepo.getUserSession(userId);
      const client = await this.AuthRepo.initTelegramClient(userId, session);

      const ch = await client.invoke(
        new Api.messages.GetHistory({
          // @ts-ignore
          peer: channelId,
          limit: 30,
        }),
      );
      const history = (ch as any).messages.map(
        (message: { id: any; message: any }, index: any) => ({
          id: index,
          messageId: message.id,
          message: message.message,
        }),
      );

      return globalResponse({
        retCode: ResponseCode.OK,
        regMsg: ResponseMessage.OK,
        result: { history },
        retExtInfo: '',
      });
    } catch (error) {
      console.log(error);
      return globalResponse({
        retCode: ResponseCode.INTERNAL_SERVER_ERROR,
        regMsg: ResponseMessage.ERROR,
        result: { error },
        retExtInfo: 'Internal server error',
      });
    }
  }
}
