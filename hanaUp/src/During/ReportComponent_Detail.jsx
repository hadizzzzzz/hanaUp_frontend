import styled, { css } from 'styled-components';
import font from '../styles/font';
import color from '../styles/color';
import PrimaryTag from '../common/PrimaryTag';

const ReportDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  width: 100%;
`;

const TitleWithTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
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

const ReportComponent_Detail = ({ type, name, value, colorIndp, ratio }) => {
  return (
    <>
      <ReportDetailContainer>
        <TitleWithTag>
          {name === '병원비' ? <PrimaryTag text="원클릭 보험비 청구하기" /> : <></>}
          <TitleContainer>
            <TitleColorIcn color={colorIndp} />
            <TitleText>{name}</TitleText>
          </TitleContainer>
        </TitleWithTag>

        <ExpenseContainer>
          <ExpenseText style={{}}>{value && value.toLocaleString()}원</ExpenseText>
          <div style={{ ...font.caption.cap2R, color: color.grayscale.gray8 }}>{ratio}%</div>
        </ExpenseContainer>
      </ReportDetailContainer>
    </>
  );
};

export default ReportComponent_Detail;
