import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectVault,
  selectVaultError,
  selectVaultStatus,
} from '../../features/vault/vaultSlice';
import PasswordItem from '../password-item';
import './password-list.scss';

const PasswordList = () => {
  const vault = useSelector(selectVault);

  return (
    <ul>
      {vault.map((item, index) => (
        <PasswordItem key={index} Id={item.id} />
      ))}
    </ul>
  );
};

export default PasswordList;
