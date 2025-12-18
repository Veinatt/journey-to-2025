import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Main SCSS styles
import './styles/main.scss';

const rootElement = document.getElementById('root')!;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);