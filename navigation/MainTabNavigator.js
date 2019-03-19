import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Map from '../screens/MapScreen';
import List from '../screens/UserList';
import SettingsScreen from '../screens/SettingsScreen';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Table from '../screens/TableScreen';
import UserList from '../screens/UserList';
import CalendarScreen from '../screens/CalendarScreen';
import ChatScreen from '../screens/ChatScreen';

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

const UserStack = createStackNavigator({
  User: UserList,
});

UserStack.navigationOptions = {
  tabBarLabel: 'User',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

const CalendStack = createStackNavigator({
  CalendarScreen: CalendarScreen,
});

CalendStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
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

const ChatStack = createStackNavigator({
  ChatScreen: ChatScreen,
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'}
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
  // Liststack,
  ChatStack,
  CalendStack
},
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#330000',//color you want to change

      },

      activeTintColor: "white",
      inactiveTintColor: "white",
      labelStyle: {
        fontWeight: "bold"
      }
    }
  }
);
