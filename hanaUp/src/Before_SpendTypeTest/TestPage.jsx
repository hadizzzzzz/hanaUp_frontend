import styled from 'styled-components';
import font from '../styles/font';
import Chip from '../common/Chip';
import QuizBtn from './components/QuizBtn';
import PrimaryButton from '../common/PrimaryButton';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryHeader from '../common/PrimaryHeader';
import color from '../styles/color';
import CustomProgressBar from './components/CustomProgressBar';

const RootContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`;

const ContentWrapContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 375px;
  padding: 24px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
`;

const TitleHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 4px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  color: var(--bk, #2d2d2d);
  ${font.header.h2};

  text-align: left;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
`;

const BtnContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
`;

// props
// api 호출 후 결과를 담아 navigation을 수행
const TestPage = props => {
  // [answer, setAnswer] = useState(false); // 정답 관리
  const [percent, setPercent] = useState(0); // progressbar 관리

  const navigation = useNavigate();
  const location = useLocation();

  const handleTestDone = () => {
    // const res = axios.post
    const res = 'res example';

    navigation(`/predictService/spendTypeTest/result`, {
      state: {
        ...location.state,
        // resultType: res.data.resultType,
        testDone: true,
        resultType: 'ITMEP',
      },
      res: {
        res,
      },
    });
  };

  // 응답 개수를 세서 특정 값보다 작다면 onClick 함수를 이 함수로
  const handleTestNext = item => {
    setPercent(percent + 25);
  };

  return (
    <RootContainer className="spendTypeTestPage">
      <PrimaryHeader header_title="여행 기본 정보 입력하기"></PrimaryHeader>
      <ContentWrapContainer>
        <ContentContainer>
          <TitleHeaderContainer>
            <CustomProgressBar percent={percent} />
            <TitleContainer>
              <Chip type="color" text="chip" />
              <div>
                여행을 떠날 때 <br />
                가장 먼저 챙기는 것은?
              </div>
            </TitleContainer>
          </TitleHeaderContainer>
          <OptionContainer>
            <QuizBtn type="active" text="옵션" />
            <QuizBtn type="deactive" text="옵션" />
          </OptionContainer>
        </ContentContainer>
      </ContentWrapContainer>

      <BtnContainer>
        <PrimaryButton text="다음" type="active" onClick={handleTestNext} />
      </BtnContainer>
    </RootContainer>
  );
};

export default TestPage;
