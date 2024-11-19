import { Swiper, SwiperSlide } from 'swiper/react';
import FundInfoCard from './FundInfoCard';

import 'swiper/css';
import 'swiper/css/pagination';

import './swiperStyles.css';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { fundInfoState } from '../../Recoil/fundInfo';
import { travelInfo } from '../../Recoil/travelState';

// swiper 내부에서 api 호출하여 전역으로 상태 관리

const FundSwiper = () => {
  const [fundInfo, setFundInfo] = useRecoilState(fundInfoState);
  const [travelState, setTravelState] = useRecoilState(travelInfo);

  const processFundData = async data => {
    if (data.foreignSavings) {
      var foreignSavings = { ...data.foreignSavings }; // 무조건 하나?
      foreignSavings['moneyAmount'] = foreignSavings['totalAmount'];
      foreignSavings = {
        ...foreignSavings,
        type: 'foreignSavings',
      };
    }

    var countryFunds = data.countryFunds; // 무조건 배열로?
    if (countryFunds.length != 0) {
      countryFunds = countryFunds.map(item => {
        var newItem = {
          ...item,
          type: 'countryFunds',
        };
        newItem['moneyAmount'] = item['balance'];
        newItem['trend'] = item.exchangeRate.trend;
        return newItem;
      });
    }

    return [foreignSavings, ...countryFunds];
  };

  const fetchTravelandFundData = async () => {
    const userId = 12345;

    // const res= await axios.get(`${BASE_URL}/api/main/fund-info?userId=${12345}`);
    // if (res.status===200){}

    const processedFundData = await processFundData(fundInfo);
    setFundInfo(processedFundData);
    // }

    // 더미데이터

    // setFundInfo(res.data.countryFunds, res.data.foreignSavings);
    // setTravelState(res.data.travelStatus);
  };

  useEffect(() => {
    fetchTravelandFundData();
  }, []);

  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update(); // Swiper 상태 업데이트
    }
  }, [fundInfo]);

  if (fundInfo.length > 1) {
    return (
      <Swiper
        onSwiper={swiper => (swiperRef.current = swiper)}
        grabCursor={true}
        slidesPerView={1.2}
        spaceBetween={0}
        centeredSlides={false}
        className="mySwiper"
      >
        {fundInfo.map(item => {
          return (
            <SwiperSlide key={item.country}>
              <FundInfoCard key={item.country} {...item}></FundInfoCard>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }
};

export default FundSwiper;
