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
import { useRecoilValue } from 'recoil';
import { uid } from '../../Recoil/uid';

// swiper 내부에서 api 호출하여 전역으로 상태 관리

const FundSwiper = ({ firstCountry }) => {
  const [fundInfo, setFundInfo] = useRecoilState(fundInfoState);

  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update(); // Swiper 상태 업데이트
    }
  }, [fundInfo]);

  const getProcessedFundInfo = () => {
    if (firstCountry) {
      const matchedInfo = fundInfo.filter(item => item && item.country === firstCountry);
      const others = fundInfo.filter(item => item && item.country !== firstCountry);
      console.log([...matchedInfo, ...others]);
      return [...matchedInfo, ...others];
    } else return fundInfo;
  };

  if (fundInfo.length != 0) {
    return (
      <Swiper
        onSwiper={swiper => (swiperRef.current = swiper)}
        grabCursor={true}
        slidesPerView={1.2}
        spaceBetween={0}
        centeredSlides={false}
        className="mySwiper"
      >
        {getProcessedFundInfo().map(item => {
          if (item && item.country)
            // foreignSavings가 존재하지 않는 경우
            return (
              <SwiperSlide key={item.country}>
                <FundInfoCard key={item.country} {...item}></FundInfoCard>
              </SwiperSlide>
            );
        })}
      </Swiper>
    );
  } else {
    console.log(fundInfo);
  }
};

export default FundSwiper;
