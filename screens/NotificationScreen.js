import React, { Component } from 'react';
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
   
    FlatList,
    ImageBackground
} from 'react-native';
import {
    Ionicons,
    Octicons,
    Foundation,
    Entypo,
    Feather
  } from "@expo/vector-icons";
import moment, { now } from 'moment';
import db from "../db";
import { Card, Icon, Tooltip, Badge , Header} from "react-native-elements";
export default class NotificationScreen extends Component {
    static navigationOptions = {
        title: 'NotificationScreen',
        header:null,
        headerStyle: {
            backgroundColor: '#330000',
        },
        headerTintColor: '#fff',

    };
    state = {
        Events: [],
        backgroundImage: require('../assets/images/q5!.jpg'),
    };
    componentWillMount() {
        // go to db and get all the users
        db.collection("Event")
            .onSnapshot(async querySnapshot => {
                let Events = []
                querySnapshot.forEach(doc => {
                    Events.push({ id: doc.id, ...doc.data() })
                })
                this.setState({ Events })
                console.log("Current eventsss: ", Events.length)
            })
    }
    render() {
        const todayDate = moment(new Date).format("DD MMM YYYY");
        return (
            <View style={styles.container}>
                <ImageBackground source={this.state.backgroundImage} style={{ width: '100%', height: '100%' }}>
                    <Header
                        backgroundColor="#00334d"
                        placement="center"
                        leftComponent={<Ionicons name="ios-arrow-back
                        " color="white" size={30} onPress={() => this.props.navigation.navigate('Home')} />}
                        centerComponent={{ text: 'Notification', style: { color: '#fff', fontSize: 25 } }}
                        rightComponent={<Ionicons name="ios-calendar" color="white" size={30} onPress={() => this.props.navigation.navigate('Calendar')} />}
                    />
                    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                        <View style={styles.welcomeContainer}>
                            <Image
                                source={
                                    require('../assets/images/notification.jpg')
                                }
                                style={styles.welcomeImage}
                            />
                            <Badge value="Last Events" status="warning" style={{ width: "600" }}>  </Badge>
                            <Card style={{ width: "800" }}>
                                {
                                    this.state.Events.map((v, i) => (
                                        todayDate === (moment((v.Start_Time.toDate()).toString()).format("DD MMM YYYY")) &&

                                        <View>
                                            <Image
                                                source={
                                                    require('../assets/images/notification.jpg')
                                                }
                                                style={{ width: 20, height: 20 }}

                                            />
                                            <Text style={styles.name}> Event: {v.Description} Started At {moment((v.Start_Time.toDate()).toString()).format("DD MMM YYYY")} </Text>
                                        </View>
                                    ))
                                }
                            </Card>
                        </View>
                    </ScrollView>
</ImageBackground>
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
    name: {
                    fontSize: 10,
                color: "#330000",
                fontWeight: '600',
            },
    tabBarInfoContainer: {
                    position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
        ...Platform.select({
                    ios: {
                    shadowColor: 'black',
                shadowOffset: {height: -3 },
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
