// Header.tsx
import React from 'react';
import './Header.css';
import { useUser } from '../../context/UserContext';
import { logoutUser } from '../../services/authService';
import { ModalProvider, useModal } from '../../context/popupContext';
import InvestorHeader from './investorHeader';
import AdminHeader from './adminHeader';
import CompanyHeader from './companyHeader';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import Modal from '../popup/modal';
import { RoutePath } from '../../utils/enums';

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser } = useUser();
  const { isModalOpen, openModal } = useModal(); // control on pop up
  const nagivate = useNavigate();

  console.log('Heder rendered');

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
  // check if user is sign in and show spetsific header for aim
  const renderHeaderButtons = () => {
    // when user not login yet
    if (!user) {
      return (
        <>
          <button
            className="header__button header_button--fill"
            onClick={() => openModal('Sign Up As')}
          >
            Sign-Up
          </button>
          <button
            className="header__button header_button--border"
            onClick={() => openModal('Login')}
          >
            Login
          </button>
        </>
      );
    }

    // when user logged in
    switch (user.userType) {
      case 'Investor':
        return <InvestorHeader handleLogout={handleLogout} />;
      case 'Company':
        return <CompanyHeader handleLogout={handleLogout} />;
      case 'Admin':
        return <AdminHeader handleLogout={handleLogout} />;
      default:
        return (
          <FaSignOutAlt size={25} color="#da678a" onClick={handleLogout} />
        );
    }
  };

  // the header will show the spetsific header
  return (
    <>
      <header className="header">
        <div className="header__logo" onClick={() => nagivate(RoutePath.Home)}>
          <img src="path/to/logo.png" alt="Logo" />
        </div>
        <div className="header__buttons">{renderHeaderButtons()}</div>
        {isModalOpen && <Modal />}
      </header>
      {children}
    </>
  );
};

export default Header;
