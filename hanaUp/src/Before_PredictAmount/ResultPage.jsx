import styled from 'styled-components';
import banner from './assets/banner.jpg';
import PrimaryTag from '../common/PrimaryTag';
import color from '../styles/color';
import calculateDateDiff from '../common/calculateDateDiff';
import font from '../styles/font';
import DollarBox from '../common/DollarBox';
import PrimaryBanner from '../common/PrimaryBanner';
import SpendTypeTest_Graph from '../Before_Common/SpendTypeTest_Graph';

const RootContainer = styled.div`
  display: flex;
  padding-bottom: 40px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const ImgContainer = styled.img`
  width: 100%;
`;

const ExpenseResultContainer = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
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
  padding-bottom: 10.771px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40.229px;
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

// res : api post 결과
const ResultPage = ({ startDate, endDate, country, res }) => {
  //   res.currency에 맞게 화폐단위를 표시하는 로직 필요

  return (
    <RootContainer>
      <ImgContainer src={banner} />
      <ExpenseResultContainer>
        <TextContainer>
          <PrimaryTag text="맞춤형 예측 서비스"></PrimaryTag>
          <MainText>
            <span style={{ color: color.brand.primary }}>{calculateDateDiff(new Date(), startDate)}일</span> 뒤{' '}
            <span style={{ color: color.brand.primary }}>{country}</span>에서 여행, <br /> 나의 예상 지출 금액이에요
          </MainText>
          <SubText>나의 지난 소비 내역을 분석했어요</SubText>
        </TextContainer>
        <DollarBox
          startDate={startDate}
          endDate={endDate}
          currency={'￥'}
          country={country}
          amount={res.estimatedCost}
        ></DollarBox>
        <SmallHorizon />
        <PrimaryBanner caption="예상된 금액을 바로 환전해보세요" text="환전 유도할까 소액투자 광고할까 뭐하지 뭐하지" />
      </ExpenseResultContainer>
      <Horizon />
      <GraphContainer>
        <TextContainer>
          <MainText>
            여행 소비 계획을 <br /> 세워보세요
          </MainText>
          <SubText>예상 지출 비용의 항목별 지출이에요</SubText>
        </TextContainer>
        <GraphWrapper>
          <SpendTypeTest_Graph />
        </GraphWrapper>
      </GraphContainer>
    </RootContainer>
  );
};

export default ResultPage;
