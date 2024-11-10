import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import PrimaryHeader from '../common/PrimaryHeader';

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

const LoadingScreen = () => {
  return (
    <div style={{ backgroundColor: 'red', textAlign: 'center', padding: '50px', color: '111111' }}>
      <h2>Loading...</h2>
      <p>Please wait while we prepare your content.</p>
    </div>
  );
};

const MainScreen = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px', color: '111111' }}>
      <h1>Welcome to the Main Screen</h1>
      <p>Your content is ready!</p>
    </div>
  );
};

const SpendTypeTest = () => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

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
      {isLoading ? <LoadingScreen /> : <MainScreen />}
    </Container>
  );
};

export default SpendTypeTest;
