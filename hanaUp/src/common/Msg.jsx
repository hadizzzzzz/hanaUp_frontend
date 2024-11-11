import styled, { css } from 'styled-components';
import font from '../styles/font';
import color from '../styles/color';

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 9px 19px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;

  ${font.caption.cap2B};
  ${props =>
    props.type === 'positive'
      ? css`
          background: #ddf7f0;
          box-shadow: 8px 7px 48px 3px rgba(0, 0, 0, 0.09);
          color: ${color.brand.secondary};
        `
      : css`
          background: #ffe8e8;
          /* Blurr shadow */
          box-shadow: 8px 7px 48px 3px rgba(0, 0, 0, 0.09);
          color: ${color.brand.accept};
        `}
`;

// type: positive 혹은 negative
const Msg = ({ type, text }) => {
  return <Container type={type}>{text}</Container>;
};

export default Msg;
