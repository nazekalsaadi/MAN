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
  ImageBackground
} from 'react-native';
import { WebBrowser } from 'expo';
import NotificationScreen from '../screens/NotificationScreen';
import ProgressCircle from 'react-native-progress-circle'
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
export default class HomeScreen extends React.Component {

  // static navigationOptions = {
  //   title: 'Home',
  //   headerStyle: {
  //     backgroundColor: '#330000',
  //   },
  //   headerTintColor: '#fff',
  //   headerRight: (
  //     <Ionicons name="ios-notifications" size={30} color="#fff" backgroundColor="#fff" onPress={() => this.props.navigation.navigate('NotificationScreen')} />
  //   ),

  // };
  static navigationOptions = {
    title: 'Home',
    drawerLabel: 'Home',
    headerStyle: {
      backgroundColor: '#e6e6e6',
    },
    headerTintColor: '#000000',

  };
  state = {
    UserName: "",
    currentUser: "",
    count: 4,
    backgroundImage: require('../assets/images/background3.jpg')
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


  async componentDidMount() {
    console.log("the email logged in is ", firebase.auth().currentUser.email)
    this.setState({ currentUser: firebase.auth().currentUser.email })
    //   chat = []
    // await db.collection(`Chat`)
    // .onSnapshot(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     chat.push({ id: doc.id, ...doc.data() })
    //   })
    //   console.log("Current chat: ", this.state.chat.length)
    //   console.log("Current chat: ", this.state.chat)
    //   this.setState({chat})

    // console.log("Current chat after method: ", this.state.chat)



  }
  render() {

    // const currentUser = localStorage.setItem("user", this.state.UserName);

    return (
      <ImageBackground source={this.state.backgroundImage} style={{ width: '100%', height: '100%' }}> 
     
        <ScrollView style={styles.container}>
       
          <View style={styles.welcomeContainer}>

            <Image
              source={
                require('../assets/images/logo.jpg')

              }
              style={styles.welcomeImage}
            />
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
          </View>
       
          <ProgressCircle
            percent={30}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{'30%'}</Text>
        </ProgressCircle>
        </ScrollView>
        </ImageBackground>


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
