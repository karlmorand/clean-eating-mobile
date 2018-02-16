import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  AppState,
  ActivityIndicator,
  InteractionManager
} from "react-native";
import { ListItem } from "react-native-elements";
import { containerStyle } from "../config";
import { prodApi, devApi } from "../../config.js";
import axios from "axios";
import moment from "moment";
//Needs to be a ListView to be perfomant

class History extends Component {
  constructor(props) {
    super(props);
    console.log("HISTORY PROPS: ", this.props.screenProps);
    this.state = {
      dailyEntries: [],
      refreshing: false
    };
    if (__DEV__) {
      this.apiURL = devApi;
    } else {
      this.apiURL = prodApi;
    }
  }
  componentDidMount() {
    this.getDailyEntryHistory();
    this._sub = this.props.navigation.addListener("didFocus", this._onFocus);
    // AppState.addEventListener("change", this._handleAppStateChange);
  }

  _onFocus = () => {
    this.setState({ refreshing: true }, () => {
      this.getDailyEntryHistory();
    });
  };
  _handleAppStateChange = nextAppState => {
    if (nextAppState === "active") {
      console.log("APP STATE CHANGE in HISTORY ");
      this.getDailyEntryHistory();
    }
  };

  getDailyEntryHistory = () => {
    const { accessToken, user } = this.props.screenProps;
    const headers = { Authorization: `Bearer ${accessToken}` };
    if (!user) {
      // TODO: throw a UI error here and redirect them somewhere or call logout function
      return;
    }
    axios
      .get(`${this.apiURL}/user/${user._id}/history`, { headers })
      .then(res => {
        console.log("Data pre-sort: ", res.data);
        res.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        console.log("Data post-sort: ", res.data);
        this.setState({ dailyEntries: res.data, refreshing: false });
      })
      .catch(err => {
        this.setState({ refreshing: false });
        console.log(err);
      });
  };

  handlePress = entry => {
    const { navigation } = this.props;
    navigation.navigate("EditDailyLogEntry", { entryId: entry._id });
  };

  renderItem = ({ item }) => {
    const date = moment(item.date).format("ddd MMM Do");
    return (
      <ListItem
        title={date}
        titleStyle={styles.itemTitle}
        containerStyle={styles.listItem}
        badge={{
          value: item.entryTotal,
          containerStyle: styles.badgeContainer,
          textStyle: styles.badgeText
        }}
        onPress={() => {
          this.handlePress(item);
        }}
      />
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.getDailyEntryHistory();
      }
    );
  };
  render() {
    if (!this.state.dailyEntries.length) {
      <View style={containerStyle}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.title}>Loading History</Text>
      </View>;
    }
    return (
      <View style={containerStyle}>
        <FlatList
          data={this.state.dailyEntries}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          style={styles.list}
        />
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
    marginLeft: 15,
    marginRight: 15
  },
  listItem: {
    borderBottomWidth: 0
  }
});

export default History;
