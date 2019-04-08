import React from 'react';
import {
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert, Header, ImageBackground
} from 'react-native';
import { WebBrowser } from 'expo';
import { ImagePicker } from 'expo';
import firebase from 'firebase'

import { MonoText } from '../components/StyledText';
import db from '../db.js'
import AppNavigator from '../navigation/AppNavigator';
import HomeScreen from "./HomeScreen";
// const { width, height } = Dimensions.get("window");
export default class AdminDashboard extends React.Component {
    static navigationOptions = {
        title: 'AdminDashboard ',
        backgroundColor: "#cc6600"

    };
    state = {
        Trash: [],
        EmptyNo: 0,
        currentUser: "",
        flag: false,
        backgroundImage: require('../assets/images/background.jpg')
    }

    componentDidMount() {
        // go to db and get all the trashes

        db.collection("Trash").onSnapshot(async querySnapshot => {
            const Trash = [];
            querySnapshot.forEach(doc => {
                Trash.push({ id: doc.id, ...doc.data() });
            });
            this.setState({ Trash });
        });
        this.setState({ currentUser: firebase.auth().currentUser.email })
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

    pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ Avatar: result.uri });
        }
    };


    render() {
        const Email = this.state.UserName;

        return (
            <ScrollView style={styles.container}>

                {
                    this.state.user.map(v =>
                        <View key={v.id}>
                            {this.state.currentUser && v.UserName === "admin@admin.com" &&
                                <View>
                                    {this.state.Trash.map(t =>

                                        <View style={styles.body} key={t.id}>
                                            {t.Status === "Full" &&
                                                <View style={styles.bodyContent}>
                                                    <Text style={styles.name}>{t.City + " "}</Text>



                                                </View>
                                            }
                                        </View>
                                    )}
                                </View>
                            }
                        </View>
                    )
                }
            </ScrollView>
        )
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
