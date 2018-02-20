import React, { Component } from "react";
import { navigate } from "react-navigation";
import {
  Button,
  View,
  StyleSheet,
  Text,
  Image,
  Linking,
  ScrollView
} from "react-native";
import { Avatar, Card } from "react-native-elements";
import { containerStyle } from "../config";
import TeamPicker from "../components/TeamPicker";
import { MarkdownView } from "react-native-markdown-view";

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
  contactSupport = () => {
    Linking.openURL(
      "mailto:karljmorand@gmail.com@gmail.com?subject=Broccoli"
    ).catch(err => console.log("Error opening email sheet... ", err));
  };

  // showEmailSheet = () => {
  //   Linking.openURL("mailto:karljmorand@gmail.com?subject=Broccoli_Beta").catch(
  //     err => console.error("An error occurred", err)
  //   );
  // };
  render() {
    const { goBack } = this.props.navigation;
    let userTeam;
    if (
      //TODO: not a fan of this nonsense
      this.props.screenProps.user &&
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
        <ScrollView>
          {this.props.screenProps.user && (
            <View style={styles.avatar}>
              <Avatar
                large
                rounded
                source={{ uri: this.props.screenProps.user.picture }}
                activeOpacity={0.7}
              />
            </View>
          )}
          <Text style={styles.title}>Team:</Text>
          {userTeam}
          <Button onPress={this.showTeamPicker} title="Change Teams" />
          <Card title="Food guide:" titleStyle={styles.levelTitle}>
            <MarkdownView styles={markdownStyle}>
              {this.props.screenProps.user.gym.foodGuide}
            </MarkdownView>
          </Card>
          <Card title="Questions or feedback?" titleStyle={styles.levelTitle}>
            <Text style={styles.textBody}>
              If you have a question about how to do something, or have a
              feature request, please tap the button below to email support.
            </Text>
            <Button onPress={this.contactSupport} title="Contact support" />
          </Card>
          <Card title="Problems?" titleStyle={styles.levelTitle}>
            <Text style={styles.textBody}>
              If you're having any problems with the app the first thing to try
              is logging out and logging back in. If that doesn't work try
              reinstalling the app. And if that fails please use the contact
              button above to email support.
            </Text>
            <Button onPress={this.logout} title="Logout" />
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const markdownStyle = {
  paragraph: {
    margin: 15,
    fontSize: 17,
    lineHeight: 22
  }
};
const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingLeft: 5,
    paddingRight: 5
  },
  avatar: {
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 30
  },
  levelTitle: {
    fontSize: 20,
    color: "black",
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
