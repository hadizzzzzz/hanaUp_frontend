import styled, { css } from 'styled-components';
import font from '../styles/font';
import color from '../styles/color';

const TextWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const MainText = styled.div`
  ${font.header.h1};

  color: #2d2d2d;
  text-align: center;

  z-index: 1;
`;

const HighLightContainer = styled.div`
  width: 100%;

  position: absolute;
  bottom: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 0;
`;

const MainTextHighLight = styled.div`
  width: 172px;
  height: 13px;

  /* 텍스트의 크기에 따라 margin이 달라짐 */
  /* 390(전체 너비)의 절반 195 */
  /* margin-left: 109px; */

  background: rgba(70, 215, 194, 0.3);

  ${props =>
    props.type === 'long'
      ? css`
          width: 225px;
        `
      : css``}
`;

const HighLightText = ({ text, type }) => {
  return (
    <TextWrapper>
      <MainText>{text}</MainText>
      <HighLightContainer>
        <MainTextHighLight type={type} />
      </HighLightContainer>
    </TextWrapper>
  );
};

export default HighLightText;
