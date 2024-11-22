import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import PrimaryHeader from '../common/PrimaryHeader';
import HighLightText from '../common/HighLightText';
import font from '../styles/font';
import color from '../styles/color';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultPage from './ResultPage';
import SplashPage from './SplashPage';
import SpendTypeTest from './TestPage';
import ProcessPage from './ProcessPage';

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

const LoadingScreen = ({ state }) => {
  return state ? <ProcessPage /> : <SplashPage />;
};

// 여행할 나라
// startDate

// travelInfo.testDone을 사용하여 테스트 전/후를 구분
// testDone: false인 경우 : splash -> test 후 다시 navigate
// testDone: true인 경우 : 결과 생성 로딩 -> result page 보여주기
const SpendTypeTestPage = () => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const location = useLocation();
  const travelInfo = { ...location.state }; // 여행 나라, startDate와 endDate를 담은 객체
  const navigation = useNavigate();

  // 2초 로딩
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // 타이머 정리 (컴포넌트 언마운트 시)
    return () => clearTimeout(timer);
  }, []);

  // travelInfo.testDone
  if (isLoading) {
    return (
      <Container className="spendTypeTest">
        <PrimaryHeader header_title="여행 소비 유형 테스트" />
        <LoadingScreen state={travelInfo.testDone} />
      </Container>
    );
  } else if (travelInfo.testDone) {
    return (
      <Container className="spendTypeTest">
        <PrimaryHeader header_title="여행 소비 유형 테스트" />
        <ResultPage {...travelInfo} />
      </Container>
    );
  } else
    navigation('/predictService/spendTypeTest/test', {
      state: {
        ...travelInfo,
      },
    }); // 테스트가 필요한 경우 redirect
};

export default SpendTypeTestPage;
