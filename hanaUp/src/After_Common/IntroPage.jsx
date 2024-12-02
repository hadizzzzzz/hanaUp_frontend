import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../common/PrimaryButton';
import styled from 'styled-components';
import PrimaryHeader from '../common/PrimaryHeader';
import { useState } from 'react';
import color from '../styles/color';
import { Title } from 'chart.js';
import PrimaryTag from '../common/PrimaryTag';
import Coin from '/img/investIntro_coin.jpg';
import font from '../styles/font';
import DollarBox from '../common/DollarBox';
import Intro_BottomModal from './components/Intro_BottomModal';
import { LinearGradient } from 'react-text-gradients';
import PrimaryBanner from '../common/PrimaryBanner';
import { useEffect } from 'react';
import CheckFund_Item from './components/CheckFund_Item';
import { useRecoilValue } from 'recoil';
import countryInfo from '../common/arrays/countryInfo';
import Result_DollarBoxSwiper from './components/Result_DollarBoxSwiper';
import axios from 'axios';
import AddTravelDateToFund from './AddTravelDateToFund';
import { uid } from '../Recoil/uid';

const Container = styled.div`
  width: 390px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ContentContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  z-index: 1;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;

  padding-top: 10px;
  padding-left: 20px;
`;

const SmallTitleContainer = styled(TitleContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding-top: 0px;
  padding-left: 0px;
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
  padding-top: 0px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  z-index: 1;
`;

const ImgContainer = styled.img`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  object-fit: cover;
`;

const BottomContainer = styled.div`
  display: flex;
  padding-bottom: 6px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  overflow: hidden;

  max-width: 390px;
`;

const DollarBoxInfoContainer = styled.div`
  padding: 0px 0px 0px 20px;
  text-align: left;
  color: ${color.grayscale.black};
  ${font.header.h3};
`;

const DollarBoxContainer = styled.div`
  margin-bottom: 13px;
  width: 100%;
  max-width: 385px; /* 원하는 크기로 제한 */
  height: auto;

  overflow: hidden;

  padding-left: 5px;
`;

const CheckFund_ContentContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
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
  width: 390px;
  margin: 0 auto;

  height: 100vh;
  width: 100%;
  margin: 0 auto;

  background-color: rgb(0, 0, 0, 0.3);
  z-index: 3;

  position: absolute;
  top: 0;
`;

// 1. 초기화면
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
      <BottomContainer>
        <DollarBoxInfoContainer>
          하디즈님은 <span style={{ color: color.brand.primary }}>{countryFunds.length}개의 통화</span>를 가지고 있어요
        </DollarBoxInfoContainer>
        <DollarBoxContainer>
          <Result_DollarBoxSwiper countryFunds={countryFunds} />
        </DollarBoxContainer>
      </BottomContainer>
    </ContentContainer>
  );
};

