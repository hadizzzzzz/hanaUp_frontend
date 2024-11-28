import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import ReportComponent_Graph from './ReportComponent_Graph';
import font from '../styles/font';
import color from '../styles/color';
import arrowLeft from './assets/angle-left.png';
import arrowRight from './assets/angle-right.png';
import styled from 'styled-components';
import DollarBox from '../common/DollarBox';
import Msg from '../common/Msg';
import reportCOLORS from '../common/arrays/reportColumnsColors';
import { LinearGradient } from 'react-text-gradients';
import { useEffect } from 'react';
import axios from 'axios';
import { during_travelDetail } from '../Recoil/during_travelDetail';
import { useRecoilState } from 'recoil';
import countryInfo from '../common/arrays/countryInfo';
import ReportComponent_Detail from './ReportComponent_Detail';
import { useRecoilValue } from 'recoil';
import { travelInfo } from '../Recoil/travelState';
const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  align-self: stretch;

  width: 100%;
  flex: 1 0 0;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
`;

const TitleText = styled.div`
  ${font.header.h2};
  color: ${color.grayscale.black};

  text-align: left;
`;

const ArrowsContainer = styled.div`
  display: flex;
`;

const ArrowIcon = styled.img`
  cursor: pointer;
  width: 19px;
  height: 19px;
`;

const GraphContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailContainer = styled.div`
  width: 100%;
  padding: 14px 20px;
  background-color: ${color.grayscale.white};
  box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

// reportData를 받아 알맞게 그래프와 결과를 띄우기 위한 함수
const processReportData = reportData => {
  const rawReportData = [
    { name: '교통비', name_en: 'transport', value: '', color: '#01BABD', ratio: '' },
    { name: '식비', name_en: 'food', value: '', color: '#46D7C2', ratio: '' },
    { name: '쇼핑비', name_en: 'shopping', value: '', color: '#FFD200', ratio: '' },
    { name: '활동비', name_en: 'activities', value: '', color: '#E0E0E0', ratio: '' },
    { name: '병원비', name_en: 'hospital', value: '', color: '#40A0C9', ratio: '' },
  ];

  const breakdown = reportData.breakdown;
  // breakdown 값들을 배열로 변형
  const valuesArray = [];
  let totalValue = 0;
  for (let key in breakdown) {
    valuesArray.push(breakdown[key]);
    totalValue += breakdown[key];
  }

  const processedReportData = rawReportData.map((item, index) => {
    return {
      ...item,
      value: valuesArray[index],
      ratio: ((valuesArray[index] / totalValue) * 100).toFixed(0),
    };
  });

  return { processedReportData, totalValue };
};

// country : 전역 여행 상태에서 빼온 나라 정보
// day: 상위 page 컴포넌트에서 관리하는 레포트 day 정보
// reportData: fetch 해온 데이터
// {
//   "day": 1,
//   "totalSpent": 120,
//   /*"breakdown": {
//     "transport": 20, //교통비
//     "food": 50, //식비
//     "shopping": 30, //쇼핑비
//     "activities": 15, //활동비
//     "hospital": 5 //병원비
//   }*/,
//   "feeSavings": 5 //절약한 수수료
// }
const ReportComponent = ({ country, day, reportData, setDayState, toggleState }) => {
  const during_travelDetailInfo = useRecoilValue(during_travelDetail);
  const countryInfoSelected = countryInfo.find(item => item.country_en === country);
  const travelState = useRecoilValue(travelInfo);

  function addDaysToDate(baseDate, daysToAdd) {
    console.log('baseDate', baseDate, 'Days', daysToAdd);
    const newDate = new Date(baseDate); // 원본 객체를 복사
    console.log(newDate.getDate());
    newDate.setDate(newDate.getDate() + (daysToAdd - 1));
    return newDate;
  }

  if (reportData) {
    const { processedReportData, totalValue } = processReportData(reportData);

    if (during_travelDetailInfo)
      return (
        <Container>
          <Title>
            <TitleText>
              <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>
                {toggleState === 0 ? countryInfoSelected.country_kr : '2박3일'}
                {/* 2박 3일 고정 */}
              </LinearGradient>
              {toggleState === 0 ? '에서 ' : '의 '}
              <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>
                {toggleState === 0 ? `${day}일 차` : `${countryInfoSelected.country_kr}`}
              </LinearGradient>
              {toggleState === 1 && '여행'}, <br />내 소비는 어땠나요 ?
            </TitleText>
            {toggleState === 0 ? (
              <ArrowsContainer>
                <ArrowIcon src={arrowLeft} onClick={() => setDayState({ type: 'subtract' })} />
                <ArrowIcon src={arrowRight} onClick={() => setDayState({ type: 'add' })} />
              </ArrowsContainer>
            ) : (
              <></>
            )}
          </Title>
          <GraphContainer>
            <ReportComponent_Graph totalValue={totalValue} processedReportData={processedReportData} />
          </GraphContainer>
          <DollarBox
            type={toggleState === 0 ? 'single' : 'entire'}
            startDate={
              travelState === 'during'
                ? addDaysToDate(during_travelDetailInfo.startDate, day)
                : new Date(during_travelDetailInfo.startDate)
            }
            endDate={new Date(during_travelDetailInfo.endDate)}
            currency={countryInfoSelected.currency_symbol}
            country={country}
            amount={reportData.totalSpent}
          />
          <Msg type="positive" text={`트래블로그와 함께 수수료 ${reportData.feeSavings}원 절약했어요`} />
          <DetailContainer>
            {processedReportData.map(item => (
              <ReportComponent_Detail {...item} colorIndp={item.color} />
            ))}
          </DetailContainer>
        </Container>
      );
  }
};

export default ReportComponent;
