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

import { DatePickerDialog } from 'react-native-datepicker-dialog'

import moment from 'moment';
// import "react-datepicker/dist/react-datepicker.css";
import CalendarPicker from 'react-native-calendar-picker';




export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar ',

  };
  state = {
    event: [],
    chosenDate: '',
    Description: "",
    Start_Time: ""
  }
  Event = [];
  constructor(props) {
    super(props);
    this.state = {
      //set value in state for start and end date
      selectedStartDate: null,
      selectedEndDate: null,
      DateText: '',
      DateHolder: null
    };
    this.onDateChange = this.onDateChange.bind(this);
    // this.handleChange = this.handleChange.bind(this);
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


  //If we split the Calendar Date and get the Month and year and date ex: month: Mar, year.. , date 19
  // and split the date we have in the database to the same way
  //then compare if this is equal to that would it work??? 


  componentWillMount() {
    // go to db and get all the users
    db.collection("Event")
      .onSnapshot(querySnapshot => {
        let event = []
        querySnapshot.forEach(doc => {
          event.push({ id: doc.id, ...doc.data() })
        })
        this.setState({ event })
        console.log("Current events: ", this.state.event.length)
      })

  }

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(2018, 1, 1); // Min date
    const maxDate = new Date(2050, 6, 3); // Max date
    const startDate = selectedStartDate ? selectedStartDate.format('MMMM DD, YYYY') : ''; //Start date
    const endDate = selectedEndDate ? selectedEndDate.toString() : ''; //End date
    const todayDate = startDate;


    return (
      <View style={styles.container}>
        {

          this.state.event.map(v =>
            <View key={v.id}>
              <Text>  {v.Description} </Text>
            </View>
          )
        }
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
          <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >

            {/* <Button style={styles.datePickerBox}> */}

            <Text style={styles.datePickerText}>Chosen Date: {this.state.DateText}</Text>

            {/* </Button> */}

          </TouchableOpacity>


          {/* Place the dialog component at end of your views and assign the references, event handlers to it.*/}
          <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
          <View style={{ padding: 16 }}>
            <Text style={{ padding: 16 }}>SELECTED START DATE :</Text>
            <Text style={{ padding: 16 }}>{startDate} </Text>

            <Text>{this.state.chosenDate}</Text>
            {/* {this.state.Events.map(ev =>(
            <View key={ev.id}>
           <Text>{ev.Start_Time == startDate ? "It Works" : "Failed"}</Text>

           </View>
          ))} */}

            {/* {startDate === this.state.event.Start_Time &&
              <Text>  {this.state.event.Description} </Text>
            } */}

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
});
