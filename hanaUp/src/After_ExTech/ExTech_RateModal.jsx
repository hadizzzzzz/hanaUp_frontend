import styled from 'styled-components';
import color from '../styles/color';
import font from '../styles/font';
import PrimaryButton from '../common/PrimaryButton';
import ExTech_RateGraph from './ExTech_RateGraph';

const Container = styled.div`
  background-color: ${color.grayscale.white};
  margin: 0 auto;
  height: auto;
  overflow: hidden;
  bottom: 0px;
  z-index: 5;
  transform: bottom 1s ease-in-out;

  @media (hover: hover) {
    width: 389.5px;
    margin: 0 auto;
  }

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

const ContentContainer = styled.div`
  display: flex;
  width: 335px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

const GraphWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 2px 48px 0px rgba(0, 0, 0, 0.04);
`;

const BtnContainer = styled.div`
  display: flex;
  padding: 20px 0px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;

  width: 100%;
`;

const ExTech_RateModal = ({ closeModal, country }) => {
  return (
    <Container>
      <div>
        <ContentContainer>
          <div>환율 정보</div>
          <GraphWrapper>
            {/* 날짜와 dropdown */}
            <ExTech_RateGraph />
          </GraphWrapper>
        </ContentContainer>
      </div>
      <BtnContainer>
        <PrimaryButton text="닫기" type="active" onClick={closeModal} />
      </BtnContainer>
    </Container>
  );
};

export default ExTech_RateModal;
