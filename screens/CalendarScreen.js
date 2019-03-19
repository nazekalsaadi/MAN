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
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import db from '../db.js'
import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";
import CalendarPicker from 'react-native-calendar-picker';




export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar ',

  };
  state={
    Events:[]
  }
  events=[];
  constructor(props) {
    super(props);
    this.state = {
      //set value in state for start and end date
      selectedStartDate: null,
      selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(date) {
  //   this.setState({
  //     startDate: date
  //   });
  // }
  onDateChange(date, type) {
    //function to handle the date change 
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }

  
  }
 

  //If we split the Calendar Date and get the Month and year and date ex: month: Mar, year.. , date 19
 // and split the date we have in the database to the same way
 //then compare if this is equal to that would it work??? 

 
  componentDidMount() {
    // go to db and get all the users
    db.collection("Event")
        .onSnapshot(querySnapshot => {
            this.events = []
            querySnapshot.forEach(doc => {
                this.events.push({ id: doc.id, ...doc.data() })
            })
            this.setState({Events: this.events})
            console.log("Current events: ", this.events.length)
        })
}

  render() 
  {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(2018, 1, 1); // Min date
    const maxDate = new Date(2050, 6, 3); // Max date
    const startDate = selectedStartDate ? selectedStartDate.toString() : ''; //Start date
    const endDate = selectedEndDate ? selectedEndDate.toString() : ''; //End date
    const todayDate = startDate;
    console.log("Current events: ", this.state.Events)
    console.log("Today", todayDate)
    return (
      <View style={styles.container}>
        <CalendarPicker
          startFromSunday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          weekdays={['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']}
          months={[
            'January',
            'Febraury',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          previousTitle="<"
          nextTitle=">"
          todayBackgroundColor="#b30000"
          selectedDayColor="#330000"
          selectedDayTextColor="#fff"
          scaleFactor={375}
          textStyle={{

            color: '#000000',
          }}
          onDateChange={this.onDateChange}
        />
      
        <View style={{ padding: 16 }}>
          <Text style={{ padding: 16 }}>SELECTED START DATE :</Text>
          <Text style={{ padding: 16 }}>{startDate}</Text>
          <Text>{startDate === endDate ? "It Works" : "Failed" }</Text>
          {/* {this.state.Events.map(ev =>(
            <View key={ev.id}>
           <Text>{ev.Start_Time == startDate ? "It Works" : "Failed"}</Text>

           </View>
          ))} */}
          <Text style={{ padding: 16 }}>SELECTED END DATE : </Text>
          <Text style={{ padding: 16 }}>{endDate}</Text>
        </View>

{/* <View> <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        /> </View> */}
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
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
