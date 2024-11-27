import { Bar, Line, Chart } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import 'chart.js/auto';
import color from '../styles/color';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// "breakdown": {
//     "transport": 300,   // 교통비
//     "food": 400,        // 식비
//     "shopping": 300,    // 쇼핑비
//     "activities": 400,  // 활동비
//     "hotel": 5,  // 숙박비
//   },
//   "averageData": {
//     "transport": 280,   // 평균 교통비
//     "food": 450,        // 평균 식비
//     "shopping": 320,    // 평균 쇼핑비
//     "activities": 380,  // 평균 활동비
//     "hotel": 5,  // 평균 숙박비
//   }

// breakdown, averageData을 props로 받아
//  각각 line 형태, bar 형태의 그래프를 그리는 공통 컴포넌트

const SpendTypeTest_Graph = ({ breakdown, averageBreakdown, currency }) => {
  const mixedData = {
    labels: ['교통비', '식비', '숙박비', '쇼핑비', '활동비'],
    datasets: [
      {
        label: '내 예상 금액',
        type: 'line',
        data: breakdown,
        backgroundColor: function (context) {
          const { chart } = context;
          const { ctx, chartArea } = chart;

          // 차트가 렌더링되기 전에 chartArea가 없을 수 있으므로 null 체크
          if (!chartArea) {
            return 'rgba(0, 0, 0, 0.1)'; // 기본 색상
          }

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, ' #46D7C2'); // 시작 색상
          gradient.addColorStop(0.5, '#24C9BF');
          gradient.addColorStop(1, '#01BABD '); // 종료 색상
          return gradient;
        },
        pointBorderWidth: 1,
        borderWidth: 2,
        borderColor: color.brand.primary,
      },
      {
        label: '평균',
        type: 'bar',
        data: averageBreakdown,
        backgroundColor: color.grayscale.gray2,
        borderRadius: 10,
        barThickness: 28,
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: function (value) {
            return `${currency} ` + value; // 결과: "1000 원"
          },
        },
        display: true,
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        display: true,
        labels: {
          boxWidth: 16,
          boxHeight: 16,
          useBorderRadius: true,
          borderRadius: 5,
          padding: 15,
        },
        title: {
          display: true,
          color: '#757575',
          padding: 0,
        },
      },
    },
  };

  return <Chart width="335px" height="268px" type="line" data={mixedData} options={options} />;
};

export default SpendTypeTest_Graph;
