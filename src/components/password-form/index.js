import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPassword,
  selectPasswordMode,
  setPasswordMode,
  togglePasswordMode,
} from '../../features/form/formSlice';
import { selectSingleItem } from '../../features/vault/vaultSlice';
import { selectCompanies } from '../../features/company/companySlice';

import TextBox, { Button as TextBoxButton } from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';
import { Validator, RequiredRule } from 'devextreme-react/validator';
import SelectBox from 'devextreme-react/select-box';
import './password-form.scss';
import { selectAccountTypes } from '../../features/account/accountSlice';

const PasswordForm = forwardRef(
  ({ newpassword, onSubmitHandler, isNew }, ref) => {
    const passwordMode = useSelector(selectPasswordMode);
    const companies = useSelector(selectCompanies);
    const accountType = useSelector(selectAccountTypes);
    const singleItem = useSelector(selectSingleItem);
    const dispatch = useDispatch();
    const [password, setPassword] = useState(newpassword);
    const [incomplete, setIncomplete] = useState(false);

    useEffect(() => {
      dispatch(setPasswordMode('password'));
    }, [singleItem]);

    useImperativeHandle(ref, () => ({
      reset() {
        setPassword(null);
      },
    }));

    const submitHandler = (e) => {
      e.preventDefault();

      if (
        !password ||
        password === {} ||
        !password.title ||
        !password.companyID ||
        !password.accountTypeID ||
        !password.username ||
        !password.password ||
        !password.url
      ) {
        console.log('incomplete');
        setIncomplete(true);
        return;
      }

      setIncomplete(false);
      dispatch(addPassword(password));
      onSubmitHandler(password);
      setPassword(null);
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
              defaultValue={password?.title}
              valueChangeEvent='keyup'
              onValueChange={(data) =>
                setPassword((prevState) => ({ ...prevState, title: data }))
              }
              value={password?.title}
              // label='Title'
              labelMode='static'
              stylingMode='outlined'
            >
              {/* <Validator>
                  <RequiredRule message='Title is required' />
                </Validator> */}
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
              defaultValue={password?.companyID}
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
              defaultValue={password?.accountTypeID}
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
              defaultValue={password?.username}
              valueChangeEvent='keyup'
              onValueChange={(data) =>
                setPassword((prevState) => ({ ...prevState, username: data }))
              }
              value={password?.username}
              // label='Username'
              labelMode='static'
              stylingMode='outlined'
            >
              {/* <Validator>
                  <RequiredRule message='Username is required' />
                </Validator> */}
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
              defaultValue={password?.password}
              valueChangeEvent='keyup'
              onValueChange={(data) =>
                setPassword((prevState) => ({ ...prevState, password: data }))
              }
              value={password?.password}
              // label='Password'
              labelMode='static'
              stylingMode='outlined'
            >
              <TextBoxButton
                name='password'
                location='after'
                options={passwordButton}
              />
              {/* <Validator>
                  <RequiredRule message='Password is required' />
                </Validator> */}
            </TextBox>
          </div>
        </div>
        <div className='dx-field'>
          <div className='dx-field-label'>URL</div>
          <div className='dx-field-value url-field'>
            <TextBox
              placeholder='ex. https://youtube.com'
              showClearButton={true}
              defaultValue={password?.url}
              valueChangeEvent='keyup'
              onValueChange={(data) =>
                setPassword((prevState) => ({ ...prevState, url: data }))
              }
              value={password?.url}
              // label='URL'
              labelMode='static'
              stylingMode='outlined'
            >
              <TextBoxButton name='url' location='after' options={urlButton} />
            </TextBox>
          </div>
        </div>
        <div className='dx-field'>
          {incomplete && <div className='incomplete'>Field cannot be empty</div>}
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
  }
);

export default PasswordForm;
