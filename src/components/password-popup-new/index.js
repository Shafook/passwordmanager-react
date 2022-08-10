import React from 'react';
import Popup from 'devextreme-react/popup';
import { resetSingleItem } from '../../features/vault/vaultSlice';
import { useDispatch } from 'react-redux';
import { addPassword } from '../../features/form/formSlice';
import PasswordFormNew from '../password-form-new';

const PasswordPopupNew = ({
  Id,
  visble,
  togglePopup,
  onSubmitHandler,
  formTitle,
  newpassword,
  setPassword,
  isNew,
}) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    togglePopup();
    dispatch(resetSingleItem());
    dispatch(addPassword({}));
  };

  const onShowing = () => {};

  const renderContent = () => {
    return (
      <PasswordFormNew
        newpassword={newpassword}
        onSubmitHandler={onSubmitHandler}
      />
    );
  };

  return (
    <Popup
      contentRender={renderContent}
      visible={visble}
      closeOnOutsideClick={true}
      onHiding={handleToggle}
      onShowing={onShowing}
      showTitle={true}
      title={formTitle}
      width={500}
      height='auto'
      position='center'
      showCloseButton={true}
    />
  );
};

export default PasswordPopupNew;
