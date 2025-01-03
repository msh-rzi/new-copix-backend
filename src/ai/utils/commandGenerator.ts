export const commandGenerator = (command: string) => {
  return JSON.stringify({
    applyRules: {
      _1: '1-do not use object keys as find parameter',
      _2: 'if market is FUTURES return Buy as value else return Sell as value',
      _3: 'remove all strings from leverage an just return number as string for leverage',
      _4: 'remove # and .p or .P from symbol',
      _5: 'add copixStart[i] before start object 1 and for other objects i++ and for end of each object do like start with this text copixEnd[i] and for value between this copixis is json',
    },
    exampleInput: {
      data: {
        Symbol: '#REZUSDT.P',
        Market: 'FUTURES',
        Position: 'Long',
        Leverage: 'Isolated 5x',
        EntryTargets: {
          '1': '0.08613',
          '2': '0.08385',
        },
        TakeProfitTargets: {
          '1': '0.08722',
          '2': '0.08860',
          '3': '0.08993',
          '4': '0.09158',
          '5': '0.09347',
        },
        stopLoss: '1.13',
      },
      type: 'string',
    },
    exampleOutput: [
      {
        Symbol: 'REZUSDT',
        Market: 'FUTURES',
        Position: 'Buy',
        Leverage: '5',
        EntryTargets: ['0.08613', '0.08385'],
        TakeProfitTargets: [
          '0.08722',
          '0.08860',
          '0.08993',
          '0.09158',
          '0.09347',
        ],
        stopLoss: '1.13',
      },
    ],

    outputRules: {
      _1: 'start with copixStart and end with copixEnd and the number of each of them is index',
      _2: 'data as json between start and end',
      _3: 'data could be an array of objects',
      _4: 'all keys in objects should be first letter as uppercase',
      _5: 'copix index should not be in [], example: copixStart1, copixEnd1',
    },
    propmt:
      'Now, process the following trading signal and provide the formatted JSON:',
    content: command,
  });
};
