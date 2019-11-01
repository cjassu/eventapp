/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { StackNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import Home from './app/views/Home';
import EventTrack from './app/views/EventTrack';

const AppNavigator = createStackNavigator({
  HomeScreen: { screen: Home },
  EventHome: { screen: EventTrack },
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }}
   
);

const MyApp=createAppContainer(AppNavigator)

class App extends React.Component {
  render() {
    return (
      <Fragment>
      <StatusBar barStyle="dark-content" />
      <MyApp />
      </Fragment>
  );
  }
};



export default App;
