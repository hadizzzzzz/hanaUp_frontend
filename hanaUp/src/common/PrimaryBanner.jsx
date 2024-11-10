import styled from 'styled-components';
import font from '../styles/font';
import color from '../styles/color';
import { LinearGradient } from 'react-text-gradients';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 15px 10px;

  border-radius: 10px;
  background: ${color.grayscale.gray1};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  flex: 1 0 0;
`;

const Text = styled.div`
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.4px;
`;

const Btn = styled.div`
  cursor: pointer;
  display: flex;
  width: 67px;
  height: 34px;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(90deg, #46d7c2 0%, #24c9bf 50%, #01babd 100%);
  border-radius: 20px;

  color: #fff;
  text-align: center;
  font-family: Pretendard-Bold;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.4px;
`;

// caption , text
const PrimaryBanner = ({ caption, text }) => {
  return (
    <Container>
      <TextContainer>
        <div style={{ ...font.caption.cap2R, color: '#2d2d2d' }}>{caption}</div>
        <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>
          <Text>{text}</Text>
        </LinearGradient>
      </TextContainer>
      <Btn>환전하기</Btn>
    </Container>
  );
};

export default PrimaryBanner;
