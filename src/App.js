import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthProvider from './contexts/auth';
import CustomerProvider from './contexts/customers';
import ChamadosProvider from './contexts/chamados';

function App() {
  return (
    <AuthProvider>
      <CustomerProvider>
        <ChamadosProvider>
          <BrowserRouter>
            <Routes/>
            <ToastContainer autoClose={3000}/>
          </BrowserRouter>
        </ChamadosProvider>
      </CustomerProvider>
    </AuthProvider>
  );
}

export default App;
