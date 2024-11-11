import styled, { css } from 'styled-components';
import PrimaryHeader from '../common/PrimaryHeader';
import ReportComponent from './ReportComponent';
import { useRecoilValue } from 'recoil';
import { travelInfo } from '../Recoil/travelState';
import color from '../styles/color';
import { useState } from 'react';
import { useEffect } from 'react';
import font from '../styles/font';
import HighLightText from '../common/HighLightText';
import Loading from './assets/atm.jpg';
import PrimaryButton from '../common/PrimaryButton';

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

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;

  width: 100%;
`;

const ToggleElement = styled.div`
  height: 60px;
  flex-grow: 1;
  cursor: pointer;
  text-align: center;
  border-bottom: 2px solid ${color.grayscale.gray5};
  font-size: 16px;
  font-weight: 500;
  line-height: 16px; /* 100% */

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  ${props =>
    props.active
      ? css`
          border-color: ${color.brand.primary};
          color: ${color.brand.primary};
        `
      : css`
          border-color: ${color.grayscale.gray5};
          color: ${color.grayscale.gray5};
        `}
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex: 1 0 0;
  align-self: stretch;
`;

const BtnContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubText = styled.div`
  ${font.caption.cap1R};
  color: ${color.grayscale.gray5};
`;

const WrongDirection = ({ travelState }) => {
  // travelState가 during일 떄에만 일단 작업

  return (
    <>
      {' '}
      <ContentContainer>
        <HighLightText text="아직 여행중이에요" />
        <SubText>
          여행이 끝나면 <br /> 최종 소비 리포트를 확인할 수 있어요
        </SubText>
        <img src={Loading} style={{ width: '100%', objectFit: 'cover' }} />
      </ContentContainer>
      <BtnContainer>
        <PrimaryButton text="지금 시작하기" type="active" />
      </BtnContainer>
    </>
  );
};

//  path: '/report/:travelState'
// travelState에 따라 첫 토글의 상태가 달라야함.
const During_ReportPage = () => {
  const travelState = useRecoilValue(travelInfo);
  const [toggleState, setToggle] = useState(0);

  /* 여행 후 레포트 버튼 클릭하여 최종 레포트 접근시 최종 레포트를 보임 */
  useEffect(() => {
    if (travelState === 'after') setToggle(1);
  }, []);

  useEffect(() => {
    // 여행 중인데 최종에 접근시
    if (travelState === 'during') {
    }
    // 여행 후인데 데일리에 접근시
    if (travelState === 'after') {
      if (toggleState === 1) return {};
    }
  }, [toggleState]);

  return (
    <Container className="reportPage">
      <PrimaryHeader header_title="소비 리포트" />
      {/* tab bar */}
      {/* tab bar의 상태에 따라 레포트에 렌더링되는 데이터가 달라짐 */}
      <ToggleContainer>
        <ToggleElement
          active={toggleState === 0}
          onClick={() => {
            setToggle(0);
          }}
        >
          데일리
        </ToggleElement>
        <ToggleElement
          active={toggleState === 1}
          onClick={() => {
            setToggle(1);
          }}
        >
          최종
        </ToggleElement>
      </ToggleContainer>
      {/* travelState가 during인데 최종에 접근시 */}
      {(travelState === 'during' && toggleState === 1) || (travelState === 'after' && toggleState === 0) ? (
        <WrongDirection travelState={travelState} />
      ) : (
        <ReportComponent />
      )}
      {/* travelState가 after인데 데일리에 접근시*/}
    </Container>
  );
};

export default During_ReportPage;
