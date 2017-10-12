import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home.jsx';
import StudentForm from './components/StudentForm.jsx';
import StudentDetail from './components/StudentDetail.jsx';

const Main = () => (
  <main className="container">
    <Switch>
        <Route exact path='/admin' component={Home}/>
        <Route path='/admin/student/add' component={StudentForm} />
        <Route path='/admin/student/:id' component={StudentDetail}/>
        <Route path='/admin/student/:id/edit' component={StudentForm} />
    </Switch>
  </main>
);

export default Main;