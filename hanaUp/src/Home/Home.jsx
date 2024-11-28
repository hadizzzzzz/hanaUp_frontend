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
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  position: relative;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  overflow-y: scroll;
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
    console.log('toast 보여줌');

    setTimeout(() => {
      console.log('3.3초 끝남');
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
      navigation(location.pathname, { replace: true, state: null });
    }, 5000); // Toast의 총 지속 시간 + 애니메이션 시간
  };

  // 최초 렌더링시 모달
  useEffect(() => {
    if (location.state && location.state.toastMessage) {
      showToast(location.state.toastMessage);
    }

    const deleteUser = async userId => {
      const res = await axios.delete(`${BASE_URL}/api/main/delete-user?userId=${userId}`);
      console.log('유저 삭제', userId, res.data);
    };

    if (location.state) console.log(location.state.type);
    if (location.state && location.state.type) {
      // 환테크에서 Home으로 navigate 된 경우 20초 후 자동 새로고침
      if (location.state.type === 'exTech') {
        setTimeout(() => {
          deleteUser(userId);
          setUserId('');
          console.log('20초 로딩 종료');
          window.location.reload();
        }, 20000); //20초
      }
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
        // setUserId('');
        //  userId 초기화 필요시 사용
        console.log(`${BASE_URL}/api/main/travel-status?userId=${userId}`);
        const res = await axios.get(`${BASE_URL}/api/main/travel-status?userId=${userId}`);
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
      } catch (error) {
        console.log(error);
      }
    };

    setLoading(true);
    fetchTravelStatus(); // fetchTravelStatus에서 userId를 받아서 바로 fundData도 fetch하도록 변경
    setTimeout(() => {
      console.log('3초 로딩 종료');
      setLoading(false);
    }, 3000);
  }, []);

  // loading 값이 바뀌면 리렌더링하도록
  useEffect(() => {}, [loading, userId, fundInfo, travelState]);

  useEffect(() => {
    console.log(loading, 'loading값이 바뀜');
  }, [loading]);

  if (fundInfo.length !== 0 && !loading)
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
