import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList
} from "react-native";
import db from "../db.js";
import firebase from "firebase";
export default class ChatScreen extends React.Component {
  static navigationOptions = {
    title: "ChatScreen"
  };
  state = {
    messages: [],
    chat: [],
    user: "",
    currentUser: ""
  };
  user = this.props.navigation.getParam("user");
  currentUser = firebase.auth().currentUser.email;

  async componentWillMount() {
    const { navigation } = this.props;
    const user = navigation.getParam("user");
    this.setState({ user: user });
    this.setState({ currentUser: firebase.auth().currentUser.email });

    // go to db and get all the Sender Messages
    db.collection("Chat")
      // .where("Sender", "==", this.state.currentUser)
      // .orderBy("Date")
      .onSnapshot(async querySnapshot => {
        let chat = [];
        querySnapshot.forEach(doc => {
          chat.push({ id: doc.id, ...doc.data() });
        });
        await this.setState({ chat });
        console.log("Total Chat Messages : ", this.state.chat);
      });
  }

  render() {
    return (
      <View>
        {console.log("currentUser is ", this.state.currentUser)}
        {console.log("ChattingWith ", this.state.user)}
        {this.state.chat.map(m => (
          <Text key={m.id}>
            {m.Sender === this.state.currentUser &&
              m.Receiver === this.state.user && (
                <Text style={{ fontSize: 20 }}>
                  {" "}
                  {this.state.currentUser} : {m.Message}{" "}
                </Text>
              )}

            {m.Sender === this.state.user &&
              m.Receiver === this.state.currentUser && (
                <Text style={{ color: "blue" }}>
                  {" "}
                  {this.state.user} : {m.Message}{" "}
                </Text>
              )}
          </Text>
        ))}
      </View>
    );
  }
}
