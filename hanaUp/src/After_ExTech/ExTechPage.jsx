import styled from 'styled-components';
import font from '../styles/font';
import color from '../styles/color';
import PrimaryHeader from '../common/PrimaryHeader';
import PrimaryButton from '../common/PrimaryButton';
import { useState } from 'react';
import InputPage_Dropdown from '../Before_Common/InputPage_Dropdown';
import Input_Text from '../After_Account/Input_Text';
import { useLocation, useNavigate } from 'react-router-dom';
import countryExchangeInfo from '../common/arrays/countryExchangeInfo';
import PrimaryBanner from '../common/PrimaryBanner';
import ExTech_RateModal from './ExTech_RateModal';
import { useRecoilState } from 'recoil';
import { after_exTechCharges } from '../Recoil/after_exTechCharges';
import axios from 'axios';
import ExTech_ChargeItem from './ExTech_ChargeItem';
import Toast from '../common/Toast';

const Container = styled.div`
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1 0 0;
  padding: 40px 20px;
  gap: 20px;
`;

const SmallTitle = styled.div`
  ${font.header.h3};
  color: #2d2d2d;
  width: 100%;
  text-align: left;
`;

const TextInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const BtnContainer = styled.div`
  display: flex;
  padding-bottom: 20px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  width: 100%;
`;

// 모달
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

const ExTech = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const { selectedFundInfo, investMethodInfo, countryInfo } = location.state;

  const [chargeDone, setChargeDone] = useState(false);

  // 3가지 input을 관리
  const [basisRate, setBasisRate] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const durationOptions = [
    { label: '한 번만 충전', value: '한번만 충전' },
    { label: '도달할 때마다 충전', sublabel: '(하루 한번)', value: '도달할 때마다 충전(하루 한번)' },
  ];

  // 환율 알림 설정 관리
  const [exTechCharge, setExTechCharge] = useRecoilState(after_exTechCharges);

  // POST: 환율 알림 설정
  const handleChargePost = async () => {
    try {
      // const uid = 123;
      // const res = axios.post(`${BASE_URL}/api/after-travel/forextech`, {
      //   userId: uid,
      //   country: countryInfo.country_en, // 나라 정보
      //   amount: amount, // 충전하고 싶은 금액
      // });
      setExTechCharge({
        countryInfo: countryInfo,
        basisRate: basisRate,
        duration: duration,
        amount: amount,
        // 다음 화면 ui에서 필요한 정보를 전역으로 관리
      });
      setToast(true);
      setChargeDone(true);
    } catch (error) {
      console.log(error);
    }
  };

  // 모달 관리
  const [modalState, setModalState] = useState(false);
  const closeModal = () => {
    setModalState(false);
  };
  const openModal = () => {
    setModalState(true);
  };

  // Toast 관리
  const [toast, setToast] = useState(false);

  if (!chargeDone)
    return (
      <Container className="exTech">
        <PrimaryHeader header_title="목표 환율 자동 충전" />
        <ContentContainer>
          <TextInputContainer>
            <SmallTitle>{countryInfo.currency_code}1 기준 환율(매매기준율)</SmallTitle>
            <InputPage_Dropdown
              placeholder={`${countryExchangeInfo[countryInfo.country_en][1].value}원 이하일 때`}
              options={countryExchangeInfo[countryInfo.country_en]}
              onChange={setBasisRate}
            />
          </TextInputContainer>
          <TextInputContainer>
            <SmallTitle>자동으로</SmallTitle>
            <InputPage_Dropdown
              placeholder={`하나머니 금액만큼`}
              options={[{ label: '하나머니 금액만큼', value: '하나머니 금액만큼' }]}
              onChange={setAmount}
            />
            {/* <Input_Text currency_code="원" onInput={setBasisRate} /> */}
          </TextInputContainer>
          <TextInputContainer>
            <SmallTitle>기간 선택</SmallTitle>
            <InputPage_Dropdown placeholder="만기 시 재예치 방식" options={durationOptions} onChange={setDuration} />
          </TextInputContainer>
          <TextInputContainer>
            <SmallTitle>충전 방식</SmallTitle>
            <InputPage_Dropdown placeholder="하나머니 사용하기" type="selected" />
          </TextInputContainer>
          <PrimaryBanner
            caption="최근 환율 흐름이 궁금하다면"
            text="JPY의 최근 환율 확인하고 더 높은 수익얻기"
            btnText="환율 정보"
            onBtnClick={openModal}
          />
        </ContentContainer>
        <BtnContainer>
          <PrimaryButton
            text="환율 자동 충전하기"
            type={basisRate != '' && amount != '' && duration != '' ? 'active' : 'inactive'}
            onClick={() => handleChargePost()}
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
          <ExTech_RateModal
            closeModal={closeModal}
            country={countryInfo.country_en}
            currency_symbol={countryInfo.currency_symbol}
          />
        )}
      </Container>
    );
  else {
    return (
      <Container className="exTech">
        <PrimaryHeader header_title="목표 환율 자동 충전" />
        <ContentContainer>
          <ExTech_ChargeItem
            countryInfo={exTechCharge.countryInfo}
            basisRate={exTechCharge.basisRate}
            duration={exTechCharge.duration}
            amount={exTechCharge.amount}
          />
        </ContentContainer>
        <BtnContainer>
          <PrimaryButton
            text="완료"
            type="active"
            onClick={() => {
              navigation(
                '/',
                {
                  state: {
                    toastMessage: '설정한 환율에 맞추어 자동환전이 완료되었습니다.',
                  },
                },
                { replace: true },
              );
            }}
          />
        </BtnContainer>
        {toast && (
          <Toast
            onClose={() => setToast(false)}
            message={`${countryInfo.country_kr} ${countryInfo.currency_code} 자동충전을 설정했어요. \n 환율 도달 시 하나머니에서 충전할 예정이에요.`}
          />
        )}
      </Container>
    );
  }
};

export default ExTech;
