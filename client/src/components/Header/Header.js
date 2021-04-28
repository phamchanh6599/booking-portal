import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { useSelector } from 'react-redux';

import { getBooking } from '../../api/bookingApi';
import { Profile } from '../Profile/Profile';
import './Header.scss';

export const Header = () => {
  const history = useHistory();
  const userAuth = useSelector((state) => state);

  const logOut = useCallback(() => {
    localStorage.removeItem('token');
    history.push('/authentication/signin');
  }, []);

  const menu = (
    <Menu>
      <Menu.Item>
        <span>{userAuth.username}</span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={logOut}>Log Out</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='Header'>
      <div className='Header__profile'>
        <Dropdown
          overlay={menu}
          placement='bottomLeft'
          arrow
          trigger={['click']}
        >
          <div>
            <Profile />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
