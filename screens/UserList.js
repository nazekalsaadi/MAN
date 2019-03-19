import React from 'react';
import { Image, Button, TextInput, Text, View, ScrollView, StyleSheet } from 'react-native';
import firebase from 'firebase'
import functions from 'firebase/functions'
import db from '../db.js'
export default class UserList extends React.Component {
    static navigationOptions = {
        title: 'UserList',
    };

    state = {
        Role: "",
        FirstName: "",
        LastName: "",
        GroupNo: "",
        user: []

    }
    User = []
    componentDidMount() {
        // go to db and get all the users
        db.collection("User")
            .onSnapshot(querySnapshot => {
                let user = []
                querySnapshot.forEach(doc => {
                    user.push({ id: doc.id, ...doc.data() })
                })
                this.setState({ user })
                console.log("Current users: ", this.User.length)
            })
    }

    avatarURL = (UserName) => {
        return "avatars%2F" + this.state.user.find(u => u.id === UserName).Avatar.replace("@", "%40")
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {/* {this.state.user.map(u => <Text>{u.LastName}</Text>)} */}
                    {
                        this.state.user.map(v =>
                            <Text style={{ fontSize: 20 }} key={v.id}>
                                <Image
                                    style={{ width: 25, height: 25 }}
                                    source={{ uri: `https://firebasestorage.googleapis.com/v0/b/manproject-8a2c9.appspot.com/o/${this.avatarURL(v.UserName)}?alt=media&token=a1e02d9e-3e8c-4996-973f-2c7340be54d5` }}
                                />
                                {/* <Text style={{ fontWeight: "bold" }}>{this.User.find(u => console.log("id = ", u.id) || u.id === v.UserName).FirstName}</Text> */}
                                <Text>{v.FirstName}</Text>
                                <Text>{v.LastName} </Text>
                                <Text>{v.Role} </Text>
                                <Text>{v.GroupNo} </Text>
                            </Text>
                        )
                    }
                </ScrollView>
                <View style={{ flexDirection: 'row' }} keyboardShouldPersistTaps={'handled'}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
