import styled from 'styled-components';
import x from '../assets/x.png';
import font from '../../styles/font';
import color from '../../styles/color';
import PrimaryButton from '../../common/PrimaryButton';
import ModalImg from '../../../public/img/mainModal.png';
import { useNavigate } from 'react-router-dom';

const OverlayContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;

  z-index: 10;

  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;

  width: 88%;
  height: auto;

  padding: 10px 0px 20px 0px;

  display: flex;
  flex-direction: column;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  padding-right: 10px;

  cursor: pointer;
`;

const DetailContainer = styled.div`
  width: 100%;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 18.2px */
`;

const ImgContainer = styled.div`
  padding: 30px 20px;
  flex: 1;
`;

const BottomContainer = styled.div`
  display: flex;
  margin: 0px 20px;
  padding: 0px 20px;
  padding-top: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-top: 1px solid rgba(164, 169, 174, 0.15);
`;

const BottomText = styled.div`
  color: #616161;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 15.6px */
`;

const Button = styled.div`
  width: 100%;
  display: flex;
  height: 48px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;

  background: linear-gradient(90deg, #46d7c2 0%, #24c9bf 50%, #01babd 100%);
  cursor: pointer;
`;

const BtnText = styled.div`
  ${font.button.b1};
  color: ${color.grayscale.white};
`;

const HomeMainModal = ({ showModal }) => {
  const navigation = useNavigate();
  return (
    <OverlayContainer>
      <ContentContainer>
        <BtnContainer onClick={showModal}>
          <img src={x} style={{ width: '24px', objectFit: 'cover' }}></img>
        </BtnContainer>
        <div style={{ gap: 10, display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#424242', textAlign: 'center', ...font.header.h2 }}>여행은 역시 트래블로그</div>
          <DetailContainer>
            하나머니 앱에서 <span style={{ fontWeight: 700 }}>무료환전</span>하고 <br />
            트래블로그 카드로 <span style={{ fontWeight: 700 }}>수수료</span> 없이 <br />
            여행 후 <span style={{ fontWeight: 700 }}>남은 외화</span>까지 투자해요 <br />
          </DetailContainer>
        </div>
        <ImgContainer>
          {' '}
          <img src={ModalImg} style={{ width: '100%' }}></img>
        </ImgContainer>

        <BottomContainer>
          <BottomText>
            해외여행 계획이 있다면,
            <br />
            여행 상태에 맞춰서 <span style={{ fontWeight: 700 }}>맞춤형 화면</span>을 제공해드릴게요
          </BottomText>
          <Button onClick={() => navigation('/predictService')}>
            <BtnText>해외여행 계획이 있어요</BtnText>
          </Button>
        </BottomContainer>
      </ContentContainer>
    </OverlayContainer>
  );
};

export default HomeMainModal;
