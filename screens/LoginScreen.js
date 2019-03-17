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
  Alert
} from 'react-native';
import { WebBrowser } from 'expo';
import { ImagePicker } from 'expo';
import firebase from 'firebase'

import { MonoText } from '../components/StyledText';
import db from '../db.js'


export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    UserName: "",
    password: ""

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
      if (this.state.UserName === "admin@admin.com") {
        await firebase.auth().signInWithEmailAndPassword(this.state.UserName, this.state.password)
        { this.props.navigation.navigate('HomeScreen') }
        if (this.state.Avatar) {
          Avatar = this.state.UserName
          await uploadImageAsync("Avatars", this.state.Avatar, this.state.UserName)
          // await db.collection('User').doc(this.state.UserName).update({ Avatar })
        }
        await db.collection('User').doc(this.state.UserName).update({ online: true })

        // if (this.state.name) {
        //   await db.collection('User').doc(this.state.UserName).update({ name: this.state.name })
        // }
        // console.log("Avatar upload: ", result)
      }
      else if (this.state.UserName !== "admin@admin.com" && this.state.UserName !== "") {
        { this.props.navigation.navigate('HomeScreen') }
      }
      else {
        Alert.alert(
          'Error UnValid Username/Password', "Please Enter a Valid Username/Password",

          [

            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
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
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.contentContainer}> */}
        <View style={styles.welcomeContainer}>
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

          <Button onPress={this.Login} title="Login" color="black" />
          {/* <Button onPress={this.pickAvatar} title="Select Avatar" style={{ width: 100, paddingTop: 20 }} /> */}
          <Button onPress={this.Register} title="Register" style={{ width: 100, paddingTop: 20 }} />

        </View>
      </View>

      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1bee7',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 300,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
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
