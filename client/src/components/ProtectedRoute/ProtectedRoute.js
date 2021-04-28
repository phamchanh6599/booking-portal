import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../utils/isAuthenticated';
import { Header } from '../Header/Header';

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated()) {
        return (
          <React.Fragment>
            <Header />
            <Component {...props} />
          </React.Fragment>
        );
      }
      return (
        <Redirect
          to={{
            pathname: '/authentication/signin',
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);
