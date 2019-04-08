import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  ProgressBarAndroid
} from 'react-native';
import { WebBrowser } from 'expo';
import NotificationScreen from '../screens/NotificationScreen';
import * as Progress from 'react-native-progress';

import { MonoText } from '../components/StyledText';
import firebase from 'firebase'
import db from '../db.js'
import {
  Ionicons,
  Octicons,
  Foundation,
  Entypo,
  Feather
} from "@expo/vector-icons";
import { Header, Icon } from "react-native-elements";
// const { width, height } = Dimensions.get("window");
import ProgressCircle from 'react-native-progress-circle'

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#330000',
    },
    headerTintColor: '#fff',
    headerRight: (
      <Ionicons name="ios-notifications" size={30} color="#fff" backgroundColor="#fff" onPress={() => this.props.navigation.navigate('NotificationScreen')} />
    ),

  };

  state = {
    UserName: "",
    currentUser: "",
    count: 4,
    Events: [],
    Users: [],
    Trashs: [],
    fullTrash: 0,
    partialTrash: 0,
    emptyTrash: 0,
    motivate: [],
    messageNeeded: "",
  }
  Register = async () => {
    { this.props.navigation.navigate('RegisterScreen') }

  }
  UserList = async () => {
    { this.props.navigation.navigate('UserList') }

  }

  Notify = async () => {
    { this.props.navigation.navigate('NotificationScreen') }
  }


  async componentWillMount() {
    console.log("the email logged in is ", firebase.auth().currentUser.email)
    this.setState({ currentUser: firebase.auth().currentUser.email })

    //Trashs
    db.collection("Trash")
      .onSnapshot(querySnapshot => {
        let Trashs = []
        querySnapshot.forEach(doc => {
          Trashs.push({ id: doc.id, ...doc.data() })
        })
        this.setState({ Trashs })
        console.log("Current Trashs: ", this.state.Trashs.length)
      })
    //motivate
    db.collection("motivate")
      .onSnapshot(querySnapshot => {
        let motivate = []
        querySnapshot.forEach(doc => {
          motivate.push({ id: doc.id, ...doc.data() })
        })
        let messageID = ""
        for (let i = 0; i < querySnapshot.docs.length; i++) {
          if (querySnapshot.docs[i].id === "Thank You For Your Hard Work") {
            messageID = querySnapshot.docs[i].data().message

          }
          this.setState({ messageNeeded: messageID })
        }
        console.log("Worked", messageID)
        this.setState({ motivate })

      })

    await this.handleTrash()
    await this.getMessage()
    //COMPLAINS
  }
  handleTrash = () => {
    console.log("im in")
    let fullness = 0;
    let partiales = 0;
    let empty = 0;
    for (let i = 0; i < this.state.Trashs.length; i++) {
      if (this.state.Trashs[i].Status === "Full") {
        fullness = fullness + 1
      }
      if (this.state.Trashs[i].Status === "Partial") {
        partiales = partiales + 1
      }
      if (this.state.Trashs[i].Status === "Empty") {
        empty = empty + 1
      }
      this.setState({ fullTrash: fullness, partialTrash: partiales, emptyTrash: empty })
    }
    console.log("full", fullness)
  }

  render() {

    // const currentUser = localStorage.setItem("user", this.state.UserName);

    return (

      <View style={styles.container}>
        {/* <Header
          placement="left"
          rightComponent={<Ionicons name="ios-notifications" size={30} color="#fff" backgroundColor="#fff" onPress={() => this.props.navigation.navigate('NotificationScreen')} />}
        /> */}
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                require('../assets/images/logo.jpg')

              }
              style={styles.welcomeImage}
            />
          </View>
          <View style={styles.progress}>
            <ProgressCircle
              percent={this.state.fullTrash}
              radius={50}
              borderWidth={8}
              color="#ffd232"
              shadowColor="#000"
              bgColor="red"
              style={{ marginRight: 40 }}
            >
              <Text style={{ fontSize: 18 }}>{this.state.fullTrash} {' %'}</Text>
            </ProgressCircle>
            <ProgressCircle
              percent={this.state.partialTrash}
              radius={50}
              borderWidth={8}
              color="#ffd232"
              shadowColor="#000"
              bgColor="yellow"
              style={{ marginRight: 40 }}
            >
              <Text style={{ fontSize: 18 }}>{this.state.partialTrash} {' %'}</Text>
            </ProgressCircle>

            <ProgressCircle
              percent={this.state.emptyTrash}
              radius={50}
              borderWidth={8}
              color="#ffd232"
              shadowColor="#000"
              bgColor="green"
              style={{ marginRight: 40 }}
            >

              <Text style={{ fontSize: 18 }}>{this.state.emptyTrash}{' %'}</Text>
            </ProgressCircle>
          </View>

          <View style={styles.getStartedContainer}>
            <Button title="Notification"
              type="outline" onPress={this.Notify} color="#330000">
              {this.state.count}
            </Button>

            {this.state.currentUser === "admin@admin.com" &&
              <View>
                <Button title="Add Users"
                  type="outline" onPress={this.Register} color="#330000" />

                <Button title="All Users"
                  type="outline" onPress={this.UserList} color="#330000" />

              </View>
            }

            {this.state.motivate.map(m => (
              m.id === this.state.messageNeeded &&
              <Text>{m.message}</Text>

            ))}
          </View>

        </ScrollView>

      </View>

    );
  }
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  progress: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 300,
    height: 150,
    resizeMode: 'contain',


  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
