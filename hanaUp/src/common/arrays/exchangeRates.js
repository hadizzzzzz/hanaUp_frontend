const exchangeRates = (todayExchangeRate, selectedWeek, last5Days) => {
  const generateVariation = baseRate => {
    return parseFloat((baseRate * (1 + (Math.random() - 0.5) * 0.04)).toFixed(2));
  };
  return [
    {
      country: 'Japan',
      TodayExchangeRate: todayExchangeRate,
      weeklyExchangeRates: {
        [`week${selectedWeek}`]: {
          [last5Days[4]]: { date: last5Days[4], rate: generateVariation(todayExchangeRate) },
          [last5Days[3]]: { date: last5Days[3], rate: generateVariation(todayExchangeRate) },
          [last5Days[2]]: { date: last5Days[2], rate: generateVariation(todayExchangeRate) },
          [last5Days[1]]: { date: last5Days[1], rate: generateVariation(todayExchangeRate) },
          [last5Days[0]]: { date: last5Days[0], rate: todayExchangeRate },
        },
      },
    },
    {
      country: 'Thailand',
      TodayExchangeRate: todayExchangeRate,
      weeklyExchangeRates: {
        [`week${selectedWeek}`]: {
          [last5Days[4]]: { date: last5Days[4], rate: generateVariation(todayExchangeRate) },
          [last5Days[3]]: { date: last5Days[3], rate: generateVariation(todayExchangeRate) },
          [last5Days[2]]: { date: last5Days[2], rate: generateVariation(todayExchangeRate) },
          [last5Days[1]]: { date: last5Days[1], rate: generateVariation(todayExchangeRate) },
          [last5Days[0]]: { date: last5Days[0], rate: todayExchangeRate },
        },
      },
    },
    {
      country: 'Malaysia',
      TodayExchangeRate: todayExchangeRate,
      weeklyExchangeRates: {
        [`week${selectedWeek}`]: {
          [last5Days[4]]: { date: last5Days[4], rate: generateVariation(todayExchangeRate) },
          [last5Days[3]]: { date: last5Days[3], rate: generateVariation(todayExchangeRate) },
          [last5Days[2]]: { date: last5Days[2], rate: generateVariation(todayExchangeRate) },
          [last5Days[1]]: { date: last5Days[1], rate: generateVariation(todayExchangeRate) },
          [last5Days[0]]: { date: last5Days[0], rate: todayExchangeRate },
        },
      },
    },
    {
      country: 'China',
      TodayExchangeRate: todayExchangeRate,
      weeklyExchangeRates: {
        [`week${selectedWeek}`]: {
          [last5Days[4]]: { date: last5Days[4], rate: generateVariation(todayExchangeRate) },
          [last5Days[3]]: { date: last5Days[3], rate: generateVariation(todayExchangeRate) },
          [last5Days[2]]: { date: last5Days[2], rate: generateVariation(todayExchangeRate) },
          [last5Days[1]]: { date: last5Days[1], rate: generateVariation(todayExchangeRate) },
          [last5Days[0]]: { date: last5Days[0], rate: todayExchangeRate },
        },
      },
    },
    {
      country: 'Taiwan',
      TodayExchangeRate: todayExchangeRate,
      weeklyExchangeRates: {
        [`week${selectedWeek}`]: {
          [last5Days[4]]: { date: last5Days[4], rate: generateVariation(todayExchangeRate) },
          [last5Days[3]]: { date: last5Days[3], rate: generateVariation(todayExchangeRate) },
          [last5Days[2]]: { date: last5Days[2], rate: generateVariation(todayExchangeRate) },
          [last5Days[1]]: { date: last5Days[1], rate: generateVariation(todayExchangeRate) },
          [last5Days[0]]: { date: last5Days[0], rate: todayExchangeRate },
        },
      },
    },
    {
      country: 'USA',
      TodayExchangeRate: todayExchangeRate,
      weeklyExchangeRates: {
        [`week${selectedWeek}`]: {
          [last5Days[4]]: { date: last5Days[4], rate: generateVariation(todayExchangeRate) },
          [last5Days[3]]: { date: last5Days[3], rate: generateVariation(todayExchangeRate) },
          [last5Days[2]]: { date: last5Days[2], rate: generateVariation(todayExchangeRate) },
          [last5Days[1]]: { date: last5Days[1], rate: generateVariation(todayExchangeRate) },
          [last5Days[0]]: { date: last5Days[0], rate: todayExchangeRate },
        },
      },
    },
    {
      country: 'UK',
      TodayExchangeRate: todayExchangeRate,
      weeklyExchangeRates: {
        [`week${selectedWeek}`]: {
          [last5Days[4]]: { date: last5Days[4], rate: generateVariation(todayExchangeRate) },
          [last5Days[3]]: { date: last5Days[3], rate: generateVariation(todayExchangeRate) },
          [last5Days[2]]: { date: last5Days[2], rate: generateVariation(todayExchangeRate) },
          [last5Days[1]]: { date: last5Days[1], rate: generateVariation(todayExchangeRate) },
          [last5Days[0]]: { date: last5Days[0], rate: todayExchangeRate },
        },
      },
    },
    {
      country: 'Australia',
      TodayExchangeRate: todayExchangeRate,
      weeklyExchangeRates: {
        [`week${selectedWeek}`]: {
          [last5Days[4]]: { date: last5Days[4], rate: generateVariation(todayExchangeRate) },
          [last5Days[3]]: { date: last5Days[3], rate: generateVariation(todayExchangeRate) },
          [last5Days[2]]: { date: last5Days[2], rate: generateVariation(todayExchangeRate) },
          [last5Days[1]]: { date: last5Days[1], rate: generateVariation(todayExchangeRate) },
          [last5Days[0]]: { date: last5Days[0], rate: todayExchangeRate },
        },
      },
    },
    {
      country: 'Philippines',
      TodayExchangeRate: todayExchangeRate,
      weeklyExchangeRates: {
        [`week${selectedWeek}`]: {
          [last5Days[4]]: { date: last5Days[4], rate: generateVariation(todayExchangeRate) },
          [last5Days[3]]: { date: last5Days[3], rate: generateVariation(todayExchangeRate) },
          [last5Days[2]]: { date: last5Days[2], rate: generateVariation(todayExchangeRate) },
          [last5Days[1]]: { date: last5Days[1], rate: generateVariation(todayExchangeRate) },
          [last5Days[0]]: { date: last5Days[0], rate: todayExchangeRate },
        },
      },
    },
    {
      country: 'Europe',
      TodayExchangeRate: todayExchangeRate,
      weeklyExchangeRates: {
        [`week${selectedWeek}`]: {
          [last5Days[4]]: { date: last5Days[4], rate: generateVariation(todayExchangeRate) },
          [last5Days[3]]: { date: last5Days[3], rate: generateVariation(todayExchangeRate) },
          [last5Days[2]]: { date: last5Days[2], rate: generateVariation(todayExchangeRate) },
          [last5Days[1]]: { date: last5Days[1], rate: generateVariation(todayExchangeRate) },
          [last5Days[0]]: { date: last5Days[0], rate: todayExchangeRate },
        },
      },
    },
  ];
};

export default exchangeRates;
