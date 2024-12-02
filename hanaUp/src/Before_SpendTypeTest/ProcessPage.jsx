import styled from 'styled-components';
import color from '../styles/color';
import font from '../styles/font';
import HighLightText from '../common/HighLightText';
import loading from '/img/loading.jpg';

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 30px;

  flex: 1 0 0;
`;

const MainText = styled.div`
  ${font.header.h1};
  width: 100%;

  color: #2d2d2d;
  text-align: center;

  position: relative;
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

const ProcessPage = () => {
  return (
    <ContentContainer>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <HighLightText text="결과 생성 중" />
        <SubText>
          방문하고 싶은 여행지를 선택하면, <br />
          예상 경비를 자동으로 예측해드릴게요.
        </SubText>
      </div>

      <ImgContainer src={loading} />
    </ContentContainer>
  );
};

export default ProcessPage;
