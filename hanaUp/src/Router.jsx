import { createBrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home/Home';
import DailyReport from './During_DailyReport/DailyReport';
import NewAccount from './After_Account/NewAccount';
import ATM from './During_ATM/ATM';
import ExTech from './After_ExTech/ExTech';
import PredictService from './Before_Common/PredictService';
import Before_InputPage from './Before_Common/InputPage';
import SpendTypeTestPage from './Before_SpendTypeTest/SpendTypeTestMain';
import PredictAmountPage from './Before_PredictAmount/PredictAmountPage';
import TestPage from './Before_SpendTypeTest/TestPage';
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
    element: <ATM></ATM>,
  },
  {
    path: '/dailyReport',
    element: <DailyReport></DailyReport>,
  },
  {
    path: '/newAccount',
    element: <NewAccount></NewAccount>,
  },
  {
    path: '/exTech',
    element: <ExTech></ExTech>,
  },
]);

export default router;
