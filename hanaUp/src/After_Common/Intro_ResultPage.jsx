import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PrimaryButton from '../common/PrimaryButton';
import styled from 'styled-components';
import font from '../styles/font';
import color from '../styles/color';
import investIntro_Splash from '../../public/img/investIntro_Splash.jpg';
import { useState } from 'react';
import { useEffect } from 'react';
import PrimaryHeader from '../common/PrimaryHeader';
import HighLightText from '../common/HighLightText';
import giveCoin from '../../public/img/giveCoin.jpg';
import { LinearGradient } from 'react-text-gradients';
import DollarBox from '../common/DollarBox';
import PrimaryTag from '../common/PrimaryTag';
import ChartIcn from './assets/Icn_1_chart.png';
import DollarReceiveIcn from './assets/Icn_2_dollar.png';
import BoltIcn from './assets/Icn_3_bolt.png';
import SackDollarIcn from './assets/Icn_4_sackDollar.png';

const Container = styled.div`
  width: 390px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow: scroll;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LoadingContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 40px;
  flex-grow: 1;
`;

const ContentContainer = styled.div`
  padding-top: 54px; // 상단 영역
  padding-bottom: 110px; // 하단 영역
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 30px;

  overflow: scroll;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
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

const FixedHeaderContainer = styled.div`
  width: 388px;

  position: fixed;
  top: 0px;

  background-color: white;
