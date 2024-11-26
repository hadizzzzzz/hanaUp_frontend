import styled from 'styled-components';
import color from '../styles/color';
import font from '../styles/font';
import PrimaryButton from '../common/PrimaryButton';
import ExTech_RateGraph from './ExTech_RateGraph';
import ArrowDown from './assets/arrowDown.png';
import ArrowUp from './assets/arrowUp.png';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { uid } from '../Recoil/uid';
import exchangeRates from '../common/arrays/exchangeRates';

const Container = styled.div`
  background-color: ${color.grayscale.white};
  margin: 0 auto;
  height: auto;
  overflow: hidden;
  bottom: 0px;
  z-index: 5;
  transform: bottom 1s ease-in-out;

  @media (hover: hover) {
    width: 389.5px;
    margin: 0 auto;
  }

  position: absolute;
  bottom: 0px;

  border-radius: 20px 20px 0px 0px;

  display: flex;
  padding: 15px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  align-self: stretch;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 335px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

const GraphDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
`;

const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

const DateText = styled.div`
  ${font.header.h3};
  color: var(--gray8, #424242);
`;

const Arrow = styled.img`
  width: 10.358px;
  object-fit: cover;
`;

const Difference = styled.div`
  ${font.header.h5B};
  color: ${color.brand.primary};
`;

const GraphWrapper = styled.div`
  background-color: ${color.grayscale.white};
  width: 100%;
  padding: 20px 10px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 2px 48px 0px rgba(0, 0, 0, 0.04);
`;

const BasisContainer = styled.div`
  width: 100%;
  text-align: center;
  ${font.caption.cap2R};
  color: ${color.grayscale.gray8};
`;

const BtnContainer = styled.div`
  display: flex;
  padding: 20px 0px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;

  width: 100%;
`;

