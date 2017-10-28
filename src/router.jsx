import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import {
  Voting,
  Results
} from './views';

const router = (
  <Router>
    <Switch>
      <Route path="/vote" component={Voting} />
      <Route path="/results" component={Results} />
      <Redirect to="/vote" />
    </Switch>
  </Router>
);

export default router;