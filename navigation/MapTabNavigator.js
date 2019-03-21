import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TrashMapScreen from '../screens/TrashScreen';
import CitiesMapScreen from '../screens/CityScreen';


// const Home = createStackNavigator({
//   CitiesMapScreen: CitiesMapScreen,
//   TrashMapScreen: TrashMapScreen,

// });

const Citiesstack = createStackNavigator({
    CitiesMapScreen: CitiesMapScreen
});

Citiesstack.navigationOptions = {
  tabBarLabel: 'Cities',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const Trashstack = createStackNavigator({
    TrashMapScreen: TrashMapScreen,
});

Trashstack.navigationOptions = {
  tabBarLabel: 'Trash',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

export default createBottomTabNavigator({
  Trashstack,
  Citiesstack
},
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#330000',//color you want to change

      },

      activeTintColor: "#fff",
      inactiveTintColor: "#fff",
      labelStyle: {
        fontWeight: "bold"
      }
    }
  }
);
