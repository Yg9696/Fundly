import React, { useState } from 'react';
import './Modal.css';
import { getTitle, renderForm, renderSignUpAsButtons } from './modalHelper';
import { useModal } from '../../../context/popupContext';
interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const [step, setStep] = useState(1);
  const { closeModal, modalType, userType, setUserType } = useModal();

  return (
    <div className="modalBackground">
      <h1 className="modalTitle">{getTitle(modalType, userType, step)}</h1>
      {step === 1 &&
        modalType === 'Sign Up As' &&
        renderSignUpAsButtons(userType, setUserType)}
      <div className="modalContainer">
        <div className="titleCloseBtn">
          {step === 1 && <button onClick={closeModal}>X</button>}
        </div>
        <div className="body">
          <>
            {renderForm({ modalType, userType, step, setStep })}
            {children}
          </>
        </div>
      </div>
    </div>
  );
};

export default Modal;
