import React from 'react';
import { useSelector } from 'react-redux';
import { getCookie } from './Cookie';

function Permit(props) {
  // 로그인한 유저만 볼 수 있게 조건부 랜더링
  // 토큰 존재 유무 및 로그인 유무가 모두 true일때만 랜더링
  const is_login = useSelector((state) => state.user.is_login);
  const cookie = getCookie('is_login');
  const is_user = cookie ? true : false;
  if (is_login && is_user) {
    return <>{props.children}</>;
  }
  return null;
}

export default Permit;
