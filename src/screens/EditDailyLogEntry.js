import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  ScrollView,
  AppState,
  ActivityIndicator
} from "react-native";
import { containerStyle } from "../config";
import isSameDay from "date-fns/is_same_day";
import DailyYesNo from "../components/DailyYesNo";
import DailySlider from "../components/DailySlider";
import DailyJournal from "../components/DailyJournal";
import DailyEntryTotal from "../components/DailyEntryTotal";
import axios from "axios";
import moment from "moment";
import { prodApi, devApi } from "../../config.js";

// TODO: Anytime the totalDailyPoints changes need to make an API call to store it on server, will need to have user info passed down, or pass daily points up to App

// TODO: Write a function that get's today's entry...it should be called from componentDidMount and when the app loads after being in the background (when componentDidMount isn't called)

class DailyLogEntry extends Component {
  state = {
    dailyEntry: null,
    loadingTotal: false,
    loadingEntry: true
  };

  apiUrl = __DEV__ ? devApi : prodApi;

  getDailyEntry = () => {
    console.log("GETTING DAILY ENTRY");
    const { accessToken, mongoId } = this.props.screenProps;
    const headers = { Authorization: `Bearer ${accessToken}` };
    const entryDate = this.props.date || Date.now();
    console.log(entryDate);
    axios
      .get(`${this.apiUrl}/dailyentry/${mongoId}/${entryDate}`, { headers })
      .then(res => {
        this.setState({ dailyEntry: res.data, loadingEntry: false });
      })
      .catch(err => console.log(err));
  };

  handlePointsChange = (questionId, newValue, addToTotal) => {
    if (!addToTotal) {
      newValue = -newValue;
    }
    const { accessToken, mongoId } = this.props.screenProps;
    const headers = { Authorization: `Bearer ${accessToken}` };
    const updatedAnswer = { _id: questionId, newValue: newValue };
    this.setState({ loadingTotal: true }, () => {
      axios
        .post(
          `${this.apiUrl}/dailyentry/${this.state.dailyEntry._id}`,
          { updatedAnswer },
          { headers }
        )
        .then(res => {
          this.setState({ dailyEntry: res.data, loadingTotal: false });
        })
        .catch(err => console.log(err));
    });
  };
  _handleAppStateChange = () => {
    console.log("APP STATE CHANGE in DAILY ENTRY ");
    if (!this.state.dailyEntry) {
      this.getDailyEntry();
    } else {
      const sameDay = isSameDay(this.state.dailyEntry.date, Date.now());
      if (!sameDay && AppState.currentState === "active") {
        this.setState({ loadingEntry: true }, () => {
          console.log("Updating daily entry becuase it was stale");
          this.getDailyEntry();
        });
      }
    }
  };

  getExistingEntry = entryId => {
    // TODO: Definetly need to refactor this and the getDailyEntry function
    const { accessToken, mongoId } = this.props.screenProps;
    const headers = { Authorization: `Bearer ${accessToken}` };
    axios
      .get(`${this.apiUrl}/dailyentry/existing/${entryId}`, { headers })
      .then(res => {
        this.setState({ dailyEntry: res.data, loadingEntry: false });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    //Hit the api to get today's dailyEntry
    console.log("DAILY ENTRY DID MOUNT");
    console.log(this.props.navigation);
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params
    ) {
      this.setState({ loadingEntry: true }, () => {
        this.getExistingEntry(this.props.navigation.state.params.entryId);
      });
    } else {
      AppState.addEventListener("change", this._handleAppStateChange);
      this.getDailyEntry();
    }
  }
  buildEntryListItem = question => {
    switch (question.questionType) {
      case "YESNO":
        return (
          <DailyYesNo
            title={question.questionTitle}
            description={question.description}
            answerStatus={question.currentValue ? true : false}
            maxDaily={question.maxDailyPoints}
            handlePointsChange={this.handlePointsChange}
            questionId={question._id}
            addToTotal={question.addToTotal}
            key={question._id}
          />
        );
        break;
      case "SLIDER":
        return (
          <DailySlider
            title={question.questionTitle}
            value={question.currentValue}
            handlePointsChange={this.handlePointsChange}
            description={question.description}
            maxDaily={question.maxDailyPoints}
            questionId={question._id}
            addToTotal={question.addToTotal}
            key={question._id}
          />
        );
    }
  };
  render() {
    if (!this.state.dailyEntry || this.state.loadingEntry) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <DailyEntryTotal
          loading={this.state.loadingTotal}
          date={this.state.dailyEntry.date}
          entryTotal={this.state.dailyEntry.entryTotal}
        />
        <ScrollView>
          {this.state.dailyEntry.entryQuestions.map(question =>
            this.buildEntryListItem(question)
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 23,
    color: "white"
  },
  titleContainer: {
    marginTop: 15,
    padding: 25,
    backgroundColor: "green",
    borderRadius: 15,
    height: "12%",
    alignItems: "center",
    justifyContent: "center"
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingLeft: 5,
    paddingRight: 5
  },
  smallLoading: {
    width: 20,
    height: 28,
    marginLeft: 5
  }
});

export default DailyLogEntry;
