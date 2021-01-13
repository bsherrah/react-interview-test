import React from 'react';
import { Link } from 'react-router-dom';

import { useAppState } from '../../hooks';

import './styles.css';

const HomePage = () => {
  const { user } = useAppState();

  return (
    <div className="page">
      <img className="circle-picture" src={user.picture} />
      <h1>{`Welcome to Bonsai home ${user.name}!!`}</h1>
    </div>
  );
};

export default HomePage;
