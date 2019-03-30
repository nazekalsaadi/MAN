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
import firebase from "firebase";
import db from "../db.js";
export default class Chat extends React.Component {
    static navigationOptions = {
        title: 'Chat',
    };

    state = {
        Role: "",
        user: [],
        FirstName: "",
        LastName: "",
        GroupNo: "",
        chat: [],
        MainUser: "",
        otherUser: "",
        currentUser: firebase.auth().currentUser.email
    };
    Chat = [];
    User = [];
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
        db.collection("User").onSnapshot(querySnapshot => {
            let user = [];
            querySnapshot.forEach(doc => {
                user.push({ id: doc.id, ...doc.data() });
            });
            this.setState({ user });
            console.log("Current users: ", this.User.length);
        });

    }
    updateSearch = search => {
        this.setState({ search });
    };

    searchForMatch = FirstName => {
        const regex = new RegExp(`.*${this.state.search}.*`, "ig");
        const match = regex.test(FirstName);
        return match;
    };

    avatarURL = UserName => {
        return (
            "avatars%2F" +
            this.state.user.find(u => u.id === UserName).Avatar.replace("@", "%40")
        );
    };
    keyExtractor = (item, index) => index
    handleChat = ({ item }) => {
        for (i = 0; i < item.Users.length; i++) {
            console.log("the Users in chat are ", item.Users[i])
            if (item.Users[i] === firebase.auth().currentUser.email) {
                check = true
                this.state.MainUser = item.Users[i]

            } else {
                this.state.otherUser = item.Users[i]
            }

        }

        console.log("checkkk isssss", check)
        console.log("enta meen ", this.state.MainUser)
        if (check == true) {
            return (
                <View>
                    <ListItem
                        onPress={() => this.props.navigation.navigate("ChatScreen", {
                            data: item.id, User1: this.state.MainUser, User2: this.state.otherUser, Title: item.Title
                        })}
                        // leftAvatar={{ source: { uri: `https://firebasestorage.googleapis.com/v0/b/manproject-8a2c9.appspot.com/o/${this.avatarURL(this.state.currentUser)}?alt=media&token=a1e02d9e-3e8c-4996-973f-2c7340be54d5`, activeOpacity: 0.9 } }}
                        title={item.Title}
                        titleStyle={{ textAlign: "left" }}

                    />
                    <Divider style={{ backgroundColor: 'black' }} />
                </View>)
        }
    }


    render() {
        console.log("the chatttttt: ", this.state.chat)
        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Search"
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />

                <FlatList
                    data={this.state.chat}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.handleChat}
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
