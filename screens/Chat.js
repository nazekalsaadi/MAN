import React, { Component } from "react";
import { Text, View, Image, StyleSheet, Button, FlatList } from "react-native";
import {
    Ionicons,
    Octicons,
    Foundation,
    Entypo,
    Feather
} from "@expo/vector-icons";
import {
    ListItem,
    Header,
    Badge,
    Divider,
    Avatar,
    SearchBar
} from "react-native-elements";
export default class Chat extends React.Component {
    static navigationOptions = {
        title: 'Chat',
    };

    state = {
        Role: "",
        FirstName: "",
        LastName: "",
        GroupNo: "",
        chat: []
    };
    Chat = [];

    componentDidMount() {
        // go to db and get all the users
        db.collection("Chat").onSnapshot(querySnapshot => {
            let chat = [];
            querySnapshot.forEach(doc => {
                chat.push({ id: doc.id, ...doc.data() });
            });
            this.setState({ chat });
            console.log("Current users: ", this.Chat.length);
        });
    }


    // updateSearch = search => {
    //     this.setState({ search });
    // };

    // searchForMatch = firstname => {
    //     const regex = new RegExp(`.*${this.state.search}.*`, "ig");
    //     const match = regex.test(firstname);
    //     return match;
    // };
    keyExtractor = (item, index) => index
    handleChat = (item) => {
        for (i = 0; i < item.Users.length; i++) {
            console.log("the Users in chat are ", item.Users[i])
            if (item.Users[i] === firebase.auth().currentUser.email) {
                check = true
            }
        }

        if (check == true) {
            return (
                <View>
                    <ListItem
                        onPress={() => this.props.navigation.navigate("ChatList", {
                            data: item.id, Users: item.Users, title: item.Title
                        })}
                        leftAvatar={{ source: { uri: `https://firebasestorage.googleapis.com/v0/b/manproject-8a2c9.appspot.com/o/${this.avatarURL(firebase.auth().currentUser.email)}?alt=media&token=a1e02d9e-3e8c-4996-973f-2c7340be54d5`, activeOpacity: 0.9 } }}
                        title={item.Title}
                        titleStyle={{ textAlign: "left" }}
                        subtitle={item.Title}

                    />
                    <Divider style={{ backgroundColor: 'black' }} />
                </View>)
        }
    }
    render() {
        console.log("the chatttttt: ", this.state.chat)
        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{ backgroundColor: 'yellow' }}
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
        flex: 1
    },
    divider: {
        backgroundColor: "gray",
        width: 600,
        alignSelf: "center"
    }
});
