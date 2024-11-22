import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import color from '../styles/color';
import font from '../styles/font';
import upArrow from './assets/upArrow.png';
import downArrow from './assets/downArrow.png';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div`
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

const DropDownUl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  padding: 5px 0px;
`;

const DropDownLi = styled.div`
  width: 100%;
  display: flex;
  padding: 6px 18px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  cursor: pointer;
  color: ${color.grayscale.black};

  ${font.header.h5R}

  &:hover {
    background-color: ${color.grayscale.gray2};
  }
`;

const IcnContainer = styled.img`
  width: 24px;
  height: 24px;
`;

const InputPage_Dropdown = ({ type, options, placeholder, onChange, basisRate }) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const [selectedValue, setSelectedValue] = useState(''); // 선택된 값
  const dropdownRef = useRef(null); // 드롭다운 영역 참조

  const option = { value: 'THB 1,500' }; // or another test case
  const newBasisRate = '333,8.73';

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleOptionClick = value => {
    setSelectedValue(value); // 선택된 값 업데이트
    setIsOpen(false); // 드롭다운 닫기
    if (onChange) onChange(value); // 부모 컴포넌트로 값 전달
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

  if (type === 'selected') {
    return (
      <Container>
        {/* 드롭다운 헤더 */}
        <DropdownHeader>
          {/* 텍스트 */}
          <HeaderText>하나머니 사용하기</HeaderText>
        </DropdownHeader>
      </Container>
    );
  } else
    return (
      <Container ref={dropdownRef}>
        {/* 드롭다운 헤더 */}
        <DropdownHeader onClick={toggleDropdown}>
          {/* 텍스트 */}
          {selectedValue === '' ? (
            <HeaderText type="placeholder">{placeholder}</HeaderText>
          ) : (
            <HeaderText>{selectedValue}</HeaderText>
          )}
          <IcnContainer src={isOpen ? upArrow : downArrow} />
        </DropdownHeader>

        {/* 드롭다운 리스트 */}
        {isOpen && (
          <DropDownUl
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#fff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              listStyle: 'none',
              zIndex: 10,
              marginTop: '5px',
            }}
          >
            {options.map((option, index) => (
              <DropDownLi key={index} onClick={() => handleOptionClick(option.value)}>
                {option.label}{' '}
                {option.sublabel ? (
                  <span style={{ ...font.caption.cap2R, color: color.grayscale.gray8 }}>{option.sublabel}</span>
                ) : (
                  <></>
                )}
                {basisRate && option.value != '하나머니 금액만큼' ? (
                  <span style={{ ...font.caption.cap2R, color: color.grayscale.gray8 }}>
                    {(
                      Number(option.value.replace(/[^0-9]/g, '')) * Number(basisRate.replace(/,/g, ''))
                    ).toLocaleString()}
                    원
                  </span>
                ) : (
                  <></>
                )}
              </DropDownLi>
            ))}
          </DropDownUl>
        )}
      </Container>
    );
};

export default InputPage_Dropdown;
