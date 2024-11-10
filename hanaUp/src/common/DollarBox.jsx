import styled, { css } from 'styled-components';
import color from '../styles/color';
import font from '../styles/font';

const Container = styled.div`
  display: flex;
  padding: 20px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  align-self: stretch;

  border-radius: 10px;
  background: ${color.grayscale.gray1};
`;

const MoneyAmountInteger = styled.div`
  color: ${color.grayscale.black};
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.08px;
`;

const MoneyAmountFloat = styled.div``;

const SubText = styled.div`
  ${font.header.h5R}
  color: ${color.grayscale.gray6};
`;

// startDate, endDate, currency(화폐 단위), country(나라명), amount(예상치)
// 소수점을 받으면 처리해야됨
const DollarBox = ({ startDate, endDate, currency, country, amount }) => {
  return (
    <Container>
      <MoneyAmountInteger>
        {currency}
        {amount}
      </MoneyAmountInteger>
      {/* country에 따라 Icn을 띄워야함 */}
      <SubText>
        {startDate.toLocaleDateString()}~{endDate.toLocaleDateString()}의 여행
      </SubText>
    </Container>
  );
};

export default DollarBox;
