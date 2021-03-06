import React, { Component } from 'react'
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native'
// import { Font } from 'expo'
import { Input, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, registerUser, userTypeChanged } from '../actions';
// import FormInput from './FormInput';
// import UserTypeItem from './UserTypeItem';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const USER_COOL = require('../res/user-cool.png')
const USER_STUDENT = require('../res/user-student.png')

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      selectedType: null,
      fontLoaded: false,
      username: '',
      // email: '',
      // password: '',
      confirmationPassword: '',
      emailValid: true,
      passwordValid: true,
      usernameValid: true,
      confirmationPasswordValid: true,
    }

    this.setSelectedType = this.setSelectedType.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.validateConfirmationPassword = this.validateConfirmationPassword.bind(this)
    this.signup = this.signup.bind(this)
  }

  async componentDidMount() {
    // await Font.loadAsync({
    //   light: require('../res/fonts/Ubuntu-Light.ttf'),
    //   bold: require('../res/fonts/Ubuntu-Bold.ttf'),
    //   lightitalic: require('../res/fonts/Ubuntu-Light-Italic.ttf'),
    // })

    this.setState({ fontLoaded: true })
  }

  signup() {
    console.log("press");
    LayoutAnimation.easeInEaseOut()
    const usernameValid = this.validateUsername()
    const emailValid = this.validateEmail()
    const passwordValid = this.validatePassword()
    const confirmationPasswordValid = this.validateConfirmationPassword()
    if (
      emailValid &&
      passwordValid &&
      confirmationPasswordValid &&
      usernameValid
    ) {
      const { email, password, selectedType } = this.props;
      const { username } = this.state;
      console.log({selectedType});
      this.setState({ isLoading: true })
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut()
        this.setState({ isLoading: false })
        this.props.registerUser({ email, password, selectedType, username });
      }, 1500)
    }
  }

  validateUsername() {
    const { username } = this.state
    const usernameValid = username.length > 0
    LayoutAnimation.easeInEaseOut()
    this.setState({ usernameValid })
    usernameValid || this.usernameInput.shake()
    return usernameValid
  }

  validateEmail() {
    const { email } = this.props;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const emailValid = re.test(email)
    LayoutAnimation.easeInEaseOut()
    this.setState({ emailValid })
    emailValid || this.emailInput.shake()
    return emailValid
  }

  validatePassword() {
    const { password } = this.props;
    const passwordValid = password.length >= 6
    LayoutAnimation.easeInEaseOut()
    this.setState({ passwordValid })
    passwordValid || this.passwordInput.shake()
    return passwordValid
  }

  validateConfirmationPassword() {
    const { confirmationPassword } = this.state
    const { password } = this.props;
    const confirmationPasswordValid = password === confirmationPassword
    LayoutAnimation.easeInEaseOut()
    this.setState({ confirmationPasswordValid })
    confirmationPasswordValid || this.confirmationPasswordInput.shake()
    return confirmationPasswordValid
  }

  setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType })

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onBuyerPress() {
    this.setSelectedType('buyer');
    this.props.userTypeChanged('buyer');
  }

  onSellerPress() {
    this.setSelectedType('seller')
    this.props.userTypeChanged('seller');
  }

  render() {
    const {
      isLoading,
      selectedType,
      fontLoaded,
      confirmationPassword,
      emailValid,
      passwordValid,
      confirmationPasswordValid,
      username,
      usernameValid,
    } = this.state

    return !fontLoaded
      ? <Text> Loading... </Text>
			: <ScrollView
			scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          <KeyboardAvoidingView
            behavior="position"
            contentContainerStyle={styles.formContainer}
          >
            <Text style={styles.signUpText}>Sign up</Text>
            <View style={styles.userTypesContainer}>
              <UserTypeItem
                label="Buyer"
                labelColor="#ECC841"
                image={USER_COOL}
                onPress={this.onBuyerPress.bind(this)}
                selected={selectedType === 'buyer'}
              />
              <UserTypeItem
                label="Seller"
                labelColor="#2CA75E"
                image={USER_STUDENT}
                onPress={this.onSellerPress.bind(this)}
                selected={selectedType === 'seller'}
              />
              {/* <UserTypeItem
                label="HARRY POTTER"
                labelColor="#36717F"
                image={USER_HP}
                onPress={() => this.setSelectedType('teacher')}
                selected={selectedType === 'teacher'}
              /> */}
            </View>
            <View>
              <FormInput
                refInput={input => (this.usernameInput = input)}
                icon="user"
                value={username}
                onChangeText={username => this.setState({ username })}
                placeholder="Username"
                returnKeyType="next"
                displayError={!usernameValid}
                errorMessage="Your username can't be blank"
                onSubmitEditing={() => {
                  this.validateUsername()
                  this.emailInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.emailInput = input)}
                icon="envelope"
                value={this.props.email}
                onChangeText={this.onEmailChange.bind(this)}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                displayError={!emailValid}
                errorMessage="Please enter a valid email address"
                onSubmitEditing={() => {
                  this.validateEmail()
                  this.passwordInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.passwordInput = input)}
                icon="lock"
                value={this.props.password}
                onChangeText={this.onPasswordChange.bind(this)}
                placeholder="Password"
                secureTextEntry
                returnKeyType="next"
                displayError={!passwordValid}
                errorMessage="Please enter at least 6 characters"
                onSubmitEditing={() => {
                  this.validatePassword()
                  this.confirmationPasswordInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.confirmationPasswordInput = input)}
                icon="lock"
                value={confirmationPassword}
                onChangeText={confirmationPassword =>
                  this.setState({ confirmationPassword })}
                placeholder="Confirm Password"
                secureTextEntry
                displayError={!confirmationPasswordValid}
                errorMessage="The password fields are not identics"
                returnKeyType="go"
                onSubmitEditing={() => {
                  this.validateConfirmationPassword()
                  this.signup()
                }}
              />
            </View>
            <Button
              loading={isLoading}
              text="SIGN UP"
              containerStyle={{ flex: -1 }}
              buttonStyle={styles.signUpButton}
              // ViewComponent={require('expo').LinearGradient}
              // linearGradientProps={{
              //   colors: ['#FF9800', '#F44336'],
              //   start: [1, 0],
              //   end: [0.2, 0],
              // }}
              textStyle={styles.signUpButtonText}
              onPress={this.signup}
              disabled={isLoading}
            />
          </KeyboardAvoidingView>
          <View style={styles.loginHereContainer}>
            <Text style={styles.alreadyAccountText}>
              Already have an account?
            </Text>
            <Button
              text="Login here"
              textStyle={styles.loginHereText}
              containerStyle={{ flex: -1 }}
              buttonStyle={{ backgroundColor: 'transparent' }}
              underlayColor="transparent"
              onPress={() => Actions.login()}
            />
          </View>
        </ScrollView>
  }
}

