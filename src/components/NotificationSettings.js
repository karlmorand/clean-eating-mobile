import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  StyleSheet,
  ActivityIndicator,
  DatePickerIOS,
  Switch,
  PushNotificationIOS,
  Alert,
  AsyncStorage
} from "react-native";
import axios from "axios";
import { devApi, prodApi } from "../../config";
import { containerStyle } from "../config";
import moment from "moment";

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    console.log("NotSet Constructor");

    this.state = {
      loading: true,
      notificationsEnabled: false,
      notificationTime: new Date()
    };
  }

  componentDidMount() {
    PushNotificationIOS.checkPermissions(async res => {
      if (res.alert || res.sound) {
        let savedNotTime = await AsyncStorage.getItem("notificationTime");
        let notificationsEnabled = await AsyncStorage.getItem(
          "notificationsEnabled"
        );
        let notificationsOn = notificationsEnabled === "true" ? true : false;
        this.setState({
          notificationsEnabled: notificationsOn,
          loading: false,
          notificationTime: new Date(savedNotTime)
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  toggleSwitch = async newValue => {
    if (newValue === true) {
      PushNotificationIOS.checkPermissions(res => {
        if (res.alert || res.sound) {
          this.setState({ notificationsEnabled: true }, async () => {
            await AsyncStorage.setItem("notificationsEnabled", "true");
            this.setNotTime(this.state.notificationTime);
          });
        } else {
          this.requestNotPerm();
        }
      });
    } else {
      await PushNotificationIOS.cancelAllLocalNotifications();
      await AsyncStorage.setItem("notificationsEnabled", "false");
      this.setState({ notificationsEnabled: false });
    }
  };

  requestNotPerm = async () => {
    const notRes = await PushNotificationIOS.requestPermissions();
    if (notRes.alert || notRes.sound) {
      this.setState({ notificationsEnabled: true }, async () => {
        await AsyncStorage.setItem("notificationsEnabled", "true");
        this.setNotTime(this.state.notificationTime);
      });
    } else {
      Alert.alert(
        "Can't enable notifications",
        `${notRes.alert} ${notRes.sound}`,
        [{ text: "OK" }],
        { cancelable: true }
      );
      this.setState({ notificationsEnabled: false });
    }
  };

  setNotTime = newTime => {
    //if notifications aren't enabled just update the time
    if (!this.state.notificationsEnabled) {
      this.setState({ notificationTime: newTime });
    } else {
      //first cancel any existing notifications before scheduling them with the new time
      PushNotificationIOS.cancelAllLocalNotifications();
      this.setState({ notificationTime: newTime }, () => {
        // let date = moment()
        //   .hour(newTime)
        //   .format("YYYY-MM-DDTHH:mm:ss.sssZ");
        const notDetails = {
          fireDate: newTime,
          alertTitle: "Clean Eating Challenge",
          alertBody: "Don't forget to complete your daily entry!",
          repeatInterval: "day"
        };

        PushNotificationIOS.scheduleLocalNotification(notDetails);
        AsyncStorage.setItem("notificationTime", newTime.toISOString());
      });
    }
  };

  closeModal() {
    this.props.closeModal();
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
      <Modal
        visible={this.props.visible}
        animationType={"slide"}
        onRequestClose={() => this.closeModal()}
        style={styles.container}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Notification Settings:</Text>
          <Text style={styles.body}>Enable notifications</Text>
          <View style={styles.switch}>
            <Switch
              value={this.state.notificationsEnabled}
              onValueChange={this.toggleSwitch}
            />
          </View>
          <Text style={styles.body}>Notification time</Text>
          <DatePickerIOS
            date={this.state.notificationTime}
            onDateChange={this.setNotTime}
            mode={"time"}
          />
          <Button onPress={() => this.closeModal()} title="Close" />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center"
    // alignItems: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  body: {
    textAlign: "center",
    fontSize: 15
  },
  switch: {
    alignItems: "center"
  }
});
