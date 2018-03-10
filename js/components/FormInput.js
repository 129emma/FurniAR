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
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const FormInput = props => {
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
    );
  }

  const styles = StyleSheet.create({
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
  })

  export default FormInput;