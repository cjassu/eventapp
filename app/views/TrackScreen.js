import React, {Component} from 'react';
import {AsyncStorage, SafeAreaView, Text,FlatList,TouchableWithoutFeedback,View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Card from '../components/Card';

export default class TrackScreen extends Component {
  constructor() {
    super();
    this.state = {
        data: null,
        gridView: true,
        btnText: 'th',
        num: '',
        from:'track'
    };
  }
  async componentDidMount() {
    const data = await AsyncStorage.getItem('@id');
      await this.setState({ data: JSON.parse(data) })
  }

  onSwipeRight(gestureState) {
    this.props.navigation.goBack();
  }
  returndata(){
    this.componentDidMount();
    
  }
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <GestureRecognizer
        onSwipeRight={state => this.onSwipeRight(state)}
        config={config}
        style={{
            flex: 1,
            backgroundColor:'white'
        }}>
        <SafeAreaView>
        {
            this.state.data === null ? <Text>No Data</Text> :
            <FlatList
            data={this.state.data}
            renderItem={({item}) =>
              this.state.gridView ? (
                <TouchableWithoutFeedback
                  onPress={() =>
                    this.props.navigation.navigate('EventDetail', {
                      item: item,from:this.state.from,returndata:this.returndata.bind(this)
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
        }
                
        </SafeAreaView>
      </GestureRecognizer>
    );
  }
}
