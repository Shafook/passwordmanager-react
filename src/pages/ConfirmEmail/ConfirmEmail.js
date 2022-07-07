import { Button } from 'devextreme-react';
import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { verifyEmail } from '../../api/auth';
import './ConfirmEmail.scss';

const ConfirmEmail = () => {
  const { search } = useLocation();
  const [isVerified, setIsVerified] = useState(false);
  const history = useHistory();

  const searchParams = new URLSearchParams(search);
  const token = searchParams.get('token');
  const userid = searchParams.get('userid');

  useEffect(() => {
    (async function () {
      const result = await verifyEmail(userid, token);

      setIsVerified(result.isOk);
    })();
  }, []);

  return (
    <>
      <h2 className={'content-block'}>ConfirmEmail</h2>
      {isVerified ? 'Email verified' : 'Email unverified'}
      <Button text='Go Home' onClick={() => history.push('/')} />
    </>
  );
};

export default ConfirmEmail;