// 2. 보유 원화 확인 화면
const CheckFunds = ({ countryFunds, radioClickedState, setRadioClickedState }) => {
  const handleRadioBtnClick = index => {
    setRadioClickedState(index);
  };

  return (
    <CheckFund_ContentContainer style={{ gap: '20px' }}>
      <SmallTitleContainer>
        <div style={{ ...font.header.h2, color: color.grayscale.black, textAlign: 'left' }}>
          <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>하디즈님</LinearGradient>은
          <br />{' '}
          <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>
            {countryFunds.length}개 국가의 통화
          </LinearGradient>
          를 <br />
          보유하고 있어요
        </div>
      </SmallTitleContainer>
      <CheckFund_Scrollable>
        <RadioFundsContainer>
          {countryFunds.map((item, index) => (
            <CheckFund_Item
              countryFund={item}
              countryInfo={countryInfo.find(info => info.country_en === item.country)}
              onClick={() => handleRadioBtnClick(index)}
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

// 1번 화면 -> 모달 -> 2번 화면 렌더링
const IntroPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [countryFunds, setCountryFunds] = useState([]);
  const [radioClickedState, setRadioClickedState] = useState(0);

  const navigation = useNavigate();
  const [modalState, setModal] = useState(false);
  const [checkFundsState, setCheckFundsState] = useState(false);
  const [remainMoney, setRemainMoney] = useState(0);

  const userId = useRecoilValue(uid);

  const closeModal = () => {
    setModal(false);
  };

  const changeToCheckFunds = () => {
    setModal(false);
    setCheckFundsState(true);
  };

  // 투자 방식 추천으로 넘어가기 위한 함수
  const handleCustomInvestment = async () => {
    // radioClickedState에 맞는 countryFunds를 가져와서
    // countryInfo와 함께 navigate시 전달,
    // 환테크 시작하기 버튼을 누르면 바로 투자 방식 추천 api 요청
    // 나라에 맞게 newAccount 혹은 exTech로 navigate

    const clickedFund = countryFunds[radioClickedState];
    try {
      const res = await axios.get(
        `${BASE_URL}/api/after-travel/investment-info?userId=${userId}&country=${countryFunds[radioClickedState].country}`,
      );
      const investMethodInfo = res.data;
      console.log('투자 방식 추천 결과', res.data);
      // 56.7, uk, interestRate: 5, 외화 예금

      // const investMethodInfo = {
      //   balance: 1500.0,
      //   country: 'Japan',
      //   interestRate: 3.5, // 일본 금리 (한국 금리는 3.25로 그냥 고정해서 사용하면 될 것 같아)
      //   investmentType: '환테크', // "외화 예금" or 환테크
      // };
      if (investMethodInfo.investmentType === '환테크')
        navigation(`/InvestIntro/exTech`, {
          state: {
            selectedFundInfo: clickedFund, // 선택된 자금 정보
            investMethodInfo: investMethodInfo,
            countryInfo: countryInfo.find(info => info.country_en === countryFunds[radioClickedState].country),
          },
        });
      else {
        navigation(`/InvestIntro/newAccount`, {
          state: {
            selectedFundInfo: clickedFund, // 기본 자금 정보
            investMethodInfo: investMethodInfo,
            countryInfo: countryInfo.find(info => info.country_en === countryFunds[radioClickedState].country),
          },
        });
      }
    } catch (error) {
      console.log('투자 방식 추천 error', error);
    }
  };

  // fund data를 새롭게 받아와 intro page에서 사용
  // addTravelDateToFund를 사용해 임의의 날짜를 추가함
  const fetchFundData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/main/fund-info?userId=${userId}`);
      setCountryFunds(AddTravelDateToFund(res.data.countryFunds));
      setRemainMoney(res.data.remainMoney);
    } catch (error) {
      console.log(error);
    }
    // setCountryFunds(
    //   AddTravelDateToFund([
    //     {
    //       country: 'Japan',
    //       currency: 'JPY',
    //       balance: 12000,
    //       exchangeRate: {
    //         rate: 901.28,
    //         trend: 'up',
    //       },
    //     },
    //     {
    //       country: 'China',
    //       currency: 'CNH',
    //       balance: 500,
    //       exchangeRate: {
    //         rate: 194.34,
    //         trend: 'down',
    //       },
    //     },
    //     {
    //       country: 'Europe',
    //       currency: 'EUR',
    //       balance: 1470,
    //       exchangeRate: {
    //         rate: 901.28,
    //         trend: 'up',
    //       },
    //     },
    //   ]),
    // );
  };

  useEffect(() => {
    fetchFundData();
  }, []);

  return (
    <Container className="investIntro">
      <PrimaryHeader header_title={checkFundsState ? '보유 원화 확인' : '자투리 돈 투자'} />
      {!checkFundsState ? (
        <IntroBeforeCheckFunds countryFunds={countryFunds} />
      ) : (
        <CheckFunds
          countryFunds={countryFunds}
          radioClickedState={radioClickedState}
          setRadioClickedState={setRadioClickedState}
        />
      )}
      <BtnContainer>
        <PrimaryButton
          type="active"
          text={checkFundsState ? '맞춤형 투자 시작하기' : '보유 금액 자세히 확인하기'}
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
          remainMoney={remainMoney}
        />
      )}
    </Container>
  );
};

export default IntroPage;
