import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import PrimaryHeader from '../common/PrimaryHeader';
import font from '../styles/font';
import color from '../styles/color';
import PrimaryButton from '../common/PrimaryButton';
import InputPage_Dropdown from './InputPage_Dropdown';
import InputPage_DatePicker from './InputPage_DatePicker';
import addDays from 'date-fns/addDays';

const Container = styled.div`
  border: 1px solid black;

  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 40px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;

  flex: 1 0 0;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const InputTitle = styled.div`
  ${font.header.h3}
  color:  #2D2D2D;
`;

const BtnContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  align-self: stretch;
`;

const Horizon = styled.div`
  width: 335px;
  height: 1px;

  background-color: #f8f8f8;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

// 두가지 종류의 예측 서비스에 공통으로 들어가는 페이지
const Before_InputPage = () => {
  // 사용자의 트래블로그 이용 여부
  const type = useParams().type;

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
  });
  const [selectedType, setSelectedType] = useState('');

  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];

  const handleDateSelect = ({ startDate, endDate }) => {
    console.log(startDate);
    console.log(endDate);
  };

  return (
    <Container className="testInputPage">
      <PrimaryHeader header_title="여행 기본 정보 입력하기" />
      <MainContainer>
        <InputContainer>
          <InputTitle>여행 국가</InputTitle>
          <InputPage_Dropdown
            placeholder="여행 국가를 선택해주세요"
            options={options}
            selectedValue={selectedCountry}
            onChange={value => setSelectedCountry(value)}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>여행 기간</InputTitle>
          <InputPage_DatePicker onChange={handleDateSelect} />
        </InputContainer>
        <InputContainer>
          <InputTitle>여행 유형</InputTitle>
          <InputPage_Dropdown
            placeholder="여행 유형을 선택해주세요"
            options={options}
            selectedValue={selectedType}
            onChange={value => setSelectedType(value)}
          />
        </InputContainer>
      </MainContainer>
      <BtnContainer>
        <PrimaryButton text="유형테스트 시작하기"></PrimaryButton>
        <Horizon />
        <InfoContainer>
          <div style={{ ...font.caption.cap2M, color: '#757575' }}>
            테스트를 시작하면 하나업 서비스에 동의하게 됩니다.
          </div>
          <div style={{ ...font.caption.cap2B, color: '#424242', cursor: 'pointer' }}>약관 자세히 보기</div>
        </InfoContainer>
      </BtnContainer>
    </Container>
  );
};

export default Before_InputPage;