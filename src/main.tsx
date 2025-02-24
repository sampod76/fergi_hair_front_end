import { StyleProvider } from '@ant-design/cssinjs';

import StyledComponentsRegistry from '@utils/lib/AntdRegistry.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import GlobalLoadData from './GlobalLoadData.tsx';
import './index.css';
import { persistor, store } from './redux/store.ts';
import router from './routes/routes.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledComponentsRegistry>
      <StyleProvider hashPriority="high">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
          <Toaster />
          <GlobalLoadData />
        </Provider>
      </StyleProvider>
    </StyledComponentsRegistry>
  </React.StrictMode>
);
