import { OmitType } from '@nestjs/mapped-types';

export class BybitOrderDomain {
  category: BybitOrderCategory;
  symbol: string;
  side: BybitOrderSide;
  orderType: BybitOrderOrderType;
  qty: string;
  price: string;
  timeInForce?: 'GTC';
  // orderLinkId?: string;
  // isLeverage?: BybitOrderIsLeverage;
  // orderFilter?: BybitOrderFilter;
  positionIdx: BybitPositionIdx;
  tpslMode?: BybitOrderTpslMode;
  takeProfit?: string;
  stopLoss?: string;
  triggerDirection?: 1 | 2;
  triggerPrice?: string;
  closeOnTrigger?: boolean;
}

export class BybitBatchOrderDomain extends OmitType(BybitOrderDomain, [
  'category',
]) {}
