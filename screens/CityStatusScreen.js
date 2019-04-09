import React from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  FlatList
} from "react-native";
import db from "../db";
import { Card, ListItem, Button, CheckBox } from "react-native-elements";

export default class CityStatusScreen extends React.Component {
  static navigationOptions = {
    title: "CityStatusScreen"
  };

  state = {
    Trash: [],
    Group: -1,
    RservedGroups: [],
    Users: [],
    checked: false
  };

  componentDidMount() {
    const { navigation } = this.props;
    const place = navigation.getParam("place");
    console.log("Place = ", place);
    // go to db and get all the Trashes
    db.collection("Trash")
      .where("City", "==", place)
      .onSnapshot(async querySnapshot => {
        const Trash = [];
        querySnapshot.forEach(doc => {
          Trash.push({ id: doc.id, ...doc.data() });
        });
        await this.setState({ Trash });
      });

    // go to db and get the Group
    db.collection("Group")
      .where("City", "==", place)
      .onSnapshot(async querySnapshot => {
        const Groups = [];
        querySnapshot.forEach(doc => {
          Groups.push({ id: doc.id, ...doc.data() });
          this.setState({ Group: doc.id });
        });
        await this.GetUsers()
      });

    // go to db and get all the Trashes
    db.collection("Group")
      .where("ReserveCity", "==", place)
      .onSnapshot(async querySnapshot => {
        const RservedGroups = [];
        querySnapshot.forEach(doc => {
          RservedGroups.push({ id: doc.id, ...doc.data() });
        });
        await this.setState({ RservedGroups });
        console.log("groupssss: ", RservedGroups)
      });

  }

  GetUsers = async () => {

    // go to db and get all the Users
    db.collection("User")
      .where("GroupNo", "==", this.state.Group)
      .onSnapshot(async querySnapshot => {
        const Users = [];
        querySnapshot.forEach(doc => {
          Users.push({ id: doc.id, ...doc.data() });
        });
        console.log("Users : ", Users)
        await this.setState({ Users });
      });
  }
  handleEmpty = async (id) => {
    await db.collection('Trash').doc(id).update({ Level: 0 })

    // await db.collection('TrashHistory').doc().set(
    //   {
    //     Trash_id: this.state.Trash.id,
    //     Date: new Date(),
    //     City: place,
    //     GroupNo: this.state.Group
    //   }
    // )
    this.setState({ checked: true })
  }
  render() {
    return (
      <View>
        <ScrollView>
          <Card>
            <Text style={{ textAlign: "center", fontWeight: "600" }}>Group Number : {this.state.Group}</Text>
            <Text style={{ textAlign: "center", fontWeight: "600" }}>Assistant Groups :  {
              this.state.RservedGroups.map(g =>
                <Text key={g.id}>{g.id} </Text>
              )}
            </Text>
          </Card>
          <Card>
            <Text style={{ textAlign: "center", fontWeight: "600" }}> Trash List </Text>
            <FlatList
              data={this.state.Trash}
              renderItem={({ item }) => <Text style={{ textAlign: "center" }}>{item.City} has a trash with level |  {item.Level}% |  {item.Status}</Text>}
            />
          </Card>
          <Card>
            <Text style={{ textAlign: "center", fontWeight: "600" }}> Users List </Text>

            <FlatList
              data={this.state.Users}
              renderItem={({ item }) => <Text style={{ textAlign: "center" }}>Name : {item.FirstName} {item.LastName}  |  Role : {item.Role}</Text>}
            />
          </Card>


          {this.state.Trash.map(t => (

            <CheckBox
              title='Click Here Empty the Trush'
              checkedColor='red'
              // checkedIcon={<Image source={require("../assets/images/checked.png")} />}
              checked={this.state.checked}
              onPress={() => this.handleEmpty(t.id)}
            />

          ))}
        </ScrollView>
      </View>
    );
  }
}
