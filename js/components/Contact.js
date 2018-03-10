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
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

export default class Contact extends Component {
    onButtonPress() {
        const phone = '02108425678';
        const body = 'Hi 50% Coda, I would love to start to collaborate with you ASAP!' 
        Communications.text(phone, body);
    }

    render() {
        return(
            <ScrollView
                scrollEnabled={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.container}
            >
                <KeyboardAvoidingView
                    behavior="position"
                    contentContainerStyle={styles.formContainer}
                >
                <Text style={styles.signUpText}>Congrats!</Text>
                <Text style={styles.whoAreYouText}> Your infomation has been stored.
                {"\n"}{"\n"} We will try to contact you as soon{"\n"} as possible. {"\n"}{"\n"} Need more info? just text us! </Text>
                <Button
                    text="Text Us"
                    containerStyle={{ flex: -1 }}
                    buttonStyle={styles.signUpButton}
                    textStyle={styles.signUpButtonText}
                    onPress={this.onButtonPress.bind(this)}
                />
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
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
},
whoAreYouText: {
    color: '#7384B4',
    fontWeight: 'bold',
    fontSize: 14,
},
signUpButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    width: 250,
    borderRadius: 50,
    height: 45,
    backgroundColor: 'rgba(111, 202, 186, 1)',
  },
})