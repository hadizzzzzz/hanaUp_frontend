import { createBrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home/Home';
import PredictAmount from './Before_PredictAmount/PredictAmount';
import SpendTypeTest from './Before_SpendingTest/SpendTypeTest';
import DailyReport from './During_DailyReport/DailyReport';
import NewAccount from './After_Account/NewAccount';
import ATM from './During_ATM/ATM';
import ExTech from './After_ExTech/ExTech';
import PredictService from './Before_Common/PredictService';
import Before_InputPage from './Before_Common/InputPage';

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
    path: '/predictService/predictAmountResult',
    element: <PredictAmount></PredictAmount>,
  },
  {
    path: '/predictService/spendTypeTestResult',
    element: <SpendTypeTest></SpendTypeTest>,
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
