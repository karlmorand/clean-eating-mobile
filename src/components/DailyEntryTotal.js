import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  ScrollView,
  AppState,
  ActivityIndicator,
  Platform
} from "react-native";
import moment from "moment";

class DailyEntryTotal extends Component {
  constructor(props) {
    super(props);
    console.log("MOUNTED TOTAL");
  }

  render() {
    if (Platform.OS === "ios") {
      return (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {this.props.date && moment(this.props.date).format("ddd MMM Do")}
          </Text>
          {this.props.loading ? (
            <Text style={styles.title}>
              Total points:
              <ActivityIndicator
                size="large"
                color="white"
                style={styles.smallLoading}
              />
            </Text>
          ) : (
            <Text style={styles.title}>
              Total points: {this.props.entryTotal}
            </Text>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {this.props.date && moment(this.props.date).format("ddd MMM Do")}
          </Text>
          {this.props.loading ? (
            <Text style={styles.title}>Total points:</Text>
          ) : (
            <Text style={styles.title}>
              Total points: {this.props.entryTotal}
            </Text>
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
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
  smallLoading: {
    width: 20,
    height: 28,
    marginLeft: 5
  }
});

export default DailyEntryTotal;
