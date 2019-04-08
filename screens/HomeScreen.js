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
import { Header, Overlay, Input, Card, Icon } from 'react-native-elements';

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
    isVisible: true,
    backgroundImage: require('../assets/images/background3.jpg'),
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
        <ImageBackground source={this.state.backgroundImage} style={{ width: '100%', height: '100%' }}>




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

       <View style={styles.progress}>
            <ProgressCircle
              percent={this.state.fullTrash}
              radius={50}
              borderWidth={8}
              color="#b30000"
              shadowColor="#000"
              bgColor="#b30000"
              style={{ marginRight: 40 }}
            >
              <Text style={{ fontSize: 18 }}>{this.state.fullTrash} {' %'}</Text>
            </ProgressCircle>
            <ProgressCircle
              percent={this.state.partialTrash}
              radius={50}
              borderWidth={8}
              color="#ff751a"
              shadowColor="#000"
              bgColor="#ff751a"
              style={{ marginRight: 40 }}
            >
              <Text style={{ fontSize: 18 }}>{this.state.partialTrash} {' %'}</Text>
            </ProgressCircle>

            <ProgressCircle
              percent={this.state.emptyTrash}
              radius={50}
              borderWidth={8}
              color="#00b36b"
              shadowColor="#000"
              bgColor="#00b36b"
              style={{ marginRight: 40 }}
            >

              <Text style={{ fontSize: 18 }}>{this.state.emptyTrash}{' %'}</Text>
            </ProgressCircle>
          </View>


        </ImageBackground>
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          // overlayBackgroundColor="#330011"
          width="auto"
          height="auto"

        >

          <Card
            title='HELLO WORLD'
          >
            {this.state.motivate.map(m => (
              m.id === this.state.messageNeeded &&
              <Text style={{ marginBottom: 10 }}>{m.message}</Text>

            ))}
            
              
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='VIEW NOW' 
              onPress={isVisible => this.setState({isVisible: false})}/>

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
