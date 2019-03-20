import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Ionicons, Octicons, Foundation, Entypo, Feather } from '@expo/vector-icons';

import MapView from 'react-native-maps';


const NODE1_LATITUDE = 25.3607; //cna
const NODE1_LONGITUDE = 51.4811;

const NODE2_LATITUDE = 25.314; // education city
const NODE2_LONGITUDE = 51.4416;

const NODE3_LATITUDE = 25.2606; // Hamad airport
const NODE3_LONGITUDE = 51.6138;

const NODE4_LATITUDE = 25.3193; // Tornado tawer
const NODE4_LONGITUDE = 51.528;

const NODE5_LATITUDE = 25.2604; // Villaggio mall
const NODE5_LONGITUDE = 51.4432;

const { width, height } = Dimensions.get("window");

export default class MapScreen extends React.Component {

  state = {
    markers: [
      {
        coordinate: {
          latitude: NODE1_LATITUDE,
          longitude: NODE1_LONGITUDE,
          place: "CNA"
        }
      },
      {
        coordinate: {
          latitude: NODE2_LATITUDE,
          longitude: NODE2_LONGITUDE
        }
      },
      {
        coordinate: {
          latitude: NODE3_LATITUDE,
          longitude: NODE3_LONGITUDE
        }
      },
      {
        coordinate: {
          latitude: NODE4_LATITUDE,
          longitude: NODE4_LONGITUDE
        }
      },
      {
        coordinate: {
          latitude: NODE5_LATITUDE,
          longitude: NODE5_LONGITUDE
        }
      }
    ],
    region: {
      latitude: 25.55,
      longitude: 51.27,
      latitudeDelta: 0.9,
      longitudeDelta: 0.9
    },
    Cities:[]
  }

  componentDidMount() {
    // go to db and get all the users
    db.collection("Cities")
      .onSnapshot(querySnapshot => {
        this.Cities = []
        querySnapshot.forEach(doc => {
          this.users.push({ id: doc.id, ...doc.data() })
        })
        console.log("Current Cities: ", this.Cities.length)
      })
    }

  render() {
    listOfImages = [
      require("../assets/images/red.png"),
      require("../assets/images/yellow.png"),
      require("../assets/images/green.png")
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
          {this.state.Cities.map((marker, index) => {
            return (
              CityCoordinate= {
                latitude: marker.Latitude,
                longitude: marker.Longitude,
                place: marker.Name
              },
              <TouchableOpacity onPress={console.log('hi')} key={index}>
                <MapView.Marker
                  key={index}
                  coordinate={CityCoordinate}
                  onPress={() => this.props.navigation.navigate('Settings', { place: marker.place })}>



                  <Image source={listOfImages[index]} style={{
                    width: (5 * width) / 100,
                    height: (5 * height) / 100
                  }} />

                </MapView.Marker>
              </TouchableOpacity>
            );
          })}
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: 'center',

    }
  }
)
const myMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]