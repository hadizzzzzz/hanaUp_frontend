// dollarbox:
// type: single, entire (여행 날짜가 단일인지, duration인지)
// startDate, endDate, currency(화폐 단위), country(나라명), amount(예상치)
// country 영어로 받아야
//   <DollarBox type="entire" startDate={new Date()} endDate={new Date()} currency="$" country="USA" amount="1200" />

import DollarBox from '../../common/DollarBox';
import countryInfo from '../../common/arrays/countryInfo';
import styled, { css } from 'styled-components';
import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../styles/swiperStyles.css';

import 'swiper/css';
import 'swiper/css/pagination';

const Result_DollarBoxSwiper = ({ countryFunds }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update(); // Swiper 상태 업데이트
    }
  }, [countryFunds]);

  if (countryFunds.length > 1) {
    return (
      <Swiper
        onSwiper={swiper => (swiperRef.current = swiper)}
        grabCursor={true}
        slidesPerView={1.4}
        spaceBetween={0}
        centeredSlides={false}
        className="mySwiper"
      >
        {countryFunds.map((item, index) => (
          <SwiperSlide>
            <DollarBox
              isSwiper={true}
              type="entire"
              startDate={item.startDate}
              endDate={item.endDate}
              currency={countryInfo.find(info => info.country_en === item.country).currency_symbol}
              country={item.country}
              amount={item.balance}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
};

export default Result_DollarBoxSwiper;
