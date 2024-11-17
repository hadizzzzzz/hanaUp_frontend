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

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  align-self: stretch;
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
  padding: 14px 20px;
  background-color: ${color.grayscale.white};
  box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.05);
`;

const ReportDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const ReportDetailComponent = ({ color, value, percentage }) => {
  return <ReportDetailComponent></ReportDetailComponent>;
};

const ReportComponent = ({ day, reportData, setDayState }) => {
  const during_travelDetailInfo = useRecoilState(during_travelDetail);

  const reportColumn = [
    { name: '교통비', value: 230124 },
    { name: '식비', value: 230124 },
    { name: '쇼핑비', value: 230124 },
    { name: '활동비', value: 230124 },
    { name: '병원비', value: 230124 },
  ];

  // 전체 합계 계산
  const totalValue = reportColumn.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <Container>
      <Title>
        <TitleText>
          <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>일본</LinearGradient>에서{' '}
          <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>{day}일 차</LinearGradient>,{' '}
          <br />내 소비는 어땠나요 ?
        </TitleText>
        <ArrowsContainer>
          <ArrowIcon src={arrowLeft} onClick={() => setDayState({ type: 'subtract' })} />
          <ArrowIcon src={arrowRight} onClick={() => setDayState({ type: 'add' })} />
        </ArrowsContainer>
      </Title>
      <GraphContainer>
        <ReportComponent_Graph totalValue={totalValue} reportColumn={reportColumn} />
      </GraphContainer>
      {/* <DollarBox type="single" startDate={} currency={} country={} amount={} /> */}
      <Msg type="positive" text={`트래블로그와 함께 수수료 ${reportData.feeSavings}원 절약했어요`} />
      <DetailContainer></DetailContainer>
    </Container>
  );
};

export default ReportComponent;
