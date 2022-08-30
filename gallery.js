import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';
var photos = [];

export default class Galleryz extends React.Component {
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item: photo }) => {
    return (
      <Image
        source={{ uri: photo }}
        style={{
          height: Dimensions.get('window').width * (22 / 100),
          width: Dimensions.get('window').width * (22 / 100),
          margin: 2,
          marginTop: 5,
        }}
      />
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      rd: '0',
    };
  }

  componentDidMount() {
    photos = [];
    firebase
      .storage()
      .ref('')
      .listAll()
      .then(function (result) {
        result.items.forEach(function (imageRef) {
          photo(imageRef);
        });
      });
  }

  render() {
    if (this.state.rd == '0') {
      setTimeout(() => this.setState({ rd: '1', photos: photos }), 5000);
      return (
        <View>
          <Text style={{ alignSelf: 'center', margin: 20 }}>Loading...</Text>
        </View>
      );
    } else {
      photos.sort(function (p1, p2) {
        return parseInt(p1.slice(74, 86), 10) - parseInt(p2.slice(74, 86));
      });
      return (
        <View>
          <View style={{height: 10}}/>
          <FlatList
            data={photos}
            columnWrapperStyle={{
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}
            numColumns={10}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
      );
    }
  }
}

function photo(imageRef) {
  imageRef.getDownloadURL().then(function (url) {
    photos.push(url);
  });
}
