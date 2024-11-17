import { useLocation } from 'react-router-dom';
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

// pa
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
// props
// resultType : 어떤 타입인지 문자열로
// testDone (사용 X)

// navigation의 state
// startDate
// endDate
// country
// res
const ResultPage = props => {
  const location = useLocation();
  const travelInfo = { ...location.state };
  const testResult = { ...location.res };

  // 임의로 넣어둔 값
  const typeInfoSelected = typeInfo.find(item => travelInfo.resultType === item.type_en) || {};
  return (
    <>
      <RootContainer>
        <ContentContainer>
          <MainText>
            <span style={{ color: color.brand.primary }}>{calculateDateDiff(new Date(), travelInfo.startDate)}일</span>{' '}
            뒤 <span style={{ color: color.brand.primary }}>{travelInfo.country.value}</span>에서 여행, <br /> 내 소비
            유형은
          </MainText>
          {/* 동적 렌더링 필요 */}
          <ImgContainer>
            <img src={`/img/travelTypes/${travelInfo.resultType}.jpg`} style={{ width: '258px' }}></img>
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
            <span style={{ color: color.brand.primary }}>{typeInfoSelected.type_kr}</span>
            의 사람들의 <br /> 평균 지출 금액이에요
          </MainText>
          <DollarBox
            startDate={travelInfo.startDate}
            endDate={travelInfo.endDate}
            currency={'￥'}
            country={travelInfo.country}
            amount={12345}
            // amount={res.estimatedCost}
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
            <SpendTypeTest_Graph />
          </GraphWrapper>
        </ContentContainer>
      </RootContainer>
      <BtnContainer>
        <PrimaryButton text="환전하기" type="active" />
      </BtnContainer>
    </>
  );
};

export default ResultPage;
