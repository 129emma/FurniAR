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
import { emailChanged, passwordChanged, loginUser } from '../actions';


// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const USER_COOL = require('../res/user-cool.png')
const USER_STUDENT = require('../res/user-student.png')
const USER_HP = require('../res/user-hp.png')

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
    //   selectedType: null,
      fontLoaded: false,
      username: '',
      // email: '',
      // password: '',
      emailValid: true,
      passwordValid: true,
      usernameValid: true,
    }

    this.setSelectedType = this.setSelectedType.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.signin = this.signin.bind(this)
  }

  async componentDidMount() {
    // await Font.loadAsync({
    //   light: require('../res/fonts/Ubuntu-Light.ttf'),
    //   bold: require('../res/fonts/Ubuntu-Bold.ttf'),
    //   lightitalic: require('../res/fonts/Ubuntu-Light-Italic.ttf'),
    // })

    this.setState({ fontLoaded: true })
  }

  signin() {
    console.log("press");
    LayoutAnimation.easeInEaseOut()
    const emailValid = this.validateEmail()
    const passwordValid = this.validatePassword()
    if (
      emailValid &&
      passwordValid 
    ) {
      const { email, password, selectedType } = this.props;
      this.setState({ isLoading: true })
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut()
        this.setState({ isLoading: false })
        this.props.loginUser({ email, password, selectedType });
      }, 1500)
    }
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

  setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType })

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  render() {
    const {
      isLoading,
      selectedType,
      fontLoaded,
      emailValid,
      passwordValid,
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
            <Text style={styles.signUpText}>Sign in</Text>
            <View style={styles.userTypesContainer}>
              <UserTypeItem
                label="Buyer"
                labelColor="#ECC841"
                image={USER_COOL}
                onPress={() => this.setSelectedType('buyer')}
                selected={selectedType === 'buyer'}
              />
              <UserTypeItem
                label="Seller"
                labelColor="#2CA75E"
                image={USER_STUDENT}
                onPress={() => this.setSelectedType('seller')}
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
                errorMessage="Please enter at least 8 characters"
                onSubmitEditing={() => {
                  this.validatePassword()
                }}
              />
            </View>
            <Button
              loading={isLoading}
              text="SIGN IN"
              containerStyle={{ flex: -1 }}
              buttonStyle={styles.signUpButton}
              // ViewComponent={require('expo').LinearGradient}
              // linearGradientProps={{
              //   colors: ['#FF9800', '#F44336'],
              //   start: [1, 0],
              //   end: [0.2, 0],
              // }}
              textStyle={styles.signUpButtonText}
              onPress={this.signin}
              disabled={isLoading}
            />
          </KeyboardAvoidingView>
          <View style={styles.loginHereContainer}>
            <Text style={styles.alreadyAccountText}>
              No account yet?
            </Text>
            <Button
              text="Register here"
              textStyle={styles.loginHereText}
              containerStyle={{ flex: -1 }}
              buttonStyle={{ backgroundColor: 'transparent' }}
              underlayColor="transparent"
              onPress={() => Actions.register()}
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
  emailChanged, passwordChanged, loginUser
})(RegisterForm);
