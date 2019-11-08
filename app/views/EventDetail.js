import React from 'react';
import {View, Text, Image, SafeAreaView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class EventDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      id: [],
      id2:[],
      user: '',
      data: '',
      from: '',
      tracked:false
    };
  }
  async componentDidMount() {
    var item = await this.props.navigation.getParam('item');
    var from = await this.props.navigation.getParam('from')
    await this.setState({data: item,from:from});
    this.getData();
  }

  async getData() {
    var id = await AsyncStorage.getItem('@id');
    let id2 =JSON.parse(id)
    this.setState({id2:id2})
    let track = JSON.parse(id);
    if (!track) {
      track = [];
    }
    track.push(this.state.data);
    this.setState({id: track});
  }

  async save() {
    var o = this.state.id2.findIndex(({id})=>id==this.state.data.id)
    if (o === -1) {
      await AsyncStorage.setItem('@id', JSON.stringify(this.state.id))
    .then(() => {
      alert('success');
    })
    .catch(() => {
      alert('error');
    })
    } else {
      alert('You are already tracking this event.')
    }
    
  }

  async delete() {
    const del = this.state.id.filter(item=>item.id !== this.state.data.id)
    await AsyncStorage.setItem('@id', JSON.stringify(del)).then(() => {
      this.props.navigation.goBack();
      this.props.navigation.state.params.returndata();
    })
      .catch(() => {
        alert('error');
    })
  }
  render() {
    const {data} = this.state;

    return (
      <SafeAreaView>
        <View style={{flex: 1, margin: 15}}>
          <Image source={{uri: data.uri}} style={{width: 360, height: 340}} />
          <Text style={{color: 'black', fontSize: 30, margin: 6}}>
            {data.name}
          </Text>
          <Text style={{color: 'black', margin: 6, fontSize: 20}}>
            {data.place}
          </Text>
          {!data.entry_fee ? (
            <Text style={{color: 'black', margin: 6, fontSize: 20}}>Free</Text>
          ) : (
            <Text style={{color: 'black', margin: 6, fontSize: 20}}>Paid</Text>
          )}
          {this.state.from === 'track' ?
            <Text style={styles.button} onPress={() => this.delete()}>
            UNTRACK
          </Text>:
            <Text style={styles.button} onPress={() => this.save()}>
            TRACK
          </Text>}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'black',
    height: 50,
    color: 'white',
    padding: 10,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 100,
    borderRadius: 5,
  },
});

export default EventDetail;
