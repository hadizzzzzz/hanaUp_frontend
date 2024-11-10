import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import PrimaryHeader from '../common/PrimaryHeader';
import HighLightText from '../common/HighLightText';
import font from '../styles/font';
import color from '../styles/color';
import { useLocation } from 'react-router-dom';
import ResultPage from './ResultPage';
import SplashPage from './SplashPage';

const Container = styled.div`
  border: 1px solid black;

  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LoadingScreen = () => {
  return <SplashPage />;
};

// 여행할 나라
// startDate
const PredictAmount = () => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const location = useLocation();
  const travelInfo = { ...location.state }; // 여행 나라, startDate와 endDate를 담은 객체

  // 2초 로딩
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 20000000);

    // 타이머 정리 (컴포넌트 언마운트 시)
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="spendTypeTest">
      <PrimaryHeader header_title="여행 소비 유형 테스트" />
      {isLoading ? <LoadingScreen /> : <ResultPage {...travelInfo} />}
    </Container>
  );
};

export default PredictAmount;
