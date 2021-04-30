import React from 'react';
import { useSelector } from 'react-redux';
import { getCookie } from './Cookie';

function Permit(props) {
  const is_login = useSelector((state) => state.user.is_login);
  const cookie = getCookie('accessToken');
  const is_user = cookie ? true : false;
  if (is_login && is_user) {
    return <>{props.children}</>;
  }
  return null;
}

export default Permit;
