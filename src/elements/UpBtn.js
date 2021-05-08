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
              'transparent linear-gradient(124deg, #7f58ec 0%, #5c5ce3 100%) 0% 0% no-repeat padding-box',
            border: 'none',
          }}
        />
      </BtnWrap>
    </>
  );
}

const BtnWrap = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media only screen and (max-width: 414px) {
    display: none;
  }
`;

export default UpBtn;
