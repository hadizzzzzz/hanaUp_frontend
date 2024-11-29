import styled from 'styled-components';
import color from '../../styles/color';
import profile from '../assets/profile.png';
import Msg from '../../common/Msg';
import PrimaryTag from '../../common/PrimaryTag';
import font from '../../styles/font';
import PrimaryButton from '../../common/PrimaryButton';
import { useRecoilValue } from 'recoil';
import { fundInfoState } from '../../Recoil/fundInfo';
import countryInfo from '../../common/arrays/countryInfo';

const EntireContainer = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 4;

  position: absolute;
  bottom: 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;

  width: 390px;
  margin: 0 auto;
`;

const NoneContainer = styled.div`
  height: auto;
  width: 100%;
  z-index: 6;
  flex-grow: 1;
  background-color: transparent;

  position: relative;
`;

const Container = styled.div`
  background-color: ${color.grayscale.white};
  margin: 0 auto;
  height: auto;
  overflow: hidden;
  bottom: 0px;
  z-index: 5;
  transform: bottom 1s ease-in-out;

  width: 390px;
  margin: 0 auto;

  bottom: 0px;

  border-radius: 20px 20px 0px 0px;

  display: flex;
  padding: 60px 20px 20px 20px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  align-self: stretch;
`;

const ProfileContainer = styled.div`
  width: 130px;
  height: 130px;

  position: absolute;
  z-index: 4;
  bottom: -65px;
  left: 130px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  position: relative;

  position: relative;
  z-index: 4;
`;

const FundInfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 4;
`;

const FundInfoDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  z-index: 4;
`;

const Horizon = styled.div`
  height: 1.5px;
  width: 100%;
  background-color: rgba(164, 169, 174, 0.15);
`;

const FundInfoDetail = ({ country_info, amount }) => {
  if (country_info)
    return (
      <div
        style={{
          width: '294px',
          height: '21px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ ...font.caption.cap1R, color: color.grayscale.gray6 }}>{country_info.country_kr}</div>
        <div style={{ ...font.header.h3, color: color.grayscale.black }}>
          {amount} {country_info.currency_symbol}
        </div>
      </div>
    );
};

// 총 얼마의 돈이 방치되어 있는지 필요
// fundInfo 전부
const Intro_BottomModal = ({ closeModal, changeToCheckFunds, countryFunds, remainMoney }) => {
  return (
    <EntireContainer>
      <NoneContainer onClick={closeModal}>
        <ProfileContainer onClick={() => {}}>
          <img src={profile} style={{ objectFit: 'cover', width: '100px' }}></img>
        </ProfileContainer>
      </NoneContainer>
      <Container>
        <NameProfileContainer>
          <div style={{ ...font.header.h2, color: color.grayscale.black }}>하디즈</div>
          <div style={{ borderRadius: '100px', border: '1px solid #46D7C2', padding: '3px' }}>
            <PrimaryTag text="트래블로그 혜택을 받을 수 있어요" />
          </div>
        </NameProfileContainer>
        <FundInfoContainer>
          <FundInfoDetailContainer>
            {countryFunds.map((item, index) => (
              <>
                <FundInfoDetail
                  country_info={countryInfo.find(info => info.country_en === item.country)}
                  amount={item.balance.toLocaleString()}
                />
                <Horizon />
              </>
            ))}
            <FundInfoDetail />
            <FundInfoDetail />
            <FundInfoDetail />
          </FundInfoDetailContainer>
          <Msg type="negative" text={`총 ${Math.floor(Number(remainMoney)).toLocaleString()}원이 방치되어 있어요`} />
        </FundInfoContainer>
        <PrimaryButton type="active" text="다음" onClick={changeToCheckFunds} />
      </Container>
    </EntireContainer>
  );
};
export default Intro_BottomModal;
