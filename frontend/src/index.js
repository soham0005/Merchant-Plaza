import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ConfigProvider} from 'antd';
import store from './redux/store';
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
      <ConfigProvider theme={{
      components: {
        Button : {
          colorPrimary: '#5D3FD3',
          colorPrimaryHover : '#7F00FF',
          borderRadius:'0px',
        }
      }
    }}>
      <App />
      </ConfigProvider>
    </Provider>
 
);

