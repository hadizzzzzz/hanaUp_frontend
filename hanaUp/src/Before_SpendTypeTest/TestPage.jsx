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
  word-break: keep-all;
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
  const [answerSelected, setAnswerSelected] = useState('');
  const [answerCount, setAnswerCount] = useState(0); // 정답 답변 상황: 0부터 증가
  const testQuestions = [
    '낯선 장소에서 현지인에게 먼저 말을 걸어 정보를 얻는 편인가요, 아니면 스스로 조용히 알아보는 편인가요?',
    '현지에서 유명한 랜드마크를 꼭 가보고 싶나요, 아니면 유명한 음식을 꼭 먹어보고 싶나요?',
    '여행 후 기억에 남는 것은 순간의 감정인가요, 아니면 사진으로 남긴 장면인가요?',
    '오늘 하루 일정을 미리 알고 가야 마음이 편한가요, 아니면 여행 중 즉흥적인 변화를 즐기는 편인가요?',
  ];
  const testAnswers = [
    ['먼저 말을 건다', '스스로 조용히 알아본다'],
    ['유명 음식 경험', '유명 랜드마크 방문'],
    ['순간의 감정', '갤러리 속 사진'],
    ['미리 알고 가야 마음이 편함', '즉흥적 변화를 즐김'],
  ];

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

  const handleTestNext = item => {
    setAnswerCount(answerCount + 1);
    setAnswerSelected(''); //선택된 정답 초기화

    if (answerCount === 4) {
      handleTestDone();
    }
  };

  const handleQuizBtnClick = ({ clicked }) => {
    setAnswerSelected(clicked); // 0 또는 1
  };

  if (answerCount !== 4)
    return (
      <RootContainer className="spendTypeTestPage">
        <PrimaryHeader header_title="여행 소비 유형 테스트"></PrimaryHeader>
        <ContentWrapContainer>
          <ContentContainer>
            <TitleHeaderContainer>
              <CustomProgressBar percent={answerCount * 25} />
              <TitleContainer>
                <Chip type="color" text="chip" />
                {testQuestions[answerCount]}
              </TitleContainer>
            </TitleHeaderContainer>
            <OptionContainer>
              <QuizBtn
                type={answerSelected === 0}
                text={testAnswers[answerCount][0]}
                onClick={() => handleQuizBtnClick({ clicked: 0 })}
              />
              <QuizBtn
                type={answerSelected === 1}
                text={testAnswers[answerCount][1]}
                onClick={() => handleQuizBtnClick({ clicked: 1 })}
              />
            </OptionContainer>
          </ContentContainer>
        </ContentWrapContainer>

        <BtnContainer>
          <PrimaryButton text="다음" type="active" onClick={handleTestNext} />
        </BtnContainer>
      </RootContainer>
    );
  else {
    handleTestDone();
  }
};

export default TestPage;
