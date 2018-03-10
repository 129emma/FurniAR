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
import Communications from 'react-native-communications';

export default class Contact extends Component {
    render() {
        return(
            <View>
                <Text style={styles.signUpText}>Sign up</Text>
                <Text style={styles.whoAreYouText}>WHO YOU ARE ?</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
signUpText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'light',
  },
  whoAreYouText: {
    color: '#7384B4',
    fontWeight: 'bold',
    fontSize: 14,
  },
})