import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import TuteeRegisterForm from './components/TuteeRegisterForm';
import TutorRegisterForm from './components/TutorRegisterForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import TimePicker from './components/TimePicker';
import AR from './HelloWorldSceneAR';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root' hideNavBar>
        <Scene key='auth'>
          <Scene key='login' component={LoginForm} title='Welcome!' initial />
          <Scene key='tuteeRegister' component={TuteeRegisterForm} title='Register as a Tutee' />
          <Scene key='tutorRegister' component={TutorRegisterForm} title='Register as a Tutor' />
          <Scene key='timePicker' component={TimePicker} title='Time Picker' />
          <Scene key='AR' component={AR} title="AR" />
        </Scene>
        <Scene key='tutee'>
          <Scene
            rightTitle='Add'
            onRight={() => Actions.employeeCreate()}
            key='employeeList'
            component={EmployeeList}
            title='Employees'
            initial
          />
          <Scene
            key='employeeCreate'
            component={EmployeeCreate}
            title='Create Employee'
          />
          <Scene
            key='employeeEdit'
            component={EmployeeEdit}
            title='Edit Employee'
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
