import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator,DrawerContentScrollView,
  DrawerItemList } from '@react-navigation/drawer';
import Camera from './camera';
import Gallery from './TabNav';
import {
  Image,View
} from 'react-native';
import firebase from "firebase";
import { firebaseConfig } from "./config";
const Drawer = createDrawerNavigator();

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let props = this.props;
    return (
      <NavigationContainer>
        <Drawer.Navigator 
        drawerContent={(props) => <CustomSidebar {...props} />}
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          inactiveTintColor: 'white'
        }}>
          <Drawer.Screen
            name={'Camera'}
            component={Camera}
            options={{ unmountOnBlur: true, headerShown: true}}
          />
          <Drawer.Screen
            name={'Gallery'}
            component={Gallery}
            options={{ unmountOnBlur: true, headerShown: true}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

class CustomSidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    let props = this.props;
    return(
      <View style={{
          flex: 1
        }}>
          <Image style={{height:300}} source={{uri:'https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/camera_1f4f7.png'}}/>
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
      </View>
    )
  }
}
