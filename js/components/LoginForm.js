import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser, loginOwnBackend } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginPress() {
    // const { email, password } = this.props;

    // this.props.loginUser({ email, password })
    Actions.AR()
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button onPress={this.onLoginPress.bind(this)}>
        Login
      </Button>
    );
  }

  renderError() {
     if (this.props.error) {
       return (
         <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
         </View>
       );
     }
   }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="me@email.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label='Password'
            placeholder='password'
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <CardSection>
          <Button onPress={() => Actions.tuteeRegister()}>
            Register as a Tutee
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => Actions.tutorRegister()}>
            Register as a Tutor
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => Actions.timePicker()}>
            Time Picker
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };

};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, loginOwnBackend })(LoginForm);
