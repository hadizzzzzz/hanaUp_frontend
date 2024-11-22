import React from 'react';
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, ResponsiveContainer, YAxis } from 'recharts';
import color from '../styles/color';
import font from '../styles/font';
import { useEffect } from 'react';

const data = [
  { date: '2023-01-01', value: 30 },
  { date: '2023-01-02', value: 20 },
  { date: '2023-01-03', value: 50 },
  { date: '2023-01-04', value: 40 },
  { date: '2023-01-05', value: 70 },
  { date: '2023-01-06', value: 60 },
];

const CustomTooltip = ({ active, payload, currency_symbol }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#DDF7F0',
          padding: '5px 10px',
          borderRadius: '10px',
          ...font.caption.cap2B,
          color: '#616161',
          boxShadow: '0px 2px 48px 0px rgba(0, 0, 0, 0.04)',
        }}
      >
        {payload[0].value} {currency_symbol}
      </div>
    );
  }
  return null;
};

const ExTech_RateGraph = ({ last5DaysRate, currency_symbol }) => {
  const parseToDate = date => {
    const year = date.substr(0, 4);
    const month = date.substr(4, 2);
    var day = date.substr(6);
    day = date.substr(6).replace(/^0+/, ''); // 0 제거
    return { year: year, month: month, day: day };
  };

  useEffect(() => {
    parseToDate('20241104');
    console.log(last5DaysRate);
  }, [last5DaysRate]);

  if (last5DaysRate.length != 0)
    return (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={last5DaysRate} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
          {/* X축 */}
          <XAxis
            dataKey="date"
            tickFormatter={date => {
              return `${date.substr(4, 2)}/${date.substr(6).replace(/^0+/, '')}`; // 월/일 형식
            }}
            padding={{ left: 20, right: 20, top: 20 }}
            tick={{
              fill: '#83848B',
              textAnchor: 'middle', // 텍스트 정렬
              fontFamily: 'Pretendard-Bold',
              fontSize: 12,
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
              letterSpacing: '1px',
            }}
            axisLine={false}
          />
          <YAxis hide domain={[dataMin => dataMin - dataMin * 0.003, dataMax => dataMax]} />

          {/* 배경 격자선 */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false} // 세로선 숨김
            strokeOpacity={0.3}
          />

          {/* 커스텀 툴팁 */}
          <Tooltip content={<CustomTooltip currency_symbol={currency_symbol} />} />

          {/* 선 */}
          <Line
            type="linear"
            dataKey="rate"
            stroke="#46D7C2"
            strokeWidth={2}
            dot={false} // 기본 점 숨김
            activeDot={{
              r: 8,
              fill: 'white', // 내부 흰색
              stroke: '#46D7C2', // 외곽선 색상
              strokeWidth: 3,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
};

export default ExTech_RateGraph;
