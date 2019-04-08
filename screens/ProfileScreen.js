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
} from 'react-native';
import { WebBrowser } from 'expo';
import Communications from 'react-native-communications';
import { MonoText } from '../components/StyledText';
import firebase from 'firebase'
import db from '../db.js'
export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'My Profile',
    headerStyle: {
      backgroundColor: '#e6e6e6',
    },
    headerTintColor: '#000000',

  };

  state = {
    UserName: "",
    Role: "",
    FirstName: "",
    LastName: "",
    GroupNo: "",
    user: [],
    currentUser: ""

  }
  User = []
  componentDidMount() {
    this.setState({ currentUser: firebase.auth().currentUser.email })
    // go to db and get all the users
    db.collection("User")
      .onSnapshot(querySnapshot => {
        let user = []
        querySnapshot.forEach(doc => {
          user.push({ id: doc.id, ...doc.data() })
        })
        this.setState({ user })
        console.log("Current users: ", this.User.length)
      })
  }
  Complain = async () => {
    { this.props.navigation.navigate('Complain') }

  }
  call = (phone) => {
    //handler to make a call
    const args = {
      number: phone,
      prompt: false,
    };
    call(args).catch(console.error);
  };

  avatarURL = (UserName) => {
    return "avatars%2F" + this.state.user.find(u => u.id === UserName).Avatar.replace("@", "%40")
  }
  render() {

    return (
      <ScrollView style={styles.container}>

        {
          this.state.user.map(v =>
            <View key={v.id}>
              {this.state.currentUser === v.UserName &&
                
                  <View>
                    <View style={styles.header}>
                      <Image style={styles.avatar} source={{ uri: `https://firebasestorage.googleapis.com/v0/b/manproject-8a2c9.appspot.com/o/${this.avatarURL(v.UserName)}?alt=media&token=a1e02d9e-3e8c-4996-973f-2c7340be54d5` }} />

                    </View>
                    <View style={styles.body}>
                      <View style={styles.bodyContent}>
                        <Text style={styles.name}>{v.FirstName + " "}{v.LastName + " "}</Text>
                        <Text style={styles.name2}>{v.Role + " "}</Text>
                        <Text style={styles.description}> GroupNo is {" " + v.GroupNo}</Text>

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.call(v.Phone)}>
                          <Text>Contact {v.FirstName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => Communications.text(v.Phone)}>
                          <Text>Send a text/iMessage</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer} onPress={this.Complain}>
                          <Text>Complain</Text>

                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                
              }
            </View>
          )
        }
      </ScrollView>

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
  header: {
    backgroundColor: "#25a868",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#330000",
    fontWeight: '600',
  },
  name2: {
    fontSize: 22,
    color: "#330000",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});
