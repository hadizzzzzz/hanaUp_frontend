import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Bold';
    src: url('/fonts/Pretendard-Bold.ttf');
  }
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('/fonts/Pretendard-Regular.ttf');
  }
  @font-face {
    font-family: 'Pretendard-SemiBold';
    src: url('/fonts/Pretendard-SemiBold.ttf');
  }
  @font-face {
    font-family: 'Pretendard-Light';
    src: url('/fonts/Pretendard-Light.ttf');
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  margin: 0;
  min-height: 100vh;
  background-color: white;
  }

  // 최상위 페이지 컴포넌트에 대해 모바일 웹 환경 구축

  .Home, .predictService, .testInputPage, .spendTypeTest, .spendTypeTestPage, .atmPage, .reportPage, .investIntro, .investIntroResult, .newAccount, .exTech, .deleteSavings{
  border : 1px solid black;
  margin-left: auto;
  margin-right: auto;

  // 레이아웃
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  margin: 0;
  min-height: 100vh;
  background-color: white;

   /* 스크롤바 숨기기 */
   &::-webkit-scrollbar {
    display: none;
  }

  overflow-y: scroll;
  }

`;

export default GlobalStyle;
