import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const CheckUser = (user) => {
  const history = useHistory();

  useEffect(() => {
    if (!user.length) {
      history.push('/signIn');
    }
  }, [user, history]);

  return <div></div>;
};

export default CheckUser;
