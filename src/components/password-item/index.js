import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './password-item.scss';
import PasswordForm from '../password-form';
import {
  deletePassword,
  fetchPasswordById,
  selectPassById,
  selectSingleItem,
  updatePassword,
} from '../../features/vault/vaultSlice';
import Popup from 'devextreme-react/popup';
import Button from 'devextreme-react/button';
import { LoadPanel } from 'devextreme-react/load-panel';
import {
  addPassword,
  selectPassword,
  setPasswordMode,
} from '../../features/form/formSlice';

const PasswordItem = ({ Id }) => {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [isDeletePopupVisible, setDeletePopupVisibility] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');
  const [loadPannelVisible, setLoadPannelVisible] = useState(false);

  const { title } = useSelector((state) => selectPassById(state, Id));
  const passwordItem = useSelector(selectSingleItem);
  const pass = useSelector(selectPassword);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(pass).length !== 0) {
      setLoadPannelVisible(false);
    }
  }, [pass]);

  useEffect(() => {
    dispatch(setPasswordMode('password'));
    dispatch(addPassword(passwordItem));
  }, [passwordItem]);

  const editPassword = (data) => {
    hidePopup();
    if (requestStatus === 'idle') {
      try {
        setRequestStatus('pending');
        dispatch(updatePassword(data)).unwrap();
      } catch (err) {
        alert('Failed to save the password: ' + err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const togglePopup = () => {
    setPopupVisibility(true);
    setLoadPannelVisible(true);
    dispatch(fetchPasswordById({ Id })).unwrap();
  };

  const hidePopup = () => {
    setPopupVisibility(false);
  };

  const toggleDelete = () => {
    setDeletePopupVisibility(!isDeletePopupVisible);
  };

  const handleDelete = () => {
    if (requestStatus === 'idle') {
      try {
        setRequestStatus('pending');
        dispatch(deletePassword({ Id })).unwrap();
      } catch (err) {
        alert('Failed to delete the password: ' + err);
      } finally {
        setRequestStatus('idle');
      }
    }

    toggleDelete();
  };

  const renderDelete = () => {
    return (
      <div className='delete-buttons'>
        <Button
          text='Cancel'
          type='success'
          stylingMode='contained'
          onClick={toggleDelete}
        />
        <Button
          text='Delete'
          type='danger'
          stylingMode='contained'
          onClick={handleDelete}
        />
      </div>
    );
  };

  return (
    <>
      <li className='pass-item'>
        <div className='pass-item__title' onClick={togglePopup}>
          {title}
        </div>
        <div className='pass-item__edits'>
          <span onClick={toggleDelete}>delete</span>
        </div>
      </li>
      {/* <LoadPanel
        shadingColor='rgba(0,0,0,0.4)'
        position={{ of: '.dx-card' }}
        visible={loadPannelVisible}
        showIndicator={true}
        shading={true}
        showPane={true}
        closeOnOutsideClick={false}
      />
      {!loadPannelVisible && (
        <PasswordForm
          Id={Id}
          visble={isPopupVisible}
          togglePopup={hidePopup}
          onSubmitHandler={editPassword}
          formTitle={`Edit Password`}
        />
      )} */}
      <Popup
        contentRender={renderDelete}
        visible={isDeletePopupVisible}
        closeOnOutsideClick={true}
        onHiding={toggleDelete}
        showTitle={true}
        title='Delete'
        width={500}
        height='auto'
        position='center'
        showCloseButton={true}
      />
    </>
  );
};

export default PasswordItem;
