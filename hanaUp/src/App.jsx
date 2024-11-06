import { RouterProvider } from 'react-router-dom';
import router from './Router';
import './App.css';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
