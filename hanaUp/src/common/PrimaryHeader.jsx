// 뒤로가기버튼, 제목
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import arrow_left from '../common/assets/arrow-left.png';
import font from '../styles/font';
import StatusBarImg from '../../public/img/statusBar.jpg';

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  padding: 0px 24px 0px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const StatusBar = styled.img`
  width: 100%;
  object-fit: cover;
`;

const BackBtnWrapper = styled.div`
  cursor: pointer;
  border: none;
  outline: none;
  background-color: transparent;

  align-items: center;
  padding: 9px;
`;

const BackBtn = styled.img`
  width: 24px;
  height: 24px;
`;

const Title = styled.div`
  color: #37383c;
  text-align: center;

  ${font.header.h3};
  background-color: white;
`;

const PrimaryHeader = ({ header_title }) => {
  const navigate = useNavigate();

  return (
    <Root>
      <StatusBar src={StatusBarImg} />
      <Container>
        <BackBtnWrapper onClick={() => navigate(-1)}>
          <BackBtn src={arrow_left}></BackBtn>
        </BackBtnWrapper>
        <Title>{header_title}</Title>
        <BackBtnWrapper />
      </Container>
    </Root>
  );
};

export default PrimaryHeader;
