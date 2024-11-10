import styled, { css } from 'styled-components';
import color from '../styles/color';
import font from '../styles/font';

const Button = styled.div`
  display: flex;
  width: 335px;
  height: 48px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  line-height: normal;
  border-radius: 12px;

  cursor: pointer;

  ${props =>
    props.type === 'active'
      ? css`
          background: linear-gradient(90deg, #46d7c2 0%, #24c9bf 50%, #01babd 100%);
        `
      : props.type === 'hover'
      ? css`
          background: linear-gradient(0deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 100%),
            linear-gradient(90deg, #46d7c2 0%, #24c9bf 50%, #01babd 100%);
        `
      : css`
          background: ${color.grayscale.gray3};
        `}
`;

const BtnText = styled.div`
  ${font.button.b1};
  color: ${color.grayscale.white};
`;

// type: active, hover, inactive
// text: 버튼의 텍스트
// onClick: onClick 함수를 prop으로 전달받음
const PrimaryButton = ({ type, text, onClick }) => {
  return (
    <Button type={type} onClick={onClick}>
      <BtnText>{text}</BtnText>
    </Button>
  );
};

export default PrimaryButton;
