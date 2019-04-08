import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { Button, Input, Icon } from 'react-native-elements';

import db from "../db.js";
import firebase from "firebase";
export default class ChatScreen extends React.Component {
  static navigationOptions = {
    title: "ChatScreen"
  };
  state = {
    messages: [],
    Text: "",
    chat: [],
    user: "",
    currentUser: "admin@admin.com"
  };
  user = this.props.navigation.getParam("user");
  currentUser = firebase.auth().currentUser.email;

  async componentWillMount() {
    const { navigation } = this.props;
    const user = navigation.getParam("user");
    this.setState({ user: user });
    //  this.setState({ currentUser: firebase.auth().currentUser.email });

    // go to db and get all the Sender Messages
    db.collection("Chat")
      // .where("Sender", "==", this.state.currentUser)
      .orderBy("Date")
      .onSnapshot(async querySnapshot => {
        let chat = [];
        querySnapshot.forEach(doc => {
          chat.push({ id: doc.id, ...doc.data() });
        });
        await this.setState({ chat });
        console.log("Total Chat Messages : ", this.state.chat);
      });
  }

  Send = async(message) =>{
    await db.collection("Chat").doc().set({Sender: this.state.currentUser, Receiver: this.state.user, Message: message,Date: Date.now()})
  }

  render() {
    return (
      <View>
        <ScrollView>
          {console.log("currentUser is ", this.state.currentUser)}
          {console.log("ChattingWith ", this.state.user)}
          {this.state.chat.map(m => (
            <View key={m.id}>
              {m.Sender === this.state.currentUser &&
                m.Receiver === this.state.user && (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={{ backgroundColor: "lightblue", color: "white" }}>
                      {" "}
                      {m.Message}{" "}
                    </Text>
                  </View>
                )}

              {m.Sender === this.state.user &&
                m.Receiver === this.state.currentUser && (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={{ backgroundColor: "lightgrey", color: "white" }}>
                      {" "}
                      {m.Message}{" "}
                    </Text>
                  </View>
                )}
            </View>
          ))}
          <View style={styles.send}>
            <Input
              placeholder='Type Here'
              leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
            />
            <Button
              icon={
                <Icon
                  name="arrow-right"
                  size={15}
                  color="white"
                />
              }
              title="Button with icon component"
            />
          </View>
        </ScrollView>

        <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.Text}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Write Message Here"
              onChangeText={Text => this.setState({ Text })}
            />

            <TouchableOpacity onPress={this.Send}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 15
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  Sender: {
    textAlign: "right"
    // backgroundColor : "lightgreen"
  },
  Receiver: {
    textAlign: "left"
    // backgroundColor : "lightblue"
  },
  header: {
    height: 80,
    backgroundColor: "lightseagreen",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24
  },
  row: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  row1: {
    flexDirection: "row-reverse",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10
  },
  avatar1: {
    borderRadius: 20,
    width: 40,
    height: 40
    // marginLeft: 10
    // marginLeft: 90
  },
  rowText: {
    flex: 1
  },
  message: {
    fontSize: 18
  },
  message1: {
    fontSize: 18,
    // textAlign : "right",
    paddingLeft: "70%"
  },
  sender: {
    fontWeight: "bold",
    paddingRight: 10
  },
  sender1: {
    fontWeight: "bold",
    // paddingLeft: 90,
    paddingLeft: "50%"
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#eee"
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1
  },
  send: {
    alignSelf: "center",
    color: "lightseagreen",
    fontSize: 16,
    fontWeight: "bold",
    padding: 20
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  header: {
    backgroundColor: "grey",
    height: 50
  },
});
