import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import reportCOLORS from '../common/arrays/reportColumnsColors';

const CustomTooltip = ({ active, payload, total }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    const percentage = ((value / total) * 100).toFixed(0); // 퍼센트 계산

    return (
      <div
        style={{
          color: 'black',
          backgroundColor: '#DDF7F0',
          padding: '6px',
          borderRadius: 10,
        }}
      >
        <span>{`${percentage}%`}</span>
      </div>
    );
  }

  return null;
};

const ReportComponent_Graph = ({ totalValue, processedReportData }) => {
  return (
    <PieChart width={390} height={200} margin={0}>
      <Pie
        data={processedReportData}
        dataKey="value"
        outerRadius={100}
        innerRadius={80}
        cornerRadius={30}
        fill="#8884d8"
      >
        {/* Cell 컴포넌트를 사용하여 각 Pie의 색상을 지정 */}
        {processedReportData.map((entry, index) => {})}
        {processedReportData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        content={<CustomTooltip total={totalValue} />} // total 전달
      />
    </PieChart>
  );
};

export default ReportComponent_Graph;
