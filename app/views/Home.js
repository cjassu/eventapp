import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import GestureRecognizer from 'react-native-swipe-gestures';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      user: '',
      gestureName: 'none',
    };
  }
  async componentDidMount() {
    const user = await AsyncStorage.getItem('@name');
    await this.setState({ user: user });
  }
  saveName = async () => {
    if (this.state.name === '') {
      alert('Please Enter Your name')
    } else if(this.state.user === ''){
      await AsyncStorage.setItem('@name', this.state.name);
    this.props.navigation.navigate('EventHome');
    }
  };

  onSwipeLeft(gestureState) {
    this.props.navigation.navigate('EventTrack');
  }

  onSwipeRight(gestureState) {
    this.props.navigation.goBack();
  }
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <View style={styles.container}>
        <GestureRecognizer
          onSwipeLeft={state => this.onSwipeLeft(state)}
          onSwipeRight={state => this.onSwipeRight(state)}
          config={config}
          style={{
            flex: 1,
          }}>
          <ImageBackground
            source={require('../assets/bg.jpg')}
            style={styles.imageBackground}>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({name: text})}
              placeholder="Enter Your Name"
            />
            <Text style={styles.button} onPress={() => this.saveName()}>
              Submit
            </Text>
          </ImageBackground>
        </GestureRecognizer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 20,
    height: 50,
    padding: 10,
    marginRight: 15,
    marginLeft: 15,
    textAlign: 'center',
    borderRadius: 5,
  },
  button: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    height: 50,
    color: 'black',
    padding: 10,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 100,
    borderRadius: 5,
  },
});
