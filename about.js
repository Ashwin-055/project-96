import React from 'react';
import {
  Text,
  View,
  Dimensions,
} from 'react-native';

export default class Galleryz extends React.Component {
  render() {
    return (
      <View
        style={{
          alignSelf: 'center',
          width: Dimensions.get('window').width - 15,
        }}>
        <Text style={{ fontSize: 40, alignSelf: 'center', marginTop: 8 }}>
          About
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 20,
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 20 }}>Version :</Text>
          <Text
            style={{
              fontSize: 20,
              backgroundColor: 'lightgrey',
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 10,
              marginLeft: 10,
            }}>
            1.0.0
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            alignSelf: 'center',
            marginTop: 80,
            textAlign: 'center',
          }}>
          This is a camera app that can click and store photos on the internet.
        </Text>
        <Text
          style={{
            fontSize: 20,
            alignSelf: 'center',
            marginTop: 80,
            textAlign: 'center',
          }}>
          We will keep bringing more updates in the future...
        </Text>
      </View>
    );
  }
}
