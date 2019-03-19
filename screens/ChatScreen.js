import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import db from '../db.js'
export default class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat Room ',

  };
  state = {
    messages: [],
    chat:[]
  }

  chat=[]
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }
  componentDidMount() {
    // go to db and get all the users
    db.collection("Chat")
        .onSnapshot(querySnapshot => {
            this.chat = []
            querySnapshot.forEach(doc => {
                this.chat.push({ id: doc.id, ...doc.data() })
            })
            this.setState({chat: this.chat})
            console.log("Current chat: ", this.chat.length)
        })
}


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}