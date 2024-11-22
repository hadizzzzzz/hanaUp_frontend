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
import axios from 'axios';
import { uid } from '../Recoil/uid';
import { during_travelDetail } from '../Recoil/during_travelDetail';

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
    props.$isactive === 'true'
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

// 여행 상태가 during인데 최종 소비 레포트에 접근하는 경우
const WrongDirection = () => {
  return (
    <>
      {' '}
      <ContentContainer>
        <HighLightText text="아직 여행중이에요" type="long" />
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
  const userId = useRecoilValue(uid);
  const during_travel = useRecoilValue(during_travelDetail);
  const [day, setDay] = useState(1);

  const [toggleState, setToggle] = useState(0);
  const [reportData, setReportData] = useState({});

  /* 여행 후 레포트 버튼 클릭하여 최종 레포트 접근시 최종 레포트를 보임 */
  useEffect(() => {
    if (travelState === 'after') setToggle(1);
    fetchTravelReportData();
    // const res = await axios.get(`${BASE_URL}/api/after-travel/final-report`, {
    //   userId: userId,
    //   country: during_travel.destination,
    // });
    // setReportData(res.data);
  }, []);

  useEffect(() => {
    fetchTravelReportData();
    console.log('새로운 여행 레포트 데이터 fetch');
  }, [day, toggleState]);

  // 토글 변경 혹은 일자 변경에 따라 다른 data를 요청
  const fetchTravelReportData = async () => {
    if (toggleState === 0) {
      console.log({
        userId: userId,
        day: day, // 1일차, 2일차, 3일차,
        country: during_travel.destination,
      });
      // const res = await axios.get(`${BASE_URL}/api/after-travel/daily-report`, {
      //   userId: userId,
      //   day: day, // 1일차, 2일차, 3일차,
      //   country: during_travel.destination,
      // });
      // setReportData(res.data);

      // 더미 데이터 세팅
      setReportData({
        day: 1,
        totalSpent: 120,
        breakdown: {
          transport: 20, //교통비
          food: 50, //식비
          shopping: 30, //쇼핑비
          activities: 15, //활동비
          hospital: 5, //병원비
        },
        feeSavings: 5, //절약한 수수료
      });
    } else {
      // 전체 소비 리포트 요청
      // const res = await axios.get(`${BASE_URL}/api/after-travel/final-report`, {
      //   userId: uidState,
      //   country: during_travel.destination,
      // });
      // setReportData(res.data);
      // {
      //   "totalSpent": 120,
      //   "breakdown": {
      //     "transport": 20, //교통비
      //     "food": 50, //식비
      //     "shopping": 30, //쇼핑비
      //     "activities": 15, //활동비
      //     "hospital": 5 //병원비
      //   },
      //   "feeSavings": 5 //절약한 수수료
      // }

      // 더미 데이터 세팅
      setReportData({
        totalSpent: 120,
        breakdown: {
          transport: 20, //교통비
          food: 50, //식비
          shopping: 30, //쇼핑비
          activities: 15, //활동비
          hospital: 5, //병원비
        },
        feeSavings: 5, //절약한 수수료
      });
    }
  };

  // type: subtract, add
  const setDayState = ({ type }) => {
    if (type === 'add') {
      if (day < 3) setDay(prev => prev + 1);
    } else {
      if (day > 1) setDay(prev => prev - 1);
    }
  };

  return (
    <Container className="reportPage">
      <PrimaryHeader header_title="소비 리포트" />
      {/* tab bar */}
      {/* tab bar의 상태에 따라 레포트에 렌더링되는 데이터가 달라짐 */}
      <ToggleContainer>
        <ToggleElement
          $isactive={toggleState === 0 ? 'true' : 'false'}
          onClick={() => {
            setToggle(0);
          }}
        >
          데일리
        </ToggleElement>
        <ToggleElement
          $isactive={toggleState === 1 ? 'true' : 'false'}
          onClick={() => {
            setToggle(1);
          }}
        >
          최종
        </ToggleElement>
      </ToggleContainer>
      {/* travelState가 during인데 최종에 접근시 */}
      {travelState === 'during' && toggleState === 1 ? (
        <WrongDirection travelState={travelState} />
      ) : (
        <ReportComponent
          country={during_travel.destination}
          day={day}
          setDayState={setDayState}
          reportData={reportData}
          toggleState={toggleState}
        />
      )}
    </Container>
  );
};

export default During_ReportPage;
