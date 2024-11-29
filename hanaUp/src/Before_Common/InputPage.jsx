import React, { useState } from 'react';
import { replace, useNavigate, useParams } from 'react-router-dom';
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
import { useRecoilState } from 'recoil';
import { during_travelDetail } from '../Recoil/during_travelDetail';
import { useRecoilValue } from 'recoil';
import { uid } from '../Recoil/uid';
import countryInfo from '../common/arrays/countryInfo';

const Container = styled.div`
  width: 390px;
  margin: 0 auto;

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
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // 여행 정보를 받자마자 전역으로 관리하도록 함
  const [travelDetail, setTravelDetail] = useRecoilState(during_travelDetail);
  const userId = useRecoilValue(uid);

  // 사용자의 트래블로그 이용 여부
  const type = useParams().type;
  const navigation = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [selectedType, setSelectedType] = useState('');

  const countryOptions = [
    // { label: '일본', value: '일본', selectedOptionCountry: 'Japan' }, // 일본 비활성화
    { label: '태국', value: '태국', selectedOptionCountry: 'Thailand' },
    { label: '말레이시아', value: '말레이시아', selectedOptionCountry: 'Malaysia' },
    { label: '중국', value: '중국', selectedOptionCountry: 'China' },
    { label: '대만', value: '대만', selectedOptionCountry: 'Taiwan' },
    // { label: '미국', value: '미국', selectedOptionCountry: 'USA' }, // 미국 비활성화
    { label: '영국', value: '영국', selectedOptionCountry: 'UK' },
    { label: '호주', value: '호주', selectedOptionCountry: 'Australia' },
    { label: '필리핀', value: '필리핀', selectedOptionCountry: 'Philippines' },
    { label: '유럽', value: '유럽', selectedOptionCountry: 'Europe' },
  ];

  const typeOptions = [
    { value: '가족', label: '가족' },
    { value: '친구', label: '친구' },
    { value: '비즈니스', label: '비즈니스' },
    { value: '혼자', label: '혼자' },
  ];

  const handleDateSelect = ({ newStartDate, newEndDate }) => {
    console.log(newStartDate, newEndDate);
    setSelectedDate({
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  const checkAllInput = () => {
    if (selectedCountry !== '' && selectedType != '' && selectedDate.startDate != '' && selectedDate.endDate != '')
      return true;
    return false;
  };

  const handleTestStart = async () => {
    if (selectedCountry !== 'Japan' || selectedCountry !== 'USA') {
      // 전역 상태로 입력된 여행 정보를 관리하여 여행 중에서 사용함.
      setTravelDetail({
        destination: selectedCountry,
        startDate: selectedDate.startDate,
        endDate: selectedDate.endDate,
        duration: 3,
        // type:
      });
      try {
        // 응답을 출력해봄 (디버깅용)
        console.log({
          userId: userId,
          destination: selectedCountry,
          duration: String((selectedDate.endDate - selectedDate.startDate) / (1000 * 60 * 60 * 24) + 1),
          currency: `${countryInfo.find(item => item.country_en === selectedCountry).currency_code}`,
        });

        var res;

        // predict amount result일 때 => 바로 post하고 결과 페이지로 이동
        if (type === 'predictAmount') {
          // console.log({
          //   userId: userId,
          //   destination: 'Europe',
          //   duration: '7',
          //   currency: 'EUR',
          // });
          const res = await axios.post(`${BASE_URL}/api/before-travel/estimate-cost`, {
            userId: userId,
            destination: selectedCountry,
            duration: String((selectedDate.endDate - selectedDate.startDate) / (1000 * 60 * 60 * 24) + 1),
            currency: countryInfo.find(item => item.country_en === selectedCountry).currency_code,
          });
          // 임시 res 객체
          // res = {
          //   estimatedCost: 1500,
          //   currency: 'USD',
          //   breakdown: {
          //     transport: 300, // 교통비
          //     food: 400, // 식비
          //     shopping: 300, // 쇼핑비
          //     activities: 400, // 활동비
          //     medical: 100, // 병원비
          //   },
          //   averageBreakdown: {
          //     transport: 280, // 평균 교통비
          //     food: 450, // 평균 식비
          //     shopping: 320, // 평균 쇼핑비
          //     activities: 380, // 평균 활동비
          //     medical: 120, // 평균 병원비
          //   },
          // };
          console.log('post 결과', res.data);
          navigation(
            `/predictService/${type}/result`,
            {
              state: {
                startDate: selectedDate.startDate,
                endDate: selectedDate.endDate,
                country: selectedCountry,
                res: res.data,
              },
            },
            {
              replace: true,
            },
          );
        } else {
          navigation(
            `/predictService/${type}/result`,
            {
              state: {
                startDate: selectedDate.startDate,
                endDate: selectedDate.endDate,
                country: selectedCountry,
                testDone: false,
              },
            },
            {
              replace: true,
            },
          );
        }
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
              setSelectedCountry(countryOptions.find(item => value === item.value).selectedOptionCountry);
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
          text={type === 'predictAmountResult' ? '유형테스트 시작하기' : '경비 예측 시작하기'}
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
