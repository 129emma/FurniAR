import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';

var InitialARScene = require('./HelloWorldSceneAR');
var sharedProps = {
    apiKey:"687DAF49-BE9F-4E5A-AED1-BD7F99407671",
}

class ARSceneWrapper extends Component {
    constructor() {
        super();

        this.state = {
            sharedProps : sharedProps
          }
    }
    render() {
        return (
            <ViroARSceneNavigator {...this.state.sharedProps}
            initialScene={{scene: InitialARScene}} />
        );
    }
};

export default ARSceneWrapper;