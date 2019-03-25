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
    FlatList,
    KeyboardAvoidingView,
    Linking,
    StatusBar,
    Dimensions
} from 'react-native';
import { WebBrowser } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import functions from 'firebase/functions';
import { MonoText } from '../components/StyledText';
import firebase, { auth, FirebaseAuth } from 'firebase';
import db from '../db.js';
import { Header, ListItem, Badge, Slider, Divider, Avatar, Card, Input, Icon } from 'react-native-elements';
import { uploadImageAsync, uploadVideoAsync } from '../ImageUtils.js'
import { ImagePicker, Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';

import ImageZoom from 'react-native-image-pan-zoom';
const { width, height } = Dimensions.get('window');
export default class ChatList extends React.Component {
    static navigationOptions = {
        header: null,
        text: ""
    };

    render() {
        return (
            <View>
                <Text>hellllloo </Text>
            </View>
        )
    }
}