import React from 'react';
import Popup from 'devextreme-react/popup';
import PasswordDetails from '../password-details';
import { resetSingleItem } from '../../features/vault/vaultSlice';
import { useDispatch } from 'react-redux';

const PasswordPopup = ({
  Id,
  visble,
  togglePopup,
  onSubmitHandler,
  formTitle,
  password,
  setPassword,
}) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    togglePopup();
    dispatch(resetSingleItem());
  };

  const renderContent = () => {
    return (
      <PasswordDetails
        Id={Id}
        onSubmitHandler={onSubmitHandler}
        newpassword={password}
        setNewPassword={setPassword}
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
