import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Bold';
    font-weight: normal;
    src: url('/fonts/Pretendard-Bold.ttf');
  }
  @font-face {
    font-family: 'Pretendard-ExtraBold';
    font-weight: normal;
    src: url('/fonts/Pretendard-ExtraBold.ttf');
  }
  @font-face {
    font-family: 'Pretendard-Medium';
    font-weight: normal;
    src: url('/fonts/Pretendard-Medium.ttf');
  }
  @font-face {
    font-family: 'Pretendard-Regular';
    font-weight: normal;
    src: url('/fonts/Pretendard-Regular.ttf');
  }
  @font-face {
    font-family: 'Pretendard-SemiBold';
    font-weight: normal;
    src: url('/fonts/Pretendard-SemiBold.ttf');
  }
  @font-face {
    font-family: 'Pretendard-Light';
    font-weight: normal;
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
  margin-left: auto;
  margin-right: auto;
  margin: 0;
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;

   /* 스크롤바 숨기기 */
   &::-webkit-scrollbar {
    display: none;
  }

  overflow-y: scroll;
  }

`;

export default GlobalStyle;
