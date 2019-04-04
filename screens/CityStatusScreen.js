import React from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList
} from "react-native";
import db from "../db";

export default class CityStatusScreen extends React.Component {
  static navigationOptions = {
    title: "CityStatusScreen"
  };

  state = {
    Trash: [],
    Users: []
  };

  componentDidMount() {
    const { navigation } = this.props;
    const place = navigation.getParam("place");
    console.log("Place = ", place);
    // go to db and get all the Trashes
    db.collection("Trash")
      .where("City", "==", place)
      .onSnapshot(async querySnapshot => {
        const Trash = [];
        querySnapshot.forEach(doc => {
          Trash.push({ id: doc.id, ...doc.data() });
        });
        await this.setState({ Trash });
      });

    // go to db and get all the Users
    /*   db.collection("Users").onSnapshot(async querySnapshot => {
      const Users = [];
      querySnapshot.forEach(doc => {
        Users.push({ id: doc.id, ...doc.data() });
      });
      await this.setState({ Users });
    });*/
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.Trash}
          renderItem={({ item }) => <Text>{item.City}</Text>}
        />
      </View>
    );
  }
}
