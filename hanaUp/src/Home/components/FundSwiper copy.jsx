import { Swiper, SwiperSlide } from 'swiper/react';
import FundInfoCard from './FundInfoCard';

import 'swiper/css';
import 'swiper/css/pagination';

import './swiperStyles.css';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { fundInfoState } from '../../../Recoil/fundInfo';
import { travelInfo } from '../../../Recoil/travelState';

// swiper 내부에서 api 호출하여 전역으로 상태 관리

const FundSwiper = () => {
  const [fundInfo, setFundInfo] = useRecoilState(fundInfoState);
  const [travelState, setTravelState] = useRecoilState(travelInfo);

  const processFundData = async data => {
    const foreignSavings = data.foreignSavings; // 무조건 하나?
    foreignSavings['moneyAmount'] = foreignSavings['totalAmount'];
    foreignSavings = {
      ...foreignSavings,
      type: 'foreignSavings',
    };

    const countryFunds = data.countryFunds; // 무조건 배열로?
    if (countryFunds.length != 0) {
      countryFunds.map(item => {
        item = {
          ...item,
          type: 'countryFunds',
        };
        item['moneyAmount'] = item['balance'];
        item['trend'] = item.exchangeRate.rate;
      });
    }

    return {
      foreignSavings,
      ...countryFunds,
    };
  };

  const fetchTravelandFundData = async () => {
    const userId = 12345;

    // const res= await axios.get(`${BASE_URL}/api/main/fund-info?userId=${12345}`);
    // if (res.status===200){

    const data = {
      foreignSavings: {
        totalAmount: 5000,
        country: 'USA',
        currency: 'USD',
        //"lastDate": "2024-12-04" 발표 날로 고정!,
        exchangeRate: {
          rate: 1391.5,
        },
      },
      countryFunds: [
        {
          country: 'Japan',
          currency: 'JPY',
          balance: 12000,
          exchangeRate: {
            rate: 901.28,
          },
        },
        {
          country: 'China',
          currency: 'CNH',
          balance: 500,
          exchangeRate: {
            rate: 194.34,
          },
        },
      ],
    };
    const processedFundData = await processFundData(data);
    console.log(processFundData);
    // }

    // 더미데이터

    // setFundInfo(res.data.countryFunds, res.data.foreignSavings);
    // setTravelState(res.data.travelStatus);
  };

  useEffect(() => {
    fetchTravelandFundData();
  }, []);

  if (fundInfo != null)
    return (
      <Swiper grabCursor={true} slidesPerView={1.2} spaceBetween={0} centeredSlides={false} className="mySwiper">
        <SwiperSlide>
          <FundInfoCard
            type="countryFunds"
            trend="up"
            country="Japan"
            currency="JPY"
            moneyAmount="12000"
            rate="901.28"
          ></FundInfoCard>
        </SwiperSlide>
        <SwiperSlide>
          <FundInfoCard
            type="foreignSavings"
            country="USA"
            currency="USD"
            moneyAmount="5000"
            rate="1391.5"
          ></FundInfoCard>
        </SwiperSlide>
        <SwiperSlide>
          <FundInfoCard
            type="countryFunds"
            trend="down"
            country="Japan"
            currency="JPY"
            moneyAmount="12000"
            rate="901.28"
          ></FundInfoCard>
        </SwiperSlide>
        <SwiperSlide>
          <FundInfoCard
            type="foreignSavings"
            country="USA"
            currency="USD"
            moneyAmount="5000"
            rate="1391.5"
          ></FundInfoCard>
        </SwiperSlide>
      </Swiper>
    );
};

export default FundSwiper;
