import React from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground
} from "react-native";
import { ListItem } from 'react-native-elements'
import db from "../db";

export default class ChatUserSelection extends React.Component {
  static navigationOptions = {
    title: "ChatUserSelection"
  };

  state = {
    Users: [],
    backgroundImage: require('../assets/images/crop.jpeg'),
  };

  avatarURL = (UserName) => {
    return "avatars%2F" + this.state.Users.find(u => u.id === UserName).Avatar.replace("@", "%40")
  }

  componentDidMount() {
    // go to db and get all the Users
    db.collection("User").orderBy("GroupNo").onSnapshot(async querySnapshot => {
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
          <ImageBackground source={this.state.backgroundImage} style={{ width: '100%', height: '100%' }}>
        <ScrollView>

        {this.state.Users.map(g => (
          <ListItem
            key={g.id}
            title={g.FirstName}
            subtitle={'Group : ' + g.GroupNo}
            leftAvatar={{ source: { uri: `https://firebasestorage.googleapis.com/v0/b/manproject-8a2c9.appspot.com/o/${this.avatarURL(g.Avatar)}?alt=media&token=a1e02d9e-3e8c-4996-973f-2c7340be54d5` } }}
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
          </ListItem>
        ))}
        </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
