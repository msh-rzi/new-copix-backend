import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class GetChartDataDto {
  @IsString()
  id: string;

  @IsString()
  vs_currency: string;

  @IsNumber()
  days: number;

  @IsBoolean()
  readFromFile: boolean;
}
