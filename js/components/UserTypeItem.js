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
  })

  export default UserTypeItem;