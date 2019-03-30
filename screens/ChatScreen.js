import React from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  Linking,
  StatusBar,
  Dimensions
} from "react-native";
import { WebBrowser } from "expo";
import { Ionicons } from "@expo/vector-icons";
import functions from "firebase/functions";
import { MonoText } from "../components/StyledText";
import firebase from "firebase";
import db from "../db.js";
import {
  Header,
  ListItem,
  Badge,
  Slider,
  Divider,
  Avatar,
  Card,
  Input,
  Icon
} from "react-native-elements";
import { uploadImageAsync } from "../ImageUtils.js";

const { width, height } = Dimensions.get("window");
export default class ChatList extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    email: "",
    Text: "",
    messages: [],
    MeTitle: "",
    Sender_id: "",
    Receiver_id: "",
    MainUser: "",
    OtherUser: "",
    Time: Date
  };
  user = "";

  async componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam("data");
    const User1 = navigation.getParam("User1");
    const User2 = navigation.getParam("User2");
    const Title = navigation.getParam("Title");
    console.log("id : ", id);
    console.log("Users Boss : ", User1);
    console.log("Other Boss : ", User2);
    console.log("title : ", Title);
    this.setState({ MeTitle: Title, MainUser: User1, OtherUser: User2 })

    console.log("the email logged in is ", firebase.auth().currentUser.email);
    this.user = firebase.auth().currentUser.email;

    db.collection(`Chat`).doc(id).collection("Messages")
      .orderBy("Time")
      .onSnapshot(querySnapshot => {
        let messages = [];
        querySnapshot.forEach(doc => {
          messages.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ messages });
        console.log("Current messages: ", this.state.messages.length);
        console.log("Current messages: ", this.state.messages);

      });
  }

  keyExtractor = (item, index) => index;

  handleChat = ({ item }) => {
    const content = String(item.Text);
    console.log("the content : ", content);
  }

  handleSend = () => {
    // await db.collection('User/nazek@nazek.com/Shifts').doc().set({
    db.collection(`Chat`).doc().collection("Messages").doc().set({
      Text: this.state.Text,
      Sender_id: this.state.currentUser,
      Time: this.state.Time
      // Start_Date: this.state.Users.Shifts.Start_Date,
      // End_Date: this.state.Users.Shifts.End_Date
    })

  }

  render() {
    console.log("the chatttttt: ", this.state.chat)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>{this.state.MeTitle}</Text>
        </View>

        {this.state.messages.map(m => (
          <View key={m.id}>

            {m.Sender_id == this.state.MainUser &&
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',

              }}>
                <Text style={{ backgroundColor: "lightblue", color: "white" }}>{m.Text}</Text>
              </View>
              ||
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
                {m.Sender_id == this.state.OtherUser &&
                  <Text style={{ backgroundColor: "lightgrey", color: "black" }}>{m.Text}</Text>
                }</View>
            }
          </View>
        ))}
        <Text style={styles.title}>
          {this.state.title}
        </Text>
        <FlatList
          data={this.state.messages}
          renderItem={this.handleChat}
        // inverted
        />
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.Text}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Write Message Here"
              onChangeText={Text => this.setState({ Text: this.state.Text })}
            />

            <TouchableOpacity onPress={this.handleSend}>
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
