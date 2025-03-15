import { StyleProvider } from '@ant-design/cssinjs';
import { Worker } from '@react-pdf-viewer/core';
import StyledComponentsRegistry from '@utils/lib/AntdRegistry.tsx';
import 'pdfjs-dist/legacy/build/pdf.worker.entry'; // Load the legacy PDF worker
import React from 'react';
import ReactDOM from 'react-dom/client';
import { pdfjs } from 'react-pdf';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import GlobalLoadData from './GlobalLoadData.tsx';
import './index.css';
import { persistor, store } from './redux/store.ts';
import router from './routes/routes.tsx';

// Set the worker to avoid eval errors
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledComponentsRegistry>
      <StyleProvider hashPriority="high">
        <Worker
          workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}
        >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RouterProvider router={router} />
            </PersistGate>
            <Toaster />
            <GlobalLoadData />
          </Provider>
        </Worker>
      </StyleProvider>
    </StyledComponentsRegistry>
  </React.StrictMode>
);
