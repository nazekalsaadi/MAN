import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import Trash from '../screens/TrashScreen';
import City from '../screens/CityScreen';


const Home = createStackNavigator({
  CitiesMapScreen: CitiesMapScreen,
  TrashMapScreen: TrashMapScreen,

});

const Citiesstack = createStackNavigator({
    CitiesMapScreen: City
});

Home.navigationOptions = {
  tabBarLabel: 'Cities',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const Trashtack = createStackNavigator({
    TrashMapScreen: Trash,
});

Mapstack.navigationOptions = {
  tabBarLabel: 'Trash',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

export default createBottomTabNavigator({
  Home,
  Mapstack,
  SettingsStack,
  Liststack

},
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#ba68c8',//color you want to change

      },

      activeTintColor: "#FFFFFF",
      inactiveTintColor: "#4a148c",
      labelStyle: {
        fontWeight: "bold"
      }
    }
  }
);
