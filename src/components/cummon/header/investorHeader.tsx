import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../context/popupContext';
import Modal from '../popup/modal';
import Profile from '../../investor/profile/profile';

const InvestorHeader: React.FC<{ handleLogout: () => void }> = ({
  handleLogout,
}) => {
  const { modalType, setModalType } = useModal();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('myInvestments');
  };

  return (
    <>
      <button
        className={'header__button header_button--fill'}
        onClick={() => handleClick()}
      >
        My Investments
      </button>
      <button
        className={'header__button header_button--border'}
        onClick={() => {
          setModalType('Profile');
        }}
      >
        My Profile
      </button>

      {modalType === 'Profile' && (
        <Modal>
          <Profile />
        </Modal>
      )}

      <FaBell
        size={25}
        color="#da678a"
        onClick={() => setModalType('Notifications')}
      />
      {modalType === 'Notifications' && (
        <Modal>
          <h1>Notifications</h1>
        </Modal>
      )}

      <FaSignOutAlt size={25} color="#da678a" onClick={handleLogout} />
    </>
  );
};

export default InvestorHeader;
