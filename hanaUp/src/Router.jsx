import { createBrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home/Home';
import NewAccountPage from './After_Account/NewAccountPage';
import ExTechPage from './After_ExTech/ExTechPage';
import PredictService from './Before_Common/PredictService';
import Before_InputPage from './Before_Common/InputPage';
import SpendTypeTestPage from './Before_SpendTypeTest/SpendTypeTestMain';
import PredictAmountPage from './Before_PredictAmount/PredictAmountPage';
import TestPage from './Before_SpendTypeTest/TestPage';
import AtmPage from './During/AtmPage';
import During_ReportPage from './During/During_ReportPage';
import IntroPage from './After_Common/IntroPage';
import Intro_ResultPage from './After_Common/Intro_ResultPage';
import DeleteSavings from './After_DeleteSavings/DeleteSavings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/predictService',
    element: <PredictService></PredictService>,
  },
  {
    path: '/predictService/:type',
    element: <Before_InputPage></Before_InputPage>,
  },

  {
    path: '/predictService/predictAmount/result',
    element: <PredictAmountPage></PredictAmountPage>,
  },
  {
    path: '/predictService/spendTypeTest/test',
    element: <TestPage></TestPage>,
  },
  {
    path: '/predictService/spendTypeTest/result',
    element: <SpendTypeTestPage></SpendTypeTestPage>,
  },
  {
    path: '/atm',
    element: <AtmPage></AtmPage>,
  },
  {
    path: '/report',
    element: <During_ReportPage />,
  },
  {
    path: '/InvestIntro',
    element: <IntroPage />,
  },
  {
    path: '/InvestIntro/:type',
    element: <Intro_ResultPage />,
  },
  {
    path: '/newAccount',
    element: <NewAccountPage></NewAccountPage>,
  },
  {
    path: '/exTech',
    element: <ExTechPage></ExTechPage>,
  },
  {
    path: '/deleteSavings',
    element: <DeleteSavings />,
  },
]);

export default router;
