import React from 'react';
import { WebBrowser } from 'expo';
import { ImagePicker } from 'expo';
import firebase from 'firebase'
import {
    StyleSheet,
    Text,
    Platform,
    ScrollView,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    FlatList
} from "react-native";
import db from "../db";
import { Card, ListItem, Button, CheckBox, Badge } from "react-native-elements";
import { MonoText } from '../components/StyledText';
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
        currentUser: "admin@admin.com",
        flag: false,
        Users: [],
        longitude: 0,
        latitude: 0,
        Name: "",
        backgroundImage: require('../assets/images/background.jpg')
    }

    componentDidMount() {
        // go to db and get all the trashes


        // this.setState({ currentUser: firebase.auth().currentUser.email })

        db.collection("Trash").onSnapshot(async querySnapshot => {
            const Trash = [];
            querySnapshot.forEach(doc => {
                Trash.push({ id: doc.id, ...doc.data() });
            });
            this.setState({ Trash });
        });
        db.collection("User").onSnapshot(async querySnapshot => {
            const Users = [];
            querySnapshot.forEach(doc => {
                Users.push({ id: doc.id, ...doc.data() });
            });
            console.log("User : ", Users);
            await this.setState({ Users });
        });
    }

    // go to db and get all the users
    avatarURL = (UserName) => {
        return "avatars%2F" + this.state.Users.find(u => u.id === UserName).Avatar.replace("@", "%40")
    }

    CreateCity = async () => {
        await db.collection('Cities').doc().set({
            // Location: this.state.Description,.
            Location: new GeoPoint(this.state.latitude, this.state.longitude),
            Name: this.state.Name
        })

        this.setState({ flag: false })
    }

    render() {
        const Email = this.state.UserName;

        return (
            // <ScrollView style={styles.container}>

            //     {
            //         this.state.user.map(v =>
            //             <View key={v.id}>
            //                 {this.state.currentUser && v.UserName === "admin@admin.com" &&
            //                     <View>
            //                         {this.state.Trash.map(t =>

            //                             <View style={styles.body} key={t.id}>
            //                                 {t.Status === "Full" &&
            //                                     <View style={styles.bodyContent}>
            //                                         <Text style={styles.name}>{t.City + " "}</Text>



            //                                     </View>
            //                                 }
            //                             </View>
            //                         )}
            //                     </View>
            //                 }
            //             </View>
            //         )
            //     }
            // </ScrollView>
            <ScrollView>

                
                <Card title="Users and Managers List">
                    {this.state.Users.map(g => (
                        <ListItem
                            key={g.id}
                            title={g.FirstName}
                            subtitle={g.UserName}
                            leftAvatar={{ source: { uri: `https://firebasestorage.googleapis.com/v0/b/manproject-8a2c9.appspot.com/o/${this.avatarURL(g.Avatar)}?alt=media&token=a1e02d9e-3e8c-4996-973f-2c7340be54d5` } }}
                        >
                        </ListItem>
                    ))}
                </Card>

                {/* <View style={{
                    flex: 0.5,
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>
                    <Text> </Text>
                    {this.state.Trash.map(t => (
                        this.state.Trash.Status === "Full" ?
                            (
                                <Badge value={t.City} status="error" containerStyle={{ width: "100%" }} />
                            ) :
                            <Badge value={t.City} status="success" containerStyle={{ width: "100%" }} />
                    ))}

                </View> */}


                {this.state.flag === false ?

                    <Button title={"Add Event"}
                        type="outline" onPress={this.openFlag} color="#330000" />

                    : this.state.flag === true &&

                    <View>
                        <TextInput
                            style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                            autoCapitalize="none"
                            placeholder="Name"
                            onChangeText={Name => this.setState({ Name })}
                            value={this.state.Name}
                        />

                        <Text> Location </Text>
                        <TextInput
                            style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                            autoCapitalize="none"
                            placeholder="Longitude"
                            onChangeText={longitude => this.setState({ longitude })}
                            value={this.state.longitude}
                        />
                        <TextInput
                            style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                            autoCapitalize="none"
                            placeholder="Latitude"
                            onChangeText={latitude => this.setState({ latitude })}
                            value={this.state.latitude}
                        />

                        <Button title="Create New City"
                            type="outline" onPress={this.CreateCity} color="#330000" />
                    </View>
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
