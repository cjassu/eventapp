import React, {Fragment} from 'react';
import {
  AppRegistry
} from 'react-native';

import {StackNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './app/views/Home';
import EventTrack from './app/views/EventList';
import EventDetail from './app/views/EventDetail';
import TrackScreen from './app/views/TrackScreen';
import GestureRecognizer from 'react-native-swipe-gestures';


const AppNavigator = createStackNavigator(
  {
    HomeScreen: {screen: Home},
    EventHome: { screen: EventTrack },
    EventDetail: { screen: EventDetail },
    EventTrack:{screen:TrackScreen}
  }, 
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const MyApp = createAppContainer(AppNavigator);

class App extends React.Component {
  
  constructor(props) {
    super(props)
  }
  // onSwipeLeft(gestureState) {
  //   this.props.navigation.navigate('EventHome');
  // }
 
  // onSwipeRight(gestureState) {
  //   alert('right')
  // }
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
      
      <Fragment>
        {/* <StatusBar barStyle="dark-content" />
        <GestureRecognizer
      // onSwipe={this.onSwipe}
      // onSwipeUp={this.onSwipeUp}
      // onSwipeDown={this.onSwipeDown}
      onSwipeLeft={(state)=>this.onSwipeLeft(state)}
      onSwipeRight={(state)=>this.onSwipeRight(state)}
      config={config}
      style={{
        flex: 1,
      }}
    > */}
        <MyApp />
        {/* </GestureRecognizer> */}
        </Fragment>
       
    );
  }
}
AppRegistry.registerComponent('App', () => App)
export default App;
