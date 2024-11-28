import styled from 'styled-components';
import PrimaryHeader from '../common/PrimaryHeader';
import font from '../styles/font';
import color from '../styles/color';
import PredictMainImg from '../../public/img/predictMain.jpg';
import PrimaryButton from '../common/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import HighLightText from '../common/HighLightText';

const Container = styled.div`
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex: 1 0 0;
  align-self: stretch;
`;

const TextContainer = styled.div`
  width: 100%;
  gap: 17px;

  display: flex;
  flex-direction: column;
`;

const SubText = styled.div`
  ${font.caption.cap1R};
  color: ${color.grayscale.gray5};
  text-align: center;
`;

const ImgContainer = styled.img`
  object-fit: cover;
  width: 100%;
`;

const BtnContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const PredictService = () => {
  const navigate = useNavigate();
  return (
    <Container className="predictService">
      <PrimaryHeader header_title="여행 경비 예측 서비스" />
      <MainContainer>
        <TextContainer>
          <HighLightText text="여행을 계획 중인가요?" type="long" />
          <SubText>
            방문하고 싶은 여행지를 선택하면,
            <br /> 예상 경비를 자동으로 예측해드릴게요. <br />
            <br /> 가고 싶은 여행지만 정하세요.
            <br />
            나머지는 하나가 해결해드립니다!
          </SubText>
        </TextContainer>
        <ImgContainer src={PredictMainImg} />
      </MainContainer>
      <BtnContainer>
        <PrimaryButton
          type="active"
          text="트래블로그 이용이 처음이에요"
          onClick={() => {
            navigate('/predictService/spendTypeTest');
          }}
          // /predictService/:type 으로 navigate
        />
        <PrimaryButton
          type="active"
          text="트래블로그 이용 경험이 있어요"
          onClick={() => {
            navigate('/predictService/predictAmount');
          }}
        />
      </BtnContainer>
    </Container>
  );
};

export default PredictService;
