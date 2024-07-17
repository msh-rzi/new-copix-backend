import { TradeDetails } from 'src/telegram/types/types';
import { BybitBatchOrderDomain } from '../domain/bybit.order.domain';
import { BybitTradingStopDomain } from '../domain/bybit.trading.stop.domain';

export class ExchangeBybitMapper {
  static toOrderDomain(raw: TradeDetails, qty: string) {
    return this.toBatchOrderDomain(raw, qty);
  }

  static toOrderDomainNew(raw: TradeDetails, qtyS: string) {
    console.log({ raw });
    const orderList: BybitBatchOrderDomain[] = [];

    const qty = parseInt(qtyS).toFixed(2).toString();

    const side = raw.Position.toLowerCase() === 'short' ? 'Sell' : 'Buy';

    raw.EntryTargets.forEach((entryTarget) => {
      const order = new BybitBatchOrderDomain();
      order.symbol = raw.Symbol.replace('.p', '').toUpperCase();
      order.side = side;
      order.orderType = 'Limit';
      order.qty = qty;
      order.price = entryTarget.toString();
      order.timeInForce = 'GTC';
      order.positionIdx = side === 'Buy' ? 1 : 2;
      order.tpslMode = 'Partial';

      orderList.push(order);
    });

    return orderList;
  }

  static toBatchOrderDomain(raw: TradeDetails, qtyS: string) {
    console.log({ raw });
    const orders = {
      orders: [],
      stopLoss: [],
      takeProfit: [],
    };
    const qty = parseInt(qtyS).toFixed(2).toString();
    const side = raw.Position.toLowerCase() === 'short' ? 'Sell' : 'Buy';

    raw.EntryTargets.forEach((et) => {
      // Main Order
      // const takeProfitLength = raw.TakeProfitTargets.length;
      // const tp =
      //   takeProfitLength - 1 > index
      //     ? raw.TakeProfitTargets[index]
      //     : raw.TakeProfitTargets[takeProfitLength];
      const order = new BybitBatchOrderDomain();
      order.symbol = raw.Symbol.replace('.p', '').toUpperCase();
      order.side = side;
      order.orderType = 'Limit';
      order.qty = qty;
      order.price = et.toString();
      order.timeInForce = 'GTC';
      order.positionIdx = side === 'Buy' ? 1 : 2;
      order.tpslMode = 'Partial';
      // order.takeProfit = tp.toString();
      // order.stopLoss = raw.StopLoss.toString();

      orders.orders.push(order);

      // Conditional order : StopLoss
      if (orders.stopLoss.length === 0) {
        const stopLossOrder = new BybitBatchOrderDomain();
        stopLossOrder.symbol = raw.Symbol.replace('.p', '').toUpperCase();
        stopLossOrder.side = side === 'Buy' ? 'Sell' : 'Buy';
        stopLossOrder.orderType = 'Limit';
        stopLossOrder.qty = (+qty * raw.EntryTargets.length + 1).toString();
        stopLossOrder.price = raw.StopLoss.toString();
        stopLossOrder.timeInForce = 'GTC';
        stopLossOrder.positionIdx = side === 'Buy' ? 1 : 2;
        stopLossOrder.tpslMode = 'Full';
        stopLossOrder.stopLoss = raw.StopLoss.toString();
        stopLossOrder.triggerDirection = side === 'Buy' ? 2 : 1;
        stopLossOrder.triggerPrice = raw.StopLoss.toString();
        stopLossOrder.closeOnTrigger = true;

        orders.stopLoss.push(stopLossOrder);
      }

      // Conditional order : Take Profit
      if (orders.takeProfit.length === 0) {
        raw.TakeProfitTargets.forEach((tp) => {
          const takeProfitOrder = new BybitBatchOrderDomain();
          takeProfitOrder.symbol = raw.Symbol.replace('.p', '').toUpperCase();
          takeProfitOrder.side = side === 'Buy' ? 'Sell' : 'Buy';
          takeProfitOrder.orderType = 'Limit';
          takeProfitOrder.qty = (
            (+qty * raw.EntryTargets.length + 1) /
            raw.TakeProfitTargets.length
          ).toString();
          takeProfitOrder.price = tp.toString();
          takeProfitOrder.timeInForce = 'GTC';
          takeProfitOrder.positionIdx = side === 'Buy' ? 1 : 2;
          takeProfitOrder.tpslMode = 'Partial';
          takeProfitOrder.takeProfit = tp.toString();
          takeProfitOrder.triggerDirection = side === 'Buy' ? 1 : 2;
          takeProfitOrder.triggerPrice = tp.toString();
          takeProfitOrder.closeOnTrigger = true;

          orders.takeProfit.push(takeProfitOrder);
        });
      }
    });
    // raw.EntryTargets.forEach((et) => {
    //   raw.TakeProfitTargets.forEach((tp) => {
    //     const eachTpQty = dividedQty / raw.TakeProfitTargets.length;
    //     // const eachTpQty = Math.round(dividedQty / raw.TakeProfitTargets.length);
    //     const order = new BybitBatchOrderDomain();
    //     order.symbol = raw.Symbol.replace('.p', '').toUpperCase();
    //     order.side = side;
    //     order.orderType = 'Limit';
    //     order.qty = eachTpQty.toString();
    //     order.price = et.toString();
    //     order.timeInForce = 'GTC';
    //     order.orderLinkId = null;
    //     order.isLeverage = 1;
    //     order.orderFilter = 'Order';
    //     order.positionIdx = side === 'Buy' ? 1 : 2;
    //     order.tpslMode = 'Partial';
    //     order.takeProfit = tp.toString();
    //     order.stopLoss = raw.StopLoss.toString();

    //     orderList.push(order);
    //   });
    // });

    return orders;
  }

  static toTradingStopDomain(raw: TradeDetails) {
    const stopTradingList: BybitTradingStopDomain[] = [];

    const side = raw.Position.toLowerCase() === 'short' ? 'Sell' : 'Buy';
    raw.TakeProfitTargets.forEach((tp) => {
      const stopTrading = new BybitTradingStopDomain();
      stopTrading.category = 'linear';
      stopTrading.symbol = raw.Symbol.replace('.p', '').toUpperCase();
      stopTrading.takeProfit = tp.toString();
      stopTrading.stopLoss = raw.StopLoss.toString();
      stopTrading.tpSize = '50';
      stopTrading.slSize = '50';
      stopTrading.tpTriggerBy = 'MarkPrice';
      stopTrading.slTriggerBy = 'IndexPrice';
      // stopTrading.tpSize = `${Math.round(parseFloat(qty)) * 0.5}`;
      // stopTrading.slSize = `${Math.round(parseFloat(qty)) * 0.5}`;
      stopTrading.tpslMode = 'Partial';
      stopTrading.tpOrderType = 'Limit';
      stopTrading.slOrderType = 'Limit';
      stopTrading.positionIdx = side === 'Buy' ? 1 : 2;
      stopTrading.activePrice = null;
      stopTrading.trailingStop = null;
      stopTrading.tpLimitPrice = 'Limit';
      stopTrading.slLimitPrice = 'Limit';

      stopTradingList.push(stopTrading);
    });

    return stopTradingList;
  }
}
