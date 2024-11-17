import styled from 'styled-components';
import font from '../styles/font';
import color from '../styles/color';
import HighLightText from '../common/HighLightText';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import type1 from '/img/travelTypes/IFMEP.jpg';
import type2 from '/img/travelTypes/ITPHJ.jpg';
import type3 from '/img/travelTypes/IFPHP.jpg';
import type4 from '/img/travelTypes/ITMEJ.jpg';

// Import Swiper styles
import 'swiper/css';

const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 30px;

  flex: 1 0 0;
`;

const ImgContainer = styled.img`
  width: 258px;
  object-fit: cover;
`;

const SwiperContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 30px;
  margin-bottom: 30px;
`;

const SplashPage = () => {
  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <HighLightText type="long" text="내 소비 유형은?" />
      </div>
      <SwiperContainer>
        <Swiper
          autoplay={{
            delay: 500,
            disableOnInteraction: false,
          }}
          slidesPerView={1.5}
          centeredSlides={true}
          spaceBetween={30}
          modules={[Autoplay]}
          loop={true}
        >
          <SwiperSlide>
            <ImgContainer src={type1} />
          </SwiperSlide>
          <SwiperSlide>
            <ImgContainer src={type2} />
          </SwiperSlide>
          <SwiperSlide>
            <ImgContainer src={type3} />
          </SwiperSlide>
          <SwiperSlide>
            <ImgContainer src={type4} />
          </SwiperSlide>
          <SwiperSlide>
            <ImgContainer src={type1} />
          </SwiperSlide>
          <SwiperSlide>
            <ImgContainer src={type2} />
          </SwiperSlide>
        </Swiper>
      </SwiperContainer>
    </Container>
  );
};

export default SplashPage;
