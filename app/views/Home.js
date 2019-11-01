import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
    }
    async componentDidMount() {
        const user = await AsyncStorage.getItem('@name')
        if (user) {
            this.props.navigation.navigate('EventHome')
        } else {
            alert('please enter your name')
        }
    }
  saveName=async()=> {
      
      await AsyncStorage.setItem('@name', this.state.name)
      alert(this.state.name)
      this.props.navigation.navigate('EventHome')
  }
  render() {
    return (
      <View style={styles.container}>
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
