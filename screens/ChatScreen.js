import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { Header, ListItem, Badge, Slider, Divider, Avatar } from 'react-native-elements';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import db from '../db.js'
export default class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat Room ',
  };
  state = {
    chat: []
  }
  // componentWillMount() {
  //   this.setState({
  //     messages: [
  //       {
  //         _id: 1,
  //         text: 'Hello from Manager',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           avatar: 'https://placeimg.com/140/140/any',
  //         },
  //       },
  //     ],
  //   })
  // }
  async componentDidMount() {
    // go to db and get all the users

    console.log("the email logged in is ", firebase.auth().currentUser.email)
    chat = []
    await db.collection(`Chat`)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          chat.push({ id: doc.id, ...doc.data() })
        })
        console.log("Current chat: ", this.state.chat.length)
        console.log("Current chat: ", this.state.chat)
        this.setState({ chat })
      })
    console.log("Current chat after method: ", this.state.chat)

  }
  keyExtractor = (item, index) => index

  renderChats = ({ item }) => {

    check = false

    for (i = 0; i < item.Users.length; i++) {
      console.log("the user is  ", item.Users[i])
      if (item.Users[i] === firebase.auth().currentUser.email) {
        check = true

      }
    }
    if (check == true) {
      // onSend(messages = []) {
      //   this.setState(previousState => ({
      //     messages: GiftedChat.append(previousState.messages, messages),
      //   }))
      // }

      return (
        // <GiftedChat
        //   messages={this.state.messages}
        //   onSend={messages => this.onSend(messages)}
        //   user={{
        //     _id: 1,
        //   }}
        // />
        <View style={styles.container}>
          <ListItem
            onPress={() => this.props.navigation.navigate("ChatList", {
              data: item.id, Users: item.Users, title: item.message

            })}
            leftAvatar={{ source: { uri: 'https://firebasestorage.googleapis.com/v0/b/manproject-8a2c9.appspot.com/o/avatars%2Fnazek%40gmail.com?alt=media&token=e959631a-e4a6-47a9-a2ce-fb373f6a159c', activeOpacity: 0.9 } }}
            title={item.message}
            titleStyle={{ textAlign: "left" }}

          />
          <Divider style={{ backgroundColor: 'black' }} />
        </View>
      )
    }
  }

  _renderItem = ({ item }) => (
    <ListItem
      id={item.id}

      {...console.log("the id", item.id)}
      onPressItem={this._onPressItem}

      title={item.message}
    />
  );
  render() {
    console.log("the data inside the render : ", this.state.chat)
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{ backgroundColor: 'blue' }}
          placement="left"
          centerComponent={{ text: "My Chats", style: { color: '#fff' } }}
          rightComponent={<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View >
              <MaterialIcons style={{ marginRight: 40 }} name='add' size={25} color='#fff' onPress={() => this.props.navigation.navigate('UserList')} />
            </View>
          </View>}
        />



        <FlatList
          data={this.state.chat}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderChats}
        />
      </View>

    );
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
