import React, { Component } from "react";
import { navigate } from "react-navigation";
import {
  Button,
  View,
  StyleSheet,
  Text,
  Image,
  Linking,
  ScrollView,
  Switch
} from "react-native";
import { Avatar, Card } from "react-native-elements";
import { containerStyle } from "../config";
import TeamPicker from "../components/TeamPicker";
import NotificationSettings from "../components/NotificationSettings";
import FoodGuideDetail from "../components/FoodGuideDetail";
import Markdown from "react-native-markdown-renderer";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFoodModal: false,
      showNotificationModal: false
    };
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
    Linking.openURL("mailto:karljmorand@gmail.com?subject=Broccoli").catch(
      err => console.log("Error opening email sheet... ", err)
    );
  };

  showNotificationModal = () => {
    this.setState({ showNotificationModal: true });
  };
  closeNotificationModal = () => {
    this.setState({ showNotificationModal: false });
  };

  // showEmailSheet = () => {
  //   Linking.openURL("mailto:karljmorand@gmail.com?subject=Broccoli_Beta").catch(
  //     err => console.error("An error occurred", err)
  //   );
  // };
  showFoodModal = () => {
    this.setState({ showFoodModal: true });
  };
  closeFoodModal = () => {
    this.setState({ showFoodModal: false });
  };

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

    if (this.state.showFoodModal) {
      return (
        <FoodGuideDetail
          foodGuide={this.props.screenProps.user.gym.shoppingList}
          closeModal={this.closeFoodModal}
          visible={this.state.showFoodModal}
        />
      );
    }
    if (this.state.showNotificationModal) {
      return (
        <NotificationSettings
          visible={this.state.showNotificationModal}
          closeModal={this.closeNotificationModal}
        />
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
            <Text style={styles.textBody}>
              {this.props.screenProps.user.gym.foodGuide}
            </Text>
            <Button
              onPress={this.showFoodModal}
              title="Show Detailed Food Guide"
            />
          </Card>
          <Card title="Reminders" titleStyle={styles.levelTitle}>
            <Text style={styles.textBody}>
              Broccoli can remind you each night at a certain time to make sure
              you don't forget to fill out your daily entry.
            </Text>
            <Button
              onPress={this.showNotificationModal}
              title="Notification Settings"
            />
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
