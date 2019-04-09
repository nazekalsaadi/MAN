import React from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground
} from "react-native";
import { ListItem } from 'react-native-elements'
import db from "../db";

export default class MyCities extends React.Component {
  static navigationOptions = {
    title: "AllCities"
  };

  state = {
    City: [],
    user:[],
    group:[],
    backgroundImage: require('../assets/images/crop.jpeg'),
  };

  avatarURL = (UserName) => {
    return "avatars%2F" + this.state.Users.find(u => u.id === UserName).Avatar.replace("@", "%40")
  }

  componentDidMount() {
    // go to db and get all the Users
    db.collection("Cities").onSnapshot(async querySnapshot => {
      const City = [];
      querySnapshot.forEach(doc => {
        City.push({ id: doc.id, ...doc.data() });
      });
      console.log("City : ", City);
      await this.setState({ City });
    });
    db.collection("User")
    .onSnapshot(querySnapshot => {
      let user = []
      querySnapshot.forEach(doc => {
        user.push({ id: doc.id, ...doc.data() })
      })
      this.setState({ user })
     
    })
    db.collection("Group")
    .onSnapshot(querySnapshot => {
      let group = []
      querySnapshot.forEach(doc => {
        group.push({ id: doc.id, ...doc.data() })
      })
      this.setState({ group })
      
    })
  }

  render() {
    return (
      <View>
        <ImageBackground source={this.state.backgroundImage} style={{ width: '100%', height: '100%' }}>
          <ScrollView>
            {/* {this.state.currentUser == "admin@admin.com" && */}
              {this.state.City.map(g => (
                <ListItem
                  key={g.id}
                  title={g.Name}
                  onPress={() =>
                    this.props.navigation.navigate(
                      "oneCityStatusScreen",
                      {
                        place: g.Name
                      },
                      console.log(g.Name)
                    )
                  }
                >
                  <Text>
                    Name : {g.Name}
                  </Text>
                </ListItem>
              ))}
              {/* :
              this.state.user.map(i => i.GroupNo === this.state.group.map(i => (i.id &&






                <ListItem
                  key={i.id}
                  title={i.City}
                  onPress={() =>
                    this.props.navigation.navigate(
                      "CityStatusScreen",
                      {
                        place: i.City
                      },
                      console.log(i.City)
                    )
                  }
                >
                 
                </ListItem>
              ))
              )
            } */}
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
