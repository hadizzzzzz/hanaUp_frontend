import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import PrimaryHeader from '../common/PrimaryHeader';
import font from '../styles/font';
import color from '../styles/color';
import PrimaryButton from '../common/PrimaryButton';
import InputPage_Dropdown from './InputPage_Dropdown';
import InputPage_DatePicker from './InputPage_DatePicker';
import addDays from 'date-fns/addDays';
import { useEffect } from 'react';
import axios from 'axios';
import calculateDateDiff from '../common/calculateDateDiff';

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
  const navigation = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDate, setSelectedDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [selectedType, setSelectedType] = useState('');

  const countryOptions = [
    { label: '일본', value: '일본', selectedCountry: 'Japan' },
    { label: '태국', value: '태국', selectedCountry: 'Thailand' },
    { label: '말레이시아', value: '말레이시아', selectedCountry: 'Malaysia' },
    { label: '중국', value: '중국', selectedCountry: 'China' },
    { label: '대만', value: '대만', selectedCountry: 'Taiwan' },
    { label: '미국', value: '미국', selectedCountry: 'USA' },
    { label: '영국', value: '영국', selectedCountry: 'UK' },
    { label: '호주', value: '호주', selectedCountry: 'Australia' },
    { label: '필리핀', value: '필리핀', selectedCountry: 'Philippines' },
    { label: '유럽', value: '유럽', selectedCountry: 'Europe' },
  ];

  const typeOptions = [
    { value: '가족', label: '가족' },
    { value: '친구', label: '친구' },
    { value: '비즈니스', label: '비즈니스' },
    { value: '혼자', label: '혼자' },
  ];

  const handleDateSelect = range => {
    setSelectedDate({
      startDate: range[0].startDate,
      endDate: range[0].endDate,
    });
  };

  const checkAllInput = () => {
    if (selectedCountry !== '' && selectedType != '' && selectedDate.startDate != '' && selectedDate.endDate != '')
      return true;
    return false;
  };

  const handleTestStart = async () => {
    if (selectedCountry !== 'Japan' || selectedCountry !== 'USA') {
      try {
        // var url;
        // if (type === 'predictAmountResult') url = `${BASE_URL}/api/before-travel/type-test`;
        // else url = `${BASE_URL}/api/before-travel/estimate-cost`;
        // const res = axios.post(url, {
        //   userId: '12345',
        //   destination: { selectedCountry },
        //   duration: calculateDateDiff(selectedDate.startDate, selectedDate.endDate),
        // });
        // if (res.status === 200){
        //   // 200일 때에만.
        // }

        // 임시 res 객체
        const res = {
          estimatedCost: 1500,
          currency: 'USD',
          breakdown: {
            transport: 300, // 교통비
            food: 400, // 식비
            shopping: 300, // 쇼핑비
            activities: 400, // 활동비
            medical: 100, // 병원비
          },
          averageBreakdown: {
            transport: 280, // 평균 교통비
            food: 450, // 평균 식비
            shopping: 320, // 평균 쇼핑비
            activities: 380, // 평균 활동비
            medical: 120, // 평균 병원비
          },
        };
        navigation(`/predictService/${type}/result`, {
          state: {
            startDate: selectedDate.startDate,
            endDate: selectedDate.endDate,
            country: selectedCountry,
            res: res,
            testDone: false,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container className="testInputPage">
      <PrimaryHeader header_title="여행 기본 정보 입력하기" />
      <MainContainer>
        <InputContainer>
          <InputTitle>여행 국가</InputTitle>
          <InputPage_Dropdown
            placeholder="여행 국가를 선택해주세요"
            options={countryOptions}
            selectedValue={selectedCountry}
            onChange={value => {
              setSelectedCountry(countryOptions.find(item => value === item.value) || {}).selectedCountry || null;
            }}
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
            options={typeOptions}
            selectedValue={selectedType}
            onChange={value => setSelectedType(value)}
          />
        </InputContainer>
      </MainContainer>
      <BtnContainer>
        <PrimaryButton
          text="유형테스트 시작하기"
          type={checkAllInput() ? 'active' : 'deactive'}
          onClick={handleTestStart}
        ></PrimaryButton>
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
