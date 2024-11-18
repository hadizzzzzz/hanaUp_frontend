import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../common/PrimaryButton';
import styled from 'styled-components';
import PrimaryHeader from '../common/PrimaryHeader';
import { useState } from 'react';
import color from '../styles/color';
import { Title } from 'chart.js';
import PrimaryTag from '../common/PrimaryTag';
import Coin from './assets/investIntro_coin.jpg';
import font from '../styles/font';
import DollarBox from '../common/DollarBox';
import Intro_BottomModal from './components/Intro_BottomModal';
import { LinearGradient } from 'react-text-gradients';
import PrimaryBanner from '../common/PrimaryBanner';
import { useEffect } from 'react';
import CheckFund_Item from './components/CheckFund_Item';
import { useRecoilValue } from 'recoil';
import countryInfo from '../common/arrays/countryInfo';

const Container = styled.div`
  border: 1px solid black;

  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ContentContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 30px 20px 20px 20px;

  z-index: 1;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

const TitleText = styled.div`
  text-align: left;
  color: ${color.grayscale.black};
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px; /* 142.857% */
  letter-spacing: 0.56px;
`;

const BtnContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  z-index: 1;
`;

const ImgContainer = styled.img`
  width: 100%;
  object-fit: cover;
`;

const DollarBoxContainer = styled.div`
  display: flex;
  padding-bottom: 6px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

const CheckFund_ContentContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  flex: 1 0 0;
`;

const CheckFund_Scrollable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  overflow-y: scroll;
`;

const RadioFundsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const Overlay = styled.div`
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  height: 100vh;
  width: 100%;
  margin: 0 auto;

  background-color: rgb(0, 0, 0, 0.3);
  z-index: 3;

  position: absolute;
  top: 0;
`;

const IntroBeforeCheckFunds = ({ countryFunds }) => {
  return (
    <ContentContainer>
      <TitleContainer>
        <PrimaryTag text="트래블로그 회원에게만 드리는 혜택" />
        <TitleText>
          재환전하기 애매한 <br />
          자투리 소액이 남았다면?
        </TitleText>
      </TitleContainer>
      <ImgContainer src={Coin} />
      <DollarBoxContainer>
        <div style={{ ...font.header.h3, color: color.grayscale.black }}>
          유병재님은 <span style={{ color: color.brand.primary }}>{countryFunds.length}개의 통화</span>를 가지고 있어요
        </div>
        {/* 달러 박스 Swiper */}
        <DollarBox type="entire" startDate={new Date()} endDate={new Date()} currency="$" country="USA" amount="1200" />
        {/*  type, startDate, endDate, currency, country(영어), amount */}
      </DollarBoxContainer>
    </ContentContainer>
  );
};

const CheckFunds = ({ countryFunds }) => {
  const [radioClickedState, setRadioClickedState] = useState(0);

  const handleRadioBtnClick = index => {
    setRadioClickedState(index);
  };

  return (
    <CheckFund_ContentContainer style={{ gap: '40px' }}>
      <TitleContainer>
        <div style={{ ...font.header.h2, color: color.grayscale.black, textAlign: 'left' }}>
          <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>유병재님</LinearGradient>은
          <br />{' '}
          <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>
            {countryFunds.length}개 국가의 통화
          </LinearGradient>
          를 <br />
          보유하고 있어요
        </div>
      </TitleContainer>
      <CheckFund_Scrollable>
        <RadioFundsContainer>
          {countryFunds.map((item, index) => (
            <CheckFund_Item
              countryFund={item}
              countryInfo={countryInfo.find(info => info.country_en === item.country)}
              onClick={handleRadioBtnClick}
              isClicked={index === radioClickedState}
              index={index}
            />
          ))}
          {/* Horizon */}
        </RadioFundsContainer>
        <PrimaryBanner
          caption="재환전하기 애매한 소액이 남았다면"
          text="방문 국가에 따라 맞춤형 소액투자를 할 수 있어요"
          btnText="추천받기"
        />
      </CheckFund_Scrollable>
    </CheckFund_ContentContainer>
  );
};

const IntroPage = () => {
  const [countryFunds, setCountryFunds] = useState([]);

  const navigation = useNavigate();
  const [modalState, setModal] = useState(false);
  const [checkFundsState, setCheckFundsState] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  const changeToCheckFunds = () => {
    setModal(false);
    setCheckFundsState(true);
  };

  const handleCustomInvestment = () => {
    // 나라에 맞게 newAccount 혹은 exTech로 navigate
    navigation(`/InvestIntro/newAccount`, {
      state: {},
    });
  };

  // 여기서 새롭게 fund data를 받아서 props로 넘겨 총 3가지 screen에서 사용
  const fetchFundData = () => {
    // const {data} = axios.get()
    // setFundInfo(data.countryFunds);
    setCountryFunds([
      {
        country: 'Japan',
        currency: 'JPY',
        balance: 12000,
        exchangeRate: {
          rate: 901.28,
          trend: 'up',
        },
      },
      {
        country: 'China',
        currency: 'CNH',
        balance: 500,
        exchangeRate: {
          rate: 194.34,
          trend: 'down',
        },
      },
    ]);
  };

  useEffect(() => {
    fetchFundData();
  }, []);

  // balance
  // 12000
  // country
  // "Japan"
  // currency
  // "JPY"
  // exchangeRate:
  // rate
  //   901.28
  // trend
  //   "up"

  return (
    <Container className="investIntro">
      <PrimaryHeader header_title={checkFundsState ? '보유 원화 확인' : '자투리 돈 투자'} />
      {!checkFundsState ? (
        <IntroBeforeCheckFunds countryFunds={countryFunds} />
      ) : (
        <CheckFunds countryFunds={countryFunds} />
      )}
      <BtnContainer>
        <PrimaryButton
          type="active"
          text={checkFundsState ? '환테크 시작하기' : '보유 금액 자세히 확인하기'}
          onClick={checkFundsState ? () => handleCustomInvestment() : () => setModal(true)}
        />
      </BtnContainer>
      {modalState && (
        <Overlay
          onClick={() => {
            closeModal();
          }}
        />
      )}
      {modalState && (
        <Intro_BottomModal
          closeModal={closeModal}
          changeToCheckFunds={changeToCheckFunds}
          countryFunds={countryFunds}
        />
      )}
    </Container>
  );
};

export default IntroPage;
