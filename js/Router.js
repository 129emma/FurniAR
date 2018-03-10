import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import ARSceneWrapper from './ARSceneWrapper';
import Contact from './components/Contact';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          {/* <Scene key="AR" component={ARSceneWrapper} title="AR Scene" /> */}
          <Scene key="contact" component={Contact} hideNavBar />
          <Scene key="register" component={RegisterForm} hideNavBar />
          <Scene key="login" component={LoginForm} title="Please Login" />
        </Scene>

        <Scene key="main">
          <Scene key="AR" component={ARSceneWrapper} title="AR Scene" />
          <Scene key="contact" component={Contact} hideNavBar />
          <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
