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

    }
    users = []

    componentDidMount() {
        // go to db and get all the users
        db.collection("User")
            .onSnapshot(querySnapshot => {
                this.users = []
                querySnapshot.forEach(doc => {
                    this.users.push({ id: doc.id, ...doc.data() })
                })
                console.log("Current users: ", this.users.length)
                console.log("ALL users: ", this.users)
            })
    }

    avatarURL = (UserName) => {
        return "avatars%2F" + this.users.find(u => u.id === UserName).Avatar.replace("@", "%40")
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        this.users.map(v =>
                            <Text style={{ fontSize: 20 }} key={v.id}>
                                <Image
                                    style={{ width: 25, height: 25 }}
                                    source={{ uri: `https://firebasestorage.googleapis.com/v0/b/manproject-8a2c9.appspot.com/o/${this.avatarURL(v.UserName)}?alt=media&token=a1e02d9e-3e8c-4996-973f-2c7340be54d5` }}
                                />
                                <Text style={{ fontWeight: "bold" }}>{this.users.find(u => console.log("id = ", u.id) || u.id === v.UserName).FirstName}</Text>
                                <Text> </Text>
                                <Text>{v.Role}</Text>
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
