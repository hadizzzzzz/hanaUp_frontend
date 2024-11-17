import { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import color from '../styles/color';
import font from '../styles/font';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // 기본 스타일
import 'react-date-range/dist/theme/default.css'; // 테마 스타일
import ko from 'date-fns/locale/ko';

import './styles/datePicker.css';

import upArrow from './assets/upArrow.png';
import downArrow from './assets/downArrow.png';

import addDays from 'date-fns/addDays';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const IcnContainer = styled.img`
  width: 24px;
  height: 24px;
`;

const DatePickerHeader = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  border-radius: 8px;
  border: 1px solid ${color.grayscale.gray2};

  &::placeholder {
    color: ${color.grayscale.gray5};
    ${font.header.h4};
  }
`;

const HeaderText = styled.div`
  ${font.header.h4}

  ${props =>
    props.type === 'placeholder'
      ? css`
          color: ${color.grayscale.gray5};
        `
      : css`
          color: ${color.grayscale.black};
        `}
`;

const DatePickerWrapper = styled.div`
  position: absolute;
  z-index: 1;
  margin-top: 10px;

  border-radius: 8px;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);
`;

// 모달을 열기 전
// 모달을 연 후 - 날짜 1개 선택 (startDate와 endDate가 동일)
// 모달을 연 후 - 날짜 2개 선택 (startDate와 endDate 전부)
// 모달을 연 후 - 또 다시 날짜 선택 (초기화 후 startDate)
const InputPage_DatePicker = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(''); // 선택된 값
  const dropdownRef = useRef(null); // 드롭다운 영역 참조
  const [isFirst, setIsFirst] = useState(true); // 초기의 placeholder 관리를 위함

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleDateClick = item => {
    if (isFirst) setIsFirst(!isFirst);
    setRange([item.selection]);

    if (onChange) onChange([item.selection]);
  };

  const renderContent = () => {
    const { startDate, endDate } = range[0];

    if (isFirst) {
      return <HeaderText type="placeholder">여행 기간을 선택해주세요</HeaderText>;
    }

    const isSameDay = startDate.toDateString() === endDate.toDateString();

    if (isSameDay) {
      return <HeaderText>{startDate.toLocaleDateString()}</HeaderText>;
    }

    return (
      <HeaderText>
        {startDate.toLocaleDateString()} ~ {endDate.toLocaleDateString()}
      </HeaderText>
    );
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container ref={dropdownRef}>
      <DatePickerHeader onClick={toggleDropdown}>
        {/* {datePickerCnt === 0 ? (
          <HeaderText type="placeholder">여행 기간을 선택해주세요</HeaderText>
        ) : {}} */}
        {renderContent()}
        <IcnContainer src={isOpen ? upArrow : downArrow} />
      </DatePickerHeader>

      {isOpen && (
        <DatePickerWrapper>
          <DateRange
            //   dateDisplayFormat={'yyyy.mm.dd'}
            monthDisplayFormat="MMM"
            locale={ko} // 한국어 달력으로
            showDateDisplay={false}
            showPreview={false}
            showMonthAndYearPickers={false}
            rangeColors={[color.brand.secondary]}
            editableDateInputs={true}
            onChange={item => handleDateClick(item)}
            moveRangeOnFirstSelection={false}
            ranges={range}
          />
        </DatePickerWrapper>
      )}
    </Container>
  );
};

export default InputPage_DatePicker;
