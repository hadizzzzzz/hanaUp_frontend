import { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import color from '../styles/color';
import font from '../styles/font';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // 기본 스타일
import 'react-date-range/dist/theme/default.css'; // 테마 스타일
import ko from 'date-fns/locale/ko';

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

const InputPage_DatePicker = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(''); // 선택된 값
  const dropdownRef = useRef(null); // 드롭다운 영역 참조

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
      cnt: 0,
    },
  ]);

  useEffect(() => {}, [range]);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleDateClick = item => {
    setRange([item.selection]);
    // setIsOpen(false);
    // if (onChange) onChange(value);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    console.log(range);
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
        {selectedValue === '' ? (
          <HeaderText type="placeholder">여행 기간을 선택해주세요</HeaderText>
        ) : (
          <HeaderText>{selectedValue}</HeaderText>
        )}
        <IcnContainer src={isOpen ? upArrow : downArrow} />
      </DatePickerHeader>

      {isOpen && (
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
      )}
    </Container>
  );
};

export default InputPage_DatePicker;
