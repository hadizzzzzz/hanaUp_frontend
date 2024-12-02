import styled, { css } from 'styled-components';
import PrimaryHeader from '../common/PrimaryHeader';
import ReportComponent from './ReportComponent';
import { useRecoilValue, useRecoilState } from 'recoil';
import { travelInfo } from '../Recoil/travelState';
import color from '../styles/color';
import { useState } from 'react';
import { useEffect } from 'react';
import font from '../styles/font';
import HighLightText from '../common/HighLightText';
import Loading from '/img/loading.jpg';
import PrimaryButton from '../common/PrimaryButton';
import axios from 'axios';
import { uid } from '../Recoil/uid';
import { during_travelDetail } from '../Recoil/during_travelDetail';

const Container = styled.div`
  width: 390px;
  margin: 0 auto;

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
  width: 100%;
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
const WrongDirection = ({ setTravelState }) => {
  return (
    <>
      <ContentContainer>
        <HighLightText text="아직 여행중이에요" type="long" />
        <SubText>
          여행이 끝나면 <br /> 최종 소비 리포트를 확인할 수 있어요
        </SubText>
        <img src={Loading} style={{ width: '100%', objectFit: 'cover' }} />
      </ContentContainer>
      <BtnContainer>
        {/* 지금 시작하기 버튼을 누를 경우 프론트 내부적으로 여행 상태를 after로 바꿈 */}
        <PrimaryButton
          text="여행 종료하기"
          type="active"
          onClick={() => {
            setTravelState('after');
            fetchTravelFinalReportData();
          }}
        />
      </BtnContainer>
    </>
  );
};

//  path: '/report/:travelState'
// travelState에 따라 첫 토글의 상태가 달라야함.
const During_ReportPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [travelState, setTravelState] = useRecoilState(travelInfo);
  const userId = useRecoilValue(uid);
  const during_travel = useRecoilValue(during_travelDetail);
  const [day, setDay] = useState(1);

  const [toggleState, setToggle] = useState(0);
  const [reportData, setReportData] = useState({});

  /* 여행 후 레포트 버튼 클릭하여 최종 레포트 접근시 최종 레포트를 보임 */
  useEffect(() => {
    if (travelState === 'after') {
      setToggle(1);
      fetchTravelFinalReportData();
    }
    // fetchTravelReportData();
    // axios 요청
  }, []);

  useEffect(() => {
    if (toggleState === 0 || travelState === 'during') fetchTravelDailyReportData();
    // toggled이 1이거나 travelState가 after이면
    else fetchTravelFinalReportData();
    console.log('새로운 여행 레포트 데이터 fetch');
  }, [day, toggleState, travelState]);

  const fetchTravelFinalReportData = async () => {
    console.log('final  report 요청');
    try {
      console.log(userId, during_travel.destination);
      const res = await axios.get(
        `${BASE_URL}/api/during-travel/final-report?userId=${userId}&country=${during_travel.destination}`,
      );
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
      console.log('final report 요청');
      // 더미 데이터 세팅
      setReportData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 토글 변경 혹은 일자 변경에 따라 다른 data를 요청
  const fetchTravelDailyReportData = async () => {
    console.log('daily report 요청');
    try {
      console.log({
        userId: userId,
        country: during_travel.destination,
      });
      // console.log(`${BASE_URL}/api/during-travel/daily-report?userId=${userId}&country=${during_travel.destination}`);
      const res = await axios.get(
        `${BASE_URL}/api/during-travel/daily-report?userId=${userId}&country=${during_travel.destination}`,
      );
      console.log(res, 'dailyreport 요청');
      setReportData(res.data);

      // 더미 데이터 세팅
      // setReportData([
      //   {
      //     day: 1,
      //     totalSpent: 120,
      //     breakdown: {
      //       transport: 20, //교통비
      //       food: 50, //식비
      //       hotel: 5, //숙박비
      //       shopping: 30, //쇼핑비
      //       activities: 15, //활동비
      //     },
      //     feeSavings: 5, //절약한 수수료
      //   },
      //   {
      //     day: 2,
      //     totalSpent: 150,
      //     breakdown: {
      //       transport: 25, //교통비
      //       food: 60, //식비
      //       hotel: 10, //숙박비
      //       shopping: 35, //쇼핑비
      //       activities: 20, //활동비
      //     },
      //     feeSavings: 7, //절약한 수수료
      //   },
      //   {
      //     day: 3,
      //     totalSpent: 100,
      //     breakdown: {
      //       transport: 15, //교통비
      //       food: 40, //식비
      //       hotel: 8, //숙박비
      //       shopping: 20, //쇼핑비
      //       activities: 17, //활동비
      //     },
      //     feeSavings: 4, //절약한 수수료
      //   },
      // ]);
      // 전체 소비 리포트 요청
    } catch (error) {
      console.log(error);
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
        <WrongDirection travelState={travelState} setTravelState={setTravelState} />
      ) : (
        <>
          <ContentContainer>
            <ReportComponent
              country={during_travel.destination}
              day={day}
              setDayState={setDayState}
              reportData={travelState === 'during' || toggleState === 0 ? reportData[day - 1] : reportData}
              toggleState={toggleState}
            />
          </ContentContainer>
          <BtnContainer />
        </>
      )}
    </Container>
  );
};

export default During_ReportPage;
