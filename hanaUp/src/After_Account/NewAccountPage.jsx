import { useState } from 'react';
import PrimaryButton from '../common/PrimaryButton';
import PrimaryHeader from '../common/PrimaryHeader';
import styled, { css } from 'styled-components';
import font from '../styles/font';
import Chip from '../common/Chip';
import ImgSrc from '/img/newAccountImg.jpg';
import InputPage_Dropdown from '../Before_Common/InputPage_Dropdown';
import Icn_Coins from './assets/icn_coins.png';
import Icn_Calendar from './assets/icn_calendar.png';
import Input_Text from './Input_Text';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { after_newAccountInfo } from '../Recoil/after_newAccountInfo';
import color from '../styles/color';
import NewAccount_DoneModal from './NewAccount_DoneModal';
import { uid } from '../Recoil/uid';

const Container = styled.div`
  width: 390px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ContentContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  flex: 1 0 0;
  align-self: stretch;

  ${props =>
    props.process === 2
      ? css`
          gap: 30px;
          padding: 40px 20px;
        `
      : props.process === 0
      ? css`
          padding: 20px;
          padding-top: 5px;
          gap: 10px;
        `
      : css`
          gap: 40px;
          padding: 20px;
        `}
`;

const BtnContainer = styled.div`
  width: 100%;
  padding: 20px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 1번 process에서 사용
const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;

  ${font.header.h2};
  color: #2d2d2d;
  text-align: left;
`;

const ImgsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 5px;
`;

const Imgs = styled.img`
  width: 90%;
  object-fit: cover;
`;

// process 2

// 2- 가입 내용
const RegisterContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
`;

const RegisterContent = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  align-self: stretch;

  border-radius: 10px;
  background: #f8f8f8;
`;

const EachRegisterContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const IcnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`;

const Icn = styled.img`
  width: 24px;
  object-fit: cover;
`;

const RegisterTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
`;

// 2- 가입 기간
const RegisterDurationContainer = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

const RegisterDurationGridContainer = styled.div`
  width: 100%;
  ${font.header.h5R};
  color: #2d2d2d;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;

  border-radius: 8px;
  border: 1px solid ${color.grayscale.gray1};
`;

const GridItem = styled.div`
  display: flex;
  padding: 12px;
  align-items: center;
  gap: 4px;
  align-self: stretch;

  ${props =>
    props.titleItem
      ? css`
          border-bottom: 1px solid var(--gray1, #f8f8f8);
          background: rgba(1, 186, 189, 0.1);
        `
      : css``}
