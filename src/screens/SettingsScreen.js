import React, { Component } from "react";
import { navigate } from "react-navigation";
import { Button, View, StyleSheet, Text, Image } from "react-native";
import { Avatar } from "react-native-elements";
import { containerStyle } from "../config";
import TeamPicker from "../components/TeamPicker";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    tabBarLabel: "Setup"
  };
  logout = () => {
    this.props.screenProps.logout();
  };
  showTeamPicker = () => {
    this.props.screenProps.showTeamPicker();
  };
  render() {
    const { goBack } = this.props.navigation;
    let userTeam;
    if (
      this.props.screenProps.user.team &&
      this.props.screenProps.user.team.name
    ) {
      userTeam = (
        <Text style={styles.title}>
          {this.props.screenProps.user.team.name}
        </Text>
      );
    } else {
      userTeam = (
        <Text style={styles.textBody}>
          You're not on a team...click below to join one!
        </Text>
      );
    }

    // <Button title="Go back to home tab" onPress={() => goBack()} />
    return (
      <View style={[containerStyle, styles.container]}>
        {this.props.screenProps.user && (
          <Avatar
            large
            rounded
            source={{ uri: this.props.screenProps.user.picture }}
            activeOpacity={0.7}
          />
        )}
        <Text style={styles.title}>Team:</Text>
        {userTeam}
        <Text style={[styles.textBody, styles.quote]}>
          "Eat meat and vegetables, nuts and seeds, some fruit, little starch,
          and no sugar."
        </Text>
        <Button onPress={this.logout} title="Logout" />
        <Button onPress={this.showTeamPicker} title="Change Teams" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingLeft: 5,
    paddingRight: 5
  },
  title: {
    textAlign: "center",
    fontSize: 30
  },
  levelTitle: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold"
  },
  textBody: {
    margin: 15,
    fontSize: 17,
    lineHeight: 22
  },
  quote: {
    fontStyle: "italic"
  }
});
