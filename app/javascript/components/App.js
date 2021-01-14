import React, { useEffect, useState } from 'react';
import { default as api } from 'axios';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './users/Dashboard';
import Login from './users/Login';
import Register from './users/Register';
import ConfirmEmail from './users/ConfirmEmail';
import ResendEmail from './users/ResendEmail';
import Settings from './users/Settings';

const App = () => {
  const [log, setLog] = useState(
    {
      logStatus: 'NOT_LOGGED_IN',
      user: { data: 'undefined' },
    }
  );

  useEffect(() => {
    checkLogin();
  });

  const checkLogin = () => {
    api
      .get('/api/v1/log_status', { withCredentials: true })
      .then(response => {
        if (response.data.loged_in === 'LOGGED_IN' && log.logStatus === 'NOT_LOGGED_IN') {
          setLog({
            ...log,
            logStatus: 'LOGGED_IN',
            user: response.data.user,
          });
        } else if (log.logStatus === 'NOT_LOGGED_IN' && log.user.data === 'undefined') {
          setLog({
            ...log,
            user: { data: 'none' },
          });
        }
      })
      .catch(error => console.log(error))
    ;
  };


  const handleLogin = () => {
    setLog({
      ...log,
      user: { data: 'undefined' },
    });
  };

  const handleLogout = () => {
    setLog({
      ...log,
      logStatus: 'NOT_LOGGED_IN',
      user: { data: 'undefined' },
    });
  };

  return (
    <Switch>
      <Route exact path={'/'} render={props => (
        <Dashboard
          {...props}
          user={log.user}
          handleLogout={handleLogout}
        />
      )}/>
      <Route exact path='/settings' render={props => (
        <Settings {...props} user={log.user}/>
      )}/>
      <Route exact path='/login' render={props => (
        <Login {...props} handleLogin={handleLogin} />
      )}/>
      <Route exact path='/register' render={props => (
        <Register {...props} />
      )}/>
      <Route exact path='/confirm_email' render={props => (
        <ConfirmEmail {...props} />
      )}/>
      <Route exact path='/resend_email' render={props => (
        <ResendEmail {...props} />
      )}/>
    </Switch>
  );
};

export default App;
