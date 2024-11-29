import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import PrimaryHeader from '../common/PrimaryHeader';
import HighLightText from '../common/HighLightText';
import font from '../styles/font';
import color from '../styles/color';
import loading from '../../public/img/loadingTicket.jpg';
import { useLocation } from 'react-router-dom';
import ResultPage from './ResultPage';

const Container = styled.div`
  width: 390px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ContentContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 30px;

  flex: 1 0 0;
`;

const MainText = styled.div`
  ${font.header.h1};
  width: 100%;

  color: #2d2d2d;
  text-align: center;

  position: relative;
`;

const SubText = styled.div`
  ${font.caption.cap1R};
  color: ${color.grayscale.gray5};
  text-align: center;
`;

const ImgContainer = styled.img`
  object-fit: cover;
  width: 100%;
`;

const LoadingScreen = () => {
  return (
    <ContentContainer>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <MainText>나에게 딱 맞는</MainText>
        <HighLightText text="경비 예측 중" />
      </div>
      <SubText>
        <span style={{ color: color.brand.primary }}>과거 결제 데이터</span>를 바탕으로 <br /> 자동으로 분석하고 있어요
        <br />
        <br />
        <span style={{ color: color.brand.primary }}>소비자</span>
        물가지수를 반영하여 <br />
        여행 경비를 예측해드릴게요
      </SubText>
      <ImgContainer src={loading} />
    </ContentContainer>
  );
};

// 여행할 나라
// startDate
const PredictAmountPage = () => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const location = useLocation();
  const travelInfo = { ...location.state }; // 여행 나라, startDate와 endDate를 담은 객체

  // 2초 로딩
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // 타이머 정리 (컴포넌트 언마운트 시)
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="spendTypeTest">
      <PrimaryHeader header_title="여행 경비 예측 서비스" />
      {isLoading ? <LoadingScreen /> : <ResultPage {...travelInfo} />}
    </Container>
  );
};

export default PredictAmountPage;
