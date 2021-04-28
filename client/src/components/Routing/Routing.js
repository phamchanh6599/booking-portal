import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { SignIn } from '../SignIn/SignIn';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { Home } from '../Home/Home';
import { BookingForm } from '../BookingForm/BookingForm';

export const Routing = () => (
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path='/' component={Home} />
        <ProtectedRoute exact path='/booking/form' component={BookingForm} />
        <Route exact path='/authentication/signin' component={SignIn} />
        <Route path='*' component={() => '404 NOT FOUND'} />
      </Switch>
    </BrowserRouter>
  </React.Fragment>
);
