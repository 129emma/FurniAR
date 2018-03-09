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

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const UserTypeItem = props => {
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
      fontFamily: 'light',
    },
    whoAreYouText: {
      color: '#7384B4',
      fontFamily: 'bold',
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
      fontFamily: 'bold',
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
      fontFamily: 'light',
      fontSize: 16,
    },
    errorInputStyle: {
      marginTop: 0,
      textAlign: 'center',
      color: '#F44336',
    },
    signUpButtonText: {
      fontFamily: 'bold',
      fontSize: 13,
    },
    signUpButton: {
      width: 250,
      borderRadius: 50,
      height: 45,
    },
    loginHereContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    alreadyAccountText: {
      fontFamily: 'lightitalic',
      fontSize: 12,
      color: 'white',
    },
    loginHereText: {
      color: '#FF9800',
      fontFamily: 'lightitalic',
      fontSize: 12,
    },
  })

  export default UserTypeItem;