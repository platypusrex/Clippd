import * as React from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { CheckToken } from './CheckToken';
import { Register } from './Register';
import { Login } from './Login';
import { Tabs } from './Tabs';

export const Routes: React.SFC<{}> = () => (
  <NativeRouter>
    <Switch>
      <Route exact={true} path="/" component={CheckToken}/>
      <Route exact={true} path="/login" component={Login}/>
      <Route exact={true} path="/register" component={Register}/>
      <Route exact={true} path="/tabs" component={Tabs}/>
    </Switch>
  </NativeRouter>
);