`;

// process 3
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

// 모달
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

const NewAccount = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [userId, setUserId] = useRecoilState(uid);
  const location = useLocation();
  const { selectedFundInfo, investMethodInfo, countryInfo } = location.state;

  console.log(investMethodInfo);
  // 예금 상품 가입시 받은 res를 저장하여 전역 관리
  const [newAccountInfo, setNewAccountInfo] = useRecoilState(after_newAccountInfo);

  // 금리 정보 관리
  const [interestRate, setInterestRate] = useState({});

  // 외화 예금 가입 프로세스를 0,1,2 인덱스로 관리
  const [process, setProcess] = useState(0);

  // 모달 관리
  const [modalState, setModalState] = useState(false);
  const closeModal = () => {
    setModalState(false);
  };
  const openModal = () => {
    setModalState(true);
  };

  // 3번 process에서의 3가지 input을 관리
  // 1, 6, 12
  const [month, setMonth] = useState('');
  const monthOptions = [
    { label: '1개월', value: '1개월', selectedMonth: 1 },
    { label: '6개월', value: '6개월', selectedMonth: 6 },
    { label: '1년', value: '1년', selectedMonth: 12 },
  ];

  // amount
  const [amount, setAmount] = useState('');

  // 더미 세팅
  const [settings, setSettings] = useState('');
  const settingOptions = [
    { label: '직접 예치', value: '직접 예치' },
    { label: '자동 재예치', value: '자동 재예치' },
  ];

  // axios GET: 선택한 나라에 대한 금리 정보
  const fetchInterestRate = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/after-travel/interest-rate?userId=${userId}&country=${countryInfo.country_en}`,
      );
      console.log('금리 정보', res.data);
      setInterestRate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // axios POST: 예금 가입 버튼 클릭시
  const postNewSavings = async () => {
    try {
      const numMonth = month === '1개월' ? 1 : month === '6개월' ? 6 : 12;
      // console.log({
      //   userId: userId,
      //   country: countryInfo.country_en, // 나라 정보
      //   amount: parseInt(amount.replace(/,/g, ''), ''), // 예금하고 싶은 금액,
      //   month: numMonth, // 6, 12 도 가능
      // });
      const res = await axios.post(`${BASE_URL}/api/after-travel/makesavings`, {
        userId: userId,
        country: countryInfo.country_en, // 나라 정보
        amount: parseInt(amount.replace(/,/g, ''), ''), // 예금하고 싶은 금액,
        month: numMonth, // 6, 12 도 가능
      });

      const savingRes = await axios.get(
        `${BASE_URL}/api/after-travel/savings-info?userId=${userId}&country=${countryInfo.country_en}`,
      );
      console.log('ACCOUNT 외화 적금 ');
      setNewAccountInfo(savingRes.data);

      // response를 받아 알맞게 set하여 fundinfocard 해지 버튼 클릭시 사용
      // setNewAccountInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // process 변경
  const handleAddProcess = () => {
    if (process < 2) setProcess(prev => prev + 1);
    else {
      postNewSavings();
      openModal();
    }
  };

  // 리렌더링 관리
  useEffect(() => {
    setProcess(0);
    setMonth('');
    setAmount('');
    setSettings('');
    fetchInterestRate(); // 금리 정보 얻어옴
  }, []);

  let content;
  // 튜토리얼
  if (process === 0) {
    content = (
      <ContentContainer process={process}>
        <TitleContainer>
          <Chip type="color" text="다통화 외화예금" />
          <div color="#2d2d2d">
            소액으로 외화 모을 때 <br />꼭 필요한 하나
          </div>
        </TitleContainer>
        <ImgsContainer>
          <Imgs src={ImgSrc} />
        </ImgsContainer>
      </ContentContainer>
    );
  }
  // 각종 정보 고지
  else if (process === 1) {
    const today = new Date();
    content = (
      <ContentContainer process={process}>
        <RegisterContentContainer>
          <SmallTitle>가입 내용</SmallTitle>
          {/* 가입 내용 */}
          <RegisterContent>
            <EachRegisterContent>
              <IcnContainer>
                <Icn src={Icn_Coins} />
              </IcnContainer>
              <RegisterTextContainer>
                <div style={{ ...font.header.h5M, color: color.grayscale.gray7 }}>예치 가능 통화</div>
                <div style={{ ...font.caption.cap2R, color: color.grayscale.gray7 }}>
                  JPY, USD, ... 총 10개국 통화 지원
                </div>
              </RegisterTextContainer>
            </EachRegisterContent>
            <EachRegisterContent>
              <IcnContainer>
                <Icn src={Icn_Calendar} />
              </IcnContainer>
              <RegisterTextContainer>
                <div style={{ ...font.header.h5M, color: color.grayscale.gray7 }}>가입 기간</div>
                <div style={{ ...font.caption.cap2R, color: color.grayscale.gray7 }}>1개월, 6개월, 1년</div>
              </RegisterTextContainer>
            </EachRegisterContent>
          </RegisterContent>
        </RegisterContentContainer>
        {/* 가입 기간 */}
        <RegisterDurationContainer>
          <SmallTitle>가입 기간</SmallTitle>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', width: '100%' }}>
            <div style={{ width: '100%', ...font.caption.cap2R, color: '#2d2d2d', textAlign: 'right' }}>
              {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일 기준, 연이율 세전
            </div>
            <RegisterDurationGridContainer>
              <GridItem titleItem={true}>거주자 구분</GridItem>
              <GridItem titleItem={true}>기간</GridItem>
              <GridItem titleItem={true}>금리</GridItem>
              <GridItem>거주자</GridItem>
              <GridItem>1개월</GridItem>
              <GridItem>{interestRate['1개월']}</GridItem>
              <GridItem>거주자</GridItem>
              <GridItem>6개월</GridItem>
              <GridItem>{interestRate['6개월']}</GridItem>
              <GridItem>거주자</GridItem>
              <GridItem>1년</GridItem>
              <GridItem>{interestRate['1년']}</GridItem>
            </RegisterDurationGridContainer>
          </div>
        </RegisterDurationContainer>
      </ContentContainer>
    );
  }
  // input 받기
  else {
    content = (
      <ContentContainer process={process}>
        <TextInputContainer>
          <SmallTitle>가입 기간</SmallTitle>
          <InputPage_Dropdown placeholder="가입 기간을 선택해주세요" onChange={setMonth} options={monthOptions} />
        </TextInputContainer>
        <TextInputContainer>
          <SmallTitle>저축 금액</SmallTitle>
          <Input_Text
            placeholder={`하나머니 잔액: ${parseInt(investMethodInfo.balance).toLocaleString()} ${
              countryInfo.currency_code
            }${countryInfo.country_en !== 'Japan' ? '' : '(100)'}`}
            currency_code={countryInfo.currency_code}
            onInput={setAmount}
          />
        </TextInputContainer>
        <TextInputContainer>
          <SmallTitle>만기 설정</SmallTitle>
          <InputPage_Dropdown placeholder="만기 시 재예치 방식" onChange={setSettings} options={settingOptions} />
        </TextInputContainer>
        <TextInputContainer>
          <SmallTitle>만기 시 하나머니로 적립하기 </SmallTitle>
          <InputPage_Dropdown placeholder="하나머니 적립 시, 혜택이 적용됩니다." type="selected" />
        </TextInputContainer>
      </ContentContainer>
    );
  }

  return (
    <Container className="newAccount">
      <PrimaryHeader header_title="외화 예금" />
      {content}
      {modalState && (
        <Overlay
          onClick={() => {
            closeModal();
          }}
        />
      )}
      {modalState && (
        <NewAccount_DoneModal
          closeModal={closeModal}
          month={month}
          interestRate={interestRate[month]}
          country={countryInfo.country_en}
        />
      )}
      <BtnContainer>
        <PrimaryButton
          type={process != 2 || (month != '' && amount != '' && settings != '') ? 'active' : 'inactive'} // input 관리에 따라 달라져야 함
          text={process === 0 ? '외화 예금 시작하기' : process === 2 ? '가입하기' : '다음'}
          onClick={() => handleAddProcess()}
        ></PrimaryButton>
      </BtnContainer>
    </Container>
  );
};

export default NewAccount;
