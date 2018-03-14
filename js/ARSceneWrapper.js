import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import InitialARScene from './ARPlayground';
import renderIf from './renderIf';
import { Actions } from 'react-native-router-flux';

const objArray = [
  require('./res/White_chair.obj'),
  require('./res/Wood_chair.obj'),
  require('./res/Old_chair.obj'),
  require('./res/Chinese_table.obj'),
  require('./res/Coffee_table.obj')];

var textureArray = [
  [require('./res/White_chair.mtl'),
   require('./res/White_chair/_5.jpg'),
   require('./res/White_chair/Metal_Corrogated_Shiny.jpg'),
   require('./res/White_chair/Wood_Board_Cork.jpg')],
  [require('./res/Wood_chair.mtl'),
   require('./res/Wood_chair/b113_BS.jpg'),
   require('./res/Wood_chair/M_12_s21.jpg')],
  [require('./res/Old_chair.mtl'),
   require('./res/Old_chair/_7.jpg'),
   require('./res/Old_chair/_12.jpg')],
  [require('./res/Chinese_table.mtl'),
   require('./res/Chinese_table/_2.jpg'),
   require('./res/Chinese_table/_3.jpg'),
   require('./res/Chinese_table/Stone_Vein_Gray.jpg')],
  [require('./res/Coffee_table.mtl'),
   require('./res/Coffee_table/beech__light.jpg')]
];


class ARSceneWrapper extends Component {
    constructor() {
				super();
				
        this._onShowObject = this._onShowObject.bind(this);
        this._renderTrackingText = this._renderTrackingText.bind(this);
        this._onTrackingInit = this._onTrackingInit.bind(this);
        this._onDisplayDialog = this._onDisplayDialog.bind(this);
        this._onLoadStart = this._onLoadStart.bind(this);
        this._onLoadEnd = this._onLoadEnd.bind(this);

        this.state = {
        viroAppProps: {displayObject:false, 
            objectSource:objArray[0], textures: textureArray[0], yOffset:0, _onLoadEnd: this._onLoadEnd, 
            _onLoadStart: this._onLoadStart, _onTrackingInit:this._onTrackingInit},
        trackingInitialized: false,
				isLoading: false,
        }
    }
    render() {
        return (
        <View style={localStyles.outer} >
            <ViroARSceneNavigator style={localStyles.arView} apiKey="687DAF49-BE9F-4E5A-AED1-BD7F99407671"
            initialScene={{scene:InitialARScene, passProps:{displayObject:this.state.displayObject}}}  
            viroAppProps={this.state.viroAppProps}
            />

            {this._renderTrackingText()}

            {renderIf(this.state.isLoading,
            <View style={{position:'absolute', left:0, right:0, top:0, bottom:0, alignItems: 'center', justifyContent:'center'}}>
                <ActivityIndicator size='large' animating={this.state.isLoading} color='#ffffff'/>
            </View>)
            }

            <View style={{position: 'absolute',  left: 0, right: 0, bottom: 77, alignItems: 'center'}}>
            <TouchableHighlight style={localStyles.buttons}
                onPress={this._onDisplayDialog}
                underlayColor={'#00000000'} >
                <Image source={require("./res/btn_mode_objects.png")} />
            </TouchableHighlight>
            </View>
        </View>
        );
    }

  // Invoked when a model has started to load, we show a loading indictator.
  _onLoadStart() {
    this.setState({
      isLoading: true,
    });
  }

  // Invoked when a model has loaded, we hide the loading indictator.
  _onLoadEnd() {
    this.setState({
      isLoading: false,
    });
  }

  _renderTrackingText() {
    if(this.state.trackingInitialized) {
      // return (<View style={{position: 'absolute', backgroundColor:"#ffffff22", left: 30, right: 30, top: 30, alignItems: 'center'}}>
      //   <Text style={{fontSize:12, color:"#ffffff"}}>Tracking initialized.</Text>
      // </View>);
    } else {
      return (<View style={{position: 'absolute', backgroundColor:"#ffffff22", left: 30, right: 30, top:30, alignItems: 'center'}}>
        <Text style={{fontSize:12, color:"#ffffff"}}>Waiting for tracking to initialize.</Text>
        </View>);
    }
  }

  _onTrackingInit() {
    this.setState({
      trackingInitialized: true,
    });
  }

  _onDisplayDialog = () => {
    Alert.alert(
    'Choose an object',
    'Select an object to place in the world!',
    [
      {text: 'White Chair', onPress: () => this._onShowObject(0, "White_chair", 0)},
      {text: 'Modern Chair', onPress: () => this._onShowObject(1, "Modern_chair", 0)},
      {text: 'Vintage Chair', onPress: () => this._onShowObject(2, "Vintage_chair", 0)},
      {text: 'Chinese Table', onPress: () => this._onShowObject(3, "Chinese_table", 0)},
      {text: 'Coffee Table', onPress: () => this._onShowObject(4, "Coffee_table", 0)},
    ],
    );
  }

  _onShowObject(objIndex, objUniqueName, yOffset) {
    this.setState({
        viroAppProps:{...this.state.viroAppProps, 
          displayObject: true, yOffset: yOffset, displayObjectName: objUniqueName, 
          objectSource:objArray[objIndex]}, textures: textureArray[objIndex],
    });
    console.log(textureArray[objIndex]);
    console.log(objArray[objIndex]);
  }
};

const localStyles = StyleSheet.create({
  outer : {
    flex : 1,
  },

  arView: {
    flex:1,
  },

  buttons : {
    height: 80,
    width: 80,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  }
});

export default ARSceneWrapper;