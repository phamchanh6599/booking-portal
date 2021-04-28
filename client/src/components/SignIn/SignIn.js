import './SignIn.scss';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import Logo from '../../assets/images/logo.png';
import { login } from '../../api/authenApi';
import { isAuthenticated } from '../../utils/isAuthenticated';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const SignInForm = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated()) history.push('/');
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const res = await login('api/auth/login', user);
      const { accessToken } = res;
      if (accessToken) localStorage.setItem('token', accessToken);
      history.replace('/');
    } catch (err) {
      console.log('ERR', err);
    }
  };

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{ remember: true }}
      className='SignIn__form'
      onSubmit={submitForm}
    >
      <Form.Item
        label='Username'
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input
          name='username'
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password
          name='password'
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' onClick={submitForm}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const SignIn = () => (
  <div className='SignIn'>
    <div className='SignIn__card'>
      <div className='SignIn__logo'>
        <img src={Logo} alt='Logo' />
      </div>
      <SignInForm />
    </div>
  </div>
);
