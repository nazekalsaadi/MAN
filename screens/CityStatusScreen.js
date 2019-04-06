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
    Group: -1,
    RservedGroups: [],
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

    // go to db and get the Group
    db.collection("Group")
      .where("City", "==", place)
      .onSnapshot(async querySnapshot => {
        const Groups = [];
        querySnapshot.forEach(doc => {
          Groups.push({ id: doc.id, ...doc.data() });
          this.setState({ Group: doc.id });
        });
        await this.GetUsers()
      });

    // go to db and get all the Trashes
    db.collection("Group")
      .where("ReserveCity", "==", place)
      .onSnapshot(async querySnapshot => {
        const RservedGroups = [];
        querySnapshot.forEach(doc => {
          RservedGroups.push({ id: doc.id, ...doc.data() });
        });
        await this.setState({ RservedGroups });
        console.log("groupssss: ", RservedGroups)
      });

  }

  GetUsers = async () => {

    // go to db and get all the Users
    db.collection("User")
      .where("GroupNo", "==", this.state.Group)
      .onSnapshot(async querySnapshot => {
        const Users = [];
        querySnapshot.forEach(doc => {
          Users.push({ id: doc.id, ...doc.data() });
        });
        console.log("Users : ", Users)
        await this.setState({ Users });
      });
  }
  render() {
    return (
      <View>
        <Text>Group Number : {this.state.Group}</Text>
        <Text>Assistant Groups :  {
          this.state.RservedGroups.map(g =>
            <Text key={g.id}>{g.id}, </Text>
          )}
        </Text>
        <Text> Trash List </Text>
        <FlatList
          data={this.state.Trash}
          renderItem={({ item }) => <Text>{item.City} |  {item.Level}% |  {item.Status}</Text>}
        />

        <Text> Users List </Text>
        <FlatList
          data={this.state.Users}
          renderItem={({ item }) => <Text>Name : {item.FirstName} {item.LastName}  |  Role : {item.Role}</Text>}
        />
      </View>
    );
  }
}
