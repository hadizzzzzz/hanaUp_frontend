import styled from 'styled-components';
import PrimaryHeader from '../common/PrimaryHeader';
import PrimaryButton from '../common/PrimaryButton';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import { after_newAccountInfo } from '../Recoil/after_newAccountInfo';
import { useState } from 'react';
import GiveCoin from '../After_Common/assets/giveCoin.jpg';
import Msg from '../common/Msg';
import font from '../styles/font';
import color from '../styles/color';
import countryInfo from '../common/arrays/countryInfo';
import DeleteDone from './assets/deleteDone.jpg';
import { useNavigate } from 'react-router-dom';
import BackCard from './assets/backToBeforeCard.jpg';
import axios from 'axios';

const Container = styled.div`
  border: 1px solid black;
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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

const TextContainer = styled.div`
  display: flex;
  padding: 20px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  border-radius: 10px;
  border: 0.5px solid var(--gray3, #e0e0e0);
`;

const TextMainContainer = styled.div`
  display: flex;
  width: 335px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const Horizon = styled.div`
  width: 288px;
  height: 1.5px;
  background-color: ${color.grayscale.gray2};
`;

const TextSubContainer = styled.div`
  display: flex;
  width: 289px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const TextSubDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const DetailBold = styled.div`
  ${font.header.h5B};
`;

const DetailRegular = styled.div`
  color: #000000;
  ${font.header.h5R};
`;

const BtnContainer = styled.div`
  display: flex;
  padding-bottom: 20px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  width: 100%;
`;

const ImgAndAlertContainer = styled.div`
  display: flex;
  padding: 0px 0px 20px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

// 해지할 외화 예금은 오직 하나라는 가정하에 처리
// 외화 예금 정보는 after_newAccountInfo 전역으로 관리함
const DeleteSavings = () => {
  const [savings, setSavings] = useRecoilState(after_newAccountInfo);
  const navigation = useNavigate();

  const [deleteDone, setDeleteDone] = useState(false);

  // POST 외화 예금 해지
  // const postDeleteSavings = async () => {
  //   const uid = 123;
  //   try {
  //     const res = axios.post(`${BASE_URL}/api/after-travel/deletesavings`, {
  //       userId: uid,
  //       country: savings.country,
  //     });
  //     console.log('해지', res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleDeleteBtn = () => {
    if (!deleteDone) {
      // postDeleteSavings();
      setDeleteDone(true);
    } else navigation('/', { replace: true });
  };

  const currencySymbol = countryInfo.find(item => item.country_en === savings.country).currency_symbol;

  let content;
  if (!deleteDone) {
    content = (
      <ContentContainer>
        <img src={GiveCoin} style={{ width: '335px', objectFit: 'cover' }} />
        <TextContainer>
          <TextMainContainer>
            <div style={{ ...font.header.h5R, color: color.grayscale.gray6, width: '100%' }}>
              해지 후 받으시는 금액 (세후)
            </div>
            <div style={{ ...font.header.h1, color: '#2d2d2d', width: '100%' }}>
              {currencySymbol} {Number(savings.finalAmount) * 0.8}
            </div>
          </TextMainContainer>
          <Horizon />
          <TextSubContainer>
            <TextSubDetailContainer>
              <DetailBold style={{ color: '#000000' }}>이자 금액</DetailBold>
              <DetailBold style={{ color: '#009591' }}>
                {currencySymbol} {savings.interestAmount}
              </DetailBold>
            </TextSubDetailContainer>
            <TextSubDetailContainer>
              <DetailRegular>해지 원금</DetailRegular>
              <DetailRegular>
                {currencySymbol} {savings.finalAmount}
              </DetailRegular>
            </TextSubDetailContainer>
            <TextSubDetailContainer>
              <DetailRegular>만기 일자</DetailRegular>
              <DetailRegular>2024-12-04</DetailRegular>
            </TextSubDetailContainer>
          </TextSubContainer>
          <div
            style={{ width: '100%', ...font.caption.cap2R, color: '#000000', textAlign: 'center', cursor: 'pointer' }}
          >
            상세보기
          </div>
        </TextContainer>
        <Msg text="환전한 돈은 하나머니로 넣어드릴게요" type="positive" />
      </ContentContainer>
    );
  } else {
    content = (
      <ContentContainer>
        <ImgAndAlertContainer>
          <img src={DeleteDone} width="73px" objectFit="cover" />
          <div style={{ color: '#2d2d2d', ...font.header.h2 }}>해지가 완료되었습니다</div>
        </ImgAndAlertContainer>
        <TextSubContainer
          style={{ borderTop: ' 1px solid var(--gray3, #E0E0E0)', paddingTop: '20px', paddingBottom: '20px' }}
        >
          <TextSubDetailContainer>
            <DetailRegular>해지기준일</DetailRegular>
            <DetailRegular>2024-12-04</DetailRegular>
          </TextSubDetailContainer>
          <TextSubDetailContainer>
            <DetailRegular>상품명</DetailRegular>
            <DetailRegular>다통화 외화 적금</DetailRegular>
          </TextSubDetailContainer>
          <TextSubDetailContainer>
            <DetailBold style={{ color: '#000' }}>이자 금액</DetailBold>
            <DetailBold style={{ color: '#009591' }}>
              {currencySymbol} {savings.interestAmount}
            </DetailBold>
          </TextSubDetailContainer>
          <TextSubDetailContainer>
            <DetailRegular>환급 금액</DetailRegular>
            <DetailRegular>
              {' '}
              {currencySymbol} {savings.finalAmount}
            </DetailRegular>
          </TextSubDetailContainer>
          <Horizon />
        </TextSubContainer>
        <img
          src={BackCard}
          style={{ cursor: 'pointer', width: '100%', objectFit: 'cover' }}
          onClick={() => {
            navigation('/predictService/predictAmount');
          }}
        />
      </ContentContainer>
    );
  }

  return (
    <Container className="deleteSavings">
      <PrimaryHeader header_title="외화 예금 해지" />
      {content}
      <BtnContainer>
        <PrimaryButton type="active" text={!deleteDone ? '해지하기' : '완료'} onClick={handleDeleteBtn} />
      </BtnContainer>
    </Container>
  );
};
export default DeleteSavings;