`;

const FixedBtnContainer = styled.div`
  width: 388px;
  display: flex;
  padding: 20px;
  padding-top: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  position: fixed;
  bottom: 0px;

  background: linear-gradient(178deg, rgba(255, 255, 255, 0) 1.36%, rgba(255, 255, 255, 0.7) 6.24%, #fff 20.86%);
`;

// 결과 분석 페이지
const ResultContentContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SingleContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const AnalyzeContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  background-color: #f8f8f8;
  border-radius: 10px;
`;

const AnalyzeTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  color: ${color.grayscale.gray7};
  ${font.header.h5R};
  text-align: start;
`;

const AnalyzeIcnContainer = styled.img`
  width: 24px;
  height: 24px;
  object-fit: cover;
`;

const InterestRateContainer = styled.div`
  display: flex;
  padding: 20px 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  align-self: stretch;

  border-radius: 10px;
  background: #f8f8f8;
`;

const CountryIcnContainer = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  ${font.caption.cap1R};
  color: ${color.grayscale.gray7};
`;

const CountryIcnWrapper = styled.img`
  width: 24px;
  height: 24px;
`;

const LoadingScreen = () => {
  return (
    <LoadingContentContainer>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <MainText>
          <span style={{ color: color.brand.primary }}>맞춤형 투자</span>를 <br />
          분석하고 있어요
        </MainText>
      </div>
      <ImgContainer src={investIntro_Splash} />
    </LoadingContentContainer>
  );
};

// 사용하는 데이터는 navigation의 state에 담겨옴
// selectedFundInfo
// investMethodInfo
// countryInfo
const Intro_ResultPage = () => {
  // newAccount 혹은 exTech
  const navigation = useNavigate();
  const location = useLocation();
  const { selectedFundInfo, investMethodInfo, countryInfo } = location.state;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="investIntroResult">
      {isLoading ? (
        <PrimaryHeader header_title={'맞춤형 진단'} />
      ) : (
        <FixedHeaderContainer>
          <PrimaryHeader style={{}} header_title={'맞춤형 투자 분석'} />
        </FixedHeaderContainer>
      )}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {' '}
          <ContentContainer>
            <ResultContentContainer>
              {/* 이미지 */}
              <img src={giveCoin} style={{ width: '100%', objectFit: 'cover' }} />
              {/* recommend */}
              <SingleContentContainer style={{ gap: '10px' }}>
                <div style={{ textAlign: 'center', width: '100%', ...font.header.h5M, color: color.grayscale.gray8 }}>
                  {countryInfo.country_kr} 여행 후에는
                </div>
                <div style={{ textAlign: 'center', width: '100%', ...font.header.h2, color: color.grayscale.gray8 }}>
                  <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>
                    {investMethodInfo.investmentType} 투자 방식
                  </LinearGradient>
                  을 추천해요
                </div>
              </SingleContentContainer>
              {/* Horizon */}
              <div style={{ height: '1.5px', backgroundColor: 'rgba(164, 169, 174, 0.15)', width: ' 100%' }}></div>
              {/* 하나머니 보유금액과 dollarbox */}
              <SingleContentContainer style={{ gap: '15px', paddingBottom: '6px' }}>
                <div style={{ textAlign: 'left', width: '100%', ...font.header.h3, color: color.grayscale.black }}>
                  하나 머니 보유 금액
                </div>
                <DollarBox
                  amount={investMethodInfo.balance}
                  startDate={selectedFundInfo.startDate}
                  endDate={selectedFundInfo.endDate}
                  type="entire"
                  country={countryInfo.country_en}
                  currency={countryInfo.currency_symbol}
                />
              </SingleContentContainer>
              <SingleContentContainer style={{ gap: '15px' }}>
                {/* 분석 내용 */}
                <div style={{ textAlign: 'left', width: '100%', ...font.header.h3, color: color.grayscale.black }}>
                  분석 내용
                </div>
                <AnalyzeContainer>
                  <AnalyzeTextContainer>
                    <AnalyzeIcnContainer src={ChartIcn} />
                    2024년 {new Date().getMonth() + 1}월의 {countryInfo.country_kr}과 한국의 환율과 금리를 종합하여
                    비교했어요.
                  </AnalyzeTextContainer>
                  <AnalyzeTextContainer>
                    <AnalyzeIcnContainer src={DollarReceiveIcn} />
                    {countryInfo.country_kr}의 금리가 한국의 금리보다{' '}
                    {investMethodInfo.investmentType === '환테크' ? '낮아요' : '높아요'}
                  </AnalyzeTextContainer>
                  <AnalyzeTextContainer>
                    <AnalyzeIcnContainer src={BoltIcn} />
                    {investMethodInfo.investmentType === '환테크'
                      ? '환율 변동을 예측한 환테크 투자가 유리해요.'
                      : '외화예금 상품에 투자하는게 유리해요.'}
                  </AnalyzeTextContainer>
                  {investMethodInfo.investmentType !== '환테크' && (
                    <AnalyzeTextContainer>
                      <AnalyzeIcnContainer src={SackDollarIcn} />
                      최대 5%의 수익이 예상돼요
                    </AnalyzeTextContainer>
                  )}
                </AnalyzeContainer>
              </SingleContentContainer>
              <SingleContentContainer style={{ gap: '20px' }}>
                {/* 금리 내용 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
                  <PrimaryTag text="꼭 읽어보세요" />
                  <div style={{ ...font.header.h2, color: '#2d2d2d' }}>
                    <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>
                      {countryInfo.country_kr}
                    </LinearGradient>
                    의 금리
                  </div>
                  {investMethodInfo.investmentType === '환테크' ? (
                    <div style={{ ...font.caption.cap2M, color: '#2d2d2d', textAlign: 'left' }}>
                      금리가 우리나라보다 낮기 때문에 <br />
                      외화 예금에 투자하는 것보다{' '}
                      <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>
                        환율 변동을 예측한 환테크
                      </LinearGradient>
                      를 통해
                      <br />
                      수익을 얻는 것이 더 유리할 수 있어요.
                    </div>
                  ) : (
                    <div style={{ ...font.caption.cap2M, color: '#2d2d2d', textAlign: 'left' }}>
                      {' '}
                      금리가 우리나라보다 높기 때문에 <br />
                      <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>
                        외화 예금에 투자
                      </LinearGradient>
                      하면 한국의 예금 상품에 돈을 넣는 것보다 <br /> 더 높은 수익을 기대할 수 있어요.
                    </div>
                  )}
                </div>
                <InterestRateContainer>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}
                  >
                    <CountryIcnContainer>
                      <CountryIcnWrapper
                        src={`/img/countryIcons/${
                          investMethodInfo.investmentType === '환테크' ? countryInfo.country_en : 'Korea'
                        }.png`}
                      />
                      {investMethodInfo.investmentType === '환테크' ? (
                        <div>{countryInfo.country_kr}</div>
                      ) : (
                        <div>한국</div>
                      )}
                    </CountryIcnContainer>
                    <CountryIcnContainer>
                      {investMethodInfo.investmentType === '환테크' ? (
                        <div>{investMethodInfo.interestRate}%</div>
                      ) : (
                        <div>3.25%</div>
                      )}
                    </CountryIcnContainer>
                  </div>
                  <div style={{ width: '100%', height: '1.5px', backgroundColor: 'rgba(164, 169, 174, 0.15)' }}></div>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}
                  >
                    <CountryIcnContainer>
                      <CountryIcnWrapper
                        src={`/img/countryIcons/${
                          investMethodInfo.investmentType !== '환테크' ? countryInfo.country_en : 'Korea'
                        }.png`}
                      />
                      {
                        <LinearGradient
                          gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}
                          style={{ ...font.header.h3 }}
                        >
                          {investMethodInfo.investmentType === '환테크' ? '한국' : countryInfo.country_kr}
                        </LinearGradient>
                      }
                    </CountryIcnContainer>
                    <CountryIcnContainer>
                      <LinearGradient
                        gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}
                        style={{ ...font.header.h3 }}
                      >
                        {investMethodInfo.investmentType === '환테크' ? '3.25%' : `${investMethodInfo.interestRate}%`}
                      </LinearGradient>
                    </CountryIcnContainer>
                  </div>
                </InterestRateContainer>
                <div style={{ ...font.caption.cap2R, color: '#424242', textAlign: 'center', width: '100%' }}>
                  {new Date().getFullYear()}. {new Date().getMonth() + 1}. {new Date().getDate()}. 00:00 기준
                </div>
              </SingleContentContainer>
            </ResultContentContainer>
          </ContentContainer>
          <FixedBtnContainer>
            <PrimaryButton
              type="active"
              text={`${investMethodInfo.investmentType} 시작하기`}
              onClick={() => {
                if (investMethodInfo.investmentType === '환테크')
                  navigation('/exTech', {
                    state: {
                      selectedFundInfo: selectedFundInfo,
                      investMethodInfo: investMethodInfo,
                      countryInfo: countryInfo,
                    },
                  });
                else {
                  console.log('navigation');
                  navigation('/newAccount', {
                    state: {
                      selectedFundInfo: selectedFundInfo,
                      investMethodInfo: investMethodInfo,
                      countryInfo: countryInfo,
                    },
                  });
                }
              }}
            ></PrimaryButton>
          </FixedBtnContainer>
        </>
      )}
    </Container>
  );
};

export default Intro_ResultPage;
