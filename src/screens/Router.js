import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  InteractionManager
} from "react-native";
import { TabNavigator, TabBarBottom } from "react-navigation";
import { Icon } from "react-native-elements";

import SettingsScreen from "./SettingsScreen";
import DailyLogEntry from "./DailyLogEntry";
import Leaderboard from "./Leaderboard";
import HistoryNav from "./HistoryNav";
import History from "./History";

class Router extends Component {
  componentDidMount() {
    console.log("ROUTER MOUNTED!!!");
  }
  render() {
    const BasicApp = TabNavigator(
      {
        DailyLogEntry: {
          screen: DailyLogEntry,
          navigationOptions: {
            tabBarLabel: "Today",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="today" size={35} color={tintColor} />
            )
          }
        },
        Leaderboard: {
          screen: Leaderboard,
          navigationOptions: {
            tabBarLabel: "Leaderboard",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="show-chart" size={35} color={tintColor} />
            )
          }
        },
        HistoryNav: {
          screen: HistoryNav,
          navigationOptions: {
            tabBarLabel: "History",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="history" size={35} color={tintColor} />
            )
          }
        },
        SettingsScreen: {
          screen: SettingsScreen,
          navigationOptions: {
            tabBarLabel: "Info",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="info-outline" size={35} color={tintColor} />
            )
          }
        }
      },
      {
        swipeEnabled: true,
        tabBarComponent: TabBarBottom,
        tabBarPosition: "bottom"
      }
    );
    return (
      <BasicApp
        screenProps={{
          user: this.props.user,
          logout: this.props.logout,
          mongoId: this.props.mongoId,
          accessToken: this.props.accessToken,
          showTeamPicker: this.props.showTeamPicker
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  main: {
    // marginTop: 50,
    backgroundColor: "green"
    // flex: 1
  }
});

export default Router;
