import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase'
import db from '../db.js'
export default class UserList extends Component {
    state = {
        users: []
    }
    // componentDidMount() {
    //     // go to db and get all the users
    //     db.collection("users")
    //         .onSnapshot(querySnapshot => {
    //             this.state.users = []
    //             querySnapshot.forEach(doc => {
    //                 this.users.push({ id: doc.id, ...doc.data() })
    //             })
    //             console.log("Current users: ", this.users.length)
    //         })
    // }
    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={[
                        { title: 'GroupA', data: this.state.users.find(u => u.GroupNo === "1") },
                        { title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
                    ]}
                    renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => SectionListBasics);
