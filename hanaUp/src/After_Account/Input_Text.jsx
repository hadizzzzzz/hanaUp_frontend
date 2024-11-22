import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import color from '../styles/color';
import font from '../styles/font';

const Container = styled.div`
  width: 100%;
  padding: 16px;

  border-radius: 8px;
  border: 1px solid ${color.grayscale.gray2};

  &::placeholder {
    color: ${color.grayscale.gray5};
    ${font.header.h4숫};
  }

  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const InnerInput = styled.input`
  height: 100%;
  text-decoration: none;
  border: none;
  outline: none;
  background-color: transparent;
  border-radius: 8px;
  min-width: 5px;

  color: var(--gray8, #424242);
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Pretendard-Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const Input_Text = ({ placeholder, currency_code, onInput }) => {
  const inputRef = useRef();
  const spanRef = useRef();
  const [value, setValue] = useState('');

  const handleInput = e => {
    // 숫자만 받고, 숫자 3개마다 콤마
    var input = e.target.value.replace(/[^0-9]/g, '');
    input = Number(input).toLocaleString();
    spanRef.current.textContent = `${input}${currency_code}`;
    setValue(`${input} ${currency_code}`);
    const spanWidth = spanRef.current.offsetWidth;
    inputRef.current.style.width = `${spanWidth + 10}px`;

    // 부모에 전달
    onInput(input);
  };

  return (
    <Container>
      <InnerInput placeholder={placeholder} value={value} ref={inputRef} type="text" onInput={handleInput} />
      <span ref={spanRef} style={{ visibility: 'hidden', position: 'absolute' }}></span>
    </Container>
  );
};

export default Input_Text;
