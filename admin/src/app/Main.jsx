import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Students from './pages/Students.jsx';
import StudentDetail from './pages/StudentDetail.jsx';
import CMS from './pages/CMS.jsx';
import FreeSchools from './pages/FreeSchools.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <main className="container">
        <Switch>
            <Route exact path='/admin' render={(props) => <Home {...props} user={this.props.user}/>}/>
            <Route path='/admin/students' render={(props) => <Students {...props} user={this.props.user}/>}/>
            <Route path='/admin/student/:id' render={(props) => <StudentDetail {...props} user={this.props.user}/>}/>
            <Route path='/admin/cms' component={CMS}/>
            <Route path='/admin/free_schools' component={FreeSchools}/>
        </Switch>
      </main>
    );
  }
}
export default Main;