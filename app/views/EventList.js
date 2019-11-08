import React, {Component} from 'react';
import {
  Text,
  Button,
  View,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/FontAwesome';
import GestureRecognizer from 'react-native-swipe-gestures';
const data = require('../../data.json');

export default class EventTrack extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gridView: true,
      btnText: 'th',
      num: '',
      loading: true,
      data: null,
    };
  }
  async componentDidMount() {
    const name = await AsyncStorage.getItem('@name');
    await this.setState({name: name});
    if (data) {
      this.setState({data: data, loading: false});
    }
    // alert(this.state.data)
  }
  deleteMe = async () => {
    await AsyncStorage.removeItem('@name');
  };
  changeView = async () => {
    await this.setState({gridView: !this.state.gridView}, () => {
      if (this.state.gridView) {
        this.setState({btnText: 'th-list', num: 2});
      } else {
        this.setState({btnText: 'th', num: 1});
      }
    });
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
      <GestureRecognizer
        onSwipeLeft={state => this.onSwipeLeft(state)}
        onSwipeRight={state => this.onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
        }}>
        <SafeAreaView style={{paddingBottom: 15}}>
          <Icon
            name={this.state.btnText}
            onPress={() => this.changeView()}
            color="black"
            size={30}
            style={{alignSelf: 'center'}}
          />

          {/* <Button onPress={() => this.changeView()} title={this.state.btnText} /> */}
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={data}
              key={this.state.gridView ? 1 : 0}
                numColumns={this.state.gridView ? 2 : 1}
                refreshing={true}
              renderItem={({item}) =>
                this.state.gridView ? (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.navigation.navigate('EventDetail', {
                        item: item,
                      })
                    }>
                    <View>
                      <Card number={this.state.num} item={item} />
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.navigation.navigate('EventDetail', {
                        item: item,
                      })
                    }>
                    <View>
                      <Card number={this.state.num} item={item} />
                    </View>
                  </TouchableWithoutFeedback>
                )
              }
              keyExtractor={item => item.id}
            />
          )}
        </SafeAreaView>
      </GestureRecognizer>
    );
  }
}
