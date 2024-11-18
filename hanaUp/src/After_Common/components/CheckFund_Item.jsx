import styled, { css } from 'styled-components';
import font from '../../styles/font';
import color from '../../styles/color';
import OnBtn from '../assets/radioBtn.png';
import OffBtn from '../assets/radioBtnOff.png';

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 15px 20px;
  justify-content: space-between;
  align-items: center;

  border-radius: 10px;

  ${props =>
    props.isClicked
      ? css`
          border: 2px solid ${color.brand.primary};
        `
      : css`
          border: 2px solid ${color.grayscale.gray2};
        `}
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
`;

const CountryContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

const ImgContainer = styled.img`
  width: 16px;
  object-fit: cover;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnIcnContainer = styled.img`
  width: 20px;
  object-fit: cover;
`;

// countryFund : 해당 fund 정보 -> balance, country, currency, exchangeRate
// countryInfo : 해당 fund 나라의 나라 정보
// isClicked
// onClick 함수

const CheckFund_Item = ({ index, countryFund, countryInfo, isClicked, onClick }) => {
  // 클릭 되면 부모 요소의 함수 호출 후
  // 활성화 상태로 렌더링
  return (
    <Container isClicked={isClicked} onClick={() => onClick(index)}>
      <TextContainer>
        <CountryContainer>
          <ImgContainer src={`/img/countryIcons/${countryInfo.country_en}.png`} />
          <div style={{ ...font.caption.cap2M, color: color.grayscale.gray6 }}>{countryInfo.country_kr}</div>
        </CountryContainer>
        <div style={{ ...font.header.h2, color: '#2d2d2d' }}>
          {countryFund.balance} {countryInfo.currency_symbol}
        </div>
      </TextContainer>
      <BtnContainer>
        <BtnIcnContainer src={isClicked ? OnBtn : OffBtn} />
      </BtnContainer>
    </Container>
  );
};

export default CheckFund_Item;
