import React from 'react';
import './Profile.scss';

import IconProfile from '../../assets/images/profile.jpeg';

export const Profile = () => (
  <div className='Profile'>
    <img className='Profile__avatar' src={IconProfile} alt='Avatar' />
  </div>
);
