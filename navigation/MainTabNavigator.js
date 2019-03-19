import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Map from '../screens/MapScreen';
import List from '../screens/UserList';
import SettingsScreen from '../screens/SettingsScreen';
import Testing from '../screens/Testing';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Table from '../screens/TableScreen';

const Home = createStackNavigator({
  LoginScreen: LoginScreen,
  RegisterScreen: RegisterScreen,
  HomeScreen: HomeScreen,


});

const Loginstack = createStackNavigator({
  LoginScreen: Home
});

Home.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};


const Mapstack = createStackNavigator({
  Map: Map,
});

Mapstack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
};

const Liststack = createStackNavigator({
  List: List,
});

Liststack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const TableStack = createStackNavigator({
  TableScreen: Table,
});

TableStack.navigationOptions = {
  tabBarLabel: 'Table',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
};
export default createBottomTabNavigator({
  Home,
  Mapstack,
  SettingsStack,
  Liststack,
  TableStack

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
