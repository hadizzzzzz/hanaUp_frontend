import { useRecoilValue } from 'recoil';
import after from '../assets/after.jpg';
import before from '../assets/before.jpg';
import during from '../assets/during.jpg';
import styled from 'styled-components';
import { travelInfo } from '../../Recoil/travelState';
import BannerBtn from './BannerBtn';
import { useNavigate, useNavigation } from 'react-router-dom';

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const BannerImg = styled.img`
  width: 375px;
  height: 171px;
  object-fit: cover;
`;

const BtnContainer = styled.div`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  position: absolute;
  bottom: 30px;
`;

const TravelBanner = () => {
  const travelState = useRecoilValue(travelInfo);
  const navigate = useNavigate();

  const onBeforeBtnHandler = () => {
    navigate('/predictService');
  };

  const onDuringBtnHandler = () => {
    navigate('/dailyReport');
  };

  const onAfterReportBtnHandler = () => {
    navigate('/dailyReport');
  };

  const onAfterInvestBtnHandler = () => {
    navigate('/');
  };

  return (
    <ImgWrapper>
      <BannerImg src={travelState === 'before' ? before : travelState === 'during' ? during : after}></BannerImg>
      <BtnContainer>
        <BannerBtn
          text={
            travelState === 'during' ? 'ATM 위치 확인하기' : travelState === 'after' ? '여행 소비 리포트 확인하기' : ''
          }
          onClick={
            travelState === 'after'
              ? () => {
                  navigate('/report');
                }
              : () => {
                  navigate('/atm');
                }
          }
        ></BannerBtn>
        <BannerBtn
          text={
            travelState === 'during'
              ? '여행 소비 리포트 확인하기'
              : travelState === 'after'
              ? '여행 후 남은 외화 투자하기'
              : '여행 경비 예측하기'
          }
          onClick={
            travelState === 'before'
              ? () => {
                  navigate('/predictService');
                }
              : travelState === 'after'
              ? () => {
                  navigate('/InvestIntro');
                }
              : () => {
                  navigate('/report');
                }
          }
        ></BannerBtn>
      </BtnContainer>
    </ImgWrapper>
  );
};
export default TravelBanner;