export const UserTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props
  return (
    <TouchableOpacity {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ]}
      >
        <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
        <Image
          source={image}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ]}
        />
      </View>
    </TouchableOpacity>
  )
}

export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props
  return (
    <Input
      {...otherProps}
      ref={refInput}
      containerStyle={styles.inputContainer}
      icon={<Icon name={icon} color="#7384B4" size={18} />}
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="#7384B4"
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 28,
    // fontFamily: 'light',
  },
  whoAreYouText: {
    color: '#7384B4',
    // fontFamily: 'bold',
    fontSize: 14,
  },
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  userTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70,
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100,
  },
  userTypeLabel: {
    color: 'yellow',
    // fontFamily: 'bold',
    fontSize: 11,
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    // fontFamily: 'light',
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  signUpButtonText: {
    // fontFamily: 'bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    width: 250,
    borderRadius: 50,
    height: 45,
    backgroundColor: 'rgba(111, 202, 186, 1)',
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    // fontFamily: 'lightitalic',
    fontSize: 12,
    color: 'white',
  },
  loginHereText: {
    color: '#FF9800',
    // fontFamily: 'lightitalic',
    fontSize: 12,
  },
})

const mapStateToProps = state => {
  const { email, password, selectedType } = state.auth;

  return { email, password, selectedType };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, registerUser, userTypeChanged
})(RegisterForm);
