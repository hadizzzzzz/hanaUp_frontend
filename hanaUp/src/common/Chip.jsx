import styled, { css } from 'styled-components';
import color from '../styles/color';
import font from '../styles/font';

const Container = styled.div`
  display: flex;
  padding: 5px 8px;
  align-items: center;
  border-radius: 50px;

  ${props =>
    props.type === 'color'
      ? css`
          background: var(
            --grad03,
            linear-gradient(90deg, rgba(70, 215, 194, 0.3) 0%, rgba(36, 201, 191, 0.3) 50%, rgba(1, 186, 189, 0.3) 100%)
          );
          color: ${color.brand.primary};
        `
      : css`
          background-color: ${color.grayscale.gray2};
          color: #2d2d2d;
        `}
`;

const Text = styled.div`
  ${font.header.h5B};
  text-align: center;
  line-height: 14px;
`;

const Chip = ({ type, text }) => {
  return (
    <Container type={type}>
      <Text>{text}</Text>
    </Container>
  );
};

export default Chip;
