import { useEffect } from 'react';
import PrimaryButton from '../common/PrimaryButton';
import styled from 'styled-components';
import PrimaryHeader from '../common/PrimaryHeader';
import FundInfoCard from './components/FundInfoCard';

const Container = styled.div`
  border: 1px solid black;

  /* 미디어 쿼리 적용 */
  /* pc화면에서 너비를 390로 고정합니다*/
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }
`;

const Home = () => {
  // 최초 렌더링시 모달
  useEffect(() => {}, []);

  return (
    <Container className="Home">
      <PrimaryHeader header_title="하나 트래블로그"></PrimaryHeader>
      {/* 초기 띄우는 모달 */}
      <FundInfoCard
        type="countryFunds"
        trend="up"
        country="Japan"
        currency="JPY"
        moneyAmount="12000"
        rate="901.28"
      ></FundInfoCard>
      <FundInfoCard type="foreignSavings" country="USA" currency="USD" moneyAmount="5000" rate="1391.5"></FundInfoCard>
    </Container>
  );
};
export default Home;
