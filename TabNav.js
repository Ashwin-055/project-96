import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import Galleryz from './gallery';
import About from './about';
const Tab = createMaterialBottomTabNavigator();

export default class Gallery extends Component {
  render() {
    return (
      <Tab.Navigator
        labeled={true}
        barStyle={{
          backgroundColor: '#eaeaea',
          height: '10%',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: 'hidden',
          position: 'absolute',
          justifyContent: "center",
          alignItems: "center"
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === 'Gallery') {
              iconName = focused ? 'apps' : 'apps-outline';
            } else if (route.name === 'About') {
              iconName = focused ? 'copy' : 'copy-outline';
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          },
        })}
        activeColor={'#ee8249'}
        inactiveColor={'gray'}>
        <Tab.Screen name="Gallery" component={Galleryz} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  icons: {
    width: RFValue(30),
    height: RFValue(30),
  },
});