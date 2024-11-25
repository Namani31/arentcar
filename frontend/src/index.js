import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React 18에서는 createRoot 사용
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<<<<<<< HEAD
  <React.StrictMode>
=======
  // <React.StrictMode>
>>>>>>> 951208bf89423d692882ff5d76df2ef9039ac76e
    <Provider store={store}> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
<<<<<<< HEAD
  </React.StrictMode>
=======
  // </React.StrictMode>
>>>>>>> 951208bf89423d692882ff5d76df2ef9039ac76e
);

// 성능 측정을 위한 함수 (옵션)
reportWebVitals();
