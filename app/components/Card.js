import React from 'react'
import { View,Text,Image } from 'react-native';
import PropTypes from 'prop-types'

const Card = ({item:{name,uri,place,fees}}) => {
    return (
        <View style={{ width: 340, height: 200, flexDirection: 'row', margin: 24 }}>
            <Image
          style={{ width: 340, height: 200, position: 'absolute' }}
          source={{ uri: uri }}
        />
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignSelf: 'flex-end' }}>
          <Text style={{ color: 'white', fontSize: 20, margin: 6 }}>{name}</Text>
          <Text style={{ color: 'white', margin: 6 }}>{place}</Text>
          {
            fees > 0 ? <Text style={{ color: 'white', margin: 6 }}>{'Paid'}</Text> :
            <Text style={{ color: 'white', margin: 6 }}>{'Free'}</Text>
          }
        </View>
        </View>
    )
}

Card.propTypes = {
    item:PropTypes.object.isRequired,
}

export default Card;


