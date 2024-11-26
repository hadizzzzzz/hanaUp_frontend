import { useEffect, useState } from 'react';
import PrimaryButton from '../common/PrimaryButton';
import styled from 'styled-components';
import PrimaryHeader from '../common/PrimaryHeader';
import FundInfoCard from './components/FundInfoCard';
import FundSwiper from './components/FundSwiper';
import banner from './assets/banner.jpg';
import bottomDummy from './assets/bottomDummy.jpg';
import TravelBanner from './components/TravelBanner';
import { useLocation, useNavigate } from 'react-router-dom';
import Toast from '../common/Toast';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { uid } from '../Recoil/uid';
import { travelInfo } from '../Recoil/travelState';
import { fundInfoState } from '../Recoil/fundInfo';

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
  /* flex-grow: 1; */
  width: 100%;
`;

const DummyBottom = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Home = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const location = useLocation();
  const [toasts, setToasts] = useState([]);
  const navigation = useNavigate();
  const [loading, setLoading] = useState(true); // 로딩

  const [userId, setUserId] = useRecoilState(uid);
  const [travelState, setTravelState] = useRecoilState(travelInfo);
  const [fundInfo, setFundInfo] = useRecoilState(fundInfoState);

  const showToast = message => {
    const id = Date.now(); // 고유 ID 생성
    setToasts(prevToasts => [...prevToasts, { id, message }]);

    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
      navigation(location.pathname, { replace: true, state: null });
    }, 3300); // Toast의 총 지속 시간 + 애니메이션 시간
  };

  // 최초 렌더링시 모달
  useEffect(() => {
    if (location.state) {
      showToast(location.state.toastMessage);
    }
  }, []);

  const processFundData = async data => {
    if (data.foreignSavings !== null) {
      var foreignSavings = { ...data.foreignSavings }; // 무조건 하나?
      foreignSavings['moneyAmount'] = foreignSavings['totalAmount'];
      foreignSavings = {
        ...foreignSavings,
        type: 'foreignSavings',
      };
    }

    var countryFunds = data.countryFunds; // 무조건 배열로?
    if (countryFunds.length != 0) {
      countryFunds = countryFunds.reverse().map(item => {
        var newItem = {
          ...item,
          type: 'countryFunds',
        };
        newItem['moneyAmount'] = item['balance'];
        newItem['trend'] = item.exchangeRate.trend;
        return newItem;
      });
    }

    setFundInfo([foreignSavings, ...countryFunds]);
    return [foreignSavings, ...countryFunds];
  };

  // 최초 렌더링시 travelState와 uid를 받아옴 ()
  // uid가 빈 값이면 파라미터 없이 요청을 보내서 새로 받아옴
  useEffect(() => {
    const fetchTravelStatus = async () => {
      try {
        //  userId 초기화 필요시 사용
        console.log(`${BASE_URL}/api/main/travel-status?userId=${userId}`);
        const res = await axios.get(`${BASE_URL}/api/main/travel-status?userId=${userId}`);
        // userId가 만료됐으면 이 결과가 error가 날 수 있음...? 이 부분 처리 필요
        console.log('travelStatus 결과', res.data);
        if (!userId) {
          setUserId(res.data.uid);
        }
        setTravelState(res.data.travelStatus);
        fetchTravelandFundData(res.data.uid);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTravelandFundData = async uid => {
      try {
        // 알맞은 userId를 받아서 get하도록 매개변수로 전달해주었음.
        const res = await axios.get(`${BASE_URL}/api/main/fund-info?userId=${uid}`);
        console.log('fundInfo 결과', res.data);
        processFundData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    setLoading(true);
    fetchTravelStatus(); // fetchTravelStatus에서 userId를 받아서 바로 fundData도 fetch하도록 변경
  }, []);

  // loading 값이 바뀌면 리렌더링하도록
  useEffect(() => {
    console.log(loading, 'loading값이 바뀜');
  }, [loading]);

  if (userId !== '' && fundInfo.length !== 0 && !loading)
    return (
      <Container className="Home">
        <PrimaryHeader header_title="하나 트래블로그"></PrimaryHeader>
        {/* 초기 띄우는 모달 */}
        <FundSwiperContainer>
          {/* fundSwiper에서 초기 여행 상태값 */}
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
  else {
    return <div>loading...</div>;
  }
};
export default Home;
