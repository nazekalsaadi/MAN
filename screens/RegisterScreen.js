import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    View,
    FormLabel,
    Picker,
    Header,
    ImageBackground
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import firebase from 'firebase'
import db from '../db.js'
import { ImagePicker } from 'expo';
import t from 'tcomb-form-native';
import {uploadImageAsync} from '../ImageUtils'
export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        Users: [],
        UserName: "",
        password: "",
        Avatar: null,
        Role: "",
        Phone: "",
        Bonus: 0,
        FirstName: "",
        LastName: "",
        Status: "",
        GroupNo: 0,
        Shifts: [],
        End_Date: Date,
        Start_Date: Date,
        online: Boolean,
        backgroundImage: require('../assets/images/background.jpg')
    }
    static navigationOptions = {
        title: 'Register',
    };
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
    Register = async () => {
        let Avatar = "default.png"
        console.log("the username is", this.state.UserName)
        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.UserName, this.state.password)
            if (this.state.Avatar) {
                Avatar = this.state.UserName
                await uploadImageAsync("avatars", this.state.Avatar, this.state.UserName)
            }
            console.log("Avatar upload: ", Avatar)
            await db.collection('User').doc(this.state.UserName).set({ Avatar, online: false })


            // await db.collection('User/nazek@nazek.com/Shifts').doc().set({
            await db.collection('User').doc(this.state.UserName).set({
                UserName: this.state.UserName,
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                Avatar: this.state.UserName,
                Phone: this.state.Phone,
                GroupNo: this.state.GroupNo,
                Role: this.state.Role
                // Start_Date: this.state.Users.Shifts.Start_Date,
                // End_Date: this.state.Users.Shifts.End_Date
            })

        }
        catch (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode)
            console.log(errorMessage)
            if (errorCode == "auth/email-already-in-use") {
            }
        }

    }

    render() {
        // const Form = t.form.Form;
        // const User = t.struct({
        //     UserName: t.String,
        //     password: t.String,
        //     FirstName: t.String,
        //     LastName: t.maybe(t.String),
        //     Phone: t.String,
        //     Role: t.String,
        //     Status: t.String,
        //     GroupNo: t.Number,

        // });
        return (
            <View style={styles.container}>

                <Text style={{ color: "#330000", textAlign: "center", fontSize: 28, fontWeight: "bold", marginTop: 80 }}>Registeration Page</Text>

                <View style={styles.getStartedContainer}>
                    {
                        this.state.Avatar
                        &&
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={{ uri: this.state.Avatar }}
                        />
                    }
                    <TextInput
                        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                        autoCapitalize="none"
                        placeholder="  Email"
                        onChangeText={UserName => this.setState({ UserName })}
                        value={this.state.UserName}
                    />

                    <TextInput
                        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                        autoCapitalize="none"
                        placeholder="  Password"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />

                    <TextInput
                        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                        autoCapitalize="none"
                        placeholder="  FirstName"
                        onChangeText={FirstName => this.setState({ FirstName })}
                        value={this.state.FirstName}
                    />

                    <TextInput
                        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                        autoCapitalize="none"
                        placeholder="  LastName"
                        onChangeText={LastName => this.setState({ LastName })}
                        value={this.state.LastName}
                    />

                    <TextInput
                        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                        autoCapitalize="none"
                        placeholder="  Role"
                        onChangeText={Role => this.setState({ Role })}
                        value={this.state.Role}
                    />

                    <TextInput
                        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                        autoCapitalize="none"
                        placeholder="  GroupNo"
                        onChangeText={GroupNo => this.setState({ GroupNo })}
                        value={this.state.GroupNo}
                    />
                    <TextInput
                        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                        autoCapitalize="none"
                        placeholder="  Phone"
                        onChangeText={Phone => this.setState({ Phone })}
                        value={this.state.Phone}
                    />
                    {/* <TextInput
                        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                        autoCapitalize="none"
                        placeholder="  Status"
                        onChangeText={Status => this.setState({ Status })}
                        value={this.state.Status}
                    /> */}
                    {/* <TextInput
                            style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                            autoCapitalize="none"
                            placeholder="  Shifts"
                            onChangeText={Shifts => this.setState({ Status })}
                            value={this.state.Status}
                        /> */}
                    <Button onPress={this.Register} title="Register" type="outline"  color="#330000"/>
                    <Button onPress={this.pickAvatar} title="Select Avatar"  color="#330000" />
                </View>

            </View>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                    Learn more
        </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                    You are not in development mode, your app will run at full speed.
        </Text>
            );
        }
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
        marginTop: 80
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
});
