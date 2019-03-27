import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import TrashMapScreen from "../screens/TrashScreen";
import CityStatusScreen from "../screens/CityStatusScreen";
import CitiesMapScreen from "../screens/CityScreen";

// const Home = createStackNavigator({
//   CitiesMapScreen: CitiesMapScreen,
//   TrashMapScreen: TrashMapScreen,

// });

const Citiesstack = createStackNavigator({
  CitiesMapScreen: CitiesMapScreen,
  CityStatusScreen: CityStatusScreen
});

Citiesstack.navigationOptions = {
  tabBarLabel: "Cities",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

const Trashstack = createStackNavigator({
  TrashMapScreen: TrashMapScreen
});

Trashstack.navigationOptions = {
  tabBarLabel: "Trash",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-map" : "md-map"}
    />
  )
};

const CityStack = createStackNavigator({
  CityStatusScreen: CityStatusScreen
});

CityStack.navigationOptions = {
  tabBarLabel: "City Status",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

export default createBottomTabNavigator(
  {
    Trashstack,
    Citiesstack
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#330000" //color you want to change
      },

      activeTintColor: "#fff",
      inactiveTintColor: "#fff",
      labelStyle: {
        fontWeight: "bold"
      }
    }
  }
);
