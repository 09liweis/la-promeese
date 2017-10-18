import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home.jsx';
import StudentDetail from './components/StudentDetail.jsx';
import CMS from './pages/CMS.jsx';

const Main = () => (
  <main className="container">
    <Switch>
        <Route exact path='/admin' component={Home}/>
        <Route path='/admin/student/:id' component={StudentDetail}/>
        <Route path='/admin/cms' component={CMS}/>
    </Switch>
  </main>
);

export default Main;