import { useNavigate, useParams } from 'react-router-dom';
import PrimaryButton from '../common/PrimaryButton';
import styled from 'styled-components';
import font from '../styles/font';
import color from '../styles/color';
import investIntro_Splash from './assets/investIntro_Splash.jpg';
import { useState } from 'react';
import { useEffect } from 'react';
import PrimaryHeader from '../common/PrimaryHeader';
import HighLightText from '../common/HighLightText';
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
        <MainText>
          <span style={{ color: color.brand.primary }}>맞춤형 투자</span>를 <br />
          분석하고 있어요
        </MainText>
      </div>
      <ImgContainer src={investIntro_Splash} />
    </ContentContainer>
  );
};

const Intro_ResultPage = () => {
  // newAccount 혹은 exTech
  const type = useParams().type;
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="investIntroResult">
      <PrimaryHeader header_title={isLoading ? '맞춤형 진단' : '맞춤형 투자 분석'} />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <PrimaryButton type="active" text="환테크 시작하기" onClick={() => navigation(`/${type}`)}></PrimaryButton>
      )}
    </Container>
  );
};

export default Intro_ResultPage;
