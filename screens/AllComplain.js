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
import Communications from 'react-native-communications';
import { MonoText } from '../components/StyledText';
import firebase from 'firebase'
import db from '../db.js'
import { Header, Overlay, Input, Card } from 'react-native-elements';
export default class Complain extends React.Component {
  static navigationOptions = {
    title: 'AllComplain',
   
    headerStyle: {
      backgroundColor: '#e6e6e6',
    },
    headerTintColor: '#000000',

  };

  state = {
    isVisible: false,
    complain: "",
    message: "",
    currentUser: "",
    backgroundImage: require('../assets/images/q5!.jpg')
  }
  Complain = []
  componentDidMount() {
    this.setState({ currentUser: firebase.auth().currentUser.email })
    // go to db and get all the users
    db.collection("Complain")
      .onSnapshot(querySnapshot => {
        let complain = []
        querySnapshot.forEach(doc => {
          complain.push({ id: doc.id, ...doc.data() })
        })
        this.setState({ complain })
        console.log("Current Complain: ", this.Complain.length)
      })
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
  addComplain = async () => {
    await db.collection('Complain').doc().set({
      userId: this.state.currentUser,

      message: this.state.message
      // Start_Date: this.state.Users.Shifts.Start_Date,
      // End_Date: this.state.Users.Shifts.End_Date
    })
    this.setState({ isVisible: true })
  }
  render() {

    return (
      <View style={{ justifyContent: "flex-start", alignItems: "center", }}>
        <ImageBackground source={this.state.backgroundImage} style={{ width: '100%', height: '100%' }}>
          <View style={styles.welcomeContainer} >
            <Image
              source={
                require('../assets/images/qLogo.png')

              }
              style={styles.welcomeImage}
            />
              {this.state.complain.map(g => (
          <ListItem
            key={g.id}
            title={g.userId}
            subtitle={g.message}
            leftAvatar={{ source: { uri: `https://firebasestorage.googleapis.com/v0/b/manproject-8a2c9.appspot.com/o/${this.avatarURL(g.uerId)}?alt=media&token=a1e02d9e-3e8c-4996-973f-2c7340be54d5` } }}
            onPress={() =>
              this.props.navigation.navigate(
                "oneComplain",
                {
                  user: g.id
                },
                console.log(g.id)
              )
            }
          >
            <Text>
              From : {g.userId}
              <Text>{`/n`} </Text>
              Complain: {g.message}
            </Text>
          </ListItem>
        ))}


     
           
          </View>
        </ImageBackground>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#25a868",
    height: 200,
  },
  welcomeImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',


  },
  welcomeContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 100,
    marginBottom: 150,
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
  input: {
    height: "20%",
    width: "80%",
    backgroundColor: '#330011',
    marginBottom: 10,
    padding: 10,
    color: '#fff',
    borderRadius: 50,
    borderColor: "#330011",
    fontWeight: '800',
    alignItems: 'center',
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
