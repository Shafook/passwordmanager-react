import React, { useRef } from 'react';
import Popup from 'devextreme-react/popup';
import { resetSingleItem } from '../../features/vault/vaultSlice';
import { useDispatch } from 'react-redux';
import PasswordForm from '../password-form';
import { addPassword } from '../../features/form/formSlice';

const PasswordPopup = ({
  visble,
  togglePopup,
  onSubmitHandler,
  formTitle,
  newpassword,
  isNew,
}) => {
  const dispatch = useDispatch();

  const passRef = useRef(null);

  const handleToggle = () => {
    togglePopup();
    dispatch(resetSingleItem());
    dispatch(addPassword({}));
    passRef.current.reset();
  };

  const renderContent = () => {
    return (
      <PasswordForm
        ref={passRef}
        newpassword={newpassword}
        onSubmitHandler={onSubmitHandler}
        isNew={isNew}
      />
    );
  };

  return (
    <Popup
      contentRender={renderContent}
      visible={visble}
      closeOnOutsideClick={true}
      onHiding={handleToggle}
      showTitle={true}
      title={formTitle}
      width={500}
      height='auto'
      position='center'
      showCloseButton={true}
    />
  );
};

export default PasswordPopup;
