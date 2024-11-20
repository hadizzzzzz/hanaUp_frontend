import React from 'react';
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import color from '../styles/color';
import font from '../styles/font';

const data = [
  { date: '2023-01-01', value: 30 },
  { date: '2023-01-02', value: 20 },
  { date: '2023-01-03', value: 50 },
  { date: '2023-01-04', value: 40 },
  { date: '2023-01-05', value: 70 },
  { date: '2023-01-06', value: 60 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#DDF7F0',
          padding: '9px 10px',
          borderRadius: '10px',
          ...font.caption.cap2B,
          color: '#616161',
          boxShadow: '0px 2px 48px 0px rgba(0, 0, 0, 0.04)',
        }}
      >
        {payload[0].value}
      </div>
    );
  }
  return null;
};

const ExTech_RateGraph = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        {/* X축 */}
        <XAxis
          dataKey="date"
          tickFormatter={date => {
            const d = new Date(date);
            return `${d.getMonth() + 1}/${d.getDate()}`; // 월/일 형식
          }}
          padding={{ left: 20, right: 20 }}
          tick={{
            fill: '#83848B',
            textAnchor: 'middle', // 텍스트 정렬
            fontFamily: 'Pretendard',
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            letterSpacing: '1px',
          }}
        />

        {/* 배경 격자선 */}
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false} // 세로선 숨김
          strokeOpacity={0.3}
        />

        {/* 커스텀 툴팁 */}
        <Tooltip content={<CustomTooltip />} />

        {/* 선 */}
        <Line
          type="linear"
          dataKey="value"
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
