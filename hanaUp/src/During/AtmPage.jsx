import styled, { css } from 'styled-components';
import PrimaryHeader from '../common/PrimaryHeader';
import PrimaryButton from '../common/PrimaryButton';
import HighLightText from '../common/HighLightText';
import font from '../styles/font';
import color from '../styles/color';
import Atm from '/img/atm.jpg';

const Container = styled.div`
  width: 390px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 30px gap을 가지고 영역의 중앙 정렬
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex: 1 0 0;
  align-self: stretch;
`;

const BtnContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
`;

const SubText = styled.div`
  ${font.caption.cap1R};
  color: ${color.grayscale.gray5};
`;

const AtmPage = () => {
  return (
    <Container className="atmPage">
      <PrimaryHeader header_title="ATM 위치 안내" />
      <ContentContainer>
        <HighLightText text="ATM 위치 안내" type="long" />
        <SubText>
          해외여행 중에 ATM 찾느라 <br />
          불편하셨나요? <br />
          <br />
          이제 하나 트래블로그로 환전한 현금을 <br />
          해외 ATM에서 편리하게 출금하세요
        </SubText>
        <img style={{ width: '100%', objectFit: 'cover' }} src={Atm}></img>
      </ContentContainer>
      <BtnContainer>
        <PrimaryButton
          type="active"
          text="지금 시작하기"
          onClick={() => {
            alert('준비 중인 서비스입니다.');
          }}
        />
      </BtnContainer>
    </Container>
  );
};

export default AtmPage;