const ExTech_RateModal = ({ closeModal, country, currency_symbol }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const userId = useRecoilValue(uid);

  // 오늘을 기준으로 -5일 평일 날짜를 YYYYMMDD 형태로 저장한 배열
  const [last5Days, setLast5Days] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  // 이번주 주차를 계산함
  const [selectedWeek, setSelectedWeek] = useState();
  // 백으로부터 받거나 대만/필리핀의 경우 직접 넣은 환율 데이터
  const [exRate, setExRate] = useState({});
  const [last5DaysRate, set5DaysRate] = useState([]);

  // 주차를 가져오는 함수
  const getThisWeek = date => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();

    return Math.ceil((currentDate + firstDay) / 7);
  };

  // 이전 5일에 대한 날짜를 YYYYMMDD 형식 배열로 반환하는 함수
  function getLast5BusinessDays() {
    const result = [];
    const today = new Date();

    const dayInMillisec = 24 * 60 * 60 * 1000; // 하루를 밀리초로 계산
    const todayEleven = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11);
    // console.log((today.getTime() - todayEleven) / 60 / 60 / 1000); // 디버깅용;

    let count = 0; // 5일 계산용
    let currentDate = today;
    // console.log(eleven, today.);
    if (today.getTime() < todayEleven) currentDate = new Date(currentDate.getTime() - dayInMillisec); // 11시 이전이면 어제 날짜부터 가져옴;
    result.push(currentDate.toISOString().slice(0, 10).replace(/-/g, ''));

    while (count < 4) {
      currentDate = new Date(currentDate.getTime() - dayInMillisec); // 하루씩 이전으로 이동
      const day = currentDate.getDay(); // 요일 확인 (0: 일요일, 6: 토요일)

      if (day !== 0 && day !== 6) {
        // 주말 제외
        const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD 형식
        result.push(formattedDate);
        count++;
      }
    }
    setLast5Days(result);
    return result;
  }

  // 지난 5일의 환율 데이터를 배열에 저장하여 그래프 컴포넌트에 전달
  const getLast5DaysRate = data => {
    const result = [];

    for (const week in exRate) {
      const weekData = exRate[week];
      for (let i = 4; i >= 0; i--) {
        result.push({ date: last5Days[i], rate: weekData[last5Days[i]].rate });
      }
    }

    console.log('5일 간의 데이터', result);
    set5DaysRate(result);
  };

  // GET: 환율 정보 get
  const fetchExRate = async weeknum => {
    try {
      // 대만과 필리핀의 경우
      if (country === 'Taiwan') {
        setExRate({
          TodayExchangeRate: 42.2, // 오늘 환율
          weeklyExchangeRates: {
            [`week${selectedWeek}`]: {
              [last5Days[4]]: { value: 43 },
              [last5Days[3]]: { value: 42.7 },
              [last5Days[2]]: { value: 42.9 },
              [last5Days[1]]: { value: 42.5 },
              [last5Days[0]]: { value: 42.8 },
            },
          },
        });
      } else if (country === 'Philippines') {
        setExRate({
          TodayExchangeRate: 23.73, // 오늘 환율
          weeklyExchangeRates: {
            [`week${selectedWeek}`]: {
              [last5Days[4]]: { value: 23.7 },
              [last5Days[3]]: { value: 23.71 },
              [last5Days[2]]: { value: 23.79 },
              [last5Days[1]]: { value: 23.68 },
              [last5Days[0]]: { value: 23.72 },
            },
          },
        });
      } else {
        const res = await axios.get(`${BASE_URL}/api/after-travel/exchange-rate?userId=${userId}&country=${country}`);
        const countryExchangeRates = exchangeRates(res.data.todayExchangeRate, weeknum, getLast5BusinessDays()).find(
          item => item.country === country,
        );
        setExRate(countryExchangeRates.weeklyExchangeRates);
        getLast5DaysRate(countryExchangeRates.weeklyExchangeRates);
        // setExRate({
        //   week1: {
        //     20241104: 900.25,
        //     20241105: 910.15,
        //     20241106: 905.1,
        //     20241107: 902.5,
        //     20241108: 903.0,
        //   },
        //   week2: {
        //     20241111: 905.25,
        //     20241112: 912.15,
        //     20241113: 908.1,
        //     20241114: 902.3,
        //     20241115: 904.0,
        //   },
        //   week3: {
        //     20241118: 910.5,
        //     20241119: 915.0,
        //     20241120: 913.25,
        //     20241121: 911.75,
        //     20241122: 914.1,
        //   },
        //   week4: {
        //     20241125: 920.0,
        //     20241126: 922.5,
        //     20241127: 918.75,
        //     20241128: 917.3,
        //     20241129: 919.45,
        //   },

        //   week5: {
        //     // week5는 12월 1주
        //     20241202: 920.0,
        //     20241203: 922.5,
        //     20241204: 918.75,
        //   },
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSelectedWeek(getThisWeek(new Date()));
    getLast5BusinessDays();
    fetchExRate(getThisWeek(new Date()));

    getLast5DaysRate();
  }, []);

  useEffect(() => {
    getLast5DaysRate();
  }, [exRate]);

  useEffect(() => {
    console.log(last5DaysRate);
  }, [last5DaysRate]);

  if (last5DaysRate != [])
    return (
      <Container>
        <div>
          <ContentContainer>
            <div style={{ ...font.header.h3, color: '#2d2d2d' }}>환율 정보</div>
            <GraphWrapper>
              <GraphDropdownWrapper>
                <DropDownWrapper>
                  <DateText>
                    {new Date().getMonth() + 1}월 {getThisWeek(new Date())}주차
                  </DateText>
                  <Arrow src={ArrowDown} />
                </DropDownWrapper>
                <Difference>+32.3 (9%)</Difference>
              </GraphDropdownWrapper>
              <ExTech_RateGraph currency_symbol={currency_symbol} last5DaysRate={last5DaysRate} />
            </GraphWrapper>
            <BasisContainer>
              {new Date().getFullYear()}. {new Date().getMonth() + 1}. {/* 11시 기준 */}
              {new Date().getHours() >= 11
                ? `${new Date().getDate()} 11:00 기준`
                : `${new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getDate()} 11:00 기준`}
            </BasisContainer>
          </ContentContainer>
        </div>
        <BtnContainer>
          <PrimaryButton text="닫기" type="active" onClick={closeModal} />
        </BtnContainer>
      </Container>
    );
};

export default ExTech_RateModal;
