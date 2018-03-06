import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    // Call parent constructor and initialise the state
    super();

    this.state = {
      text : "Initializing AR..."
    };

    // Bind 'this' to functions declare in this class so that
    // they would reference 'this' object
    this._onInitialized = this._onInitialized.bind(this);
  }

  // Render the scene using JSX
  render() {
    return (
      // Using Viro's AR scene wrapper
      // The viewer faces in the negative-Z direction, 
      // so providing a Z coordinate of -1 places the object in front of the viewer
      <ViroARScene onTrackingInitialized={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
      </ViroARScene>
    );
  }

  _onInitialized() {
    this.setState({
      text : "Hello World!"
    });
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
