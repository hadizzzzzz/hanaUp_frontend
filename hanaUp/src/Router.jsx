import { createBrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home/Home';
import PredictAmount from './Before_PredictAmount/PredictAmount';
import SpendTypeTest from './Before_SpendingTest/SpendTypeTest';
import DailyReport from './Previous_DailyReport/DailyReport';
import NewAccount from './After_Account/NewAccount';
import ATM from './Previous_ATM/ATM';
import ExTech from './After_ExTech/ExTech';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/predictAmount',
    element: <PredictAmount></PredictAmount>,
  },
  {
    path: '/spendTypeTest',
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
