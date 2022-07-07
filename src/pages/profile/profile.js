import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataGrid, {
  Column,
  Paging,
  Pager,
  Selection,
  Editing,
  Toolbar,
  Item,
} from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import CustomStore from 'devextreme/data/custom_store';
import { LoadPanel } from 'devextreme-react/load-panel';
import './profile.scss';
import {
  addNewPassword,
  deletePassword,
  fetchPasswordById,
  selectSingleItem,
  selectVault,
  updatePassword,
} from '../../features/vault/vaultSlice';
import PasswordPopup from '../../components/password-popup';
import { setPasswordMode } from '../../features/form/formSlice';
import { Link } from 'react-router-dom';

const allowedPageSizes = [8, 12, 20];

const Profile = () => {
  const [selectedItemKeys, setSelectedItemKeys] = useState([]);
  const [requestStatus, setRequestStatus] = useState('idle');
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [isAddPopupVisible, setAddPopupVisibility] = useState(false);
  const [loadPannelVisible, setLoadPannelVisible] = useState(false);
  const [pass, setPass] = useState({});

  const vault = useSelector(selectVault);
  const passwordItem = useSelector(selectSingleItem);
  const dispatch = useDispatch();

  useEffect(() => {
    setPass(passwordItem);
    dispatch(setPasswordMode('password'));
    if (Object.keys(passwordItem).length !== 0) {
      setLoadPannelVisible(false);
    }
  }, [passwordItem]);

  const handleTitleClick = (Id) => {
    togglePopup();
    dispatch(fetchPasswordById({ Id })).unwrap();
    setLoadPannelVisible(true);
  };

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };

  const toggleAddPopup = () => {
    setAddPopupVisibility(!isAddPopupVisible);
  };

  const customDataSource = new CustomStore({
    key: 'id',
    load: () => {
      return vault;
    },

    insert: (values) => {
      return addPassword(values);
    },

    remove: (key) => {
      return deleteRecordByID(key);
    },

    update: (key, values) => {
      return editPassword({ ...values, id: key });
    },
  });

  const selectionChanged = (data) => {
    setSelectedItemKeys(data.selectedRowKeys);
  };

  const deleteRecordByID = (Id) => {
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
  };

  const deleteRecords = () => {
    selectedItemKeys.forEach((Id) => {
      deleteRecordByID(Id);
    });
  };

  const addPassword = (data) => {
    if (requestStatus === 'idle') {
      try {
        setRequestStatus('pending');
        dispatch(addNewPassword(data)).unwrap();
      } catch (err) {
        alert('Failed to save the company: ' + err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const editPassword = (data) => {
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

  const onEditHandler = (data) => {
    editPassword(data);
    togglePopup();
  };

  const onAddHandler = (data) => {
    addPassword(data);
    toggleAddPopup();
  };

  const renderGridCell = (data) => {
    return (
      <div className='item-title' onClick={() => handleTitleClick(data.key)}>
        {data.text}
      </div>
    );
  };

  const renderCompanyCell = (data) => {
    const {
      company: { id },
    } = vault.find((item) => item.id === data.key);
    return <Link to={`/companies/${id}`}>{data.text}</Link>;
  };

  const addButtonOptions = {
    icon: 'plus',
    onClick: () => {
      toggleAddPopup();
    },
  };

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Vault</h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <DataGrid
            dataSource={customDataSource}
            // keyExpr='id'
            showBorders={true}
            allowColumnResizing={true}
            columnAutoWidth={true}
            selectedRowKeys={selectedItemKeys}
            onSelectionChanged={selectionChanged}
          >
            <Selection mode='multiple' />
            <Editing
              mode='form'
              useIcons={true}
              // allowUpdating={true}
              // allowAdding={true}
              allowDeleting={true}
            />
            <Column dataField='id' caption='Id' />

            <Column
              dataField='title'
              caption='Title'
              cellRender={renderGridCell}
            />
            <Column dataField='username' caption='Name' />

            <Column dataField='password' caption='Password' visible={false} />

            <Column
              dataField='companyName'
              caption='Company'
              cellRender={renderCompanyCell}
            />
            <Toolbar>
              <Item
                location='after'
                locateInMenu='auto'
                widget='dxButton'
                options={addButtonOptions}
                // name='addRowButton'
                showText='always'
              />
              <Item location='after'>
                <Button
                  onClick={deleteRecords}
                  icon='trash'
                  disabled={!selectedItemKeys.length}
                  text='Delete Selected Records'
                />
              </Item>
            </Toolbar>

            <Paging defaultPageSize={12} />
            <Pager
              showPageSizeSelector={true}
              allowedPageSizes={allowedPageSizes}
            />
          </DataGrid>
        </div>
      </div>

      <LoadPanel
        shadingColor='rgba(0,0,0,0.4)'
        position={{ of: '.dx-card' }}
        visible={loadPannelVisible}
        showIndicator={true}
        shading={true}
        showPane={true}
        closeOnOutsideClick={false}
      />
      {!loadPannelVisible && (
        <PasswordPopup
          visble={isPopupVisible}
          togglePopup={togglePopup}
          onSubmitHandler={onEditHandler}
          formTitle={'Edit Password'}
          password={pass}
          setPassword={setPass}
        />
      )}

      <PasswordPopup
        visble={isAddPopupVisible}
        togglePopup={toggleAddPopup}
        onSubmitHandler={onAddHandler}
        formTitle={'Add Password'}
        password={pass}
        setPassword={setPass}
      />
    </React.Fragment>
  );
};

export default Profile;
