import styled, { css } from 'styled-components';
import PrimaryButton from '../common/PrimaryButton';
import color from '../styles/color';
import font from '../styles/font';
import Icn_Calendar from './assets/icn_calendar.png';
import Icn_GetCoin from '../After_Common/assets/Icn_2_dollar.png';
import Icn_Bolt from '../After_Common/assets/Icn_3_bolt.png';
import Icn_Dollar from '../After_Common/assets/Icn_4_sackDollar.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div`
  background-color: ${color.grayscale.white};
  margin: 0 auto;
  height: auto;
  overflow: hidden;
  bottom: 0px;
  z-index: 5;
  transform: bottom 1s ease-in-out;

  width: 390px;
  margin: 0 auto;

  position: absolute;
  bottom: 0px;

  border-radius: 20px 20px 0px 0px;

  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  align-self: stretch;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;

  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  border-radius: 10px;
  background: #f8f8f8;
`;

const EachContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const Icn = styled.img`
  width: 24px;
  object-fit: cover;
`;

const IcnText = styled.div`
  ${font.header.h5R};
  color: ${color.grayscale.gray7};

  height: 100%;
`;

const BtnContainer = styled.div`
  display: flex;
  padding: 20px 0px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;

  width: 100%;
`;

// 가입 기간
// 선택한 기간에 대한 금리 정보
const NewAccount_DoneModal = ({ closeModal, month, interestRate }) => {
  const navigation = useNavigate();
  const [toasts, setToasts] = useState([]);

  const showToast = message => {
    const id = Date.now(); // 고유 ID 생성
    setToasts(prevToasts => [...prevToasts, { id, message }]);

    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, 3300); // Toast의 총 지속 시간 + 애니메이션 시간
  };

  const handleDoneAccount = () => {
    // toast 띄우기
    navigation(
      '/',
      {
        state: {
          toastMessage: '다통화 외화예금에 가입되었습니다.\n이자로 추가 수익을 노려보세요.',
        },
      },
      { replace: true },
    );
  };
  return (
    <Container>
      <TextContainer>
        <div style={{ width: '100%', textAlign: 'left', ...font.header.h3, color: '#2d2d2d' }}>
          예금 가입을 완료했어요
        </div>
        <ContentContainer>
          <EachContentContainer>
            <Icn src={Icn_Calendar} />
            <IcnText>가입기간: {month}</IcnText>
          </EachContentContainer>
          <EachContentContainer>
            <Icn src={Icn_GetCoin} />
            <IcnText>중도 해지 시, 이율 감소</IcnText>
          </EachContentContainer>
          <EachContentContainer>
            <Icn src={Icn_Bolt} />
            <IcnText>하나머니 포인트로 전환</IcnText>
          </EachContentContainer>
          <EachContentContainer>
            <Icn src={Icn_Dollar} />
            <IcnText>{interestRate}%의 연이율 적용</IcnText>
          </EachContentContainer>
        </ContentContainer>
      </TextContainer>
      <BtnContainer>
        <PrimaryButton text="완료" type="active" onClick={handleDoneAccount} />
      </BtnContainer>
    </Container>
  );
};

export default NewAccount_DoneModal;
