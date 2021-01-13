import React from 'react';
import { useGoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ onSuccess, onFailure, setIsLoginPopupOpen }) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    accessType: 'offline',
  });

  const onClickButton = () => {
    setIsLoginPopupOpen(true);
    signIn();
  };

  return (
    <button type="button" onClick={onClickButton}>
      Google Login
    </button>
  );
};

export default GoogleLoginButton;
