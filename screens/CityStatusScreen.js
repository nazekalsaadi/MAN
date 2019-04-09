import React from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  FlatList
} from "react-native";
import { Button, Input, Icon, ListItem, Card, Rating, Divider } from 'react-native-elements';
import db from "../db";

import { ScrollView } from "react-native-gesture-handler";

import { Card, ListItem, Button, CheckBox } from "react-native-elements";


export default class CityStatusScreen extends React.Component {
  static navigationOptions = {
    title: "CityStatusScreen",
    header:null
  };
  state = {
    Trash: [],
    Group: -1,
    RservedGroups: [],
    Users: [],
    checked: false
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


  avatarURL = (UserName) => {
    return "avatars%2F" + this.state.Users.find(u => u.id === UserName).Avatar.replace("@", "%40")
  }
  render() {
    return (
      <ScrollView>
        <Card title="Group">
          <Text h2>Group No : {this.state.Group}</Text>
        </Card>
        <Card title="Assistant Groups">
          {
            this.state.RservedGroups.map(g =>
              <ListItem
                key={g.id}
                title={g.id + " " + g.City}
                leftIcon={{ name: 'users', type: 'font-awesome' }}
              >
              </ListItem>
            )}
        </Card>

        <Card title="Trashcans Related to This City">
          {this.state.Trash.map(u => (
            <ListItem
              key={u.id}
              title={u.City + u.id}
              subtitle={u.level + "% | " + u.Status}
              leftIcon={{ name: 'trash', type: 'font-awesome' }}
            >
            </ListItem>
          )
          )}
        </Card>

        <Card title="Users Related to this City">
          {this.state.Users.map(u => (
            <ListItem
              key={u.id}
              title={u.FirstName + " " + u.LastName}
              subtitle={u.Role}
              leftAvatar={{ source: { uri: `https://firebasestorage.googleapis.com/v0/b/manproject-8a2c9.appspot.com/o/${this.avatarURL(u.Avatar)}?alt=media&token=a1e02d9e-3e8c-4996-973f-2c7340be54d5` } }}
            >
            </ListItem>
          )
          )}
        </Card>

        <Rating
          showRating
          type="star"
          fractions={1}
          startingValue={3.6}
          readonly
          imageSize={40}
          style={{ paddingVertical: 10 }}
        />
      </ScrollView>

    );
  }
}
