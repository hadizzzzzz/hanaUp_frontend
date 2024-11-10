import styled, { css } from 'styled-components';
import font from '../styles/font';
import color from '../styles/color';

const MainText = styled.div`
  ${font.header.h1};
  width: 100%;

  color: #2d2d2d;
  text-align: center;

  position: relative;
`;

const MainTextHighLight = styled.div`
  position: absolute;
  width: 172px;
  height: 13px;

  bottom: 8px;
  margin-left: 109px;

  background: rgba(70, 215, 194, 0.3);
`;

const HighLightText = ({ text }) => {
  return (
    <MainText>
      {text}
      <MainTextHighLight />
    </MainText>
  );
};

export default HighLightText;
s;
