import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home.jsx';
import Form from './components/Form.jsx';

const Main = () => (
  <main className="container">
    <Switch>
        <Route exact path='/admin' component={Home}/>
        <Route path='/admin/student/add' component={Form} />
    </Switch>
  </main>
);

export default Main;