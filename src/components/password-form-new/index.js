import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPasswordMode,
  setPasswordMode,
  togglePasswordMode,
} from '../../features/form/formSlice';
import { selectCompanies } from '../../features/company/companySlice';

import TextBox, { Button as TextBoxButton } from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';
import { Validator, RequiredRule } from 'devextreme-react/validator';
import SelectBox from 'devextreme-react/select-box';
import './password-form-new.scss';
import { selectAccountTypes } from '../../features/account/accountSlice';

const PasswordFormNew = ({ onSubmitHandler }) => {
  const passwordMode = useSelector(selectPasswordMode);
  const companies = useSelector(selectCompanies);
  const accountType = useSelector(selectAccountTypes);
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPasswordMode('password'));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('asdasd');
    // onSubmitHandler(password);
  };

  const urlButton = {
    icon: 'fas fa-eye-dropper',
    // icon: 'images/icons/eye.png',
    type: 'default',
    onClick: () => {
      window.open(`https://${password?.url}`);
    },
    disabled: !password || password === {} || !password.url ? true : false,
  };

  const passwordButton = {
    icon: 'fas fa-eye',
    // icon: 'images/icons/eye.png',
    type: 'default',
    onClick: () => {
      dispatch(togglePasswordMode());
    },
  };

  return (
    <form onSubmit={submitHandler} className='password-form'>
      <div className='dx-field'>
        <div className='dx-field-label'>Title</div>
        <div className='dx-field-value'>
          <TextBox
            placeholder='Enter title'
            showClearButton={true}
            // defaultValue={password?.title}
            valueChangeEvent='keyup'
            onValueChange={(data) =>
              setPassword((prevState) => ({ ...prevState, title: data }))
            }
            value={password?.title}
            labelMode='static'
            stylingMode='outlined'
          >
            <Validator>
              <RequiredRule message='Title is required' />
            </Validator>
          </TextBox>
        </div>
      </div>
      <div className='dx-field'>
        <div className='dx-field-label'>Company</div>
        <div className='dx-field-value'>
          <SelectBox
            dataSource={companies}
            displayExpr='name'
            valueExpr='id'
            value={password?.companyID}
            // defaultValue={singleItem?.companyID}
            onValueChanged={(data) =>
              setPassword((prevState) => ({
                ...prevState,
                companyID: data.value,
              }))
            }
            searchEnabled={true}
            searchMode='contains'
            searchExpr='name'
            searchTimeout={200}
            minSearchLength={0}
            showDataBeforeSearch={false}
          />
        </div>
      </div>
      <div className='dx-field'>
        <div className='dx-field-label'>Account Type</div>
        <div className='dx-field-value'>
          <SelectBox
            dataSource={accountType}
            displayExpr='name'
            valueExpr='id'
            value={password?.accountTypeID}
            // defaultValue={singleItem?.accountTypeID}
            onValueChanged={(data) =>
              setPassword((prevState) => ({
                ...prevState,
                accountTypeID: data.value,
              }))
            }
            searchEnabled={true}
            searchMode='contains'
            searchExpr='name'
            searchTimeout={200}
            minSearchLength={0}
            showDataBeforeSearch={false}
          />
        </div>
      </div>
      <div className='dx-field'>
        <div className='dx-field-label'>Username</div>
        <div className='dx-field-value'>
          <TextBox
            placeholder='Enter username'
            showClearButton={true}
            // defaultValue={singleItem?.username}
            valueChangeEvent='keyup'
            onValueChange={(data) =>
              setPassword((prevState) => ({ ...prevState, username: data }))
            }
            value={password?.username}
            labelMode='static'
            stylingMode='outlined'
          >
            <Validator>
              <RequiredRule message='Username is required' />
            </Validator>
          </TextBox>
        </div>
      </div>
      <div className='dx-field'>
        <div className='dx-field-label'>Password</div>
        <div className={'dx-field-value password-field'}>
          <TextBox
            mode={passwordMode}
            placeholder='Enter password'
            showClearButton={true}
            // defaultValue={singleItem?.password}
            valueChangeEvent='keyup'
            onValueChange={(data) =>
              setPassword((prevState) => ({ ...prevState, password: data }))
            }
            value={password?.password}
            labelMode='static'
            stylingMode='outlined'
          >
            <TextBoxButton
              name='password'
              location='after'
              options={passwordButton}
            />
            <Validator>
              <RequiredRule message='Password is required' />
            </Validator>
          </TextBox>
        </div>
      </div>
      <div className='dx-field'>
        <div className='dx-field-label'>URL</div>
        <div className='dx-field-value url-field'>
          <TextBox
            placeholder='ex. https://youtube.com'
            showClearButton={true}
            // defaultValue={singleItem?.url}
            valueChangeEvent='keyup'
            onValueChange={(data) =>
              setPassword((prevState) => ({ ...prevState, url: data }))
            }
            value={password?.url}
            labelMode='static'
            stylingMode='outlined'
          >
            <TextBoxButton name='url' location='after' options={urlButton} />
          </TextBox>
        </div>
      </div>
      <Button
        width='100%'
        text='Submit'
        type='success'
        stylingMode='contained'
        useSubmitBehavior={true}
      />
    </form>
  );
};

export default PasswordFormNew;
