import { RouterProvider } from 'react-router-dom';
import router from './Router';
import './App.css';
import GlobalStyle from './styles/GlobalStyle';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
  );
}

export default App;
