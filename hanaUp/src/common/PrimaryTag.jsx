import styled from 'styled-components';
import font from '../styles/font';
import color from '../styles/color';
import tagIcn from './assets/tagIcn.png';
import { LinearGradient } from 'react-text-gradients';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3px;

  border-radius: 10px;

  width: 100%;
`;

const Text = styled.div`
  color: ${color.brand.grad};
  font-family: 'Pretendard-Semibold';
  font-size: 15px;
  ${font.caption.cap3B};
`;

const Icn = styled.img`
  width: 14px;
  height: 15px;
`;
const PrimaryTag = ({ text }) => {
  return (
    <Container>
      <Icn src={tagIcn} />
      <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>
        <Text>{text}</Text>
      </LinearGradient>
    </Container>
  );
};

export default PrimaryTag;
