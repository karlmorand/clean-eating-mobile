import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  AppState,
  ActivityIndicator
} from "react-native";
import { ListItem, ButtonGroup } from "react-native-elements";
import { containerStyle } from "../config";
import axios from "axios";

import { prodApi, devApi } from "../../config.js";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    console.log("LEADERBOARD: ", this.props.screenProps);
    this.state = {
      refreshing: false,
      selectedButtonIndex: 0,
      weeklyLeaderboard: [],
      overallLeaderboard: [],
      teamLeaderboard: []
    };
    if (__DEV__) {
      this.apiURL = devApi;
    } else {
      this.apiURL = prodApi;
    }
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    this._sub = this.props.navigation.addListener("didFocus", this._onFocus);

    this.getCurrentLeaderboard();
  }

  _onFocus = () => {
    this.setState({ refreshing: true }, () => {
      this.getCurrentLeaderboard();
    });
  };

  _handleAppStateChange = () => {
    if (AppState.currentState === "active") {
      console.log("APP STATE CHANGE in Leaderboard ");
      this.getCurrentLeaderboard();
    }
  };

  getCurrentLeaderboard = () => {
    const { accessToken, user } = this.props.screenProps;
    const headers = { Authorization: `Bearer ${accessToken}` };
    if (!user) {
      // TODO: throw a UI error here and redirect them somewhere
      return;
    }
    axios
      .get(`${this.apiURL}/leaderboard/${user.gym}`, { headers })
      .then(res => {
        res.data.overallLeaderboard.sort((a, b) => {
          return b.total - a.total;
        });
        res.data.weeklyLeaderboard.sort((a, b) => {
          return b.total - a.total;
        });
        res.data.teamLeaderboard.sort((a, b) => {
          return b.total - a.total;
        });
        this.setState({
          overallLeaderboard: res.data.overallLeaderboard,
          weeklyLeaderboard: res.data.weeklyLeaderboard,
          teamLeaderboard: res.data.teamLeaderboard,
          refreshing: false
        });
      })
      .catch(err => {
        this.setState({ refreshing: false });
        console.log(err);
      });
  };
  renderItem = ({ item }) => {
    return (
      <ListItem
        roundAvatar
        title={item.name}
        avatar={item.picture}
        titleStyle={styles.itemTitle}
        containerStyle={styles.listItem}
        badge={{
          value: item.total,
          containerStyle: styles.badgeContainer,
          textStyle: styles.badgeText
        }}
        hideChevron={true}
      />
    );
  };
  updateButtonIndex = selectedButtonIndex => {
    this.setState({ selectedButtonIndex });
  };
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.getCurrentLeaderboard();
      }
    );
  };

  _keyExtractor = (item, index) => item.id;
  listToShow = () => {
    switch (this.state.selectedButtonIndex) {
      case 0:
        return (
          <FlatList
            data={this.state.overallLeaderboard}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            style={styles.list}
          />
        );
        break;

      case 1:
        return (
          <FlatList
            data={this.state.weeklyLeaderboard}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            style={styles.list}
          />
        );
        break;

      case 2:
        return (
          <FlatList
            data={this.state.teamLeaderboard}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            style={styles.list}
          />
        );
      default:
        return <Text>Leaderboard error, please try again</Text>;
        break;
    }
  };
  render() {
    const buttons = ["Indv Overall", "Indv Weekly", "Team"];
    const { selectedButtonIndex } = this.state;
    if (
      !this.state.overallLeaderboard.length ||
      !this.state.weeklyLeaderboard.length
    ) {
      return (
        <View style={containerStyle}>
          <Text style={styles.title}>Loading Leaderboard</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View style={containerStyle}>
        <Text style={styles.title}>Leaderboard</Text>
        <ButtonGroup
          onPress={this.updateButtonIndex}
          selectedIndex={selectedButtonIndex}
          buttons={buttons}
          containerStyle={{ height: 35 }}
          textStyle={styles.buttonText}
        />
        {this.listToShow()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 20
  },
  badgeContainer: {
    backgroundColor: "white"
  },
  badgeText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  },
  list: {
    paddingLeft: 15,
    paddingRight: 15
  },
  listItem: {
    borderBottomWidth: 0
  },
  buttonText: {
    fontWeight: "bold"
  }
});

export default Leaderboard;
