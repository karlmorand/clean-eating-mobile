import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  ScrollView,
  AppState
} from "react-native";
import { containerStyle } from "../config";
import DailyYesNo from "../components/DailyYesNo";
import DailySlider from "../components/DailySlider";
import DailyJournal from "../components/DailyJournal";

// TODO: Anytime the totalDailyPoints changes need to make an API call to store it on server, will need to have user info passed down, or pass daily points up to App

// TODO: Write a function that get's today's entry...it should be called from componentDidMount and when the app loads after being in the background (when componentDidMount isn't called)

class DailyLogEntry extends Component {
  state = {
    dailyEntry: null
  };

  handlePointsChange = change => {
    this.setState(prevState => {
      return {
        totalDailyPoints: prevState.totalDailyPoints + change
      };
    });
  };
  _handleAppStateChange = () => {
    console.log("DAILY ENTRY APP STATE CHANGE");
  };
  componentDidMount() {
    //Hit the api to get today's dailyEntry
    console.log("DAILY ENTRY DID MOUNT");
    AppState.addEventListener("change", this._handleAppStateChange);
    // fetch(`http://localhost:4000/api/dailyentry/`, {
    // 	method: 'POST',
    // 	headers: {
    // 		Accept: 'application/json',
    // 		'Content-Type': 'application/json'
    // 	},
    // 	body: JSON.stringify({
    // 		firstParam: 'yourValue',
    // 		secondParam: 'yourOtherValue'
    // 	})
    // });
  }
  render() {
    return (
      <View style={[containerStyle, styles.container]}>
        <Text style={styles.title}>
          Today's points: {this.state.totalDailyPoints}{" "}
        </Text>
        <ScrollView>
          <DailySlider
            title="Food"
            description="How many non-compliant meals did you eat today?"
            handlePointsChange={this.handlePointsChange}
          />
          <DailyJournal
            title="Journal"
            description="Enter your daily journal"
          />
          <DailyYesNo
            title="Workouts"
            description="Did you workout today?"
            additionalNotes="You've already maxed out your workout points for this week"
            handlePointsChange={this.handlePointsChange}
          />
          <DailyYesNo
            title="Sleep"
            description="Did you meet your sleep goal last night?"
            handlePointsChange={this.handlePointsChange}
          />
          <DailyYesNo
            title="Water"
            description="Did you drink enough water today?"
            additionalNotes="Your goal is 73oz or 9 cups"
            handlePointsChange={this.handlePointsChange}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  text: {
    // fontSize: 20,
    marginBottom: 20,
    padding: 20
  },
  input: {
    height: 40,
    width: "80%",
    backgroundColor: "#ddd",
    padding: 10
  },
  title: {
    textAlign: "center",
    fontSize: 20
  }
});

export default DailyLogEntry;
