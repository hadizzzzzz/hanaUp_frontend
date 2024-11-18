import styled, { css } from 'styled-components';
import font from '../styles/font';
import color from '../styles/color';

const ReportDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TitleText = styled.div`
  ${font.caption.cap1R};
  color: ${color.grayscale.black};
`;

const TitleColorIcn = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 5px;
  ${props => css`
    background-color: ${props.color};
  `}
`;

const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const ExpenseText = styled.div`
  color: ${color.grayscale.black};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 175% */
`;

const ReportComponent_Detail = ({ name, value, colorIndp, ratio }) => {
  return (
    <ReportDetailContainer>
      <TitleContainer>
        <TitleColorIcn color={colorIndp} />
        <TitleText>{name}</TitleText>
      </TitleContainer>
      <ExpenseContainer>
        <ExpenseText style={{}}>{value}원</ExpenseText>
        <div style={{ ...font.caption.cap2R, color: color.grayscale.gray8 }}>{ratio}%</div>
      </ExpenseContainer>
    </ReportDetailContainer>
  );
};

export default ReportComponent_Detail;
