import { useEffect, useState } from 'react';
import PrimaryButton from '../common/PrimaryButton';
import styled from 'styled-components';
import PrimaryHeader from '../common/PrimaryHeader';
import FundInfoCard from './components/FundInfoCard';
import FundSwiper from './components/FundSwiper';
import banner from './assets/banner.jpg';
import bottomDummy from './assets/bottomDummy.jpg';
import TravelBanner from './components/TravelBanner';
import { useLocation } from 'react-router-dom';
import Toast from '../common/Toast';

const Container = styled.div`
  border: 1px solid black;

  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  position: relative;
`;

const FundSwiperContainer = styled.div`
  display: flex;
  flex-direction: flex-end;

  width: 100%;
  margin-top: 13px;
  margin-bottom: 13px;
`;

const DummyBanner = styled.img`
  width: 100%;
  height: 62.72px;
  object-fit: cover;
`;

const TravelBannerContainer = styled.div`
  flex-grow: 1;
  width: 100%;
`;

const DummyBottom = styled.img`
  width: 100%;
  object-fit: cover;
`;
const Home = () => {
  const location = useLocation();
  const [toasts, setToasts] = useState([]);

  const showToast = message => {
    const id = Date.now(); // 고유 ID 생성
    setToasts(prevToasts => [...prevToasts, { id, message }]);

    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, 3300); // Toast의 총 지속 시간 + 애니메이션 시간
  };

  // 최초 렌더링시 모달
  useEffect(() => {
    if (location.state) {
      showToast(location.state.toastMessage);
    }
  }, []);

  return (
    <Container className="Home">
      <PrimaryHeader header_title="하나 트래블로그"></PrimaryHeader>
      {/* 초기 띄우는 모달 */}
      <FundSwiperContainer>
        <FundSwiper />
      </FundSwiperContainer>
      <DummyBanner src={banner} />
      <TravelBannerContainer>
        <TravelBanner />
      </TravelBannerContainer>
      <DummyBottom src={bottomDummy} />
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() => setToasts(prevToasts => prevToasts.filter(t => t.id !== toast.id))}
        />
      ))}
    </Container>
  );
};
export default Home;
