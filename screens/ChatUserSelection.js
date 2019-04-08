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

export default class ChatUserSelection extends React.Component {
  static navigationOptions = {
    title: "ChatUserSelection"
  };

  state = {
    Users: []
  };

  componentDidMount() {
    // go to db and get all the Users
    db.collection("User").onSnapshot(async querySnapshot => {
      const Users = [];
      querySnapshot.forEach(doc => {
        Users.push({ id: doc.id, ...doc.data() });
      });
      console.log("User : ", Users);
      await this.setState({ Users });
    });
  }

  render() {
    return (
      <View>
        <Text> Users List </Text>

        {this.state.Users.map(g => (
          <TouchableOpacity
            key={g.id}
            onPress={() =>
              this.props.navigation.navigate(
                "ChatScreen",
                {
                  user: g.id
                },
                console.log(g.id)
              )
            }
          >
            <Text>
              Name : {g.FirstName} {g.LastName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
