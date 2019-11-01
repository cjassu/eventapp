import React, { Component } from 'react'
import { Text,Button,View,FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Card from '../components/Card';

const data = require('../../data.json');

export default class EventTrack extends Component {
    constructor() {
        super();
        this.state = {
            name:'',
        }
    }
    async componentDidMount() {
        const name = await AsyncStorage.getItem('@name');
        await this.setState({name:name})
    }
    deleteMe=async ()=> {
        await AsyncStorage.removeItem('@name')
        alert('ok')
    }
    render() {

        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <Card item={item}/>
                    )}
                    keyExtractor={item=>item.id}
                />
                <Text onPress={() => this.deleteMe()}>{this.state.name}</Text>
                <Button onPress={() => this.props.navigation.navigate('HomeScreen')} title='Home' />
                
            </View>
            
        )
    }
}
