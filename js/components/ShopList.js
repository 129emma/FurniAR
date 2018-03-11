import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Button } from 'react-native-elements'

// import { Font } from 'expo';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const USER_COOL = require('../res/user-cool.png')

const USERS = [
  {
    name: 'IKXA',
    avatar: 'https://thepointsguy.com/wp-content/uploads/2013/03/ikea.jpg',
    value: '23',
    positive: true
  },
  {
    name: 'Briscxes',
    avatar: 'https://simongault.com/wp-content/uploads/2017/04/Briscoes_logo_lr.png',
    value: '12',
    positive: true
  },
  {
    name: 'Targxt',
    avatar: 'https://lh3.googleusercontent.com/dL5wUTeOrTETTKAw1XiJcO6i3TvFJn3zOSKMBcGkzt42Kxt8jFHPHbtbqCvzZiFVcw=w300',
    value: '17',
    positive: true
  },
  {
    name: 'Warehxuse',
    avatar: 'https://s3-ap-southeast-2.amazonaws.com/kp-wordpress/the-base/uploads/thewarehouse.png',
    value: '33',
    positive: true
  },
  {
    name: 'K Mxrt',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Kmart_logo.svg/220px-Kmart_logo.svg.png',
    value: '23',
    positive: true
  },
];

export default class ShopList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: true,
    };
  }

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     'georgia': require('../../../assets/fonts/Georgia.ttf'),
  //     'regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
  //     'light': require('../../../assets/fonts/Montserrat-Light.ttf'),
  //     'bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
  //   });

  //   this.setState({ fontLoaded: true });
  // }

  renderValue(user) {
    const { value, positive } = user;

    if (positive) {
      return (
        <View style={{ backgroundColor: 'rgba(220,230,218,1)', width: 70, height: 28, borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: 10}}>
          {/* <Icon
            name='md-archive'
            color='green'
            size={18}
          /> */}
          <Text style={{color: 'green', fontSize: 13, marginLeft: 5}}>{value}</Text>
        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: 'rgba(244,230,224,1)', width: 70, height: 28, borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: 10}}>
          {/* <Icon
            name='md-arrow-dropdown'
            color='red'
            size={25}
          /> */}
          <Text style={{color: 'red', fontSize: 13, marginLeft: 5}}>{value}</Text>
        </View>
      );
    }
  }

  renderCard(user, index) {
    const { name, avatar } = user;

    return (
      <View key={index} style={{height: 60, marginHorizontal: 20, marginTop: 10, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginLeft: 15}}>
            <Avatar
              small
              rounded
              source={{
                uri: avatar,
              }}
              activeOpacity={0.7}
            />
          </View>
          <Text style={{fontSize: 15, marginLeft: 10, color: 'gray'}}>
            {name}
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={() => Actions.AR()}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 10 }}>
          {this.renderValue(user)}
          <View style={{ backgroundColor: 'rgba(222,222,222,1)', width: 35, height: 28, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
          
            {/* <Icon
              name='md-person'
              color='gray'
              size={20}
            /> */}
          
          </View>
        </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderListCards() {
    return _.map(USERS, (user, index) => {
      return this.renderCard(user, index);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          decelerationRate={0.993}
        >
      <View>
        {this.state.fontLoaded ?
          <View style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}>
            <View style={styles.statusBar} />
            <View style={styles.navBar}>
             
            </View>
            <ScrollView style={{flex: 1, marginBottom: 20}}>
              <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white', borderRadius: 5, alignItems: 'center', marginHorizontal: 10, height: 250, marginBottom: 10}}>
                <View style={{flex: 3, flexDirection: 'row'}}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Avatar
                      width={145}
                      height={145}
                      source={USER_COOL}
                      activeOpacity={0.7}
                      avatarStyle={{borderRadius: 145/2}}
                      overlayContainerStyle={{backgroundColor: 'transparent'}}
                    />
                  </View>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ flex: 1, marginTop: 10, justifyContent: 'center'}}>
                      <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'rgba(98,93,144,1)', marginLeft: -15}}>
                        Welcome!
                      </Text>
                    </View>
                  </View>
                </View>
                {/* <View style={{width: 300, borderWidth: 5, borderColor: 'rgba(222, 223, 226, 1)', marginHorizontal: 20, height: 1, marginVertical: 10}} /> */}
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1}}>
                    <Button
                      text ='Browse More'
                      buttonStyle={{height: 33, width: 120, backgroundColor: 'rgba(222, 223, 226, 1)', borderRadius: 5}}
                      textStyle={{fontSize: 13, color: 'gray'}}
                      onPress={() => console.log('aye')}
                      underlayColor="transparent"
                    />
                  </View>
                  {/* <View style={{flex: 1}}>
                    <Button
                      text ='Add User'
                      buttonStyle={{height: 33, width: 120, backgroundColor: 'rgba(113, 154, 112, 1)', borderRadius: 5}}
                      textStyle={{fontSize: 13, color: 'white'}}
                      onPress={() => console.log('aye')}
                      underlayColor="transparent"
                    />
                  </View> */}
                </View>
              </View>
              {this.renderListCards()}
            </ScrollView>
          </View> :
          <Text>Loading...</Text>
        }
      </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'black',
    fontSize: 25,
    marginLeft: 20
  }
});
