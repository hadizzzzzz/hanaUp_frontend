import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    font-weight: normal;
    src: url('/fonts/Pretendard-Medium.ttf');
  }

  *, *::before, *::after {
    box-sizing: border-box;
    font-family: "pretendard";
  }

  body {
  font-family: "pretendard";
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  margin: 0;
  min-height: 100vh;
  background-color: white;
  }

  // 최상위 페이지 컴포넌트에 대해 모바일 웹 환경 구축
  /* .mainContainer, .total, .map, .home, .community, .assetDetail, .assetEdit, .assetAddNumber, .communityGovern, .community_govern, .community_neighbor, .guideLinePage, .guideLineAct{
  margin-left: auto;
  margin-right: auto;
} */

  .Home {
    margin-left: auto;
  margin-right: auto;
  font-family: "pretendard";
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  margin: 0;
  min-height: 100vh;
  background-color: white;
  }
/* {
  margin-left: auto;
  margin-right: auto;
}  */

`;

export default GlobalStyle;
