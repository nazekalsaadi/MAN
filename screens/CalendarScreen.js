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
  Table,
  Row,
  Rows
} from 'react-native';
import firebase from 'firebase'
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import db from '../db.js'
import DatePicker from "react-datepicker";

import { DatePickerDialog } from 'react-native-datepicker-dialog'

import moment, { now } from 'moment';
// import "react-datepicker/dist/react-datepicker.css";
import CalendarPicker from 'react-native-calendar-picker';
import Moment from 'react-moment';

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar ',
    headerStyle: {
      backgroundColor: '#330000',
    },
    headerTintColor: '#fff',

  };

  currentUser = firebase.auth().currentUser.email;
  constructor(props) {
    super(props);
    this.state = {
      //set value in state for start and end date
      selectedStartDate: null,
      selectedEndDate: null,
      DateText: '',
      DateHolder: null,
      Events: [],
      chosenDate: '',
      Description: "",
      Start_Time: "",
      flag: false

    };
    this.onDateChange = this.onDateChange.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    // go to db and get all the users
    db.collection("Event")
      .onSnapshot(querySnapshot => {
        let Events = []
        querySnapshot.forEach(doc => {
          Events.push({ id: doc.id, ...doc.data() })
        })
        this.setState({ Events })
        console.log("Current users: ", Events.length)
      })
  }

  /**
   * Call back for dob date picked event
   *
   */

  onDatePickedFunction = (date) => {
    this.setState({
      dobDate: date,
      DateText: moment(date).format('MMM-DD-YYYY'),

    });

  }
  DatePickerMainFunctionCall = () => {

    let DateHolder = this.state.DateHolder;

    if (!DateHolder || DateHolder == null) {

      DateHolder = new Date();
      this.setState({
        DateHolder: DateHolder
      });
    }
    this.refs.DatePickerDialog.open({

      date: DateHolder,

    });
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

  CreateEvent = async () => {

    await db.collection('Event').doc().set({
      Description: this.state.Description,
      Start_Time: new Date(this.state.DateText),
      End_Time: new Date(this.state.DateText),
      Users: this.currentUser,

      // Start_Date: this.state.Users.Shifts.Start_Date,
      // End_Date: this.state.Users.Shifts.End_Date
    })

    this.setState({ flag: false })
  }
  //If we split the Calendar Date and get the Month and year and date ex: month: Mar, year.. , date 19
  // and split the date we have in the database to the same way
  //then compare if this is equal to that would it work??? 

  openFlag = () => {
    this.setState({ flag: true })
  }


  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(2018, 1, 1); // Min date
    const maxDate = new Date(2050, 6, 3); // Max date
    const startDate = selectedStartDate ? selectedStartDate.toString() : ''; //Start date
    const endDate = selectedEndDate ? selectedEndDate.toString() : ''; //End date
    const todayDate = moment(new Date).format("DD MMM YYYY");

    console.log("TOLYOM: ", todayDate)
    console.log("ekhteyari: ", this.state.Start_Time)
    return (
      <View style={styles.container}>

        <ScrollView>

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


          {/* Place the dialog component at end of your views and assign the references, event handlers to it.*/}
          <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />

          {this.state.Events.map((x, i) =>
            <ScrollView key={x.id} >
              {todayDate === (moment((x.Start_Time.toDate()).toString()).format("DD MMM YYYY")) ?

                <ScrollView style={{ backgroundColor: "#b30000", maxHeight: "100%" }}>
                  <Text style={{ color: "white", fontSize: 20, textAlign: 'left' }} > Events on {moment((x.Start_Time.toDate()).toString()).format("DD MMM YYYY")} </Text>
                  <Text style={{ color: "white", fontSize: 18, textAlign: 'left' }} > Description: {x.Description} </Text>
                  <Text style={{ color: "white", fontSize: 18, textAlign: 'left' }} > Event wil End in  {moment((x.End_Time.toDate()).toString()).format("DD MMM YYYY")} </Text>


                  <Text style={{ color: "white", fontSize: 12, textAlign: 'right' }} > Created By {x.Users} </Text>



                </ScrollView> : null

              }
              {moment(startDate).format("DD MMM YYYY") === (moment((x.Start_Time.toDate()).toString()).format("DD MMM YYYY")) &&

                <ScrollView style={{ backgroundColor: "#330000", maxHeight: "100%" }}>
                  <Text style={{ color: "white", fontSize: 20, textAlign: 'left' }} > Events on {moment((x.Start_Time.toDate()).toString()).format("DD MMM YYYY")} </Text>
                  <Text style={{ color: "white", fontSize: 18, textAlign: 'left' }} > Description: {x.Description} </Text>
                  {(todayDate) > moment((x.End_Time.toDate()).toString()).format("DD MMM YYYY") ?
                    <Text style={{ color: "white", fontSize: 18, textAlign: 'left' }} > Event Ended Since {moment((x.End_Time.toDate()).toString()).format("DD MMM YYYY")}</Text>
                    :
                    <Text style={{ color: "white", fontSize: 18, textAlign: 'left' }} > Event will End in  {moment((x.End_Time.toDate()).toString()).format("DD MMM YYYY")} </Text>
                  }

                  <Text style={{ color: "white", fontSize: 12, textAlign: 'right' }} > Created By {x.Users} </Text>
                </ScrollView>
              }


            </ScrollView>

          )}
          <View style={styles.getStartedContainer}>
            {this.state.flag === false ?

              <Button title={"Add Event"}
                type="outline" onPress={this.openFlag} color="#330000" />

              : this.state.flag === true &&

              <View>
                <TextInput
                  style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                  autoCapitalize="none"
                  placeholder="Description"
                  onChangeText={Description => this.setState({ Description })}
                  value={this.state.Description}
                />


                <TextInput
                  style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white" }}
                  autoCapitalize="none"
                  placeholder="Username"
                  onChangeText={UserName => this.setState({ currentUser })}
                  value={this.currentUser}
                />

                <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >

                  <Text style={styles.datePickerText}
                    onChangeText={Start_Time => this.setState({ Start_Time: moment(this.state.DateText).format("DD MMMM YYYY [at] hh:mm:ss") })}
                  > Event Date: {(this.state.DateText)}</Text>



                </TouchableOpacity>
                {console.log("Time5ara", moment(this.state.DateText).format("DD MMMM YYYY [at] hh:mm:ss"))}
                <Button title={"Create Event"}
                  type="outline" onPress={this.CreateEvent} color="#330000" />
              </View>
            }
          </View>
        </ScrollView>
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
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
