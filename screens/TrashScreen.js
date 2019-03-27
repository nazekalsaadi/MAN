import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput
} from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import {
  Ionicons,
  Octicons,
  Foundation,
  Entypo,
  Feather
} from "@expo/vector-icons";
import db from "../db";
import MapView from "react-native-maps";

const { width, height } = Dimensions.get("window");

export default class TrashScreen extends React.Component {
  state = {
    Trash: [],
    region: {
      latitude: 25.3548,
      longitude: 51.1839,
      latitudeDelta: 0.09,
      longitudeDelta: 0.09
    }
  };

  componentDidMount() {
    // go to db and get all the users

    db.collection("Trash").onSnapshot(async querySnapshot => {
      const Trash = [];
      querySnapshot.forEach(doc => {
        Trash.push({ id: doc.id, ...doc.data() });
      });
      await this.setState({ Trash });
    });
  }

  render() {
    listOfImages = [
      require("../assets/images/Empty.png"),
      require("../assets/images/Full.png"),
      require("../assets/images/Partial.png")
    ];
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.region}
          showsBuildings
          showsCompass
          showsMyLocationButton
          showsScale
          CustomMapStyle={myMapStyle}

          //  style={{  width: width }}
        >
          {this.state.Trash.map((marker, index) => {
            return (
              (CityCoordinate = {
                latitude: marker.Location._lat,
                longitude: marker.Location._long
              }),
              console.log("MapView Trash: ", this.state.Trash),
              (
                <TouchableOpacity onPress={console.log("hi")} key={index}>
                  <MapView.Marker
                    key={index}
                    coordinate={CityCoordinate}
                    onPress={() =>
                      this.props.navigation.navigate("Settings", {
                        place: marker.City
                      })
                    }
                  >
                    {marker.Status === "Empty" ? (
                      <Image
                        source={listOfImages[1]}
                        style={{
                          width: (5 * width) / 100,
                          height: (5 * height) / 100
                        }}
                      />
                    ) : marker.Status === "Full" ? (
                      <Image
                        source={listOfImages[0]}
                        style={{
                          width: (5 * width) / 100,
                          height: (5 * height) / 100
                        }}
                      />
                    ) : (
                      marker.Status === "Partial" && (
                        <Image
                          source={listOfImages[2]}
                          style={{
                            width: (5 * width) / 100,
                            height: (5 * height) / 100
                          }}
                        />
                      )
                    )}
                    {console.log(`../assets/images/${marker.Status}.png`)}
                    <MapView.Callout>
                      <View>
                        <Text style={styles.calloutView}>
                          Status : {marker.Status}
                        </Text>

                        {/* <TextInput
                          style={styles.calloutSearch}
                          placeholder={"Search"} */}
                      </View>
                    </MapView.Callout>
                  </MapView.Marker>
                </TouchableOpacity>
              )
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  calloutView: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: 20
  },
  calloutSearch: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0
  }
});
const myMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#ebe3cd"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#523735"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f1e6"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9b2a6"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#dcd2be"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ae9e90"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#93817c"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a5b076"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#447530"
      }
    ]
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f1e6"
      },
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#fdfcf8"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#709bdc"
      },
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#f8c967"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#e9bc62"
      },
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#e98d58"
      }
    ]
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#db8555"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#0d310e"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d0a01"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8f7d77"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ebe3cd"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#b9d3c2"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#92998d"
      }
    ]
  }
];
