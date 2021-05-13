import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

function UpBtn() {
  const upBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  return (
    <>
      <BtnWrap>
        <Button
          onClick={upBtn}
          type='primary'
          shape='circle'
          icon={<ArrowUpOutlined />}
          size='large'
          style={{
            background:
              'linear-gradient(rgb(180, 139, 255) 0%, rgb(180, 139, 255) 50%, rgb(207, 139, 255) 100%)',
            border: 'none',
            width: '100%',
            height: '100%',
          }}
        />
      </BtnWrap>
    </>
  );
}

const BtnWrap = styled.div`
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 100px;
  right: 30px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

export default UpBtn;
