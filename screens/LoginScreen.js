import React from 'react';
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
  Alert, Header, ImageBackground
} from 'react-native';
import { WebBrowser } from 'expo';
import { ImagePicker } from 'expo';
import firebase from 'firebase'

import { MonoText } from '../components/StyledText';
import db from '../db.js'
import AppNavigator from '../navigation/AppNavigator';
import HomeScreen from "./HomeScreen";
// const { width, height } = Dimensions.get("window");
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login ',
    backgroundColor: "#cc6600"

  };
  state = {
    UserName: "",
    password: "",
    First_Name: "",

    flag: false,
    backgroundImage: require('../assets/images/background.jpg')
  }


  pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ Avatar: result.uri });
    }
  };


  Login = async () => {
    try {

      await firebase.auth().signInWithEmailAndPassword(this.state.UserName, this.state.password)
      await db.collection('User').doc(this.state.UserName).update({ online: true })
      this.push;
      this.setState({ flag: true })
      if (this.state.UserName === "") {
        Alert.alert(
          'Error UnValid Username/Password', "Please Enter a Valid Username/Password",
          [

            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      }
      else {
        console.log("current user is", firebase.auth().currentUser.UserName)
      }
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorMessage)
    }

  }

  Register = () => {
    this.props.navigation.navigate('RegisterScreen')
  }
  // Chat = () => {
  //   this.props.navigation.navigate('Chat', {
  //     First_Name: this.state.First_Name,
  //     UserName: this.state.UserName
  //   })
  // }
  render() {
    const Email = this.state.UserName;

    return (
      <View style={styles.container}>
        {/* <ImageBackground source={this.state.backgroundImage} style={{ width: '100%', height: '100%' }}>
        </ImageBackground> */}
        {/* <View style={styles.contentContainer}> */}
        {this.state.flag === false ? (
          <View style={styles.welcomeContainer} >
            {/* <Image
            source={
              require('../assets/images/logo.jpg')
            }
            style={styles.welcomeImage}
          /> */}
            <Image
              source={
                require('../assets/images/logo.jpg')

              }
              style={styles.welcomeImage}
            />
            <TextInput
              style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
              autoCapitalize="none"
              placeholder="  Email"
              onChangeText={UserName => this.setState({ UserName })}
              value={this.state.UserName}
            />

            <TextInput
              style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
              autoCapitalize="none"
              placeholder="  Password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />

            <TouchableOpacity style={styles.buttonContainer} onPress={this.Login}>

              <Text style={{ color: "white" }}>Login</Text>

            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.buttonContainer} onPress={this.Register}>

                <Text style={{color:"white"}}>Register</Text>

              </TouchableOpacity> */}
            {/* <Button onPress={this.pickAvatar} title="Select Avatar" style={{ width: 100, paddingTop: 20 }} /> */}


          </View>
        ) :

          <AppNavigator />
        }
        {/* {console.log("Email: ", this.state.Username)} */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 150,
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
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 150,

    textDecorationColor: "white",
    borderRadius: 30,
    backgroundColor: "#330000",
  },
});
