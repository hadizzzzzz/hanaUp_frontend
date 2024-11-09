import styled from 'styled-components';
import font from '../../styles/font';
import color from '../../styles/color';

const RootContainer = styled.div`
  display: flex;
  width: 275px;
  height: 130px;
  padding: 15px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  border-radius: 15px;
  background: linear-gradient(90deg, #46d7c2 0%, #24c9bf 50%, #01babd 100%);
`;

const CountryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
`;

const CurrencyTitle = styled.div`
  ${font.header.h5R};
  color: #2d2d2d;
`;

// type // 외화적금: foreignSavings, 보유 통화: countryFunds
// trend // 보유 통화인 경우 trend가 up 혹은 down으로 환율의 사태 표시
// country
// currency // 통화 종류
// balance (잔고) // 보유 통화인 경우
// totalAmount  // 외화 적금인 경우
// rate  // 현재 환율 (보유 통화인 경우)
const FundInfoCard = ({ type, trend, country, currency, balance, rate }) => {
  <RootContainer>
    {/* column 방향 레이아웃*/}
    <CountryContainer>
      {/* icon */}
      <CurrencyTitle>{currency}</CurrencyTitle>
    </CountryContainer>
  </RootContainer>;
};

export default FundInfoCard;
