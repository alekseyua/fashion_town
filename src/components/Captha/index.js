import React, { useCallback, useEffect, useState } from 'react';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';

const Captcha = ({ handleValue, name }) => {
  const [token, setToken] = useState('');

  const handleReCaptchaVerify = useCallback(
    (token) => {
      setToken(token);
    },
    [setToken],
  );

  useEffect(() => {
    handleValue(token);
  }, [token]);

  return <GoogleReCaptcha action={name} onVerify={handleReCaptchaVerify} />;
};

export { Captcha };
