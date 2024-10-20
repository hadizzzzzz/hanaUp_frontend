import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import GlobalStyle from './styles/GlobalStyle.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <GlobalStyle />
    <App />
  </>,
);
