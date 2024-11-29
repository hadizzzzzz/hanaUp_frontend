import styled from 'styled-components';
import font from '../styles/font';
import Icn_trash from './assets/trash.png';
import color from '../styles/color';
import { LinearGradient } from 'react-text-gradients';
import Toast from '../common/Toast';

const Container = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  align-self: stretch;

  border-radius: 10px;
  background: var(--gray1, #f8f8f8);
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: stretch;

  gap: 10px;
`;

const Icn = styled.img`
  width: 20px;
  object-fit: cover;
`;

const ChargeContentWrapper = styled.div`
  text-align: left;
  ${font.header.h2};
  color: ${color.grayscale.gray8};
  height: 100%;
`;

const ChangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;

  word-break: keep-all;
`;

const ExTech_ChargeItem = ({ countryInfo, basisRate, duration, amount }) => {
  return (
    <Container>
      <RowContainer>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Icn src={`/img/countryIcons/${countryInfo.country_en}.png`} />
          <div style={{ ...font.header.h5R, color: '#2d2d2d' }}>
            {countryInfo.country_kr}
            {countryInfo.currency_code}
          </div>
        </div>
        <Icn src={Icn_trash} style={{ cursor: 'pointer' }} />
      </RowContainer>
      <RowContainer>
        <ChargeContentWrapper>
          {basisRate}원 이하가 되면
          <br />{' '}
          {duration === '한번만 충전'
            ? '한 번만'
            : `도달할 때마다
          `}{' '}
          <br />
          <span style={{ color: color.brand.primary }}>{amount}</span> 충전
        </ChargeContentWrapper>
        <ChangeWrapper>
          <LinearGradient
            style={{ ...font.button.b1, wordBreak: 'keep-all', cursor: 'pointer' }}
            gradient={['to right', '#46D7C2 0%, #24C9BF 50%, #01BABD 100%']}
          >
            변경
          </LinearGradient>
        </ChangeWrapper>
      </RowContainer>
    </Container>
  );
};

export default ExTech_ChargeItem;
