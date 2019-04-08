import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import Map from "../navigation/MapTabNavigator";
import List from "../screens/UserList";
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Table from "../screens/TableScreen";
import UserList from "../screens/UserList";
import CalendarScreen from "../screens/CalendarScreen";
import ChatUserSelection from "../screens/ChatUserSelection";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";

const Home = createStackNavigator({
  // LoginScreen: LoginScreen,

  HomeScreen: HomeScreen,
  RegisterScreen: RegisterScreen,
  UserList: UserList,
  NotificationScreen: NotificationScreen,
  ChatScreen: ChatScreen
});

const Loginstack = createStackNavigator({
  LoginScreen: Home
});

Home.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

// const NotificationStack = createStackNavigator({
//   NotificationScreen: NotificationScreen
// });

// NotificationStack.navigationOptions = {
//   tabBarLabel: 'NotificationScreen',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
//     />
//   ),
// };
const UserStack = createStackNavigator({
  User: UserList
});

UserStack.navigationOptions = {
  tabBarLabel: "User",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-people" : "md-people"}
    />
  )
};

const Mapstack = createStackNavigator({
  Map: Map
});
Mapstack.navigationOptions = {
  tabBarLabel: "Map",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-map" : "md-map"}
    />
  )
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  )
};

const CalendStack = createStackNavigator({
  CalendarScreen: CalendarScreen
});

CalendStack.navigationOptions = {
  tabBarLabel: "Calendar",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
    />
  )
};

const ChatUserStack = createStackNavigator({
  ChatUserSelection: ChatUserSelection
});

ChatUserSelection.navigationOptions = {
  tabBarLabel: "Chat",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-chatbubbles" : "md-chatbubbles"}
    />
  )
};

// const ChatStack = createStackNavigator({
//   ChatScreen: ChatScreen
// });

// ChatStack.navigationOptions = {
//   tabBarLabel: "Chat",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon

//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-chatbubbles" : "md-chatbubbles"}
//     />
//   )
// };

const Liststack = createStackNavigator({
  List: List
});

Liststack.navigationOptions = {
  tabBarLabel: "List",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const TableStack = createStackNavigator({
  TableScreen: Table
});

TableStack.navigationOptions = {
  tabBarLabel: "Table",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
    />
  )
};
export default createBottomTabNavigator(
  {
    Home,
    Mapstack,
    // UserStack,
    // SettingsStack,
    // Liststack,
    // TableStack,
    // // Liststack,

    ChatUserStack,
    CalendStack,
    ProfileStack
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#330000" //color you want to change
      },

      activeTintColor: "white",
      inactiveTintColor: "white",
      labelStyle: {
        fontWeight: "bold"
      }
    }
  }
);
