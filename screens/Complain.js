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
    title: 'Complain',
    header:null,
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
            <Card width={"90%"} >




              <Text>{'\n'}</Text>
              <Text style={{ fontWeight: "bold", color: "#330011", textAlign:"center" }}>Your Complain/Feedback  </Text>



              <TextInput style={styles.input}
                numberOfLines={4}
                autoCapitalize="none"
                onChangeText={message => this.setState({ message })}
                value={this.state.message}
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType="next"
                placeholder='Your Complain/Feedback'
                placeholderTextColor='#fff'
                 />

              <View style={{ width: "15%", height: "16%", paddingTop: "3%" }}>

                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    backgroundColor: '#330011',
                    color: "white",


                  }}
                  onPress={this.addComplain} >
                  <Text style={{ fontWeight: "bold", color: "#fff", backgroundColor: "#330011" }} >Submit </Text>
                </TouchableOpacity>

              </View>


            </Card>
            <Overlay
              isVisible={this.state.isVisible}
              windowBackgroundColor="rgba(255, 255, 255, .5)"
              // overlayBackgroundColor="#330011"
              width="auto"
              height="auto"

            >
            <Text style={{ fontWeight: "1000", color: "#330011" }} >Thank You ! </Text>
            <Text>{'\n'}</Text>
              <Text style={{ fontWeight: "1000", color: "#330011" }}>Your Complain has been Submited </Text>
              
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  backgroundColor: '#330011',
                  color: "white",


                }}
                onPress={isVisible => this.setState({ isVisible: false })} >
                <Text style={{ fontWeight: "bold", color: "#fff" }} >Close </Text>
              </TouchableOpacity>
            </Overlay>
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
