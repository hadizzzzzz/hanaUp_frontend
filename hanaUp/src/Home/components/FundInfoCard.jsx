import styled, { css } from 'styled-components';
import font from '../../styles/font';
import color from '../../styles/color';
import arrowRight from '../assets/arrow-right.png';
import { LinearGradient } from 'react-text-gradients';
import menuIcn from '../assets/menu.png';
import { useEffect } from 'react';

const RootContainer = styled.div`
  margin-left: 30px;
  display: flex;
  width: 275px;
  padding: 15px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  border-radius: 15px;
  ${props =>
    props.type === 'foreignSavings'
      ? css`
          background: linear-gradient(90deg, #46d7c2 0%, #24c9bf 50%, #01babd 100%);
        `
      : css`
          background: linear-gradient(90deg, #ccf6f2 0%, #cbf4e2 38%, #cbf3d9 78%, #c5eed1 100%);
        `}
  position : relative;
`;

const AbsoluteBannerTitle = styled.div`
  display: flex;
  width: 106px;
  height: 29px;
  padding: 7px 14px 8px 14px;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 0px;
  top: 0px;

  border-radius: 0px 15px 0px 15px;
  ${font.caption.cap2B}

  ${props =>
    props.type === 'foreignSavings'
      ? css`
          background: rgba(255, 255, 255, 0.3);
          color: ${color.grayscale.gray1};
        `
      : css`
          background: ${color.brand.grad};
          color: ${color.grayscale.gray1};
        `}
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

const CurrencyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  cursor: pointer;
`;

const CurrencyDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  ${font.header.h2};
  align-items: center;
`;

const IconContainer = styled.img`
  width: 7px;
  height: 13px;
  object-fit: cover;
`;

const AddMoneyBtn = styled.div`
  display: flex;
  padding: 5px 10px;
  align-items: center;

  cursor: pointer;
  border-radius: 50px;

  ${font.header.h5B}

  text-align: center;
  color: ${color.brand.secondary};
  ${props =>
    props.type === 'foreignSavings'
      ? css`
          background: rgba(255, 255, 255, 0.8);
        `
      : css`
          background: ${color.brand.grad30};
        `}
`;

const ExpireDate = styled.div`
  color: #ffffff;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.4px;
`;

const ConnectAccount = styled.div`
  cursor: pointer;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.4px;

  text-decoration: underline ${color.brand.primary};
  text-underline-offset: 2px;
`;

const BtnsContainer = styled.div`
  display: flex;
  margin-top: 10px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;

  border-radius: 10px;
  background-color: #ffffff;

  cursor: pointer;
`;

const BtnContainer = styled.div`
  ${font.caption.cap2B};
  color: ${color.grayscale.gray6};
  border-right: 0.5px solid ${color.grayscale.gray5};
  text-align: center;
  vertical-align: center;
  line-height: 12px;
  padding: 2px 16.5px 2px 17px;

  ${props =>
    props.trend === 'up'
      ? css`
          color: ${color.brand.accept};
          padding: 2px 9px 2px 9px;
        `
      : props.trend === 'down'
      ? css`
          color: #4e75ff;
          padding: 2px 9px 2px 9px;
        `
      : css``};

  ${props =>
    props.type !== 'foreignSavings'
      ? css`
          /* 부모 컨테이너의 크고 작아짐에 따라 자식 컨테이너의 값도 조절한다. */
        `
      : css`
          flex: 1 0 0;
          /* 부모 컨테이너의 크고 작아짐에 따라 자식 컨테이너의 값도 조절한다. */
        `}
`;

const ImgContainer = styled.div`
  padding: 5px 11px 4px 11px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuIcn = styled.img`
  width: 11px;
  height: 9px;
`;

// type // 외화적금: foreignSavings, 보유 통화: countryFunds
// trend // 보유 통화인 경우 trend가 up 혹은 down으로 환율의 사태 표시
// country
// currency // 통화 종류
// moneyAmount // 남은 돈
// rate  // 현재 환율 (보유 통화인 경우)
const FundInfoCard = ({ type, trend, country, currency, moneyAmount, exchangeRate }) => {
  return (
    <RootContainer type={type}>
      <AbsoluteBannerTitle type={type}>{type === 'foreignSavings' ? '외화적금' : '보유통화'}</AbsoluteBannerTitle>
      {/* column 방향 레이아웃*/}
      <CountryContainer>
        <CurrencyTitle>{currency}</CurrencyTitle>
      </CountryContainer>
      {/* 잔고와 충전 버튼 */}
      <CurrencyContainer>
        <CurrencyDetailContainer>
          <div>{moneyAmount}</div>
          <IconContainer src={arrowRight}></IconContainer>
        </CurrencyDetailContainer>
        <AddMoneyBtn type={type}>충전</AddMoneyBtn>
      </CurrencyContainer>
      {/* 만기경과 or 계좌 연결 버튼*/}
      {type === 'foreignSavings' ? (
        <ExpireDate>만기경과 : 2024-12-04</ExpireDate>
      ) : (
        <LinearGradient gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}>
          <ConnectAccount>모든 은행 내 계좌 연결</ConnectAccount>
        </LinearGradient>
      )}
      {/* 외화적금이라면 -> 버튼 컨테이너 */}
      {type === 'foreignSavings' ? (
        <BtnsContainer>
          <BtnContainer type={type}>해지하기</BtnContainer>
          <BtnContainer type={type}>거래 내역</BtnContainer>
          <ImgContainer>
            <MenuIcn src={menuIcn}></MenuIcn>
          </ImgContainer>
        </BtnsContainer>
      ) : (
        <BtnsContainer>
          <BtnContainer type={type}>환급</BtnContainer>
          <BtnContainer type={type} trend={trend}>
            {currency} 100 = {exchangeRate.rate}원 {trend === 'up' ? '▲' : '▼'}
          </BtnContainer>
          <ImgContainer>
            <MenuIcn src={menuIcn}></MenuIcn>
          </ImgContainer>
        </BtnsContainer>
      )}
      {/* 보유통화라면 환급 버튼과 환율 up down*/}
    </RootContainer>
  );
};

export default FundInfoCard;
