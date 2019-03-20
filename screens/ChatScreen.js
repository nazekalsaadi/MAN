import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import db from '../db.js'
import firebase from 'firebase'
import functions from 'firebase/functions'
import { Image, Button, TextInput, Text, View, ScrollView, StyleSheet } from 'react-native';
export default class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat Room ',

  };
  state = {
    message: "",
    chats: []
  }
  users = []
  send = async () => {
    const addMessage = firebase.functions().httpsCallable('addMessage')

    const result = await addMessage({ message: this.state.message })
    this.setState({ message: "" })
  }
  componentDidMount() {
    db.collection("Chat")
      .orderBy("time")
      .onSnapshot(querySnapshot => {
        let chats = []
        querySnapshot.forEach(doc => {
          chats.push({ id: doc.id, ...doc.data() })
        })
        this.setState({ chats })
        console.log("Current messages: ", chats.length)
      })


    db.collection("User")
      .onSnapshot(querySnapshot => {
        this.users = []
        querySnapshot.forEach(doc => {
          this.users.push({ id: doc.id, ...doc.data() })
        })
        console.log(this.users)
        console.log("Current users: ", this.users.length)
      })
  }

  // onSend = async (message) => {
  //   console.log("Current Message : ", message)
  //   const addMessage = firebase.functions().httpsCallable('addMessage')
  //   const result = await addMessage({ message })
  //   // this.setState({ message: "" })

  //   // this.setState(previousState => ({
  //   //   messages: GiftedChat.append(previousState.messages, messages),

  //   // }))

  // }

  render() {
    console.log("users are", this.users)
    return (
      <View>
        <ScrollView>
          {
            this.state.chats.map(m =>
              <Text style={{ fontSize: 20 }} key={m.id}>
                {/* <Image
                  style={{ width: 25, height: 25 }}
                  source={{ uri: `https://firebasestorage.googleapis.com/v0/b/cp3700-f5264.appspot.com/o/${this.avatarURL(m.username)}?alt=media&token=c2f678a6-16ba-436b-86b9-7e7653cec231` }}
                /> */}
                {/* <Text style={{ fontWeight: "bold" }}>{this.users.length !== 0 && this.users.find(u => u.UserName === m.UserName).FirstName}</Text> */}
                <Text> </Text>
                <Text>{m.message}</Text>
              </Text>
            )
          }
        </ScrollView>
        <View style={{ flexDirection: 'row' }} keyboardShouldPersistTaps={'handled'}>
          <Text> </Text>
          <TextInput
            placeholder="Message"
            onChangeText={message => this.setState({ message })}
            value={this.state.message}
          />

          <Button onPress={this.send} title="Send" style={{ width: 100, paddingTop: 20 }} />
        </View>
      </View>
    )
  }
}