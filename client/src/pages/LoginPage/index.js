import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import GoogleLoginButton from '../../components/GoogleLoginButton';
import Fetching from '../../components/Fetching';
import { useAppState } from '../../hooks';
import { localStore } from '../../utils';
import { ROUTES } from '../../constants/routes';
import { LOGIN } from '../../apollo/operations/mutations';

import './styles.css';

const LoginPage = () => {
  const history = useHistory();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setUser } = useAppState();

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted(data) {
      if (data) {
        setIsLoggedIn(true);
        setUser(getUserInfo(data));
        history.push(ROUTES.HOME);
      }
    },
  });

  const onGoogleAuthSuccess = useCallback(async (res) => {
    setIsLoginPopupOpen(false);
    localStore.setToken(res.tokenId);
    login();
    refreshToken(res);
  });

  const onGoogleAuthFailure = useCallback((res) => {
    setIsLoginPopupOpen(false);
  });

  const refreshToken = (res) => {
    const oneHourInSec = 3600;
    let refreshTiming = (res.tokenObj.expires_in || oneHourInSec) * 1000;

    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      if (newAuthRes && newAuthRes.id_token) {
        localStore.setToken(newAuthRes.id_token);
      }
      refreshTiming = (newAuthRes.expires_in || oneHourInSec) * 1000;

      setTimeout(refreshToken, refreshTiming);
    };
    setTimeout(refreshToken, refreshTiming);
  };

  const getUserInfo = ({
    login: { email, name, picture, likedProducts, cartItems },
  }) => {
    return { email, name, picture, likedProducts, cartItems };
  };

  useEffect(() => {
    const token = localStore.getToken();
    if (!isLoggedIn && token) login();
  }, []);

  if (isLoginPopupOpen || loading) return <Fetching />;

  return (
    <div className="page">
      <p id="login-greetings-text">Login please to use our wonderfull app!</p>
      <GoogleLoginButton
        onSuccess={onGoogleAuthSuccess}
        onFailure={onGoogleAuthFailure}
        setIsLoginPopupOpen={setIsLoginPopupOpen}
      />
    </div>
  );
};

export default LoginPage;
