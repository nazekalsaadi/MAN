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
  ImageBackground,
  ProgressBarAndroid
} from 'react-native';
import { WebBrowser } from 'expo';
import NotificationScreen from '../screens/NotificationScreen';
import MyCities from '../screens/MyCities';
import ProgressCircle from 'react-native-progress-circle'
import * as Progress from 'react-native-progress';
import { MonoText } from '../components/StyledText';
import { DrawerActions } from 'react-navigation-drawer';
import firebase from 'firebase'
import db from '../db.js'
import {
  Ionicons,
  Octicons,
  Foundation,
  Entypo,
  Feather
} from "@expo/vector-icons";
import { Header, Overlay, Input, Card, Icon, SocialIcon } from 'react-native-elements';

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
    header: null,
    headerStyle: {
      backgroundColor: '#00334d',
    },
    headerTintColor: '#fff',

  };
  state = {
    UserName: "",
    currentUser: "",
    count: 4,

    isVisible: true,
    backgroundImage: require('../assets/images/background3.jpg'),

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
  Comp = async () => {
    { this.props.navigation.navigate('AllComplain') }
  }
  MyCities = async () => {
    { this.props.navigation.navigate('AllCities') }
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

  close = () => {
    this.setState({ isVisible: false })
  }
  render() {

    // const currentUser = localStorage.setItem("user", this.state.UserName);

    return (
      <View style={styles.container}>
        <ImageBackground source={this.state.backgroundImage} style={{ width: '100%', height: '100%' }}>
          <Header
            backgroundColor="#00334d"
            placement="center"

            centerComponent={{ text: 'Home', style: { color: '#fff', fontSize: 25 } }}
            rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('NotificationScreen')} />}
          />



          <View style={styles.welcomeContainer}>

            {/* <Image
              source={
                require('../assets/images/logo.jpg')

              }
              style={styles.welcomeImage}
            /> */}
            <View style={{ alignContent: "center", justifyContent: "center", flexDirection: "row", paddingVertical: 50 }}>
              <Text style={{ fontSize: "28", fontWeight: "bold", color: "#00334d" }}>
                Loged in As {this.state.currentUser}
              </Text>
            </View>
          </View>
          <ScrollView>
          <View style={{ flexDirection: "comlumn", justifyContent: "space-evenly", paddingBottom: "5%" }}>
           
              {this.state.currentUser === "admin@admin.com" ?
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>


                  <TouchableOpacity
                    style={{
                      flexDirection: "column"
                      , alignItems: 'center', justifyContent: "center",
                      height: "80%"
                      , width: "20%", marginBottom: 10, arginBottom: 20,
                      borderRadius: 10, backgroundColor: "#004080", borderColor: "white", borderWidth: 2, borderStyle: "solid"
                    }}
                    onPress={this.UserList}
                  >
                    <View style={{ alignItems: 'center', justifyContent: "center" }}>

                      <Text style={{ fontWeight: "bold", color: "white" }}> Users </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: "column", alignItems: 'center', justifyContent: "center",
                      height: "80%", width: "20%", marginBottom: 10, arginBottom: 20,
                      borderRadius: 15, backgroundColor: "#004080", borderColor: "white", borderWidth: 2, borderStyle: "solid"
                    }}
                    onPress={this.Notify}
                  >
                    <View style={{ alignItems: 'center', justifyContent: "center" }}>

                      <Text style={{ fontWeight: "bold", color: "white" }}> Notifications</Text>
                    </View>
                  </TouchableOpacity>
                  <Text>{`/n`}</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: "column", alignItems: 'center', justifyContent: "center",
                      height: "80%", width: "20%", marginBottom: 10, arginBottom: 20,
                      borderRadius: 15, backgroundColor: "#004080", borderColor: "white", borderWidth: 2, borderStyle: "solid"
                    }}
                    onPress={this.Register}
                  >
                    <View style={{ alignItems: 'center', justifyContent: "center" }}>

                      <Text style={{ fontWeight: "bold", color: "white", textAlign: "center" }}> Register User </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "column", alignItems: 'center', justifyContent: "center",
                      height: "80%", width: "20%", marginBottom: 10, arginBottom: 20,
                      borderRadius: 15, backgroundColor: "#004080", borderColor: "white", borderWidth: 2, borderStyle: "solid"
                    }}
                    onPress={this.MyCities}
                  >
                    <View style={{ alignItems: 'center', justifyContent: "center" }}>

                      <Text style={{ fontWeight: "bold", color: "white", textAlign: "center" }}> Cities </Text>
                    </View>
                  </TouchableOpacity>

                </View> :
                this.state.Users.map(u => i.Role === "manager") &&
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>


                  <TouchableOpacity
                    style={{
                      flexDirection: "column"
                      , alignItems: 'center', justifyContent: "center",
                      height: "50%"
                      , width: "20%", marginBottom: 10, borderRadius: 10, backgroundColor: "#004080", borderColor: "white", borderWidth: 2, borderStyle: "solid"
                    }}
                    onPress={this.UserList}
                  >
                    <View style={{ alignItems: 'center', justifyContent: "center" }}>

                      <Text style={{ fontWeight: "bold", color: "white" }}> My City </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: "column", alignItems: 'center', justifyContent: "center",
                      height: "80%", width: "20%", marginBottom: 10, borderRadius: 15, backgroundColor: "#004080", borderColor: "white", borderWidth: 2, borderStyle: "solid"
                    }}
                    onPress={this.Notify}
                  >
                    <View style={{ alignItems: 'center', justifyContent: "center" }}>

                      <Text style={{ fontWeight: "bold", color: "white" }}> Notifications</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: "column", alignItems: 'center', justifyContent: "center",
                      height: "80%", width: "20%", marginBottom: 10, borderRadius: 15, backgroundColor: "#004080", borderColor: "white", borderWidth: 2, borderStyle: "solid"
                    }}
                    onPress={this.Groups}
                  >
                    <View style={{ alignItems: 'center', justifyContent: "center" }}>

                      <Text style={{ fontWeight: "bold", color: "white", textAlign: "center" }}> My Group </Text>
                    </View>
                  </TouchableOpacity>

                </View>}
            </View>
          </ScrollView>
        </ImageBackground>
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          // overlayBackgroundColor="#330011"
          width="auto"
          height="auto"

        >

          <Card
            title={`Wlecome ${this.state.currentUser}`}
          >
            {this.state.motivate.map(m => (
              m.id === this.state.messageNeeded &&
              <Text style={{ marginBottom: 10 }}>{m.message}</Text>

            ))}


            <Button
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='Close'
              onPress={this.close} />

          </Card>
        </Overlay>
      </View>

    );
  }



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
