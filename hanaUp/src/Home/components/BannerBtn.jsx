import styled, { css } from 'styled-components';
import color from '../../styles/color';
import font from '../../styles/font';
import arrowRight from '../assets/arrow-right.png';

const Wrapper = styled.div`
  display: flex;
  padding: 10px 15px;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;

  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);

  cursor: pointer;

  ${props =>
    props.text === ''
      ? css`
          visibility: hidden;
        `
      : css``}
`;

const BtnText = styled.div`
  color: ${color.grayscale.gray6};
  ${font.caption.cap3B};
`;

const Icn = styled.img`
  width: 3px;
  height: 5px;
  object-fit: cover;
`;

// text
// onClick
const BannerBtn = ({ text, onClick }) => {
  return (
    <Wrapper onClick={onClick} text={text}>
      <BtnText>{text}</BtnText>
      <Icn src={arrowRight} />
    </Wrapper>
  );
};
export default BannerBtn;
