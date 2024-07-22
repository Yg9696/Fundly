// src/App.tsx
import React from 'react';
import './assets/styles/colors.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoutePath } from './utils/enums';
import Header from './components/header/Header';
import { AppStatusProvider } from './context/AppStatusContext';
import { UserProvider } from './context/UserContext';
import { ModalProvider } from './context/popupContext';
import Home from './pages/home/Home';
import SearchInvestments from './pages/home/investor-home/SearchInvest';

interface ProvidersProps {
  children: React.ReactNode;
}


export const CommonProviders: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <UserProvider>
      <AppStatusProvider>
        <ModalProvider>{children}</ModalProvider>
      </AppStatusProvider>
    </UserProvider>
  );
};

// Routes her
const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutePath.Home} element={<Home />} />
      <Route path={RoutePath.SearchInvests} element={<SearchInvestments />} />
    </Routes>
  );
};

// HER THE APP START
const App: React.FC = () => {
  return (
    <CommonProviders>
      <Router>
        <Header>
          <AppContent />
        </Header>
      </Router>
    </CommonProviders>
  );
};

export default App;
