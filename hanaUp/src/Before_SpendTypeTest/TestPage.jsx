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
import { useEffect } from 'react';
import countryInfo from '../common/arrays/countryInfo';
import { useRecoilValue } from 'recoil';
import { uid } from '../Recoil/uid';
import calculateDateDiff from '../common/calculateDateDiff';
import axios from 'axios';

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
const TestPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigation = useNavigate();
  const location = useLocation();
  const userId = useRecoilValue(uid);

  const [answerSelected, setAnswerSelected] = useState(''); // 클릭 상태를 관리

  const [questionType, setQuestionType] = useState(0); // n
  const [questionTypeIndex, setQuestionTypeIndex] = useState(0); // m
  const [answerCount, setAnswerCount] = useState(0); // 위의 progressbar을 위함
  const [answers, setAnswers] = useState({
    'E/I': [],
    'F/T': [],
    'ME/PH': [],
    'J/P': [],
  }); // 최종 답변 저장

  const testQuestions = [
    [
      // E / I
      '낯선 장소에서 현지인에게 먼저 말을 걸어 정보를 얻는 편인가요, 아니면 스스로 조용히 알아보는 편인가요?',
      '낯선 식당이나 카페에서 새로운 사람들과 테이블을 공유해도 괜찮은가요, 아니면 혼자 혹은 일행과만 시간을 보내는 걸 선호하나요?',
      '현지 시장이나 골목에서 물건을 구경할 때 상인이나 현지인과 대화를 나누며 정보를 얻나요, 아니면 조용히 둘러보는 걸 선호하나요?',
    ],
    [
      // F / T
      '현지에서 유명한 랜드마크를 꼭 가보고 싶나요, 아니면 유명한 음식을 꼭 먹어보고 싶나요?',
      '식당에서 줄을 기다려야 한다면, 기꺼이 기다릴 수 있나요, 아니면 기다리지 않고 다른 관광지를 가고 싶나요?',
      '사진으로 남기고 싶은 순간이 음식일 때가 많나요, 아니면 관광 명소일 때가 많나요?',
    ],
    [
      // ME / PH
      '여행 후 기억에 남는 것은 순간의 감정인가요, 아니면 사진으로 남긴 장면인가요?',
      '여행 중 좋은 장소를 발견하면 머물면서 그 분위기를 즐기나요, 아니면 사진을 빠르게 찍고 다른 곳으로 이동하나요?',
      'SNS에 여행 사진을 공유하는 것을 좋아하나요, 아니면 개인적인 추억으로 간직하나요?',
    ],
    [
      // J P
      '오늘 하루 일정을 미리 알고 가야 마음이 편한가요, 아니면 여행 중 즉흥적인 변화를 즐기는 편인가요?',
      '맛집이나 관광지를 미리 예약하고 가는 편인가요, 아니면 도착 후 근처에서 찾아보는 편인가요',
      '예기치 않은 상황으로 계획이 바뀌면 스트레스를 받나요, 아니면 새로운 상황을 흥미롭게 받아들이나요?',
    ],
  ];
  const testAnswers = [
    //
    [
      ['먼저 말을 건다', '스스로 조용히 알아본다'],
      ['새로운 친구 사귀고 좋다', '체할 것 같다'],
      ['대화하며 정보를 얻는다', '조용히 구경한다'],
    ],
    [
      ['유명한 음식을 경험한다', '유명한 랜드마크를 방문한다'],
      ['기다릴 수 있다', '기다리기 싫다'],
      ['음식 사진', '관광 명소 사진'],
    ],
    [
      ['순간의 감정', '갤러리 속 사진'],
      ['머물며 즐긴다', '빠르게 찍고 이동한다'],
      ['개인적인 추억으로 간직한다', 'SNS로 공유한다'],
    ],
    [
      ['미리 알고 가야 마음이 편하다', '즉흥적 변화를 즐긴다'],
      ['미리 예약한다', '도착 후에 검색한다'],
      ['스트레스 받는다', '흥미롭게 받아들인다'],
    ],
  ];

  const typeIndex = [
    ['E', 'I'],
    ['F', 'T'],
    ['ME', 'PH'],
    ['J', 'P'],
  ];

  const handleTestDone = async updatedAnswers => {
    // answers에서 마지막 답변이 저장되지 않는 이슈가 있으니 유의할 것
    // 인자로 넘기는 방식을 사용하여 해결함
    try {
      const currency = countryInfo.find(item => item.country_en === location.state.country).currency_code;
      const duration = calculateDateDiff(location.state.endDate, location.state.startDate) + 1;

      console.log('test page post 임시 출력', {
        userId: userId,
        destination: location.state.country,
        currency: `${currency}`,
        duration: duration,
        answers: updatedAnswers,
      });
      const res = await axios.post(`${BASE_URL}/api/before-travel/type-test`, {
        userId: userId,
        destination: location.state.country,
        currency: `${currency}`,
        duration: duration,
        answers: updatedAnswers,
      });
      const data = res.data;
      console.log('test done fetch', res);
      // data를 state에 넣으면 됨
      // const res = {
      //   resultType: 'ETMEJ', // 최종 결과 유형
      //   estimatedCost: 1500,
      //   currency: 'USD',
      // };

      navigation(
        '/predictService/spendTypeTest/result',
        {
          state: {
            ...location.state,
            testDone: true,
            res: res.data,
          },
        },
        {
          replace: true,
        },
      );
    } catch (error) {
      console.log('test error', error);
    }
  };

  const handleTestNext = () => {
    const currentType = typeIndex[questionType];
    const selectedType = currentType[answerSelected];

    // 답변을 먼저 업데이트
    const updatedAnswers = {
      ...answers,
      [`${currentType[0]}/${currentType[1]}`]: [...answers[`${currentType[0]}/${currentType[1]}`], selectedType],
    };

    setAnswers(updatedAnswers); // 상태 업데이트

    // 마지막 질문이면 저장 후 완료 처리
    if (answerCount + 1 === 12) {
      // setAnswers가 완료된 후 handleTestDone을 호출
      handleTestDone(updatedAnswers);
      return;
    }

    // 다음 질문으로 이동
    const nextType = (questionType + 1) % 4; // 질문 타입 순환
    const nextIndex = questionTypeIndex + 1 < testQuestions[questionType].length ? questionTypeIndex + 1 : 0;

    setAnswerSelected('');
    setQuestionType(nextType);
    setQuestionTypeIndex(nextIndex);
    setAnswerCount(prev => prev + 1);
  };

  const handleQuizBtnClick = ({ clicked }) => {
    setAnswerSelected(clicked); // 0 또는 1
  };

  useEffect(() => {
    const initialType = Math.floor(Math.random() * 4); // 랜덤 시작
    setQuestionType(initialType);
  }, []);

  if (answerCount !== 12)
    return (
      <RootContainer className="spendTypeTestPage">
        <PrimaryHeader header_title="여행 소비 유형 테스트"></PrimaryHeader>
        <ContentWrapContainer>
          <ContentContainer>
            <TitleHeaderContainer>
              <CustomProgressBar percent={(answerCount / 12) * 100} />
              <TitleContainer>
                <Chip type="color" text="나의 여행 스타일은?" />
                {testQuestions[questionType][questionTypeIndex]}
              </TitleContainer>
            </TitleHeaderContainer>
            <OptionContainer>
              <QuizBtn
                type={answerSelected === 0}
                text={testAnswers[questionType][questionTypeIndex][0]}
                onClick={() => handleQuizBtnClick({ clicked: 0 })}
              />
              <QuizBtn
                type={answerSelected === 1}
                text={testAnswers[questionType][questionTypeIndex][1]}
                onClick={() => handleQuizBtnClick({ clicked: 1 })}
              />
            </OptionContainer>
          </ContentContainer>
        </ContentWrapContainer>

        <BtnContainer>
          <PrimaryButton
            text="다음"
            type="active"
            onClick={() => {
              if (answerSelected !== '') handleTestNext();
            }}
          />
        </BtnContainer>
      </RootContainer>
    );
  else {
    handleTestDone();
  }
};

export default TestPage;
