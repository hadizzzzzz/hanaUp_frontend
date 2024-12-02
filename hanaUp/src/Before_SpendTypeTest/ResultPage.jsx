import { replace, useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import color from '../styles/color';
import font from '../styles/font';
import calculateDateDiff from '../common/calculateDateDiff';
import type1 from './spendTypes/type1.jpg'; // type에 따라 동적 렌더링 필요
import DollarBox from '../common/DollarBox';
import PrimaryButton from '../common/PrimaryButton';
import SpendTypeTest_Graph from '../Before_Common/SpendTypeTest_Graph';
import Msg from '../common/Msg';
import { typeInfo } from '../common/arrays/typeInfo';
import { useEffect } from 'react';
import countryInfo from '../common/arrays/countryInfo';
import PrimaryTag from '../common/PrimaryTag';
import banner from '/img/banner.jpg';

// 버튼 컨테이너를 제외한 content만의 컨테이너
const RootContainer = styled.div`
  width: 100%;

  display: flex;
  padding-top: 40px;
  padding-bottom: 40px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 0px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`;

const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const SubTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Horizon = styled.div`
  width: 100%;
  background-color: #efefef;
  height: 10px;
`;

const GraphContainer = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`;

const MainText = styled.div`
  ${font.header.h2};

  color: #2d2d2d;
  text-align: left;
`;

const SubText = styled.div`
  color: ${color.grayscale.gray8};
  ${font.header.h5R};
`;

const SmallHorizon = styled.div`
  height: 1.5px;
  width: 100%;
  background-color: rgba(164, 169, 174, 0.15);
`;

const GraphWrapper = styled.div`
  width: 335px;
  height: 270px;

  display: flex;
  padding: 14px 20px;

  border-radius: 18px;
  border: 1px solid ${color.grayscale.gray1};
  background: var(--white, #fff);
  box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.05);
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
// resultType : 어떤 타입인지 문자열로
// testDone (사용 X)

// navigation의 state
// startDate
// endDate
// country
// res
const ResultPage = () => {
  const location = useLocation();
  const travelInfo = { ...location.state };
  const testResult = { ...location.state.res };

  const navigation = useNavigate();

  var breakdown = [0.326, 0.264, 0.148, 0.2, 0.054];
  var averageBreakdown = [0.326, 0.264, 0.148, 0.2, 0.054];

  const getProcessedBreakdown = () => {
    breakdown = [0.226, 0.264, 0.148, 0.2, 0.154];
    averageBreakdown = [0.226, 0.264, 0.148, 0.2, 0.154];
    for (let i = 0; i < 5; i++) {
      breakdown[i] = breakdown[i] * testResult.estimatedCost;
      averageBreakdown[i] = averageBreakdown[i] * testResult.estimatedCost;
    }
    if (testResult.resultType) {
      if (testResult.resultType[0] === 'E') {
        // 외향 활동비*110%
        breakdown[3] = breakdown[3] * 1.1; // 활동비 * 1.1
        breakdown[4] = breakdown[4] * 0.9; // 숙박비 *0.9;

        averageBreakdown[3] = averageBreakdown[3] * 1.3;
        averageBreakdown[4] = averageBreakdown[4] * 0.7;
      }
      if (testResult.resultType[1] === 'F') {
        // + 맛집 식비*110%
        breakdown[4] = breakdown[4] * 0.8; // 숙박비 * 0.8;
        breakdown[1] = breakdown[1] * 1.1; // 식비 * 1.1
        breakdown[0] = breakdown[0] * 1.1; // 교통비 *1.1;

        averageBreakdown[4] = averageBreakdown[4] * 0.7; // 숙박비 * 0.8;
        averageBreakdown[1] = averageBreakdown[1] * 1.4; // 식비 * 1.1
        averageBreakdown[0] = averageBreakdown[0] * 1.3; // 교통비 *1.1;
      }
      if (testResult.resultType.substr(2, 2) === 'ME') {
        // + 추억 교통비*110%
        breakdown[1] = breakdown[1] * 1.1; // 식비 * 1.2;
        breakdown[0] = breakdown[0] * 1.1; // 교통비 *1.1;

        averageBreakdown[1] = averageBreakdown[1] * 1.4; // 식비 * 1.1
        averageBreakdown[0] = averageBreakdown[0] * 1.3; // 교통비 *1.5;
      }
      return [breakdown, averageBreakdown];
    }
  };

  useEffect(() => {
    getProcessedBreakdown();
  }, [testResult]);

  useEffect(() => {}, [breakdown, averageBreakdown]);

  const typeInfoSelected = typeInfo.find(item => testResult.resultType === item.type_en) || {};

  return (
    <>
      <RootContainer>
        <img src={banner} style={{ width: '100%' }}></img>
        <ContentContainer>
          <MainText style={{ width: '100%' }}>
            <PrimaryTag text="맞춤형 예측 서비스" />
            <span style={{ color: color.brand.primary }}>
              {calculateDateDiff(new Date(), travelInfo.startDate)}일
            </span>{' '}
            뒤{' '}
            <span style={{ color: color.brand.primary }}>
              {countryInfo.find(item => item.country_en === travelInfo.country).country_kr}
            </span>
            에서 여행, <br /> 내 소비 유형은
          </MainText>
          {/* 동적 렌더링 필요 */}
          <ImgContainer>
            <img src={`/img/travelTypes/${typeInfoSelected.type_en}.jpg`} style={{ width: '258px' }}></img>
          </ImgContainer>
          <SubTextContainer>
            <div style={{ ...font.header.h3, color: color.grayscale.gray8 }}>
              당신은 {typeInfoSelected.type_kr}입니다!
            </div>
            <div style={{ ...font.caption.cap2M, color: color.grayscale.gray5 }}>{typeInfoSelected.description}</div>
          </SubTextContainer>
        </ContentContainer>
        <Horizon />
        <ContentContainer>
          <MainText>
            <span style={{ color: color.brand.primary }}>{typeInfoSelected.type_kr}</span> 유형의 <br /> 평균 지출
            금액이에요
          </MainText>
          <DollarBox
            startDate={travelInfo.startDate}
            endDate={travelInfo.endDate}
            currency={'₩'}
            country={travelInfo.country}
            amount={testResult.estimatedCost}
            caption={'나와 같은 유형의 소비 내역을 분석했어요'}
          />
          <Msg type="positive" text="트래블로그와 함께 수수료 15,230원 절약했어요" />
        </ContentContainer>
        <Horizon />
        <ContentContainer>
          <TextContainer>
            <MainText>
              여행 소비 계획을 <br /> 세워보세요
            </MainText>
            <SubText>{typeInfoSelected.type_kr} 사람들의 항목별 지출이에요</SubText>
          </TextContainer>
          <GraphWrapper>
            <SpendTypeTest_Graph
              currency={countryInfo.find(item => item.country_en === travelInfo.country).currency_symbol}
              breakdown={getProcessedBreakdown()[0]}
              averageBreakdown={getProcessedBreakdown()[1]}
            />
          </GraphWrapper>
        </ContentContainer>
      </RootContainer>
      <BtnContainer>
        <PrimaryButton text="환전하기" type="active" onClick={() => navigation('/', { replace: true })} />
      </BtnContainer>
    </>
  );
};

export default ResultPage;
